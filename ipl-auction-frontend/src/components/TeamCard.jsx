export default function TeamCard({ team }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <h2 className="font-semibold text-lg">{team.name}</h2>
      <p className="text-green font-bold">
        ₹ {team.purse / 10000000} Cr
      </p>
    </div>
  );
}
