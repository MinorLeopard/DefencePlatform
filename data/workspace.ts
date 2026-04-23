export type ActionItem = {
  id: string;
  title: string;
  context: string;
  due: string;
  priority: "P0" | "P1" | "P2";
  kind: "review" | "draft" | "apply" | "respond" | "lab" | "prep";
  linkedTo?: { label: string; href: string };
};

export type WorkspaceNotification = {
  id: string;
  when: string;
  actor: string;
  message: string;
  kind: "mention" | "review" | "lab" | "grant" | "dm" | "event" | "system";
  href: string;
  unread?: boolean;
  pinned?: boolean;
};

export type PeerReviewNote = {
  id: string;
  reviewer: string;
  role: string;
  section: string;
  summary: string;
  state: "open" | "addressed";
  when: string;
};

export type Collaboration = {
  id: string;
  with: string;
  org: string;
  intent: string;
  status: "Proposed" | "Active" | "Complete" | "Waiting";
  last: string;
};

export type ApplicationInProgress = {
  id: string;
  kind: "Incubation" | "Grant" | "Lab slot" | "Problem";
  name: string;
  status: "Drafting" | "Submitted" | "Screening" | "Shortlisted" | "Accepted";
  progress: number;
  updated: string;
  href?: string;
};

export type StudySlice = {
  id: string;
  title: string;
  lab: string;
  labHref: string;
  state: "Active" | "Peer review" | "Recruiting";
  progress: number;
  nextCheckpoint: string;
};

