import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Problems", href: "/problems" },
      { label: "Projects", href: "/projects" },
      { label: "AI Labs", href: "/labs" },
      { label: "Startups", href: "/startups" },
      { label: "Creators", href: "/creators" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "Members",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "AI assistant", href: "/assistant" },
      { label: "Private community", href: "/community/private" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Annual summit", href: "/summit" },
      { label: "About", href: "/about" },
      { label: "Partnerships", href: "/contact" },
      { label: "Press kit", href: "/about#press" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-ink-950">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/55">
              A national innovation layer for defence. Problems, projects, startups, and builders — connected through
              one serious, strategic ecosystem.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip">India-first</span>
              <span className="chip">Defence-tech</span>
              <span className="chip">Builder community</span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="mono mb-4 text-accent">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[13.5px] text-white/65 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <div className="mono mb-4 text-accent">Get ecosystem updates</div>
            <form className="flex items-center gap-2 rounded-md border border-line bg-ink-900 p-1.5">
              <input
                type="email"
                placeholder="you@institution.org"
                className="flex-1 bg-transparent px-2 py-1.5 text-[13px] placeholder:text-white/30 focus:outline-none"
              />
              <button type="button" className="btn-accent !py-1.5 !px-3 !text-[12px]">Subscribe</button>
            </form>
            <p className="mt-3 text-[11px] text-white/40">
              We send one curated brief per month. No noise.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-[12px] text-white/40">
            © {new Date().getFullYear()} Bharat Defence Network. Built for national capability.
          </div>
          <div className="flex flex-wrap items-center gap-5 text-[12px] text-white/40">
            <Link href="#" className="hover:text-white/70">Privacy</Link>
            <Link href="#" className="hover:text-white/70">Terms</Link>
            <Link href="#" className="hover:text-white/70">Security</Link>
            <Link href="#" className="hover:text-white/70">Responsible disclosure</Link>
          </div>
        </div>

        <div className="mt-8 rounded-md border border-line bg-ink-900/50 px-4 py-3 text-[11px] text-white/40">
          <span className="mono text-accent">Notice</span> — This is a front-end demonstration of Bharat Defence Network.
          All data, metrics, startups, patents, and members are sample content for illustrative purposes and do not
          imply endorsement by any government body.
        </div>
      </div>
    </footer>
  );
}
