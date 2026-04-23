import { cn } from "@/lib/cn";

export function Stat({
  label,
  value,
  change,
  className,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  change?: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("group relative rounded-xl border border-line bg-ink-900/40 p-5 transition-colors hover:border-line-strong", className)}>
      <div className="mono mb-2 text-[10px]">{label}</div>
      <div className="font-display text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-2 flex items-center gap-2">
        {change && (
          <span className={cn("text-[11px] font-medium", change.startsWith("-") ? "text-signal-red" : "text-signal-green")}>
            {change}
          </span>
        )}
        {sub && <span className="text-[11px] text-white/40">{sub}</span>}
      </div>
    </div>
  );
}
