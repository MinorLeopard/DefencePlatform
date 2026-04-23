export type LabCategory =
  | "Autonomous Systems"
  | "Computer Vision & Sensing"
  | "Guidance, Navigation & Control"
  | "Defence Simulation"
  | "Embedded AI Systems"
  | "Human Performance & Training";

export type ResearchTrack = {
  title: string;
  summary: string;
};

export type LabTool = {
  name: string;
  kind: "Simulation" | "Dataset" | "Benchmark" | "Facility" | "Framework";
  description: string;
};

export type LabExperiment = {
  title: string;
  status: "Active" | "Peer review" | "Completed" | "Recruiting";
  lead: string;
  summary: string;
};

export type Lab = {
  id: string;
  slug: string;
  name: string;
  category: LabCategory;
  tagline: string;
  mission: string;
  locations: string[];
  leads: { name: string; role: string; org: string }[];
  metrics: { contributors: number; activeStudies: number; publicationsYTD: number; grantsLinked: number };
  tracks: ResearchTrack[];
  tools: LabTool[];
  experiments: LabExperiment[];
  partners: string[];
  linkedProblems: string[];
  linkedProjects: string[];
  collaborationModel: string;
  openCalls: string[];
};

export const labs: Lab[] = [
  {
    id: "LAB-01",
    slug: "autonomous-systems",
    name: "Autonomous Systems Lab",
    category: "Autonomous Systems",
    tagline: "Autonomy stacks, planner research, and swarm coordination studies.",
    mission:
      "A research environment for autonomy architectures — planners, policies, multi-agent coordination, and safety cases — across air, surface, and sub-surface platforms.",
    locations: ["IIT Madras satellite lab, Chennai", "BDN Bengaluru research bay"],
    leads: [
      { name: "Aarav Pillai", role: "Lab lead", org: "Skyops Defence" },
      { name: "Leena Fernandes", role: "Safety case WG", org: "Skyops Defence" },
    ],
    metrics: { contributors: 184, activeStudies: 9, publicationsYTD: 14, grantsLinked: 4 },
    tracks: [
      { title: "Decentralised task assignment", summary: "Market-based and consensus methods beyond 16 agents." },
      { title: "Safety cases for autonomy", summary: "Falsification-driven verification for mission autonomy." },
      { title: "Human-on-the-loop command", summary: "Handover semantics and mixed-initiative supervision." },
    ],
    tools: [
      { name: "Garuda-Sim", kind: "Simulation", description: "Distributed swarm simulation bed, up to 64 agents." },
      { name: "BDN Autonomy Benchmarks", kind: "Benchmark", description: "Reproducible autonomy evaluation suite." },
      { name: "India Terrain Corpus", kind: "Dataset", description: "Region-tagged terrain & weather priors for simulation." },
    ],
    experiments: [
      { title: "Cooperative ISR under partial GPS denial", status: "Active", lead: "Aarav Pillai", summary: "24-agent cooperative ISR study using VIO and peer ranging." },
      { title: "Mixed-initiative handover study", status: "Peer review", lead: "Leena Fernandes", summary: "Operator cognitive load during supervised autonomy handovers." },
    ],
    partners: ["IIT Madras Aerospace", "IISc CSA", "HAL Advanced Research"],
    linkedProblems: ["PRB-0412", "PRB-0399", "PRB-0403"],
    linkedProjects: ["PRJ-001", "PRJ-011"],
    collaborationModel:
      "Members apply for a track slot; campus groups can co-apply. Core facility time is allocated quarterly.",
    openCalls: ["2 slots · safety-case verification track", "1 campus slot · swarm coordination study"],
  },
  {
    id: "LAB-02",
    slug: "computer-vision-sensing",
    name: "Computer Vision & Sensing Lab",
    category: "Computer Vision & Sensing",
    tagline: "Perception systems, sensor fusion research, and evaluation benchmarks.",
    mission:
      "A sensing-first research environment covering passive optical, IR, SAR, sonar, and multi-modal fusion — with domain-grounded benchmarks for Indian operating conditions.",
    locations: ["IIIT Hyderabad wing", "BDN Hyderabad sensor bench"],
    leads: [
      { name: "Meghna Rao", role: "Lab lead", org: "Sarvatra Systems" },
      { name: "Dr. K. Iyer", role: "Sensor research chair", org: "RCI" },
    ],
    metrics: { contributors: 142, activeStudies: 11, publicationsYTD: 19, grantsLinked: 5 },
    tracks: [
      { title: "Domain-adaptive perception", summary: "Fine-tuning models for Indian climate and terrain domains." },
      { title: "SAR change detection", summary: "Coherence-based techniques for maritime and land monitoring." },
      { title: "Edge perception under power constraints", summary: "Perception below 20W envelopes for submersibles and UAS." },
    ],
    tools: [
      { name: "Nirikshan-Bench", kind: "Benchmark", description: "Reproducible SAR change-detection benchmark." },
      { name: "IOR Vessel Corpus", kind: "Dataset", description: "Curated multi-sensor vessel dataset across IOR." },
      { name: "Edge-Perception Harness", kind: "Framework", description: "Quantisation and profiling for edge inference." },
    ],
    experiments: [
      { title: "Coastal change detection under tidal noise", status: "Active", lead: "Meghna Rao", summary: "Coherence study with real IOR scenes." },
      { title: "Gen-III NVG calibration harness", status: "Completed", lead: "Dr. K. Iyer", summary: "Standardised calibration harness for domestic tube production." },
    ],
    partners: ["IIIT Hyderabad", "RCI", "ISRO SAC (advisory)"],
    linkedProblems: ["PRB-0411", "PRB-0404", "PRB-0401"],
    linkedProjects: ["PRJ-002", "PRJ-005", "PRJ-012"],
    collaborationModel:
      "Lab time is scheduled in two-week research sprints. Public benchmarks are open; restricted datasets require signed use agreements.",
    openCalls: ["3 member-team slots · edge-perception sprint"],
  },
  {
    id: "LAB-03",
    slug: "guidance-navigation-control",
    name: "Guidance, Navigation & Control Lab",
    category: "Guidance, Navigation & Control",
    tagline: "Simulation-first GNC research — architectures, fusion, and 6-DOF studies.",
    mission:
      "A simulation-first research lab focused on guidance, navigation, and control architectures. Work here is modelling, peer review, and integration-study oriented — not operational build-out. We welcome academic collaborators and verified member teams.",
    locations: ["BDN Hyderabad GNC bay", "RCI-affiliated simulation facility"],
    leads: [
      { name: "Vivek Oberoi", role: "Lab lead · Core Member", org: "Oberoi Systems Research" },
      { name: "Dr. K. Iyer", role: "Principal advisor", org: "RCI" },
      { name: "Pranav Sethi", role: "Simulation WG", org: "Prahaar Tactical" },
    ],
    metrics: { contributors: 76, activeStudies: 6, publicationsYTD: 8, grantsLinked: 2 },
    tracks: [
      { title: "Retrofit guidance architectures", summary: "High-level systems architecture studies for guidance modernisation." },
      { title: "6-DOF modelling & verification", summary: "Reproducible 6-DOF simulation harnesses and parameter sweeps." },
      { title: "Sensor-fusion scaffolding", summary: "ESKF / UKF scaffolds and cross-check methods for guidance." },
      { title: "Hardware-in-the-loop peer review", summary: "Peer-reviewed HIL scaffolds for architecture studies." },
    ],
    tools: [
      { name: "Nayan-Sim", kind: "Simulation", description: "6-DOF simulation harness for architecture comparison." },
      { name: "Nayan-HIL Scaffold", kind: "Framework", description: "HIL scaffolding for peer-reviewed integration studies." },
      { name: "GNC Architecture Memo Registry", kind: "Framework", description: "Registry of member-submitted architecture memos." },
    ],
    experiments: [
      { title: "Architecture memo v0.4 peer review", status: "Peer review", lead: "Vivek Oberoi", summary: "Open peer review of the Project Nayan architecture memo for BDN members." },
      { title: "ESKF vs UKF under simulated drift", status: "Active", lead: "Dr. K. Iyer", summary: "Comparative fusion study under simulated sensor drift profiles." },
      { title: "Campus 6-DOF sweep", status: "Recruiting", lead: "Pranav Sethi", summary: "Campus GNC groups invited to run a bounded 6-DOF sweep." },
    ],
    partners: ["RCI Hyderabad", "IIT Kanpur AE", "IISc Aerospace"],
    linkedProblems: ["PRB-0413", "PRB-0408"],
    linkedProjects: ["PRJ-013"],
    collaborationModel:
      "Member-only lab. Academic collaborators onboard through a signed research-use agreement. All work is scoped to architecture, modelling, and peer review — no operational content is produced or published.",
    openCalls: [
      "1 sensor-fusion peer reviewer (ESKF/UKF background)",
      "2 campus GNC groups · 6-DOF sweep slot",
      "1 materials researcher · thermal-envelope collaboration",
    ],
  },
  {
    id: "LAB-04",
    slug: "defence-simulation",
    name: "Defence Simulation Lab",
    category: "Defence Simulation",
    tagline: "High-fidelity simulation, synthetic environments, and digital twins.",
    mission:
      "A cross-domain simulation lab — synthetic environments, digital twins of bases and logistics flows, and verification harnesses that multiple labs reuse.",
    locations: ["BDN Pune simulation bay", "IISc MRC joint access"],
    leads: [
      { name: "Mahesh Bora", role: "Lab lead", org: "Sankalp Systems" },
      { name: "Kartik Joshi", role: "Training-sim WG", org: "Raksha Interactive" },
    ],
    metrics: { contributors: 98, activeStudies: 8, publicationsYTD: 11, grantsLinked: 3 },
    tracks: [
      { title: "Synthetic environments for Indian terrain", summary: "High-fidelity environmental priors across domains." },
      { title: "Logistics digital twins", summary: "Digital-twin methods for sustainment and convoy planning." },
      { title: "Shared verification harnesses", summary: "Reusable verification harnesses across GNC and autonomy." },
    ],
    tools: [
      { name: "Bharat-Env", kind: "Simulation", description: "High-fidelity environmental simulation for Indian regions." },
      { name: "Sankalp-Twin", kind: "Framework", description: "Logistics digital-twin toolkit." },
      { name: "Environmental chamber", kind: "Facility", description: "Thermal / vibration chambers for subsystem testing." },
    ],
    experiments: [
      { title: "Monsoon logistics twin", status: "Active", lead: "Mahesh Bora", summary: "72-hour forecasting for eastern-sector flows." },
      { title: "Cross-lab verification harness", status: "Peer review", lead: "Kartik Joshi", summary: "Shared harness for GNC and autonomy teams." },
    ],
    partners: ["IISc MRC", "IIT Bombay CSRE", "Eastern Command (data MoU)"],
    linkedProblems: ["PRB-0405", "PRB-0398"],
    linkedProjects: ["PRJ-007", "PRJ-009"],
    collaborationModel:
      "Open member access on a queue. Priority given to cross-lab verification requests and academic collaborations.",
    openCalls: ["2 slots / quarter · environmental chambers"],
  },
  {
    id: "LAB-05",
    slug: "embedded-ai-systems",
    name: "Embedded AI Systems Lab",
    category: "Embedded AI Systems",
    tagline: "On-device AI, compute-constrained inference, and hardware co-design.",
    mission:
      "A lab for embedded AI — compressing models, co-designing accelerators, and hitting power envelopes realistic for defence deployments.",
    locations: ["IIT Hyderabad partner bay", "BDN Bengaluru embedded bench"],
    leads: [
      { name: "Anoushka Das", role: "Lab lead", org: "DeepReef Labs" },
      { name: "Subash Iyer", role: "Embedded WG", org: "NSTL" },
    ],
    metrics: { contributors: 64, activeStudies: 7, publicationsYTD: 9, grantsLinked: 3 },
    tracks: [
      { title: "Model compression under rugged constraints", summary: "Quantisation and pruning for rugged, low-power targets." },
      { title: "Accelerator co-design", summary: "SoC-level co-design for on-device perception." },
      { title: "On-device continual learning", summary: "Online re-training with operator-labelled events." },
    ],
    tools: [
      { name: "Edge-Runtime", kind: "Framework", description: "Production-grade edge-inference runtime." },
      { name: "Low-power inference bench", kind: "Facility", description: "Calibrated bench for <20W inference profiling." },
    ],
    experiments: [
      { title: "Sonar classifier at 18W", status: "Active", lead: "Anoushka Das", summary: "Sub-18W inference on a deployed classifier." },
      { title: "Accelerator DSE sweep", status: "Recruiting", lead: "Subash Iyer", summary: "Design-space exploration for a reference accelerator." },
    ],
    partners: ["IIT Hyderabad CSE", "NSTL", "BEL Strategic Electronics"],
    linkedProblems: ["PRB-0411", "PRB-0407"],
    linkedProjects: ["PRJ-005", "PRJ-006"],
    collaborationModel:
      "Rolling member access; joint sprints with the Computer Vision lab.",
    openCalls: ["2 slots · accelerator co-design"],
  },
  {
    id: "LAB-06",
    slug: "human-performance-training",
    name: "Human Performance & Training Lab",
    category: "Human Performance & Training",
    tagline: "Immersive training, operator cognitive-load studies, and human-machine interfaces.",
    mission:
      "A human-factors lab for defence — training simulators, operator cognitive-load research, and HMI studies for supervised autonomy.",
    locations: ["ARTRAC partner facility, Shimla", "BDN Pune HMI bench"],
    leads: [
      { name: "Kartik Joshi", role: "Lab lead", org: "Raksha Interactive" },
      { name: "Neha Gokhale", role: "HMI WG", org: "HimShakti Energy" },
    ],
    metrics: { contributors: 52, activeStudies: 5, publicationsYTD: 6, grantsLinked: 2 },
    tracks: [
      { title: "Immersive section-level training", summary: "Full-body tracked VR for section drills." },
      { title: "Operator cognitive-load studies", summary: "Measuring cognitive load during supervised autonomy." },
      { title: "HMI for harsh environments", summary: "Glove-safe UX for high-altitude and rugged environments." },
    ],
    tools: [
      { name: "Raksha-Sim Training Packs", kind: "Framework", description: "Cross-service immersive training content packs." },
      { name: "Cognitive-load measurement rig", kind: "Facility", description: "Physiological measurement + instrumented VR." },
    ],
    experiments: [
      { title: "CQB pack pilot — Mhow", status: "Active", lead: "Kartik Joshi", summary: "Extended section-level CQB training evaluation." },
      { title: "Glove-safe wearable UX", status: "Peer review", lead: "Neha Gokhale", summary: "High-altitude wrist UI study." },
    ],
    partners: ["ARTRAC", "AFMC", "AIIMS Physiology (advisory)"],
    linkedProblems: ["PRB-0398", "PRB-0410"],
    linkedProjects: ["PRJ-007", "PRJ-003"],
    collaborationModel:
      "Study-by-study access; service-led evaluations prioritised.",
    openCalls: ["1 slot · cognitive-load sprint"],
  },
];

export const labMetricsAggregate = {
  labs: labs.length,
  contributors: labs.reduce((s, l) => s + l.metrics.contributors, 0),
  activeStudies: labs.reduce((s, l) => s + l.metrics.activeStudies, 0),
  publicationsYTD: labs.reduce((s, l) => s + l.metrics.publicationsYTD, 0),
  grantsLinked: labs.reduce((s, l) => s + l.metrics.grantsLinked, 0),
};

export function getLab(slug: string) {
  return labs.find((l) => l.slug === slug);
}
