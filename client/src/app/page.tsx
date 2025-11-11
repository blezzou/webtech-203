import Image from "next/image";
import Link from "next/link";
import { races } from "@/data/data";

export default function Home() {
  const popularRaces = races.slice(0, 4);
  const tenKmRaces = races.filter((r) => r.distance === "10 km");
  const hardRaces = races.filter((r) => r.difficulty === "Difficile");

  return (
    
    <div className="flex flex-col items-center gap-24 px-6 py-12">
      {/* Hero */}
      <section className="text-center max-w-2xl mt-10">
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-white tracking-tight">
          Trouvez votre prochain défi
        </h2>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Recherchez une course (ville, distance...)"
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition"
          />
        </div>
      </section>

      {/* Sections de courses */}
      <RaceSection title="Courses populaires" races={popularRaces} />
      <RaceSection title="Courses 10 km" races={tenKmRaces} />
      <RaceSection title="Courses difficiles" races={hardRaces} />

      {/* News */}
      <NewsSection title="Dernières actualités" />
    </div>
  );
}

/* Composant de section course */
function RaceSection({
  title,
  races,
}: {
  title: string;
  races: typeof import("@/data/data").races;
}) {
  return (
    <section className="w-full max-w-6xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <button className="text-blue-500 hover:underline text-sm transition">Voir tout</button>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {races.map((race) => (
          <Link
            key={race.id}
            href={`/run/${race.id}`}
            className="min-w-[250px] bg-[#1a1a1a] rounded-2xl p-4 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden">
              <Image src={race.image} alt={race.name} fill className="object-cover" />
            </div>
            <h4 className="text-lg font-bold text-white">{race.name}</h4>
            <p className="text-gray-400">{race.distance}</p>
            <p className="text-gray-500 text-sm">{race.date}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* Composant de section news */
function NewsSection({ title }: { title: string }) {
  const fakeNews = [
    { title: "Record battu au marathon de Berlin !", date: "Septembre 2025" },
    { title: "Une nouvelle course à Annecy annoncée", date: "Août 2025" },
  ];

  return (
    <section className="w-full max-w-6xl mt-8">
      <h3 className="text-2xl font-semibold text-white mb-6">{title}</h3>
      <div className="grid sm:grid-cols-2 gap-6">
        {fakeNews.map((news, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] p-6 rounded-2xl shadow-md hover:shadow-lg transition hover:-translate-y-1"
          >
            <h4 className="font-bold mb-2 text-white">{news.title}</h4>
            <p className="text-gray-500 text-sm">{news.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
