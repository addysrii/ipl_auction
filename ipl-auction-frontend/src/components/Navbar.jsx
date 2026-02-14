import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b">
      <h1 className="text-2xl font-bold text-blue">Auction Simulator</h1>
      <div className="flex gap-6 font-medium">
        <Link to="/">Dashboard</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/players">Players</Link>
        <Link to="/auction">Auction</Link>
      </div>
    </div>
  );
}
