"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { saveJob, unsaveJob } from "@/lib/api";
import { summarizeJobWithAI } from "@/lib/api/jobs";

type JobCardProps = {
  id?: string | number;
  title: string;
  company: string;
  company_sector?:string;
  location: string;
  salary: string;
  contractType: string;
  tags: string[];
  postedAt: string;
  remote: string;
  jobSource?: string;
  initialSaved?: boolean;
  onUnsave?: () => void;
  onDelete?: () => void;
  href?: string;
};

export default function JobCard({
  id,
  title,
  company,
  company_sector = "Non spécifié",
  location,
  salary,
  contractType,
  tags = [],
  postedAt,
  remote,
  jobSource = "wld",
  initialSaved = false,
  onUnsave,
  onDelete,
  href,
}: JobCardProps) {
  const [saved, setSaved] = useState(initialSaved);

  // --- STATES POUR LE RÉSUMÉ DE L'IA ---
  const [aiSummary, setAiSummary] = useState<string>("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isSummarized, setIsSummarized] = useState(false);

  
  const getSimulatedDescription = () => {
    return `Offre d'emploi de ${title} chez ${company} dans le secteur de ${company_sector} à ${location}. Type de contrat : ${contractType}. Stack et compétences recherchées : ${tags.join(", ")}.`;
  };

  // --- FONCTION : RÉSUMÉ DE L'OFFRE PASSERELLE (Via Port 3000) ---
  async function handleAiSummary(e: React.MouseEvent) {
    e.preventDefault(); // Bloque l'ouverture de la page de l'offre
    e.stopPropagation(); // Bloque le déclenchement du composant Link de Next.js

    setLoadingSummary(true);
    try {
      // On utilise la fonction de ton fichier jobs.ts qui transite par ton Express
      const res = await summarizeJobWithAI(getSimulatedDescription());

      if (res && res.success) {
        setAiSummary(res.summary);
        setIsSummarized(true);
      } else {
        console.error("Le backend central a échoué à récupérer le résumé :", res?.message);
      }
    } catch (err) {
      console.error("Erreur lors de la génération du résumé :", err);
    } finally {
      setLoadingSummary(false);
    }
  }

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!id) return;

    const jobId = Number(id);
    const prev = saved;
    setSaved(!prev);

    try {
      const res = prev ? await unsaveJob(jobId) : await saveJob(jobId, jobSource);
      if (!res?.success) {
        console.error("Save job failed:", res);
        setSaved(prev);
      } else if (prev && onUnsave) {
        onUnsave();
      }
    } catch (err) {
      console.error("Save job error:", err);
      setSaved(prev);
    }
  }

  return (
    <Link href={href ?? (id ? `/offres/${encodeURIComponent(id)}?source=${encodeURIComponent(jobSource)}` : "#")} className="relative flex flex-col border border-indigo-100 bg-indigo-50/40 rounded-xl px-4 sm:px-6 py-4 sm:py-5 hover:border-indigo-300 transition-colors cursor-pointer gap-4">
      
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 w-full">
        {/* Gauche */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            {company} · {location}
          </p>

          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-indigo-500 text-white px-2.5 py-1 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            {postedAt} / {remote}
          </p>
        </div>

        {/* Droite */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 shrink-0 sm:ml-6 flex-wrap">
          <span className="text-sm font-semibold text-indigo-600">{salary}</span>
          <span className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full font-medium">
            {contractType}
          </span>
          
          <div className="flex gap-2">
            {/* BOUTON UNIQUE SECURISÉ */}
            <button
              onClick={handleAiSummary}
              disabled={loadingSummary}
              className="text-xs font-semibold px-3 py-2 border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors shadow-sm disabled:opacity-50"
              title="Générer un résumé technique via le backend sécurisé"
            >
              {loadingSummary ? "Génération..." : "Résumé"}
            </button>
            
            <button
              aria-label="Sauvegarder cette offre"
              onClick={handleSave}
              className="p-2 border border-indigo-200 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-indigo-500 text-indigo-500" : "text-indigo-400"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* --- BLOC D'AFFICHAGE DU RÉSUMÉ --- */}
      {isSummarized && (
        <div className="w-full p-4 bg-white border border-emerald-100 rounded-lg shadow-inner flex flex-col gap-1">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
            Résumé IA :
          </p>
          <p className="text-xs text-gray-700 italic leading-relaxed">
            "{aiSummary}"
          </p>
        </div>
      )}

      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Supprimer la candidature"
          className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
          </svg>
        </button>
      )}
    </Link>
  );
}