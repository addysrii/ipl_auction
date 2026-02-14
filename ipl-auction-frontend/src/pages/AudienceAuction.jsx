import { useEffect, useState } from "react";
import API from "../api/api";
import {socket} from "../api/socket";
import { motion } from "framer-motion";
export default function AudienceAuction() {
  const [category, setCategory] = useState(null);
  const [player, setPlayer] = useState(null);
  const auctionId = "69908694ecf7fc71e80393ff";

  // 🔹 LOAD STATE ON REFRESH
  useEffect(() => {
    const loadAuction = async () => {
      const res = await API.get(`/auctions/${auctionId}`);
      setCategory(res.data.currentCategory);
      setPlayer(res.data.currentPlayer);
    };

    loadAuction();
  }, []);

  // 🔹 LIVE UPDATES
  useEffect(() => {
    socket.on("categorySelected", (cat) => {
      setCategory(cat);
      setPlayer(null);
    });

    socket.on("playerRevealed", (p) => {
      setPlayer(p);
    });

    return () => {
      socket.off("categorySelected");
      socket.off("playerRevealed");
    };
  }, []);

  return (
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen p-6"
    >
      <h1 className="text-3xl font-bold mb-4">Audience</h1>
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {category && (
        <h1 className="text-4xl font-bold text-yellow mb-8">
          {category.replaceAll("_", " ")}
        </h1>
      )}

      {player && (
        <div className="border rounded-2xl p-8 flex gap-6 shadow-xl">
          <img
            src={player.profilePicture}
            alt={player.name}
            className="w-48 h-48 rounded-full"
          />

          <div>
            <h2 className="text-3xl font-bold">{player.name}</h2>
            <p className="text-xl text-blue">
              Base ₹ {player.basePrice} L
            </p>
            <p className="text-xl text-green">
              ⭐ Rating {player.rating}/10
            </p>
          </div>
        </div>
      )}
    </div>
       </motion.div>
  );
}
