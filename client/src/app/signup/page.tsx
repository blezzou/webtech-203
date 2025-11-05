"use client";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="text-center max-w-2xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 text-white tracking-tight">
          Rejoignez-nous
        </h2>

        <div className="flex flex-col items-center space-y-6">
          <input
            type="text"
            placeholder="Nom complet"
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
          />

          <input
            type="email"
            placeholder="Adresse e-mail"
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
          />

          <Link
            href="#"
            className="px-8 py-3 font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-[0_0_20px_#2563eb80] transition-all duration-300"
          >
            Créer mon compte
          </Link>

          <p className="text-gray-400 mt-6">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Connectez-vous ici
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}