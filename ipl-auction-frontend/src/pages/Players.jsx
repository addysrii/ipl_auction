import { useAuction } from "../context/AuctionContext";

export default function Players() {
  const { players } = useAuction();

  return (
    <div className="p-6 grid grid-cols-5 gap-4">
      {players.map(p => (
        <div key={p._id} className="border rounded-xl p-4 text-center">
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm">{p.role}</p>
          <p className="font-bold text-blue mt-1">
            ₹ {p.basePrice / 10000000} Cr
          </p>
          {p.status === "SOLD" && (
            <p className="text-red font-bold">SOLD</p>
          )}
        </div>
      ))}
    </div>
  );
}
