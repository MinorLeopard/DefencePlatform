import { Compass, Cpu, Rocket, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ecosystemPillars } from "@/data/ecosystem";

const iconMap = { compass: Compass, cpu: Cpu, rocket: Rocket, users: Users } as const;

export function Pillars() {
  return (
    <Section
      label="Ecosystem"
      title={<>One layer. Four motions. Built for scale.</>}
      intro="Bharat Defence Network is not a portal. It is an operating layer that moves problems into projects, projects into startups, and startups into operational capability."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ecosystemPillars.map((p, i) => {
          const Icon = iconMap[p.icon as keyof typeof iconMap] ?? Compass;
          return (
            <div
              key={p.id}
              className="group relative flex flex-col gap-4 rounded-xl border border-line bg-ink-900/50 p-6 transition-colors hover:border-line-strong hover:bg-ink-850/70"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-ink-850 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="mono text-white/30">0{i + 1}</span>
              </div>
              <div>
                <div className="font-display text-xl font-semibold text-white">{p.title}</div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{p.description}</p>
              </div>
              <ul className="mt-auto space-y-1.5 border-t border-line pt-4">
                {p.metrics.map((m) => (
                  <li key={m} className="flex items-center gap-2 text-[12px] text-white/60">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
