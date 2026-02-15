import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function TeamDashboard() {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();

  const team = JSON.parse(localStorage.getItem("team"));

  useEffect(() => {
    API.get("/auctions").then(res => setAuctions(res.data));
  }, []);

  if (!team) {
    navigate("/team/login");
    return null;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue">
        Welcome, {team.name}
      </h1>

      <h2 className="text-lg font-semibold mb-4">Available Auctions</h2>

      <ul className="space-y-3">
        {auctions.map(a => (
          <li
            key={a._id}
            onClick={() => navigate(`/team/auction/${a._id}`)}
            className="border p-4 rounded cursor-pointer hover:bg-gray-50"
          >
            <p className="font-semibold">{a.name}</p>
            <p className="text-sm text-gray-500">
              Status: {a.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
