"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";

// Carte Leaflet sans SSR
const SearchMap = dynamic(() => import("@/components/SearchMap"), { ssr: false });

const PAGE_SIZE = 10;

export default function SearchPage() {
  const params = useSearchParams();
  const searchQuery = params.get("q")?.toLowerCase() || "";

  const [races, setRaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FILTRES
  const [cityFilter, setCityFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [minDistance, setMinDistance] = useState<number | "">("");
  const [maxDistance, setMaxDistance] = useState<number | "">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // TRI SUPABASE
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // PAGINATION (front)
  const [currentPage, setCurrentPage] = useState(1);

  // FAVORIS
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // ONGLET TABLEAU/CARTE
  const [activeTab, setActiveTab] = useState<"table" | "map">("table");

  /** 🔵 RESET FILTRES */
  const resetFilters = () => {
    setCityFilter("");
    setDifficultyFilter("");
    setMinDistance("");
    setMaxDistance("");
    setFromDate("");
    setToDate("");
    setSortColumn(null);
    setSortDirection("asc");
    setCurrentPage(1);
  };

  /** 🔵 CHARGEMENT SUPABASE AVEC TRI + FILTRES */
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const supabase = createClient();

      let q = supabase.from("races").select("*");

      // Recherche textuelle
      if (searchQuery) {
        q = q.or(`name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%`);
      }

      // Filtres serveur
      if (cityFilter) q = q.eq("city", cityFilter);
      if (difficultyFilter) q = q.eq("difficulty", difficultyFilter);

      // Tri via Supabase
      if (sortColumn) {
        q = q.order(sortColumn, { ascending: sortDirection === "asc" });
      }

      const { data, error } = await q;

      if (error) {
        console.error("Erreur Supabase :", error);
        setLoading(false);
        return;
      }

      // Normalisation pour ton tableau + carte
      const normalized = data.map((r: any) => ({
        ...r,
        distanceNum: r.distance
          ? Number(String(r.distance).replace(/[^0-9]/g, ""))
          : null,
        parsedDate: r.date ? new Date(r.date) : null,
      }));

      setRaces(normalized);
      setLoading(false);
    };

    load();
  }, [
    searchQuery,
    cityFilter,
    difficultyFilter,
    sortColumn,
    sortDirection,
  ]);

  /** FAVORIS (localStorage) */
  useEffect(() => {
    const raw = localStorage.getItem("favoriteRaces");
    if (raw) setFavoriteIds(new Set(JSON.parse(raw)));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteRaces", JSON.stringify([...favoriteIds]));
  }, [favoriteIds]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /** VILLES DISPONIBLES */
  const cities = useMemo(() => {
    return Array.from(new Set(races.map((r) => r.city))).filter(Boolean).sort();
  }, [races]);

  /** FILTRES CLIENT (distance + dates) */
  const filtered = races.filter((race) => {
    const matchesMinDist =
      minDistance !== "" ? race.distanceNum >= minDistance : true;
    const matchesMaxDist =
      maxDistance !== "" ? race.distanceNum <= maxDistance : true;

    const matchesFromDate =
      fromDate && race.parsedDate
        ? race.parsedDate >= new Date(fromDate)
        : true;

    const matchesToDate =
      toDate && race.parsedDate
        ? race.parsedDate <= new Date(toDate)
        : true;

    return matchesMinDist && matchesMaxDist && matchesFromDate && matchesToDate;
  });

  /** PAGINATION */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPageSafe = Math.min(currentPage, totalPages);

  const paginated = filtered.slice(
    (currentPageSafe - 1) * PAGE_SIZE,
    currentPageSafe * PAGE_SIZE
  );

  /** RESET PAGE SI CHANGEMENT DE FILTRE */
  useEffect(() => {
    setCurrentPage(1);
  }, [
    cityFilter,
    difficultyFilter,
    minDistance,
    maxDistance,
    fromDate,
    toDate,
    sortColumn,
    sortDirection,
    searchQuery,
  ]);

  /** CLIC SUR TRI */
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <main className="min-h-screen p-6 text-gray-200">
      <h1 className="text-3xl mb-6 font-bold">
        Résultats pour :{" "}
        <span className="text-indigo-400">{searchQuery}</span>
      </h1>

      {/* ONGLET TABLE / CARTE */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setActiveTab("table")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "table"
              ? "bg-indigo-600 text-white"
              : "bg-black border border-gray-600"
          }`}
        >
          Tableau
        </button>
        <button
          onClick={() => setActiveTab("map")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "map"
              ? "bg-indigo-600 text-white"
              : "bg-black border border-gray-600"
          }`}
        >
          Carte
        </button>
      </div>

      {/* █████ FILTRES █████ */}
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
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Distance */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Distance min</label>
            <input
              type="number"
              value={minDistance}
              onChange={(e) =>
                setMinDistance(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
            />
          </div>

          <div>
            <label>Distance max</label>
            <input
              type="number"
              value={maxDistance}
              onChange={(e) =>
                setMaxDistance(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Difficulté */}
        <div>
          <label>Difficulté</label>
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
            <label>Date min</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
            />
          </div>

          <div>
            <label>Date max</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full bg-black border border-gray-700 px-3 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* RESET */}
        <button
          onClick={resetFilters}
          className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-2 rounded-lg"
        >
          Réinitialiser les filtres
        </button>
      </div>

      {/* █████ CARTE OU TABLEAU █████ */}
      {activeTab === "map" ? (
        <SearchMap
          races={filtered}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <>
          {/* TABLEAU */}
          <table className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-[#181818]">
              <tr>
                <th></th>
                <th className="cursor-pointer" onClick={() => handleSort("name")}>
                  Nom {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th className="cursor-pointer" onClick={() => handleSort("city")}>
                  Ville {sortColumn === "city" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("distanceNum")}
                >
                  Distance{" "}
                  {sortColumn === "distanceNum" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("difficulty")}
                >
                  Difficulté{" "}
                  {sortColumn === "difficulty" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  Date{" "}
                  {sortColumn === "date" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-5 text-center">
                    Chargement...
                  </td>
                </tr>
              ) : (
                paginated.map((r) => (
                  <tr key={r.id} className="hover:bg-[#1a1a1a]">
                    <td className="p-3 border-b border-gray-800">
                      <button onClick={() => toggleFavorite(r.id)}>
                        {favoriteIds.has(r.id) ? "★" : "☆"}
                      </button>
                    </td>

                    <td className="p-3 border-b border-gray-800">
                      <Link
                        href={`/run/${r.id}`}
                        className="text-blue-400 underline"
                      >
                        {r.name}
                      </Link>
                    </td>

                    <td className="p-3 border-b border-gray-800">{r.city}</td>
                    <td className="p-3 border-b border-gray-800">{r.distance}</td>
                    <td className="p-3 border-b border-gray-800">
                      {r.difficulty}
                    </td>
                    <td className="p-3 border-b border-gray-800">
                      {r.parsedDate?.toLocaleDateString("fr")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-4">
            <span>
              Page {currentPageSafe} / {totalPages}
            </span>
            <div className="space-x-2">
              <button
                disabled={currentPageSafe === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Précédent
              </button>
              <button
                disabled={currentPageSafe === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Suivant
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
