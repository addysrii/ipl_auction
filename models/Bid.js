import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  auction: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" },
  player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  amount: Number,
  time: { type: Date, default: Date.now }
});

export default mongoose.model("Bid", bidSchema);
