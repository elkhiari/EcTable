import type { NextApiRequest, NextApiResponse } from "next";
import type { Task } from "../../../interfaces";
import TaskModel from "../../../models/Task";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<
    | {
        message: string;
        data: Task[];
      }
    | { error: string }
  >
) {
  try {
    const ts = await fetch("https://jsonplaceholder.typicode.com/todos");
    const tasks: Task[] = await ts.json();
    const tsk = await TaskModel.insertMany(tasks);
    res.status(200).json({
      message: "Tasks inserted successfully",
      data: tsk,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
