import { useState } from "react";
import {
  Bell,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Plus,
  TicketPlus,
  Tickets,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        {/* Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
        >
          <Menu size={21} strokeWidth={2} />
        </button>

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <span className="text-sm font-bold">S</span>
          </div>

          <span className="text-sm font-bold text-slate-900">
            Support CRM
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
          >
            <Bell size={19} strokeWidth={1.9} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
          </button>

          <Link
            to="/tickets/new"
            aria-label="Create new ticket"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} strokeWidth={2.2} />
          </Link>
        </div>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/50 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-72 flex-col bg-slate-950 text-white shadow-2xl transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Tickets size={20} strokeWidth={2} />
            </div>

            <div>
              <h2 className="text-base font-bold">
                Support CRM
              </h2>

              <p className="text-xs text-slate-400">
                Customer Support
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <LayoutDashboard size={19} strokeWidth={1.9} />
              Dashboard
            </span>

            <ChevronRight size={16} />
          </NavLink>

          <NavLink
            to="/tickets/new"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <TicketPlus size={19} strokeWidth={1.9} />
              New Ticket
            </span>

            <ChevronRight size={16} />
          </NavLink>

          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <span className="flex items-center gap-3">
              <Tickets size={19} strokeWidth={1.9} />
              All Tickets
            </span>

            <ChevronRight size={16} />
          </NavLink>
        </nav>

        {/* User */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl px-2 py-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold">
              SA

              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-500" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Support Agent
              </p>

              <p className="text-xs text-slate-400">
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MobileHeader;