"use client";

import Navbar from "@/components/NavBar";

export default function CandidaturePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-10">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Information concernant{" "}
            <span className="text-indigo-600">la candidature.</span>
          </h1>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Prénom :*
              </label>
              <input
                type="text"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Nom :*
              </label>
              <input
                type="text"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Sexe :*
              </label>
              <input
                type="text"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Email :*
              </label>
              <input
                type="email"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Téléphone :*
              </label>
              <input
                type="tel"
                className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Code Postal :*
                </label>
                <input
                  type="text"
                  className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Ville :*
                </label>
                <input
                  type="text"
                  className="border border-indigo-100 bg-indigo-50/40 rounded-lg px-4 py-2.5 text-sm text-indigo-400 outline-none focus:border-indigo-400 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Documents de <span className="text-indigo-600">candidature.</span>
          </h2>

          <div className="flex items-center gap-4">
            <button className="bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-medium px-8 py-3 rounded-lg transition-colors">
              CV
            </button>
            <button className="bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-medium px-8 py-3 rounded-lg transition-colors">
              Lettre de motivation
            </button>
            <button className="bg-indigo-400 hover:bg-indigo-500 text-white text-sm font-medium px-8 py-3 rounded-lg transition-colors">
              Documents complementaires
            </button>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="flex justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-12 py-3 rounded-lg transition-colors">
            Postuler
          </button>
        </div>
      </div>
    </div>
  );
}
