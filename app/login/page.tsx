"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Fingerprint, KeyRound, Mail, ArrowRight, LockKeyhole } from "lucide-react";

export default function LoginPage() {
  const [method, setMethod] = useState<"email" | "passkey" | "sso">("email");

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      <div className="container-page relative z-10 grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between">
          <div>
            <div className="mono mb-5 text-accent">Member access</div>
            <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-white">
              Welcome back.
              <span className="block text-white/50">The workspace is waiting.</span>
            </h1>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-white/65">
              Member access unlocks restricted projects, private community rooms, AI assistant,
              and the investor / partner dashboard.
            </p>
          </div>

          <ul className="space-y-4 text-[13.5px] text-white/70">
            <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-accent" /> Background-verified member directory</li>
            <li className="flex items-center gap-3"><LockKeyhole className="h-4 w-4 text-accent" /> Mandatory 2FA / passkey for restricted areas</li>
            <li className="flex items-center gap-3"><Fingerprint className="h-4 w-4 text-accent" /> Signed access attestations for gated repos</li>
          </ul>

          <div className="rounded-xl border border-line bg-ink-900/60 p-5">
            <div className="mono mb-2">Demo note</div>
            <p className="text-[12px] leading-relaxed text-white/55">
              This is a demonstration sign-in flow. No credentials are collected or stored. Click any of the methods
              to view the member dashboard.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-2xl border border-line bg-ink-900/80 p-8 backdrop-blur-md shadow-soft">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-signal-green animate-pulse-slow" />
            <span className="mono text-white/55">Secure · demonstration mode</span>
          </div>
          <h2 className="mt-5 font-display text-[26px] font-semibold text-white">Sign in to BDN</h2>
          <p className="mt-1 text-[13px] text-white/55">Use your BDN member account or enterprise SSO.</p>

          <div className="mt-6 grid grid-cols-3 gap-1.5 rounded-md border border-line p-1">
            {(["email", "passkey", "sso"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`rounded-sm px-3 py-2 text-[12px] transition-colors ${
                  method === m ? "bg-accent/15 text-accent" : "text-white/55 hover:text-white"
                }`}
              >
                {m === "email" ? "Email" : m === "passkey" ? "Passkey" : "Enterprise SSO"}
              </button>
            ))}
          </div>

          <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {method === "email" && (
              <>
                <InputField icon={<Mail className="h-4 w-4 text-white/40" />} placeholder="you@org.in" type="email" />
                <InputField icon={<KeyRound className="h-4 w-4 text-white/40" />} placeholder="••••••••••" type="password" />
                <div className="flex items-center justify-between text-[12px]">
                  <label className="inline-flex items-center gap-2 text-white/60">
                    <input type="checkbox" /> Remember this device
                  </label>
                  <Link href="#" className="text-white/55 hover:text-white">Forgot password</Link>
                </div>
              </>
            )}
            {method === "passkey" && (
              <div className="rounded-md border border-line bg-ink-850 p-5 text-center">
                <Fingerprint className="mx-auto h-8 w-8 text-accent" />
                <p className="mt-3 text-[13px] text-white/75">Use your registered passkey to sign in.</p>
                <p className="mt-2 text-[11.5px] text-white/45">Touch ID, Windows Hello, or FIDO2 key supported.</p>
              </div>
            )}
            {method === "sso" && (
              <>
                <InputField icon={<Mail className="h-4 w-4 text-white/40" />} placeholder="Enterprise domain · e.g. mantissensors.in" />
                <p className="text-[11.5px] text-white/45">
                  We'll route you to your organisation's identity provider. Works with Azure AD, Okta, Google Workspace.
                </p>
              </>
            )}

            <Link href="/dashboard" className="btn-accent justify-center !py-3">
              {method === "passkey" ? "Use passkey" : method === "sso" ? "Continue with SSO" : "Sign in"} <ArrowRight className="h-4 w-4" />
            </Link>
          </form>

          <div className="my-6 flex items-center gap-3 text-[11px] text-white/30">
            <span className="h-px flex-1 bg-line" />
            <span>OR</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="btn-ghost !py-2.5 !text-[12px]">Google Workspace</button>
            <button className="btn-ghost !py-2.5 !text-[12px]">Microsoft 365</button>
          </div>

          <div className="mt-6 text-center text-[12px] text-white/50">
            New to BDN? <Link href="/contact" className="text-accent">Request builder access →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-2 rounded-md border border-line bg-ink-850/60 px-3.5 py-2.5 focus-within:border-line-strong">
      {icon}
      <input {...props} className="flex-1 bg-transparent text-[13.5px] placeholder:text-white/30 focus:outline-none" />
    </label>
  );
}
