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

export interface Races {
    id: string;
    name: string;
    distance: string;
    date: string;
    city: string;
    difficulty: "Facile" | "Moyenne" | "Difficile";
    image: string;
    description: string;
    capacity: number;
    creatorId: string;
    participants: string[];
}

export interface completedRuns {
    id: string;
    raceId: string;
    userId: string;
    time: string;
    date: string;
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
 {
    id: "2",
    fullName: "Marie Curie",
    email: "marie@example.com",
    password: "123456",
    role: "organizer",
    completedRuns: [],
    upcomingRuns: [],
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

export const races: Races[] = [
    {
        id: "1",
        name: "Marathon de Paris",
        distance: "42 km",
        date: "14 avril 2025",
        city: "Paris",
        difficulty: "Difficile",
        image: "/images/paris.jpg",
        description: "Le Marathon de Paris est l'un des marathons les plus célèbres au monde, attirant des coureurs de tous niveaux pour une course à travers les rues emblématiques de la ville.",
        capacity: 50000,
        creatorId: "2",
        participants: [],
    },
    {
        id: "2",
        name: "Trail du Ventoux",
        distance: "25 km",
        date: "6 mai 2025",
        city: "Mont Ventoux",
        difficulty: "Moyenne",
        image: "/images/ventoux.jpg",
        description: "Le Trail du Ventoux offre une expérience de course unique avec des paysages spectaculaires et des défis variés, parfait pour les amateurs de trail.",
        capacity: 2000,
        creatorId: "2",
        participants: [],
    },
    {
        id: "3",
        name: "Run Lyon",
        distance: "10 km",
        date: "20 juin 2025",
        city: "Lyon",
        difficulty: "Facile",
        image: "/images/lyon.jpg",
        description: "La Run Lyon est une course urbaine conviviale qui traverse les quartiers historiques de Lyon, idéale pour les coureurs de tous niveaux.",
        capacity: 10000,
        creatorId: "1",
        participants: [],
    },
    {
        id: "4",
        name: "Course de Nice",
        distance: "5 km",
        date: "10 juillet 2025",
        city: "Nice",
        difficulty: "Facile",
        image: "/images/nice.jpg",
        description: "La Course de Nice est une course rapide et plate le long de la magnifique Promenade des Anglais, parfaite pour les débutants et les coureurs cherchant à améliorer leur temps.",
        capacity: 8000,
        creatorId: "1",
        participants: [],
    },
    {
        id: "5",
        name: "Backyard Ultra Marseille",
        distance: "180 km",
        date: "15 août 2025",
        city: "Marseille",
        difficulty: "Difficile",
        image: "/images/backyard-marseille.jpg",
        description: "La Backyard Ultra de Marseille est une course d'endurance extrême où les coureurs doivent parcourir une boucle de 6,7 km chaque heure jusqu'à ce qu'il n'en reste plus qu'un.",
        capacity: 140,
        creatorId: "1",
        participants: [],
    },
    {
        id: "6",
        name: "Semi-Marathon de Bordeaux",
        distance: "21 km",
        date: "5 septembre 2025",
        city: "Bordeaux",
        difficulty: "Moyenne",
        image: "/images/bordeaux.jpg",
        description: "Le Semi-Marathon de Bordeaux est une course populaire qui offre un parcours pittoresque à travers les vignobles et les quais de la ville.",
        capacity: 1200,
        creatorId: "1",
        participants: [],
    }
];

export const completedRuns: completedRuns[] = [
    {
        id: "1",
        raceId: "1",
        userId: "1",
        time: "4h25m30s",
        date: "14 avril 2024",
    },
    {
        id: "2",
        raceId: "2",
        userId: "1",
        time: "3h05m15s",
        date: "6 mai 2024",
    },
    {
        id: "3",
        raceId: "3",
        userId: "1",
        time: "1h45m50s",
        date: "20 juin 2024",
    }
];
