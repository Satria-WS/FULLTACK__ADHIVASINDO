import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db"; // Import the connectDb function

dotenv.config();

const app = express();

connectDb().then(() => {
  app.listen(9000, () => {
    console.log(`Server running on port ${9000}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database:", err);
  process.exit(1); // Exit the process with failure
});