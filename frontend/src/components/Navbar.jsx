import { Link } from "react-router-dom";
import { Headphones, Plus } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Headphones size={19} strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900">
              SupportDesk
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Customer Support CRM
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
          >
            Tickets
          </Link>

          <Link
            to="/tickets/new"
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Plus size={16} strokeWidth={2.2} />
            <span>New Ticket</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;