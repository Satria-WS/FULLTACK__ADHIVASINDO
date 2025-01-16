import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db"; // Import the connectDb function
import authRoutes from './routes/authRoutes';
import contentRouters from "./routes/contentRoutes";


dotenv.config();

const app = express();

app.use(express.json());  // Untuk parsing body JSON

// Rute untuk autentikasi
app.use('/api/auth', authRoutes);
app.use('/api',contentRouters)

connectDb().then(() => {
  app.listen(9000, () => {
    console.log(`Server running on port ${9000}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database:", err);
  process.exit(1); // Exit the process with failure
});