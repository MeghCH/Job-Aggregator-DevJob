import Navbar from "@/components/NavBar";
import CandidateCard from "@/components/CandidateCard";
import JobCardCompany from "@/components/JobCardCompany";
import { Mail, Phone, MapPin, Pencil } from "lucide-react";

const offres = [
  {
    id: 1,
    title: "Dev full stack H/F",
    company: "Poisson Barbu",
    location: "Strasbourg",
    salary: "42 – 52 K",
    contractType: "CDI",
    tags: ["JS", "React", "Next JS"],
    postedAt: "Il y a 3h",
    remote: "Partiel remote",
    publishedAt: "02/04/2026",
  },
  {
    id: 2,
    title: "Dev full stack H/F",
    company: "Poisson Barbu",
    location: "Strasbourg",
    salary: "40 – 45 K",
    contractType: "CDD",
    tags: ["Next JS", "Express", "Node.js"],
    postedAt: "Il y a 3h",
    remote: "Partiel remote",
    publishedAt: "30/03/2026",
  },
];

const candidats = [
  {
    id: 1,
    name: "Lucka Martin",
    title: "Fullstack Développeur",
    experience: "5ans d'experience",
    tags: ["JS", "React", "Next JS"],
    availability: "Disponible dès maintenant",
    location: "Paris",
    appliedTo: "Dev full stack H/F",
    sentAt: "03/04/2026",
  },
  {
    id: 2,
    name: "Sarah Florence",
    title: "Fullstack Développeur",
    experience: "7ans d'experience",
    tags: ["Next.js", "Express", "Node.js"],
    availability: "Disponible dès maintenant",
    location: "Lyon",
    appliedTo: "Dev full stack H/F",
    sentAt: "01/04/2026",
  },
];

export default function ProfilAdminPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6">

        <div className="flex flex-col items-center gap-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Poisson <span className="text-indigo-600">Barbu</span>
          </h1>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500 uppercase font-semibold tracking-widest">
              <Pencil className="w-3.5 h-3.5" />
              Informations
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4 text-indigo-500" />
              RhpoissonBarbu@gmail.com
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone className="w-4 h-4 text-indigo-500" />
              06 29 67 39 32
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-indigo-500" />
              Strasbourg, France
            </div>
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />

        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">
            Mes offres
          </h2>
          <div className="flex flex-col gap-3">
            {offres.map((offre) => (
              <JobCardCompany key={offre.id} {...offre} />
            ))}
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />

        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">
            Candidats
          </h2>
          <div className="flex flex-col gap-3">
            {candidats.map((candidat) => (
              <CandidateCard key={candidat.id} {...candidat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
