import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl border border-line">
          <div className="absolute inset-0 gradient-orange opacity-80" />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative px-8 py-16 md:px-16 md:py-20 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mono mb-4 text-accent">Join the ecosystem</div>
              <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-[44px] md:leading-[1.05] text-balance">
                If you're building for national capability, you belong here.
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-white/70">
                Request your builder or partner access. We'll pair you with the right problems, the right
                capital, and the right interlocutors in the ecosystem.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link href="/contact" className="btn-accent !px-6 !py-3 !text-[14px]">
                Request access <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="btn-ghost !px-6 !py-3 !text-[14px]">
                Preview the platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
