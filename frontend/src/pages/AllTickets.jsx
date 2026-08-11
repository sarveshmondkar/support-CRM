import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import { getTickets } from "../services/ticketService";
import SearchAndFilter from "../components/SearchAndFilter";
import TicketTable from "../components/TicketTable";

function AllTickets() {
  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ticketsPerPage = 10;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTickets({
          search,
          status,
        });

        setTickets(data);
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          "Failed to load tickets.";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchTickets();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status]);

  // Pagination
  const totalPages = Math.ceil(
    tickets.length / ticketsPerPage
  );

  const startIndex =
    (currentPage - 1) * ticketsPerPage;

  const currentTickets = tickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  };

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Page Header */}
      <header className="border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium text-blue-600">
            Support management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            All Tickets
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage all customer support tickets.
          </p>
        </div>
      </header>

      <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Search and Filter */}
          <SearchAndFilter
            search={search}
            status={status}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
          />

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Ticket Table */}
          <div className="mt-5">
            <TicketTable
              tickets={currentTickets}
              loading={loading}
            />
          </div>

          {/* Pagination */}
          {!loading && tickets.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-medium text-slate-700">
                  {startIndex + 1}
                </span>{" "}
                -{" "}
                <span className="font-medium text-slate-700">
                  {Math.min(
                    startIndex + ticketsPerPage,
                    tickets.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {tickets.length}
                </span>{" "}
                tickets
              </p>

              <div className="flex items-center gap-2">
                {/* Previous */}
                <button
                  type="button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft
                    size={17}
                    strokeWidth={1.9}
                  />
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight
                    size={17}
                    strokeWidth={1.9}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default AllTickets;