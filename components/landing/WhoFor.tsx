import { Section } from "@/components/ui/Section";
import { whoItIsFor } from "@/data/ecosystem";
import { Check } from "lucide-react";

export function WhoFor() {
  return (
    <Section
      label="Who it's for"
      title={<>Four audiences, one ecosystem.</>}
      intro="BDN is built so that each stakeholder in the defence-innovation chain finds meaningful value — and finds each other."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {whoItIsFor.map((group, i) => (
          <div key={group.audience} className="rounded-xl border border-line bg-ink-900/50 p-6 md:p-8">
            <div className="flex items-baseline justify-between">
              <div className="font-display text-[22px] font-semibold text-white">{group.audience}</div>
              <span className="mono text-white/30">0{i + 1}</span>
            </div>
            <ul className="mt-5 space-y-3">
              {group.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[13.5px] text-white/70">
                  <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
