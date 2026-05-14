"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import ProfileHeader from "@/components/ProfileHeader";
import JobCard from "@/components/JobCard";
import LogoutButton from "@/components/LogoutButton";
import { authApi, getMyApplications, getSavedJobs } from "@/lib/api";

type User = {
  name: string;
  firstname: string;
  email: string;
  skills: string[] | null;
  location: string | null;
};


export default function ProfilPage() {
  const [user, setUser] = useState<User | null>(null);
  const [candidatures, setCandidatures] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    authApi.me().then((res) => {
      if (!res?.success) { router.replace("/connexion"); return; }
      setUser(res.data);
    }).catch(() => router.replace("/connexion"));

    getMyApplications().then((res) => {
      if (res?.success) setCandidatures(res.data);
    });

    getSavedJobs().then((res) => {
      if (res?.success) setSavedJobs(res.data);
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex justify-end pt-6">
          <LogoutButton />
        </div>

        <ProfileHeader
          name={user?.name}
          firstname={user?.firstname}
          email={user?.email}
          skills={user?.skills ?? []}
          location={user?.location ?? ""}
        />

        <hr className="border-gray-100 mb-8" />

        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">
            Mes candidatures
          </h2>
          <div className="flex flex-col gap-3">
            {candidatures.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">
            Offres sauvegardées
          </h2>
          <div className="flex flex-col gap-3">
            {savedJobs.map((job) => (
              <JobCard
                key={job.job_id}
                id={job.job_id}
                title={job.title ?? "—"}
                company={job.company_name ?? "—"}
                location={job.remote_type ?? "—"}
                salary={job.salary_min && job.salary_max ? `${job.salary_min} – ${job.salary_max} €` : "Non précisé"}
                contractType={job.contract_type ?? "—"}
                tags={job.skills ?? []}
                postedAt={new Date(job.saved_at).toLocaleDateString("fr-FR")}
                remote={job.remote_type ?? "—"}
                jobSource={job.job_source}
                initialSaved={true}
                onUnsave={() => setSavedJobs((prev) => prev.filter((j) => j.job_id !== job.job_id))}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
