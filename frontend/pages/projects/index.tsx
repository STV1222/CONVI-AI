import { MapPin, UserRound } from "lucide-react";
import Link from "next/link";

import AppShell from "@/components/AppShell";
import { GlassCard, ProgressBar, RiskBadge, SectionHeading, StatusBadge } from "@/components/ui";
import { projects } from "@/data/mock";
import { formatDays, formatVariance } from "@/lib/format";

export default function ProjectsPage() {
  return (
    <AppShell
      title="Projects"
      description="A structured view of all active construction projects with schedule, budget, and risk indicators."
    >
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Active portfolio"
          title="Current projects"
          description="Each project card is designed to answer the core demo question quickly: what is happening, who owns it, and where is the risk."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {projects.map((project) => (
            <GlassCard key={project.id} className="h-full">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href={`/projects/${project.id}`} className="text-2xl font-semibold tracking-tight text-white hover:text-sky-200">
                      {project.name}
                    </Link>
                    <RiskBadge value={project.riskLevel} />
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{project.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge value={project.scheduleStatus} />
                  <StatusBadge value={project.budgetStatus} />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <UserRound className="h-4 w-4 text-sky-300" />
                    Lead PM
                  </div>
                  <p className="mt-2 font-medium text-white">{project.manager}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="h-4 w-4 text-sky-300" />
                    Location
                  </div>
                  <p className="mt-2 font-medium text-white">{project.location}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phase</p>
                  <p className="mt-2 text-sm text-white">{project.phase}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Completion</p>
                  <p className="mt-2 text-sm text-white">{project.completion}%</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Budget status</p>
                  <p className="mt-2 text-sm text-white">{formatVariance(project.budgetVariancePct)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Schedule status</p>
                  <p className="mt-2 text-sm text-white">{formatDays(project.scheduleVarianceDays)}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Health score</span>
                  <span className="font-medium text-white">{project.projectHealthScore}/100</span>
                </div>
                <ProgressBar
                  value={project.projectHealthScore}
                  tone={project.projectHealthScore > 84 ? "emerald" : project.projectHealthScore > 72 ? "amber" : "red"}
                />
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-sm text-slate-400">Next milestone</p>
                  <p className="mt-1 text-sm font-medium text-white">{project.nextMilestone}</p>
                </div>
                <Link href={`/projects/${project.id}`} className="text-sm font-medium text-sky-200">
                  Open project
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
