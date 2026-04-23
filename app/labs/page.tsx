import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { labs, labMetricsAggregate } from "@/data/labs";
import {
  Beaker,
  ArrowUpRight,
  FlaskConical,
  ScanEye,
  Target,
  Boxes,
  Cpu,
  UsersRound,
} from "lucide-react";

export const metadata = {
  title: "AI Labs",
  description:
    "Research environments for autonomy, vision, guidance, simulation, embedded AI, and human-performance studies.",
};

const categoryIcon: Record<string, any> = {
  "Autonomous Systems": FlaskConical,
  "Computer Vision & Sensing": ScanEye,
  "Guidance, Navigation & Control": Target,
  "Defence Simulation": Boxes,
  "Embedded AI Systems": Cpu,
  "Human Performance & Training": UsersRound,
};

export default function LabsPage() {
  return (
    <>
      <PageHero
        label="AI Labs · research layer"
        title={<>Shared research infrastructure for serious defence AI.</>}
        intro="Six research labs — autonomy, sensing, guidance, simulation, embedded AI, and human performance — run as shared infrastructure for members, startups, universities, and service research advisors. Each lab is a simulation and peer-review environment, not an operational facility."
        stats={[
          { label: "Labs active", value: labMetricsAggregate.labs },
          { label: "Researchers", value: labMetricsAggregate.contributors },
          { label: "Active studies", value: labMetricsAggregate.activeStudies },
          { label: "Publications (YTD)", value: labMetricsAggregate.publicationsYTD },
        ]}
      />

      <Section
        label="Labs"
        title={<>Six labs, one research layer.</>}
        intro="Each lab owns a tight mandate, shares benchmarks and tools, and runs member-only experiments with open publication where possible."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {labs.map((lab, i) => {
            const Icon = categoryIcon[lab.category] ?? Beaker;
            return (
              <Link
                key={lab.id}
                href={`/labs/${lab.slug}`}
                className="group flex flex-col gap-5 rounded-xl border border-line bg-ink-900/50 p-6 transition-colors hover:border-line-strong hover:bg-ink-850/70"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-ink-850 text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-display text-[17px] font-semibold text-white">{lab.name}</div>
                      <div className="mt-0.5 text-[11.5px] text-white/45">{lab.locations[0]}</div>
                    </div>
                  </div>
                  <span className="mono text-white/30">{lab.id}</span>
                </div>

                <p className="text-[13.5px] leading-relaxed text-white/65">{lab.tagline}</p>

                <div className="flex flex-wrap gap-1.5">
                  {lab.tracks.slice(0, 3).map((t) => (
                    <span key={t.title} className="chip">{t.title}</span>
                  ))}
                </div>

                <div className="mt-auto grid grid-cols-4 gap-3 border-t border-line pt-4 text-[11.5px]">
                  <div><div className="mono">Researchers</div><div className="mt-1 text-white">{lab.metrics.contributors}</div></div>
                  <div><div className="mono">Studies</div><div className="mt-1 text-white">{lab.metrics.activeStudies}</div></div>
                  <div><div className="mono">Pubs (YTD)</div><div className="mt-1 text-white">{lab.metrics.publicationsYTD}</div></div>
                  <div className="flex flex-col items-end"><div className="mono">Leads</div><div className="mt-1"><AvatarStack names={lab.leads.map((l) => l.name)} size={18} max={3} /></div></div>
                </div>

                <div className="flex items-center justify-between text-[11.5px] text-white/50 group-hover:text-accent transition-colors">
                  <span>{lab.openCalls.length} open {lab.openCalls.length === 1 ? "call" : "calls"}</span>
                  <span className="inline-flex items-center gap-1">Open lab <ArrowUpRight className="h-3 w-3" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section
        label="How labs work"
        title={<>Shared infrastructure, disciplined access.</>}
        intro="Labs are a membership benefit. Study slots are scheduled quarterly. Tools, benchmarks, and datasets are shared across labs; restricted artefacts require signed use agreements."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { title: "Apply for a study slot", body: "Propose a scoped study; slots are assigned quarterly. Campus groups can co-apply." },
            { title: "Collaborate across labs", body: "Shared verification harnesses and benchmarks let teams move between labs without rewriting infrastructure." },
            { title: "Publish and peer-review", body: "Publication-first posture. Restricted work is peer-reviewed inside member-only registries." },
          ].map((x, i) => (
            <div key={x.title} className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="mono mb-3 text-accent">Step 0{i + 1}</div>
              <div className="font-display text-[16px] text-white">{x.title}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">{x.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-ink-900/50 p-8 md:p-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="mono text-accent">Lab access</div>
            <div className="mt-2 font-display text-[22px] text-white">Bring a study. Use the infrastructure.</div>
            <p className="mt-2 text-[13.5px] text-white/60">
              Member teams can apply for a lab slot with a scoped study proposal. Campus groups are welcome via a co-application.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-accent">Apply for a slot <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="/assistant" className="btn-ghost">Ask the assistant</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
