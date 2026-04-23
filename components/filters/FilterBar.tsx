"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

export function FilterBar({
  categories,
  onSearch,
  onCategory,
  placeholder,
  initialCategory = "All",
}: {
  categories: string[];
  onSearch?: (q: string) => void;
  onCategory?: (c: string) => void;
  placeholder?: string;
  initialCategory?: string;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(initialCategory);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder={placeholder ?? "Search..."}
            className="w-full rounded-md border border-line bg-ink-900/70 px-10 py-3 text-[14px] placeholder:text-white/30 focus:border-line-strong focus:outline-none"
          />
          <kbd className="absolute right-3.5 top-1/2 hidden -translate-y-1/2 text-[10px] text-white/30 md:block">⌘K</kbd>
        </div>
        <button className="btn-ghost !py-3 hidden md:inline-flex">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Advanced filters
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCat(c);
              onCategory?.(c);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[12px] transition-colors",
              cat === c
                ? "border-accent/40 bg-accent/15 text-accent"
                : "border-line text-white/60 hover:border-line-strong hover:text-white",
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
