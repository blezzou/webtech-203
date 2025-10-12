import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1>Bienvenue</h1>
        <div>
          <Link href="/login">Se connecter</Link>
        </div>
        <div>
          <Link href="/about">A propos</Link>
        </div>
        <div>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <Link href="/next-runs">Prochaines courses</Link>
        </div>
        <div>
        <Link href="/completed-runs">Courses complétées</Link>
        </div>
    </div>
  );
}
