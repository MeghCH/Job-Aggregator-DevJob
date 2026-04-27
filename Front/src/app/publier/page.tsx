"use client";

import { useState } from "react";
import Navbar from "@/components/NavBar";
import FormField from "@/components/FormField";

export default function PublierPage() {
  const [skills, setSkills] = useState<string[]>([
    "JS",
    "Python",
    "React",
    "Docker",
  ]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Publier une <span className="text-indigo-600">offre d'emploi</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Remplis les informations ci-dessous pour diffuser ton offre auprès
            de milliers de développeurs.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Information générales
          </span>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Intitulé du poste" required>
              <input
                type="text"
                placeholder="Ex: Developpeur Python"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300"
              />
            </FormField>
            <FormField label="Nom de l'entreprise" required>
              <input
                type="text"
                placeholder="Ex : Snapp"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField label="Type de contrat" required>
              <select className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 text-gray-500 transition-colors">
                <option value="">Choisir</option>
                <option>CDI</option>
                <option>CDD</option>
                <option>Stage</option>
                <option>Alternance</option>
              </select>
            </FormField>
            <FormField label="Localisation" required>
              <input
                type="text"
                placeholder="Ex: Paris, France"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300"
              />
            </FormField>
            <FormField label="Télétravail">
              <select className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 text-gray-500 transition-colors">
                <option value="">Choisir</option>
                <option>Présentiel</option>
                <option>Partiel remote</option>
                <option>Full remote</option>
              </select>
            </FormField>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Rémunération
          </span>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Salaire annuel brut">
              <input
                type="text"
                placeholder="Ex: 50k"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300"
              />
            </FormField>
            <FormField label="Expérience requise">
              <input
                type="text"
                placeholder="Ex: Junior"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300"
              />
            </FormField>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Compétences & description
          </span>

          <FormField label="Compétences techniques" required>
            <div className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-3 flex gap-4 min-h-10">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
                placeholder="Ajouter une compétence..."
                className="bg-transparent border-none outline-none text-sm text-indigo-400 text-gray-700 placeholder-indigo-300 flex-1"
              />
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    onClick={() => removeSkill(skill)}
                    className="text-sm text-indigo-600 font-medium bg-white border border-indigo-100 rounded-lg px-4 py-1 text-center cursor-pointer hover:bg-red-50 hover:border-red-200 hover:text-red-400 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FormField>

          <FormField label="Description du poste" required>
            <textarea
              placeholder="Decris les missions, les attentes, le contexte etc..."
              className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-3 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300 min-h-[140px] resize-none"
            />
          </FormField>

          <FormField label="Profil recherché">
            <textarea
              placeholder="Decris le profil ideal..."
              className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-3 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors placeholder-indigo-300 min-h-[100px] resize-none"
            />
          </FormField>
        </div>

        <hr className="border-gray-100" />

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Les champs marqués * sont obligatoires
          </p>
          <button className="bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-semibold px-10 py-3 rounded-lg transition-colors">
            Publier l'offre
          </button>
        </div>
      </div>
    </div>
  );
}
