import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import {socket} from "../api/socket";

export default function TeamAuction() {
  const { id: auctionId } = useParams();
  const team = JSON.parse(localStorage.getItem("team"));

  const [category, setCategory] = useState(null);
  const [player, setPlayer] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [amount, setAmount] = useState("");


  useEffect(() => {
    const loadAuction = async () => {
      const res = await API.get(`/auctions/${auctionId}`);
      setCategory(res.data.currentCategory);
      setPlayer(res.data.currentPlayer);

      if (res.data.currentPlayer) {
        const bidRes = await API.get(
          `/bids/highest/${auctionId}/${res.data.currentPlayer._id}`
        );
        setHighestBid(bidRes.data);
      }
    };

    loadAuction();
  }, [auctionId]);

  useEffect(() => {
    socket.on("categorySelected", setCategory);

    socket.on("playerRevealed", async (p) => {
      setPlayer(p);
      setHighestBid(null);

      const bidRes = await API.get(
        `/bids/highest/${auctionId}/${p._id}`
      );
      setHighestBid(bidRes.data);
    });

    socket.on("newBid", (bid) => {
      if (
        bid.auctionId === auctionId &&
        bid.playerId === player?._id
      ) {
        setHighestBid(bid);
      }
    });

    socket.on("bidError", alert);

    return () => {
      socket.off("categorySelected");
      socket.off("playerRevealed");
      socket.off("newBid");
      socket.off("bidError");
    };
  }, [auctionId, player]);

  
  const placeBid = () => {
    if (!amount || !player) return;

    socket.emit("placeBid", {
      auctionId,
      playerId: player._id,
      teamId: team._id,
      amount: Number(amount)
    });

    setAmount("");
  };

 
  return (
    <div className="p-8 bg-white min-h-screen">

      <h1 className="text-2xl font-bold text-blue mb-2">
        Live Auction
      </h1>
      <p className="mb-6">Team: {team.name}</p>

      {category && (
        <h2 className="text-xl font-bold text-yellow mb-4">
          {category.replaceAll("_", " ")}
        </h2>
      )}

      {player && (
        <div className="border rounded-xl p-6 flex gap-6 mb-6">
          <img
            src={player.profilePicture}
            className="w-32 h-32 rounded-full"
          />

          <div>
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <p>Base ₹ {player.basePrice} L</p>
            <p>⭐ {player.rating}/10</p>

            {highestBid && (
              <p className="mt-2 font-bold text-green">
                Highest Bid: ₹ {highestBid.amount} L
              </p>
            )}
          </div>
        </div>
      )}

      {player && (
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Bid (Lakhs)"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <button
            onClick={placeBid}
            className="bg-green text-black px-6 py-2 rounded font-semibold"
          >
            Place Bid
          </button>
        </div>
      )}
    </div>
  );
}
