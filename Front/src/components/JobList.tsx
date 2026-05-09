"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import JobCard from "./JobCard";
import { jobsApi as api } from "@/lib/api";

const sorts = ["Recent", "Pertinent", "Salaire"];

const CONTRACT_MAP: Record<string, string[]> = {
  CDI: ["CDI", "cdi", "full-time"],
  CDD: ["CDD", "cdd"],
  Stage: ["Stage", "stage", "internship"],
  Alternance: ["Alternance", "alternance", "apprenticeship"],
  "Tele Travail": ["remote", "full_remote", "Remote"],
};

type Job = {
  id: string;
  title: string;
  company_id: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  contract_type: string;
  remote_type: string;
  skills: string;
  experience_years: number;
  created_at: string;
};

type Props = {
  activeFilter: string;
  activeSort: string;
  onSortChange: (sort: string) => void;
  query: string;
  location: string;
};

export default function JobList({ activeFilter, activeSort, onSortChange, query, location }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.getAll();
        if (res.success) {
          setJobs(res.data);
        } else {
          setError("Erreur lors du chargement des offres.");
        }
      } catch {
        setError("Impossible de contacter le serveur.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filtered = useMemo(() => {
    let result = [...jobs];

    if (activeFilter !== "Tous") {
      const accepted = CONTRACT_MAP[activeFilter] ?? [];
      if (activeFilter === "Tele Travail") {
        result = result.filter((j) => accepted.includes(j.remote_type));
      } else {
        result = result.filter((j) => accepted.includes(j.contract_type));
      }
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company_id.toLowerCase().includes(q),
      );
    }

    if (location.trim()) {
      const loc = location.toLowerCase();
      result = result.filter((j) => j.remote_type?.toLowerCase().includes(loc));
    }

    if (activeSort === "Recent") {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (activeSort === "Salaire") {
      result.sort((a, b) => (b.salary_max ?? 0) - (a.salary_max ?? 0));
    } else if (activeSort === "Pertinent") {
      result.sort((a, b) => (b.experience_years ?? 0) - (a.experience_years ?? 0));
    }

    return result;
  }, [jobs, activeFilter, activeSort, query, location]);

  if (loading) return <p className="text-sm text-gray-400">Chargement des offres...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="text-gray-900 font-medium">{filtered.length} offres</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Trier par:</span>
          {sorts.map((sort) => (
            <button
              key={sort}
              onClick={() => onSortChange(sort)}
              className={cn(
                "text-sm px-4 py-1.5 rounded-lg border transition-colors",
                activeSort === sort
                  ? "border-indigo-400 text-indigo-600 bg-white"
                  : "border-gray-200 text-gray-500 bg-white hover:border-indigo-300",
              )}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400">Aucune offre ne correspond à votre recherche.</p>
        ) : (
          filtered.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company_id}
              location={job.remote_type}
              salary={job.salary_min && job.salary_max ? `${job.salary_min} – ${job.salary_max} €` : "Non précisé"}
              contractType={job.contract_type ?? "—"}
              tags={JSON.parse(job.skills || "[]")}
              postedAt={new Date(job.created_at).toLocaleDateString("fr-FR")}
              remote={job.remote_type}
            />
          ))
        )}
      </div>
    </div>
  );
}
