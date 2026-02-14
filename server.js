import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import teamRoutes from "./routes/teamRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: "https://ipl-auction-eta.vercel.app",
  credentials: true
}));

const io = new Server(httpServer, {
  cors: {
    origin: "https://ipl-auction-eta.vercel.app",
    methods: ["GET", "POST"]
  }
});

// 🔥 THIS IS THE MISSING PIECE
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());

app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/bids", bidRoutes);

// 🔴 SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("placeBid", (bidData) => {
    io.emit("newBid", bidData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
