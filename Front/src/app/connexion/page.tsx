import Link from "next/link";

export const metadata = { title: "Accueil · DevJobs" };

export default function ConnexionPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <Link href="/" className="text-2xl font-extrabold text-indigo-600 mb-8">
        DevJobs
      </Link>

      <div className="w-full max-w-md border border-indigo-100 rounded-2xl p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Connexion à <span className="text-indigo-600">DevJobs</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pas encore de compte ?{" "}
            <Link
              href="/inscription"
              className="text-indigo-600 font-medium hover:underline"
            >
              S'inscrire
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="exemple@email.com"
              className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-600 outline-none focus:border-indigo-600 transition-colors placeholder-indigo-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <Link
                href="#"
                className="text-xs text-indigo-600 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-600 outline-none focus:border-indigo-600 transition-colors placeholder-indigo-500"
            />
          </div>
        </div>

        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold py-3 rounded-lg transition-colors">
          Se connecter
        </button>
      </div>
    </div>
  );
}
