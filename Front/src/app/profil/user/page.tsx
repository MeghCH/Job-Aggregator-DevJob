"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import ProfileHeader from "@/components/ProfileHeader";
import JobCard from "@/components/JobCard";
import LogoutButton from "@/components/LogoutButton";
import { authApi } from "@/lib/api";

type User = {
  name: string;
  firstname: string;
  email: string;
  skills: string[] | null;
  location: string | null;
};

const candidatures = [
  { id: 1, title: "Dev full stack H/F", company: "Snapp", location: "Paris 9e", salary: "42 - 52 K", contractType: "CDI", tags: ["JS", "React", "Next JS"], postedAt: "Il y a 3h", remote: "Partiel remote" },
  { id: 2, title: "Dev full stack H/F", company: "Snapp", location: "Paris 9e", salary: "42 - 52 K", contractType: "CDI", tags: ["JS", "React", "Next JS"], postedAt: "Il y a 3h", remote: "Partiel remote" },
];

const offresSauvegardees = [
  { id: 3, title: "Dev full stack H/F", company: "Snapp", location: "Paris 9e", salary: "42 - 52 K", contractType: "CDI", tags: ["JS", "React", "Next JS"], postedAt: "Il y a 3h", remote: "Partiel remote" },
  { id: 4, title: "Dev full stack H/F", company: "Snapp", location: "Paris 9e", salary: "42 - 52 K", contractType: "CDI", tags: ["JS", "React", "Next JS"], postedAt: "Il y a 3h", remote: "Partiel remote" },
];

export default function ProfilPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    authApi.me().then((res) => {
      if (!res?.success) { router.replace("/connexion"); return; }
      setUser(res.data);
    }).catch(() => router.replace("/connexion"));
  }, [router]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6">
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
            {offresSauvegardees.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
