import dotenv from "dotenv";
import mongoose from "mongoose";
import Ticket from "../models/ticket.model.js";

// //node dns problem:
import dns from "node:dns";
dns.setServers(["8.8.8.8"]);

dotenv.config();

const tickets = [
  {
    ticketId: "TKT-001",
    customerName: "Rahul Sharma",
    customerEmail: "rahul.sharma@example.com",
    subject: "Payment failed",
    description:
      "My payment was deducted from my account but the order was not placed.",
    status: "Open",
    notes: "",
  },
  {
    ticketId: "TKT-002",
    customerName: "Priya Shah",
    customerEmail: "priya.shah@example.com",
    subject: "Unable to login",
    description:
      "I am unable to login to my account even after resetting my password.",
    status: "In Progress",
    notes: "Password reset issue is being investigated.",
  },
  {
    ticketId: "TKT-003",
    customerName: "Amit Patil",
    customerEmail: "amit.patil@example.com",
    subject: "Refund not received",
    description:
      "It has been several days since my refund was initiated and I have not received it.",
    status: "Closed",
    notes: "Refund was successfully processed.",
  },
  {
    ticketId: "TKT-004",
    customerName: "Sneha Kapoor",
    customerEmail: "sneha.kapoor@example.com",
    subject: "Product damaged",
    description:
      "The product I received was damaged and the packaging was also torn.",
    status: "Open",
    notes: "",
  },
  {
    ticketId: "TKT-005",
    customerName: "Vikram Gupta",
    customerEmail: "vikram.gupta@example.com",
    subject: "Wrong item delivered",
    description: "I received a different item than the one I ordered.",
    status: "In Progress",
    notes: "Replacement request has been initiated.",
  },
  {
    ticketId: "TKT-006",
    customerName: "Neha Joshi",
    customerEmail: "neha.joshi@example.com",
    subject: "Order cancellation",
    description: "I want to cancel my order before it gets shipped.",
    status: "Open",
    notes: "",
  },
  {
    ticketId: "TKT-007",
    customerName: "Arjun Mehta",
    customerEmail: "arjun.mehta@example.com",
    subject: "Account verification issue",
    description:
      "I am not receiving the verification email on my registered email address.",
    status: "In Progress",
    notes: "Verification email delivery is being checked.",
  },
  {
    ticketId: "TKT-008",
    customerName: "Kavita Deshmukh",
    customerEmail: "kavita.deshmukh@example.com",
    subject: "Delivery delayed",
    description:
      "My order was supposed to arrive yesterday but the delivery is still pending.",
    status: "Open",
    notes: "",
  },
  {
    ticketId: "TKT-009",
    customerName: "Rohan Kulkarni",
    customerEmail: "rohan.kulkarni@example.com",
    subject: "Invoice request",
    description: "I need a copy of the invoice for my recent purchase.",
    status: "Closed",
    notes: "Invoice was sent to the customer's email.",
  },
  {
    ticketId: "TKT-010",
    customerName: "Ananya Rao",
    customerEmail: "ananya.rao@example.com",
    subject: "Unable to update profile",
    description:
      "The profile page is not allowing me to update my phone number.",
    status: "In Progress",
    notes: "Frontend validation issue identified.",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    // Clear existing tickets
    await Ticket.deleteMany({});

    console.log("Existing tickets removed");

    // Insert seed data
    for (const ticket of tickets) {
      await Ticket.create(ticket);
    }

    console.log(`${tickets.length} tickets inserted successfully`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedDatabase();
