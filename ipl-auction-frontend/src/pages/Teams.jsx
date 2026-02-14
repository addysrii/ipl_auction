import { useAuction } from "../context/AuctionContext";

export default function Teams() {
  const { teams } = useAuction();

  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      {teams.map(team => (
        <div key={team._id} className="border rounded-xl p-4">
          <h2 className="font-bold">{team.name}</h2>
          <p className="text-green font-semibold">
            ₹ {team.purse / 10000000} Cr
          </p>
          <p className="text-sm mt-2">
            Players: {team.players.length}
          </p>
        </div>
      ))}
    </div>
  );
}
