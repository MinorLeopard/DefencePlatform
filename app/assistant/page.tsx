"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Paperclip,
  SlidersHorizontal,
  History,
  Plus,
  ExternalLink,
  Search,
  Target,
  FileText,
  Users,
  FlaskConical,
  Boxes,
  Beaker,
  Pin,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { currentMember } from "@/data/members";

type Ref = { label: string; kind: "problem" | "grant" | "member" | "project" | "lab"; href: string };

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
  refs?: Ref[];
};

const starters = [
  {
    icon: Target,
    label: "Which defence problem should I pick up next?",
    prompt:
      "Based on my current project (Project Nayan — a precision guidance retrofit architecture study), which defence problem statements on BDN should I pick up next?",
  },
  {
    icon: Boxes,
    label: "Materials to evaluate for rugged systems",
    prompt:
      "What classes of materials should I evaluate for a ruggedized embedded enclosure across a wide thermal operating envelope?",
  },
  {
    icon: FlaskConical,
    label: "Where can I prototype defence hardware in India?",
    prompt:
      "Where in India can I prototype defence hardware — through BDN labs, university simulation facilities, or approved manufacturing partners?",
  },
  {
    icon: FileText,
    label: "Best grants for a guidance modernisation project",
    prompt:
      "Which grants, accelerators, or research pathways best fit a simulation-first guidance modernisation project?",
  },
  {
    icon: Users,
    label: "Who should I reach out to next?",
    prompt:
      "Which collaborators in the BDN network should I reach out to for peer review on the Project Nayan architecture memo?",
  },
  {
    icon: Search,
    label: "Summarise my week",
    prompt: "Summarise what happened in my workspace this week and what I should act on.",
  },
];

