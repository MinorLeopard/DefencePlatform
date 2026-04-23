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
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { problems } from "@/data/problems";
import { projects } from "@/data/projects";
import { events } from "@/data/events";
import { threads } from "@/data/community";
import { grants } from "@/data/grants";
import { formatINR } from "@/lib/format";

export default function DashboardPage() {
  const suggested = problems.slice(0, 4);
  const myProjects = projects.slice(0, 3);
  const upcoming = events.filter((e) => !e.isPast).slice(0, 3);

  return (
    <div className="p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mono text-accent mb-2">Good morning, Aarav</div>
          <h1 className="font-display text-[28px] font-semibold tracking-tight text-white md:text-[34px]">
            Three problems match your team this week.
          </h1>
          <p className="mt-2 text-[13.5px] text-white/60">
            Workspace activity is up 18% · garuda-swarm-stack v0.9.2 released · 2 reviewers pinged you.
          </p>
        </div>
        <Link href="/assistant" className="btn-accent self-start">
          <Sparkles className="h-4 w-4" />
          Ask the AI assistant
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPI label="Open applications" value="4" sub="2 awaiting review" tone="accent" />
        <KPI label="Active projects" value="3" sub="1 pilot-stage" />
        <KPI label="Workspace activity" value="+18%" sub="vs. last week" tone="green" />
        <KPI label="Patents in pipeline" value="2" sub="1 PCT filed" tone="cyan" />
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
              { title: "Draft evaluation plan for PRB-0412", note: "Based on your team's C-UAS stack." },
              { title: "Apply to BDN Deep-tech Launch Grant", note: "Your prototype + sponsor match qualify you." },
              { title: "Brief before HAL interlocutor call", note: "One-pager on Skyops + 3 talking points." },
              { title: "Find a maritime sonar collaborator", note: "DeepReef Labs + 2 IIT teams flagged." },
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
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[13px] text-white">{p.name}</span>
                    <Badge tone="accent">{p.stage}</Badge>
                  </div>
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

        <section className="lg:col-span-2 rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">Discussions for you</div>
          </div>
          <ul className="divide-y divide-line">
            {threads.slice(0, 4).map((t) => (
              <li key={t.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={t.author} size={28} />
                  <div>
                    <div className="text-[13px] text-white line-clamp-1">{t.title}</div>
                    <div className="mt-0.5 text-[11px] text-white/45">{t.category} · {t.when}</div>
                  </div>
                </div>
                <div className="text-[11px] text-white/45">{t.replies} replies</div>
              </li>
            ))}
          </ul>
        </section>
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
