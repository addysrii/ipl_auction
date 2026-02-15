import mongoose from "mongoose";
const bidSchema = new mongoose.Schema({
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction"
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player"
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Bid", bidSchema);