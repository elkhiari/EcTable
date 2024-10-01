import type { NextApiRequest, NextApiResponse } from "next";
import type { Task } from "../../../interfaces";
import TaskModel from "../../../models/Task";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        tasks: Task[];
        totalRows: number;
      }
    | { error: string }
  >
) {
  try {
    // Explicitly type params from query to ensure they are treated as strings or numbers
    const params = {
      page: req.query.page ? Number(req.query.page) : 1,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
      sortField: (req.query.sortField as string) || "id",
      sortDirection: (req.query.sortDirection as "asc" | "desc") || "asc",
      filters: {
        id: req.query["filters[id]"] as string | undefined,
        title: req.query["filters[title]"] as string | undefined,
      },
    };

    const { page, pageSize, sortField, sortDirection, filters } = params;

    const query: any = {};
    if (filters.id) query.id = filters.id;
    if (filters.title) query.title = filters.title;

    const filterQuery: any = {
      ...(filters.id && { id: filters.id }),
      ...(filters.title && { title: { $regex: filters.title, $options: "i" } }),
    };

    const tasks = await TaskModel.find(filterQuery)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ [sortField]: sortDirection });

    const totalRows = await TaskModel.countDocuments(filterQuery);

    res.status(200).json({
      tasks,
      totalRows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
