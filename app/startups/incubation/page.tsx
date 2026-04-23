import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import {
  tracks,
  incubationPerks,
  cohortTimeline,
  currentCohort,
  pastCohorts,
  screeningCommittee,
  cohortMentors,
} from "@/data/incubation";
import {
  ArrowUpRight,
  Calendar,
  Users,
  FileCheck,
  Beaker,
  BookOpenCheck,
  Handshake,
  ShieldCheck,
  Trophy,
  Banknote,
  Factory,
  CircleDot,
} from "lucide-react";

export const metadata = {
  title: "Bharat Incubate · defence startup incubation",
  description:
    "A semi-annual cohort-based incubation program for Indian defence startups — tracks, stipend, lab access, compliance, and a capstone at Summit.",
};

const perkIconMap = [
  Banknote,
  Beaker,
  Users,
  BookOpenCheck,
  ShieldCheck,
  Trophy,
  Handshake,
  Factory,
];

export default function IncubationPage() {
  return (
    <>
      <PageHero
        label="Bharat Incubate · startup incubation"
        title={<>A serious program for serious defence builders.</>}
        intro="Bharat Incubate is a semi-annual cohort-based program for Indian defence startups. Four tracks. 12–16 weeks. Non-dilutive stipend. Full lab access. Compliance, IP, and pilot support. A capstone demo at Summit. Designed so the path from prototype to pilot is legible and reproducible."
        stats={[
          { label: "Tracks", value: tracks.length },
          { label: "Cohort size", value: currentCohort.cohortSize },
          { label: "Applied · current", value: currentCohort.applied },
          { label: "Graduates (alumni)", value: pastCohorts.reduce((s, c) => s + c.graduated, 0) },
        ]}
      />

      <Section
        label="Current cohort"
        title={<>{currentCohort.name}</>}
        intro="Applications are open. Shortlisting begins two weeks after close; final offers follow within four weeks."
        cta={
          <Link href="/startups/incubation/apply" className="btn-accent">
            Apply for incubation <ArrowUpRight className="h-4 w-4" />
          </Link>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { label: "Applications open until", value: currentCohort.applicationsOpenUntil, icon: Calendar },
            { label: "Cohort starts", value: currentCohort.startDate, icon: CircleDot },
            { label: "Capstone demo", value: currentCohort.demoDay, icon: Trophy },
            { label: "Confirmed · applied", value: `${currentCohort.confirmed} / ${currentCohort.applied}`, icon: Users },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-xl border border-line bg-ink-900/50 p-5">
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  <span className="mono">{s.label}</span>
                </div>
                <div className="mt-3 font-display text-[15px] text-white">{s.value}</div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        label="Four tracks"
        title={<>Pick the pathway that matches your maturity.</>}
        intro="Each track has its own cadence and outcomes. Founders can apply to one primary track; the program office will suggest a better fit if one exists."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tracks.map((t) => (
            <div key={t.id} className="group rounded-2xl border border-line bg-ink-900/50 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-9 w-9 rounded-md border border-line"
                    style={{
                      background: `linear-gradient(135deg, ${t.color}40, ${t.color}10)`,
                      borderColor: `${t.color}40`,
                    }}
                  />
                  <div>
                    <div className="font-display text-[17px] font-semibold text-white">{t.name}</div>
                    <div className="mt-0.5 text-[11.5px] text-white/50">{t.audience}</div>
                  </div>
                </div>
                <Badge tone="accent">{t.weeks} weeks</Badge>
              </div>

              <p className="mt-4 text-[13.5px] leading-relaxed text-white/70">{t.summary}</p>

              <div className="mt-5">
                <div className="mono mb-2">Outcomes</div>
                <ul className="space-y-1.5 text-[12.5px] text-white/70">
                  {t.outcomes.map((o) => (
                    <li key={o}>· {o}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <div className="mono mb-2">Eligibility</div>
                  <ul className="space-y-1.5 text-[12px] text-white/60">
                    {t.eligibility.map((e) => (
                      <li key={e}>· {e}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mono mb-2">Domains</div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.domains.map((d) => (
                      <span key={d} className="chip">{d}</span>
                    ))}
                  </div>
                  <div className="mono mt-4 mb-2">Stipend</div>
                  <div className="text-[12.5px] text-white">{t.stipend}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="mono">{t.id}</span>
                <Link
                  href={`/startups/incubation/apply?track=${t.slug}`}
                  className="inline-flex items-center gap-1 text-[12px] text-accent"
                >
                  Apply to this track <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        label="What founders get"
        title={<>A defence-tuned operating system for 12–16 weeks.</>}
        intro="The program is designed so that one cohort covers what would normally take nine months of founder hustle — from architecture review to compliance to a first pilot."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {incubationPerks.map((p, i) => {
            const Icon = perkIconMap[i] ?? ShieldCheck;
            return (
              <div key={p.title} className="rounded-xl border border-line bg-ink-900/50 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-ink-850 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="mt-4 font-display text-[14.5px] text-white">{p.title}</div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">{p.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        label="Cohort rhythm"
        title={<>A predictable 12–16 week cadence.</>}
        intro="Each week has a defined output. Standing slots with mentors. A mid-cohort checkpoint. A capstone. Founders know what's expected at every stage."
      >
        <ol className="relative border-l border-line pl-6 space-y-5">
          {cohortTimeline.map((w, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[30px] top-1.5 h-2 w-2 rounded-full bg-accent" />
              <div className="mono text-accent">{w.week}</div>
              <div className="mt-1 font-display text-[15px] text-white">{w.title}</div>
              <div className="mt-0.5 text-[12.5px] text-white/55">{w.detail}</div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        label="Screening & mentors"
        title={<>Reviewed by people who've built and bought.</>}
        intro="Applications are reviewed by the screening committee. Shortlisted teams are assigned two dedicated mentors for the duration of the cohort."
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div className="mono mb-4 text-accent">Screening committee</div>
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-ink-900/50">
              {screeningCommittee.map((m) => (
                <li key={m.name} className="flex items-center gap-3 p-4">
                  <Avatar name={m.name} size={34} />
                  <div>
                    <div className="text-[13px] text-white">{m.name}</div>
                    <div className="text-[11px] text-white/45">{m.role} · {m.org}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono mb-4 text-accent">Cohort mentors</div>
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-ink-900/50">
              {cohortMentors.map((m) => (
                <li key={m.name} className="flex items-center gap-3 p-4">
                  <Avatar name={m.name} size={34} />
                  <div>
                    <div className="text-[13px] text-white">{m.name}</div>
                    <div className="text-[11px] text-white/45">{m.role} · {m.org}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section label="Alumni cohorts" title={<>A track record of pilots and production.</>}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pastCohorts.map((c) => (
            <div key={c.name} className="rounded-xl border border-line bg-ink-900/40 p-6">
              <div className="mono mb-2">{c.name}</div>
              <div className="font-display text-[20px] text-white">{c.graduated} graduates</div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
                <div><div className="mono">Grants unlocked</div><div className="mt-1 text-white">{c.grantsUnlocked}</div></div>
                <div><div className="mono">Pilots reached</div><div className="mt-1 text-white">{c.pilots}</div></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 rounded-2xl border border-line bg-ink-900/50 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-xl">
            <div className="mono text-accent">Ready to apply?</div>
            <div className="mt-2 font-display text-[22px] text-white">Applications for {currentCohort.name} close on {currentCohort.applicationsOpenUntil}.</div>
            <p className="mt-2 text-[13px] text-white/60">
              The application takes 10–15 minutes. We evaluate on track fit, team depth, and a credible service / DPSU hypothesis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/startups/incubation/apply" className="btn-accent">
              <FileCheck className="h-4 w-4" />
              Start application
            </Link>
            <Link href="/contact" className="btn-ghost">Book a program office call</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
