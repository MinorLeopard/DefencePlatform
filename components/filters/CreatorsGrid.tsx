"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { FilterBar } from "@/components/filters/FilterBar";
import { GradientThumb } from "@/components/ui/Thumb";
import { reels } from "@/data/creators";
import { formatCompact } from "@/lib/format";

const categories = ["All", "demo", "build-log", "simulation", "drone", "interview", "teardown", "field"];

export function CreatorsGrid() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = useMemo(() => {
    return reels.filter((r) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.creator.toLowerCase().includes(q) ||
        r.org.toLowerCase().includes(q);
      const matchC = cat === "All" || r.kind === cat;
      return matchQ && matchC;
    });
  }, [query, cat]);
  return (
    <div className="flex flex-col gap-8">
      <FilterBar
        categories={categories.map((c) => (c === "All" ? c : c.replace("-", " ")))}
        placeholder="Search creators, orgs, topics..."
        onSearch={setQuery}
        onCategory={(c) => setCat(c === "All" ? "All" : c.replace(" ", "-"))}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <Link key={r.id} href="#" className="group">
            <div className="relative">
              <GradientThumb
                seed={r.thumbSeed}
                label={r.title}
                kicker={`${r.kind.toUpperCase()} · ${r.duration}`}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/90 backdrop-blur">
                  <Play className="h-5 w-5 translate-x-[1px] text-white" fill="white" />
                </span>
              </div>
            </div>
            <div className="mt-3">
              <p className="line-clamp-2 text-[13px] text-white/75">{r.description}</p>
              <div className="mt-2 flex items-center justify-between text-[11.5px] text-white/50">
                <span>{r.creator} · {r.org}</span>
                <span>{formatCompact(r.views)} views · {r.postedDaysAgo}d ago</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
