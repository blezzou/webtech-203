import { races } from "@/data/data";

export default function MyRuns({ currentUser }: { currentUser: any }) {
  const myRaces = races.filter((r) => r.creatorId === currentUser.id);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-white mb-6">Mes courses publiées</h1>
      {myRaces.map((race) => (
        <div key={race.id} className="bg-[#1a1a1a] p-4 rounded-lg mb-4">
          <p className="text-lg text-white font-semibold">{race.name}</p>
          <p className="text-gray-400">{race.date}</p>
          <p className="text-gray-500 text-sm">{race.participants?.length || 0} participants</p>
        </div>
      ))}
    </div>
  );
}

