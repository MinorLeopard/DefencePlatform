import { Section } from "@/components/ui/Section";
import { platformMetrics, growthSeries, partnerLogos } from "@/data/metrics";
import { formatCompact } from "@/lib/format";

export function Metrics() {
  const max = Math.max(...growthSeries.map((g) => g.projects));
  return (
    <Section
      label="Platform state"
      title={<>A living snapshot of the Indian defence-innovation surface.</>}
      intro="Real-time signal from the ecosystem — contributor base, flagship problems, production-ready projects, and capital deployed."
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Contributors", value: formatCompact(platformMetrics.contributors), sub: "+412 this month" },
          { label: "Active problems", value: platformMetrics.activeProblems, sub: "24 flagship" },
          { label: "Active projects", value: formatCompact(platformMetrics.projects), sub: "46 flagship" },
          { label: "Startups onboarded", value: platformMetrics.startups, sub: "12 Series-A+" },
          { label: "Grants disbursed", value: "₹412 Cr", sub: "74 recipients" },
          { label: "Patents supported", value: platformMetrics.patentsSupported, sub: "18 PCT filed" },
          { label: "University partners", value: platformMetrics.universitiesOnboarded, sub: "9 IITs · 6 IISc-adj" },
          { label: "DPSU partners", value: platformMetrics.dpsuPartners, sub: "6 active pilots" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-ink-900/40 p-5">
            <div className="mono text-[10px]">{s.label}</div>
            <div className="mt-2 font-display text-[28px] font-semibold text-white">{s.value}</div>
            <div className="mt-1 text-[11px] text-white/40">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-line bg-ink-900/40 p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="mono mb-1 text-accent">Ecosystem growth · 12 months</div>
            <div className="font-display text-[22px] font-semibold text-white">Projects, problems, and startups — moving together.</div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px]">
            <LegendDot color="#E07A2B" label="Projects" />
            <LegendDot color="#5EB8C4" label="Problems" />
            <LegendDot color="#7DD3A8" label="Startups" />
          </div>
        </div>
        <div className="mt-8 h-[220px]">
          <GrowthChart max={max} />
        </div>
      </div>

      <div className="mt-12">
        <div className="mono mb-6 text-center text-white/50">Ecosystem partners (sample)</div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max items-center gap-12 animate-scroll-x">
            {[...partnerLogos, ...partnerLogos].map((logo, i) => (
              <span key={`${logo}-${i}`} className="whitespace-nowrap font-display text-[15px] font-medium text-white/40 hover:text-white/80 transition-colors">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-white/60">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function GrowthChart({ max }: { max: number }) {
  return (
    <svg viewBox="0 0 800 220" className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gradProjects" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E07A2B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E07A2B" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1="0" x2="800" y1={220 * p} y2={220 * p} stroke="rgba(255,255,255,0.05)" />
      ))}
      <Path series="projects" color="#E07A2B" max={max} fill="url(#gradProjects)" />
      <Path series="problems" color="#5EB8C4" max={max} />
      <Path series="startups" color="#7DD3A8" max={max} />
    </svg>
  );
}

function Path({ series, color, max, fill }: { series: "projects" | "problems" | "startups"; color: string; max: number; fill?: string }) {
  const width = 800;
  const height = 220;
  const pad = 20;
  const step = (width - pad * 2) / (growthSeries.length - 1);
  const pts = growthSeries.map((g, i) => {
    const x = pad + i * step;
    const y = height - pad - (g[series] / max) * (height - pad * 2);
    return { x, y };
  });
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const dFill = `${d} L ${pts[pts.length - 1].x} ${height - pad} L ${pts[0].x} ${height - pad} Z`;
  return (
    <g>
      {fill && <path d={dFill} fill={fill} />}
      <path d={d} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={color} />
      ))}
    </g>
  );
}