// Curated, demo-safe seeded replies keyed by intent.
const seededReplies: { matcher: (q: string) => boolean; content: string; refs: Ref[] }[] = [
  {
    matcher: (q) => /which.*problem|pick up next|problem should i/i.test(q),
    content: `Given Project Nayan's focus on simulation-first guidance architectures, three problem statements line up well right now, in order of fit:

1. PRB-0413 · Guidance modernisation concept study for legacy strike systems — direct overlap with your workstream. The sponsor is the GNC Lab, which you already lead in. Lowest friction.

2. PRB-0408 · Indigenous tactical-grade ring-laser gyroscope module — architecture-adjacent. Your sensor-fusion scaffolding is reusable here, and it opens an RCI supply-chain conversation.

3. PRB-0409 · LPI/LPD mesh communications for forward posts — you're already a contributor on trishul-sdr-mesh; applying as a sub-scope proposer on embedded timing would be a natural extension.

I would prioritise PRB-0413 this quarter and treat PRB-0408 as a parallel Q2 track. I can draft an application outline for PRB-0413 against your current architecture memo — say the word.`,
    refs: [
      { label: "PRB-0413 · Guidance modernisation concept", kind: "problem", href: "/problems/guidance-modernisation-legacy-systems" },
      { label: "PRB-0408 · RLG IMU module", kind: "problem", href: "/problems/indigenous-inertial-navigation-ring-laser" },
      { label: "PRB-0409 · LPI/LPD mesh", kind: "problem", href: "/problems/secure-mesh-comms-forward-posts" },
      { label: "project-nayan", kind: "project", href: "/projects/project-nayan" },
    ],
  },
  {
    matcher: (q) => /material|thermal|composite|enclosure/i.test(q),
    content: `For a ruggedized embedded enclosure across a wide thermal envelope, I'd group the survey into three high-level material classes before any sourcing decisions:

1. Mid-range engineering thermoplastics and polymer composites. Polyimide-family (PI, PAI) and reinforced PEEK variants are your predictable middle ground. Well-characterised creep behaviour and a mature domestic supply chain.

2. Oxide-ceramic matrix composites (OCMCs). These become relevant at the upper end of the envelope. Domestic work at IIT Madras and ARCI is credible. Expect longer lead times — plan 8–12 weeks for pilot batches.

3. Phenolic / ablative layers. Only worth evaluating at the extreme end, and only when paired with a real thermal-management architecture, not as a primary solution.

Two practical suggestions before you commit:
— Book a slot at the BDN Defence Simulation Lab's environmental chambers for thermal cycling. Two member slots open per quarter. A few cycles there tends to separate candidates faster than any spec sheet.
— Post a material-class survey thread in the community; the forum has active researchers across IIT Madras, ARCI, and IISc MRC.

Nothing in this answer is a formulation or operational build recipe — it's a survey of material categories to evaluate.`,
    refs: [
      { label: "Defence Simulation Lab", kind: "lab", href: "/labs/defence-simulation" },
      { label: "TH-423 · Materials for thermal envelopes", kind: "problem", href: "/community" },
      { label: "Neha Gokhale · HimShakti", kind: "member", href: "/community" },
    ],
  },
  {
    matcher: (q) => /prototype|facility|lab|manufactur/i.test(q),
    content: `For a simulation-first architecture project like Nayan, the prototyping pathway in India looks like this:

— BDN AI Labs are the front door. For you, the Guidance, Navigation & Control Lab is the home lab, with direct access to Nayan-Sim and the HIL scaffolding. The Defence Simulation Lab gives you shared environmental chambers and digital-twin tooling, and the Embedded AI Systems Lab covers on-device inference profiling.

— University partner facilities. IIT Madras Aerospace (simulation and wind-tunnel), IISc MRC (materials and environmental), IIT Kanpur AE (GNC and control). BDN can co-apply with you for access slots.

— DPSU research partnerships. BEL Strategic Electronics (RF and embedded), HAL Advanced Research (integration and flight-side testing, advisory stage only for concept studies like Nayan). These engagements go through the BDN DPSU interface — allow 4–6 weeks for the first meeting.

— Approved manufacturing partners are not in scope for Nayan at this stage. The project is an architecture and peer-review workstream, not a build programme. If a future study spins out a production-ready component, we would engage qualified vendors through the BDN production desk.

Starting point: open an access request at the Defence Simulation Lab and the Embedded AI Systems Lab in parallel. I can scope both requests if you want.`,
    refs: [
      { label: "Guidance, Navigation & Control Lab", kind: "lab", href: "/labs/guidance-navigation-control" },
      { label: "Defence Simulation Lab", kind: "lab", href: "/labs/defence-simulation" },
      { label: "Embedded AI Systems Lab", kind: "lab", href: "/labs/embedded-ai-systems" },
    ],
  },
  {
    matcher: (q) => /grant|accelerat|funding|capital|fellow/i.test(q),
    content: `For a simulation-first guidance modernisation workstream, four pathways are worth considering:

1. BDN Deep-tech Launch Grant (₹25L–₹1.5 Cr, non-dilutive) — direct fit. Your GNC Lab membership and RCI advisor give you a strong interlocutor story. Rolling applications; I can draft the 400-word memo against your architecture doc.

2. Capability Bharat Flagship Prize (₹3 Cr, per flagship, revealed at Summit) — if PRB-0413 is designated a flagship for 2026, Nayan is an obvious candidate. Worth positioning early with Dr. K. Iyer.

3. iDEX DISC Continuation — more relevant if you spin out a specific component study (e.g. seeker scaffolding) as a separate workstream. Architecture-level projects don't fit neatly.

4. Research-use fellowship with a campus partner. A joint application with an IIT Kanpur AE group would unlock both infrastructure and peer-review bandwidth and is philosophically aligned with the project's academic posture.

My recommendation: start with the Deep-tech Launch Grant this quarter, then build toward flagship designation at Summit '26.`,
    refs: [
      { label: "BDN Deep-tech Launch Grant", kind: "grant", href: "/startups#grants" },
      { label: "Capability Bharat Flagship Prize", kind: "grant", href: "/startups#grants" },
      { label: "iDEX DISC Continuation", kind: "grant", href: "/startups#grants" },
      { label: "PRB-0413", kind: "problem", href: "/problems/guidance-modernisation-legacy-systems" },
    ],
  },
  {
    matcher: (q) => /collaborator|reach out|network|peer review/i.test(q),
    content: `For peer review on the Nayan v0.4 architecture memo, the best network matches right now are:

1. Dr. K. Iyer (RCI Hyderabad) — already an advisor on Nayan. He has committed to reviewing the sensor-fusion scaffolding via the GNC Lab channel. Low friction.

2. Pranav Sethi (CEO, Prahaar Tactical) — has offered to run a bounded 6-DOF sweep on the parameter window. Scope already agreed — architecture comparison only, not trajectory optimisation.

3. Leena Fernandes (Autonomy WG, Skyops Defence) — strong on safety-case verification. Worth pulling in for the verification posture section.

4. IIT Kanpur AE group — would be your best campus collaborator for the 6-DOF sweep open call. A warm intro from Dr. Iyer will move fastest.

I can prepare a short brief for each of them in parallel, or draft a single GNC Lab channel announcement if you'd prefer one push.`,
    refs: [
      { label: "Dr. K. Iyer", kind: "member", href: "/members/k-iyer" },
      { label: "Pranav Sethi · Prahaar Tactical", kind: "member", href: "/community" },
      { label: "GNC Lab", kind: "lab", href: "/labs/guidance-navigation-control" },
    ],
  },
  {
    matcher: (q) => /summarise|summary|week|what happened/i.test(q),
    content: `Your week at a glance:

— Project Nayan v0.4 peer review is 62% complete. 3 of 5 reviewers have commented; Dr. K. Iyer's sensor-fusion review is still pending.
— Two community threads you're in have moved: TH-422 (your "looking for" thread) now has 17 replies, and TH-423 (materials for thermal envelopes) is quoting your reply as the top response.
— GNC Lab has opened a campus 6-DOF sweep slot. Given the Nayan open call, IIT Kanpur AE is the best fit — I can draft the intro.
— Upcoming: Bharat Defence Summit 2026 (Oct) — the "Simulation-first defence engineering" track is likely to feature Nayan.
— One follow-up outstanding: Meghna Rao's DM on a possible SAR + guidance cross-collaboration.`,
    refs: [
      { label: "project-nayan", kind: "project", href: "/projects/project-nayan" },
      { label: "TH-422 · Looking for 6-DOF collaborators", kind: "problem", href: "/community" },
      { label: "Bharat Defence Summit 2026", kind: "lab", href: "/summit" },
    ],
  },
];

