import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { nextSummit } from "@/data/events";

export function SummitPreview() {
  if (!nextSummit) return null;
  const startDate = new Date(nextSummit.startDate);
  const endDate = new Date(nextSummit.endDate);
  const dateStr = `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <Section label="Annual summit" title={<>{nextSummit.name}</>} intro={nextSummit.subtitle}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-xl border border-line lg:col-span-2 min-h-[320px]">
          <div className="absolute inset-0 gradient-orange" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative p-8 md:p-10 flex flex-col justify-between h-full min-h-[320px]">
            <div className="flex items-center gap-2">
              <Badge tone="accent" dot>Flagship</Badge>
              <Badge tone="neutral">Edition VII</Badge>
            </div>
            <div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-white/70">
                <span className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-accent" />{dateStr}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-accent" />{nextSummit.venue}, {nextSummit.location}</span>
                <span className="inline-flex items-center gap-2"><Users className="h-3.5 w-3.5 text-accent" />{nextSummit.expectedAttendance.toLocaleString()} expected</span>
              </div>
              <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-white/70">
                {nextSummit.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/summit" className="btn-accent">View programme <ArrowUpRight className="h-4 w-4" /></Link>
                <Link href="/contact" className="btn-ghost">Request invite</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-ink-900/60 p-6">
          <div className="mono mb-4">Highlights</div>
          <ul className="space-y-4">
            {nextSummit.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[13.5px] text-white/75">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-line pt-5">
            <div className="mono mb-3">Featured voices</div>
            <ul className="space-y-3">
              {nextSummit.featuredSpeakers.slice(0, 3).map((s) => (
                <li key={s.name} className="text-[12.5px]">
                  <div className="text-white/90">{s.name}</div>
                  <div className="text-white/45">{s.role} · {s.org}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
