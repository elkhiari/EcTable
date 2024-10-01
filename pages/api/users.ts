import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../interfaces";

// Fake users data
const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    website: "https://www.johndoe.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+0987654321",
    website: "https://www.janesmith.com",
  },
  {
    id: 3,
    email: "user3@example.com",
    phone: "+1122334455",
  },
  {
    id: 4,
    name: "Alice Johnson",
    website: "https://www.alicejohnson.com",
  },
];
export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const params = _req.query as {
    page?: string;
    pageSize?: string;
    sortField?: string;
    sortDirection?: string;
  };

  const {
    page = 0,
    pageSize = 10,
    sortField = "id",
    sortDirection = "asc",
  } = params;

  const resUser = users.slice(
    Number(page) * Number(pageSize),
    Number(page) * Number(pageSize) + Number(pageSize)
  );

  res.status(200).json(resUser);
}
