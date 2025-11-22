"use client";
/*
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { useMemo } from "react";

// Fix des icônes Leaflet dans Next
// (sinon tu as des carrés vides à la place des marqueurs)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Coordonnées approximatives des villes françaises les plus fréquentes
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Paris: { lat: 48.8566, lng: 2.3522 },
  Lyon: { lat: 45.764, lng: 4.8357 },
  Marseille: { lat: 43.2965, lng: 5.3698 },
  Toulouse: { lat: 43.6047, lng: 1.4442 },
  Bordeaux: { lat: 44.8378, lng: -0.5792 },
  Lille: { lat: 50.6292, lng: 3.0573 },
  Nice: { lat: 43.7102, lng: 7.262 },
  Nantes: { lat: 47.2184, lng: -1.5536 },
  Montpellier: { lat: 43.6108, lng: 3.8767 },
  Strasbourg: { lat: 48.5734, lng: 7.7521 },
};

export type SearchMapRace = {
  id: string;
  name: string;
  city: string | null;
  distance: string | null;
  difficulty: string | null;
  date: string | null;
};

interface SearchMapProps {
  races: SearchMapRace[];
  favoriteIds: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export default function SearchMap({
  races,
  favoriteIds,
  onToggleFavorite,
}: SearchMapProps) {
  const racesWithCoords = useMemo(
    () =>
      races
        .map((r) => {
          const city = r.city ?? "";
          const coords = CITY_COORDS[city];
          if (!coords) return null;
          return { ...r, coords };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [races]
  );

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-gray-800">
      <MapContainer
        center={[46.6, 2.4]} // centre France
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {racesWithCoords.map((r) => (
          <Marker
            key={r.id}
            position={[r.coords.lat, r.coords.lng]}
          >
            <Popup>
              <div className="space-y-1 text-sm">
                <Link
                  href={`/run/${r.id}`}
                  className="font-semibold text-blue-500 hover:underline"
                >
                  {r.name}
                </Link>
                <p>{r.city}</p>
                {r.distance && <p>Distance : {r.distance}</p>}
                {r.difficulty && <p>Difficulté : {r.difficulty}</p>}
                {r.date && (
                  <p>
                    Le{" "}
                    {new Date(r.date).toLocaleDateString("fr", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}

                <button
                  onClick={() => onToggleFavorite(r.id)}
                  className="mt-2 px-2 py-1 rounded bg-black/70 border border-gray-700 text-xs"
                >
                  {favoriteIds.has(r.id) ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
*/