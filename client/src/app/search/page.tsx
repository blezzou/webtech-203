"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { races as localRaces } from "@/data/data";

type Race = {
  id: string;
  name: string;
  city: string;
  date: string;
};

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRaces = () => {
    setLoading(true);

    const q = query.trim().toLowerCase();

    const results = localRaces.filter((race) => {
      return (
        race.name.toLowerCase().includes(q) ||
        race.city.toLowerCase().includes(q)
      );
    });

    setRaces(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchRaces();
  }, [query]);

  return (
    <main className="min-h-screen p-6 text-gray-200">
      <h1 className="text-3xl mb-6 font-bold">
        Résultats pour : "<span className="text-indigo-400">{query}</span>"
      </h1>

      {loading && <p>Chargement...</p>}

      {!loading && races.length === 0 && <p>Aucun résultat trouvé.</p>}

      <div className="grid gap-4 mt-6">
        {races.map((r) => (
          <Link
            key={r.id}
            href={`/run/${r.id}`}
            className="p-4 bg-[#111] border border-gray-700 rounded-lg hover:border-indigo-500 transition"
          >
            <h2 className="text-xl font-bold">{r.name}</h2>
            <p className="text-gray-400">{r.city}</p>
            <p className="text-gray-500 text-sm">
              {new Date(r.date).toLocaleDateString("fr")}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
