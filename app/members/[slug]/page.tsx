import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ShieldCheck, Flag, ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { getMemberProfile, memberProfiles, featuredMembers } from "@/data/members";
import { projects as allProjects } from "@/data/projects";
import { threads } from "@/data/community";

export function generateStaticParams() {
  return Object.keys(memberProfiles).map((slug) => ({ slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const m = getMemberProfile(params.slug);
  return { title: m ? `${m.name}` : "Member" };
}

export default function MemberProfilePage({ params }: { params: { slug: string } }) {
  const member = getMemberProfile(params.slug);
  if (!member) notFound();

  const ownedProjects = allProjects.filter((p) =>
    p.maintainers.some((m) => m.name === member.name),
  );
  const authored = threads.filter((t) => t.author === member.name);
  const replied = threads.filter((t) =>
    t.sampleReplies.some((r) => r.author === member.name) && t.author !== member.name,
  );

  return (
    <>
      <section className="relative border-b border-line hero-grid">
        <div className="container-page relative z-10 pb-14 pt-10 md:pt-14">
          <Link href="/community" className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to community
          </Link>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar name={member.name} size={96} />
                <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-signal-green ring-2 ring-ink-950">
                  <ShieldCheck className="h-2.5 w-2.5 text-ink-950" />
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="accent" dot>{member.tier ?? "Member"}</Badge>
                  <span className="mono text-white/40">{member.id}</span>
                </div>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white md:text-[40px] md:leading-[1.08]">
                  {member.name}
                </h1>
                <div className="mt-1 text-[14px] text-white/70">{member.role}</div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white/50">
                  <span className="inline-flex items-center gap-1.5"><Flag className="h-3 w-3 text-accent" />{member.org}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3 text-accent" />{member.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn-ghost"><Mail className="h-4 w-4" />Send DM</button>
              <button className="btn-accent"><MessageSquare className="h-4 w-4" />Propose collaboration</button>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-white/65">{member.headline}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {member.badges.map((b) => (
              <Badge key={b} tone="neutral">{b}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="mono mb-4 text-accent">About</div>
              <p className="text-[14.5px] leading-relaxed text-white/75">{member.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {member.focusAreas.map((f) => (
                  <span key={f} className="chip">{f}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="mono mb-4 text-accent">Currently working on</div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {member.workingOn.map((w) => (
                  <Link key={w.id} href={w.href} className="rounded-lg border border-line bg-ink-900/50 p-5 transition-colors hover:border-line-strong hover:bg-ink-850/70">
                    <div className="flex items-center justify-between">
                      <Badge tone="accent">{w.kind}</Badge>
                      <span className="mono text-[9.5px]">{w.id}</span>
                    </div>
                    <div className="mt-3 font-display text-[14px] text-white">{w.title}</div>
                    <div className="mt-3 inline-flex items-center gap-1 text-[11.5px] text-accent">
                      Open <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {ownedProjects.length > 0 && (
              <div>
                <div className="mono mb-4 text-accent">Projects · maintainer & contributor</div>
                <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-ink-900/50">
                  {ownedProjects.map((p) => (
                    <li key={p.id} className="flex items-start justify-between gap-6 p-5">
                      <div className="min-w-0">
                        <Link href={`/projects/${p.slug}`} className="font-mono text-[13px] text-white hover:text-accent">
                          {p.name}
                        </Link>
                        <div className="mt-1.5 line-clamp-1 text-[12px] text-white/60">{p.tagline}</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {p.tags.slice(0, 3).map((t) => (
                            <span key={t} className="chip">{t}</span>
                          ))}
                        </div>
                      </div>
                      <Badge tone="neutral">{p.stage}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(authored.length > 0 || replied.length > 0) && (
              <div>
                <div className="mono mb-4 text-accent">Forum activity</div>
                <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-ink-900/50">
                  {authored.map((t) => (
                    <li key={t.id} className="flex items-start justify-between gap-4 p-5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone="accent">Authored</Badge>
                          <Badge tone="neutral">{t.category}</Badge>
                          <span className="text-[11px] text-white/40">{t.when}</span>
                        </div>
                        <div className="mt-2 text-[13.5px] text-white">{t.title}</div>
                      </div>
                      <div className="text-right text-[11px] text-white/45">
                        <div>{t.replies} replies</div>
                        <div>{t.upvotes} ↑</div>
                      </div>
                    </li>
                  ))}
                  {replied.map((t) => (
                    <li key={t.id} className="flex items-start justify-between gap-4 p-5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone="cyan">Replied</Badge>
                          <Badge tone="neutral">{t.category}</Badge>
                          <span className="text-[11px] text-white/40">{t.when}</span>
                        </div>
                        <div className="mt-2 text-[13.5px] text-white">{t.title}</div>
                      </div>
                      <div className="text-right text-[11px] text-white/45">
                        <div>{t.replies} replies</div>
                        <div>{t.upvotes} ↑</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <div className="mono mb-4 text-accent">Milestones</div>
              <ol className="relative border-l border-line pl-6 space-y-5">
                {member.milestones.map((m, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[30px] top-1.5 h-2 w-2 rounded-full bg-accent" />
                    <div className="mono text-accent text-[10px]">{m.when}</div>
                    <div className="mt-1 font-display text-[14px] text-white">{m.title}</div>
                    <div className="mt-0.5 text-[12px] text-white/55">{m.detail}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-4">Contribution stats</div>
              <ul className="space-y-3 text-[13px]">
                {[
                  { label: "Projects contributed", value: member.stats.projectsContributed },
                  { label: "Challenge responses", value: member.stats.challengeResponses },
                  { label: "Forum answers", value: member.stats.forumAnswers },
                  { label: "Collaborations", value: member.stats.collaborations },
                  { label: "Summits attended", value: member.stats.summitsAttended },
                ].map((s) => (
                  <li key={s.label} className="flex items-center justify-between">
                    <span className="text-white/60">{s.label}</span>
                    <span className="font-display text-[15px] text-white">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-3">Affiliations</div>
              <ul className="space-y-2 text-[12.5px] text-white/70">
                {member.affiliations.map((a) => (
                  <li key={a}>· {a}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-3">Looking for</div>
              <ul className="space-y-2 text-[12.5px] text-white/70">
                {member.looking.map((l) => (
                  <li key={l}>· {l}</li>
                ))}
              </ul>
              <button className="btn-accent mt-4 w-full !text-[12px] !py-2">Propose collaboration <ArrowUpRight className="h-3 w-3" /></button>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-3">Contact</div>
              <ul className="space-y-1.5 text-[12.5px] text-white/70">
                {member.contact.map((c) => (
                  <li key={c.label}>
                    <span className="text-white/40">{c.label}: </span>{c.value}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
