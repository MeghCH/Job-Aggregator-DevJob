"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { saveJob, unsaveJob } from "@/lib/api";

type JobCardProps = {
  id?: string | number;
  title: string;
  company: string;
  location: string;
  salary: string;
  contractType: string;
  tags: string[];
  postedAt: string;
  remote: string;
  jobSource?: string;
  initialSaved?: boolean;
  onUnsave?: () => void;
};

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  contractType,
  tags,
  postedAt,
  remote,
  jobSource = "wld",
  initialSaved = false,
  onUnsave,
}: JobCardProps) {
  const [saved, setSaved] = useState(initialSaved);

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
    <Link href={id ? `/offres/${encodeURIComponent(id)}` : "#"} className="flex items-start justify-between border border-indigo-100 bg-indigo-50/40 rounded-xl px-6 py-5 hover:border-indigo-300 transition-colors cursor-pointer">
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
      <div className="flex flex-col items-end gap-3 shrink-0 ml-6">
        <span className="text-sm font-semibold text-indigo-600">{salary}</span>
        <span className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full font-medium">
          {contractType}
        </span>
        <button
          aria-label="Sauvegarder cette offre"
          onClick={handleSave}
          className="p-2 border border-indigo-200 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-indigo-500 text-indigo-500" : "text-indigo-400"}`} />
        </button>
      </div>
    </Link>
  );
}
