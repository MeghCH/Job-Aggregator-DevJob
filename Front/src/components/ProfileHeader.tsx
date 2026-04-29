import { Mail, Phone, MapPin, Pencil } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Clara <span className="text-indigo-500">Demoy</span>
      </h1>

      <div className="flex gap-16 w-full justify-center">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 uppercase font-semibold tracking-widest">
            <Pencil className="w-3.5 h-3.5" />
            Informations
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Mail className="w-4 h-4 text-indigo-400" />
            Clarademoy@gmail.com
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Phone className="w-4 h-4 text-indigo-400" />
            07 89 21 23 14
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-indigo-400" />
            Strasbourg, France
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-sm text-gray-500 uppercase font-semibold tracking-widest">
            Compétences
          </div>

          <label htmlFor="competences" className="sr-only">
            Ajouter une compétence
          </label>
          <select
            id="competences"
            className="border border-indigo-200 rounded-lg px-3 py-1.5 text-sm text-gray-500 outline-none"
          >
            <option>Choisir</option>
            <option>TypeScript</option>
            <option>Node.js</option>
          </select>

          <div className="grid grid-cols-2 gap-2">
            {["JS", "Python", "React", "Docker"].map((skill) => (
              <span
                key={skill}
                className="text-sm text-indigo-600 font-medium bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-1.5 text-center"
              >
                {skill}
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
