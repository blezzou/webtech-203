"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const { login } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const success = login(email, password);
    if (success) {
      router.push("/account");
    } else {
      setError("Adresse e-mail ou mot de passe incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#0a0a0a] px-6">
      <section className="text-center max-w-2xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 text-white tracking-tight">
          Heureux de vous revoir
        </h2>

        <div className="flex flex-col items-center space-y-6">
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            className="px-8 py-3 font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-[0_0_20px_#2563eb80] transition-all duration-300"
          >
            Se connecter
          </button>

          <p className="text-gray-400 mt-6">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Créez-en un ici
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
