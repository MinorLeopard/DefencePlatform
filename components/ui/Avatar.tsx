import { cn } from "@/lib/cn";

function hashHue(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % 360;
}

export function Avatar({
  name,
  size = 32,
  className,
  ring = false,
}: {
  name: string;
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  const hue = hashHue(name);
  return (
    <span
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${hue} 45% 28%), hsl(${(hue + 40) % 360} 55% 18%))`,
        fontSize: size * 0.42,
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-line text-white/85 font-medium select-none",
        ring && "ring-2 ring-ink-900",
        className,
      )}
      aria-hidden
    >
      {initials || "•"}
    </span>
  );
}

export function AvatarStack({ names, size = 24, max = 4 }: { names: string[]; size?: number; max?: number }) {
  const shown = names.slice(0, max);
  const extra = names.length - shown.length;
  return (
    <div className="flex -space-x-2">
      {shown.map((n) => (
        <Avatar key={n} name={n} size={size} ring />
      ))}
      {extra > 0 && (
        <span
          style={{ width: size, height: size, fontSize: size * 0.4 }}
          className="inline-flex items-center justify-center rounded-full border border-line bg-ink-800 text-[10px] text-white/60 ring-2 ring-ink-900"
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
