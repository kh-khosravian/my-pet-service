"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalItems: number; // total number of items (optional, can be used for
}

export const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const renderPageNumbers = (currentPage: number) => {
    const renderItems = [];
    const numberOfPages =
      totalItems / pageSize + (totalItems % pageSize === 0 ? 0 : 1);
    for (let i = 1; i <= numberOfPages; i++) {
      renderItems.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return renderItems;
  };

  return (
    <div className="flex justify-center space-x-2 my-4">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      {renderPageNumbers(page)}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page * pageSize >= totalItems}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
