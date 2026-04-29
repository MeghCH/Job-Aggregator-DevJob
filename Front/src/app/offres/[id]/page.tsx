import Navbar from "@/components/NavBar";
import { Euro, Briefcase, MapPin } from "lucide-react";

export default function OffreDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-gray-900">
            Dev full stack H/F
          </h1>
          <p className="text-sm text-gray-600">Poisson Barbu</p>
          <p className="text-sm text-gray-400">Strasbourg , 67200</p>
          <div className="mt-2">
            <button className="bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
              Continuer pour postuler
            </button>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Description de <span className="text-indigo-600">l'emploi</span>
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Euro className="w-4 h-4 text-gray-400 shrink-0" />
              42 000 € à 52 000 € par an
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
              CDI – Temps plein
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              Strasbourg
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Description de <span className="text-indigo-600">l'entreprise</span>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Chez Poisson Barbu, nous sommes au cœur de l'innovation
            technologique pour le compte de grands groupes financiers. Notre
            mission : allier performance technique et utilité humaine.
          </p>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Missions <span className="text-indigo-600">principales</span>
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "Développement de composants Full Stack et maintenance des applications techniques.",
              "Participation active au projet de Signature Électronique.",
              "Migration et optimisation des solutions vers notre Cloud privé.",
              "Analyse des besoins utilisateurs et rédaction de feuilles de route techniques.",
            ].map((mission) => (
              <li
                key={mission}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="text-gray-400 mt-0.5">•</span>
                {mission}
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Profil <span className="text-indigo-600">recherché</span>
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "Formation : Bac+4/5 en informatique.",
              "Stack technique : Maîtrise de C# et SQL. La connaissance des Web Services est un vrai plus.",
              "Soft Skills : Autonomie, rigueur, esprit d'équipe et force de proposition.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="text-gray-400 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Avantages chez <span className="text-indigo-600">nous</span>
          </h2>
          <ul className="flex flex-col gap-3">
            {[
              "Flexibilité : Jusqu'à 2 jours de télétravail par semaine.",
              "Repos : 29 jours de congés + 23 jours de RTT.",
              "Transport : Prise en charge à 75% des abonnements ou prime mobilité durable.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="text-gray-400 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
