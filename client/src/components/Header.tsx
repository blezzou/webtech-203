"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative text-gray-200 hover:text-white transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300 font-semibold"
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const { user, logout } = useUser();

  return (
    <header className="flex justify-between items-center px-12 py-5 border-b border-neutral-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <nav className="text-2xl font-extrabold text-blue-500 tracking-tight">
        <NavLink href="/">RUN TOGETHER</NavLink>
      </nav>

      {/* Navigation principale */}
      <nav className="flex space-x-10 text-[15px] font-semibold tracking-wide">
        <NavLink href="/next-runs">Prochaines courses</NavLink>
        <NavLink href="/completed-runs">Courses complétées</NavLink>
        <NavLink href="/about">À propos</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </nav>

      {/* Espace utilisateur */}
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <Link
              href="/account"
              className="px-4 py-2 font-semibold text-blue-400 hover:text-blue-500 transition"
            >
              Mon compte
            </Link>
            <button
              onClick={logout}
              className="px-5 py-2.5 font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 hover:shadow-[0_0_10px_#ef444480] transition-all duration-300"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-5 py-2.5 font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-[0_0_15px_#2563eb80] transition-all duration-300"
          >
            Se connecter
          </Link>
        )}
      </div>
    </header>
  );
}
