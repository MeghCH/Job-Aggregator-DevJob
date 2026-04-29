"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import JobCard from "./JobCard";

const sorts = ["Recent", "Pertinent", "Salaire"];

const jobs = [
  {
    id: 1,
    title: "Dev full stack H/F",
    company: "Snapp",
    location: "Paris 9e",
    salary: "42 – 52 K",
    contractType: "CDI",
    tags: ["JS", "React", "Next JS"],
    postedAt: "Il y a 3h",
    remote: "Partiel remote",
  },
  {
    id: 2,
    title: "Dev full stack H/F",
    company: "Snapp",
    location: "Paris 9e",
    salary: "42 – 52 K",
    contractType: "CDI",
    tags: ["JS", "React", "Next JS"],
    postedAt: "Il y a 5h",
    remote: "Full remote",
  },
];

export default function JobList() {
  const [activeSort, setActiveSort] = useState("Recent");

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="text-gray-900 font-medium">156 offres</span> ·
          "Développeur Python" à Paris
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
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
