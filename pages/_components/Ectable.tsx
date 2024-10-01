// import React, { useState, ReactNode } from "react";

// // Interfaces
// interface Column {
//   title?: string;
//   field: string;
//   condition?: string;
//   type?: string;
//   hide?: boolean;
//   sort?: boolean;
//   cellClass?: string;
//   render?: (row: any) => ReactNode; // Custom render function for custom fields
// }

// interface EcTableProps {
//   columns: Column[];
//   rows: any[];
//   page?: number;
//   totalRows?: number;
//   pageSize?: number;
//   pageSizeOptions?: number[];
//   sortDirection?: "asc" | "desc";
//   loading: boolean;
//   noDataContent?: string;
//   onServer?: (p: any) => void;
//   sortChange?: (field: string, direction: "asc" | "desc") => void;
//   pageChange?: (page: number) => void;
//   pageSizeChange?: (pageSize: number) => void;
// }

// // TableHeader Component
// const TableHeader: React.FC<{
//   columns: Column[];
//   sortDirection: "asc" | "desc";
//   handleSort: (field: string) => void;
// }> = ({ columns, sortDirection, handleSort }) => (
//   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//     <tr>
//       {columns.map(
//         (col) =>
//           !col.hide && (
//             <th
//               className="px-6 py-3"
//               key={col.field}
//               onClick={() => (col.sort ? handleSort(col.field) : undefined)}
//               style={{ cursor: col.sort ? "pointer" : "default" }}
//             >
//               {col.title || col.field}
//               {col.sort && (sortDirection === "asc" ? " ↑" : " ↓")}
//             </th>
//           )
//       )}
//     </tr>
//   </thead>
// );

// // TableBody Component with Custom Field Support
// const TableBody: React.FC<{
//   columns: Column[];
//   rows: any[];
// }> = ({ columns, rows }) => (
//   <tbody>
//     {rows.map((row, rowIndex) => (
//       <tr
//         className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//         key={rowIndex}
//       >
//         {columns.map(
//           (col) =>
//             !col.hide && (
//               <td
//                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 key={col.field}
//                 // className={col.cellClass}
//               >
//                 {col.render ? col.render(row) : row[col.field]}{" "}
//                 {/* Custom field rendering */}
//               </td>
//             )
//         )}
//       </tr>
//     ))}
//   </tbody>
// );

// // Pagination Component
// const Pagination: React.FC<{
//   page: number;
//   totalRows: number;
//   pageSize: number;
//   onPageChange: (page: number) => void;
// }> = ({ page, totalRows, pageSize, onPageChange }) => {
//   const totalPages = Math.ceil(totalRows / pageSize);

//   return (
//     <div
//       className="flex items-center justify-between px-4 py-3 bg-white border-t dark:bg-gray-800 dark:border-gray-700"
//       style={{ borderTopWidth: "1px" }}
//     >
//       <button
//         className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
//         onClick={() => onPageChange(Math.max(page - 1, 1))}
//         disabled={page === 1}
//       >
//         Previous
//       </button>
//       <button
//         className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
//         onClick={() => onPageChange(Math.min(page + 1, totalPages))}
//         disabled={page === totalPages}
//       >
//         Next
//       </button>
//       <div
//         className="text-sm text-gray-700 dark:text-gray-400"
//         style={{ fontSize: "0.875rem" }}
//       >
//         Page {page} of {totalPages}
//       </div>
//     </div>
//   );
// };

