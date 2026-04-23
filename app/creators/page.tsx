import { PageHero } from "@/components/page/PageHero";
import { CreatorsGrid } from "@/components/filters/CreatorsGrid";
import { reels } from "@/data/creators";
import { formatCompact } from "@/lib/format";

export const metadata = {
  title: "Creators & reels",
  description: "Build logs, demos, teardowns, and field notes from the builders of India's defence ecosystem.",
};

export default function CreatorsPage() {
  const views = reels.reduce((s, r) => s + r.views, 0);
  return (
    <>
      <PageHero
        label="Creators · showcase"
        title={<>The builders, on camera.</>}
        intro="A modern media grid for defence-tech builders in India — field footage, prototype builds, teardowns, simulations, and serious interviews. Honest, technical, and unfiltered."
        stats={[
          { label: "Creators", value: 148 },
          { label: "Reels published", value: reels.length * 30 + 412 },
          { label: "Monthly views", value: formatCompact(views * 3) },
          { label: "Verified build logs", value: 94 },
        ]}
      />
      <section className="py-16 md:py-20">
        <div className="container-page">
          <CreatorsGrid />
        </div>
      </section>
    </>
  );
}
