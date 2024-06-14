type Props = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: any;
};
export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        onClick={() => handlePageChange(page - 1)}
        className={`mr-2 px-2 py-1 border border-gray-300 rounded`}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
}
