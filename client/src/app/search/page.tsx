"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { races as localRaces } from "@/data/data";

type Race = {
  id: string;
  name: string;
  city: string;
  distance: number; // converti depuis le dataset
  difficulty: string;
  date: string;
};

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q")?.toLowerCase() || "";

  const [cityFilter, setCityFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [minDistance, setMinDistance] = useState<number | "">("");
  const [maxDistance, setMaxDistance] = useState<number | "">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔹 Normalisation des données
  const races: Race[] = useMemo(() => {
    return localRaces.map((r) => ({
      ...r,
      distance: Number(String(r.distance).replace(/[^0-9]/g, "")), // "10 km" → 10
    })) as Race[];
  }, []);

  // 🔹 Extraire dynamiquement les villes disponibles
  const cities = useMemo(() => {
    const set = new Set<string>();
    races.forEach((r) => set.add(r.city));
    return Array.from(set).sort();
  }, [races]);

  // 🔹 Trouver distance min/max dans dataset
  const minDatasetDistance = useMemo(() => Math.min(...races.map((r) => r.distance)), [races]);
  const maxDatasetDistance = useMemo(() => Math.max(...races.map((r) => r.distance)), [races]);

  // 🔹 Logique centrale de filtrage
  const filtered = races.filter((race) => {
    const matchesQuery =
      race.name.toLowerCase().includes(query) ||
      race.city.toLowerCase().includes(query);

    const matchesCity = cityFilter ? race.city === cityFilter : true;
    const matchesDifficulty = difficultyFilter ? race.difficulty === difficultyFilter : true;

    const matchesDistanceMin = minDistance !== "" ? race.distance >= minDistance : true;
    const matchesDistanceMax = maxDistance !== "" ? race.distance <= maxDistance : true;

    const raceDate = new Date(race.date).getTime();
    const matchesFromDate = fromDate ? raceDate >= new Date(fromDate).getTime() : true;
    const matchesToDate = toDate ? raceDate <= new Date(toDate).getTime() : true;

    return (
      matchesQuery &&
      matchesCity &&
      matchesDifficulty &&
      matchesDistanceMin &&
      matchesDistanceMax &&
      matchesFromDate &&
      matchesToDate
    );
  });

  return (
    <main className="min-h-screen p-6 text-gray-200">
      <h1 className="text-3xl mb-6 font-bold">
        Résultats pour : "<span className="text-indigo-400">{query}</span>"
      </h1>

      {/* ████████████ FILTRES ████████████ */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-8 space-y-6">

        {/* Ville */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Ville</label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
          >
            <option value="">Toutes</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Distance min-max */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Distance minimum (km)</label>
            <input
              type="number"
              value={minDistance}
              min={minDatasetDistance}
              max={maxDatasetDistance}
              onChange={(e) => setMinDistance(Number(e.target.value))}
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Distance maximum (km)</label>
            <input
              type="number"
              value={maxDistance}
              min={minDatasetDistance}
              max={maxDatasetDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Difficulté */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Difficulté</label>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
          >
            <option value="">Toutes</option>
            <option value="Facile">Facile</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Date minimale</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Date maximale</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* ████████████ TABLEAU DES RÉSULTATS ████████████ */}
      <table className="w-full border-collapse bg-[#0d0d0d] border border-gray-800 rounded-xl overflow-hidden">
        <thead className="bg-[#181818]">
          <tr>
            <th className="border-b border-gray-700 p-3 text-left">Nom</th>
            <th className="border-b border-gray-700 p-3 text-left">Ville</th>
            <th className="border-b border-gray-700 p-3 text-left">Distance</th>
            <th className="border-b border-gray-700 p-3 text-left">Difficulté</th>
            <th className="border-b border-gray-700 p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="hover:bg-[#1a1a1a] transition">
              <td className="border-b border-gray-800 p-3">
                <Link href={`/run/${r.id}`} className="text-blue-400 underline">
                  {r.name}
                </Link>
              </td>
              <td className="border-b border-gray-800 p-3">{r.city}</td>
              <td className="border-b border-gray-800 p-3">{r.distance} km</td>
              <td className="border-b border-gray-800 p-3">{r.difficulty}</td>
              <td className="border-b border-gray-800 p-3">
                {new Date(r.date).toLocaleDateString("fr")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          Aucune course ne correspond aux critères.
        </p>
      )}
    </main>
  );
}
