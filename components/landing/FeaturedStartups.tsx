import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { StartupCard } from "@/components/cards/StartupCard";
import { startups } from "@/data/startups";

export function FeaturedStartups() {
  const featured = startups.slice(0, 6);
  return (
    <Section
      label="Startups"
      title={<>The cohort scaling India's sovereign capability.</>}
      intro="87 defence-tech startups onboarded — from pre-seed teams to Series-B production specialists. Each backed by grants, strategic capital, and service pilots."
      cta={
        <Link href="/startups" className="btn-ghost">
          See all startups <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((s) => (
          <StartupCard key={s.id} startup={s} />
        ))}
      </div>
    </Section>
  );
}
