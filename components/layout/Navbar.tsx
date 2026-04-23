"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/problems", label: "Problems" },
  { href: "/projects", label: "Projects" },
  { href: "/labs", label: "AI Labs" },
  { href: "/creators", label: "Creators" },
  { href: "/startups", label: "Startups" },
  { href: "/summit", label: "Summit" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-ink-950/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-[13px] transition-colors",
                    active ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-[1px] h-px bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden md:inline-flex text-[13px] text-white/70 hover:text-white px-3 py-1.5 rounded-md"
          >
            Partner with us
          </Link>
          <Link
            href="/login"
            className="hidden sm:inline-flex btn-ghost !py-2 !px-3.5 !text-[13px]"
          >
            Member sign in
          </Link>
          <Link
            href="/dashboard"
            className="btn-accent !py-2 !px-3.5 !text-[13px]"
          >
            Enter platform <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden ml-1 rounded-md border border-line p-2 text-white/80"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-ink-950/95 backdrop-blur-md">
          <div className="container-page flex flex-col py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm text-white/80 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-line">
              <Link href="/login" className="btn-ghost">Sign in</Link>
              <Link href="/dashboard" className="btn-accent">Enter platform</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
