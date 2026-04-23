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
  sampleReplies: Reply[];
};

export const threads: Thread[] = [
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
