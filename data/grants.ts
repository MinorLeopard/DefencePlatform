export type Grant = {
  id: string;
  name: string;
  sponsor: string;
  kind: "Grant" | "Prize" | "Equity" | "Debt" | "Contract";
  ticket: string;
  focus: string[];
  openUntil: string;
  description: string;
  eligibility: string[];
};

export const grants: Grant[] = [
  {
    id: "G-101",
    name: "BDN Deep-tech Launch Grant",
    sponsor: "BDN Foundation",
    kind: "Grant",
    ticket: "₹25L — ₹1.5 Cr",
    focus: ["Autonomy", "Sensors", "Energy", "Communications"],
    openUntil: "Rolling",
    description:
      "Non-dilutive grant for pre-seed defence deep-tech teams with a working prototype and a service interlocutor identified.",
    eligibility: [
      "India-registered entity",
      "At least one defence service or lab interlocutor",
      "Working prototype or reproducible bench demo",
    ],
  },
  {
    id: "G-102",
    name: "Capability Bharat Flagship Prize",
    sponsor: "BDN + Ministry of Defence (partner)",
    kind: "Prize",
    ticket: "₹3 Cr per flagship",
    focus: ["Flagship problem statements"],
    openUntil: "2026-10-12 (Summit)",
    description:
      "Annual prize for flagship problem statements announced at the Bharat Defence Summit. Up to 4 prizes awarded.",
    eligibility: ["Must address a flagship problem", "Evaluated by joint services panel"],
  },
  {
    id: "G-103",
    name: "iDEX DISC Continuation",
    sponsor: "Department of Defence Production (partner)",
    kind: "Contract",
    ticket: "Up to ₹10 Cr",
    focus: ["iDEX DISC problem sets"],
    openUntil: "Per-DISC cycle",
    description:
      "BDN supports startups through the iDEX DISC lifecycle with technical review, demo preparation, and co-investor syndicates.",
    eligibility: ["iDEX shortlisted", "BDN onboarded"],
  },
  {
    id: "G-104",
    name: "BDN Strategic Equity Line",
    sponsor: "BDN Capital Partners",
    kind: "Equity",
    ticket: "$1M — $8M",
    focus: ["Hardware scale-up", "Production readiness"],
    openUntil: "Rolling",
    description:
      "Equity co-invest alongside BDN's strategic syndicate for Series-A and Series-B defence hardware companies.",
    eligibility: ["BDN onboarded", "Validated DPSU or service pilot"],
  },
  {
    id: "G-105",
    name: "Bharat Sovereign Production Debt",
    sponsor: "BDN + partner public-sector bank",
    kind: "Debt",
    ticket: "₹5 Cr — ₹50 Cr",
    focus: ["Production, tooling, capex"],
    openUntil: "Rolling",
    description:
      "Concessional debt for production-readiness capex tied to a signed service or DPSU purchase agreement.",
    eligibility: ["Signed purchase agreement (or LOI)", "Minimum one year of operations"],
  },
];

export type PatentSupport = {
  id: string;
  title: string;
  stage: "Ideation" | "Provisional" | "Complete" | "Grant" | "PCT";
  description: string;
  turnaround: string;
};

export const patentStages: PatentSupport[] = [
  {
    id: "PT-1",
    title: "Ideation & prior-art",
    stage: "Ideation",
    description: "Prior-art search, claim-mapping workshop, defence-sensitive disclosure review.",
    turnaround: "2 weeks",
  },
  {
    id: "PT-2",
    title: "Provisional filing",
    stage: "Provisional",
    description: "Draft & file provisional (IN) with defence-sensitive counsel, government-recognised agent.",
    turnaround: "3 weeks",
  },
  {
    id: "PT-3",
    title: "Complete specification",
    stage: "Complete",
    description: "Complete spec, claim refinement, examiner prep, defence review if classification-adjacent.",
    turnaround: "8–12 weeks",
  },
  {
    id: "PT-4",
    title: "PCT + national phase",
    stage: "PCT",
    description: "PCT international filing and national-phase entries with strategic-market prioritisation.",
    turnaround: "12 months",
  },
  {
    id: "PT-5",
    title: "Grant & portfolio",
    stage: "Grant",
    description: "Ongoing portfolio grooming, enforcement strategy, licensing introductions.",
    turnaround: "Ongoing",
  },
];
