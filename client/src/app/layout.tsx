import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Run Together",
  description: "Trouvez et partagez vos courses à pied",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900 font-sans">
        {/* Header global */}
        <header className="flex justify-between items-center px-8 py-4 shadow-md bg-black sticky top-0 z-50">
          <h1 className="text-2xl font-bold text-blue-600">Run Together</h1>
          <nav className="flex space-x-6 text-sm font-medium">
            <Link href="/next-runs" className="hover:text-blue-500">Prochaines courses</Link>
            <Link href="/completed-runs" className="hover:text-blue-500">Courses complétées</Link>
            <Link href="/about" className="hover:text-blue-500">À propos</Link>
            <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Se connecter
            </Link>
          </nav>
        </header>

        {/* Contenu principal */}
        <main className="pt-8">{children}</main>
      </body>
    </html>
  );
}
