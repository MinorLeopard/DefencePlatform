import Link from "next/link";
import { Star, GitBranch, CircleDot, GitPullRequest } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AvatarStack } from "@/components/ui/Avatar";
import { formatCompact } from "@/lib/format";
import type { Project } from "@/data/projects";

const stageTone: Record<string, any> = {
  Concept: "cyan",
  Prototype: "amber",
  Pilot: "accent",
  Production: "green",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block focus:outline-none">
      <Card className="h-full p-6 transition-transform hover:-translate-y-[1px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[13px] text-white">{project.name}</span>
            <Badge tone={stageTone[project.stage]}>{project.stage}</Badge>
          </div>
          <span className="mono text-[9.5px]">{project.license}</span>
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-white/70">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-1.5">
          {project.languages.slice(0, 4).map((l) => (
            <span key={l.name} title={`${l.name} · ${l.pct}%`} className="h-1.5 rounded-full" style={{ background: l.color, width: `${l.pct}%` }} />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] text-white/55">
          {project.languages.slice(0, 4).map((l) => (
            <span key={l.name} className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.color }} />
              {l.name} {l.pct}%
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[12px] text-white/60">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" />{formatCompact(project.stars)}</span>
            <span className="inline-flex items-center gap-1"><GitBranch className="h-3 w-3" />{formatCompact(project.forks)}</span>
            <span className="inline-flex items-center gap-1"><CircleDot className="h-3 w-3" />{project.openIssues}</span>
            <span className="inline-flex items-center gap-1"><GitPullRequest className="h-3 w-3" />{project.openPRs}</span>
          </div>
          <AvatarStack names={project.maintainers.map((m) => m.name)} size={22} max={3} />
        </div>
      </Card>
    </Link>
  );
}
