import api from "./api";

// Get all tickets
export const getTickets = async (params = {}) => {
  const response = await api.get("/tickets", {
    params,
  });

  return response.data;
};

// Create a new ticket
export const createTicket = async (ticketData) => {
  const response = await api.post("/tickets", ticketData);

  return response.data;
};

// Get a single ticket
export const getTicketById = async (ticketId) => {
  const response = await api.get(`/tickets/${ticketId}`);

  return response.data;
};

// Update a ticket
export const updateTicket = async (ticketId, updateData) => {
  const response = await api.put(
    `/tickets/${ticketId}`,
    updateData
  );

  return response.data;
};