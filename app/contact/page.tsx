"use client";

import { useState } from "react";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/ui/Section";
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";

const interests = [
  "I'm a startup / founder",
  "I represent a DPSU or service HQ",
  "I'm an investor",
  "University / research group",
  "Journalist / analyst",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [interest, setInterest] = useState(interests[0]);

  return (
    <>
      <PageHero
        label="Contact · partnership"
        title={<>Tell us what you're building. We'll take it from there.</>}
        intro="Whether you're a founder looking for the right problem, a DPSU evaluating a startup cohort, or an investor exploring the defence stack — we'd like to hear from you."
      />

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-2xl border border-line bg-ink-900/50 p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-start gap-4 py-12">
                <CheckCircle2 className="h-10 w-10 text-signal-green" />
                <div className="font-display text-[24px] text-white">Request received.</div>
                <p className="max-w-md text-[14px] text-white/65">
                  Our partnerships team will be in touch within two working days. If this is urgent,
                  drop us a line at <span className="text-accent">partnerships@bharatdefence.network</span>.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost !mt-3">
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col gap-5"
              >
                <div className="mono text-accent">Partnership request</div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Full name" placeholder="Your name" required />
                  <Field label="Organisation" placeholder="Organisation or 'independent'" required />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Work email" placeholder="you@org.in" type="email" required />
                  <Field label="Role" placeholder="Founder, program lead, etc." />
                </div>

                <div>
                  <label className="mono mb-2 block">I am reaching out as</label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setInterest(i)}
                        className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
                          interest === i
                            ? "border-accent/40 bg-accent/15 text-accent"
                            : "border-line text-white/60 hover:border-line-strong hover:text-white"
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mono mb-2 block">Tell us more</label>
                  <textarea
                    required
                    placeholder="What you are working on, what you need, and what timeline you're on."
                    rows={5}
                    className="w-full rounded-md border border-line bg-ink-900 px-3 py-3 text-[13.5px] placeholder:text-white/30 focus:border-line-strong focus:outline-none"
                  />
                </div>

                <div className="flex items-start gap-3 text-[11.5px] text-white/50">
                  <input type="checkbox" className="mt-0.5" required />
                  <span>
                    I understand this platform is a demonstration of the Bharat Defence Network vision and does not
                    constitute a government endorsement. I will not share classified material through this form.
                  </span>
                </div>

                <button type="submit" className="btn-accent self-start !px-6 !py-3">
                  Submit request <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="mono mb-3">Direct channels</div>
              <ul className="space-y-3 text-[13px] text-white/75">
                <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" />partnerships@bharatdefence.network</li>
                <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" />press@bharatdefence.network</li>
                <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" />+91 11 4000 2026</li>
                <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent" />Bharat Mandapam Annex · New Delhi</li>
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="mono mb-3">Response SLA</div>
              <ul className="space-y-2 text-[12.5px] text-white/65">
                <li>· Startups & builders · within 2 working days</li>
                <li>· Services / DPSUs · within 1 working day</li>
                <li>· Press & analysts · within 3 working days</li>
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <div className="mono mb-3">For urgent matters</div>
              <p className="text-[12.5px] leading-relaxed text-white/60">
                If you are a service or lab officer with a time-bound capability request, please mark your email
                <span className="text-accent"> [CAPABILITY URGENT] </span> and we will route it directly to our program office.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mono mb-2 block">{label}</label>
      <input
        {...props}
        className="w-full rounded-md border border-line bg-ink-900 px-3 py-2.5 text-[13.5px] placeholder:text-white/30 focus:border-line-strong focus:outline-none"
      />
    </div>
  );
}
