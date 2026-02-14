import { useAuction } from "../context/AuctionContext";

export default function Dashboard() {
  const { teams, players, auction } = useAuction();

  const sold = players.filter(p => p.status === "SOLD").length;

  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      <Stat title="Teams" value={teams.length} color="blue" />
      <Stat title="Players Sold" value={sold} color="green" />
      <Stat title="Unsold" value={players.length - sold} color="red" />
      <Stat title="Auction" value={auction?.status} color="yellow" />
    </div>
  );
}

const Stat = ({ title, value, color }) => (
  <div className={`p-5 rounded-xl bg-${color} text-white`}>
    <p>{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
  </div>
);