// // PageSizeSelector Component
// const PageSizeSelector: React.FC<{
//   pageSize: number;
//   pageSizeOptions: number[];
//   onPageSizeChange: (newPageSize: number) => void;
// }> = ({ pageSize, pageSizeOptions, onPageSizeChange }) => (
//   <div
//     className="flex items-center justify-between px-4 py-3 bg-white border-t dark:bg-gray-800 dark:border-gray-700"
//     style={{ borderTopWidth: "1px" }}
//   >
//     <label
//       className="text-sm font-medium text-gray-700 dark:text-gray-400"
//       htmlFor="rowsPerPage"
//     >
//       Rows per page:
//     </label>
//     <select
//       id="rowsPerPage"
//       className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray"
//       value={pageSize}
//       onChange={(e) => onPageSizeChange(Number(e.target.value))}
//     >
//       {pageSizeOptions.map((option) => (
//         <option
//           key={option}
//           value={option}
//           className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray"
//         >
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// // EcTable Component
// const EcTable: React.FC<EcTableProps> = ({
//   columns,
//   rows,
//   pageSize = 10,
//   pageSizeOptions = [10, 20, 50],
//   totalRows = rows.length,
//   loading,
//   noDataContent,
//   onServer = () => {},
//   sortChange = () => {},
//   pageChange = () => {},
//   pageSizeChange = () => {},
// }) => {
//   const [params, setParams] = useState({
//     page: 1,
//     pageSize: pageSize,
//     sortField: "id",
//     sortDirection: "asc" as "asc" | "desc",
//   });

//   const handleSort = (field: string) => {
//     const newDirection = params.sortDirection === "asc" ? "desc" : "asc";
//     setParams({ ...params, sortField: field, sortDirection: newDirection });
//     onServer({ ...params, sortField: field, sortDirection: newDirection });
//     sortChange(field, newDirection);
//   };

//   const handlePageChange = (newPage: number) => {
//     setParams({ ...params, page: newPage });
//     onServer({ ...params, page: newPage });
//     pageChange(newPage);
//   };

//   const handlePageSizeChange = (newPageSize: number) => {
//     setParams({ ...params, pageSize: newPageSize });
//     onServer({ ...params, pageSize: newPageSize });
//     pageSizeChange(newPageSize);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <table
//         style={{ borderCollapse: "collapse", width: "100%" }}
//         className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
//       >
//         <TableHeader
//           columns={columns}
//           sortDirection={params.sortDirection}
//           handleSort={handleSort}
//         />
//         <TableBody columns={columns} rows={rows} />
//       </table>

//       <Pagination
//         page={params.page}
//         totalRows={totalRows}
//         pageSize={params.pageSize}
//         onPageChange={handlePageChange}
//       />

//       <PageSizeSelector
//         pageSize={params.pageSize}
//         pageSizeOptions={pageSizeOptions}
//         onPageSizeChange={handlePageSizeChange}
//       />
//     </div>
//   );
// };

// export default EcTable;

import React, { useState, ReactNode, useEffect } from "react";

// Interfaces
export interface Column {
  title?: string;
  field: string;
  condition?: string;
  type?: string;
  hide?: boolean;
  sort?: boolean;
  cellClass?: string;
  filterable?: boolean;
  render?: (row: any) => ReactNode;
}

interface EcTableProps {
  columns: Column[];
  rows: any[];
  page?: number;
  totalRows?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  sortDirection?: "asc" | "desc";
  loading: boolean;
  noDataContent?: string;
  onServer?: (p: any) => void;
  sortChange?: (field: string, direction: "asc" | "desc") => void;
  pageChange?: (page: number) => void;
  pageSizeChange?: (pageSize: number) => void;
}

// TableHeader Component
const TableHeader: React.FC<{
  columns: Column[];
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
}> = ({ columns, sortDirection, handleSort }) => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      {columns.map(
        (col) =>
          !col.hide && (
            <th
              className="px-6 py-3"
              key={col.field}
              onClick={() => (col.sort ? handleSort(col.field) : undefined)}
              style={{ cursor: col.sort ? "pointer" : "default" }}
            >
              {col.title || col.field}
              {col.sort && (sortDirection === "asc" ? " ↑" : " ↓")}
            </th>
          )
      )}
    </tr>
  </thead>
);

// TableBody Component with Custom Field Support
const TableBody: React.FC<{
  columns: Column[];
  rows: any[];
}> = ({ columns, rows }) => (
  <tbody>
    {rows.map((row, rowIndex) => (
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        key={rowIndex}
      >
        {columns.map(
          (col) =>
            !col.hide && (
              <td
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                key={col.field}
              >
                {col.render ? col.render(row) : row[col.field]}{" "}
                {/* Custom field rendering */}
              </td>
            )
        )}
      </tr>
    ))}
  </tbody>
);

