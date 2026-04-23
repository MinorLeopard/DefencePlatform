"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { HeroOrbital } from "@/components/landing/HeroOrbital";

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-grid">
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-page relative z-10 pt-20 pb-28 md:pt-28 md:pb-40">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-3">
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden items-center justify-center lg:flex"
          >
            <div className="relative w-full max-w-[520px]">
              <HeroOrbital />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
