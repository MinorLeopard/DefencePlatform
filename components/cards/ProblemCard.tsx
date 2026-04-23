import Link from "next/link";
import { Clock, Users, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatINR } from "@/lib/format";
import type { Problem } from "@/data/problems";

const statusTone: Record<string, any> = {
  Open: "green",
  Scouting: "cyan",
  "In Review": "amber",
  Awarded: "neutral",
  Prototyping: "accent",
  Closed: "red",
};
const difficultyTone: Record<string, any> = {
  Explorer: "cyan",
  Builder: "green",
  Flagship: "accent",
  Moonshot: "amber",
};

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link href={`/problems/${problem.slug}`} className="block focus:outline-none">
      <Card className="h-full p-6 transition-transform hover:-translate-y-[1px]">
        <div className="flex items-center justify-between">
          <span className="mono text-[10px]">{problem.id}</span>
          <Badge tone={statusTone[problem.status]} dot>
            {problem.status}
          </Badge>
        </div>

        <h3 className="mt-4 font-display text-[18px] font-semibold leading-snug tracking-tight text-white group-hover:text-white">
          {problem.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-white/60">
          {problem.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{problem.domain}</Badge>
          <Badge tone={difficultyTone[problem.difficulty]}>{problem.difficulty}</Badge>
          <Badge tone="neutral">TRL {problem.trl.from}–{problem.trl.to}</Badge>
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-line pt-4">
          <div>
            <div className="mono text-[9.5px]">Bounty pool</div>
            <div className="mt-1 font-display text-[18px] font-semibold text-white">{formatINR(problem.bounty)}</div>
          </div>
          <div className="flex flex-col items-end gap-1 text-[11px] text-white/50">
            <span className="inline-flex items-center gap-1.5"><Users className="h-3 w-3" />{problem.teams} teams · {problem.applicants} applicants</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" />{problem.timeline}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-[11px] text-white/50">
          <span>Sponsored by <span className="text-white/75">{problem.sponsor}</span></span>
          <span className="inline-flex items-center gap-1 text-accent">
            Open card <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
