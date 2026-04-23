import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-ink-900 overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-signal-cyan/20 opacity-70" />
        <svg viewBox="0 0 24 24" fill="none" className="relative h-4 w-4 text-white">
          <path
            d="M12 2L3 6v6c0 5 3.8 9.3 9 10 5.2-.7 9-5 9-10V6l-9-4z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[14px] font-semibold tracking-tight text-white">
            Bharat Defence Network
          </span>
          <span className="mono text-[9px] tracking-[0.24em] text-white/40">INDIA · DEFENCE · INNOVATION</span>
        </span>
      )}
    </Link>
  );
}
