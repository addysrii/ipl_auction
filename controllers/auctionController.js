import Auction from "../models/Auction.js";
import Player from "../models/Player.js";
export const createAuction = async (req, res) => {
  const auction = await Auction.create(req.body);
  res.status(201).json(auction);
};
const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const startAuction = async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  auction.status = "LIVE";
  await auction.save();
  res.json(auction);
};
export const startNextCategory = async (req, res) => {
  const { auctionId } = req.body;

  const auction = await Auction.findById(auctionId);

  // If all categories finished
  if (auction.currentCategoryIndex >= auction.categoryOrder.length) {
    auction.status = "COMPLETED";
    await auction.save();
    return res.json({ message: "Auction Completed" });
  }

  const category =
    auction.categoryOrder[auction.currentCategoryIndex];

  // Get all UNSOLD players of that category
  let players = await Player.find({
    category,
    status: "UNSOLD"
  });

  if (players.length === 0) {
    // Skip empty category
    auction.currentCategoryIndex += 1;
    await auction.save();
    return startNextCategory(req, res);
  }

  // Shuffle once (IPL rule)
  players = shuffleArray(players);

  auction.categoryPlayersQueue = players.map(p => p._id);
  auction.currentPlayerIndex = 0;
  auction.currentPlayer = players[0]._id;

  await auction.save();

  res.json({
    message: `Category ${category} started`,
    category,
    currentPlayer: players[0]
  });
};
export const nextPlayer = async (req, res) => {
  const { auctionId } = req.body;

  const auction = await Auction.findById(auctionId)
    .populate("categoryPlayersQueue");

  auction.currentPlayerIndex += 1;

  // Category finished
  if (
    auction.currentPlayerIndex >=
    auction.categoryPlayersQueue.length
  ) {
    auction.currentCategoryIndex += 1;
    auction.categoryPlayersQueue = [];
    auction.currentPlayer = null;
    await auction.save();

    return res.json({
      message: "Category finished. Move to next category."
    });
  }

  auction.currentPlayer =
    auction.categoryPlayersQueue[auction.currentPlayerIndex]._id;

  await auction.save();

  res.json({
    currentPlayer:
      auction.categoryPlayersQueue[auction.currentPlayerIndex]
  });
};
export const selectCategory = async (req, res) => {
  const { auctionId, category } = req.body;

  const auction = await Auction.findByIdAndUpdate(
    auctionId,
    {
      currentCategory: category,
      currentPlayer: null,
      shownPlayers: []
    },
    { new: true }
  );

  req.io.emit("categorySelected", category);

  res.json({
    message: "Category selected",
    category
  });
};


export const revealRandomPlayer = async (req, res) => {
  const { auctionId, category } = req.body;

  const players = await Player.find({
    category,
    status: "UNSOLD"
  });

  const random =
    players[Math.floor(Math.random() * players.length)];

  await Auction.findByIdAndUpdate(auctionId, {
    currentPlayer: random._id
  });

  req.io.emit("playerRevealed", random);

  res.json({ player: random });
};

export const randomizePlayer = async (req, res) => {
  const { auctionId, category } = req.body;

  
  const players = await Player.find({
    category: category,
    status: "UNSOLD"
  });

  if (players.length === 0) {
    return res.status(404).json({
      message: `No unsold players left in ${category}`
    });
  }


  const randomIndex = Math.floor(Math.random() * players.length);
  const selectedPlayer = players[randomIndex];


  const auction = await Auction.findByIdAndUpdate(
    auctionId,
    { currentPlayer: selectedPlayer._id },
    { new: true }
  ).populate("currentPlayer");

  res.json({
    message: "Player randomized",
    player: selectedPlayer,
    auction
  });
};
export const setCurrentPlayer = async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  auction.currentPlayer = req.body.playerId;
  await auction.save();
  res.json(auction);
};
export const getAuction = async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  res.json(auction);
};

export const getAuctions = async (req, res) => {
  const auctions = await Auction.find();
  res.json(auctions);
}; 
export const generateRandomPlayer = async (req, res) => {
  const { auctionId } = req.body;

  const auction = await Auction.findById(auctionId);

  // ✅ Now this works
  if (!auction.currentCategory) {
    return res.status(400).json({
      message: "Select category first"
    });
  }

  const players = await Player.find({
    category: auction.currentCategory,
    status: "UNSOLD",
    _id: { $nin: auction.shownPlayers }
  });

  if (players.length === 0) {
    return res.status(400).json({
      message: "No players left in this category"
    });
  }

  const randomPlayer =
    players[Math.floor(Math.random() * players.length)];

  auction.currentPlayer = randomPlayer._id;
  auction.shownPlayers.push(randomPlayer._id);
  await auction.save();

  req.io.emit("playerRevealed", randomPlayer);

  res.json({
    player: randomPlayer
  });
};
export const getAuctionState = async (req, res) => {
  const auction = await Auction.findById(req.params.id)
    .populate("currentPlayer");

  if (!auction) {
    return res.status(404).json({ message: "Auction not found" });
  }

  res.json(auction);
};
