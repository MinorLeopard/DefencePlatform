export type Member = {
  id: string;
  slug: string;
  name: string;
  role: string;
  org: string;
  location: string;
  badges: string[];
  contributions: number;
  domain: string;
  avatarSeed: string;
  tier?: "Verified Builder" | "Core Member" | "Summit Delegate" | "Advisor" | "Investor";
};

export type MemberProfile = Member & {
  headline: string;
  bio: string;
  focusAreas: string[];
  stats: {
    projectsContributed: number;
    challengeResponses: number;
    forumAnswers: number;
    collaborations: number;
    summitsAttended: number;
  };
  affiliations: string[];
  contact: { label: string; value: string }[];
  milestones: { when: string; title: string; detail: string }[];
  workingOn: { id: string; kind: "project" | "problem" | "lab"; title: string; href: string }[];
  looking: string[];
};

export const featuredMembers: Member[] = [
  {
    id: "M-0",
    slug: "vivek-oberoi",
    name: "Vivek Oberoi",
    role: "Precision Guidance Research Lead",
    org: "Oberoi Systems Research",
    location: "Hyderabad",
    badges: ["Core Member", "Summit Delegate '25", "GNC Lab lead"],
    contributions: 1_842,
    domain: "Guidance, Navigation & Control",
    avatarSeed: "vivek",
    tier: "Core Member",
  },
  { id: "M-1", slug: "aarav-pillai", name: "Aarav Pillai", role: "Founder & maintainer", org: "Skyops Defence", location: "Bengaluru", badges: ["Flagship maintainer", "Summit speaker"], contributions: 1_204, domain: "Autonomy", avatarSeed: "aarav", tier: "Verified Builder" },
  { id: "M-2", slug: "meghna-rao", name: "Meghna Rao", role: "CEO", org: "Sarvatra Systems", location: "Hyderabad", badges: ["Capability Bharat '25"], contributions: 842, domain: "GEOINT", avatarSeed: "meghna", tier: "Verified Builder" },
  { id: "M-3", slug: "k-iyer", name: "Dr. K. Iyer", role: "Principal investigator", org: "RCI", location: "Hyderabad", badges: ["Ecosystem anchor", "Mentor"], contributions: 611, domain: "Sensors", avatarSeed: "kiyer", tier: "Advisor" },
  { id: "M-4", slug: "arunima-sen", name: "Arunima Sen", role: "Managing Partner", org: "Cornerstone Defence Partners", location: "Mumbai", badges: ["Investor council"], contributions: 318, domain: "Capital", avatarSeed: "arunima", tier: "Investor" },
  { id: "M-5", slug: "anoushka-das", name: "Anoushka Das", role: "CEO", org: "DeepReef Labs", location: "Kochi", badges: ["Pitch Day winner"], contributions: 486, domain: "Maritime", avatarSeed: "anoushka", tier: "Verified Builder" },
  { id: "M-6", slug: "aishwarya-nambiar", name: "Aishwarya Nambiar", role: "CEO", org: "Vayu Spectrum", location: "Bengaluru", badges: ["Builder"], contributions: 292, domain: "EW", avatarSeed: "aish", tier: "Verified Builder" },
  { id: "M-7", slug: "r-menon", name: "Capt. R. Menon (retd.)", role: "Advisor", org: "BDN", location: "Coonoor", badges: ["Field advisor"], contributions: 214, domain: "Operations", avatarSeed: "menon", tier: "Advisor" },
  { id: "M-8", slug: "shreya-kulkarni", name: "Shreya Kulkarni", role: "CEO", org: "Ashwin Radios", location: "Pune", badges: ["Summit speaker"], contributions: 512, domain: "Comms", avatarSeed: "shreya", tier: "Verified Builder" },
];

export const memberProfiles: Record<string, MemberProfile> = {
  "vivek-oberoi": {
    id: "M-0",
    slug: "vivek-oberoi",
    name: "Vivek Oberoi",
    role: "Precision Guidance Research Lead",
    org: "Oberoi Systems Research",
    location: "Hyderabad",
    badges: ["Core Member", "Summit Delegate '25", "GNC Lab lead"],
    contributions: 1_842,
    domain: "Guidance, Navigation & Control",
    avatarSeed: "vivek",
    tier: "Core Member",
    headline:
      "Systems engineer working on a high-level, simulation-first precision guidance retrofit architecture for legacy strike platforms.",
    bio:
      "Vivek is a systems engineer and researcher working at the intersection of guidance, navigation and control, sensor fusion, and embedded compute. He leads Project Nayan — a simulation-heavy reference architecture for a precision guidance retrofit package, designed for peer review, modelling, and subsystem integration studies (not operational build-out). Outside his own project, he is active in the BDN GNC Lab, mentors student research groups on 6-DOF simulation, and contributes to community threads on materials, embedded compute, and simulation toolchains.",
    focusAreas: [
      "Guidance, navigation & control architectures",
      "Seeker-in-the-loop and HIL simulation",
      "Embedded flight-computer tradeoffs",
      "6-DOF modelling and verification",
      "Avionics retrofit systems studies",
      "Sensor fusion architecture",
    ],
    stats: {
      projectsContributed: 11,
      challengeResponses: 6,
      forumAnswers: 42,
      collaborations: 18,
      summitsAttended: 3,
    },
    affiliations: [
      "BDN GNC Lab — Core Member",
      "Oberoi Systems Research — Founder (solo-founder research studio)",
      "Capability Bharat '25 mentor panel",
    ],
    contact: [
      { label: "Public handle", value: "@vivek.oberoi" },
      { label: "Primary workstream", value: "Project Nayan" },
      { label: "Preferred collaboration", value: "Simulation / architecture review" },
    ],
    milestones: [
      { when: "Mar 2026", title: "Nayan v0.4 simulation release", detail: "Public 6-DOF + HIL harness released for peer review under restricted terms." },
      { when: "Oct 2025", title: "Summit '25 delegate", detail: "Contributed to the 'Simulation-first defence engineering' track." },
      { when: "Aug 2025", title: "GNC Lab Core Member", detail: "Invited to join BDN's Guidance, Navigation & Control Lab as a Core Member." },
      { when: "Jun 2025", title: "Capability Bharat '25 mentor", detail: "Mentored 3 campus teams on guidance-simulation projects." },
    ],
    workingOn: [
      { id: "PRJ-013", kind: "project", title: "Project Nayan — Precision Guidance Retrofit Platform", href: "/projects/project-nayan" },
      { id: "PRB-0413", kind: "problem", title: "Guidance modernisation concept for legacy strike systems", href: "/problems/guidance-modernisation-legacy-systems" },
      { id: "LAB-03", kind: "lab", title: "Guidance, Navigation & Control Lab", href: "/labs/guidance-navigation-control" },
    ],
    looking: [
      "6-DOF simulation collaborators from IIT campus GNC groups",
      "Materials researchers working on high-temperature composites",
      "Peer reviewers for the Nayan architecture memo (v0.4)",
      "Sensor-fusion engineers with a Kalman / UKF background",
    ],
  },
};

export function getMemberProfile(slug: string) {
  return memberProfiles[slug];
}

export const currentMember = featuredMembers[0];
