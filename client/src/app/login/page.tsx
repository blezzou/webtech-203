import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex flex-col items-center gap-24 px-6 py-12">
      <section className="text-center max-w-2xl mt-10">
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-white tracking-tight">
          Rejoignez nous
        </h2>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="adresse mail"
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition"
          />
        </div>
        <div>        <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-white tracking-tight">
        </h2></div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="mots de passe"
            className="w-full sm:w-96 bg-[#1a1a1a] border border-neutral-700 rounded-full px-6 py-3 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition"
          />
        </div>
                <div>        <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-white tracking-tight">
        </h2></div>
                  <Link
            href="/login"
            className="px-5 py-2.5 font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-[0_0_15px_#2563eb80] transition-all duration-300"
          >
            Se connecter
          </Link>
      </section>
    </div>
  );
}
