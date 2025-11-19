"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { races } from "@/data/data";

export default function MyRuns({ currentUser }: { currentUser: any }) {
  const { user, logout } = useUser();

  if (!user)
    return (
      <div className="flex flex-col items-center">
        <p className="text-4xl sm:text-5xl font-extrabold mb-10 text-white tracking-tight">
          Vous devez être connecté pour accéder à cette page.
        </p>
        <Link
          href="/login"
          className="mt-6 px-8 py-3 font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Se connecter
        </Link>
      </div>
    );

  const myRaces = races.filter((r) => r.creatorId === user.id);

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