export const vivekWorkspace = {
  focus: [
    "Close Nayan v0.4 peer review by Apr 30",
    "Submit incubation application · Bharat Incubate Cohort B",
    "Kick off 6-DOF campus sweep with IIT Kanpur AE",
  ],
  actionItems: [
    {
      id: "AI-01",
      title: "Respond to Dr. K. Iyer's sensor-fusion review comments",
      context: "4 open comments on the Nayan v0.4 architecture memo · ESKF baseline section.",
      due: "Due Apr 27",
      priority: "P0",
      kind: "respond",
      linkedTo: { label: "project-nayan", href: "/projects/project-nayan" },
    },
    {
      id: "AI-02",
      title: "Draft PRB-0413 application memo",
      context: "Map your architecture memo to the GNC Lab evaluation gates.",
      due: "Due Apr 29",
      priority: "P0",
      kind: "draft",
      linkedTo: { label: "PRB-0413", href: "/problems/guidance-modernisation-legacy-systems" },
    },
    {
      id: "AI-03",
      title: "Submit Bharat Incubate application · Cohort B",
      context: "University Spinout Track · draft saved · 68% complete.",
      due: "Due Jul 15 · room to breathe",
      priority: "P1",
      kind: "apply",
      linkedTo: { label: "Bharat Incubate", href: "/startups/incubation" },
    },
    {
      id: "AI-04",
      title: "Intro message → IIT Kanpur AE (6-DOF sweep)",
      context: "Dr. Iyer has offered a warm intro; draft in assistant awaits your review.",
      due: "This week",
      priority: "P1",
      kind: "draft",
      linkedTo: { label: "GNC Lab · open call", href: "/labs/guidance-navigation-control" },
    },
    {
      id: "AI-05",
      title: "Thermal supplier shortlist · reply in TH-423",
      context: "Neha has asked for your top-two supplier leads by Friday.",
      due: "Fri",
      priority: "P2",
      kind: "respond",
      linkedTo: { label: "TH-423 · Materials for thermal envelopes", href: "/community" },
    },
    {
      id: "AI-06",
      title: "Book Defence Simulation Lab environmental chamber slot",
      context: "Two member slots available next quarter; block one for Nayan v0.5.",
      due: "Next window · Jul–Sep",
      priority: "P2",
      kind: "lab",
      linkedTo: { label: "Defence Simulation Lab", href: "/labs/defence-simulation" },
    },
  ] as ActionItem[],

  notifications: [
    {
      id: "N-01",
      when: "17m ago",
      actor: "Dr. K. Iyer",
      message: "Left 4 comments on Nayan v0.4 · sensor-fusion section.",
      kind: "review",
      href: "/projects/project-nayan",
      unread: true,
      pinned: true,
    },
    {
      id: "N-02",
      when: "2h ago",
      actor: "Pranav Sethi",
      message: "Accepted scope for a bounded 6-DOF sweep — architecture comparison only.",
      kind: "mention",
      href: "/community",
      unread: true,
    },
    {
      id: "N-03",
      when: "6h ago",
      actor: "BDN Labs · GNC",
      message: "Open call matches your profile · 1 sensor-fusion peer reviewer slot.",
      kind: "lab",
      href: "/labs/guidance-navigation-control",
      unread: true,
    },
    {
      id: "N-04",
      when: "1d ago",
      actor: "Meghna Rao",
      message: "DM · Possible SAR + guidance cross-collaboration — 30 min next week?",
      kind: "dm",
      href: "/community/private",
    },
    {
      id: "N-05",
      when: "1d ago",
      actor: "BDN Incubate",
      message: "Your Cohort B application is 68% complete · due Jul 15.",
      kind: "grant",
      href: "/startups/incubation/apply?track=university-spinout",
    },
    {
      id: "N-06",
      when: "2d ago",
      actor: "Capability Bharat ’26",
      message: "Simulation-first engineering track invited you as a featured voice.",
      kind: "event",
      href: "/summit",
    },
    {
      id: "N-07",
      when: "3d ago",
      actor: "BDN System",
      message: "Your Nayan v0.4 release passed CI · 0 regressions vs v0.3.1 baseline.",
      kind: "system",
      href: "/projects/project-nayan",
    },
  ] as WorkspaceNotification[],

  peerReviewNotes: [
    {
      id: "PR-01",
      reviewer: "Dr. K. Iyer",
      role: "RCI · sensors & navigation",
      section: "Sensor-fusion scaffolding · ESKF baseline",
      summary:
        "Consider stating the assumption envelope for the ESKF baseline explicitly. The drift bounds in §3.2 look conservative; worth justifying.",
      state: "open",
      when: "17m ago",
    },
    {
      id: "PR-02",
      reviewer: "Pranav Sethi",
      role: "Prahaar Tactical · guidance simulation WG",
      section: "6-DOF parameter window",
      summary:
        "Scoped sweep window looks reasonable. Suggest adding a monotonicity assertion on the comparison axis for reproducibility.",
      state: "open",
      when: "9h ago",
    },
    {
      id: "PR-03",
      reviewer: "Leena Fernandes",
      role: "Skyops Defence · autonomy WG",
      section: "Safety case posture",
      summary:
        "Add a line on falsification-driven verification — even a pointer to prior art from the Autonomy Lab. It signals posture clearly.",
      state: "open",
      when: "1d ago",
    },
    {
      id: "PR-04",
      reviewer: "BDN Editor",
      role: "Member-only peer-review registry",
      section: "Memo framing",
      summary:
        "Memo clearly scoped as simulation-first and non-operational. No changes required from the editorial side.",
      state: "addressed",
      when: "2d ago",
    },
  ] as PeerReviewNote[],

  collaborations: [
    { id: "CO-01", with: "Dr. K. Iyer", org: "RCI", intent: "Peer review · sensor-fusion scaffolding", status: "Active", last: "17m ago" },
    { id: "CO-02", with: "Pranav Sethi", org: "Prahaar Tactical", intent: "Bounded 6-DOF sweep · architecture comparison", status: "Active", last: "9h ago" },
    { id: "CO-03", with: "Leena Fernandes", org: "Skyops Defence", intent: "Safety-case review", status: "Waiting", last: "1d ago" },
    { id: "CO-04", with: "Meghna Rao", org: "Sarvatra Systems", intent: "SAR + guidance cross-collab · scoping", status: "Proposed", last: "1d ago" },
    { id: "CO-05", with: "IIT Kanpur AE (group)", org: "IIT Kanpur", intent: "Campus 6-DOF sweep slot (GNC Lab open call)", status: "Proposed", last: "3d ago" },
    { id: "CO-06", with: "Neha Gokhale", org: "HimShakti Energy", intent: "Thermal-envelope materials survey", status: "Active", last: "yesterday" },
  ] as Collaboration[],

  applications: [
    { id: "APP-01", kind: "Incubation", name: "Bharat Incubate · Cohort B (University Spinout)", status: "Drafting", progress: 68, updated: "1d ago", href: "/startups/incubation/apply?track=university-spinout" },
    { id: "APP-02", kind: "Problem", name: "PRB-0413 · Guidance modernisation concept study", status: "Drafting", progress: 42, updated: "2d ago", href: "/problems/guidance-modernisation-legacy-systems" },
    { id: "APP-03", kind: "Lab slot", name: "Defence Simulation Lab · environmental chamber (Jul–Sep)", status: "Submitted", progress: 100, updated: "4d ago", href: "/labs/defence-simulation" },
    { id: "APP-04", kind: "Grant", name: "BDN Deep-tech Launch Grant", status: "Shortlisted", progress: 80, updated: "1w ago", href: "/startups#grants" },
  ] as ApplicationInProgress[],

  labStudies: [
    { id: "ST-01", title: "Architecture memo v0.4 peer review", lab: "GNC Lab", labHref: "/labs/guidance-navigation-control", state: "Peer review", progress: 62, nextCheckpoint: "Reviewer close-out · Apr 30" },
    { id: "ST-02", title: "ESKF vs UKF drift comparison", lab: "GNC Lab", labHref: "/labs/guidance-navigation-control", state: "Active", progress: 38, nextCheckpoint: "Mid-study checkpoint · May 14" },
    { id: "ST-03", title: "Shared verification harness contribution", lab: "Defence Simulation Lab", labHref: "/labs/defence-simulation", state: "Recruiting", progress: 12, nextCheckpoint: "Kickoff · May 08" },
  ] as StudySlice[],

  activityFeed: [
    { when: "17m ago", kind: "review", who: "Dr. K. Iyer", message: "Reviewed Nayan v0.4 · left 4 comments on sensor-fusion scaffolding." },
    { when: "2h ago", kind: "commit", who: "vivek", message: "sim6dof: decouple airframe model from guidance law for comparative studies." },
    { when: "9h ago", kind: "review", who: "vivek", message: "Approved PR #104 — sensor-fusion scaffold with ESKF baseline." },
    { when: "11h ago", kind: "reply", who: "vivek", message: "Replied on TH-423 — top-voted materials-class breakdown." },
    { when: "14h ago", kind: "mention", who: "Pranav Sethi", message: "Pinged you on the bounded 6-DOF sweep scope." },
    { when: "1d ago", kind: "authored", who: "vivek", message: "Posted TH-422 — Looking for 6-DOF collaborators." },
    { when: "2d ago", kind: "release", who: "ci-bot", message: "project-nayan v0.4.0 released · architecture memo + HIL scaffolding." },
    { when: "3d ago", kind: "system", who: "BDN Labs", message: "Confirmed you as Core Member for the GNC Lab sensor-fusion open call." },
    { when: "1w ago", kind: "bookmark", who: "vivek", message: "Bookmarked PRB-0408 · RLG IMU module concept." },
  ],

  upcoming: [
    { when: "Apr 28 · 17:00 IST", kind: "Review call", title: "Nayan v0.4 reviewer close-out (GNC Lab)" },
    { when: "May 08 · 10:00 IST", kind: "Lab kickoff", title: "Shared verification harness · Defence Simulation Lab" },
    { when: "May 22–23", kind: "Showcase", title: "Trishul Spring Showcase · Bengaluru" },
    { when: "Oct 12–14", kind: "Summit", title: "Bharat Defence Summit · Delhi (featured voice)" },
  ],
};

export const priorityTone: Record<ActionItem["priority"], "accent" | "amber" | "neutral"> = {
  P0: "accent",
  P1: "amber",
  P2: "neutral",
};
