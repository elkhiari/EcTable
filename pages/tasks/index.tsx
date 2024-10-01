import useSWR from "swr";
import { Task } from "../../interfaces";
import EcTable, { Column } from "../_components/Ectable";
import { useEffect, useState } from "react";
import { on } from "events";
import { render } from "react-dom";
import Layout from "../layout";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [data, setData] = useState<{
    tasks: Task[];
    totalRows: number;
  }>({ tasks: [], totalRows: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url: string) => {
    setIsLoading(true);
    const res = await fetch(url);
    const d = await res.json();
    setData(d);
    setIsLoading(false);
  };

  const columns: Column[] = [
    {
      title: "ID",
      field: "id",
      filterable: true,
      type: "number",
      sort: true,
    },
    {
      title: "Title",
      filterable: true,
      field: "title",
      condition: "like",
      type: "string",
      sort: true,
    },
    {
      title: "completed",
      field: "completed",
      type: "boolean",
      sort: true,
      render: (row: Task) => (row.completed ? "Yes" : "No"),
    },
    {
      title: "Action",
      field: "action",
      render: (row: Task) => (
        <button
          onClick={() => {
            alert(row.title);
          }}
        >
          Edit
        </button>
      ),
    },
  ];

  useEffect(() => {
    fetchData("/api/tasks");
  }, []);

  const onServer = (params) => {
    console.log(params);

    const urlParams = new URLSearchParams({
      page: params.page,
      pageSize: params.pageSize,
      sortField: params.sortField,
      sortDirection: params.sortDirection,
    });

    Object.entries(params.filters).forEach(([key, value]) => {
      if (value) {
        urlParams.append(`filters[${key}]`, `${value}`);
      }
    });

    const url = `/api/tasks?${urlParams.toString()}`;

    fetchData(url);
  };

  return (
    <Layout>
      <EcTable
        columns={columns}
        rows={data.tasks || []}
        totalRows={data.totalRows}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        loading={isLoading}
        noDataContent="No data"
        onServer={onServer}
      />
    </Layout>
  );
}
