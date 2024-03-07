import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
