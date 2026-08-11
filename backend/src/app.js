import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticket.route.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes 
app.use("/api/tickets", ticketRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Support CRM API is running",
  });
});

export default app;