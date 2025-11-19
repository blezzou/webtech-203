"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function AccountPage() {
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

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 text-white tracking-tight">
        Bonjour, {user.fullName.split(" ")[0]}
      </h2>

      <div className="bg-[#1a1a1a] border border-neutral-700 rounded-2xl p-8 text-center w-80 shadow-lg">
        <p className="text-gray-300 mb-4">
          <strong>Nom :</strong> {user.fullName}
        </p>
        <p className="text-gray-300 mb-4">
          <strong>Email :</strong> {user.email}
        </p>
        <p className="text-gray-300 mb-6">
          <strong>Rôle :</strong> {user.role}
        </p>
        <button
          onClick={logout}
          className="w-full px-6 py-2 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700 transition"
        >
          Se déconnecter
        </button>
      </div>
      {/* section avec bouton pour permettre à l'organisateur d'acceder aux page myruns et addrun */}
      {(user.role === "admin" || user.role === "organizer") && (
        <div className="flex flex-col space-y-4 mt-6">
          <Link
            href="/myruns"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-2xl text-white font-semibold"
          >
            Voir mes courses publiées
          </Link>
          <Link
            href="/addrun"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-2xl text-white font-semibold"
          >
            Ajouter une nouvelle course
          </Link>
        </div>
      )}
    </div>
  );
}