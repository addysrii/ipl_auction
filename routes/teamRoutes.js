import express from "express";
import { createTeam, getTeams,getTeam, updateTeam, deleteTeam, teamLogin } from "../controllers/teamController.js";

const router = express.Router();
router.post("/", createTeam);
router.get("/", getTeams);
router.get("/:id", getTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);
router.post("/login", teamLogin);

export default router;
