"use client";

import { useState, useEffect } from "react";
import { Mail, MapPin, Pencil, X, Check } from "lucide-react";
import { authApi } from "@/lib/api";

const AVAILABLE_SKILLS = [
  "TypeScript", "JavaScript", "Python", "React", "Next.js",
  "Node.js", "Express", "Docker", "Kubernetes", "PostgreSQL",
  "MongoDB", "Redis", "GraphQL", "REST API", "Git",
  "Linux", "AWS", "Tailwind CSS", "Figma", "Java",
];

type Props = {
  name?: string;
  firstname?: string;
  email?: string;
};

export default function ProfileHeader({ name, firstname, email }: Props) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: name ?? "", firstname: firstname ?? "", email: email ?? "" });
  const [saved, setSaved] = useState({ name: name ?? "", firstname: firstname ?? "", email: email ?? "" });

  useEffect(() => {
    const updated = { name: name ?? "", firstname: firstname ?? "", email: email ?? "" };
    setForm(updated);
    setSaved(updated);
  }, [name, firstname, email]);
  const [skills, setSkills] = useState(["JS", "Python", "React", "Docker"]);

  const handleSave = async () => {
    await authApi.updateMe(form).catch(() => {});
    setSaved(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(saved);
    setEditing(false);
  };

  const handleAdd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !skills.includes(value)) setSkills((prev) => [...prev, value]);
    e.target.value = "";
  };

  const handleRemove = (skill: string) => setSkills((prev) => prev.filter((s) => s !== skill));

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900">
        {saved.firstname && <span>{saved.firstname} </span>}
        <span className="text-indigo-500">{saved.name}</span>
      </h1>

      <div className="flex gap-16 w-full justify-center">
        {/* Informations */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 uppercase font-semibold tracking-widest">
              <Pencil className="w-3.5 h-3.5" />
              Informations
            </div>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors">
                Modifier
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} aria-label="Sauvegarder" className="text-green-500 hover:text-green-700 transition-colors">
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={handleCancel} aria-label="Annuler" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {editing ? (
            <div className="flex flex-col gap-2">
              <input
                value={form.firstname}
                onChange={(e) => setForm((f) => ({ ...f, firstname: e.target.value }))}
                placeholder="Prénom"
                className="border border-indigo-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-indigo-400"
              />
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Nom"
                className="border border-indigo-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-indigo-400"
              />
              <input
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="Email"
                type="email"
                className="border border-indigo-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-indigo-400"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4 text-indigo-400" />
                {saved.email || "—"}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Strasbourg, France
              </div>
            </div>
          )}
        </div>

        {/* Compétences */}
        <div className="flex flex-col gap-3">
          <div className="text-sm text-gray-500 uppercase font-semibold tracking-widest">
            Compétences
          </div>
          <label htmlFor="competences" className="sr-only">Ajouter une compétence</label>
          <select
            id="competences"
            onChange={handleAdd}
            defaultValue=""
            className="border border-indigo-200 rounded-lg px-3 py-1.5 text-sm text-gray-500 outline-none cursor-pointer"
          >
            <option value="" disabled>Choisir une compétence</option>
            {AVAILABLE_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2 max-w-65">
            {skills.map((skill) => (
              <span key={skill} className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5">
                {skill}
                <button onClick={() => handleRemove(skill)} aria-label={`Supprimer ${skill}`} className="text-indigo-300 hover:text-indigo-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <button className="bg-green-200 hover:bg-green-300 text-gray-700 text-sm font-medium px-10 py-2.5 rounded-full transition-colors">
        Ouvert aux opportunités
      </button>
    </div>
  );
}
