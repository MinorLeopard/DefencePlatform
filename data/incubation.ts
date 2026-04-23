export type IncubationTrack = {
  id: string;
  slug: string;
  name: string;
  weeks: number;
  audience: string;
  summary: string;
  outcomes: string[];
  eligibility: string[];
  domains: string[];
  stipend: string;
  color: string;
};

export const tracks: IncubationTrack[] = [
  {
    id: "TRK-01",
    slug: "early-stage-concept",
    name: "Early-Stage Concept Track",
    weeks: 12,
    audience: "Pre-seed teams with a working bench demo",
    summary:
      "For small teams with a credible bench demo and a service-side hypothesis. We take you from concept to a defensible architecture, a scoped pilot plan, and a first service interlocutor.",
    outcomes: [
      "Architecture memo reviewed by a service advisor",
      "Defined first-pilot scope with a named interlocutor",
      "Patent-desk ideation review completed",
      "Readiness to apply for BDN Deep-tech Launch Grant",
    ],
    eligibility: [
      "India-registered entity or intent-to-register letter",
      "At least one technical co-founder",
      "Reproducible bench demo or preprint-quality writeup",
    ],
    domains: ["AI & Autonomy", "Sensing", "Materials", "Robotics"],
    stipend: "₹15L non-dilutive stipend + lab access",
    color: "#E07A2B",
  },
  {
    id: "TRK-02",
    slug: "university-spinout",
    name: "University Spinout Track",
    weeks: 16,
    audience: "IIT / IISc / IIIT research groups spinning out a defence concept",
    summary:
      "Co-run with your host campus. Designed for research groups turning a thesis, lab prototype, or PhD thread into a fundable startup — with shared IP, campus mentorship, and a clear spinout pathway.",
    outcomes: [
      "Co-built IP and equity framework with the host campus",
      "Founding team formation and onboarding",
      "Architecture review + independent peer review cycle",
      "Warm introductions to a shortlist of deep-tech investors",
    ],
    eligibility: [
      "Host campus is a recognised Indian research institution",
      "A faculty principal investigator is co-applicant",
      "Prototype or preprint in a defence-adjacent domain",
    ],
    domains: ["GNC", "Sensing", "Materials", "Simulation & Training"],
    stipend: "₹25L non-dilutive stipend + joint campus IP framework",
    color: "#5EB8C4",
  },
  {
    id: "TRK-03",
    slug: "prototype-to-field",
    name: "Prototype-to-Field-Readiness Track",
    weeks: 16,
    audience: "Seed / early-stage startups with a working prototype",
    summary:
      "For teams who have a working prototype and need to reach service-grade field readiness. Structured around environmental testing, compliance, and a service pilot plan.",
    outcomes: [
      "Environmental-chamber and field-trial plan signed off",
      "Compliance & export-control desk engagement completed",
      "Pilot-ready unit definition + BOM maturity review",
      "Bridge to Production Readiness cohort if eligible",
    ],
    eligibility: [
      "Working prototype at TRL 4+",
      "Clear target service / DPSU customer",
      "Minimum two-person technical team",
    ],
    domains: ["UAS / Drones", "Electronics & EW", "Energy & Propulsion", "Maritime"],
    stipend: "₹40L non-dilutive stipend + environmental-chamber block",
    color: "#7DD3A8",
  },
  {
    id: "TRK-04",
    slug: "dual-use-systems",
    name: "Dual-Use Systems Track",
    weeks: 12,
    audience: "Dual-use builders with a civilian GTM and a defence adjacency",
    summary:
      "For teams whose primary market is civilian but whose technology has clear defence adjacency. Designed to thread the needle on export-control posture, buyer segmentation, and defence onboarding.",
    outcomes: [
      "Dual-use classification memo per SKU",
      "Named-person control and vendor-country log setup",
      "Defence-adjacent pilot scoped without disturbing civilian GTM",
      "Investor-ready dual-use narrative",
    ],
    eligibility: [
      "Active civilian product or paying customers",
      "Identifiable defence-adjacent use cases",
      "Willingness to meet compliance baseline",
    ],
    domains: ["AI & Autonomy", "Communications", "Logistics", "Cyber & Signals"],
    stipend: "₹20L non-dilutive stipend + compliance desk access",
    color: "#E4B458",
  },
];

