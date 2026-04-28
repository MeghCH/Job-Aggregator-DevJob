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
          <p className="text-sm text-gray-500 mt-1">
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
              <label
                htmlFor="prenom"
                className="text-sm font-medium text-gray-700"
              >
                Prénom
              </label>
              <input
                id="prenom"
                type="text"
                placeholder="Clara"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-600 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-600"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="nom"
                className="text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                id="nom"
                type="text"
                placeholder="Demoy"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-600 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-600"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-600 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-600 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">
              Je suis
            </label>
            <select
              id="role"
              className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 text-gray-500 transition-colors"
            >
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
