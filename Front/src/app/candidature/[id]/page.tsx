"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/NavBar";
import CandidateCard from "@/components/CandidateCard";
import { Briefcase, MapPin, Euro } from "lucide-react";
import { getApplicationById } from "@/lib/api/candidatures";

type Application = {
  id: number;
  job_id: number;
  job_source: string;
  applied_at: string;
  title: string;
  company_name: string;
  contract_type: string;
  remote_type: string;
  salary_min: number | null;
  salary_max: number | null;
  currency: string | null;
  skills: string | null;
};

export default function CandidatureDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getApplicationById(id)
      .then((res) => {
        if (res.success) {
          setApplication(res.data);
        } else {
          setError(res.message || "Candidature introuvable");
        }
      })
      .catch(() => setError("Erreur lors du chargement"))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR");

  const parsedSkills = (): string[] => {
    if (!application?.skills) return [];
    try {
      return JSON.parse(application.skills);
    } catch {
      return application.skills.split(",").map((s) => s.trim()).filter(Boolean);
    }
  };

  const formatSalary = () => {
    if (!application?.salary_min && !application?.salary_max) return null;
    const currency = application?.currency || "€";
    if (application?.salary_min && application?.salary_max)
      return `${application.salary_min} – ${application.salary_max} ${currency}`;
    return `${application?.salary_min || application?.salary_max} ${currency}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-6">
        {loading && (
          <p className="text-center text-gray-400 text-sm">Chargement...</p>
        )}

        {error && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}

        {application && (
          <div className="border border-indigo-200 rounded-xl p-6 flex flex-col gap-6">
            <CandidateCard
              name={application.company_name || "Entreprise inconnue"}
              title={application.title || "Poste non renseigné"}
              experience={application.contract_type || ""}
              tags={parsedSkills()}
              availability={application.remote_type || ""}
              location=""
              appliedTo={application.job_source}
              sentAt={formatDate(application.applied_at)}
            />

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3 justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Briefcase className="w-4 h-4 text-indigo-400 shrink-0" />
                  {application.contract_type || "Contrat non renseigné"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  {application.remote_type || "Lieu non renseigné"}
                </div>
                {formatSalary() && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Euro className="w-4 h-4 text-indigo-400 shrink-0" />
                    {formatSalary()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