export const incubationPerks: { title: string; body: string }[] = [
  {
    title: "Non-dilutive stipend",
    body: "₹15L–₹40L per startup, disbursed against cohort milestones. No equity taken by BDN during the program.",
  },
  {
    title: "Shared lab access",
    body: "Full access to all six BDN AI Labs — simulation, GNC, embedded AI, sensing, autonomy, and human performance.",
  },
  {
    title: "Dedicated mentor",
    body: "Two senior mentors matched to your track — one technical, one ecosystem — with weekly standing slots.",
  },
  {
    title: "Weekly tech reviews",
    body: "Thursday technical reviews with a rotating panel of lab leads, service advisors, and industry veterans.",
  },
  {
    title: "Legal · export · IP desks",
    body: "Built-in engagement with the BDN patent desk, export-control desk, and a defence-cleared legal partner.",
  },
  {
    title: "Capstone at Summit",
    body: "Every cohort closes with a capstone demo at the nearest Bharat Defence Summit or Trishul Showcase, with an investor day alongside.",
  },
  {
    title: "DPSU & service intros",
    body: "Warm introductions to DPSU strategic-programs teams and service interlocutors — scoped to your track outcomes.",
  },
  {
    title: "Production readiness bridge",
    body: "Graduates are automatically considered for the Production Readiness cohort, with concessional debt access.",
  },
];

export const cohortTimeline: { week: string; title: string; detail: string }[] = [
  { week: "Week 0", title: "Cohort kickoff · Hyderabad", detail: "Two-day in-person onboarding with founders, mentors, and lab leads." },
  { week: "Week 1–2", title: "Architecture & scope review", detail: "Founding memo review by track mentors and an independent peer." },
  { week: "Week 3–5", title: "Technical deep-work sprints", detail: "Access to shared labs and weekly tech reviews with domain panels." },
  { week: "Week 6", title: "Mid-cohort checkpoint", detail: "Closed-door review with BDN program office + service advisors." },
  { week: "Week 7–9", title: "Compliance & IP sprint", detail: "Patent-desk engagement, export-control memo, and first investor briefings." },
  { week: "Week 10–11", title: "Pilot & field-trial prep", detail: "Lab-to-field transition support for eligible tracks." },
  { week: "Week 12", title: "Capstone demo", detail: "Cohort demo day at Summit / Showcase with investor and DPSU audience." },
];

export const currentCohort = {
  name: "Bharat Incubate '26 · Cohort B",
  applicationsOpenUntil: "2026-07-15",
  startDate: "2026-09-01",
  endDate: "2026-12-21",
  demoDay: "2026-12-19 · Bharat Defence Summit capstone track",
  cohortSize: 18,
  applied: 412,
  shortlisted: 64,
  confirmed: 6,
};

export const pastCohorts = [
  { name: "Cohort A '26", graduated: 15, grantsUnlocked: "₹62 Cr", pilots: 9 },
  { name: "Cohort B '25", graduated: 12, grantsUnlocked: "₹48 Cr", pilots: 7 },
  { name: "Cohort A '25", graduated: 14, grantsUnlocked: "₹54 Cr", pilots: 8 },
];

export const screeningCommittee = [
  { name: "Dr. Anjali Kapoor", role: "Chair", org: "DG, BDN" },
  { name: "Gen. (Dr.) R. Khatri (retd.)", role: "Strategic review", org: "NSAB" },
  { name: "Arunima Sen", role: "Capital view", org: "Cornerstone Defence Partners" },
  { name: "Dr. K. Iyer", role: "Technical chair · sensors & GNC", org: "RCI" },
  { name: "Nikhil Menon", role: "DPSU interface", org: "HAL strategic programs" },
  { name: "Dr. Suresh V.", role: "Research review", org: "DRDO LRDE (emeritus)" },
];

export const cohortMentors = [
  { name: "Aarav Pillai", role: "Autonomy & swarm", org: "Skyops Defence" },
  { name: "Meghna Rao", role: "Space & GEOINT", org: "Sarvatra Systems" },
  { name: "Shreya Kulkarni", role: "SDR & comms", org: "Ashwin Radios" },
  { name: "Anoushka Das", role: "Maritime & sonar", org: "DeepReef Labs" },
  { name: "Aishwarya Nambiar", role: "RF / GaN hardware", org: "Vayu Spectrum" },
  { name: "Rohit Ambekar", role: "Land systems & integration", org: "Dhruv Defence" },
  { name: "Capt. R. Menon (retd.)", role: "Field operations", org: "BDN Field" },
  { name: "Vivek Oberoi", role: "GNC & simulation", org: "Oberoi Systems Research" },
];

export function getTrack(slug: string) {
  return tracks.find((t) => t.slug === slug);
}
