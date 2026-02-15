import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function AdminAuction() {
  const { id: auctionId } = useParams();

  const [auction, setAuction] = useState(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const loadAuction = async () => {
      const res = await API.get(`/auctions/${auctionId}`);
      setAuction(res.data);
      setCategory(res.data.currentCategory || "");
    };

    loadAuction();
  }, [auctionId]);

  const selectCategory = async () => {
    await API.post("/auctions/select-category", {
      auctionId,
      category
    });
  };

  const generatePlayer = async () => {
    await API.post("/auctions/random-player", {
      auctionId
    });
  };

  if (!auction) return <p className="p-6">Loading auction...</p>;

  return (
    <div className="p-8 bg-white min-h-screen">

      <h1 className="text-2xl font-bold text-blue mb-6">
        Auction: {auction.name}
      </h1>

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border px-4 py-3 rounded mb-4"
      >
        <option value="">Select category</option>
        

        <option>Normal_Indian_Batters </option>
        <option>All_Rounders_Indian </option>
        <option>Foreign_All_Rounders </option>
        <option>Indian_Wicketkeppers </option>
        <option>Foreign_Wicket_Keepers </option>
        <option>Indian_Fast_Bowlers  </option>
        <option>Foreign_Fast_Bowlers </option>
        <option>Indian_Spinners </option>
        <option>Foreign_Spinners </option>
        

      </select>

      <div className="flex gap-4">
        <button
          onClick={selectCategory}
          className="bg-blue text-black px-6 py-2 rounded"
        >
          Select Category
        </button>

        <button
          onClick={generatePlayer}
          className="bg-green text-black px-6 py-2 rounded"
        >
          Generate Random Player
        </button>
      </div>
    </div>
  );
}
