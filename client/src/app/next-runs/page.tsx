import Link from 'next/link';
import Image from 'next/image';
import { races } from '@/data/data';

export default function NextRunsPage() {
  const upcoming = races.filter(
    (race) => new Date(race.date)
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-white mb-10">
        Courses à venir
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcoming.map((race) => (
          <Link
            href={`/run/${race.id}`}
            key={race.id}
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={race.image}
                alt={race.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-1">
                {race.name}
              </h2>
              <p className="text-gray-400">{race.city}</p>
              <p className="text-gray-500 text-sm mt-2">{race.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}