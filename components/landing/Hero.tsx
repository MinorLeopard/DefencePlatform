"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Radio, Satellite, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-grid">
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-page relative z-10 pt-20 pb-28 md:pt-28 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <Badge tone="accent" dot>
              Platform · v2026.Q2
            </Badge>
            <span className="text-[12px] text-white/50">
              Live problems · Open repos · Builder community
            </span>
          </div>

          <h1 className="mt-7 font-display text-[44px] font-semibold leading-[1.02] tracking-tight text-white md:text-[72px] md:leading-[0.98] text-balance">
            India's defence innovation layer,
            <span className="block text-white/50"> built for the next decade.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/65 md:text-[17px]">
            Bharat Defence Network connects services, DPSUs, startups, researchers and builders around
            a shared marketplace of problems, projects, and production-ready capability — with grants,
            patents, and capital wired in.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/problems" className="btn-accent !px-5 !py-3 !text-[14px]">
              Explore problems <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="btn-ghost !px-5 !py-3 !text-[14px]">
              How the ecosystem works
            </Link>
            <div className="hidden md:flex items-center gap-2 pl-3 text-[12px] text-white/50">
              <span className="kbd">↗</span> Visit the platform as a member
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-4 max-w-2xl md:grid-cols-4">
            {[
              { label: "Contributors", value: "10,482" },
              { label: "Live problems", value: "268" },
              { label: "Active projects", value: "1,254" },
              { label: "Startups onboarded", value: "87" },
            ].map((s) => (
              <div key={s.label} className="border-l border-line pl-4">
                <div className="font-display text-[22px] font-semibold text-white">{s.value}</div>
                <div className="mono mt-1 text-[9.5px]">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="pointer-events-none absolute right-[-4%] top-16 hidden lg:block w-[520px] max-w-[44vw]"
        >
          <HeroArt />
        </motion.div>
      </div>
    </section>
  );
}

function HeroArt() {
  const rings = [180, 240, 300, 360];
  return (
    <div className="relative aspect-square">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(224,122,43,0.22),transparent_60%)]" />
      {rings.map((r, i) => (
        <div
          key={r}
          className="absolute left-1/2 top-1/2 rounded-full border border-line"
          style={{
            width: r,
            height: r,
            marginLeft: -r / 2,
            marginTop: -r / 2,
            opacity: 0.8 - i * 0.12,
          }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_40px_rgba(224,122,43,0.8)]" />

      {[
        { icon: ShieldCheck, label: "Flagship problem", x: "8%", y: "18%", tone: "text-accent" },
        { icon: Cpu, label: "Project · active", x: "78%", y: "12%", tone: "text-signal-cyan" },
        { icon: Radio, label: "Signals WG", x: "74%", y: "72%", tone: "text-signal-green" },
        { icon: Satellite, label: "Space pilot", x: "10%", y: "70%", tone: "text-signal-amber" },
      ].map(({ icon: Icon, label, x, y, tone }) => (
        <div
          key={label}
          className="absolute flex items-center gap-2 rounded-md border border-line bg-ink-900/80 px-3 py-2 text-[11px] backdrop-blur"
          style={{ left: x, top: y }}
        >
          <Icon className={`h-3.5 w-3.5 ${tone}`} />
          <span className="text-white/80">{label}</span>
        </div>
      ))}
    </div>
  );
}
