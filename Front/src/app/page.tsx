import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <span className="text-xl font-extrabold text-indigo-600 tracking-tight">
          DevJobs
        </span>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
          Connexion
        </button>
      </nav>

      <div className="px-8 py-6 border-b border-gray-100">
        <SearchBar />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-600 tracking-tight">
          DevJobs
        </h1>
        <p className="text-2xl font-bold text-gray-900">
          Push ta carrière&nbsp;!
        </p>
        <button className="bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-semibold px-8 py-3 rounded-lg transition-colors">
          Commencez ici
        </button>
      </main>

    </div>
  );
}
