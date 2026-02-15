import express from "express";
import { placeBid, closeBidding, getHighestBid } from "../controllers/bidController.js";

const router = express.Router();
router.post("/", placeBid);
router.post("/close", closeBidding);
router.get("/highest/:auctionId/:playerId", getHighestBid);

export default router;
