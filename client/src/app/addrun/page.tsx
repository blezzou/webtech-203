"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRunPage({ currentUser }: { currentUser: any }) {
  const router = useRouter();

  // Vérification des droits
  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "organizer")) {
    return <p className="text-center text-red-500 mt-20">Accès refusé</p>;
  }

  const [form, setForm] = useState({
    name: "",
    date: "",
    distance: "",
    difficulty: "",
    image: "",
    capacity: 0,
    description: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/races", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        creatorId: currentUser.id,
      }),
    });
    router.push("/myruns"); // renvoie vers la liste de ses courses
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-[#1a1a1a] rounded-xl shadow-md">
      <h1 className="text-3xl text-white font-bold mb-6">Ajouter une nouvelle course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "date", "distance", "difficulty", "image", "capacity", "description"].map((field) => (
          <input
            key={field}
            type={field === "capacity" ? "number" : "text"}
            placeholder={field}
            value={(form as any)[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-4 py-2 text-white"
            required
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mt-4"
        >
          Ajouter la course
        </button>
      </form>
    </div>
  );
}
