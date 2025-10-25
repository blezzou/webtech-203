import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Run Together",
  description: "Trouvez et partagez vos courses à pied",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[#0a0a0a] text-gray-100 font-sans">
        {/* Header global */}
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

          {/* Bouton Se connecter */}
          <Link
            href="/login"
            className="px-5 py-2.5 font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-[0_0_15px_#2563eb80] transition-all duration-300"
          >
            Se connecter
          </Link>
        </header>

        {/* Contenu principal */}
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}

/* Composant de lien avec effet animé */
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
      className="relative text-gray-200 hover:text-white transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300"
    >
      {children}
    </Link>
  );
}
