import { cn } from "@/lib/cn";

function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

const palettes = [
  ["#0f1720", "#1d3a4d", "#E07A2B"],
  ["#101820", "#2a2e3b", "#5EB8C4"],
  ["#0c0f14", "#1a1f2e", "#7DD3A8"],
  ["#111316", "#2e2636", "#E4B458"],
  ["#08101a", "#163049", "#5EB8C4"],
  ["#12101a", "#291c2e", "#E07A2B"],
  ["#0a0f0c", "#1e3026", "#7DD3A8"],
];

export function GradientThumb({
  seed,
  label,
  className,
  aspect = "video",
  kicker,
  icon,
}: {
  seed: string;
  label?: string;
  className?: string;
  aspect?: "video" | "square" | "portrait";
  kicker?: string;
  icon?: React.ReactNode;
}) {
  const p = palettes[hash(seed) % palettes.length];
  const a = hash(seed + "a") % 100;
  const b = hash(seed + "b") % 100;
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "portrait" ? "aspect-[3/4]" : "aspect-video";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-line",
        aspectClass,
        className,
      )}
      style={{
        background: `radial-gradient(70% 80% at ${a}% ${b}%, ${p[2]}55, transparent 60%), linear-gradient(135deg, ${p[0]}, ${p[1]})`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {icon && (
        <div className="absolute inset-0 flex items-center justify-center text-white/30">{icon}</div>
      )}
      {(label || kicker) && (
        <div className="absolute inset-x-0 bottom-0 p-3">
          {kicker && <div className="mono text-[9px] text-white/55">{kicker}</div>}
          {label && <div className="mt-0.5 line-clamp-2 text-[13px] font-medium text-white">{label}</div>}
        </div>
      )}
    </div>
  );
}
