import express from "express";
import { placeBid, closeBidding } from "../controllers/bidController.js";

const router = express.Router();
router.post("/", placeBid);
router.post("/close", closeBidding);

export default router;
