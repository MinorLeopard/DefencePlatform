import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, GitBranch, CircleDot, GitPullRequest, GitCommit, ShieldAlert, Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { getProject, projects } from "@/data/projects";
import { problems } from "@/data/problems";
import { startups } from "@/data/startups";
import { formatCompact } from "@/lib/format";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  return { title: p ? p.name : "Project" };
}

const stageTone: Record<string, any> = {
  Concept: "cyan",
  Prototype: "amber",
  Pilot: "accent",
  Production: "green",
};

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const linkedProblems = project.linkedProblems
    .map((id) => problems.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const startup = project.linkedStartup
    ? startups.find((s) => s.name === project.linkedStartup) ?? null
    : null;

  return (
    <>
      <section className="relative border-b border-line hero-grid">
        <div className="container-page relative z-10 pb-14 pt-10 md:pt-14">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[18px] text-white">{project.name}</span>
            <Badge tone={stageTone[project.stage]} dot>{project.stage}</Badge>
            <Badge tone="neutral">{project.license}</Badge>
            <Badge tone={project.classification === "Open" ? "green" : project.classification === "Restricted" ? "amber" : "cyan"}>
              {project.classification}
            </Badge>
          </div>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-white/75">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-5 text-[12.5px] text-white/60">
            <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5" />{formatCompact(project.stars)} stars</span>
            <span className="inline-flex items-center gap-1.5"><GitBranch className="h-3.5 w-3.5" />{formatCompact(project.forks)} forks</span>
            <span className="inline-flex items-center gap-1.5"><CircleDot className="h-3.5 w-3.5" />{project.openIssues} open issues</span>
            <span className="inline-flex items-center gap-1.5"><GitPullRequest className="h-3.5 w-3.5" />{project.openPRs} open PRs</span>
            <span className="inline-flex items-center gap-1.5"><GitCommit className="h-3.5 w-3.5" />{formatCompact(project.commits)} commits</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-accent"><Download className="h-4 w-4" />Clone / Access</button>
            <Link href="/login" className="btn-ghost">Request member access</Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="mono mb-4 text-accent">Overview</div>
              <p className="text-[15px] leading-relaxed text-white/75">{project.description}</p>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/50">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <div className="mono text-accent">Recent activity</div>
                <span className="text-[11px] text-white/40">Updated {project.lastCommitDaysAgo}d ago</span>
              </div>
              <ul className="divide-y divide-line">
                {project.activity.map((a, i) => (
                  <li key={i} className="flex items-start gap-4 px-5 py-4">
                    <Avatar name={a.actor} size={28} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="font-mono text-white">{a.actor}</span>
                        <Badge tone={a.kind === "commit" ? "accent" : a.kind === "release" ? "green" : a.kind === "issue" ? "amber" : "cyan"}>
                          {a.kind}
                        </Badge>
                        <span className="text-white/40">{a.t}</span>
                      </div>
                      <div className="mt-1 text-[13px] text-white/75">{a.message}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mono mb-4 text-accent">Languages</div>
              <div className="flex h-2 overflow-hidden rounded-full">
                {project.languages.map((l) => (
                  <span key={l.name} title={`${l.name} · ${l.pct}%`} style={{ background: l.color, width: `${l.pct}%` }} />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-white/70">
                {project.languages.map((l) => (
                  <span key={l.name} className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                    {l.name} <span className="text-white/40">{l.pct}%</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="mono mb-4 text-accent">Tags</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-3">Maintainers</div>
              <ul className="space-y-3">
                {project.maintainers.map((m) => (
                  <li key={m.name} className="flex items-center gap-3">
                    <Avatar name={m.name} size={34} />
                    <div>
                      <div className="text-[13px] text-white">{m.name}</div>
                      <div className="text-[11px] text-white/45">{m.role} · {m.org}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {linkedProblems.length > 0 && (
              <div className="rounded-xl border border-line bg-ink-900/60 p-6">
                <div className="mono mb-3">Linked problems</div>
                <ul className="space-y-3">
                  {linkedProblems.map((p) => (
                    <li key={p.id}>
                      <Link href={`/problems/${p.slug}`} className="block rounded-md border border-line bg-ink-850/50 p-3 transition-colors hover:border-line-strong">
                        <div className="mono text-[9.5px]">{p.id}</div>
                        <div className="mt-1 text-[12.5px] text-white line-clamp-2">{p.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {startup && (
              <div className="rounded-xl border border-line bg-ink-900/60 p-6">
                <div className="mono mb-3">Scaled by</div>
                <Link href="/startups" className="block">
                  <div className="font-display text-[15px] text-white">{startup.name}</div>
                  <div className="mt-1 text-[11.5px] text-white/50">{startup.stage} · {startup.location}</div>
                </Link>
              </div>
            )}

            {project.classification !== "Open" && (
              <div className="rounded-xl border border-signal-amber/20 bg-signal-amber/5 p-5">
                <div className="flex items-center gap-2 text-signal-amber">
                  <ShieldAlert className="h-4 w-4" />
                  <span className="mono">Gated repository</span>
                </div>
                <p className="mt-2 text-[12px] text-white/65">
                  This project is {project.classification.toLowerCase()}. Members will be asked for verification and, where required, export-control attestations before access.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
