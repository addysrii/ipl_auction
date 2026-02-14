import { useState } from "react";
import API from "../api/api";
import { useAuction } from "../context/AuctionContext";

export default function Auction() {
  const { auction, setAuction, bids } = useAuction();

  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!auction) return <p className="p-6">Loading auction...</p>;

  const currentCategory =
    auction.categoryOrder?.[auction.currentCategoryIndex];

 

  const startNextCategory = async () => {
    setLoading(true);
    const res = await API.post("/auctions/start-category", {
      auctionId: auction._id
    });

    if (res.data.currentPlayer) {
      setAuction(prev => ({
        ...prev,
        currentPlayer: res.data.currentPlayer
      }));
    }
    setLoading(false);
  };

  const nextPlayer = async () => {
    setLoading(true);
    const res = await API.post("/auctions/next-player", {
      auctionId: auction._id
    });

    if (res.data.currentPlayer) {
      setAuction(prev => ({
        ...prev,
        currentPlayer: res.data.currentPlayer
      }));
    }
    setLoading(false);
  };

  const placeBid = async () => {
    if (!bidAmount) return;

    await API.post("/bids", {
      auctionId: auction._id,
      playerId: auction.currentPlayer._id,
      teamId: "TEAM_ID_HERE",
      amount: Number(bidAmount)
    });

    setBidAmount("");
  };

  /* ------------------ UI ------------------ */

  return (
    <div className="p-6 grid grid-cols-4 gap-6 bg-white min-h-screen">

      {/* LEFT PANEL – AUCTION CONTROL */}
      <div className="col-span-3">

        {/* CATEGORY BAR */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-blue">
            IPL Auction Simulator
          </h1>

          <span className="px-4 py-2 rounded-full bg-yellow font-semibold">
            Category: {currentCategory}
          </span>
        </div>

        {/* PLAYER DISPLAY */}
        {auction.currentPlayer ? (
          <div className="border rounded-2xl p-6 flex gap-6 shadow">

            {/* PROFILE IMAGE */}
            <img
              src={auction.currentPlayer.profilePicture}
              alt={auction.currentPlayer.name}
              className="w-40 h-40 rounded-full object-cover border"
            />

            {/* PLAYER INFO */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold">
                {auction.currentPlayer.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {auction.currentPlayer.category}
              </p>

              <div className="mt-4 flex gap-6">
                <span className="text-xl font-bold text-blue">
                  💰 Base ₹ {auction.currentPlayer.basePrice} L
                </span>

                <span className="text-xl font-bold text-green">
                  ⭐ Rating {auction.currentPlayer.rating}/10
                </span>
              </div>

              <p className="mt-3 font-semibold text-yellow">
                Status: {auction.currentPlayer.status}
              </p>
            </div>
          </div>
        ) : (
          <div className="border rounded-xl p-6 text-center">
            <p className="text-gray-500">
              No player on board
            </p>
          </div>
        )}

        {/* CONTROLS */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={startNextCategory}
            disabled={loading}
            className="bg-blue text-white px-6 py-3 rounded-lg font-semibold"
          >
            Start / Next Category
          </button>

          <button
            onClick={nextPlayer}
            disabled={loading}
            className="bg-yellow px-6 py-3 rounded-lg font-semibold"
          >
            Next Player
          </button>
        </div>
      </div>

      {/* RIGHT PANEL – BIDDING */}
      <div className="border rounded-xl p-4 shadow">

        <h3 className="font-bold text-lg mb-3 text-blue">
          Live Bidding
        </h3>

        {/* BID INPUT */}
        <input
          type="number"
          placeholder="Bid amount (Lakhs)"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-2"
        />

        <button
          onClick={placeBid}
          className="w-full bg-green text-white py-2 rounded font-semibold"
        >
          Place Bid
        </button>

        {/* BID HISTORY */}
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Bid History</h4>

          {bids.length === 0 && (
            <p className="text-sm text-gray-400">
              No bids yet
            </p>
          )}

          {bids
            .filter(
              b => b.player === auction.currentPlayer?._id
            )
            .slice(-5)
            .reverse()
            .map((bid, i) => (
              <div
                key={i}
                className="flex justify-between text-sm border-b py-1"
              >
                <span>Team</span>
                <span className="font-semibold">
                  ₹ {bid.amount} L
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
