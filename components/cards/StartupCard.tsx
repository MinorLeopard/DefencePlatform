import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatUSD } from "@/lib/format";
import type { Startup } from "@/data/startups";
import { MapPin } from "lucide-react";

export function StartupCard({ startup }: { startup: Startup }) {
  return (
    <Card className="h-full p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line font-display text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, rgba(224,122,43,0.25), rgba(94,184,196,0.15))`,
            }}
          >
            {startup.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </span>
          <div>
            <div className="font-display text-[15px] font-semibold text-white">{startup.name}</div>
            <div className="text-[11px] text-white/45 inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {startup.location}
            </div>
          </div>
        </div>
        <Badge tone="accent">{startup.stage}</Badge>
      </div>

      <p className="mt-4 text-[13.5px] leading-relaxed text-white/70">{startup.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {startup.tags.slice(0, 4).map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-[11px]">
        <div>
          <div className="mono">Raised</div>
          <div className="mt-1 font-display text-[14px] text-white">{formatUSD(startup.fundingRaised)}</div>
        </div>
        <div>
          <div className="mono">Patents</div>
          <div className="mt-1 font-display text-[14px] text-white">{startup.patents}</div>
        </div>
        <div>
          <div className="mono">Onboarded</div>
          <div className="mt-1 font-display text-[14px] text-white">{startup.onboardingYear}</div>
        </div>
      </div>
    </Card>
  );
}
