"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/filters/FilterBar";
import { ProblemCard } from "@/components/cards/ProblemCard";
import type { Problem } from "@/data/problems";

const categories = [
  "All",
  "Open",
  "Flagship",
  "Moonshot",
  "Awarded",
  "Maritime",
  "UAS / Drones",
  "Space",
  "Electronics & EW",
  "Communications",
  "Land Systems",
  "Sensors",
  "Logistics",
];

export function ProblemsFilter({ problems }: { problems: Problem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const matchQ =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.summary.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchC =
        category === "All" ||
        p.status === category ||
        p.difficulty === category ||
        p.domain === category;
      return matchQ && matchC;
    });
  }, [problems, query, category]);

  return (
    <div className="flex flex-col gap-8">
      <FilterBar
        categories={categories}
        placeholder="Search problems, sponsors, tags..."
        onSearch={setQuery}
        onCategory={setCategory}
      />
      <div className="flex items-center justify-between text-[12px] text-white/50">
        <span>{filtered.length} problems shown</span>
        <span className="mono">Sort · posted ↓</span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProblemCard key={p.id} problem={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-xl border border-line bg-ink-900/50 p-12 text-center text-white/50">
          No problems match the current filters. Adjust the search or clear the category.
        </div>
      )}
    </div>
  );
}
