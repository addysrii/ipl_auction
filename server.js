import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import Bid from "./models/Bid.js";
import Team from "./models/Team.js";
import teamRoutes from "./routes/teamRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: "*",
  
  credentials: true
}));

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());

app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/bids", bidRoutes);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("placeBid", async (data) => {
    const { auctionId, playerId, teamId, amount } = data;


    const lastBid = await Bid.findOne({
      auctionId,
      playerId
    }).sort({ amount: -1 });

    if (lastBid && amount <= lastBid.amount) {
      socket.emit("bidError", "Bid must be higher than current bid");
      return;
    }

    const team = await Team.findById(teamId);
    if (!team || team.purse < amount) {
      socket.emit("bidError", "Insufficient purse");
      return;
    }

    const bid = await Bid.create({
      auctionId,
      playerId,
      teamId,
      amount
    });

   
    io.emit("newBid", {
      auctionId,
      playerId,
      teamId,
      amount,
      time: bid.createdAt
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


httpServer.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
