import { Hero } from "@/components/landing/Hero";
import { Pillars } from "@/components/landing/Pillars";
import { Metrics } from "@/components/landing/Metrics";
import { FeaturedProblems } from "@/components/landing/FeaturedProblems";
import { FeaturedProjects } from "@/components/landing/FeaturedProjects";
import { FeaturedStartups } from "@/components/landing/FeaturedStartups";
import { SummitPreview } from "@/components/landing/SummitPreview";
import { CreatorsPreview } from "@/components/landing/CreatorsPreview";
import { LabsPreview } from "@/components/landing/LabsPreview";
import { WhoFor } from "@/components/landing/WhoFor";
import { CTA } from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <FeaturedProblems />
      <Metrics />
      <FeaturedProjects />
      <LabsPreview />
      <SummitPreview />
      <FeaturedStartups />
      <CreatorsPreview />
      <WhoFor />
      <CTA />
    </>
  );
}
