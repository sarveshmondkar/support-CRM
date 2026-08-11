import Ticket from "../models/ticket.model.js";
import Note from "../models/note.model.js";

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { customerName, customerEmail, subject, description } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !subject || !description) {
      return res.status(400).json({
        message:
          "customerName, customerEmail, subject and description are required",
      });
    }

    // Generate ticket ID
    const ticketCount = await Ticket.countDocuments();
    const ticketId = `TKT-${String(ticketCount + 1).padStart(3, "0")}`;

    const ticket = await Ticket.create({
      ticketId,
      customerName,
      customerEmail,
      subject,
      description,
    });

    return res.status(201).json({
      ticketId: ticket.ticketId,
      createdAt: ticket.createdAt,
    });
  } catch (error) {
    console.error("Create ticket error:", error);

    return res.status(500).json({
      message: "Failed to create ticket",
    });
  }
};

// Get all tickets
export const getTickets = async (req, res) => {
  try {
    const { status, search } = req.query;

    const filter = {};

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Search
    if (search) {
      filter.$or = [
        {
          ticketId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customerName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customerEmail: {
            $regex: search,
            $options: "i",
          },
        },
        {
          subject: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const tickets = await Ticket.find(filter)
      .select("ticketId customerName customerEmail subject status createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json(tickets);
  } catch (error) {
    console.error("Get tickets error:", error);

    return res.status(500).json({
      message: "Failed to fetch tickets",
    });
  }
};

// Get a single ticket
export const getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findOne({
      ticketId,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const notes = await Note.find({
      ticketId: ticket.ticketId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      ticketId: ticket.ticketId,
      customerName: ticket.customerName,
      customerEmail: ticket.customerEmail,
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      
      notes: notes.map((note) => ({
        noteText: note.noteText,
        createdAt: note.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get ticket error:", error);

    return res.status(500).json({
      message: "Failed to fetch ticket",
    });
  }
};

// Update a ticket
export const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status, notes } = req.body;

    // Validate update fields
    if (!status && !notes) {
      return res.status(400).json({
        message: "status or notes is required",
      });
    }

    const ticket = await Ticket.findOne({
      ticketId,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    // Update status
    if (status) {
      ticket.status = status;
      await ticket.save();
    }

    // Add note
    if (notes) {
      await Note.create({
        ticketId: ticket.ticketId,
        noteText: notes,
      });
    }

    return res.status(200).json({
      success: true,
      updatedAt: ticket.updatedAt,
    });
  } catch (error) {
    console.error("Update ticket error:", error);

    return res.status(500).json({
      message: "Failed to update ticket",
    });
  }
};
