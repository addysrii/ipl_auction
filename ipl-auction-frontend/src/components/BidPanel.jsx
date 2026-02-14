import socket from "../api/socket";
import { useEffect, useState } from "react";

export default function BidPanel({ player }) {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    socket.on("newBid", (bid) => {
      setBids((prev) => [...prev, bid]);
    });

    return () => socket.off("newBid");
  }, []);

  const placeBid = () => {
    socket.emit("placeBid", {
      team: "RCB",
      amount: Math.floor(Math.random() * 5 + 20) + " Cr"
    });
  };

  return (
    <div className="border rounded-xl p-6">
      <h2 className="text-xl font-bold text-blue">Live Auction</h2>

      <h3 className="mt-3 font-semibold">{player.name}</h3>

      <button
        onClick={placeBid}
        className="mt-4 bg-green text-white px-6 py-3 rounded-lg"
      >
        Place Bid
      </button>

      <div className="mt-6">
        <h4 className="font-semibold">Live Bids</h4>
        {bids.map((b, i) => (
          <p key={i} className="text-sm">
            {b.team} – {b.amount}
          </p>
        ))}
      </div>
    </div>
  );
}
