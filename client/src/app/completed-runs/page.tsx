"use client";

import Image from "next/image";
import { completedRuns } from "@/data/data";
import { races } from "@/data/data";
import { useUser } from "@/context/UserContext";

export default function CompletedRunsPage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Vous devez être connecté
        </h1>
        <p className="text-gray-400 mb-6">
          Connectez-vous pour voir vos courses complétées.
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-600 px-6 py-3 rounded-xl text-white font-semibold hover:bg-blue-700 transition"
        >
          Se connecter
        </a>
      </div>
    );
  }

  const userRuns = completedRuns.filter(
    (run) => run.userId === user.id
  );

  const runsWithInfo = userRuns.map((run) => {
    const race = races.find((r) => r.id === run.raceId);
    return { ...run, race };
  });

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        Courses complétées
      </h1>

      <div className="flex flex-col gap-6">
        {runsWithInfo.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-[#1a1a1a] rounded-xl p-4 shadow-md hover:shadow-lg transition"
          >
            <div className="relative w-24 h-24 rounded-lg overflow-hidden mr-4">
              <Image
                src={item.race?.image ?? "/placeholder.jpg"}
                alt={item.race?.name ?? "Course"}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                {item.race?.name}
              </h3>

              <p className="text-gray-400">{item.race?.distance}</p>

              <p className="text-gray-500 text-sm">
                Terminée le {item.date} • Temps :{" "}
                <span className="text-blue-400 font-semibold">{item.time}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
