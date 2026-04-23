export type AgendaItem = {
  time: string;
  title: string;
  speaker?: string;
  org?: string;
  kind: "keynote" | "panel" | "demo" | "workshop" | "networking";
};

export type Event = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  kind: "Summit" | "Showcase" | "Pitch Day" | "Hackathon" | "Closed Door";
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  expectedAttendance: number;
  description: string;
  highlights: string[];
  featuredSpeakers: { name: string; role: string; org: string }[];
  agenda: AgendaItem[];
  isPast: boolean;
};

export const events: Event[] = [
  {
    id: "EVT-07",
    slug: "bharat-defence-summit-2026",
    name: "Bharat Defence Summit 2026",
    subtitle: "India's flagship defence innovation gathering · seventh edition",
    kind: "Summit",
    startDate: "2026-10-12",
    endDate: "2026-10-14",
    location: "New Delhi",
    venue: "Bharat Mandapam · Pragati Maidan",
    expectedAttendance: 4200,
    description:
      "Three days of serious, strategic convergence — bringing together services, DPSUs, startups, universities, investors, and global partners. Focus areas: autonomy, sovereign compute, space ISR, high-altitude capability, and industrial base scale-up.",
    highlights: [
      "Plenary: Roadmap for indigenous defence-tech 2030",
      "Closed-door: Services-industry CTO roundtable",
      "Live demos: 40+ startups across 6 capability halls",
      "Investor day: ₹1,200 Cr+ capital in the room",
    ],
    featuredSpeakers: [
      { name: "Gen. (Dr.) R. Khatri (retd.)", role: "National Security Advisory Board", org: "NSAB" },
      { name: "Dr. Anjali Kapoor", role: "DG, BDN Foundation", org: "Bharat Defence Network" },
      { name: "Nikhil Menon", role: "Chief, Strategic Programs", org: "HAL" },
      { name: "Arunima Sen", role: "Managing Partner", org: "Cornerstone Defence Partners" },
      { name: "Lt. Gen. P. Rao (retd.)", role: "Former Vice Chief", org: "Indian Army" },
      { name: "Sanjana Iyer", role: "Director, Space Programs", org: "IN-SPACe" },
    ],
    agenda: [
      { time: "Day 1 · 09:30", title: "Opening address — Sovereign capability in a contested decade", speaker: "Dr. Anjali Kapoor", org: "BDN", kind: "keynote" },
      { time: "Day 1 · 10:30", title: "Panel: Scaling India's defence-industrial base", kind: "panel" },
      { time: "Day 1 · 13:00", title: "Capability hall walkthrough — Autonomy & UAS", kind: "demo" },
      { time: "Day 1 · 16:00", title: "Workshop: Building dual-use from day one", speaker: "Arunima Sen", org: "Cornerstone", kind: "workshop" },
      { time: "Day 2 · 09:00", title: "Services-industry CTO roundtable (closed door)", kind: "panel" },
      { time: "Day 2 · 11:30", title: "Keynote: What the next war looks like", speaker: "Lt. Gen. P. Rao", org: "Indian Army", kind: "keynote" },
      { time: "Day 2 · 14:00", title: "Live demos: Space & sensors hall", kind: "demo" },
      { time: "Day 2 · 18:00", title: "Investor dinner & matchmaking", kind: "networking" },
      { time: "Day 3 · 09:30", title: "Pitch arena — 24 startups, 6 juries", kind: "demo" },
      { time: "Day 3 · 15:00", title: "Closing & BDN 2027 roadmap reveal", speaker: "Dr. Anjali Kapoor", org: "BDN", kind: "keynote" },
    ],
    isPast: false,
  },
  {
    id: "EVT-06",
    slug: "trishul-spring-showcase-2026",
    name: "Trishul Spring Showcase 2026",
    subtitle: "Semi-annual ecosystem showcase · spring edition",
    kind: "Showcase",
    startDate: "2026-05-22",
    endDate: "2026-05-23",
    location: "Bengaluru",
    venue: "HAL Convention Centre",
    expectedAttendance: 1800,
    description:
      "A focused two-day showcase of mid-year progress: project demos, procurement conversations, and targeted startup–DPSU collaborations.",
    highlights: [
      "16 curated project demos",
      "DPSU–startup speed-dating (180 meetings)",
      "Student hackathon finalists — Capability Bharat",
    ],
    featuredSpeakers: [
      { name: "Nikhil Menon", role: "Chief, Strategic Programs", org: "HAL" },
      { name: "Dr. Suresh V.", role: "Director", org: "DRDO LRDE" },
    ],
    agenda: [
      { time: "Day 1 · 10:00", title: "DPSU partnership clinics", kind: "workshop" },
      { time: "Day 1 · 14:00", title: "Live demos — Electronics & EW", kind: "demo" },
      { time: "Day 2 · 10:00", title: "Capability Bharat finals", kind: "demo" },
      { time: "Day 2 · 17:00", title: "Closing reception", kind: "networking" },
    ],
    isPast: false,
  },
  {
    id: "EVT-05",
    slug: "pitch-day-april-2026",
    name: "BDN Pitch Day · April 2026",
    subtitle: "Seed & Series-A startup day",
    kind: "Pitch Day",
    startDate: "2026-04-18",
    endDate: "2026-04-18",
    location: "Mumbai",
    venue: "Tata Hall, NCPA",
    expectedAttendance: 320,
    description:
      "A focused, closed-door pitch day pairing 18 BDN-onboarded startups with 40+ institutional and strategic investors.",
    highlights: ["18 startups pitching", "₹400 Cr+ capital represented", "Sector focus: Autonomy, EW, Space"],
    featuredSpeakers: [{ name: "Arunima Sen", role: "MP", org: "Cornerstone Defence Partners" }],
    agenda: [
      { time: "09:30", title: "Fireside — building in dual-use", kind: "keynote" },
      { time: "10:30", title: "Pitch block A (9 startups)", kind: "demo" },
      { time: "14:00", title: "Pitch block B (9 startups)", kind: "demo" },
      { time: "17:30", title: "Deal-room rotations", kind: "networking" },
    ],
    isPast: true,
  },
  {
    id: "EVT-04",
    slug: "bharat-defence-summit-2025",
    name: "Bharat Defence Summit 2025",
    subtitle: "Sixth edition · recap available",
    kind: "Summit",
    startDate: "2025-10-07",
    endDate: "2025-10-09",
    location: "New Delhi",
    venue: "Bharat Mandapam",
    expectedAttendance: 3600,
    description:
      "The sixth edition brought together 3,600+ attendees, 52 startup demos, and 210+ services-industry meetings. The BDN Capability Bharat 2025 cohort was revealed.",
    highlights: ["52 startup demos", "210 closed-door meetings", "₹680 Cr capital committed"],
    featuredSpeakers: [
      { name: "Gen. (Dr.) R. Khatri (retd.)", role: "NSAB", org: "NSAB" },
      { name: "Dr. Anjali Kapoor", role: "DG", org: "BDN" },
    ],
    agenda: [
      { time: "Day 1", title: "Plenary + capability hall walkthroughs", kind: "keynote" },
      { time: "Day 2", title: "Services-industry CTO tracks", kind: "panel" },
      { time: "Day 3", title: "Investor day + closing", kind: "demo" },
    ],
    isPast: true,
  },
  {
    id: "EVT-03",
    slug: "capability-bharat-hackathon-2025",
    name: "Capability Bharat Hackathon 2025",
    subtitle: "72-hour student build sprint across 14 campuses",
    kind: "Hackathon",
    startDate: "2025-08-15",
    endDate: "2025-08-17",
    location: "14 campuses (virtual + onsite)",
    venue: "IIT Madras (hub)",
    expectedAttendance: 1200,
    description:
      "A 72-hour nation-wide build sprint with 60 problem cards, mentorship from DRDO scientists and industry veterans, and ₹45L in prize pools.",
    highlights: ["60 problem cards", "198 teams submitted", "12 winning teams onboarded"],
    featuredSpeakers: [{ name: "Dr. K. Iyer", role: "Principal investigator", org: "RCI" }],
    agenda: [
      { time: "Day 1 · 18:00", title: "Kick-off + problem reveal", kind: "keynote" },
      { time: "Day 2", title: "Mentor clinics", kind: "workshop" },
      { time: "Day 3 · 18:00", title: "Pitches + winner reveal", kind: "demo" },
    ],
    isPast: true,
  },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export const nextSummit = events.find((e) => !e.isPast && e.kind === "Summit");
