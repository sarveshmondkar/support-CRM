import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTicketById, updateTicket } from "../services/ticketService";

function TicketDetails() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTicketById(ticketId);

        setTicket(data);
        setStatus(data.status);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load ticket.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleUpdate = async () => {
    if (!status && !note.trim()) {
      return;
    }

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      const updateData = {};

      if (status && status !== ticket.status) {
        updateData.status = status;
      }

      if (note.trim()) {
        updateData.notes = note.trim();
      }

      if (Object.keys(updateData).length === 0) {
        return;
      }

      await updateTicket(ticketId, updateData);

      const updatedTicket = await getTicketById(ticketId);

      setTicket(updatedTicket);
      setStatus(updatedTicket.status);
      setNote("");
      setSuccess("Ticket updated successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update ticket.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-800">
              Unable to load ticket
            </h2>

            <p className="mt-2 text-sm text-red-700">{error}</p>

            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={16} strokeWidth={2} />
              <span className="ml-2">Back to tickets</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            ← Back to tickets
          </Link>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Ticket #{ticket.ticketId}
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {ticket.subject}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Created {new Date(ticket.createdAt).toLocaleString()}
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1.5 text-sm font-semibold ${
                ticket.status === "Open"
                  ? "bg-emerald-50 text-emerald-700"
                  : ticket.status === "In Progress"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              {ticket.status}
            </span>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="space-y-6">
            {/* Customer */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Customer
              </h2>

              <div className="mt-4">
                <p className="font-semibold text-slate-900">
                  {ticket.customerName}
                </p>

                <a
                  href={`mailto:${ticket.customerEmail}`}
                  className="mt-1 block text-sm text-blue-600 hover:text-blue-700"
                >
                  {ticket.customerEmail}
                </a>
              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Issue Description
              </h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {ticket.description}
              </p>
            </section>

            {/* Notes */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Notes</h2>

                <span className="text-xs font-medium text-slate-400">
                  {ticket.notes?.length || 0} notes
                </span>
              </div>

              {ticket.notes?.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {ticket.notes.map((item, index) => (
                    <div
                      key={`${item.createdAt}-${index}`}
                      className="rounded-xl bg-slate-50 p-4"
                    >
                      <p className="text-sm leading-6 text-slate-700">
                        {item.noteText}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
                  <p className="text-sm text-slate-400">
                    No notes have been added yet.
                  </p>
                </div>
              )}

              {/* Add note */}
              <div className="mt-6 border-t border-slate-100 pt-6">
                <label
                  htmlFor="note"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Add internal note
                </label>

                <textarea
                  id="note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Write a note about this ticket..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-slate-900">
                Update Ticket
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Change the status or add a note.
              </p>

              <div className="mt-6">
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Status
                </label>

                <select
                  id="status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={
                  updating || (!note.trim() && status === ticket.status)
                }
                className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
