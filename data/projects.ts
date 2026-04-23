import type { Domain } from "./domains";

export type Maintainer = { name: string; role: string; org: string };

export type ProjectActivity = {
  t: string;
  actor: string;
  kind: "commit" | "issue" | "release" | "review" | "milestone";
  message: string;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  domain: Domain;
  tags: string[];
  stage: "Concept" | "Prototype" | "Pilot" | "Production";
  license: "Apache-2.0" | "MIT" | "BSD-3-Clause" | "Proprietary" | "Restricted" | "Custom BDN";
  stars: number;
  forks: number;
  contributors: number;
  commits: number;
  openIssues: number;
  openPRs: number;
  lastCommitDaysAgo: number;
  lastReleaseDaysAgo: number;
  languages: { name: string; pct: number; color: string }[];
  maintainers: Maintainer[];
  linkedProblems: string[];
  linkedStartup?: string;
  activity: ProjectActivity[];
  classification: "Open" | "Restricted" | "Member-only";
};

export const projects: Project[] = [
  {
    id: "PRJ-013",
    slug: "project-nayan",
    name: "project-nayan",
    tagline:
      "High-level reference architecture and 6-DOF simulation stack for a precision guidance retrofit concept.",
    description:
      "Project Nayan is a simulation-first reference architecture for a precision guidance retrofit package targeted at legacy strike systems. The project is explicitly non-operational: it is a systems-engineering, modelling, and integration-study workstream intended for peer review, academic collaboration, and subsystem research. Scope includes a 6-DOF simulation harness, a seeker-in-the-loop HIL scaffolding, avionics retrofit studies, and a modular sensor-fusion architecture. Build instructions, propellant, or lethality specifics are out of scope and not published.",
    domain: "AI & Autonomy",
    tags: ["GNC", "Simulation", "Retrofit", "Systems architecture", "HIL", "6-DOF"],
    stage: "Prototype",
    license: "Restricted",
    stars: 486,
    forks: 22,
    contributors: 14,
    commits: 874,
    openIssues: 12,
    openPRs: 4,
    lastCommitDaysAgo: 1,
    lastReleaseDaysAgo: 11,
    languages: [
      { name: "C++", pct: 44, color: "#E07A2B" },
      { name: "Python", pct: 28, color: "#5EB8C4" },
      { name: "MATLAB", pct: 16, color: "#E4B458" },
      { name: "Rust", pct: 12, color: "#7DD3A8" },
    ],
    maintainers: [
      { name: "Vivek Oberoi", role: "Research lead · architecture", org: "Oberoi Systems Research" },
      { name: "Dr. K. Iyer", role: "Advisor · sensors & navigation", org: "RCI" },
      { name: "Pranav Sethi", role: "Guidance simulation WG", org: "Prahaar Tactical" },
    ],
    linkedProblems: ["PRB-0413", "PRB-0408"],
    classification: "Restricted",
    activity: [
      { t: "2h ago", actor: "vivek", kind: "commit", message: "sim6dof: decouple airframe model from guidance law for comparative studies" },
      { t: "9h ago", actor: "vivek", kind: "review", message: "approved #104 — sensor-fusion scaffold with ESKF baseline" },
      { t: "1d ago", actor: "kiyer", kind: "issue", message: "#117: document assumption envelope for HIL scaffolding" },
      { t: "3d ago", actor: "ci-bot", kind: "release", message: "v0.4.0 — architecture memo + simulation harness (restricted access)" },
      { t: "6d ago", actor: "vivek", kind: "milestone", message: "Milestone M2 · architecture peer-review cycle opened to GNC Lab members" },
    ],
  },
  {
    id: "PRJ-001",
    slug: "garuda-swarm-stack",
    name: "garuda-swarm-stack",
    tagline: "Open-architecture swarm autonomy stack for Class-I UAS.",
    description:
      "A modular flight autonomy stack combining ROS2 mid-layer, RTK-free visual-inertial pose estimation, and a decentralised task-assignment planner for swarms of 8–32 drones. Built for Indian operating conditions: high dust, high altitude, poor GPS.",
    domain: "UAS / Drones",
    tags: ["ROS2", "Autonomy", "Swarm", "Visual-Inertial"],
    stage: "Pilot",
    license: "Apache-2.0",
    stars: 1820,
    forks: 214,
    contributors: 46,
    commits: 4129,
    openIssues: 38,
    openPRs: 12,
    lastCommitDaysAgo: 1,
    lastReleaseDaysAgo: 9,
    languages: [
      { name: "C++", pct: 52, color: "#E07A2B" },
      { name: "Python", pct: 29, color: "#5EB8C4" },
      { name: "Rust", pct: 12, color: "#7DD3A8" },
      { name: "CMake", pct: 7, color: "#E4B458" },
    ],
    maintainers: [
      { name: "Aarav Pillai", role: "Lead maintainer", org: "IIT Madras Aerospace" },
      { name: "Leena Fernandes", role: "Autonomy WG", org: "Skyops Labs" },
      { name: "Rakesh Varma", role: "Perception", org: "Independent" },
    ],
    linkedProblems: ["PRB-0412"],
    linkedStartup: "Skyops Defence",
    classification: "Open",
    activity: [
      { t: "2h ago", actor: "aarav", kind: "commit", message: "planner: switch to market-based assignment for >16 agents" },
      { t: "6h ago", actor: "leena", kind: "review", message: "approved #812 — EW-hardened fallback radio profile" },
      { t: "1d ago", actor: "rakesh", kind: "issue", message: "#835: VIO drift above 4500m tracked" },
      { t: "3d ago", actor: "ci-bot", kind: "release", message: "v0.9.2 — rehearsed flight packs" },
      { t: "1w ago", actor: "aarav", kind: "milestone", message: "Milestone M3: 24-agent hover + recovery passed" },
    ],
  },
  {
    id: "PRJ-002",
    slug: "nirikshan-sar-pipeline",
    name: "nirikshan-sar-pipeline",
    tagline: "Ground-segment SAR ingestion and change-detection pipeline.",
    description:
      "End-to-end pipeline for X-band SAR scenes: ingestion, speckle filtering, coherence-change detection, and vessel classification. Built for air-gapped deployment.",
    domain: "Space",
    tags: ["SAR", "Change detection", "MLOps", "Air-gapped"],
    stage: "Pilot",
    license: "Custom BDN",
    stars: 742,
    forks: 84,
    contributors: 28,
    commits: 2310,
    openIssues: 21,
    openPRs: 6,
    lastCommitDaysAgo: 2,
    lastReleaseDaysAgo: 14,
    languages: [
      { name: "Python", pct: 61, color: "#5EB8C4" },
      { name: "Rust", pct: 22, color: "#7DD3A8" },
      { name: "CUDA", pct: 11, color: "#E07A2B" },
      { name: "Shell", pct: 6, color: "#E4B458" },
    ],
    maintainers: [
      { name: "Meghna Rao", role: "Tech lead", org: "Sarvatra Systems" },
      { name: "Karthik Bansal", role: "Perception", org: "IIIT Hyderabad" },
    ],
    linkedProblems: ["PRB-0404"],
    linkedStartup: "Sarvatra Systems",
    classification: "Member-only",
    activity: [
      { t: "4h ago", actor: "meghna", kind: "commit", message: "coh-change: refactor tile cache — 1.6x throughput" },
      { t: "1d ago", actor: "karthik", kind: "issue", message: "#241: false-alarm cluster on coastal tidal shift" },
      { t: "3d ago", actor: "bdn-ops", kind: "release", message: "v1.4.0 — air-gapped deploy recipe" },
    ],
  },
  {
    id: "PRJ-003",
    slug: "himalaya-pack-fuelcell",
    name: "himalaya-pack-fuelcell",
    tagline: "Soldier-wearable hybrid fuel-cell energy pack firmware + BMS.",
    description:
      "Firmware, battery management, and safety logic for a 72-hour high-altitude soldier energy pack. Hardware reference available under NDA. Compliant with MIL-STD-810H where applicable.",
    domain: "Energy & Propulsion",
    tags: ["Fuel cell", "BMS", "Embedded", "HAL"],
    stage: "Prototype",
    license: "Restricted",
    stars: 331,
    forks: 22,
    contributors: 14,
    commits: 982,
    openIssues: 9,
    openPRs: 3,
    lastCommitDaysAgo: 4,
    lastReleaseDaysAgo: 21,
    languages: [
      { name: "C", pct: 66, color: "#E4B458" },
      { name: "C++", pct: 22, color: "#E07A2B" },
      { name: "Rust", pct: 12, color: "#7DD3A8" },
    ],
    maintainers: [
      { name: "Priyanshu Tandon", role: "Systems lead", org: "HimShakti" },
      { name: "Neha Gokhale", role: "Thermal", org: "IIT Delhi" },
    ],
    linkedProblems: ["PRB-0410"],
    linkedStartup: "HimShakti Energy",
    classification: "Restricted",
    activity: [
      { t: "1d ago", actor: "priyanshu", kind: "commit", message: "bms: low-temp chemistry profile for -30°C cold-start" },
      { t: "2d ago", actor: "neha", kind: "review", message: "approved thermal simulation update" },
      { t: "1w ago", actor: "bdn-ops", kind: "milestone", message: "Field trial window booked at DRDO DIPAS" },
    ],
  },
  {
    id: "PRJ-004",
    slug: "trishul-sdr-mesh",
    name: "trishul-sdr-mesh",
    tagline: "Software-defined mesh for forward-post tactical comms.",
    description:
      "A waveform-agile, frequency-hopping SDR mesh targeting LPI/LPD forward-post communications. Supports post-quantum key exchange and graceful degradation under contested spectrum.",
    domain: "Communications",
    tags: ["SDR", "LPI/LPD", "Mesh", "Post-quantum"],
    stage: "Pilot",
    license: "Restricted",
    stars: 612,
    forks: 58,
    contributors: 22,
    commits: 1794,
    openIssues: 17,
    openPRs: 4,
    lastCommitDaysAgo: 3,
    lastReleaseDaysAgo: 30,
    languages: [
      { name: "C++", pct: 48, color: "#E07A2B" },
      { name: "VHDL", pct: 28, color: "#5EB8C4" },
      { name: "Python", pct: 16, color: "#7DD3A8" },
      { name: "Rust", pct: 8, color: "#E4B458" },
    ],
    maintainers: [
      { name: "Shreya Kulkarni", role: "Tech lead", org: "Ashwin Radios" },
      { name: "Vivaan Chhabra", role: "Crypto WG", org: "IIT Kanpur" },
      { name: "Vivek Oberoi", role: "Contributor · embedded timing", org: "Oberoi Systems Research" },
    ],
    linkedProblems: ["PRB-0409"],
    linkedStartup: "Ashwin Radios",
    classification: "Member-only",
    activity: [
      { t: "7h ago", actor: "shreya", kind: "commit", message: "hopper: adaptive dwell under partial-band jam" },
      { t: "2d ago", actor: "vivaan", kind: "commit", message: "pqkem: kyber-768 handshake wire format locked" },
      { t: "6d ago", actor: "ci-bot", kind: "release", message: "v0.6.0 — field-trial candidate" },
    ],
  },
  {
    id: "PRJ-005",
    slug: "antar-sonar-edge",
    name: "antar-sonar-edge",
    tagline: "Edge AI sonar classifier for shallow-water ops.",
    description:
      "A compact passive sonar classifier designed to run on an 18W edge module inside AUVs and dipping sonar pods. Online re-training, operator-annotated feedback loops.",
    domain: "Maritime",
    tags: ["Sonar", "Edge AI", "ONNX"],
    stage: "Prototype",
    license: "Custom BDN",
    stars: 418,
    forks: 46,
    contributors: 18,
    commits: 1103,
    openIssues: 11,
    openPRs: 5,
    lastCommitDaysAgo: 1,
    lastReleaseDaysAgo: 12,
    languages: [
      { name: "Python", pct: 47, color: "#5EB8C4" },
      { name: "C++", pct: 34, color: "#E07A2B" },
      { name: "Rust", pct: 12, color: "#7DD3A8" },
      { name: "CUDA", pct: 7, color: "#E4B458" },
    ],
    maintainers: [
      { name: "Anoushka Das", role: "Lead", org: "DeepReef Labs" },
      { name: "Subash Iyer", role: "Embedded", org: "NSTL" },
    ],
    linkedProblems: ["PRB-0411"],
    linkedStartup: "DeepReef Labs",
    classification: "Member-only",
    activity: [
      { t: "3h ago", actor: "anoushka", kind: "commit", message: "classifier: add FM-hull signature class" },
      { t: "1d ago", actor: "subash", kind: "commit", message: "edge-runtime: ONNX quantisation down to 4.2 MB" },
    ],
  },
  {
    id: "PRJ-006",
    slug: "vayu-ew-pod",
    name: "vayu-ew-pod",
    tagline: "Open reference design for pod-mounted GaN EW front-end.",
    description:
      "Hardware and firmware references for a 2–18 GHz GaN EW front-end including thermal, mechanical, and BIT subsystems.",
    domain: "Electronics & EW",
    tags: ["GaN", "EW", "Mechanical", "Firmware"],
    stage: "Prototype",
    license: "Custom BDN",
    stars: 289,
    forks: 31,
    contributors: 12,
    commits: 654,
    openIssues: 8,
    openPRs: 2,
    lastCommitDaysAgo: 6,
    lastReleaseDaysAgo: 28,
    languages: [
      { name: "VHDL", pct: 46, color: "#5EB8C4" },
      { name: "C", pct: 32, color: "#E4B458" },
      { name: "KiCad", pct: 16, color: "#E07A2B" },
      { name: "Python", pct: 6, color: "#7DD3A8" },
    ],
    maintainers: [{ name: "Aishwarya Nambiar", role: "RF lead", org: "Vayu Spectrum" }],
    linkedProblems: ["PRB-0407"],
    linkedStartup: "Vayu Spectrum",
    classification: "Restricted",
    activity: [
      { t: "2d ago", actor: "aishwarya", kind: "commit", message: "lna: -126 dBm noise-floor verified at 8 GHz" },
      { t: "1w ago", actor: "ci-bot", kind: "release", message: "v0.3.1 — carrier board rev-B gerbers" },
    ],
  },
  {
    id: "PRJ-007",
    slug: "raksha-sim-section-vr",
    name: "raksha-sim-section-vr",
    tagline: "Section-level immersive VR training for infantry units.",
    description:
      "Full-body tracked VR for 12-soldier section drills with cross-service content packs and instructor override.",
    domain: "Simulation & Training",
    tags: ["VR", "Training", "Unreal Engine"],
    stage: "Production",
    license: "Proprietary",
    stars: 167,
    forks: 14,
    contributors: 19,
    commits: 812,
    openIssues: 6,
    openPRs: 1,
    lastCommitDaysAgo: 2,
    lastReleaseDaysAgo: 8,
    languages: [
      { name: "C++", pct: 58, color: "#E07A2B" },
      { name: "Blueprint", pct: 26, color: "#5EB8C4" },
      { name: "Python", pct: 16, color: "#7DD3A8" },
    ],
    maintainers: [{ name: "Kartik Joshi", role: "Studio lead", org: "Raksha Interactive" }],
    linkedProblems: ["PRB-0398"],
    linkedStartup: "Raksha Interactive",
    classification: "Member-only",
    activity: [
      { t: "1d ago", actor: "kartik", kind: "release", message: "v2.1 — contested CQB pack" },
      { t: "4d ago", actor: "bdn-ops", kind: "milestone", message: "Rollout to Mhow completed" },
    ],
  },
  {
    id: "PRJ-008",
    slug: "bharat-ins-rlg",
    name: "bharat-ins-rlg",
    tagline: "Indigenous ring-laser gyroscope reference module.",
    description:
      "Mechanical, optical, and electronics reference for a tactical-grade RLG IMU. Intended to catalyse a domestic supply chain.",
    domain: "Sensors",
    tags: ["RLG", "IMU", "Navigation"],
    stage: "Concept",
    license: "Restricted",
    stars: 124,
    forks: 9,
    contributors: 8,
    commits: 432,
    openIssues: 12,
    openPRs: 0,
    lastCommitDaysAgo: 9,
    lastReleaseDaysAgo: 60,
    languages: [
      { name: "C", pct: 41, color: "#E4B458" },
      { name: "MATLAB", pct: 28, color: "#E07A2B" },
      { name: "Verilog", pct: 20, color: "#5EB8C4" },
      { name: "Python", pct: 11, color: "#7DD3A8" },
    ],
    maintainers: [{ name: "Dr. K. Iyer", role: "Principal investigator", org: "RCI Hyderabad" }],
    linkedProblems: ["PRB-0408"],
    classification: "Restricted",
    activity: [
      { t: "5d ago", actor: "kiyer", kind: "milestone", message: "Cavity-finesse target revised after bench sweeps" },
    ],
  },
  {
    id: "PRJ-009",
    slug: "sankalp-logistics-twin",
    name: "sankalp-logistics-twin",
    tagline: "Digital twin for Eastern Command logistics flows.",
    description:
      "A digital twin ingesting road, rail, and air logistics feeds to forecast bottlenecks 72 hours ahead.",
    domain: "Logistics",
    tags: ["Digital twin", "OR", "React"],
    stage: "Pilot",
    license: "MIT",
    stars: 198,
    forks: 24,
    contributors: 16,
    commits: 576,
    openIssues: 7,
    openPRs: 3,
    lastCommitDaysAgo: 2,
    lastReleaseDaysAgo: 11,
    languages: [
      { name: "TypeScript", pct: 48, color: "#5EB8C4" },
      { name: "Python", pct: 34, color: "#7DD3A8" },
      { name: "Go", pct: 18, color: "#E07A2B" },
    ],
    maintainers: [{ name: "Mahesh Bora", role: "Lead", org: "Sankalp OR" }],
    linkedProblems: ["PRB-0405"],
    linkedStartup: "Sankalp Systems",
    classification: "Member-only",
    activity: [
      { t: "8h ago", actor: "mahesh", kind: "commit", message: "forecaster: monsoon disruption priors updated" },
      { t: "3d ago", actor: "ci-bot", kind: "release", message: "v0.5.0 — commander UI refresh" },
    ],
  },
  {
    id: "PRJ-010",
    slug: "dhruv-aps",
    name: "dhruv-aps",
    tagline: "Active protection system — sensor fusion & countermunition control.",
    description:
      "Core software stack for a tracked-vehicle APS: radar/IR fusion, threat tracking, countermunition selection, and vehicle-integration SDK.",
    domain: "Land Systems",
    tags: ["APS", "Sensor fusion", "Control"],
    stage: "Prototype",
    license: "Restricted",
    stars: 302,
    forks: 18,
    contributors: 21,
    commits: 1220,
    openIssues: 14,
    openPRs: 6,
    lastCommitDaysAgo: 3,
    lastReleaseDaysAgo: 40,
    languages: [
      { name: "C++", pct: 67, color: "#E07A2B" },
      { name: "Rust", pct: 22, color: "#7DD3A8" },
      { name: "Python", pct: 11, color: "#5EB8C4" },
    ],
    maintainers: [{ name: "Rohit Ambekar", role: "Chief engineer", org: "Dhruv Defence" }],
    linkedProblems: ["PRB-0406"],
    linkedStartup: "Dhruv Defence",
    classification: "Restricted",
    activity: [
      { t: "2d ago", actor: "rohit", kind: "commit", message: "tracker: IMM-UKF switch stability improved" },
      { t: "2w ago", actor: "bdn-ops", kind: "milestone", message: "Live-fire bench test at CVRDE Avadi passed" },
    ],
  },
  {
    id: "PRJ-011",
    slug: "prahaar-counter-uas-kill-link",
    name: "prahaar-counter-uas-kill-link",
    tagline: "Modular kinetic interceptor kill-link for C-UAS.",
    description:
      "Interceptor guidance & control, C2 integration, and logistics planning tools for a low-cost C-UAS kinetic system.",
    domain: "UAS / Drones",
    tags: ["C-UAS", "GNC", "Kinetic"],
    stage: "Prototype",
    license: "Restricted",
    stars: 221,
    forks: 15,
    contributors: 11,
    commits: 644,
    openIssues: 10,
    openPRs: 4,
    lastCommitDaysAgo: 1,
    lastReleaseDaysAgo: 18,
    languages: [
      { name: "C++", pct: 55, color: "#E07A2B" },
      { name: "Rust", pct: 25, color: "#7DD3A8" },
      { name: "Python", pct: 14, color: "#5EB8C4" },
      { name: "CMake", pct: 6, color: "#E4B458" },
    ],
    maintainers: [{ name: "Pranav Sethi", role: "GNC lead", org: "Prahaar Tactical" }],
    linkedProblems: ["PRB-0412"],
    linkedStartup: "Prahaar Tactical",
    classification: "Member-only",
    activity: [
      { t: "6h ago", actor: "pranav", kind: "commit", message: "guidance: terminal-phase lock under partial GPS denial" },
    ],
  },
  {
    id: "PRJ-012",
    slug: "netra-optronics",
    name: "netra-optronics",
    tagline: "Indigenous Gen-III night vision — control electronics.",
    description:
      "Reference control electronics, gain-stage calibration, and production-line test harness for an indigenous Gen-III image intensifier.",
    domain: "Sensors",
    tags: ["Night vision", "Optronics", "Firmware"],
    stage: "Prototype",
    license: "Restricted",
    stars: 108,
    forks: 6,
    contributors: 9,
    commits: 312,
    openIssues: 5,
    openPRs: 2,
    lastCommitDaysAgo: 5,
    lastReleaseDaysAgo: 24,
    languages: [
      { name: "C", pct: 58, color: "#E4B458" },
      { name: "Verilog", pct: 24, color: "#5EB8C4" },
      { name: "Python", pct: 18, color: "#7DD3A8" },
    ],
    maintainers: [{ name: "Col. D. Menon", role: "Sponsor lead", org: "Infantry Directorate" }],
    linkedProblems: ["PRB-0401"],
    classification: "Restricted",
    activity: [
      { t: "3d ago", actor: "col-menon", kind: "milestone", message: "Photocathode yield >72% on pilot batch" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
