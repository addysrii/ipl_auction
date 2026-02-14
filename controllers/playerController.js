import Player from "../models/Player.js";

export const createPlayer = async (req, res) => {
  const player = await Player.create(req.body);
  res.status(201).json(player);
};

export const getPlayers = async (req, res) => {
  const players = await Player.find().populate("soldTo");
  res.json(players);
};
