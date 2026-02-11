import express from "express";
import { createPlayer, getPlayers } from "../controllers/player.controller.js";

const router = express.Router();

router.post("/create", createPlayer);
router.get("/", getPlayers);    

export default router