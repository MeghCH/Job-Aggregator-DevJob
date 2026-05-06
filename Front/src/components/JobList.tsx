"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import JobCard from "./JobCard";
import { jobsApi as api } from "@/lib/api";

const sorts = ["Recent", "Pertinent", "Salaire"];

type Job = {
  id: string;
  title: string;
  company_id: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  remote_type: string;
  skills: string;
  experience_years: number;
  created_at: string;
};

export default function JobList() {
  const [activeSort, setActiveSort] = useState("Recent");
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

  if (loading) {
    return <p className="text-sm text-gray-400">Chargement des offres...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="text-gray-900 font-medium">
            {jobs.length} offres
          </span>
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Trier par:</span>
          {sorts.map((sort) => (
            <button
              key={sort}
              onClick={() => setActiveSort(sort)}
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

      {/* Liste des offres */}
      <div className="flex flex-col gap-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            company={job.company_id}
            location={job.remote_type}
            salary={`${job.salary_min} – ${job.salary_max} €`}
            contractType="CDI"
            tags={JSON.parse(job.skills || "[]")}
            postedAt={new Date(job.created_at).toLocaleDateString("fr-FR")}
            remote={job.remote_type}
          />
        ))}
      </div>
    </div>
  );
}
