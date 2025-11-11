import "./globals.css";
import type { Metadata } from "next";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header";

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
        <UserProvider>
          <Header />
          <main className="pt-16">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}