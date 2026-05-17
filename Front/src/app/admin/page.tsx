"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/NavBar";
import LogoutButton from "@/components/LogoutButton";
import ProfileHeader from "@/components/ProfileHeader";
import { Search, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAdminUsers, updateAdminUser, deleteAdminUser, AdminUser } from "@/lib/api/admin";
import { triggerIngestion, IngestResult } from "@/lib/api/ingestion";
import { authApi } from "@/lib/api";

function getInitials(user: AdminUser) {
  return `${user.firstname?.[0] ?? ""}${user.name?.[0] ?? ""}`.toUpperCase();
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

const ROLE_LABELS: Record<string, string> = {
  user: "Utilisateur",
  recruiter: "Entreprise",
  admin: "Admin",
  banned: "Banni",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"offres" | "users">("offres");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [ingestLoading, setIngestLoading] = useState(false);
  const [ingestResult, setIngestResult] = useState<IngestResult | null>(null);
  const [ingestError, setIngestError] = useState("");

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [roleEditing, setRoleEditing] = useState<number | null>(null);
  const [actionError, setActionError] = useState("");
  const [adminProfile, setAdminProfile] = useState<{ firstname: string; name: string; email: string; skills: string[]; location: string } | null>(null);

  useEffect(() => {
    authApi.me().then((res) => {
      if (res?.success) {
        const { firstname, name, email, skills, location } = res.data;
        setAdminProfile({ firstname, name, email, skills: skills ?? [], location: location ?? "" });
      }
    }).catch(() => {});
  }, []);

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError("");
    try {
      const res = await getAdminUsers();
      if (res.success) {
        setUsers(res.data);
      } else {
        setUsersError("Impossible de charger les utilisateurs.");
      }
    } catch {
      setUsersError("Impossible de contacter le serveur.");
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (id: number, role: string) => {
    setActionError("");
    const res = await updateAdminUser(id, { role });
    if (!res.success) setActionError(res.message || "Erreur lors du changement de rôle.");
    setRoleEditing(null);
    fetchUsers();
  };

  const handleBan = async (id: number) => {
    setActionError("");
    const res = await updateAdminUser(id, { role: "banned" });
    if (!res.success) setActionError(res.message || "Erreur lors du bannissement.");
    fetchUsers();
  };

  const handleUnban = async (id: number) => {
    setActionError("");
    const res = await updateAdminUser(id, { role: "user" });
    if (!res.success) setActionError(res.message || "Erreur lors du débannissement.");
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    setActionError("");
    const res = await deleteAdminUser(id);
    if (!res.success) setActionError(res.message || "Erreur lors de la suppression.");
    fetchUsers();
  };

  const handleIngest = async () => {
    setIngestLoading(true);
    setIngestResult(null);
    setIngestError("");
    try {
      const data = await triggerIngestion();
      if (data.success) {
        setIngestResult(data.data ?? null);
      } else {
        setIngestError(data.message || "Échec de l'ingestion.");
      }
    } catch {
      setIngestError("Impossible de contacter le serveur.");
    } finally {
      setIngestLoading(false);
    }
  };

  const filterUsers = useCallback(
    (list: AdminUser[]) =>
      list.filter((u) => {
        const matchesSearch =
          search === "" ||
          `${u.firstname} ${u.name}`.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole =
          roleFilter === "all" ||
          (roleFilter === "recruiter" && u.role === "recruiter") ||
          u.role === roleFilter;
        return matchesSearch && matchesRole;
      }),
    [search, roleFilter]
  );

  const regularUsers = filterUsers(users.filter((u) => u.role === "user"));
  const recruiterUsers = filterUsers(users.filter((u) => u.role === "recruiter"));
  const bannedUsers = filterUsers(users.filter((u) => u.role === "banned"));
  const adminUsers = filterUsers(users.filter((u) => u.role === "admin"));

  const stats = [
    { n: "1 243", l: "Offres totales" },
    { n: "18", l: "En attente" },
    { n: usersLoading ? "…" : String(users.length), l: "Utilisateurs" },
    { n: "5", l: "Signalements" },
  ];

  const offresEnAttente = [
    { id: 1, title: "Dev full stack H/F", company: "Poisson Barbu", location: "Strasbourg", date: "02/04/2026", type: "CDI" },
    { id: 2, title: "Alternance Data Engineer", company: "Snapp", location: "Paris", date: "01/04/2026", type: "Alternance" },
  ];

  const offresSignalees = [
    { id: 3, title: "Stage UX Designer", company: "Entreprise inconnue", location: "Lyon", date: "03/04/2026", type: "Stage" },
  ];

  const UserRow = ({ u, section }: { u: AdminUser; section: "user" | "recruiter" | "banned" }) => (
    <div
      key={u.id}
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border rounded-xl px-5 py-3",
        section === "banned"
          ? "border-red-200 bg-red-100/30"
          : "border-indigo-100 bg-indigo-50/40"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
            section === "banned" ? "bg-red-200 text-red-1000" :
            section === "recruiter" ? "bg-green-200 text-green-800" :
            "bg-indigo-100 text-indigo-600"
          )}
        >
          {getInitials(u)}
        </div>
        <div>
          <p className={cn("text-sm font-semibold", section === "banned" ? "text-red-1000" : "text-gray-900")}>
            {u.firstname} {u.name}
          </p>
          <p className="text-xs text-gray-500">
            {u.email} · {section === "banned" ? `Banni le ${u.banned_at ? formatDate(u.banned_at) : "—"}` : `Inscrit le ${formatDate(u.created_at)}`}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        {section !== "banned" && (
          <>
            <span
              className={cn(
                "text-xs px-2.5 py-0.5 rounded-full font-medium border",
                section === "recruiter"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-indigo-50 text-indigo-600 border-indigo-100"
              )}
            >
              {ROLE_LABELS[u.role] ?? u.role}
            </span>

            {roleEditing === u.id ? (
              <select
                autoFocus
                defaultValue={u.role}
                onBlur={() => setRoleEditing(null)}
                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                className="border border-indigo-200 bg-white rounded-lg px-2 py-1 text-xs text-gray-700 outline-none"
              >
                <option value="user">Utilisateur</option>
                <option value="recruiter">Entreprise</option>
                <option value="admin">Admin</option>
              </select>
            ) : (
              <button
                onClick={() => setRoleEditing(u.id)}
                className="text-xs bg-gray-50 text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors"
              >
                Changer rôle
              </button>
            )}

            <button
              onClick={() => handleBan(u.id)}
              className="text-xs bg-red-100 text-red-700 border border-red-300 rounded-lg px-3 py-1.5 hover:bg-red-200 transition-colors"
            >
              Bannir
            </button>
          </>
        )}

        {section === "banned" && (
          <>
            <span className="text-xs bg-red-100 text-red-700 border border-red-300 px-2.5 py-0.5 rounded-full font-medium">
              Banni
            </span>
            <button
              onClick={() => handleUnban(u.id)}
              className="text-xs bg-green-100 text-green-800 border border-green-300 rounded-lg px-3 py-1.5 hover:bg-green-200 transition-colors"
            >
              Débannir
            </button>
            <button
              onClick={() => handleDelete(u.id)}
              className="text-xs bg-gray-50 text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors"
            >
              Supprimer
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6">
        <div className="flex justify-end">
          <LogoutButton />
        </div>

        <ProfileHeader
          name={adminProfile?.name}
          firstname={adminProfile?.firstname}
          email={adminProfile?.email}
          skills={adminProfile?.skills ?? []}
          location={adminProfile?.location ?? ""}
          showSkills={false}
          showOpportunities={false}
        />

        <hr className="border-gray-100" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-bold text-gray-900">
            Interface <span className="text-indigo-600">d&apos;administration</span>
          </h2>
          <button
            onClick={handleIngest}
            disabled={ingestLoading}
            className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
          >
            <RefreshCw className={cn("w-4 h-4", ingestLoading && "animate-spin")} />
            {ingestLoading ? "Ingestion en cours..." : "Ingérer offres WeLoveDevs"}
          </button>
        </div>

        {ingestResult && (
          <div className="bg-green-100 border border-green-300 rounded-xl px-5 py-3 text-sm text-green-800 flex flex-wrap gap-3 sm:gap-6">
            <span><span className="font-semibold">{ingestResult.inserted}</span> insérées</span>
            <span><span className="font-semibold">{ingestResult.skipped}</span> ignorées</span>
            <span><span className="font-semibold">{ingestResult.errors}</span> erreurs</span>
            <span><span className="font-semibold">{ingestResult.pagesFetched}</span> pages récupérées</span>
          </div>
        )}
        {ingestError && (
          <div className="bg-red-100 border border-red-300 rounded-xl px-5 py-3 text-sm text-red-700">
            {ingestError}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.l} className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-indigo-600">{s.n}</div>
              <div className="text-xs text-gray-500 mt-1">{s.l}</div>
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
                  : "border-transparent text-gray-500 hover:text-gray-600"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "offres" && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Offres en attente de validation
              </p>
              <div className="flex flex-col gap-2">
                {offresEnAttente.map((offre) => (
                  <div
                    key={offre.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-indigo-100 bg-indigo-50/40 rounded-xl px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{offre.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {offre.company} · {offre.location} · Soumis le {offre.date}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-amber-100 text-amber-700 border border-amber-300 px-2 py-0.5 rounded-md">
                          En attente
                        </span>
                        <span className="text-xs bg-indigo-100 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded-md">
                          {offre.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:shrink-0">
                      <button className="text-xs bg-green-100 text-green-800 border border-green-400 rounded-lg px-3 py-1.5 hover:bg-green-200 transition-colors">
                        Approuver
                      </button>
                      <button className="text-xs bg-red-100 text-red-800 border border-red-400 rounded-lg px-3 py-1.5 hover:bg-red-200 transition-colors">
                        Refuser
                      </button>
                      <button className="text-xs bg-gray-50 text-gray-600 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Offres signalées
              </p>
              <div className="flex flex-col gap-2">
                {offresSignalees.map((offre) => (
                  <div
                    key={offre.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-red-200 bg-red-100/30 rounded-xl px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{offre.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {offre.company} · {offre.location} · Signalé le {offre.date}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-red-100 text-red-800 border border-red-400 px-2 py-0.5 rounded-md">
                          Signalée
                        </span>
                        <span className="text-xs bg-indigo-100 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded-md">
                          {offre.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:shrink-0">
                      <button className="text-xs bg-green-100 text-green-800 border border-green-400 rounded-lg px-3 py-1.5 hover:bg-green-200 transition-colors">
                        Garder
                      </button>
                      <button className="text-xs bg-red-100 text-red-800 border border-red-400 rounded-lg px-3 py-1.5 hover:bg-red-200 transition-colors">
                        Refuser
                      </button>
                      <button className="text-xs bg-gray-50 text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors">
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
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 border border-indigo-100 bg-indigo-50/40 rounded-lg px-3 h-10">
                <Search className="w-4 h-4 text-indigo-300 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un utilisateur..."
                  className="bg-transparent border-none outline-none text-sm text-indigo-600 placeholder-indigo-300 flex-1"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                aria-label="Filtrer par rôle"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-3 h-10 text-sm text-gray-500 outline-none w-full sm:w-auto"
              >
                <option value="all">Tous les rôles</option>
                <option value="user">Utilisateur</option>
                <option value="recruiter">Entreprise</option>
                <option value="admin">Admin</option>
                <option value="banned">Banni</option>
              </select>
            </div>

            {actionError && (
              <div className="bg-red-100 border border-red-300 rounded-xl px-5 py-3 text-sm text-red-700">
                {actionError}
              </div>
            )}

            {usersError && (
              <div className="bg-red-100 border border-red-300 rounded-xl px-5 py-3 text-sm text-red-700">
                {usersError}
              </div>
            )}

            {usersLoading && (
              <div className="text-sm text-gray-500 text-center py-4">Chargement des utilisateurs…</div>
            )}

            {!usersLoading && (
              <>
                {(roleFilter === "all" || roleFilter === "user") && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                      Utilisateurs
                    </p>
                    <div className="flex flex-col gap-2">
                      {regularUsers.length === 0 ? (
                        <p className="text-sm text-gray-500">Aucun utilisateur trouvé.</p>
                      ) : (
                        regularUsers.map((u) => <UserRow key={u.id} u={u} section="user" />)
                      )}
                    </div>
                  </div>
                )}

                {(roleFilter === "all" || roleFilter === "recruiter") && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                      Entreprises
                    </p>
                    <div className="flex flex-col gap-2">
                      {recruiterUsers.length === 0 ? (
                        <p className="text-sm text-gray-500">Aucune entreprise trouvée.</p>
                      ) : (
                        recruiterUsers.map((u) => <UserRow key={u.id} u={u} section="recruiter" />)
                      )}
                    </div>
                  </div>
                )}

                {(roleFilter === "all" || roleFilter === "admin") && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                      Administrateurs
                    </p>
                    <div className="flex flex-col gap-2">
                      {adminUsers.length === 0 ? (
                        <p className="text-sm text-gray-500">Aucun administrateur trouvé.</p>
                      ) : (
                        adminUsers.map((u) => <UserRow key={u.id} u={u} section="user" />)
                      )}
                    </div>
                  </div>
                )}

                {(roleFilter === "all" || roleFilter === "banned") && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                      Comptes bannis
                    </p>
                    <div className="flex flex-col gap-2">
                      {bannedUsers.length === 0 ? (
                        <p className="text-sm text-gray-500">Aucun compte banni.</p>
                      ) : (
                        bannedUsers.map((u) => <UserRow key={u.id} u={u} section="banned" />)
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
