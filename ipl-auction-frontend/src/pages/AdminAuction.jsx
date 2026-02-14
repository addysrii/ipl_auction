import { useEffect, useState } from "react";
import API from "../api/api";
import React from "react";
export default function AdminAuction() {
  const [auction, setAuction] = useState(null);
  const [category, setCategory] = useState("");
  const auctionId = '6990791ed6cfa73432d8865c';

  useEffect(() => {
    const loadAuction = async () => {
      const res = await API.get(`/auctions/${auctionId}`);
      setAuction(res.data);
      setCategory(res.data.currentCategory || "");
    };

    loadAuction();
  }, []);

  const selectCategory = async () => {
    await API.post("/auctions/select-category", {
      auctionId,
      category
    });
  };

  const generatePlayer = async () => {
    await API.post("/auctions/random-player", { auctionId });
  };

  if (!auction) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border px-4 py-2 rounded mb-4"
      >
        <option value="">Select category</option>
        <option>Star_Indian_Batter</option>
        <option>Foreign_Batters </option>
        <option>Indian_Wicketkeppers  </option>
      </select>

      <div className="flex gap-3">
        <button
          onClick={selectCategory}
          className="bg-blue text-black px-4 py-2 rounded "
        >
          Select Category
        </button>

        <button
          onClick={generatePlayer}
          className="bg-green text-blue px-4 py-2 rounded"
        >
          Generate Player
        </button>
      </div>
    </div>
  );
}
