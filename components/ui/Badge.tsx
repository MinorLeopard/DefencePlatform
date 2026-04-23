import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "cyan" | "green" | "amber" | "red";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-white/[0.03] text-white/70",
  accent: "border-accent/25 bg-accent/10 text-accent",
  cyan: "border-signal-cyan/25 bg-signal-cyan/10 text-signal-cyan",
  green: "border-signal-green/25 bg-signal-green/10 text-signal-green",
  amber: "border-signal-amber/25 bg-signal-amber/10 text-signal-amber",
  red: "border-signal-red/25 bg-signal-red/10 text-signal-red",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  dot = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "accent" && "bg-accent",
            tone === "cyan" && "bg-signal-cyan",
            tone === "green" && "bg-signal-green",
            tone === "amber" && "bg-signal-amber",
            tone === "red" && "bg-signal-red",
            tone === "neutral" && "bg-white/60",
          )}
        />
      )}
      {children}
    </span>
  );
}
