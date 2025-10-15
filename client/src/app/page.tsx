import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16 px-8 py-12">

      {/* Section principale */}
      <section className="text-center max-w-2xl">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">Trouvez votre prochain défis</h2>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Recherchez une course (ville, distance...)"
            className="w-full sm:w-96 border border-gray-300 rounded-full px-6 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Section populaire */}
      <RaceSection title="Courses populaires" />

      {/* Section 10 km */}
      <RaceSection title="Courses 10 km" />

      {/* Section difficile */}
      <RaceSection title="Courses difficiles" />

      {/* Section news */}
      <NewsSection title="Dernières actualités" />

    </div>
  );
}

function RaceSection({ title }: { title: string }) {
  
  const fakeRaces = [
    { name: "Marathon de Paris", distance: "42 km", date: "14 avril 2025", image: "/images/paris.jpg" },
    { name: "Trail du Ventoux", distance: "25 km", date: "6 mai 2025", image: "/images/ventoux.jpg" },
    { name: "Run Lyon", distance: "10 km", date: "20 juin 2025", image: "/images/lyon.jpg" },
    { name: "Course de Nice", distance: "5 km", date: "10 juillet 2025", image: "/images/nice.jpg" },
  ];

  return (
    <section className="w-full max-w-6xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <button className="text-blue-600 hover:underline">Voir tout</button>
      </div>
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {fakeRaces.map((race, i) => (
          <div key={i} className="min-w-[250px] bg-gray-50 rounded-2xl shadow hover:shadow-lg transition p-4">
            <div className="text-black relative w-full h-40 mb-3">
              <Image
                src={race.image}
                alt={race.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <h4 className="text-lg font-bold">{race.name}</h4>
            <p className="text-gray-600">{race.distance}</p>
            <p className="text-gray-500 text-sm">{race.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


function NewsSection({ title }: { title: string }) {
  const fakeNews = [
    { title: "Record battu au marathon de Berlin !", date: "Septembre 2025" },
    { title: "Une nouvelle course à Annecy annoncée", date: "Août 2025" },
  ];

  return (
    <section className="w-full max-w-6xl mt-8">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <div className="text-black grid sm:grid-cols-2 gap-6">
        {fakeNews.map((news, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded-2xl shadow hover:shadow-md transition">
            <h4 className="font-bold mb-1">{news.title}</h4>
            <p className="text-gray-500 text-sm">{news.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}