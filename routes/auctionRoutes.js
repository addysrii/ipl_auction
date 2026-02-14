    import express from "express";
import {
  createAuction,
  startAuction,
  setCurrentPlayer,
  getAuctions,
  randomizePlayer,
  startNextCategory,
  nextPlayer,
  revealRandomPlayer,
  selectCategory,
  generateRandomPlayer,
  getAuctionState
} from "../controllers/auctionController.js";

const router = express.Router();
router.post("/", createAuction);
router.put("/:id/start", startAuction);
router.put("/:id/player", setCurrentPlayer);
router.put("/:id/end", setCurrentPlayer);
router.get("/",getAuctions)
router.post("/start-category", startNextCategory);
router.post("/next-player", nextPlayer);
router.post("/select-category", selectCategory);
router.post("/reveal-player", revealRandomPlayer);
router.post("/random-player", generateRandomPlayer);
router.get("/:id", getAuctionState);

router.post("/randomize", randomizePlayer);
export default router;
