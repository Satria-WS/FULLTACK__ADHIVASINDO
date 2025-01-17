import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db"; // Import the connectDb function
import authRouters from './routes/authRoutes';
import contentRouters from "./routes/contentRoutes";
import userRouters from "./routes/userRouter";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());  // Untuk parsing body JSON
app.use(cookieParser());  // Untuk parsing cookies
// Rute untuk autentikasi
app.use('/api/auth', authRouters);
app.use('/api', contentRouters)
app.use('/api',userRouters)

connectDb().then(() => {
  app.listen(9000, () => {
    console.log(`Server running on port ${9000}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database:", err);
  process.exit(1); // Exit the process with failure
});