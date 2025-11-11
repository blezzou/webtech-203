export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: "user" | "organizer" | "admin";
  completedRuns: string[];
  upcomingRuns: string[];
}

export interface Run {
  id: string;
  name: string;
  image: string;
  description: string;
  distance: number;
  duration: string;
  location: string;
  type: string;
}

export const users: User[] = [
  {
    id: "1",
    fullName: "Jean Dupont",
    email: "jean@example.com",
    password: "123456",
    role: "user",
    completedRuns: ["1"],
    upcomingRuns: ["2"],
  },
];

export const runs: Run[] = [
  {
    id: "1",
    name: "Marathon de Paris",
    image: "/images/paris-marathon.jpg",
    description: "Un parcours mythique à travers la capitale française.",
    distance: 42.195,
    duration: "4h30",
    location: "Paris, France",
    type: "Marathon",
  },
  {
    id: "2",
    name: "Trail du Mont-Blanc",
    image: "/images/montblanc-trail.jpg",
    description: "Une aventure en montagne avec des vues à couper le souffle.",
    distance: 23.5,
    duration: "3h10",
    location: "Chamonix, France",
    type: "Trail",
  },
];
