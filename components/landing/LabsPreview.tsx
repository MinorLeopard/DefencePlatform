import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { labs, labMetricsAggregate } from "@/data/labs";
import {
  ArrowUpRight,
  FlaskConical,
  ScanEye,
  Target,
  Boxes,
  Cpu,
  UsersRound,
  Beaker,
} from "lucide-react";

const categoryIcon: Record<string, any> = {
  "Autonomous Systems": FlaskConical,
  "Computer Vision & Sensing": ScanEye,
  "Guidance, Navigation & Control": Target,
  "Defence Simulation": Boxes,
  "Embedded AI Systems": Cpu,
  "Human Performance & Training": UsersRound,
};

export function LabsPreview() {
  return (
    <Section
      label="AI Labs · research layer"
      title={<>Shared research infrastructure, disciplined access.</>}
      intro="Six labs — autonomy, sensing, guidance, simulation, embedded AI, and human performance — run as shared infrastructure for members, startups, universities, and service research advisors."
      cta={
        <Link href="/labs" className="btn-ghost">
          Explore all labs <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => {
          const Icon = categoryIcon[lab.category] ?? Beaker;
          return (
            <Link
              key={lab.id}
              href={`/labs/${lab.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-line bg-ink-900/50 p-5 transition-colors hover:border-line-strong hover:bg-ink-850/70"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-ink-850 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-[14.5px] font-semibold text-white line-clamp-1">{lab.name}</div>
                    <div className="mt-0.5 text-[10.5px] text-white/40 line-clamp-1">{lab.locations[0]}</div>
                  </div>
                </div>
                {lab.openCalls.length > 0 && (
                  <Badge tone="accent" dot>
                    {lab.openCalls.length} open
                  </Badge>
                )}
              </div>
              <p className="line-clamp-2 text-[12.5px] leading-relaxed text-white/60">{lab.tagline}</p>
              <div className="mt-auto flex items-center justify-between text-[11px] text-white/45">
                <span>
                  {lab.metrics.contributors} researchers · {lab.metrics.activeStudies} studies
                </span>
                <span className="inline-flex items-center gap-1 text-accent">
                  Open <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat label="Labs active" value={labMetricsAggregate.labs} />
        <MiniStat label="Researchers" value={labMetricsAggregate.contributors} />
        <MiniStat label="Active studies" value={labMetricsAggregate.activeStudies} />
        <MiniStat label="Publications YTD" value={labMetricsAggregate.publicationsYTD} />
      </div>
    </Section>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-line bg-ink-900/40 p-4">
      <div className="mono text-[9.5px]">{label}</div>
      <div className="mt-1.5 font-display text-[22px] font-semibold text-white">{value}</div>
    </div>
  );
}
