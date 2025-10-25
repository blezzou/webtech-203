import Link from 'next/link';

export default function About() {
    return (
    <div className="flex flex-col items-center gap-24 px-6 py-12">
      <section className="text-center max-w-2xl mt-10">
        <h1 className="text sm:text font-extrabold mb-8 text-white tracking-tight">
          Bienvenu sur le site de RunTogether
        </h1>
        <h1 className="text sm:text font-extrabold mb-8 text-white tracking-tight">
          A propos de nous
        </h1>
                <h1 className="text sm:text font-extrabold mb-8 text-white tracking-tight">
          Ce site est concu dans le cadre d'un projet scolaire
        </h1>
      </section>
    </div>
  );
}