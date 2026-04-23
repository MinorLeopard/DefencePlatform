"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/filters/FilterBar";
import { ProjectCard } from "@/components/cards/ProjectCard";
import type { Project } from "@/data/projects";

const categories = [
  "All",
  "Pilot",
  "Prototype",
  "Production",
  "UAS / Drones",
  "Maritime",
  "Space",
  "Communications",
  "Electronics & EW",
  "Land Systems",
  "Sensors",
  "Robotics",
  "Simulation & Training",
];

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchC = category === "All" || p.stage === category || p.domain === category;
      return matchQ && matchC;
    });
  }, [projects, query, category]);

  return (
    <div className="flex flex-col gap-8">
      <FilterBar
        categories={categories}
        placeholder="Search projects, tech stacks, maintainers..."
        onSearch={setQuery}
        onCategory={setCategory}
      />
      <div className="flex items-center justify-between text-[12px] text-white/50">
        <span>{filtered.length} projects shown</span>
        <span className="mono">Sort · activity ↓</span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-xl border border-line bg-ink-900/50 p-12 text-center text-white/50">
          No projects match. Try a different query.
        </div>
      )}
    </div>
  );
}
