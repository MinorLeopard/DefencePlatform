import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { StartupCard } from "@/components/cards/StartupCard";
import { Section } from "@/components/ui/Section";
import { startups } from "@/data/startups";
import { grants, patentStages } from "@/data/grants";
import { FileText, Award, Landmark, Banknote, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Startups, grants & patents",
  description:
    "Startup onboarding, grants, strategic capital, and patent support for defence-tech builders in India.",
};

const grantIconMap: Record<string, any> = {
  Grant: FileText,
  Prize: Award,
  Contract: Landmark,
  Equity: Banknote,
  Debt: Banknote,
};

export default function StartupsPage() {
  return (
    <>
      <PageHero
        label="Startups · funding · patents"
        title={<>From first prototype to first production contract.</>}
        intro="A full-stack support layer for defence-tech startups in India — onboarding, grants, strategic capital, production debt, and a dedicated patent desk."
        stats={[
          { label: "Startups onboarded", value: startups.length },
          { label: "Grants + capital", value: "₹412 Cr" },
          { label: "Patents supported", value: 192 },
          { label: "Investor council", value: 34 },
        ]}
      />

      <Section
        label="Cohort"
        title={<>Builders scaling sovereign capability.</>}
        intro="Our onboarded cohort spans pre-seed to Series B — across autonomy, sensors, EW, maritime, logistics, and energy."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {startups.map((s) => (
            <StartupCard key={s.id} startup={s} />
          ))}
        </div>
      </Section>

      <Section
        id="grants"
        label="Capital stack"
        title={<>Grants, prizes, equity, and production debt — in one place.</>}
        intro="We stitch together the capital layers most defence hardware teams can't access through ordinary venture channels."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {grants.map((g) => {
            const Icon = grantIconMap[g.kind] ?? FileText;
            return (
              <div key={g.id} className="rounded-xl border border-line bg-ink-900/50 p-6 transition-colors hover:border-line-strong">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-ink-850 text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-display text-[16px] text-white">{g.name}</div>
                      <div className="text-[11px] text-white/45">{g.sponsor}</div>
                    </div>
                  </div>
                  <span className="chip-accent">{g.kind}</span>
                </div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-white/70">{g.description}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-[11.5px]">
                  <div><div className="mono">Ticket size</div><div className="mt-1 text-white">{g.ticket}</div></div>
                  <div><div className="mono">Open until</div><div className="mt-1 text-white">{g.openUntil}</div></div>
                </div>
                <div className="mt-4">
                  <div className="mono mb-2">Focus</div>
                  <div className="flex flex-wrap gap-1.5">{g.focus.map((f) => <span key={f} className="chip">{f}</span>)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        id="patents"
        label="Patent desk"
        title={<>A dedicated patent pipeline for defence hardware.</>}
        intro="Work with defence-cleared patent counsel, BDN portfolio managers, and partner agents — from ideation through PCT national phase."
      >
        <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-5">
          {patentStages.map((s, i) => (
            <li key={s.id} className="rounded-xl border border-line bg-ink-900/50 p-5">
              <div className="flex items-center justify-between">
                <span className="mono text-accent">Stage 0{i + 1}</span>
                <span className="chip">{s.stage}</span>
              </div>
              <div className="mt-3 font-display text-[14px] text-white">{s.title}</div>
              <p className="mt-2 text-[12px] leading-relaxed text-white/60">{s.description}</p>
              <div className="mt-3 text-[11px] text-white/40">Turnaround · {s.turnaround}</div>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-line bg-ink-900/50 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-display text-[20px] text-white">Ready to engage the patent desk?</div>
            <p className="mt-1 text-[13px] text-white/55">Submit your ideation note and we'll assign a portfolio manager within 72 hours.</p>
          </div>
          <Link href="/contact" className="btn-accent">Engage desk <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </Section>
    </>
  );
}
