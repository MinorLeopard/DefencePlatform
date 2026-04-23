"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Radio, Satellite, Cpu, Target, Beaker } from "lucide-react";

type Node = {
  icon: any;
  label: string;
  kind: string;
  ring: 0 | 1 | 2;
  angle: number;
  depth: number;
  tone: string;
};

const nodes: Node[] = [
  { icon: ShieldCheck, label: "Flagship problem", kind: "PRB-0413", ring: 1, angle: -68, depth: 90, tone: "text-accent" },
  { icon: Cpu, label: "Project · active", kind: "project-nayan", ring: 0, angle: 42, depth: 60, tone: "text-signal-cyan" },
  { icon: Beaker, label: "GNC Lab", kind: "LAB-03", ring: 2, angle: 112, depth: 140, tone: "text-signal-amber" },
  { icon: Radio, label: "Signals WG", kind: "thread", ring: 1, angle: 188, depth: 80, tone: "text-signal-green" },
  { icon: Target, label: "Peer review", kind: "review", ring: 0, angle: -155, depth: 50, tone: "text-accent" },
  { icon: Satellite, label: "Space pilot", kind: "PRJ-002", ring: 2, angle: 240, depth: 120, tone: "text-signal-cyan" },
];

// Radii for each ring (in px) — keep in sync with SVG rendering below
const RING_RADII = [112, 168, 232];