const fallbackReply: { content: string; refs: Ref[] } = {
  content:
    "I'll take that in the context of your workspace — Project Nayan, GNC Lab, and your active community threads. I can help scope a problem statement, shortlist collaborators, draft a grant memo, prepare a lab-slot application, or produce a briefing document. What outcome would be most useful?",
  refs: [
    { label: "project-nayan", kind: "project", href: "/projects/project-nayan" },
    { label: "GNC Lab", kind: "lab", href: "/labs/guidance-navigation-control" },
  ],
};

const savedThreads = [
  { title: "Nayan v0.4 architecture peer-review plan", when: "yesterday", active: true },
  { title: "Materials shortlist for thermal envelopes", when: "2d ago" },
  { title: "Grants pathway for guidance modernisation", when: "5d ago" },
  { title: "IIT Kanpur AE 6-DOF sweep intro draft", when: "1w ago" },
  { title: "Summit '26 — Nayan showcase abstract", when: "2w ago" },
];

const modes = ["Concise", "Deep research", "Policy review", "Investor angle"];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content: `Hi Vivek. I have your workspace context loaded — Project Nayan, the GNC Lab (Core Member), TH-422 and TH-423, and your three bookmarked problems. Shall we continue on the Nayan peer-review plan, or something else?`,
      refs: [
        { label: "project-nayan", kind: "project", href: "/projects/project-nayan" },
        { label: "GNC Lab", kind: "lab", href: "/labs/guidance-navigation-control" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState(modes[0]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const pickReply = (q: string) => {
    const hit = seededReplies.find((s) => s.matcher(q));
    return hit ?? fallbackReply;
  };

  const submit = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setSending(true);
    setTimeout(() => {
      const reply = pickReply(text);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: reply.content, refs: reply.refs },
      ]);
      setSending(false);
    }, 900);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-72 flex-shrink-0 border-r border-line bg-ink-950/80 md:flex md:flex-col">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="font-display text-[14px] font-semibold text-white">BDN Assistant</span>
          </div>
          <button className="rounded-md border border-line p-1.5 text-white/70 hover:text-white" aria-label="New chat">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mx-5 mb-4 rounded-md border border-line bg-ink-900 p-3">
          <div className="mono mb-2">Mode</div>
          <div className="grid grid-cols-2 gap-1.5">
            {modes.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-sm border px-2 py-1.5 text-[11px] transition-colors",
                  mode === m ? "border-accent/30 bg-accent/10 text-accent" : "border-line text-white/60 hover:text-white",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="mono mx-5 mb-3">Saved research</div>
        <nav className="flex flex-col gap-1 px-3">
          {savedThreads.map((t, i) => (
            <button
              key={i}
              className={cn(
                "flex items-start gap-2 rounded-md px-3 py-2 text-left text-[12.5px]",
                t.active
                  ? "bg-accent/10 text-accent"
                  : "text-white/65 hover:bg-white/5 hover:text-white",
              )}
            >
              {t.active ? (
                <Pin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              ) : (
                <History className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 opacity-70" />
              )}
              <span className="min-w-0 flex-1">
                <span className="line-clamp-1">{t.title}</span>
                <span className="block text-[10px] text-white/35">{t.when}</span>
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-line p-5">
          <div className="mb-2 mono text-[10px]">Workspace context</div>
          <ul className="space-y-1.5 text-[11.5px] text-white/55">
            <li>· <span className="text-white/80">{currentMember.name}</span></li>
            <li>· {currentMember.org}</li>
            <li>· Project Nayan (v0.4)</li>
            <li>· GNC Lab · Core Member</li>
            <li>· 3 bookmarked problems</li>
          </ul>
          <Link href="/dashboard" className="mt-3 inline-flex items-center gap-1 text-[11.5px] text-accent">
            Manage context <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="border-b border-line bg-ink-950/60 px-5 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <div className="font-display text-[16px] text-white">Workspace assistant</div>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9.5px] uppercase tracking-[0.12em] text-accent">
                  Beta · members only
                </span>
              </div>
              <div className="mt-1 text-[11.5px] text-white/50">
                Personalised for {currentMember.name} · Project Nayan · GNC Lab. Ask for problem matches, grants, lab access, collaborator suggestions, or briefings.
              </div>
            </div>
            <button className="btn-ghost !py-1.5 !px-3 !text-[11.5px]">
              <SlidersHorizontal className="h-3 w-3" />
              Tools
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-10">
          <div className="mx-auto w-full max-w-3xl space-y-6">
            {messages.map((m, i) => (
              <Message key={i} msg={m} />
            ))}
            {sending && (
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="flex items-center gap-1 text-[12px] text-white/50">
                  <Dot />
                  <Dot delay={150} />
                  <Dot delay={300} />
                </div>
              </div>
            )}

            {messages.length <= 1 && (
              <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
                {starters.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.label}
                      onClick={() => submit(s.prompt)}
                      className="group flex items-start gap-3 rounded-lg border border-line bg-ink-900/50 p-4 text-left transition-colors hover:border-accent/30 hover:bg-ink-850/80"
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-line bg-ink-850 text-accent">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium text-white">{s.label}</div>
                        <div className="mt-1 line-clamp-2 text-[11.5px] text-white/55">{s.prompt}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        <div className="border-t border-line bg-ink-950/80 p-4 md:p-6">
          <form
            className="mx-auto w-full max-w-3xl"
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
          >
            <div className="flex items-end gap-2 rounded-xl border border-line bg-ink-900 p-3 focus-within:border-line-strong">
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-md text-white/50 hover:text-white" aria-label="Attach">
                <Paperclip className="h-4 w-4" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(input);
                  }
                }}
                placeholder="Ask the assistant…  e.g. 'Which problem should I pick up next, given Nayan?'"
                rows={1}
                className="flex-1 resize-none bg-transparent px-1 py-2 text-[14px] placeholder:text-white/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                  input.trim() ? "bg-accent text-white hover:bg-accent-glow" : "bg-ink-850 text-white/40",
                )}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10.5px] text-white/35">
              <span>Mode: <span className="text-accent">{mode}</span> · Context: {currentMember.name}'s workspace</span>
              <span>Shift + ↵ newline · ↵ send · demo responses</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Message({ msg }: { msg: ChatMsg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-xl rounded-tr-sm border border-line bg-ink-900 px-4 py-3 text-[13.5px] text-white/90 whitespace-pre-wrap">
          {msg.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div className="max-w-[90%] flex-1">
        <div className="rounded-xl rounded-tl-sm border border-line bg-ink-900/50 p-4 text-[13.5px] leading-relaxed text-white/85 whitespace-pre-wrap">
          {msg.content}
        </div>
        {msg.refs && msg.refs.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {msg.refs.map((r) => (
              <Link
                key={r.label}
                href={r.href}
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-ink-850 px-2.5 py-1 text-[11px] text-white/75 hover:border-accent/40 hover:text-accent transition-colors"
              >
                <span className="mono text-[9px]">{r.kind.toUpperCase()}</span>
                {r.label}
                <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
