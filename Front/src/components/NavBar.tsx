"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Offres d'emplois", href: "/offres" },
  { label: "Publier une offre", href: "/publier" },
  { label: "Profil", href: "/profil" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center px-8 py-4 border-b border-gray-100 bg-white gap-12">
      <span className="text-xl font-extrabold text-brand-600 tracking-tight shrink-0">
        DevJobs
      </span>

      <div className="flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm transition-colors",
              pathname === link.href
                ? "text-brand-600 font-semibold"
                : "text-gray-800 hover:text-brand-600",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
