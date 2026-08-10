import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.config.js";

//node dns problem:
import dns from "node:dns";
dns.setServers(["8.8.8.8"]);

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server failed to start: ${error.message}`);
    process.exit(1);
  }
};

startServer();