"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <input
        type="text"
        placeholder="Rechercher une course..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg bg-black border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold"
      >
        🔍
      </button>
    </form>
  );
}
