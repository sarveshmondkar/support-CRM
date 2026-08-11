import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCircle2,
  Clock3,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getTickets } from "../services/ticketService";

function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [activeCount, setActiveCount] = useState(0);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveTickets = async () => {
      try {
        const data = await getTickets();

        const activeTickets = data.filter(
          (ticket) =>
            ticket.status === "Open" ||
            ticket.status === "In Progress"
        );

        setActiveCount(activeTickets.length);

        // Show only the 3 most recent active tickets
        setTickets(activeTickets.slice(0, 3));
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error
        );
      }
    };

    fetchActiveTickets();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleTicketClick = (ticketId) => {
    setIsOpen(false);
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Bell */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="View tickets that need attention"
        aria-expanded={isOpen}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
      >
        <Bell
          size={19}
          strokeWidth={1.9}
        />

        {activeCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
            {activeCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-85 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Needs Attention
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                {activeCount > 0
                  ? `${activeCount} active ticket${
                      activeCount > 1 ? "s" : ""
                    }`
                  : "No active tickets"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close notifications"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X
                size={17}
                strokeWidth={1.9}
              />
            </button>
          </div>

          {/* Recent 3 Active Tickets */}
          {tickets.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {tickets.map((ticket) => {
                const isOpenTicket =
                  ticket.status === "Open";

                return (
                  <button
                    key={ticket.ticketId}
                    type="button"
                    onClick={() =>
                      handleTicketClick(ticket.ticketId)
                    }
                    className="flex w-full gap-3 px-4 py-3.5 text-left transition hover:bg-slate-50"
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isOpenTicket
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {isOpenTicket ? (
                        <CheckCircle2
                          size={16}
                          strokeWidth={1.9}
                        />
                      ) : (
                        <Clock3
                          size={16}
                          strokeWidth={1.9}
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-blue-600">
                          {ticket.ticketId}
                        </span>

                        <span
                          className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-medium ${
                            isOpenTicket
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                        {ticket.subject}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {ticket.customerName}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-800">
                You're all caught up
              </p>

              <p className="mt-1 text-xs text-slate-500">
                There are no active tickets needing attention.
              </p>
            </div>
          )}

          {/* Footer */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate("/tickets");
            }}
            className="flex w-full items-center justify-center border-t border-slate-100 px-4 py-3 text-xs font-semibold text-blue-600 transition hover:bg-slate-50"
          >
            View all tickets
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationsDropdown;