import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Users, Target, Award, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getProblem, problems } from "@/data/problems";
import { formatINR } from "@/lib/format";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProblem(params.slug);
  return { title: p ? p.title : "Problem" };
}

const statusTone: Record<string, any> = {
  Open: "green",
  Scouting: "cyan",
  "In Review": "amber",
  Awarded: "neutral",
  Prototyping: "accent",
  Closed: "red",
};

export default function ProblemDetail({ params }: { params: { slug: string } }) {
  const problem = getProblem(params.slug);
  if (!problem) notFound();
  const related = problems.filter((p) => p.domain === problem.domain && p.id !== problem.id).slice(0, 3);

  return (
    <>
      <section className="relative border-b border-line hero-grid">
        <div className="container-page relative z-10 pb-14 pt-10 md:pt-14">
          <Link href="/problems" className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to problems
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mono">{problem.id}</span>
            <Badge tone={statusTone[problem.status]} dot>{problem.status}</Badge>
            <Badge tone="accent">{problem.difficulty}</Badge>
            <Badge tone="neutral">{problem.domain}</Badge>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-[46px] md:leading-[1.06] max-w-4xl text-balance">
            {problem.title}
          </h1>
          <p className="mt-5 max-w-3xl text-[15.5px] leading-relaxed text-white/65">{problem.summary}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="mono mb-4 text-accent">Problem brief</div>
              <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">{problem.description}</p>
            </div>

            <div>
              <div className="mono mb-4 text-accent">Evaluation gates</div>
              <ol className="space-y-3">
                {[
                  "Gate 1 · Concept note & reference architecture — 6 weeks post-award",
                  "Gate 2 · Lab-scale prototype demo at sponsor facility — 6 months",
                  "Gate 3 · Field-trial unit with instrumented data capture — 12 months",
                  "Gate 4 · Production-representative unit + qualification test plan — 18+ months",
                ].map((g, i) => (
                  <li key={i} className="flex gap-4 rounded-lg border border-line bg-ink-900/40 p-4">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-[12px] text-accent">
                      {i + 1}
                    </span>
                    <div className="text-[13.5px] text-white/75">{g}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="mono mb-4 text-accent">Who should apply</div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[
                  { who: "Early-stage defence startups", note: "Pre-seed to Series-A teams with working prototypes or strong R&D provenance." },
                  { who: "University research groups", note: "Led by a faculty principal investigator; BDN can provide industry-integration support." },
                  { who: "Industry R&D arms", note: "Joint proposals with DPSUs and labs are welcome and encouraged." },
                  { who: "Serious independent builders", note: "Must have a credible technical and compliance plan." },
                ].map((x) => (
                  <div key={x.who} className="rounded-lg border border-line bg-ink-900/40 p-4">
                    <div className="font-display text-[14px] text-white">{x.who}</div>
                    <div className="mt-1 text-[12.5px] text-white/55">{x.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <div className="mono mb-4 text-accent">Related problems · {problem.domain}</div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {related.map((r) => (
                    <Link key={r.id} href={`/problems/${r.slug}`} className="rounded-lg border border-line bg-ink-900/40 p-4 transition-colors hover:border-line-strong hover:bg-ink-850/80">
                      <div className="mono text-[9.5px]">{r.id}</div>
                      <div className="mt-2 font-display text-[14px] text-white line-clamp-2">{r.title}</div>
                      <div className="mt-3 text-[11px] text-white/45">Bounty · {formatINR(r.bounty)}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-line bg-ink-900/60 p-6 shadow-soft">
              <div className="mono mb-2">Bounty pool</div>
              <div className="font-display text-3xl font-semibold text-white">{formatINR(problem.bounty)}</div>
              <div className="mt-1 text-[11.5px] text-white/50">Staged disbursement across {problem.timeline}</div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-[11.5px]">
                <Stat icon={<Users className="h-3.5 w-3.5" />} label="Teams" value={problem.teams} />
                <Stat icon={<Target className="h-3.5 w-3.5" />} label="Applicants" value={problem.applicants} />
                <Stat icon={<Calendar className="h-3.5 w-3.5" />} label="Deadline" value={problem.deadline} />
                <Stat icon={<Award className="h-3.5 w-3.5" />} label="TRL" value={`${problem.trl.from}–${problem.trl.to}`} />
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <button className="btn-accent w-full">Apply with team</button>
                <button className="btn-ghost w-full">Save to workspace</button>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-3">Sponsor</div>
              <div className="font-display text-[15px] text-white">{problem.sponsor}</div>
              <div className="mt-1 text-[11.5px] text-white/50">{problem.sponsorType}</div>
              <div className="mt-4 border-t border-line pt-4 text-[12px] text-white/60">
                <div className="flex items-center gap-2 mb-2"><MapPin className="h-3 w-3 text-accent" /> {problem.region}</div>
                <div className="flex items-center gap-2"><Clock className="h-3 w-3 text-accent" /> Posted {problem.postedDaysAgo}d ago · {problem.posterName}</div>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-3">Tags</div>
              <div className="flex flex-wrap gap-2">
                {problem.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-md border border-line bg-ink-850/60 p-3">
      <div className="mono mb-1.5 inline-flex items-center gap-1.5">{icon}{label}</div>
      <div className="font-display text-[13px] text-white">{value}</div>
    </div>
  );
}
