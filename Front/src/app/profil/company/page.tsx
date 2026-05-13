"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/NavBar";
import CandidateCard from "@/components/CandidateCard";
import JobCardCompany from "@/components/JobCardCompany";
import LogoutButton from "@/components/LogoutButton";
import { Mail, MapPin, Pencil, Check, X } from "lucide-react";
import { authApi, jobsApi } from "@/lib/api";

type Job = {
  id: string;
  company_id: string;
  title: string;
  salary_min: number | null;
  salary_max: number | null;
  currency: string | null;
  contract_type: string | null;
  remote_type: string | null;
  skills: string | null;
  created_at: string;
};

const candidats = [
  { id: 1, name: "Lucka Martin", title: "Fullstack Développeur", experience: "5ans d'experience", tags: ["JS", "React", "Next JS"], availability: "Disponible dès maintenant", location: "Paris", appliedTo: "Dev full stack H/F", sentAt: "03/04/2026" },
  { id: 2, name: "Sarah Florence", title: "Fullstack Développeur", experience: "7ans d'experience", tags: ["Next.js", "Express", "Node.js"], availability: "Disponible dès maintenant", location: "Lyon", appliedTo: "Dev full stack H/F", sentAt: "01/04/2026" },
];

export default function ProfilAdminPage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState({ company: "", email: "", location: "" });
  const [form, setForm] = useState(saved);
  const [offres, setOffres] = useState<Job[]>([]);

  useEffect(() => {
    authApi.me().then((res) => {
      if (res?.success) {
        const { company, email, location } = res.data;
        const profile = { company: company || "", email: email || "", location: location || "" };
        setSaved(profile);
        setForm(profile);
      }
    });

    jobsApi.getRecruiterJobs().then((res) => {
      if (res?.success) setOffres(res.data);
    });
  }, []);

  const handleSave = () => { setSaved(form); setEditing(false); };
  const handleCancel = () => { setForm(saved); setEditing(false); };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6">
        <div className="flex justify-end pt-6">
          <LogoutButton />
        </div>

        <div className="flex flex-col items-center gap-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {saved.company.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-indigo-600">{saved.company.split(" ").at(-1)}</span>
          </h1>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 uppercase font-semibold tracking-widest">
                <Pencil className="w-3.5 h-3.5" />
                Informations
              </div>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors">
                  Modifier
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSave} aria-label="Sauvegarder" className="text-green-500 hover:text-green-700 transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={handleCancel} aria-label="Annuler" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {editing ? (
              <div className="flex flex-col gap-2">
                <input
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  placeholder="Nom de l'entreprise"
                  className="border border-indigo-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-indigo-400"
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="Email"
                  type="email"
                  className="border border-indigo-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-indigo-400"
                />
                <input
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="Localisation"
                  className="border border-indigo-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-indigo-400"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  {saved.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  {saved.location}
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />

        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">
            Mes offres
          </h2>
          <div className="flex flex-col gap-3">
            {offres.length === 0 && (
              <p className="text-sm text-gray-400 text-center">Aucune offre publiée.</p>
            )}
            {offres.map((offre) => {
              const skills = (() => {
                try { return JSON.parse(offre.skills || "[]"); } catch { return []; }
              })();
              const salary = offre.salary_min || offre.salary_max
                ? `${offre.salary_min ?? ""} – ${offre.salary_max ?? ""} ${offre.currency ?? "€"}`.trim()
                : "";
              return (
                <JobCardCompany
                  key={offre.id}
                  title={offre.title}
                  company={saved.company}
                  location=""
                  salary={salary}
                  contractType={offre.contract_type || ""}
                  tags={skills}
                  postedAt={new Date(offre.created_at).toLocaleDateString("fr-FR")}
                  remote={offre.remote_type || ""}
                  publishedAt={new Date(offre.created_at).toLocaleDateString("fr-FR")}
                />
              );
            })}
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
