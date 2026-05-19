"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import JobList from "@/components/JobList";

export default function OffresPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [activeSort, setActiveSort] = useState("Recent");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Le job tech <br />
            qui te correspond <span className="text-indigo-600">vraiment.</span>
          </h1>
        </div>

        <SearchBar
          query={query}
          location={location}
          onQueryChange={setQuery}
          onLocationChange={setLocation}
        />

        <FilterBar active={activeFilter} onChange={setActiveFilter} />

        <JobList
          activeFilter={activeFilter}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          query={query}
          location={location}
        />
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg transition-colors"
          aria-label="Retour en haut"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M11.0001 22.0003L13 22.0004L13 8.41421L18.4142 8.41421L12 2L5.58575 8.41421L11 8.41421L11.0001 22.0003Z"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
