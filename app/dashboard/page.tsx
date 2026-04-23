import Link from "next/link";
import {
  Sparkles,
  Target,
  Calendar,
  TrendingUp,
  GitBranch,
  ArrowUpRight,
  CircleDot,
  Dot,
  BookOpen,
  Award,
  Beaker,
  Bookmark,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { problems } from "@/data/problems";
import { projects, getProject } from "@/data/projects";
import { events } from "@/data/events";
import { threads } from "@/data/community";
import { grants } from "@/data/grants";
import { labs } from "@/data/labs";
import { currentMember } from "@/data/members";
import { vivekWorkspace } from "@/data/workspace";
import { formatINR } from "@/lib/format";

export default function DashboardPage() {
  const nayan = getProject("project-nayan");
  const myProjects = [
    nayan,
    projects.find((p) => p.slug === "trishul-sdr-mesh"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Suggested: Vivek's linked problems first, then adjacent
  const suggested = [
    problems.find((p) => p.id === "PRB-0413")!,
    problems.find((p) => p.id === "PRB-0408")!,
    problems.find((p) => p.id === "PRB-0409")!,
    problems.find((p) => p.id === "PRB-0412")!,
  ].filter(Boolean);

  const upcoming = events.filter((e) => !e.isPast).slice(0, 3);
  const gncLab = labs.find((l) => l.slug === "guidance-navigation-control")!;

  const bookmarked = threads.filter((t) => t.bookmarked);
  const authored = threads.filter((t) => t.author === currentMember.name);
  const recentDiscussions = [...authored, ...threads.filter((t) => !authored.includes(t))].slice(0, 4);

  return (
    <div className="p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mono text-accent mb-2">
            Good morning, {currentMember.name.split(" ")[0]} · {currentMember.tier}
          </div>
          <h1 className="font-display text-[28px] font-semibold tracking-tight text-white md:text-[34px]">
            Project Nayan v0.4 peer review is trending this week.
          </h1>
          <p className="mt-2 text-[13.5px] text-white/60">
            3 GNC Lab reviewers pinged your architecture memo · 2 open calls match your "looking for" — a sensor-fusion reviewer and a campus 6-DOF slot.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/members/${currentMember.slug}`} className="btn-ghost">View profile</Link>
          <Link href="/assistant" className="btn-accent">
            <Sparkles className="h-4 w-4" />
            Ask the assistant
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPI label="Nayan review progress" value="62%" sub="3 of 5 reviewers" tone="accent" />
        <KPI label="Open action items" value={String(vivekWorkspace.actionItems.length)} sub="2 P0 · 2 P1 · 2 P2" />
        <KPI label="Forum answers (YTD)" value="42" sub="+6 this month" tone="green" />
        <KPI label="GNC Lab studies" value="2" sub="1 peer review · 1 active" tone="cyan" />
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-accent/25 bg-accent/5 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-accent" />
          <div>
            <div className="text-[13px] text-white">Your Bharat Incubate Cohort B application is 68% complete</div>
            <div className="text-[11.5px] text-white/55">University Spinout track · applications close Jul 15</div>
          </div>
        </div>
        <Link href="/startups/incubation/apply?track=university-spinout" className="btn-accent !py-1.5 !px-3 !text-[11.5px]">
          Resume draft
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-xl border border-line bg-ink-900/50">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              <div className="font-display text-[15px] text-white">Problems matched to your stack</div>
            </div>
            <Link href="/problems" className="text-[11.5px] text-white/55 hover:text-white">See all →</Link>
          </div>
          <ul className="divide-y divide-line">
            {suggested.map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-6 p-5 transition-colors hover:bg-ink-850/50">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="mono text-[9.5px]">{p.id}</span>
                    <Badge tone="accent">{p.difficulty}</Badge>
                    <Badge tone="neutral">{p.domain}</Badge>
                  </div>
                  <Link href={`/problems/${p.slug}`} className="mt-2 block font-display text-[15px] text-white hover:text-accent">
                    {p.title}
                  </Link>
                  <p className="mt-1.5 line-clamp-2 text-[12.5px] text-white/55">{p.summary}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="mono text-[10px]">Bounty</div>
                  <div className="font-display text-[16px] text-white">{formatINR(p.bounty)}</div>
                  <button className="btn-ghost mt-3 !py-1.5 !px-3 !text-[11px]">Apply</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">AI suggestions</div>
          </div>
          <ul className="space-y-3">
            {[
              { title: "Draft peer-review note for Nayan v0.4", note: "Based on the 3 open reviewer comments." },
              { title: "Shortlist materials for thermal envelope", note: "Thread TH-423 signal · 2 supplier leads flagged." },
              { title: "Prep for GNC Lab open call", note: "Campus 6-DOF slot · IIT Kanpur AE best fit." },
              { title: "Find sensor-fusion reviewer (ESKF/UKF)", note: "3 network matches · top: Dr. K. Iyer (RCI)." },
            ].map((s) => (
              <li key={s.title} className="rounded-md border border-line bg-ink-850/40 p-3 hover:border-line-strong cursor-pointer">
                <div className="flex items-start gap-3">
                  <Dot className="h-5 w-5 -mt-1 text-accent" />
                  <div>
                    <div className="text-[13px] text-white">{s.title}</div>
                    <div className="mt-0.5 text-[11px] text-white/50">{s.note}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/assistant" className="mt-4 flex items-center justify-between rounded-md border border-accent/30 bg-accent/10 px-3 py-2.5 text-[12.5px] text-accent">
            Open AI workspace <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-xl border border-line bg-ink-900/50">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-accent" />
              <div className="font-display text-[15px] text-white">Your projects</div>
            </div>
            <Link href="/projects" className="text-[11.5px] text-white/55 hover:text-white">See all →</Link>
          </div>
          <ul className="divide-y divide-line">
            {myProjects.map((p) => (
              <li key={p.id} className="p-5">
                <div className="flex items-center justify-between">
                  <Link href={`/projects/${p.slug}`} className="flex items-center gap-2 hover:text-accent">
                    <span className="font-mono text-[13px] text-white">{p.name}</span>
                    <Badge tone="accent">{p.stage}</Badge>
                  </Link>
                  <span className="text-[11px] text-white/45">Updated {p.lastCommitDaysAgo}d ago</span>
                </div>
                <p className="mt-2 text-[12.5px] text-white/60">{p.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-[11.5px] text-white/55">
                  <span className="inline-flex items-center gap-1"><CircleDot className="h-3 w-3" />{p.openIssues} issues</span>
                  <span className="inline-flex items-center gap-1"><TrendingUp className="h-3 w-3" />+{Math.round(p.commits * 0.018)} commits this week</span>
                  <span>{p.contributors} contributors</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">Upcoming on calendar</div>
          </div>
          <ul className="space-y-4">
            {upcoming.map((e) => (
              <li key={e.id} className="flex items-start gap-3 rounded-md border border-line bg-ink-850/40 p-3">
                <div className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent">
                  <span className="mono text-[9px]">{new Date(e.startDate).toLocaleString("en-US", { month: "short" }).toUpperCase()}</span>
                  <span className="font-display text-[13px] font-semibold leading-none">{new Date(e.startDate).getDate()}</span>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[13px] text-white">{e.name}</div>
                  <div className="mt-0.5 truncate text-[11px] text-white/50">{e.location} · {e.venue}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Beaker className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">Your lab</div>
          </div>
          <Link href={`/labs/${gncLab.slug}`} className="block rounded-md border border-line bg-ink-850/50 p-4 transition-colors hover:border-line-strong">
            <div className="flex items-center justify-between">
              <div className="font-display text-[14px] text-white">{gncLab.name}</div>
              <Badge tone="accent">Core Member</Badge>
            </div>
            <div className="mt-1.5 text-[11.5px] text-white/50">{gncLab.locations[0]}</div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[10.5px]">
              <div><div className="mono">Studies</div><div className="text-white">{gncLab.metrics.activeStudies}</div></div>
              <div><div className="mono">Pubs YTD</div><div className="text-white">{gncLab.metrics.publicationsYTD}</div></div>
              <div><div className="mono">Calls</div><div className="text-white">{gncLab.openCalls.length}</div></div>
            </div>
          </Link>
          <div className="mt-4 mono text-accent text-[10px]">Open calls · act this week</div>
          <ul className="mt-2 space-y-1.5 text-[12px] text-white/70">
            {gncLab.openCalls.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">Bookmarked · my activity</div>
          </div>
          <ul className="space-y-3">
            {[...bookmarked, ...authored].slice(0, 4).map((t) => (
              <li key={t.id} className="rounded-md border border-line bg-ink-850/40 p-3">
                <div className="flex items-center gap-2">
                  {t.bookmarked ? <Badge tone="accent">Bookmarked</Badge> : <Badge tone="cyan">Authored</Badge>}
                  <span className="text-[10.5px] text-white/40">{t.when}</span>
                </div>
                <div className="mt-2 line-clamp-2 text-[12.5px] text-white">{t.title}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">Grants you're eligible for</div>
          </div>
          <ul className="space-y-3">
            {grants.slice(0, 3).map((g) => (
              <li key={g.id} className="rounded-md border border-line bg-ink-850/40 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[13px] text-white line-clamp-1">{g.name}</div>
                  <Badge tone="accent">{g.kind}</Badge>
                </div>
                <div className="mt-1 text-[11.5px] text-white/50">{g.ticket}</div>
              </li>
            ))}
          </ul>
          <Link href="/startups#grants" className="mt-4 inline-flex items-center gap-1 text-[11.5px] text-accent">
            Explore capital stack <ArrowUpRight className="h-3 w-3" />
          </Link>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-xl border border-line bg-ink-900/50">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <div className="font-display text-[15px] text-white">Notifications</div>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[9.5px] uppercase text-accent">
                {vivekWorkspace.notifications.filter((n) => n.unread).length} new
              </span>
            </div>
            <Link href="/dashboard/workspace" className="text-[11.5px] text-white/55 hover:text-white">Open workspace →</Link>
          </div>
          <ul className="divide-y divide-line">
            {vivekWorkspace.notifications.slice(0, 5).map((n) => (
              <li key={n.id}>
                <Link href={n.href} className="flex items-start gap-3 p-4 transition-colors hover:bg-ink-850/50">
                  <Avatar name={n.actor} size={26} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className={n.unread ? "text-white" : "text-white/55"}>{n.actor}</span>
                      <span className="text-white/35">· {n.when}</span>
                      {n.unread && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
                    </div>
                    <div className={`mt-1 text-[12.5px] line-clamp-2 ${n.unread ? "text-white" : "text-white/55"}`}>
                      {n.message}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">Top action items</div>
          </div>
          <ul className="space-y-3">
            {vivekWorkspace.actionItems.slice(0, 4).map((a) => (
              <li key={a.id} className="rounded-md border border-line bg-ink-850/40 p-3">
                <div className="flex items-center gap-2">
                  <Badge tone={a.priority === "P0" ? "accent" : a.priority === "P1" ? "amber" : "neutral"} dot>
                    {a.priority}
                  </Badge>
                  <span className="mono text-[9.5px]">{a.due}</span>
                </div>
                <div className="mt-2 text-[12.5px] text-white line-clamp-2">{a.title}</div>
              </li>
            ))}
          </ul>
          <Link href="/dashboard/workspace" className="mt-4 inline-flex items-center gap-1 text-[11.5px] text-accent">
            Open workspace <ArrowUpRight className="h-3 w-3" />
          </Link>
        </section>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-ink-900/50 p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-accent" />
          <div className="font-display text-[15px] text-white">Discussions for you</div>
        </div>
        <ul className="divide-y divide-line">
          {recentDiscussions.map((t) => (
            <li key={t.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Avatar name={t.author} size={28} />
                <div>
                  <div className="text-[13px] text-white line-clamp-1">{t.title}</div>
                  <div className="mt-0.5 text-[11px] text-white/45">
                    {t.author === currentMember.name ? "Your thread · " : ""}{t.category} · {t.when}
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-white/45">{t.replies} replies</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function KPI({ label, value, sub, tone = "neutral" }: { label: string; value: string; sub: string; tone?: "neutral" | "accent" | "green" | "cyan" }) {
  const toneMap = {
    neutral: "text-white",
    accent: "text-accent",
    green: "text-signal-green",
    cyan: "text-signal-cyan",
  };
  return (
    <div className="rounded-xl border border-line bg-ink-900/50 p-5">
      <div className="mono text-[10px]">{label}</div>
      <div className={`mt-2 font-display text-[26px] font-semibold ${toneMap[tone]}`}>{value}</div>
      <div className="mt-1 text-[11px] text-white/45">{sub}</div>
    </div>
  );
}
