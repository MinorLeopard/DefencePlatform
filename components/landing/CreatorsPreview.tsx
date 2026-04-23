import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { GradientThumb } from "@/components/ui/Thumb";
import { reels } from "@/data/creators";
import { formatCompact } from "@/lib/format";

export function CreatorsPreview() {
  const top = reels.slice(0, 6);
  return (
    <Section
      label="Creators · showcase"
      title={<>Build logs, demos, and field notes — in the open.</>}
      intro="A modern media layer for defence-tech builders. Post demos, drone clips, teardowns, simulations, and field notes from the front of the innovation curve."
      cta={
        <Link href="/creators" className="btn-ghost">
          Watch more <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {top.map((r) => (
          <Link key={r.id} href="/creators" className="group relative">
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
            <div className="mt-3 flex items-center justify-between text-[11.5px] text-white/55">
              <span>{r.creator} · {r.org}</span>
              <span>{formatCompact(r.views)} views</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
