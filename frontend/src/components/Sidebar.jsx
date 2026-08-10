import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TicketPlus,
  Tickets,
  ChevronDown,
} from "lucide-react";

function Sidebar() {
  const navItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "New Ticket",
      path: "/tickets/new",
      icon: TicketPlus,
      end: true,
    },
    {
      label: "All Tickets",
      path: "/tickets",
      icon: Tickets,
      end: true,
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-slate-950 text-white lg:flex">
      {/* Brand */}
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
            <Tickets size={21} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <h1 className="text-base font-bold tracking-tight">
              Support CRM
            </h1>

            <p className="mt-0.5 text-xs text-slate-400">
              Customer Support
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} strokeWidth={1.9} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl px-2 py-3">
          {/* Avatar */}
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold">
            SA

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-500" />
          </div>

          {/* User Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              Support Agent
            </p>

            <p className="text-xs text-slate-400">
              Online
            </p>
          </div>

          <ChevronDown
            size={16}
            className="shrink-0 text-slate-500"
            strokeWidth={1.8}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;