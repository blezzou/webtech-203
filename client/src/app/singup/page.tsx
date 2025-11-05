"use client";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/10">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Créer un compte
        </h1>

        <form className="space-y-5">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-gray-300 block mb-2">Prénom</label>
              <input
                type="text"
                placeholder="Jean"
                className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="text-gray-300 block mb-2">Nom</label>
              <input
                type="text"
                placeholder="Dupont"
                className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 block mb-2">Adresse email</label>
            <input
              type="email"
              placeholder="exemple@email.com"
              className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-2">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-2">
              Confirmez le mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition"
          >
            Créer un compte
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
