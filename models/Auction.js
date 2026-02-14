import e from "express";
import mongoose from "mongoose";
const auctionSchema = new mongoose.Schema({
  name: String,

  status: {
    type: String,
    enum: ["NOT_STARTED", "LIVE", "COMPLETED"],
    default: "NOT_STARTED"
  },

  currentCategory: {
    type: String,
    default: null
  },

  currentPlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player"
  },

  shownPlayers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player"
    }
  ]
});

export default mongoose.model("Auction", auctionSchema);