"use client";

import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { authApi } from "@/lib/api";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authApi.me().then((res) => setIsLoggedIn(!!res?.success)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <span className="text-xl font-extrabold text-indigo-600 tracking-tight">
          DevJobs
        </span>
        {isLoggedIn ? (
          <Link
            href="/profil"
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Profil
          </Link>
        ) : (
          <Link
            href="/connexion"
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Connexion
          </Link>
        )}
      </nav>

      <div className="flex justify-center px-8 py-6 border-b border-gray-100">
        <div className="w-full max-w-3xl">
          <SearchBar />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-600 tracking-tight">
          DevJobs
        </h1>
        <p className="text-2xl font-bold text-gray-900">
          Push ta carrière&nbsp;!
        </p>
        <Link
          href={isLoggedIn ? "/offres" : "/connexion"}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          {isLoggedIn ? "Voir les offres" : "Commencez ici"}
        </Link>
      </main>
    </div>
  );
}
