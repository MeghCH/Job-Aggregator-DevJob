"use client";

import { useState } from "react";
import Navbar from "@/components/NavBar";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { n: "1 243", l: "Offres totales" },
  { n: "18", l: "En attente" },
  { n: "342", l: "Utilisateurs" },
  { n: "5", l: "Signalements" },
];

const offresEnAttente = [
  {
    id: 1,
    title: "Dev full stack H/F",
    company: "Poisson Barbu",
    location: "Strasbourg",
    date: "02/04/2026",
    type: "CDI",
    status: "pending",
  },
  {
    id: 2,
    title: "Alternance Data Engineer",
    company: "Snapp",
    location: "Paris",
    date: "01/04/2026",
    type: "Alternance",
    status: "pending",
  },
];

const offresSignalees = [
  {
    id: 3,
    title: "Stage UX Designer",
    company: "Entreprise inconnue",
    location: "Lyon",
    date: "03/04/2026",
    type: "Stage",
    status: "reported",
  },
];

const utilisateurs = [
  {
    id: 1,
    initials: "AL",
    name: "Alex Lambert",
    email: "alex.lambert@gmail.com",
    date: "12/01/2026",
    role: "user",
  },
  {
    id: 2,
    initials: "CD",
    name: "Clara Demoy",
    email: "clarademoy@gmail.com",
    date: "03/02/2026",
    role: "user",
  },
];

const entreprises = [
  {
    id: 3,
    initials: "PB",
    name: "Poisson Barbu",
    email: "rh@poissonbarbu.fr",
    date: "15/01/2026",
    role: "company",
  },
];

const bannis = [
  {
    id: 4,
    initials: "XX",
    name: "Compte supprimé",
    email: "spammer@mail.com",
    date: "28/03/2026",
    role: "banned",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"offres" | "users">("offres");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Interface <span className="text-indigo-600">d'administration</span>
        </h1>

        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.l}
              className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4"
            >
              <div className="text-2xl font-bold text-indigo-600">{s.n}</div>
              <div className="text-xs text-gray-400 mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="flex border-b border-gray-100">
          {[
            { key: "offres", label: "Modération des offres" },
            { key: "users", label: "Gestion des utilisateurs" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "offres" | "users")}
              className={cn(
                "text-sm px-5 py-3 border-b-2 transition-colors",
                activeTab === tab.key
                  ? "border-indigo-600 text-indigo-600 font-semibold"
                  : "border-transparent text-gray-400 hover:text-gray-600",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "offres" && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Offres en attente de validation
              </p>
              <div className="flex flex-col gap-2">
                {offresEnAttente.map((offre) => (
                  <div
                    key={offre.id}
                    className="flex items-center justify-between border border-indigo-100 bg-indigo-50/40 rounded-xl px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {offre.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {offre.company} · {offre.location} · Soumis le{" "}
                        {offre.date}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-amber-50 text-amber-500 border border-amber-200 px-2 py-0.5 rounded-md">
                          En attente
                        </span>
                        <span className="text-xs bg-indigo-50 text-indigo-500 border border-indigo-100 px-2 py-0.5 rounded-md">
                          {offre.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      <button className="text-xs bg-green-50 text-green-600 border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-100 transition-colors">
                        Approuver
                      </button>
                      <button className="text-xs bg-red-50 text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-100 transition-colors">
                        Refuser
                      </button>
                      <button className="text-xs bg-gray-50 text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Offres signalées
              </p>
              <div className="flex flex-col gap-2">
                {offresSignalees.map((offre) => (
                  <div
                    key={offre.id}
                    className="flex items-center justify-between border border-red-100 bg-red-50/30 rounded-xl px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {offre.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {offre.company} · {offre.location} · Signalé le{" "}
                        {offre.date}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-red-50 text-red-500 border border-red-200 px-2 py-0.5 rounded-md">
                          Signalée
                        </span>
                        <span className="text-xs bg-indigo-50 text-indigo-500 border border-indigo-100 px-2 py-0.5 rounded-md">
                          {offre.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      <button className="text-xs bg-green-50 text-green-600 border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-100 transition-colors">
                        Garder
                      </button>
                      <button className="text-xs bg-red-50 text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-100 transition-colors">
                        Refuser
                      </button>
                      <button className="text-xs bg-gray-50 text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="flex flex-col gap-6">
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-2 border border-indigo-100 bg-indigo-50/40 rounded-lg px-3 h-10">
                <Search className="w-4 h-4 text-indigo-300 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un utilisateur..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-indigo-300 flex-1"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-3 text-sm text-gray-500 outline-none"
              >
                <option value="all">Tous les rôles</option>
                <option value="user">Utilisateur</option>
                <option value="company">Entreprise</option>
                <option value="banned">Banni</option>
              </select>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Utilisateurs
              </p>
              <div className="flex flex-col gap-2">
                {utilisateurs.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between border border-indigo-100 bg-indigo-50/40 rounded-xl px-5 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                        {u.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {u.email} · Inscrit le {u.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-0.5 rounded-full font-medium">
                        Utilisateur
                      </span>
                      <button className="text-xs bg-gray-50 text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors">
                        Changer rôle
                      </button>
                      <button className="text-xs bg-red-50 text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-100 transition-colors">
                        Bannir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Entreprises
              </p>
              <div className="flex flex-col gap-2">
                {entreprises.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between border border-indigo-100 bg-indigo-50/40 rounded-xl px-5 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-600 shrink-0">
                        {u.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {u.email} · Inscrit le {u.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-2.5 py-0.5 rounded-full font-medium">
                        Entreprise
                      </span>
                      <button className="text-xs bg-gray-50 text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors">
                        Changer rôle
                      </button>
                      <button className="text-xs bg-red-50 text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-100 transition-colors">
                        Bannir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Comptes bannis
              </p>
              <div className="flex flex-col gap-2">
                {bannis.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between border border-red-100 bg-red-50/30 rounded-xl px-5 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-400 shrink-0">
                        {u.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-400">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {u.email} · Banni le {u.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <span className="text-xs bg-red-50 text-red-500 border border-red-200 px-2.5 py-0.5 rounded-full font-medium">
                        Banni
                      </span>
                      <button className="text-xs bg-green-50 text-green-600 border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-100 transition-colors">
                        Débannir
                      </button>
                      <button className="text-xs bg-gray-50 text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
