import { PageHero } from "@/components/page/PageHero";
import { ProjectsFilter } from "@/components/filters/ProjectsFilter";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "Open-source, restricted, and member-only defence capability projects on BDN.",
};

export default function ProjectsPage() {
  const stars = projects.reduce((s, p) => s + p.stars, 0);
  const contribs = projects.reduce((s, p) => s + p.contributors, 0);
  return (
    <>
      <PageHero
        label="Projects · the capability shelf"
        title={<>Capability, compiled.</>}
        intro="A layered project shelf — from open reference architectures to member-only restricted-use codebases. Each linked to problems, sponsors, and startups it advances."
        stats={[
          { label: "Projects", value: projects.length },
          { label: "Contributors", value: contribs },
          { label: "Combined stars", value: stars.toLocaleString() },
          { label: "Flagship maintainers", value: 46 },
        ]}
      />
      <section className="py-16 md:py-20">
        <div className="container-page">
          <ProjectsFilter projects={projects} />
        </div>
      </section>
    </>
  );
}
