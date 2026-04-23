"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  GitBranch,
  Sparkles,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Beaker,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { currentMember } from "@/data/members";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/workspace", label: "My workspace", icon: Compass },
  { href: "/dashboard/projects", label: "Projects", icon: GitBranch },
  { href: "/labs", label: "AI Labs", icon: Beaker },
  { href: "/assistant", label: "AI assistant", icon: Sparkles, highlight: true },
  { href: "/community/private", label: "Private rooms", icon: MessageSquare },
  { href: "/dashboard/network", label: "Network", icon: Users },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MemberShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 flex-shrink-0 border-r border-line bg-ink-950/80 md:flex md:flex-col">
        <div className="px-5 pt-6 pb-4">
          <Link
            href={`/members/${currentMember.slug}`}
            className="flex items-center gap-3 rounded-md border border-line bg-ink-900 p-2.5 transition-colors hover:border-line-strong"
          >
            <Avatar name={currentMember.name} size={28} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12.5px] font-medium text-white">{currentMember.name}</div>
              <div className="truncate text-[10.5px] text-white/50">{currentMember.org} · {currentMember.tier}</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-white/40" />
          </Link>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-[12.5px] transition-colors",
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-white/65 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", item.highlight && !active && "text-accent")} />
                {item.label}
                {item.highlight && !active && (
                  <span className="ml-auto rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] uppercase text-accent">New</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-line p-3">
          <Link href="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-[12px] text-white/50 hover:bg-white/5 hover:text-white">
            <LogOut className="h-3.5 w-3.5" />
            Leave workspace
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 items-center justify-between border-b border-line bg-ink-950/60 px-5 md:px-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
            <input
              placeholder="Jump to a problem, project, or member..."
              className="w-full rounded-md border border-line bg-ink-900/80 py-2 pl-9 pr-3 text-[12.5px] placeholder:text-white/30 focus:border-line-strong focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-8 w-8 items-center justify-center rounded-md border border-line text-white/70 hover:text-white">
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
            <div className="hidden md:flex items-center gap-2 border-l border-line pl-3 text-[11px] text-white/50">
              <span className="mono">MEMBER</span>
              <span>· Verified builder</span>
            </div>
          </div>
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
