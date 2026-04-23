import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.slice(0, 6);
  return (
    <Section
      label="Projects"
      title={<>Code, hardware, and doctrine — moving together.</>}
      intro="Open-source, restricted, and member-only capability projects. Built by teams, reviewed by peers, and funnelled to service-grade pilots."
      cta={
        <Link href="/projects" className="btn-ghost">
          Explore projects <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}
