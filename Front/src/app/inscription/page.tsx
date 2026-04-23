



export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-10 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Inscription <br />
            à ton espace <span className="text-brand-600">DevJobs.</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Rejoins toutes les offres tech qui te correspondent.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nom</label>
            <input type="text" placeholder="Ton nom"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Prénom</label>
            <input type="text" placeholder="Ton prénom"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Numéro de téléphone</label>
            <input type="tel" placeholder="+33 6 00 00 00 00"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input type="email" placeholder="toi@example.com"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" placeholder=""
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input type="password" placeholder=""
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>
          <button type="submit"
            className="bg-brand-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-700 transition"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center">
          Vous avez déjà un compte ?{" "}
          <a href="/connexion" className="text-brand-600 font-medium hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
}