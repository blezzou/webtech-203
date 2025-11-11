"use client"
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { races } from "@/data/data";



export default function RunPage() {
  const { id } = useParams();
  const run = races.find((r) => r.id === id);

  if (!run) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-400">
        <p>Course introuvable.</p>
      </main>
    );
  }

  const friends = [
    {
      name: "Lucas",
      comment: "Superbe paysage, montée un peu dure mais ça vaut le coup !",
      likes: 3,
    },
    {
      name: "Emma",
      comment: "Je l’ai refaite 2 fois déjà 😍",
      likes: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-200 px-6 py-12 flex flex-col items-center">
      {/* Nom + Image */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight text-center">
        {run.name}
      </h1>

      <Image
        src={run.image}
        alt={run.name}
        width={1000}
        height={500}
        className="rounded-2xl shadow-lg object-cover mb-10"
      />

      {/* Description */}
      <p className="max-w-2xl text-center text-lg mb-10 text-gray-300 leading-relaxed">
        {run.description}
      </p>

      {/* Statistiques */}
      <section className="flex flex-wrap justify-center gap-6 mb-16">
        <Stat label="Distance" value={run.distance} />
        <Stat label="Lieu" value={run.city} />
        <Stat label="Difficulté" value={run.difficulty} />
        <Stat label="Date" value={run.date} />
      </section>

      {/* Google Maps placeholder */}
      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-3xl font-bold mb-4 text-white">Tracé de la course</h2>
        <div className="rounded-xl overflow-hidden border border-neutral-800 shadow-lg h-96 bg-[#111] flex items-center justify-center text-gray-500">
          Google Maps API à intégrer
        </div>
      </section>

      {/* Section amis */}
      <section className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-white">
          Vos amis sur cette course
        </h2>
        <div className="space-y-6">
          {friends.map((f, i) => (
            <FriendComment key={i} {...f} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1a1a] px-6 py-4 rounded-xl border border-neutral-800 shadow-md text-center">
      <p className="text-gray-400 uppercase text-sm">{label}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function FriendComment({
  name,
  comment,
  likes,
}: {
  name: string;
  comment: string;
  likes: number;
}) {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  return (
    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-5 shadow-md">
      <p className="text-lg text-white font-semibold">{name}</p>
      <p className="text-gray-400 mt-2">{comment}</p>
      <button
        onClick={handleLike}
        className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold transition ${
          liked
            ? "bg-blue-600 text-white shadow-[0_0_10px_#2563eb80]"
            : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333]"
        }`}
      >
        ❤️ {likeCount}
      </button>
    </div>
  );
}