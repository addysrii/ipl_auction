import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [auctions, setAuctions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);


  const [auctionName, setAuctionName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamPurse, setTeamPurse] = useState("")
  const [teamPassword, setTeamPassword] = useState("")
const navigate = useNavigate();
  const [player, setPlayer] = useState({
    name: "",
    rating: "",
    basePrice: "",
    category: "",
    profilePicture: ""
  });


  const loadAll = async () => {
    const [a, t, p] = await Promise.all([
      API.get("/auctions"),
      API.get("/teams"),
      API.get("/players")
    ]);

    setAuctions(a.data);
    setTeams(t.data);
    setPlayers(p.data);
  };

  useEffect(() => {
    loadAll();
  }, []);

 

  const createAuction = async () => {
    if (!auctionName) return;
    await API.post("/auctions", { name: auctionName });
    setAuctionName("");
    loadAll();
  };

  const createTeam = async () => {
    if (!teamName || !teamPurse) return;
    await API.post("/teams", {
      name: teamName,
      purse: Number(teamPurse),
      password: teamPassword,
    });
    setTeamName("");
    setTeamPurse("");
    loadAll();
  };

  const createPlayer = async () => {
    await API.post("/players", {
      ...player,
      rating: Number(player.rating),
      basePrice: Number(player.basePrice)
    });

    setPlayer({
      name: "",
      rating: "",
      basePrice: "",
      category: "",
      profilePicture: ""
    });

    loadAll();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-8 bg-white min-h-screen space-y-10">

      <h1 className="text-3xl font-bold text-blue">
        Admin Dashboard
      </h1>

      {/* AUCTIONS */}
      <Section title="Auctions">
        <div className="flex gap-4 mb-4">
          <input
            placeholder="Auction name"
            value={auctionName}
            onChange={e => setAuctionName(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={createAuction}
            className="bg-blue text-black px-4 py-2 rounded"
          >
            Create Auction
          </button>
        </div>

       <List
  items={auctions}
  field="name"
  clickable
/>
      </Section>

      {/* TEAMS */}
      <Section title="Teams">
        <div className="flex gap-4 mb-4">
          <input
            placeholder="Team name"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            placeholder="Purse (Lakhs)"
            value={teamPurse}
            onChange={e => setTeamPurse(e.target.value)}
            className="border px-3 py-2 rounded"
          />
            <input
            placeholder="Password"
            value={teamPassword}
            onChange={e => setTeamPassword(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <button
            onClick={createTeam}
            className="bg-green text-white px-4 py-2 rounded"
          >
            Create Team
          </button>
        </div>

        <List
          items={teams}
          render={t => `${t.name} – ₹${t.purse}L`}
        />
      </Section>

      {/* PLAYERS */}
      <Section title="Players">
        <div className="grid grid-cols-5 gap-3 mb-4">
          {["name", "rating", "basePrice", "category", "profilePicture"].map(
            key => (
              <input
                key={key}
                placeholder={key}
                value={player[key]}
                onChange={e =>
                  setPlayer({ ...player, [key]: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />
            )
          )}
        </div>

        <button
          onClick={createPlayer}
          className="bg-yellow px-6 py-2 rounded font-semibold"
        >
          Create Player
        </button>

        <div className="mt-4 grid grid-cols-4 gap-4">
          {players.map(p => (
            <div
              key={p._id}
              className="border rounded p-3 text-sm"
            >
              <p className="font-semibold">{p.name}</p>
              <p>{p.category}</p>
              <p>₹ {p.basePrice} L</p>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}

/* ---------- SMALL REUSABLE COMPONENTS ---------- */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-bold mb-3">{title}</h2>
    {children}
  </div>
);

const List = ({ items, field, render, clickable = false }) => {
  const navigate = useNavigate();

  return (
    <ul className="list-disc pl-6">
      {items.map(item => (
        <li
          key={item._id}
          onClick={
            clickable
              ? () => navigate(`/admin/auction/${item._id}`)
              : undefined
          }
          className={
            clickable
              ? "cursor-pointer text-blue hover:underline"
              : ""
          }
        >
          {render ? render(item) : item[field]}
        </li>
      ))}
    </ul>
  );
};
