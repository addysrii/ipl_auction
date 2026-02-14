import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
 rating: Number,
  basePrice: Number,
  soldPrice: Number,
  status: { type: String, enum: ["UNSOLD", "SOLD"], default: "UNSOLD" },
  soldTo: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  category: {
  type: String,
  
},
profilePicture: {
  type: String,
  
},
});

export default mongoose.model("Player", playerSchema);
