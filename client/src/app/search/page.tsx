"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Race = {
  id: string;
  name: string;
  distance: string | null;
  date: string | null;
  city: string | null;
  difficulty: "Facile" | "Moyenne" | "Difficile" | null;
  image: string | null;
  description: string | null;
  capacity: number | null;
};

export default function SearchPage() {
  const supabase = createClient();

  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [distance, setDistance] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchRaces = async () => {
    setLoading(true);
    setError(null);

    let query = supabase
      .from("races")
      .select("*")
      .order("date", { ascending: true });

    if (searchTerm.trim()) {
      query = query.ilike("name", `%${searchTerm.trim()}%`);
    }

    if (city.trim()) {
      // on fait un ilike pour permettre "par" -> "Paris"
      query = query.ilike("city", `%${city.trim()}%`);
    }

    if (difficulty) {
      query = query.eq("difficulty", difficulty);
    }

    if (distance) {
      query = query.eq("distance", distance);
    }

    if (fromDate) {
      // fromDate en format YYYY-MM-DD -> compat avec TIMESTAMP
      query = query.gte("date", fromDate);
    }

    if (toDate) {
      query = query.lte("date", toDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      setError(error.message);
    } else if (data) {
      setRaces(data as Race[]);
    }

    setLoading(false);
  };

  // Première récupération des courses
  useEffect(() => {
    fetchRaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRaces();
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 px-6 py-12 flex flex-col items-center">
      <section className="w-full max-w-5xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-white tracking-tight text-center">
          Rechercher une course
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Filtre les courses en fonction de la distance, de la ville, de la
          difficulté ou de la date.
        </p>

        {/* Barre de filtres */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 mb-10 shadow-xl space-y-4"
        >
          {/* Ligne 1 : texte + distance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Nom de la course
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Marathon de Paris, Trail du Ventoux..."
                className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Distance
              </label>
              <select
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Toutes les distances</option>
                <option value="5 km">5 km</option>
                <option value="10 km">10 km</option>
                <option value="21 km">21 km</option>
                <option value="42 km">42 km</option>
              </select>
            </div>
          </div>

          {/* Ligne 2 : ville + difficulté */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Ville
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Paris, Lyon, Marseille..."
                className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Difficulté
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Toutes les difficultés</option>
                <option value="Facile">Facile</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Difficile">Difficile</option>
              </select>
            </div>
          </div>

          {/* Ligne 3 : dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Date à partir de
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Jusqu&apos;au
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Bouton recherche */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition"
            >
              Rechercher
            </button>
          </div>
        </form>

        {/* Résultats */}
        {loading && (
          <p className="text-center text-gray-400">Chargement des courses...</p>
        )}

        {error && (
          <p className="text-center text-red-400 mb-4">
            Erreur : {error}
          </p>
        )}

        {!loading && !error && races.length === 0 && (
          <p className="text-center text-gray-400">
            Aucune course ne correspond à ces critères.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {races.map((race) => (
            <Link
              key={race.id}
              href={`/run/${race.id}`}
              className="bg-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:border-indigo-500 transition flex flex-col"
            >
              {race.image && (
                <div className="relative w-full h-40">
                  <Image
                    src={race.image}
                    alt={race.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-white">
                  {race.name}
                </h2>
                <div className="text-xs text-gray-400 flex flex-wrap gap-2">
                  {race.city && (
                    <span className="px-2 py-1 rounded-full bg-gray-900 border border-gray-700">
                      {race.city}
                    </span>
                  )}
                  {race.distance && (
                    <span className="px-2 py-1 rounded-full bg-gray-900 border border-gray-700">
                      {race.distance}
                    </span>
                  )}
                  {race.difficulty && (
                    <span className="px-2 py-1 rounded-full bg-gray-900 border border-gray-700">
                      {race.difficulty}
                    </span>
                  )}
                </div>
                {race.date && (
                  <p className="text-xs text-gray-400">
                    Le {new Date(race.date).toLocaleDateString("fr-FR")}
                  </p>
                )}
                {race.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {race.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
