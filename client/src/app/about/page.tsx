export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-6">À propos</h1>

      <p className="text-lg leading-relaxed mb-8">
        Ce site a été développé dans le cadre d’un projet étudiant.
        L’objectif est de concevoir une plateforme permettant aux utilisateurs de trouver, suivre et
        compléter des courses sportives partout en France.
      </p>

      <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
        Technologies utilisées
      </h2>
      <ul className="list-disc list-inside text-lg leading-relaxed mb-8">
        <li>Next.js 14</li>
        <li>React / TailwindCSS</li>
        <li>Supabase (authentification et base de données)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
        Vision du projet
      </h2>
      <p className="text-lg leading-relaxed mb-8">
        Le but est de créer un espace complet pour les coureurs : recherche de
        courses, gestion du calendrier, suivi des performances, et connexion
        avec d’autres sportifs.
      </p>

      <p className="text-lg text-gray-400 italic">
        ECE WEBTECH-203
      </p>
    </div>
  );
}
