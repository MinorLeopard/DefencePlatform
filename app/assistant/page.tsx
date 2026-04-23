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
  Radar,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
  refs?: { label: string; kind: "problem" | "grant" | "member" | "project"; href: string }[];
};

const starters = [
  { icon: Target, label: "Find my next problem", prompt: "Find the 3 best-fit problems for a 12-person C-UAS startup with a working swarm stack." },
  { icon: FileText, label: "Draft grant memo", prompt: "Draft a 400-word BDN Deep-tech Launch Grant memo for Skyops Defence." },
  { icon: Users, label: "Suggest collaborators", prompt: "Who in the BDN network could help me with ground-truth sonar datasets for the Indian Ocean?" },
  { icon: Radar, label: "Brief interlocutor", prompt: "Prepare a 5-minute brief on HAL strategic programs before my call with Nikhil Menon." },
  { icon: Search, label: "Patent pathway", prompt: "What's the fastest path from ideation to a provisional filing for a low-cost interceptor design?" },
];

const savedThreads = [
  "Best path: prototype → iDEX → service contract",
  "Evaluation plan for PRB-0412",
  "Who's working on post-quantum tactical radios?",
  "Draft: Series A narrative for Skyops Defence",
];

const modes = ["Concise", "Deep research", "Policy review", "Investor angle"];

const seedReply =
  "Based on Skyops Defence's stack (swarm autonomy, visual-inertial pose, decentralised planning), three problems are the strongest fit right now:\n\n1. PRB-0412 · Low-cost hard-kill interceptor for swarm UAS threats — direct overlap with your kinetic kill-link work on prahaar-counter-uas-kill-link. Bounty pool ₹4.8 Cr, 14-month timeline.\n\n2. PRB-0399 · Autonomous armoured convoy-escort UGV — your team's VIO stack transfers cleanly. Mech Forces Directorate sponsor, 24-month horizon.\n\n3. PRB-0405 · Digital twin of eastern-sector logistics corridor — indirect fit, but your planner work is reusable for convoy planning. Faster wins possible here.\n\nI'd prioritise PRB-0412 (already co-submitted with Prahaar Tactical) and apply as a co-lead proposer.";

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Hi Aarav. I'm BDN's member assistant. I can help you find the right problem, navigate grants, prep for interlocutors, match collaborators, and plan your next move. What would you like to work on?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState(modes[0]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const submit = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setSending(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: seedReply,
          refs: [
            { label: "PRB-0412 · Swarm interceptor", kind: "problem", href: "/problems/swarm-counter-uas-hard-kill" },
            { label: "PRB-0399 · Convoy-escort UGV", kind: "problem", href: "/problems/autonomous-convoy-escort" },
            { label: "PRB-0405 · Logistics twin", kind: "problem", href: "/problems/logistics-digital-twin-eastern-sector" },
            { label: "prahaar-counter-uas-kill-link", kind: "project", href: "/projects/prahaar-counter-uas-kill-link" },
          ],
        },
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
          <button className="rounded-md border border-line p-1.5 text-white/70 hover:text-white">
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

        <div className="mono mx-5 mb-3">Recent threads</div>
        <nav className="flex flex-col gap-1 px-3">
          {savedThreads.map((t, i) => (
            <button
              key={i}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-left text-[12.5px]",
                i === 0
                  ? "bg-accent/10 text-accent"
                  : "text-white/65 hover:bg-white/5 hover:text-white",
              )}
            >
              <History className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="line-clamp-1">{t}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-line p-5 text-[11.5px] text-white/45">
          <div className="mb-2 mono text-white/60">Context on</div>
          <ul className="space-y-1.5">
            <li>· My workspace · Skyops Defence</li>
            <li>· garuda-swarm-stack</li>
            <li>· 4 open applications</li>
          </ul>
          <Link href="/dashboard" className="mt-3 block text-[11.5px] text-accent">
            Manage context →
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
              <div className="mt-1 text-[11.5px] text-white/50">Ask for problem matches, grant navigation, patent pathways, interlocutor briefs, or collaborator suggestions.</div>
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
                placeholder="Ask the assistant…  e.g. 'What grants can a 10-person sensor startup apply for?'"
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
              <span>Mode: <span className="text-accent">{mode}</span> · Context: My workspace</span>
              <span>Shift + ↵ newline · ↵ send · demo content</span>
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
        {msg.refs && (
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
