"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { authApi } from "@/lib/api";

const baseLinks = [
  { label: "Accueil", href: "/" },
  { label: "Offres d'emplois", href: "/offres" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    authApi.me().then((res) => setRole(res?.success ? res.data.role : null)).catch(() => {});
  }, []);

  const links = role === "recruiter"
    ? [...baseLinks, { label: "Publier une offre", href: "/publier" }, { label: "Profil", href: "/profil" }]
    : [...baseLinks, { label: "Profil", href: "/profil" }];

  return (
    <nav className="flex items-center px-8 py-4 border-b border-gray-100 bg-white gap-12">
      <Link href="/" className="text-xl font-extrabold text-indigo-700 tracking-tight shrink-0">
        DevJobs
      </Link>

      <div className="flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm transition-colors",
              pathname === link.href
                ? "text-indigo-700 font-semibold"
                : "text-gray-800 hover:text-indigo-500",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
