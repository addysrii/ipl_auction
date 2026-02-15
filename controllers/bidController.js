import Bid from "../models/Bid.js";
import Team from "../models/Team.js";
import Player from "../models/Player.js";

export const placeBid = async (req, res) => {
  const { auctionId, playerId, teamId, amount } = req.body;

  const team = await Team.findById(teamId);
  if (team.purse < amount)
    return res.status(400).json({ message: "Insufficient purse" });

  const bid = await Bid.create({
    auction: auctionId,
    player: playerId,
    team: teamId,
    amount
  });


  req.io.emit("newBid", bid);

  res.status(201).json(bid);
};

export const closeBidding = async (req, res) => {
  const { playerId } = req.body;

  const highestBid = await Bid.find({
  auction: auctionId,
  player: playerId
})
  .sort({ amount: -1 })
  .limit(1)
  .populate("team");

  if (!highestBid.length)
    return res.json({ message: "Player Unsold" });

  const bid = highestBid[0];
  const team = bid.team;

  team.purse -= bid.amount;
  team.players.push(playerId);
  await team.save();

  await Player.findByIdAndUpdate(playerId, {
    soldPrice: bid.amount,
    soldTo: team._id,
    status: "SOLD"
  });
req.io.emit("playerSold", {
  playerId,
  team: team._id,
  amount: bid.amount
});

  res.json({ message: "Player Sold", team, bid });
};
export const getHighestBid = async (req, res) => {
  const { auctionId, playerId } = req.params;

  const bid = await Bid.findOne({
    auction: auctionId,
    player: playerId
  })
    .sort({ amount: -1 })
    .populate("team", "name");

  res.json(bid);
};
