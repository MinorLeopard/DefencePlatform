import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { MessageSquare, ArrowUp, Eye, Pin, CheckCircle2, Lock, ArrowUpRight } from "lucide-react";
import { threads } from "@/data/community";
import { featuredMembers } from "@/data/members";

export const metadata = {
  title: "Community",
  description: "A serious, strategic community for defence innovation builders in India.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHero
        label="Community · forum"
        title={<>Where the ecosystem thinks out loud.</>}
        intro="A working community for defence-tech builders — research discussions, policy questions, hiring, and honest technical Q&A. Public-visible today, richer conversations for members."
        stats={[
          { label: "Members", value: "10,482" },
          { label: "Threads / month", value: 612 },
          { label: "Verified builders", value: 842 },
          { label: "Service advisors", value: 64 },
        ]}
      />

      <Section
        label="Top threads"
        title={<>Signal, not noise.</>}
        intro="Pinned threads, solved discussions, and member-only rooms where serious conversation happens."
        cta={
          <Link href="/community/private" className="btn-ghost">
            Enter private rooms <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {threads.map((t) => (
              <article
                key={t.id}
                className="group rounded-xl border border-line bg-ink-900/50 p-5 transition-colors hover:border-line-strong hover:bg-ink-850/70"
              >
                <div className="flex items-start gap-4">
                  <Avatar name={t.author} size={36} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="neutral">{t.category}</Badge>
                      {t.pinned && (
                        <Badge tone="accent" dot>
                          <Pin className="h-3 w-3" /> Pinned
                        </Badge>
                      )}
                      {t.solved && (
                        <Badge tone="green" dot>
                          <CheckCircle2 className="h-3 w-3" /> Solved
                        </Badge>
                      )}
                      {t.memberOnly && (
                        <Badge tone="cyan">
                          <Lock className="h-3 w-3" /> Members only
                        </Badge>
                      )}
                      <span className="text-[11px] text-white/40">{t.when}</span>
                    </div>
                    <h3 className="mt-3 font-display text-[16px] font-semibold text-white">{t.title}</h3>
                    <p className="mt-2 line-clamp-2 text-[13px] text-white/60">{t.body}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] text-white/50">
                      <span>{t.author} · {t.authorRole}</span>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1"><ArrowUp className="h-3 w-3" />{t.upvotes}</span>
                        <span className="inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" />{t.replies}</span>
                        <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{t.views}</span>
                      </div>
                    </div>
                    {t.sampleReplies[0] && (
                      <div className="mt-4 rounded-md border border-line bg-ink-850/60 p-3">
                        <div className="flex items-center gap-2 text-[11.5px] text-white/50">
                          <Avatar name={t.sampleReplies[0].author} size={20} />
                          <span>{t.sampleReplies[0].author}</span>
                          <span>·</span>
                          <span>{t.sampleReplies[0].role}</span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-[12.5px] text-white/75">{t.sampleReplies[0].content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="space-y-6">
            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="mono mb-4">Featured members</div>
              <ul className="space-y-4">
                {featuredMembers.slice(0, 6).map((m) => (
                  <li key={m.id} className="flex items-center gap-3">
                    <Avatar name={m.name} size={34} />
                    <div className="flex-1">
                      <div className="text-[13px] text-white">{m.name}</div>
                      <div className="text-[11px] text-white/45">{m.role} · {m.org}</div>
                    </div>
                    <span className="chip">{m.contributions}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="mono mb-4">Community rhythm</div>
              <ul className="space-y-3 text-[12.5px] text-white/70">
                <li>· Weekly research office hours — Tue 18:00 IST</li>
                <li>· Hardware clinic — alt Thu 17:00 IST</li>
                <li>· Policy circle (member-only) — Fri 15:00 IST</li>
                <li>· Founders' table — monthly first Sat</li>
              </ul>
              <Link href="/login" className="btn-accent mt-5 w-full !text-[12.5px]">Join a private room</Link>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="mono mb-4">Code of conduct</div>
              <p className="text-[12.5px] leading-relaxed text-white/60">
                BDN is a serious community. No classified information, no harmful operational content, no flame wars.
                Disagree honestly; cite your work; help newcomers.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
