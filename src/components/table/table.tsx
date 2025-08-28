"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "./pagination";

export interface CustomTableProps {
  rows: CustomTableRowProps[];
  upperCaseHeader?: boolean;
  headerBold?: boolean;
  headers: CustomTableHeaderProps[];
  enablePagination?: boolean;
  totalCount?: number; // New prop to enable/disable pagination
}

export interface CustomTableHeaderProps {
  label: string;
  align?: "text-left" | "text-center" | "text-right";
  width?: string; // e.g., "1/6", "2/6",
  sortable?: string;
}

export interface CustomTableRowProps {
  cells: CustomTableCellProps[];
  onClick?: () => void;
}

export interface CustomTableCellProps {
  value: string | number | React.ReactNode;
  align?: "text-left" | "text-center" | "text-right";
}

export const CustomTable: React.FC<CustomTableProps> = ({
  rows,
  headers,
  enablePagination,
  totalCount,
  headerBold,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOrderBy = (orderby: string, direction: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderby", orderby);
    params.set("direction", direction);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <table className="w-full table-fixed">
        <thead
          className={`bg-gray-50 border-b ${headerBold ? "font-bold" : ""}`}
        >
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className={`py-4 px-6 ${
                  h.align ? h.align : "text-left"
                } text-gray-600 font-bold text-sm ${
                  h.width ? `w-${h.width}` : ""
                } ${h.sortable ? "cursor-pointer hover:underline" : ""}`}
                onClick={() =>
                  h.sortable
                    ? handleOrderBy(
                        h.sortable,
                        searchParams.get("direction") === "asc" &&
                          searchParams.get("orderby") === h.sortable
                          ? "desc"
                          : "asc"
                      )
                    : undefined
                }
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white color-gray-800">
          {rows.map((r, i) => {
            return <TableRow key={i} cells={r.cells} onClick={r.onClick} />;
          })}
        </tbody>
      </table>
      {enablePagination && <Pagination totalItems={totalCount || 0} />}
    </>
  );
};

export const TableRow: React.FC<CustomTableRowProps> = ({ cells }) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-200">
      {cells.map((cell, index) => (
        <td
          key={index}
          className={`py-4 px-6 border-b border-gray-200 ${
            cell.align ? cell.align : "text-left"
          }`}
        >
          {cell.value}
        </td>
      ))}
    </tr>
  );
};
