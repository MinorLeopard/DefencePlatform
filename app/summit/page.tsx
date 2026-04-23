import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Calendar, MapPin, Users, ArrowUpRight } from "lucide-react";
import { events, nextSummit } from "@/data/events";

export const metadata = {
  title: "Summit & events",
  description: "Bharat Defence Summit, Trishul Showcase, pitch days, and closed-door roundtables.",
};

const kindTone: Record<string, any> = {
  Summit: "accent",
  Showcase: "cyan",
  "Pitch Day": "green",
  Hackathon: "amber",
  "Closed Door": "red",
};

export default function SummitPage() {
  const upcoming = events.filter((e) => !e.isPast);
  const past = events.filter((e) => e.isPast);

  return (
    <>
      <PageHero
        label="Summit · events · showcase"
        title={<>An ecosystem that meets on a rhythm.</>}
        intro="One flagship summit in October. One spring showcase in May. Pitch days, hackathons, and closed-door roundtables in between. If you are serious about Indian defence innovation, you'll run into people who matter here."
        stats={[
          { label: "Editions run", value: 7 },
          { label: "Attendees ('25)", value: "3,600" },
          { label: "Demos / year", value: "60+" },
          { label: "Capital in room", value: "₹1,200 Cr+" },
        ]}
      />

      {nextSummit && (
        <Section label="Flagship" title={<>{nextSummit.name}</>} intro={nextSummit.subtitle}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-line bg-ink-900/60 p-8 lg:col-span-2 relative overflow-hidden">
              <div className="absolute inset-0 gradient-orange opacity-60" />
              <div className="relative">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/75">
                  <span className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-accent" />{new Date(nextSummit.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-accent" />{nextSummit.venue}, {nextSummit.location}</span>
                  <span className="inline-flex items-center gap-2"><Users className="h-3.5 w-3.5 text-accent" />{nextSummit.expectedAttendance.toLocaleString()} expected</span>
                </div>
                <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/75">{nextSummit.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-accent">Request invite <ArrowUpRight className="h-4 w-4" /></Link>
                  <button className="btn-ghost">Download brochure</button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/60 p-6">
              <div className="mono mb-4">Featured voices</div>
              <ul className="space-y-4">
                {nextSummit.featuredSpeakers.map((s) => (
                  <li key={s.name} className="flex items-center gap-3">
                    <Avatar name={s.name} size={36} />
                    <div>
                      <div className="text-[13px] text-white">{s.name}</div>
                      <div className="text-[11px] text-white/45">{s.role} · {s.org}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <div className="mono mb-4 text-accent">Three-day programme</div>
            <ol className="relative border-l border-line pl-6 space-y-6">
              {nextSummit.agenda.map((a, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[30px] top-1.5 h-2 w-2 rounded-full bg-accent" />
                  <div className="mono text-accent">{a.time}</div>
                  <div className="mt-1 font-display text-[15px] text-white">{a.title}</div>
                  {(a.speaker || a.org) && (
                    <div className="mt-1 text-[12px] text-white/55">
                      {a.speaker}{a.org ? ` · ${a.org}` : ""}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Section>
      )}

      <Section label="Upcoming" title={<>On the ecosystem calendar.</>}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => (
            <article key={e.id} className="rounded-xl border border-line bg-ink-900/50 p-6 transition-colors hover:border-line-strong">
              <div className="flex items-center justify-between">
                <Badge tone={kindTone[e.kind]} dot>{e.kind}</Badge>
                <span className="mono text-[10px]">{e.expectedAttendance.toLocaleString()} attendees</span>
              </div>
              <h3 className="mt-4 font-display text-[17px] font-semibold text-white">{e.name}</h3>
              <p className="mt-2 line-clamp-2 text-[13px] text-white/60">{e.subtitle}</p>
              <div className="mt-4 flex flex-col gap-1.5 text-[12px] text-white/55">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" />{e.startDate}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" />{e.location}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section label="Past" title={<>Recap · recent editions.</>}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {past.map((e) => (
            <article key={e.id} className="rounded-xl border border-line bg-ink-900/40 p-6">
              <Badge tone="neutral">{e.kind}</Badge>
              <h3 className="mt-3 font-display text-[15px] text-white">{e.name}</h3>
              <div className="mt-1 text-[11px] text-white/40">{e.startDate}</div>
              <p className="mt-3 line-clamp-2 text-[12.5px] text-white/55">{e.description}</p>
              <ul className="mt-4 space-y-1">
                {e.highlights.map((h) => (
                  <li key={h} className="text-[11.5px] text-white/55">· {h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