// Pagination Component
const Pagination: React.FC<{
  page: number;
  totalRows: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}> = ({ page, totalRows, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalRows / pageSize);

  return (
    <div
      className="flex items-center justify-between px-4 py-3 bg-white border-t dark:bg-gray-800 dark:border-gray-700"
      style={{ borderTopWidth: "1px" }}
    >
      <button
        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </button>
      <div
        className="text-sm text-gray-700 dark:text-gray-400"
        style={{ fontSize: "0.875rem" }}
      >
        Page {page} of {totalPages}
      </div>
    </div>
  );
};

// PageSizeSelector Component
const PageSizeSelector: React.FC<{
  pageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange: (newPageSize: number) => void;
}> = ({ pageSize, pageSizeOptions, onPageSizeChange }) => (
  <div
    className="flex items-center justify-between px-4 py-3 bg-white border-t dark:bg-gray-800 dark:border-gray-700"
    style={{ borderTopWidth: "1px" }}
  >
    <label
      className="text-sm font-medium text-gray-700 dark:text-gray-400"
      htmlFor="rowsPerPage"
    >
      Rows per page:
    </label>
    <select
      id="rowsPerPage"
      className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray"
      value={pageSize}
      onChange={(e) => onPageSizeChange(Number(e.target.value))}
    >
      {pageSizeOptions.map((option) => (
        <option
          key={option}
          value={option}
          className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700 dark:border-gray"
        >
          {option}
        </option>
      ))}
    </select>
  </div>
);

const TableBodySkeleton: React.FC<{ columns: Column[] }> = ({ columns }) => (
  <tbody>
    <tr>
      {columns.map(
        (col) =>
          !col.hide && (
            <td
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              key={col.field}
            >
              <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
            </td>
          )
      )}
    </tr>
  </tbody>
);

const EcTable: React.FC<EcTableProps> = ({
  columns,
  rows,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  totalRows = rows.length,
  loading,
  noDataContent,
  onServer = () => {},
  sortChange = () => {},
  pageChange = () => {},
  pageSizeChange = () => {},
}) => {
  const [params, setParams] = useState({
    page: 1,
    pageSize: pageSize,
    sortField: "id",
    sortDirection: "asc" as "asc" | "desc",
    filters: {}, // Add filters here
  });

  // State for debounced filter values
  const [debouncedFilters, setDebouncedFilters] = useState(params.filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      onServer({ ...params, filters: debouncedFilters });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedFilters, params]);

  const handleSort = (field: string) => {
    const newDirection = params.sortDirection === "asc" ? "desc" : "asc";
    setParams({ ...params, sortField: field, sortDirection: newDirection });
    onServer({ ...params, sortField: field, sortDirection: newDirection });
    sortChange(field, newDirection);
  };

  const handlePageChange = (newPage: number) => {
    setParams({ ...params, page: newPage });
    onServer({ ...params, page: newPage });
    pageChange(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setParams({ ...params, pageSize: newPageSize });
    onServer({ ...params, pageSize: newPageSize });
    pageSizeChange(newPageSize);
  };

  const handleFilterChange = (filter: string, value: any) => {
    const newFilters = { ...params.filters, [filter]: value };
    setParams({ ...params, filters: newFilters });
    setDebouncedFilters(newFilters); // Update the debounced filters
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      {/* Example filter inputs */}
      <div className="flex mb-4">
        {columns.map(
          (col) =>
            !col.hide &&
            col.field &&
            col.filterable && (
              <div key={col.field} className="mr-2">
                <input
                  type="text"
                  placeholder={`Filter ${col.title || col.field}`}
                  onChange={(e) =>
                    handleFilterChange(col.field, e.target.value)
                  }
                  className="border p-2 rounded"
                />
              </div>
            )
        )}
      </div>

      <table
        style={{ borderCollapse: "collapse", width: "100%" }}
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <TableHeader
          columns={columns}
          sortDirection={params.sortDirection}
          handleSort={handleSort}
        />
        <TableBody columns={columns} rows={rows} />
      </table>

      <Pagination
        page={params.page}
        totalRows={totalRows}
        pageSize={params.pageSize}
        onPageChange={handlePageChange}
      />

      <PageSizeSelector
        pageSize={params.pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default EcTable;
