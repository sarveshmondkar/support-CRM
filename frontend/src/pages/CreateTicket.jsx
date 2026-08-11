import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createTicket } from "../services/ticketService";
import toast from "react-hot-toast";

function CreateTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const ticket = await createTicket(formData);
      toast.success(`Ticket ${ticket.ticketId} created successfully`);

      navigate(`/tickets/${ticket.ticketId}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create ticket. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            <span className="ml-2">Back to tickets</span>
          </Link>

          <div className="mt-6">
            <p className="text-sm font-medium text-blue-600">
              New support request
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Create a new ticket
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add the customer and issue details below.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="customerName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Customer name
              </label>

              <input
                id="customerName"
                name="customerName"
                type="text"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="customerEmail"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Customer email
              </label>

              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="rahul@example.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Issue title
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Payment failed"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the customer's issue..."
              rows={6}
              required
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/"
              className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
