import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/ui/Section";
import { ecosystemPillars, whoItIsFor } from "@/data/ecosystem";
import { Compass, Cpu, Rocket, Users, ArrowUpRight } from "lucide-react";
import { partnerLogos } from "@/data/metrics";

const iconMap = { compass: Compass, cpu: Cpu, rocket: Rocket, users: Users } as const;

export const metadata = {
  title: "About · mission",
  description: "The mission and operating model behind Bharat Defence Network.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About · mission"
        title={<>A national innovation layer — built for the next decade.</>}
        intro="Bharat Defence Network exists to compress the distance between a defence problem and the team best suited to solve it. We stitch together builders, buyers, capital, and capability on one disciplined platform."
      />

      <Section label="Why BDN" title={<>The gap we exist to close.</>}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Problems were fragmented",
              body:
                "Defence demand signals were scattered across DPSUs, labs, and service HQs — builders couldn't see what mattered, sponsors couldn't see who was working.",
            },
            {
              title: "Capital was thin",
              body:
                "Hardware needs patient, structured funding. Venture alone can't build sovereign capability. Grants, strategic equity, production debt — all need to be reachable.",
            },
            {
              title: "Builders were isolated",
              body:
                "Talented engineers, researchers, and startup teams were working in silos with no serious, strategic community to learn from.",
            },
          ].map((x) => (
            <div key={x.title} className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="font-display text-[18px] text-white">{x.title}</div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{x.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        label="Operating model"
        title={<>Four motions, one platform.</>}
        intro="Each motion is a first-class surface on BDN — not a PDF, not a mailing list. A disciplined operating system for national capability."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ecosystemPillars.map((p, i) => {
            const Icon = iconMap[p.icon as keyof typeof iconMap] ?? Compass;
            return (
              <div key={p.id} className="rounded-xl border border-line bg-ink-900/50 p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-ink-850 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="mono text-white/30">0{i + 1}</span>
                </div>
                <div className="mt-4 font-display text-[18px] text-white">{p.title}</div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">{p.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section label="Who it's for" title={<>Built so each stakeholder finds value — and finds each other.</>}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {whoItIsFor.map((g) => (
            <div key={g.audience} className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="font-display text-[18px] text-white">{g.audience}</div>
              <ul className="mt-4 space-y-2 text-[13px] text-white/70">
                {g.points.map((p) => (
                  <li key={p}>· {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Leadership" title={<>A team with defence, startup, and policy memory.</>}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Dr. Anjali Kapoor", role: "Director General", bio: "Former principal scientist, DRDO. 24 years in sensors and autonomy. Fulbright policy fellow." },
            { name: "Gen. (Dr.) R. Khatri (retd.)", role: "Advisory Chair", bio: "Former Vice Chief; member, National Security Advisory Board. Doctorate in strategic studies." },
            { name: "Arjun Varma", role: "Chief Platform Officer", bio: "Founder · two exited defence-tech startups. Built the BDN platform from first principles." },
            { name: "Nikhil Menon", role: "DPSU Partnerships", bio: "20 years with HAL strategic programs. Leads BDN's DPSU interface." },
            { name: "Arunima Sen", role: "Capital Partners", bio: "MP, Cornerstone Defence Partners. Chairs BDN's investor council." },
            { name: "Dr. Suresh V.", role: "Research Partnerships", bio: "Director emeritus, DRDO LRDE. Advises BDN on research programs across universities." },
          ].map((p) => (
            <div key={p.name} className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="font-display text-[16px] text-white">{p.name}</div>
              <div className="mt-1 text-[12px] text-accent">{p.role}</div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-white/60">{p.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="press" label="Partners" title={<>A growing circle of ecosystem partners.</>}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-5">
          {partnerLogos.map((p) => (
            <div key={p} className="rounded-md border border-line bg-ink-900/40 px-4 py-3 text-center text-[12px] text-white/60">
              {p}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-ink-900/50 p-8 md:p-10">
          <div className="mono text-accent">Press & media</div>
          <div className="mt-3 font-display text-[24px] text-white">Working on a story about Indian defence innovation?</div>
          <p className="mt-2 max-w-2xl text-[13.5px] text-white/60">
            We're happy to help journalists, researchers, and analysts get the fullest possible picture.
            Request the press kit or book a briefing.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-accent">Request press kit <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="btn-ghost">Book a briefing</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
