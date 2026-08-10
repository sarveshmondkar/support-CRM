import { Bell, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardHeader() {
  return (
    <header className="hidden items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8 lg:flex">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Here's what's happening with your tickets.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          aria-label="Notifications"
        >
          <Bell size={19} strokeWidth={1.9} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
        </button>

        <Link
          to="/tickets/new"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <Plus size={17} strokeWidth={2.2} />
          <span>New Ticket</span>
        </Link>
      </div>
    </header>
  );
}

export default DashboardHeader;