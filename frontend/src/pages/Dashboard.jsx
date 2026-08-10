import { useEffect, useMemo, useState } from "react";

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tickets for statistics
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
      }
    };

    fetchAllTickets();
  }, []);

  // Fetch filtered tickets for the table
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

  // Calculate dashboard statistics
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

  return (
    <div className="flex min-h-screen bg-slate-50">

      <div className="min-w-0 flex-1">
        {/* Desktop Header */}
        <DashboardHeader />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
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
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;