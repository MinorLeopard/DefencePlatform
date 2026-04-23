import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Target,
  GitCommit,
  Sparkles,
  Beaker,
  Calendar,
  MessageSquare,
  ChevronRight,
  Pin,
  FileCheck,
  Handshake,
  GitPullRequest,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { currentMember } from "@/data/members";
import { vivekWorkspace, priorityTone, type WorkspaceNotification } from "@/data/workspace";

export const metadata = {
  title: "My workspace",
};

const statusTone: Record<string, "accent" | "green" | "amber" | "cyan" | "neutral"> = {
  Drafting: "amber",
  Submitted: "cyan",
  Screening: "cyan",
  Shortlisted: "accent",
  Accepted: "green",
  Active: "green",
  "Peer review": "cyan",
  Recruiting: "accent",
  Proposed: "amber",
  Waiting: "neutral",
  Complete: "green",
};

const activityIcon: Record<string, any> = {
  review: FileCheck,
  commit: GitCommit,
  reply: MessageSquare,
  mention: Sparkles,
  authored: MessageSquare,
  release: GitPullRequest,
  system: CheckCircle2,
  bookmark: Pin,
};

export default function WorkspacePage() {
  const ws = vivekWorkspace;
  const openActionItems = ws.actionItems;
  const pinnedNotifications = ws.notifications.filter((n) => n.pinned);
  const readFlag = (unread?: boolean) => (unread ? "text-white" : "text-white/55");

  return (
    <div className="p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mono text-accent mb-2">My workspace · {currentMember.tier}</div>
          <h1 className="font-display text-[28px] font-semibold tracking-tight text-white md:text-[34px]">
            {currentMember.name.split(" ")[0]}'s operating environment
          </h1>
          <p className="mt-2 max-w-2xl text-[13.5px] text-white/60">
            One command center for Project Nayan, the GNC Lab, your active collaborations, and everything
            you've applied to on BDN. This is what you've committed to shipping this quarter.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/members/${currentMember.slug}`} className="btn-ghost">View public profile</Link>
          <Link href="/assistant" className="btn-accent">
            <Sparkles className="h-4 w-4" />
            Ask the assistant
          </Link>
        </div>
      </div>

      {/* Focus banner */}
      <div className="rounded-xl border border-accent/25 bg-accent/5 p-5">
        <div className="flex items-center gap-2 text-accent">
          <Target className="h-4 w-4" />
          <span className="mono">This quarter · focus</span>
        </div>
        <ul className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
          {ws.focus.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-white/85">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Open action items */}
        <section className="lg:col-span-2 rounded-xl border border-line bg-ink-900/50">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <div className="font-display text-[15px] text-white">Open action items</div>
            </div>
            <span className="text-[11.5px] text-white/50">{openActionItems.length} open · 2 P0 · 2 P1 · 2 P2</span>
          </div>
          <ul className="divide-y divide-line">
            {openActionItems.map((a) => (
              <li key={a.id} className="flex items-start gap-4 p-5 transition-colors hover:bg-ink-850/50">
                <Circle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/30" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={priorityTone[a.priority]} dot>{a.priority}</Badge>
                    <span className="mono text-[9.5px]">{a.kind.toUpperCase()}</span>
                    <span className="text-[11px] text-white/40">{a.due}</span>
                  </div>
                  <div className="mt-1.5 text-[13.5px] text-white">{a.title}</div>
                  <div className="mt-1 text-[12px] text-white/55">{a.context}</div>
                  {a.linkedTo && (
                    <Link
                      href={a.linkedTo.href}
                      className="mt-2 inline-flex items-center gap-1 text-[11.5px] text-accent"
                    >
                      {a.linkedTo.label} <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                <button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Complete</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Notifications */}
        <section className="rounded-xl border border-line bg-ink-900/50">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <div className="font-display text-[15px] text-white">Notifications</div>
            </div>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[9.5px] uppercase text-accent">
              {ws.notifications.filter((n) => n.unread).length} new
            </span>
          </div>
          <ul className="divide-y divide-line">
            {pinnedNotifications.map((n) => (
              <NotifItem key={n.id} n={n} readFlag={readFlag} />
            ))}
            {ws.notifications.filter((n) => !n.pinned).slice(0, 6).map((n) => (
              <NotifItem key={n.id} n={n} readFlag={readFlag} />
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Peer review notes */}
        <section className="lg:col-span-2 rounded-xl border border-line bg-ink-900/50">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-accent" />
              <div className="font-display text-[15px] text-white">Peer review · Nayan v0.4</div>
            </div>
            <span className="text-[11.5px] text-white/50">
              {ws.peerReviewNotes.filter((n) => n.state === "open").length} open · {ws.peerReviewNotes.filter((n) => n.state === "addressed").length} addressed
            </span>
          </div>
          <ul className="divide-y divide-line">
            {ws.peerReviewNotes.map((p) => (
              <li key={p.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={p.reviewer} size={32} />
                    <div>
                      <div className="text-[13px] text-white">{p.reviewer}</div>
                      <div className="text-[11px] text-white/45">{p.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-white/45">
                    <Badge tone={p.state === "open" ? "amber" : "green"}>{p.state}</Badge>
                    <span>{p.when}</span>
                  </div>
                </div>
                <div className="mt-3 rounded-md border border-line bg-ink-850/50 p-3 text-[12.5px] text-white/75">
                  <div className="mono mb-1.5 text-[9.5px]">{p.section}</div>
                  {p.summary}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Lab studies */}
        <section className="rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Beaker className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">Lab studies in flight</div>
          </div>
          <ul className="space-y-4">
            {ws.labStudies.map((s) => (
              <li key={s.id} className="rounded-md border border-line bg-ink-850/40 p-4">
                <div className="flex items-center justify-between">
                  <Link href={s.labHref} className="text-[12.5px] text-white hover:text-accent line-clamp-1">
                    {s.title}
                  </Link>
                  <Badge tone={statusTone[s.state]}>{s.state}</Badge>
                </div>
                <div className="mt-1 text-[10.5px] text-white/45">{s.lab}</div>
                <div className="mt-3 h-1 w-full rounded-full bg-ink-700 overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${s.progress}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10.5px] text-white/50">
                  <span>{s.progress}% complete</span>
                  <span>{s.nextCheckpoint}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Collaborations */}
        <section className="lg:col-span-2 rounded-xl border border-line bg-ink-900/50">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div className="flex items-center gap-2">
              <Handshake className="h-4 w-4 text-accent" />
              <div className="font-display text-[15px] text-white">Active collaborations</div>
            </div>
            <Link href="/community/private" className="text-[11.5px] text-white/55 hover:text-white">Open private rooms →</Link>
          </div>
          <ul className="divide-y divide-line">
            {ws.collaborations.map((c) => (
              <li key={c.id} className="flex items-center gap-4 p-4">
                <Avatar name={c.with} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-white truncate">{c.with}</span>
                    <span className="text-[11px] text-white/45 truncate">· {c.org}</span>
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-white/55 truncate">{c.intent}</div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-3">
                  <Badge tone={statusTone[c.status] ?? "neutral"}>{c.status}</Badge>
                  <span className="hidden md:inline text-[11px] text-white/40">{c.last}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Applications in progress */}
        <section className="rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileCheck className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">What you've applied to</div>
          </div>
          <ul className="space-y-4">
            {ws.applications.map((a) => (
              <li key={a.id} className="rounded-md border border-line bg-ink-850/40 p-4">
                <div className="flex items-center justify-between">
                  <Badge tone="neutral">{a.kind}</Badge>
                  <Badge tone={statusTone[a.status] ?? "neutral"}>{a.status}</Badge>
                </div>
                <Link
                  href={a.href ?? "#"}
                  className="mt-2 block text-[12.5px] text-white hover:text-accent line-clamp-2"
                >
                  {a.name}
                </Link>
                <div className="mt-3 h-1 w-full rounded-full bg-ink-700 overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${a.progress}%` }} />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-white/45">
                  <span>{a.progress}%</span>
                  <span>Updated {a.updated}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Activity feed */}
        <section className="lg:col-span-2 rounded-xl border border-line bg-ink-900/50">
          <div className="flex items-center justify-between border-b border-line p-5">
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-accent" />
              <div className="font-display text-[15px] text-white">Recent activity</div>
            </div>
          </div>
          <ol className="relative p-5 pl-10 space-y-4 border-l border-line ml-5">
            {ws.activityFeed.map((a, i) => {
              const Icon = activityIcon[a.kind] ?? GitCommit;
              return (
                <li key={i} className="relative">
                  <span className="absolute -left-[30px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-ink-900 text-accent">
                    <Icon className="h-2.5 w-2.5" />
                  </span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="mono text-[9.5px]">{a.kind.toUpperCase()}</span>
                    <span className="font-mono text-white/70">{a.who}</span>
                    <span className="text-white/35">{a.when}</span>
                  </div>
                  <div className="mt-1 text-[13px] text-white/80">{a.message}</div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Upcoming */}
        <section className="rounded-xl border border-line bg-ink-900/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-accent" />
            <div className="font-display text-[15px] text-white">Your next windows</div>
          </div>
          <ul className="space-y-3">
            {ws.upcoming.map((u, i) => (
              <li key={i} className="rounded-md border border-line bg-ink-850/40 p-3">
                <div className="flex items-center gap-2">
                  <Badge tone="accent">{u.kind}</Badge>
                  <span className="mono text-[10px]">{u.when}</span>
                </div>
                <div className="mt-2 text-[12.5px] text-white">{u.title}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function NotifItem({
  n,
  readFlag,
}: {
  n: WorkspaceNotification;
  readFlag: (u?: boolean) => string;
}) {
  return (
    <li className="relative p-4 transition-colors hover:bg-ink-850/50">
      <Link href={n.href} className="flex items-start gap-3">
        <Avatar name={n.actor} size={28} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px]">
            {n.pinned && <Pin className="h-3 w-3 text-accent" />}
            <span className={`truncate ${readFlag(n.unread)}`}>{n.actor}</span>
            <span className="text-white/35">· {n.when}</span>
            {n.unread && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
          </div>
          <div className={`mt-1 text-[12px] line-clamp-2 ${readFlag(n.unread)}`}>{n.message}</div>
        </div>
      </Link>
    </li>
  );
}
