"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function Signup() {
  const { signup } = useUser();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    const success = signup(fullName, email, password);
    if (success) {
      router.push("/account");
    } else {
      setError("Un compte avec cet e-mail existe déjà");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#0a0a0a] px-6">
      <section className="text-center max-w-2xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 text-white tracking-tight">
          Rejoignez-nous
        </h2>

        <div className="flex flex-col items-center space-y-6">
          <input
            type="text"
            placeholder="Nom complet"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
          />

          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSignup}
            className="px-8 py-3 font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-[0_0_20px_#2563eb80] transition-all duration-300"
          >
            Créer mon compte
          </button>

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
