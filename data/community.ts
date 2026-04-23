export type Reply = {
  author: string;
  role: string;
  content: string;
  when: string;
  upvotes: number;
};

export type Thread = {
  id: string;
  slug: string;
  title: string;
  body: string;
  author: string;
  authorRole: string;
  authorOrg: string;
  category: "Research" | "Hardware" | "Policy" | "Software" | "Operations" | "Meta" | "Careers";
  tags: string[];
  replies: number;
  upvotes: number;
  views: number;
  when: string;
  pinned?: boolean;
  solved?: boolean;
  memberOnly?: boolean;
  bookmarked?: boolean;
  kind?: "question" | "looking-for" | "announcement" | "discussion";
  sampleReplies: Reply[];
};

export const threads: Thread[] = [
  {
    id: "TH-423",
    slug: "materials-for-harsh-thermal-envelopes",
    title: "Materials survey — ruggedised composites for harsh thermal envelopes?",
    body:
      "Putting a materials shortlist together for a ruggedised embedded enclosure that needs to survive a wide thermal operating envelope. Looking for community input on high-temperature polymer composites, ceramic matrix options, and realistic supplier-side lead times in India. High-level survey only — no formulation specifics needed.",
    author: "Neha Gokhale",
    authorRole: "CTO, HimShakti",
    authorOrg: "HimShakti Energy",
    category: "Hardware",
    tags: ["Materials", "Thermal", "Composites"],
    replies: 23,
    upvotes: 164,
    views: 2_420,
    when: "18h ago",
    kind: "question",
    sampleReplies: [
      {
        author: "Vivek Oberoi",
        role: "Precision Guidance Research Lead · Oberoi Systems Research",
        content:
          "For a first-pass shortlist, I'd look at three categories before going deeper. (1) Polyimide-family composites (glass- or carbon-reinforced) for the middle of the envelope — mature supply chain domestically, predictable creep. (2) Oxide-ceramic matrix composites when you need the upper end of the envelope; IIT Madras and ARCI have done credible work, and HAL has references for fixture integration. (3) Phenolic/ablatives only at the extreme end — and only if you're pairing them with a clear thermal-management architecture. A practical tip: build a very small HIL thermal rig at IISc's MRC or the BDN Defence Simulation Lab before you commit to a supplier — the thermal cycling test results tend to separate the shortlist faster than a spec sheet will. Happy to share our GNC-side enclosure survey under a BDN member NDA if it helps.",
        when: "11h ago",
        upvotes: 92,
      },
      {
        author: "Dr. K. Iyer",
        role: "RCI Hyderabad",
        content:
          "Seconding Vivek's point on HIL thermal cycling. If you need access to environmental chambers, the BDN Defence Simulation Lab has two open slots per quarter for member teams.",
        when: "7h ago",
        upvotes: 41,
      },
    ],
  },
  {
    id: "TH-422",
    slug: "looking-for-6dof-simulation-collaborators",
    title: "Looking for: 6-DOF simulation collaborators for a retrofit guidance architecture study",
    body:
      "Opening up a collaboration slot on Project Nayan — the precision guidance retrofit architecture study. I'm specifically looking for: (a) campus GNC groups willing to run a 6-DOF simulation sweep against the v0.4 architecture memo, (b) a sensor-fusion engineer with an ESKF/UKF background who can peer-review the fusion scaffolding, and (c) a materials researcher interested in the enclosure thermal envelope. This is a simulation and architecture collaboration — strictly no build-guide work. BDN GNC Lab members can DM directly; others can reply here and I'll route via the BDN collaboration desk.",
    author: "Vivek Oberoi",
    authorRole: "Precision Guidance Research Lead · Oberoi Systems Research",
    authorOrg: "Oberoi Systems Research",
    category: "Research",
    tags: ["GNC", "Simulation", "Collaboration", "Project Nayan"],
    replies: 17,
    upvotes: 128,
    views: 1_810,
    when: "1d ago",
    pinned: true,
    bookmarked: true,
    memberOnly: true,
    kind: "looking-for",
    sampleReplies: [
      {
        author: "Dr. K. Iyer",
        role: "RCI Hyderabad",
        content:
          "Happy to review the sensor-fusion scaffolding. I'll ping you via the GNC Lab channel with a review window.",
        when: "22h ago",
        upvotes: 36,
      },
      {
        author: "Pranav Sethi",
        role: "CEO, Prahaar Tactical",
        content:
          "Our team can run a 6-DOF sweep on a scoped parameter window. Will keep the scope strictly to architecture comparison, not trajectory optimisation.",
        when: "14h ago",
        upvotes: 24,
      },
    ],
  },
  {
    id: "TH-421",
    slug: "swarm-deconfliction-under-ew",
    title: "How are teams handling in-swarm deconfliction under EW denial?",
    body:
      "We're seeing 3–4% cross-track near-misses above 16 agents once the GNSS-aided beacon link degrades. Curious how others are handling fallback — peer-ranged VIO, acoustic, or something else?",
    author: "Aarav Pillai",
    authorRole: "Lead, Skyops Defence",
    authorOrg: "Skyops Defence",
    category: "Software",
    tags: ["Swarm", "Autonomy", "EW"],
    replies: 34,
    upvotes: 218,
    views: 3_410,
    when: "4h ago",
    pinned: true,
    sampleReplies: [
      {
        author: "Leena Fernandes",
        role: "Autonomy WG",
        content:
          "We moved to broadcast-only TDMA with IMU-derived pose priors as a fallback. Works up to 20 agents; above that it degrades but stays collision-free.",
        when: "3h ago",
        upvotes: 71,
      },
      {
        author: "Dr. K. Iyer",
        role: "RCI Hyderabad",
        content:
          "The classical approach is peer-ranged UWB backup. It survives narrow-band jam surprisingly well, but integration time matters. Happy to share our bench data under MoU.",
        when: "2h ago",
        upvotes: 48,
      },
    ],
  },
  {
    id: "TH-420",
    slug: "export-control-checklist-for-seed-startups",
    title: "Practical export-control checklist for seed-stage defence startups?",
    body:
      "We've been asked for export-control readiness by two investors in the same week. Anyone have a minimum-viable checklist that actually works for seed-stage teams?",
    author: "Anoushka Das",
    authorRole: "CEO, DeepReef",
    authorOrg: "DeepReef Labs",
    category: "Policy",
    tags: ["Policy", "Seed stage", "Export"],
    replies: 21,
    upvotes: 142,
    views: 2_180,
    when: "1d ago",
    solved: true,
    sampleReplies: [
      {
        author: "Arunima Sen",
        role: "MP, Cornerstone Defence Partners",
        content:
          "Three things minimum: (1) dual-use classification memo per SKU, (2) named-person control on source repos, (3) vendor-country log for critical components. I can share our portfolio template.",
        when: "23h ago",
        upvotes: 86,
      },
    ],
  },
  {
    id: "TH-419",
    slug: "sar-speckle-filter-gpus",
    title: "SAR speckle filter — best GPU memory pattern for air-gapped deploys?",
    body:
      "Running into fragmentation on 5000×5000 tiles with NLM on 24GB GPUs. Looking for a sharable best practice.",
    author: "Meghna Rao",
    authorRole: "CEO, Sarvatra",
    authorOrg: "Sarvatra Systems",
    category: "Research",
    tags: ["SAR", "GPU", "MLOps"],
    replies: 16,
    upvotes: 88,
    views: 1_420,
    when: "2d ago",
    sampleReplies: [
      {
        author: "Karthik Bansal",
        role: "Chief Scientist",
        content: "Tile with overlap, use pinned host buffers, and stream. We got 1.6x throughput.",
        when: "2d ago",
        upvotes: 29,
      },
    ],
  },
  {
    id: "TH-418",
    slug: "what-should-a-soldier-wearable-ui-feel-like",
    title: "What should a soldier-wearable UI feel like at 5000m?",
    body:
      "Our energy pack has a wrist UI and my instinct is that almost everything should be glance-able in under 200ms. What are others optimising for?",
    author: "Neha Gokhale",
    authorRole: "CTO, HimShakti",
    authorOrg: "HimShakti Energy",
    category: "Operations",
    tags: ["UX", "Wearables"],
    replies: 18,
    upvotes: 96,
    views: 1_830,
    when: "3d ago",
    sampleReplies: [
      {
        author: "Capt. R. Menon (retd.)",
        role: "Advisor",
        content: "Glove-safe targets: ≥ 44px taps, ≤ 3 states visible, haptic pulses for anything non-visual.",
        when: "3d ago",
        upvotes: 57,
      },
    ],
  },
  {
    id: "TH-417",
    slug: "gan-yield-strategy",
    title: "GaN-on-SiC yield strategy for mid-volume EW production",
    body:
      "We're hitting 62% yield on our first pilot batch. What's a realistic target before we take this to a DPSU supply agreement?",
    author: "Aishwarya Nambiar",
    authorRole: "CEO, Vayu Spectrum",
    authorOrg: "Vayu Spectrum",
    category: "Hardware",
    tags: ["GaN", "Semiconductors"],
    replies: 12,
    upvotes: 74,
    views: 980,
    when: "5d ago",
    memberOnly: true,
    sampleReplies: [
      {
        author: "Sh. V. Ramanathan",
        role: "BEL Strategic Fund",
        content: "For supply agreement conversations, 78% sustained over three batches is usually the bar. Below that, expect a jointly-funded yield improvement plan.",
        when: "5d ago",
        upvotes: 34,
      },
    ],
  },
  {
    id: "TH-416",
    slug: "hiring-rf-engineers-bengaluru",
    title: "Hiring RF engineers in Bengaluru — compensation reality check",
    body:
      "What's a realistic comp band for a 5-year RF engineer willing to work on defence projects (with some BGV)?",
    author: "Ravi Desai",
    authorRole: "COO, Vayu Spectrum",
    authorOrg: "Vayu Spectrum",
    category: "Careers",
    tags: ["Hiring", "RF"],
    replies: 9,
    upvotes: 62,
    views: 840,
    when: "1w ago",
    sampleReplies: [
      { author: "Shreya Kulkarni", role: "CEO, Ashwin Radios", content: "Market is 38–52 LPA for strong RF, plus equity. Defence clearance adds ~15% premium.", when: "1w ago", upvotes: 22 },
    ],
  },
  {
    id: "TH-415",
    slug: "logistics-twin-tidal",
    title: "Tidal and monsoon priors in logistics digital twin — data sources?",
    body:
      "Where are folks sourcing reasonable priors for monsoon-related road closures? IMD is a start but too coarse for tactical use.",
    author: "Mahesh Bora",
    authorRole: "CEO, Sankalp Systems",
    authorOrg: "Sankalp Systems",
    category: "Operations",
    tags: ["Logistics", "Data"],
    replies: 14,
    upvotes: 69,
    views: 1_120,
    when: "1w ago",
    sampleReplies: [
      { author: "Maj. Gen. T. Barua", role: "Eastern Command", content: "Combine IMD with state-level PWD road-block telex feeds — drop me a note and we'll help with access.", when: "1w ago", upvotes: 38 },
    ],
  },
  {
    id: "TH-414",
    slug: "patent-filing-cadence-early-stage",
    title: "Patent filing cadence for early-stage defence hardware",
    body:
      "Do we really need to file 3–4 provisionals in year one? What's the minimum portfolio that investors take seriously?",
    author: "Pranav Sethi",
    authorRole: "CEO, Prahaar Tactical",
    authorOrg: "Prahaar Tactical",
    category: "Policy",
    tags: ["Patents", "IP"],
    replies: 11,
    upvotes: 58,
    views: 760,
    when: "2w ago",
    sampleReplies: [
      { author: "Dr. Anjali Kapoor", role: "DG, BDN", content: "For hardware, 2 provisionals + 1 design filing is usually enough at seed. Quality over quantity.", when: "2w ago", upvotes: 41 },
    ],
  },
];

export function getThread(slug: string) {
  return threads.find((t) => t.slug === slug);
}
