import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ProblemCard } from "@/components/cards/ProblemCard";
import { problems } from "@/data/problems";

export function FeaturedProblems() {
  const featured = problems.slice(0, 6);
  return (
    <Section
      label="Problems marketplace"
      title={<>The work the country needs, in one shelf.</>}
      intro="268 live problem statements from services, DPSUs, and labs — with bounties, TRL ranges, and clear evaluation gates. Builders and startups can pick, apply, and ship."
      cta={
        <Link href="/problems" className="btn-ghost">
          Browse all problems <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <ProblemCard key={p.id} problem={p} />
        ))}
      </div>
    </Section>
  );
}
