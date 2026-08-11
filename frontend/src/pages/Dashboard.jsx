import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import DashboardHeader from "../components/DashboardHeader";
import StatsCard from "../components/StatsCard";
import SearchAndFilter from "../components/SearchAndFilter";
import TicketTable from "../components/TicketTable";

import { getTickets } from "../services/ticketService";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ticketsPerPage = 5;

  // Fetch all tickets for dashboard statistics
  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const data = await getTickets();
        setAllTickets(data);
      } catch (error) {
        console.error(
          "Failed to fetch ticket statistics:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load ticket statistics."
        );
      }
    };

    fetchAllTickets();
  }, []);

  // Fetch filtered tickets
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

  // Dashboard statistics
  const stats = useMemo(() => {
    return {
      total: allTickets.length,

      open: allTickets.filter(
        (ticket) => ticket.status === "Open"
      ).length,

      progress: allTickets.filter(
        (ticket) => ticket.status === "In Progress"
      ).length,

      closed: allTickets.filter(
        (ticket) => ticket.status === "Closed"
      ).length,
    };
  }, [allTickets]);

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
      <DashboardHeader />

      <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Mobile Intro */}
          <div className="mb-6 lg:hidden">
            <p className="text-sm font-medium text-blue-600">
              Support overview
            </p>

            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              Your tickets
            </h2>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            <StatsCard
              title="Total Tickets"
              value={stats.total}
              type="total"
            />

            <StatsCard
              title="Open"
              value={stats.open}
              type="open"
            />

            <StatsCard
              title="In Progress"
              value={stats.progress}
              type="progress"
            />

            <StatsCard
              title="Closed"
              value={stats.closed}
              type="closed"
            />
          </div>

          {/* Tickets Section */}
          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                All Tickets
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search and manage customer support requests.
              </p>
            </div>

            {/* Search + Filter */}
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
                      onClick={() =>
                        setCurrentPage(page)
                      }
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
                    disabled={
                      currentPage === totalPages
                    }
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
          </section>
        </div>
      </main>
    </>
  );
}

export default Dashboard;