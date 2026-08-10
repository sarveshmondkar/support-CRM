import express from "express";

import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
} from "../controllers/ticket.controller.js";

const router = express.Router();

// Create a new ticket
router.post("/", createTicket);

// Get all tickets
router.get("/", getTickets);

// Get a single ticket
router.get("/:ticketId", getTicketById);

// Update a ticket
router.put("/:ticketId", updateTicket);

export default router;