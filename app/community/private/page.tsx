import Link from "next/link";
import { Lock, MessageSquare, Users, Shield, Hash, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/ui/Section";
import { Avatar } from "@/components/ui/Avatar";
import { featuredMembers } from "@/data/members";

const rooms = [
  { name: "#founders-council", purpose: "Closed room for onboarded BDN startup founders.", members: 87, activity: "14 messages today", tone: "accent" },
  { name: "#signals-wg", purpose: "Working group for comms, EW, and cryptography builders.", members: 42, activity: "Discussion on Kyber-768 handshake", tone: "cyan" },
  { name: "#policy-circle", purpose: "Defence policy, export-control, IP, and ethics conversations.", members: 64, activity: "Brief from export-control desk", tone: "amber" },
  { name: "#investor-room", purpose: "BDN investor council — syndicate forming room.", members: 29, activity: "Pitch Day follow-ups", tone: "green" },
  { name: "#maritime-builders", purpose: "AUV, USV, sonar, and submarine systems builders.", members: 38, activity: "Field-trial window planning", tone: "cyan" },
  { name: "#space-geoint", purpose: "SmallSat, SAR, geospatial intel, and space services.", members: 34, activity: "Revised constellation plan", tone: "accent" },
  { name: "#hardware-clinic", purpose: "Alt-Thursdays live hardware review with senior engineers.", members: 112, activity: "Next session · Thu 17:00 IST", tone: "neutral" },
  { name: "#capability-bharat", purpose: "Capability Bharat 2026 prep room for cohort teams.", members: 68, activity: "24 teams shortlisted", tone: "accent" },
];

const dms = [
  { name: "Arunima Sen", role: "MP, Cornerstone", last: "Can we prep for Pitch Day together?", when: "4m", unread: 2 },
  { name: "Lt. Col. A. Ranade (retd.)", role: "Army Design Bureau advisor", last: "Sent you the evaluation gate doc.", when: "1h", unread: 0 },
  { name: "Meghna Rao", role: "Sarvatra Systems", last: "Collab on the SAR + swarm ISR demo?", when: "3h", unread: 1 },
  { name: "Dr. Anjali Kapoor", role: "DG, BDN", last: "Your grant memo is approved — pending desk review.", when: "yesterday", unread: 0 },
];

export const metadata = {
  title: "Private rooms",
  description: "Members-only community rooms on Bharat Defence Network.",
};

const toneMap: Record<string, string> = {
  accent: "border-accent/30 bg-accent/10 text-accent",
  cyan: "border-signal-cyan/30 bg-signal-cyan/10 text-signal-cyan",
  amber: "border-signal-amber/30 bg-signal-amber/10 text-signal-amber",
  green: "border-signal-green/30 bg-signal-green/10 text-signal-green",
  neutral: "border-line bg-white/[0.04] text-white/80",
};

export default function PrivateCommunityPage() {
  return (
    <>
      <PageHero
        label="Private community · member-only"
        title={<>Rooms where real conversations happen.</>}
        intro="Closed-door working groups, founder-to-founder DMs, and advisor channels. Identity-verified, signed-NDA rooms for restricted topics. Public previews appear on the community page."
        stats={[
          { label: "Active rooms", value: 24 },
          { label: "Verified members", value: 842 },
          { label: "Messages / week", value: "3,214" },
          { label: "Advisors on call", value: 46 },
        ]}
      />

      <Section>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-line bg-ink-900/60">
              <div className="flex items-center justify-between border-b border-line p-5">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-accent" />
                  <div className="font-display text-[15px] text-white">Rooms you're in</div>
                </div>
                <span className="text-[11.5px] text-white/50">8 joined · 16 available</span>
              </div>
              <ul className="divide-y divide-line">
                {rooms.map((r) => (
                  <li key={r.name} className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-ink-850/50">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-md border px-2 py-0.5 font-mono text-[12px] ${toneMap[r.tone]}`}>
                          {r.name}
                        </span>
                        <Lock className="h-3 w-3 text-white/40" />
                      </div>
                      <div className="mt-2 text-[12.5px] text-white/60">{r.purpose}</div>
                      <div className="mt-2 text-[11.5px] text-white/40">{r.activity}</div>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-end gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-white/50">
                        <Users className="h-3 w-3" />
                        {r.members}
                      </span>
                      <button className="btn-ghost !py-1.5 !px-3 !text-[11px]">Open</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-signal-amber/20 bg-signal-amber/5 p-5">
              <div className="flex items-center gap-2 text-signal-amber">
                <Shield className="h-4 w-4" />
                <span className="mono">Conduct & classification</span>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/70">
                Rooms are restricted to identity-verified members. No classified material. Member-only channels
                require signed acknowledgement of the BDN Code of Conduct and, for some rooms, an NDA on file.
              </p>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-xl border border-line bg-ink-900/60">
              <div className="flex items-center justify-between border-b border-line p-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-accent" />
                  <div className="font-display text-[14px] text-white">Direct messages</div>
                </div>
                <span className="text-[11px] text-white/40">3 unread</span>
              </div>
              <ul className="divide-y divide-line">
                {dms.map((dm) => (
                  <li key={dm.name} className="flex items-center gap-3 p-4 transition-colors hover:bg-ink-850/50">
                    <Avatar name={dm.name} size={32} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-[12.5px] text-white">{dm.name}</span>
                        <span className="text-[10.5px] text-white/40">{dm.when}</span>
                      </div>
                      <div className="truncate text-[11.5px] text-white/50">{dm.last}</div>
                    </div>
                    {dm.unread > 0 && (
                      <span className="flex h-4 min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[9.5px] font-medium text-white">
                        {dm.unread}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/60 p-5">
              <div className="mono mb-3">People in-room now</div>
              <div className="flex flex-wrap gap-2">
                {featuredMembers.slice(0, 8).map((m) => (
                  <div key={m.id} className="relative">
                    <Avatar name={m.name} size={28} />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-signal-green ring-2 ring-ink-900" />
                  </div>
                ))}
              </div>
              <Link href="/dashboard" className="mt-4 inline-flex items-center gap-1 text-[11.5px] text-accent">
                Invite a verified member <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