export function HeroOrbital() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rxRef = useRef(0);
  const ryRef = useRef(0);
  const targetRxRef = useRef(0);
  const targetRyRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia?.("(pointer: fine)").matches;
    if (reduced || !finePointer) return;

    const tick = () => {
      // Ease toward target — soft follow, no jitter
      rxRef.current += (targetRxRef.current - rxRef.current) * 0.06;
      ryRef.current += (targetRyRef.current - ryRef.current) * 0.06;
      el.style.setProperty("--rx", `${rxRef.current.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ryRef.current.toFixed(2)}deg`);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / rect.width; // ~ -0.5..0.5
      const ny = (e.clientY - cy) / rect.height;
      // Rotate Y on horizontal, X on vertical (inverted)
      targetRyRef.current = Math.max(-8, Math.min(8, nx * 14));
      targetRxRef.current = Math.max(-6, Math.min(6, -ny * 12));
    };

    const onLeave = () => {
      targetRxRef.current = 0;
      targetRyRef.current = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative aspect-square w-full"
      style={{
        perspective: "1600px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        className="relative h-full w-full transition-transform duration-[120ms] will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        }}
      >
        {/* Deep ambient glow (farthest back) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            transform: "translateZ(-160px)",
            background:
              "radial-gradient(circle at 50% 55%, rgba(224,122,43,0.22), transparent 55%), radial-gradient(circle at 60% 40%, rgba(94,184,196,0.14), transparent 60%)",
            filter: "blur(8px)",
          }}
        />

        {/* Orbital SVG — rotates slowly */}
        <div
          className="absolute inset-0"
          style={{ transform: "translateZ(-20px)" }}
        >
          <svg viewBox="-260 -260 520 520" className="h-full w-full">
            <defs>
              <radialGradient id="hub" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E07A2B" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#E07A2B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#E07A2B" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="axis" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {/* Concentric rings */}
            <g className="origin-center animate-[spin_120s_linear_infinite]">
              {RING_RADII.map((r, i) => (
                <g key={r} opacity={0.9 - i * 0.18}>
                  <circle cx="0" cy="0" r={r} fill="none" stroke="rgba(255,255,255,0.07)" />
                  {/* Tick marks */}
                  {Array.from({ length: 24 }).map((_, k) => {
                    const t = (k / 24) * Math.PI * 2;
                    const inner = r - (k % 3 === 0 ? 4 : 2);
                    const outer = r + (k % 3 === 0 ? 4 : 2);
                    return (
                      <line
                        key={k}
                        x1={Math.cos(t) * inner}
                        y1={Math.sin(t) * inner}
                        x2={Math.cos(t) * outer}
                        y2={Math.sin(t) * outer}
                        stroke="rgba(255,255,255,0.09)"
                        strokeWidth="1"
                      />
                    );
                  })}
                </g>
              ))}
            </g>

            {/* Cross-hair axes — held steady */}
            <line x1="-240" x2="240" y1="0" y2="0" stroke="url(#axis)" strokeDasharray="2 4" />
            <line x1="0" x2="0" y1="-240" y2="240" stroke="url(#axis)" strokeDasharray="2 4" />

            {/* India-abstract mesh: rough lat-lon style nodes */}
            <g opacity="0.55">
              {MESH_POINTS.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="1.3" fill="rgba(224,122,43,0.55)" />
              ))}
              {MESH_LINKS.map(([a, b], i) => (
                <line
                  key={i}
                  x1={MESH_POINTS[a].x}
                  y1={MESH_POINTS[a].y}
                  x2={MESH_POINTS[b].x}
                  y2={MESH_POINTS[b].y}
                  stroke="rgba(224,122,43,0.18)"
                  strokeWidth="0.8"
                />
              ))}
            </g>

            {/* Radar sweep */}
            <g className="origin-center animate-[spin_10s_linear_infinite]">
              <path
                d={`M 0 0 L ${RING_RADII[2]} 0 A ${RING_RADII[2]} ${RING_RADII[2]} 0 0 1 ${
                  Math.cos(Math.PI / 6) * RING_RADII[2]
                } ${Math.sin(Math.PI / 6) * RING_RADII[2]} Z`}
                fill="url(#hub)"
                opacity="0.55"
              />
            </g>

            {/* Hub */}
            <circle cx="0" cy="0" r="64" fill="url(#hub)" opacity="0.85" />
            <circle cx="0" cy="0" r="3.5" fill="#E07A2B" />
            <circle cx="0" cy="0" r="1.5" fill="#fff" />
          </svg>
        </div>

        {/* Center label */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ transform: "translate(-50%, -50%) translateZ(40px)" }}
        >
          <div className="mono text-[9px] text-white/60">BDN · OPS</div>
          <div className="font-display text-[11px] font-semibold tracking-wide text-white/80">
            Live ecosystem
          </div>
        </div>

        {/* Floating node pills — true Z depth layered */}
        {nodes.map((n, i) => {
          const Icon = n.icon;
          const r = RING_RADII[n.ring];
          const rad = (n.angle * Math.PI) / 180;
          const x = Math.cos(rad) * r;
          const y = Math.sin(rad) * r;
          return (
            <div
              key={i}
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${n.depth}px) translate(-50%, -50%)`,
              }}
            >
              <div
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-line bg-ink-900/90 px-2.5 py-1.5 text-[10.5px] shadow-[0_12px_28px_-12px_rgba(0,0,0,0.8)] backdrop-blur"
              >
                <Icon className={`h-3 w-3 ${n.tone}`} />
                <span className="text-white/85">{n.label}</span>
                <span className="mono text-white/35">{n.kind}</span>
              </div>
            </div>
          );
        })}

        {/* Foreground specular dot */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            transform: "translate(-50%, -50%) translateZ(120px)",
            boxShadow: "0 0 28px rgba(224,122,43,0.8)",
          }}
        />
      </div>
    </div>
  );
}

// Rough, stylised "India-shape" node points in the SVG's centred coordinate system.
// These are decorative only — they're an abstract network mesh, not a real map.
const MESH_POINTS = [
  { x: -30, y: -180 }, // Kashmir-ish
  { x: 12, y: -150 },
  { x: -10, y: -120 },
  { x: 40, y: -110 },
  { x: -60, y: -90 },
  { x: 0, y: -80 },
  { x: 70, y: -60 },
  { x: -90, y: -40 },
  { x: -30, y: -30 },
  { x: 30, y: -20 },
  { x: 90, y: 0 },
  { x: -70, y: 20 },
  { x: -10, y: 30 },
  { x: 50, y: 40 },
  { x: -50, y: 70 },
  { x: 20, y: 80 },
  { x: 80, y: 70 },
  { x: -20, y: 110 },
  { x: 40, y: 130 },
  { x: 0, y: 160 },
  { x: -30, y: 190 }, // southern tip-ish
];

const MESH_LINKS: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [2, 4], [3, 6], [4, 5], [5, 6], [4, 7], [5, 8],
  [6, 10], [7, 8], [8, 9], [9, 10], [7, 11], [9, 12], [10, 13], [11, 12],
  [12, 13], [12, 14], [13, 15], [13, 16], [14, 15], [15, 17], [16, 18],
  [15, 18], [17, 19], [18, 19], [19, 20],
];
