"use client";

import { useState } from "react";
import Navbar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import JobList from "@/components/JobList";

export default function OffresPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [activeSort, setActiveSort] = useState("Recent");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

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
    </div>
  );
}
