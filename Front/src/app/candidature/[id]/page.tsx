import Navbar from "@/components/NavBar";
import CandidateCard from "@/components/CandidateCard";
import { Mail, Phone, MapPin } from "lucide-react";

export default function CandidatureDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-6">
        <div className="border border-indigo-200 rounded-xl p-6 flex flex-col gap-6">
          <CandidateCard
            name="Lucka Martin"
            title="Fullstack Développeur"
            experience="5ans d'experience"
            tags={["JS", "React", "Next JS"]}
            availability="Disponible dès maintenant"
            location="Paris"
            appliedTo="Dev full stack H/F"
            sentAt="03/04/2026"
          />

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-indigo-600">CV</h3>
              <input
                type="text"
                readOnly
                value="http://www.example.com/myfile.pdf"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-white outline-none w-full"
              />
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                Clarademoy@gmail.com
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                07 89 21 23 14
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                Strasbourg, France
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-indigo-600">
              Lettre de motivation
            </h3>
            <div className="border border-gray-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed flex flex-col gap-4">
              <p>
                Post hoc impie perpetratum quod in aliis quoque iam timebatur,
                tamquam licentia crudelitati indulta per suspicionum nebulas
                aestimati quidam noxii damnabantur. quorum pars necati, alii
                puniti bonorum multatione actique laribus suis extorres nullo
                sibi relicto praeter querelas et lacrimas, stipe conlaticia
                victitabant, et civili iustoque imperio ad voluntatem converso
                cruentam, claudebantur opulentae domus et clarae.
              </p>
              <p>
                Post hoc impie perpetratum quod in aliis quoque iam timebatur,
                tamquam licentia crudelitati indulta per suspicionum nebulas
                aestimati quidam noxii damnabantur. quorum pars necati, alii
                puniti bonorum multatione actique laribus suis extorres nullo
                sibi relicto praeter querelas et lacrimas, stipe conlaticia
                victitabant, et civili iustoque imperio ad voluntatem converso
                cruentam, claudebantur opulentae domus et clarae.
              </p>
              <p>
                Novo denique perniciosoque exemplo idem Gallus ausus est inire
                flagitium grave, quod Romae cum ultimo dedecore temptasse
                aliquando dicitur Gallienus, et adhibitis paucis clam ferro
                succinctis vesperi per tabernas palabatur et conpita quaeritando
                Graeco sermone, cuius erat inpendio gnarus, quid de Caesare
                quisque sentiret.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-medium px-12 py-3 rounded-lg transition-colors">
            Ne convient pas
          </button>
        </div>
      </div>
    </div>
  );
}
