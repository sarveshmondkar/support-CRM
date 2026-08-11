import { Eye, Mail, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

function TicketTable({ tickets, loading }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Open":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10";

      case "In Progress":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-600/10";

      case "Closed":
        return "bg-slate-100 text-slate-600 ring-1 ring-slate-500/10";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-center px-6 py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </div>
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <UserRound size={21} strokeWidth={1.8} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            No tickets found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Try changing your search or status filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-190">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Ticket
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Subject
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Created
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tickets.map((ticket) => (
              <tr
                key={ticket.ticketId}
                className="transition hover:bg-slate-50/70"
              >
                <td className="px-6 py-4">
                  <Link
                    to={`/tickets/${ticket.ticketId}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {ticket.ticketId}
                  </Link>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                      {ticket.customerName?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {ticket.customerName}
                      </p>

                      <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                        <Mail size={12} />
                        <span className="truncate">
                          {ticket.customerEmail || "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="max-w-xs px-6 py-4">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {ticket.subject}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(
                      ticket.status,
                    )}`}
                  >
                    {ticket.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/tickets/${ticket.ticketId}`}
                    aria-label={`View ${ticket.ticketId}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye size={17} strokeWidth={1.9} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {tickets.map((ticket) => (
          <Link
            key={ticket.ticketId}
            to={`/tickets/${ticket.ticketId}`}
            className="block p-4 transition active:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-blue-600">
                  #{ticket.ticketId}
                </p>

                <h3 className="mt-1 truncate text-sm font-semibold text-slate-900">
                  {ticket.subject}
                </h3>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyles(
                  ticket.status,
                )}`}
              >
                {ticket.status}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                  {ticket.customerName?.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {ticket.customerName}
                  </p>

                  <p className="text-xs text-slate-400">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Eye
                size={17}
                strokeWidth={1.9}
                className="shrink-0 text-slate-400"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TicketTable;
