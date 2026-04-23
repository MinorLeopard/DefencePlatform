import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ArrowUpRight, FlaskConical, ScanEye, Target, Boxes, Cpu, UsersRound, Beaker } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { getLab, labs } from "@/data/labs";
import { problems } from "@/data/problems";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return labs.map((l) => ({ slug: l.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const l = getLab(params.slug);
  return { title: l ? l.name : "Lab" };
}

const categoryIcon: Record<string, any> = {
  "Autonomous Systems": FlaskConical,
  "Computer Vision & Sensing": ScanEye,
  "Guidance, Navigation & Control": Target,
  "Defence Simulation": Boxes,
  "Embedded AI Systems": Cpu,
  "Human Performance & Training": UsersRound,
};

const statusTone: Record<string, any> = {
  Active: "green",
  "Peer review": "cyan",
  Completed: "neutral",
  Recruiting: "accent",
};

export default function LabDetail({ params }: { params: { slug: string } }) {
  const lab = getLab(params.slug);
  if (!lab) notFound();
  const Icon = categoryIcon[lab.category] ?? Beaker;

  const linkedProblems = lab.linkedProblems
    .map((id) => problems.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const linkedProjects = lab.linkedProjects
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <section className="relative border-b border-line hero-grid">
        <div className="container-page relative z-10 pb-14 pt-10 md:pt-14">
          <Link href="/labs" className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to labs
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-ink-850 text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="mono text-[10px]">{lab.id}</span>
                <Badge tone="accent" dot>{lab.category}</Badge>
              </div>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white md:text-[40px] md:leading-[1.08]">
                {lab.name}
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-[15.5px] leading-relaxed text-white/65">{lab.mission}</p>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-[12.5px] text-white/60">
            {lab.locations.map((l) => (
              <span key={l} className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-accent" />{l}</span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 max-w-2xl md:grid-cols-4">
            <Stat label="Researchers" value={lab.metrics.contributors} />
            <Stat label="Active studies" value={lab.metrics.activeStudies} />
            <Stat label="Publications YTD" value={lab.metrics.publicationsYTD} />
            <Stat label="Grants linked" value={lab.metrics.grantsLinked} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="mono mb-4 text-accent">Research tracks</div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {lab.tracks.map((t) => (
                  <div key={t.title} className="rounded-lg border border-line bg-ink-900/50 p-5">
                    <div className="font-display text-[14.5px] text-white">{t.title}</div>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">{t.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mono mb-4 text-accent">Tools · simulations · datasets</div>
              <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-ink-900/50">
                {lab.tools.map((t) => (
                  <li key={t.name} className="flex items-start justify-between gap-6 p-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[13px] text-white">{t.name}</span>
                        <Badge tone="neutral">{t.kind}</Badge>
                      </div>
                      <div className="mt-2 text-[12.5px] text-white/60">{t.description}</div>
                    </div>
                    <button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Request</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mono mb-4 text-accent">Active & recent experiments</div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {lab.experiments.map((x) => (
                  <div key={x.title} className="rounded-lg border border-line bg-ink-900/50 p-5">
                    <div className="flex items-center justify-between">
                      <span className="mono text-[10px]">{x.lead}</span>
                      <Badge tone={statusTone[x.status]} dot>{x.status}</Badge>
                    </div>
                    <div className="mt-2 font-display text-[14px] text-white">{x.title}</div>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">{x.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mono mb-4 text-accent">Collaboration model</div>
              <p className="text-[14px] leading-relaxed text-white/75">{lab.collaborationModel}</p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-3">Lab leads</div>
              <ul className="space-y-4">
                {lab.leads.map((l) => (
                  <li key={l.name} className="flex items-center gap-3">
                    <Avatar name={l.name} size={36} />
                    <div className="min-w-0">
                      <div className="truncate text-[13px] text-white">{l.name}</div>
                      <div className="truncate text-[11px] text-white/45">{l.role} · {l.org}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {lab.openCalls.length > 0 && (
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
                <div className="mono mb-3 text-accent">Open calls</div>
                <ul className="space-y-2 text-[12.5px] text-white/80">
                  {lab.openCalls.map((c) => (
                    <li key={c}>· {c}</li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-accent mt-4 w-full !text-[12px] !py-2">
                  Apply for a slot <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-3">Partners</div>
              <ul className="space-y-1.5 text-[12.5px] text-white/70">
                {lab.partners.map((p) => (
                  <li key={p}>· {p}</li>
                ))}
              </ul>
            </div>

            {linkedProjects.length > 0 && (
              <div className="rounded-xl border border-line bg-ink-900/60 p-6">
                <div className="mono mb-3">Linked projects</div>
                <ul className="space-y-2.5">
                  {linkedProjects.map((p) => (
                    <li key={p.id}>
                      <Link href={`/projects/${p.slug}`} className="block rounded-md border border-line bg-ink-850/50 p-3 hover:border-line-strong">
                        <div className="font-mono text-[12.5px] text-white">{p.name}</div>
                        <div className="mt-0.5 line-clamp-1 text-[11px] text-white/50">{p.tagline}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {linkedProblems.length > 0 && (
              <div className="rounded-xl border border-line bg-ink-900/60 p-6">
                <div className="mono mb-3">Linked problems</div>
                <ul className="space-y-2.5">
                  {linkedProblems.map((p) => (
                    <li key={p.id}>
                      <Link href={`/problems/${p.slug}`} className="block rounded-md border border-line bg-ink-850/50 p-3 hover:border-line-strong">
                        <div className="mono text-[9.5px]">{p.id}</div>
                        <div className="mt-1 line-clamp-2 text-[12px] text-white">{p.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-l border-line pl-4">
      <div className="font-display text-[22px] font-semibold text-white">{value}</div>
      <div className="mono mt-1 text-[9.5px]">{label}</div>
    </div>
  );
}
