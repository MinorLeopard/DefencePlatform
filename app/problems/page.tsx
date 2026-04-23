import { PageHero } from "@/components/page/PageHero";
import { ProblemsFilter } from "@/components/filters/ProblemsFilter";
import { problems } from "@/data/problems";
import { formatINR } from "@/lib/format";

export const metadata = {
  title: "Problems marketplace",
  description:
    "Live defence problem statements from services, DPSUs, and labs — bounties, TRL ranges, and clear evaluation gates.",
};

export default function ProblemsPage() {
  const total = problems.length;
  const totalBounty = problems.reduce((s, p) => s + p.bounty, 0);
  const flagship = problems.filter((p) => p.difficulty === "Flagship" || p.difficulty === "Moonshot").length;
  const open = problems.filter((p) => p.status === "Open").length;
  return (
    <>
      <PageHero
        label="Problems marketplace"
        title={<>Pick the work that moves the country.</>}
        intro="Every problem on the shelf is scoped by a service, DPSU, or lab — with evaluation gates, realistic timelines, and bounties that fund serious work. Filter by domain, stage, or difficulty."
        stats={[
          { label: "Problems live", value: total },
          { label: "Open", value: open },
          { label: "Flagship + Moonshot", value: flagship },
          { label: "Total bounty pool", value: formatINR(totalBounty) },
        ]}
      />
      <section className="py-16 md:py-20">
        <div className="container-page">
          <ProblemsFilter problems={problems} />
        </div>
      </section>
    </>
  );
}
