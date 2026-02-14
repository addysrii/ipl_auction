export default function PlayerCard({ player }) {
  return (
    <div className="border rounded-xl p-5 text-center">
      <h3 className="font-semibold">{player.name}</h3>
      <p className="text-sm text-gray-500">{player.role}</p>

      <p className="mt-2 font-bold text-blue">
        Base ₹ {player.basePrice / 10000000} Cr
      </p>

      {player.status === "SOLD" && (
        <span className="text-red font-bold">SOLD</span>
      )}
    </div>
  );
}
