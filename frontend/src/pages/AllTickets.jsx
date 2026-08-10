import { useEffect, useState } from "react";
import { getTickets } from "../services/ticketService";
import SearchAndFilter from "../components/SearchAndFilter";
import TicketTable from "../components/TicketTable";

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(
          error.response?.data?.message ||
            "Failed to load tickets."
        );
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchTickets();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status]);

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

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Search and Filter */}
          <SearchAndFilter
            search={search}
            status={status}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
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
              tickets={tickets}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default AllTickets;