import {
  Ticket,
  CircleDot,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const iconMap = {
  total: Ticket,
  open: CircleDot,
  progress: Clock3,
  closed: CheckCircle2,
};

function StatsCard({ title, value, type }) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            type === "total"
              ? "bg-blue-50 text-blue-600"
              : type === "open"
                ? "bg-emerald-50 text-emerald-600"
                : type === "progress"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-slate-100 text-slate-600"
          }`}
        >
          <Icon size={19} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;