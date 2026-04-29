import Link from "next/link";

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <Link href="/" className="text-2xl font-extrabold text-indigo-600 mb-8">
        DevJobs
      </Link>

      <div className="w-full max-w-md border border-indigo-100 rounded-2xl p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Créer un <span className="text-indigo-600">compte</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Déjà un compte ?{" "}
            <Link
              href="/connexion"
              className="text-indigo-600 font-medium hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                placeholder="Clara"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                placeholder="Demoy"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="exemple@email.com"
              className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Je suis</label>
            <select className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 text-gray-500 transition-colors">
              <option value="">Choisir...</option>
              <option>Un candidat</option>
              <option>Une entreprise</option>
            </select>
          </div>
        </div>

        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold py-3 rounded-lg transition-colors">
          Créer mon compte
        </button>
      </div>
    </div>
  );
}
