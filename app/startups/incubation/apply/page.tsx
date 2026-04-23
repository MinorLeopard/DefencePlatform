"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { tracks } from "@/data/incubation";
import { cn } from "@/lib/cn";

const stages = ["Concept", "Prototype", "Pilot", "Production"] as const;
type Stage = (typeof stages)[number];

const domains = [
  "AI & Autonomy",
  "Sensing",
  "Materials",
  "Robotics",
  "UAS / Drones",
  "Maritime",
  "Communications",
  "Electronics & EW",
  "Energy & Propulsion",
  "GNC",
  "Simulation & Training",
  "Logistics",
];

const steps = ["Startup", "Maturity", "Program fit", "Review"] as const;

export default function IncubationApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [trackSlug, setTrackSlug] = useState(tracks[0].slug);
  const [form, setForm] = useState({
    startupName: "",
    foundersName: "",
    role: "",
    email: "",
    location: "",
    website: "",
    primaryDomain: domains[0],
    stage: "Prototype" as Stage,
    trl: 4,
    universityAffiliation: "",
    prototypeStatus: "",
    summary: "",
    supportRequired: [] as string[],
    referral: "",
    consent: false,
  });

  const selectedTrack = useMemo(() => tracks.find((t) => t.slug === trackSlug)!, [trackSlug]);

  const canNext = (() => {
    if (step === 0) return form.startupName && form.foundersName && form.email;
    if (step === 1) return form.stage && form.prototypeStatus;
    if (step === 2) return form.summary.length > 40 && trackSlug;
    if (step === 3) return form.consent;
    return true;
  })();

  const supportOptions = [
    "Lab access & environmental testing",
    "Compliance / export-control desk",
    "Patent desk engagement",
    "DPSU introductions",
    "Investor introductions",
    "Mentor matching · technical",
    "Mentor matching · ecosystem",
    "Production readiness bridge",
  ];

  const toggleSupport = (o: string) => {
    setForm((f) => ({
      ...f,
      supportRequired: f.supportRequired.includes(o)
        ? f.supportRequired.filter((x) => x !== o)
        : [...f.supportRequired, o],
    }));
  };

  if (submitted) {
    return (
      <section className="relative min-h-[calc(100vh-4rem)]">
        <div className="absolute inset-0 hero-grid" />
        <div className="container-page relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-ink-900/70 p-10 text-center backdrop-blur">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-signal-green/30 bg-signal-green/10">
              <CheckCircle2 className="h-7 w-7 text-signal-green" />
            </div>
            <div className="mono mt-6 text-accent">Application received</div>
            <h1 className="mt-3 font-display text-[28px] font-semibold tracking-tight text-white md:text-[32px]">
              {form.startupName || "Your startup"} — thanks for applying.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[14px] text-white/65">
              Our program office will review within 14 working days. You'll receive a status update at{" "}
              <span className="text-accent">{form.email || "your registered email"}</span>. Shortlisted teams
              will be invited to a 45-minute screening call.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink-850 px-3 py-1.5 text-[11.5px] text-white/65">
              Application ID · BI-{String(Math.floor(Math.random() * 90000) + 10000)}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/startups/incubation" className="btn-ghost">Back to program</Link>
              <Link href="/startups" className="btn-accent">Back to startups</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 hero-grid" />
      <div className="container-page relative z-10 py-14 md:py-20">
        <Link
          href="/startups/incubation"
          className="inline-flex items-center gap-1.5 text-[12px] text-white/55 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to program
        </Link>

        <div className="mt-5 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mono text-accent">Bharat Incubate · Cohort B '26</div>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white md:text-[40px] md:leading-[1.06]">
              Apply for incubation
            </h1>
          </div>
          <div className="hidden md:block text-[12px] text-white/50">
            ~10 minutes · saved locally as you type
          </div>
        </div>

        {/* Stepper */}
        <ol className="mt-8 flex items-center gap-3 overflow-x-auto">
          {steps.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <li key={s} className="flex min-w-0 items-center gap-3">
                <div
                  className={cn(
                    "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-medium transition-colors",
                    done
                      ? "border-accent bg-accent text-white"
                      : active
                      ? "border-accent text-accent"
                      : "border-line text-white/40",
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "hidden md:block text-[12px] whitespace-nowrap",
                    active ? "text-white" : done ? "text-white/70" : "text-white/40",
                  )}
                >
                  {s}
                </span>
                {i < steps.length - 1 && <span className="h-px w-8 bg-line md:w-12" />}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <form
            className="lg:col-span-2 rounded-2xl border border-line bg-ink-900/60 p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (step < steps.length - 1) setStep(step + 1);
              else setSubmitted(true);
            }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <div className="font-display text-[18px] text-white">Tell us about your startup</div>
                  <p className="mt-1 text-[12.5px] text-white/55">Basic team & entity details.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Startup name" required value={form.startupName} onChange={(v) => setForm({ ...form, startupName: v })} placeholder="Oberoi Systems Research" />
                  <Field label="Founder full name" required value={form.foundersName} onChange={(v) => setForm({ ...form, foundersName: v })} placeholder="Founder name" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} placeholder="Founder · CTO" />
                  <Field label="Work email" required type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="founder@yourstartup.in" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="Bengaluru · Hyderabad · ..." />
                  <Field label="Website / repo" value={form.website} onChange={(v) => setForm({ ...form, website: v })} placeholder="https://…" />
                </div>
                <SelectField
                  label="Primary domain"
                  value={form.primaryDomain}
                  onChange={(v) => setForm({ ...form, primaryDomain: v })}
                  options={domains}
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <div className="font-display text-[18px] text-white">Where is your technology today?</div>
                  <p className="mt-1 text-[12.5px] text-white/55">Honest answers help us place you in the right track.</p>
                </div>
                <div>
                  <label className="mono mb-2 block">Stage</label>
                  <div className="flex flex-wrap gap-2">
                    {stages.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setForm({ ...form, stage: s })}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-[12px] transition-colors",
                          form.stage === s
                            ? "border-accent/40 bg-accent/15 text-accent"
                            : "border-line text-white/60 hover:border-line-strong hover:text-white",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mono mb-2 block">TRL · {form.trl}</label>
                  <input
                    type="range"
                    min={1}
                    max={9}
                    value={form.trl}
                    onChange={(e) => setForm({ ...form, trl: Number(e.target.value) })}
                    className="w-full accent-[color:#E07A2B]"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-white/40">
                    <span>TRL 1 · concept</span>
                    <span>TRL 5 · lab demo</span>
                    <span>TRL 9 · production</span>
                  </div>
                </div>
                <Field
                  label="University / lab affiliation"
                  value={form.universityAffiliation}
                  onChange={(v) => setForm({ ...form, universityAffiliation: v })}
                  placeholder="IIT Madras · IISc · RCI · none"
                />
                <TextArea
                  label="Current prototype status"
                  required
                  value={form.prototypeStatus}
                  onChange={(v) => setForm({ ...form, prototypeStatus: v })}
                  placeholder="e.g. Bench demo with 6-DOF simulation; one HIL scaffold prototype in progress."
                  rows={3}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <div className="font-display text-[18px] text-white">Which track fits best?</div>
                  <p className="mt-1 text-[12.5px] text-white/55">
                    You'll be assigned mentors matched to this track. The program office may suggest an alternate fit.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {tracks.map((t) => (
                    <button
                      type="button"
                      key={t.slug}
                      onClick={() => setTrackSlug(t.slug)}
                      className={cn(
                        "rounded-lg border p-4 text-left transition-colors",
                        trackSlug === t.slug
                          ? "border-accent/40 bg-accent/10"
                          : "border-line bg-ink-850/40 hover:border-line-strong",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-display text-[14px] text-white">{t.name}</div>
                        <Badge tone={trackSlug === t.slug ? "accent" : "neutral"}>{t.weeks}w</Badge>
                      </div>
                      <p className="mt-2 text-[11.5px] text-white/55 line-clamp-2">{t.audience}</p>
                    </button>
                  ))}
                </div>

                <TextArea
                  label="One-paragraph summary of your work"
                  required
                  value={form.summary}
                  onChange={(v) => setForm({ ...form, summary: v })}
                  placeholder="What are you building, who is it for, and what's the one outcome you want from the cohort?"
                  rows={5}
                />

                <div>
                  <label className="mono mb-2 block">Support you're looking for</label>
                  <div className="flex flex-wrap gap-2">
                    {supportOptions.map((o) => (
                      <button
                        type="button"
                        key={o}
                        onClick={() => toggleSupport(o)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-[12px] transition-colors",
                          form.supportRequired.includes(o)
                            ? "border-accent/40 bg-accent/15 text-accent"
                            : "border-line text-white/60 hover:border-line-strong hover:text-white",
                        )}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <Field label="Referral (optional)" value={form.referral} onChange={(v) => setForm({ ...form, referral: v })} placeholder="Mentor, investor, or community member who suggested BDN." />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <div className="font-display text-[18px] text-white">Review & submit</div>
                  <p className="mt-1 text-[12.5px] text-white/55">Take one more look. You can go back to edit any section.</p>
                </div>

                <ReviewGroup
                  title="Startup"
                  items={[
                    ["Startup", form.startupName || "—"],
                    ["Founder", form.foundersName || "—"],
                    ["Role", form.role || "—"],
                    ["Email", form.email || "—"],
                    ["Location", form.location || "—"],
                    ["Website", form.website || "—"],
                    ["Primary domain", form.primaryDomain],
                  ]}
                />
                <ReviewGroup
                  title="Maturity"
                  items={[
                    ["Stage", form.stage],
                    ["TRL", String(form.trl)],
                    ["Affiliation", form.universityAffiliation || "—"],
                    ["Prototype status", form.prototypeStatus || "—"],
                  ]}
                />
                <ReviewGroup
                  title="Program fit"
                  items={[
                    ["Track", selectedTrack.name],
                    ["Support requested", form.supportRequired.length ? form.supportRequired.join(", ") : "—"],
                    ["Summary", form.summary || "—"],
                    ["Referral", form.referral || "—"],
                  ]}
                />

                <label className="flex items-start gap-3 text-[12px] text-white/70">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  />
                  <span>
                    I confirm the information is accurate. I understand BDN will not share this submission outside the
                    screening committee, and that no classified or operational-detail content is being shared in this
                    application.
                  </span>
                </label>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
              <button
                type="button"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className={cn(
                  "btn-ghost !py-2 !px-3.5",
                  step === 0 && "opacity-30 pointer-events-none",
                )}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <button type="submit" disabled={!canNext} className="btn-accent !py-2 !px-4">
                {step < steps.length - 1 ? (
                  <>
                    Continue <ArrowRight className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    Submit application <Check className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <aside className="space-y-5">
            <div className="rounded-xl border border-line bg-ink-900/60 p-5">
              <div className="mono mb-2">Selected track</div>
              <div className="font-display text-[14.5px] text-white">{selectedTrack.name}</div>
              <div className="mt-1 text-[11.5px] text-white/50">{selectedTrack.audience}</div>
              <p className="mt-3 text-[12px] leading-relaxed text-white/60">{selectedTrack.summary}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
                <div><div className="mono">Stipend</div><div className="mt-1 text-white line-clamp-2">{selectedTrack.stipend}</div></div>
                <div><div className="mono">Weeks</div><div className="mt-1 text-white">{selectedTrack.weeks}</div></div>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/60 p-5">
              <div className="mono mb-3">What to expect</div>
              <ul className="space-y-2 text-[12.5px] text-white/65">
                <li>· 14-day turnaround on screening</li>
                <li>· 45-minute call for shortlisted teams</li>
                <li>· Offers within 4 weeks of application close</li>
                <li>· Cohort kickoff in Hyderabad · 2 days</li>
              </ul>
            </div>

            <div className="rounded-xl border border-signal-amber/20 bg-signal-amber/5 p-5">
              <div className="flex items-center gap-2 text-signal-amber">
                <ShieldCheck className="h-4 w-4" />
                <span className="mono">Demo content</span>
              </div>
              <p className="mt-2 text-[11.5px] text-white/60">
                This is a demonstration form. Submissions are not stored or sent anywhere; they only produce a mock
                confirmation screen.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mono mb-2 block">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-ink-850 px-3 py-2.5 text-[13.5px] placeholder:text-white/30 focus:border-line-strong focus:outline-none"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mono mb-2 block">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-ink-850 px-3 py-2.5 text-[13.5px] placeholder:text-white/30 focus:border-line-strong focus:outline-none resize-y"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mono mb-2 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-line bg-ink-850 px-3 py-2.5 text-[13.5px] focus:border-line-strong focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ReviewGroup({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="rounded-lg border border-line bg-ink-850/50 p-4">
      <div className="mono mb-3 text-accent">{title}</div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
        {items.map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-3">
            <dt className="text-[11.5px] text-white/50">{k}</dt>
            <dd className="text-right text-[12.5px] text-white/90 max-w-[65%] line-clamp-3">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
