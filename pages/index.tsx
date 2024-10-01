import type { User } from "../interfaces";
import useSwr from "swr";
import Link from "next/link";
import EcTable from "./_components/Ectable";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error, isLoading } = useSwr<User[]>("/api/users", fetcher);
  const columns = [
    {
      title: "ID",
      field: "id",
      condition: "eq",
      type: "number",
      sort: true,
      hide: true,
    },
    {
      title: "Name",
      field: "name",
      condition: "like",
      type: "string",
      sort: true,
    },
    {
      title: "Email",
      field: "email",
      condition: "like",
      type: "string",
      sort: true,
    },
    {
      title: "Phone",
      field: "phone",
      condition: "like",
      type: "string",
      sort: true,
    },
    {
      title: "Website",
      field: "website",
      condition: "like",
      type: "string",
      sort: true,
    },
  ];

  const [params, setParams] = useState({
    page: 0,
    pageSize: 10,
    sortField: "id",
    sortDirection: "asc",
  });

  useEffect(() => {
    console.log(params);
  }, [params]);

  if (error) return <div>Failed to load users</div>;

  return (
    <EcTable
      columns={columns}
      rows={data}
      page={0}
      pageSize={10}
      pageSizeOptions={[5, 10, 20]}
      sortDirection="asc"
      loading={isLoading}
      noDataContent="No data"
      sortChange={(field, direction) =>
        setParams({ ...params, sortField: field, sortDirection: direction })
      }
      pageChange={(page) => setParams({ ...params, page })}
      pageSizeChange={(pageSize) => setParams({ ...params, pageSize })}
    />
  );

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <Link href="/user/[id]" as={`/user/${user.id}`}>
            {user.name ?? `User ${user.id}`}
          </Link>
        </li>
      ))}
    </ul>
  );
}
