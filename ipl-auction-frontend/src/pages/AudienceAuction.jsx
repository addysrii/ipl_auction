import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import {socket} from "../api/socket";

export default function AudienceAuction() {
  const { id: auctionId } = useParams();

  const [category, setCategory] = useState(null);
  const [player, setPlayer] = useState(null);


  useEffect(() => {
    const loadAuction = async () => {
      const res = await API.get(`/auctions/${auctionId}`);
      setCategory(res.data.currentCategory);
      setPlayer(res.data.currentPlayer);
    };

    loadAuction();
  }, [auctionId]);

  useEffect(() => {
    socket.on("categorySelected", setCategory);
    socket.on("playerRevealed", setPlayer);

    return () => {
      socket.off("categorySelected");
      socket.off("playerRevealed");
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
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
  );
}
