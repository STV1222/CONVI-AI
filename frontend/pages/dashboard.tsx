import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CircleDollarSign,
  Clock3,
  FolderKanban,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

import AppShell from "@/components/AppShell";
import {
  BudgetForecastChart,
  ResourceUtilizationChart,
  RiskDistributionChart,
  ScheduleProgressChart,
} from "@/components/charts";
import { AiCallout, GlassCard, HealthIndicator, MetricCard, RiskBadge, SectionHeading, StatusBadge } from "@/components/ui";
import { aiAlerts, budgetChart, dashboardStats, projects, resourceChart, riskDistribution, scheduleChart, weeklySummary } from "@/data/mock";
import { formatDays, formatVariance } from "@/lib/format";

export default function DashboardPage() {
  return (
    <AppShell
      title="Portfolio Command Center"
      description="A premium operations dashboard for monitoring active sites, execution health, procurement pressure, provider risk, and AI-driven interventions."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <MetricCard label="Total active projects" value={dashboardStats.totalActiveProjects} delta="Portfolio live" />
        <MetricCard label="Delayed projects" value={dashboardStats.delayedProjects} delta="Need intervention" tone="alert" />
        <MetricCard label="Budget risk count" value={dashboardStats.budgetRiskCount} delta="Forecast variance rising" tone="alert" />
        <MetricCard label="Subcontractor issues" value={dashboardStats.subcontractorIssues} delta="Performance watchlist" />
        <MetricCard label="Safety incidents" value={dashboardStats.safetyIncidents} delta="1 open high-priority event" tone="alert" />
        <MetricCard label="Pending procurement items" value={dashboardStats.pendingProcurementItems} delta="Delivery coordination needed" />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <GlassCard>
          <SectionHeading
            eyebrow="Executive summary"
            title="AI-generated weekly portfolio brief"
            description={weeklySummary}
            action={
              <Link href="/ai-copilot" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
                Open copilot
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3 text-slate-300">
                <FolderKanban className="h-5 w-5 text-sky-300" />
                Project health
              </div>
              <p className="mt-4 text-4xl font-semibold text-white">78/100</p>
              <p className="mt-2 text-sm text-slate-400">Weighted across schedule, budget, safety, and provider reliability.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3 text-slate-300">
                <CircleDollarSign className="h-5 w-5 text-amber-300" />
                Budget signal
              </div>
              <p className="mt-4 text-4xl font-semibold text-white">+4.1%</p>
              <p className="mt-2 text-sm text-slate-400">Average forecast variance on risk-flagged projects.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3 text-slate-300">
                <Clock3 className="h-5 w-5 text-red-300" />
                Schedule risk
              </div>
              <p className="mt-4 text-4xl font-semibold text-white">3 sites</p>
              <p className="mt-2 text-sm text-slate-400">Require recovery actions within the next 7 days.</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionHeading eyebrow="AI alerts" title="Priority interventions" description="Operational problems surfaced by the Light intelligence layer." />
          <div className="mt-6 space-y-4">
            {aiAlerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">{alert.category}</p>
                    <p className="mt-1 font-medium text-white">{alert.title}</p>
                  </div>
                  <RiskBadge value={alert.severity} />
                </div>
                <p className="mt-3 text-sm text-slate-300">{alert.summary}</p>
                <p className="mt-3 text-sm text-sky-100">{alert.action}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <GlassCard>
          <SectionHeading eyebrow="Schedule" title="Schedule progress vs plan" description="Progress tracking across active projects." />
          <div className="mt-6">
            <ScheduleProgressChart data={scheduleChart} />
          </div>
        </GlassCard>

        <GlassCard>
          <SectionHeading eyebrow="Budget" title="Budget status and forecast" description="Baseline versus current forecast on each major project." />
          <div className="mt-6">
            <BudgetForecastChart data={budgetChart} />
          </div>
        </GlassCard>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard>
          <SectionHeading eyebrow="Resources" title="Crew and equipment usage" description="Spot over-allocation, idle assets, and cross-site balancing opportunities." />
          <div className="mt-6">
            <ResourceUtilizationChart data={resourceChart} />
          </div>
        </GlassCard>

        <GlassCard>
          <SectionHeading eyebrow="Risk profile" title="Portfolio risk distribution" description="Current project risk mix based on AI health scoring." />
          <div className="mt-6">
            <RiskDistributionChart data={riskDistribution} />
          </div>
        </GlassCard>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard>
          <SectionHeading eyebrow="Project health" title="At-a-glance project overview" description="Managers can assess delivery health within seconds." />
          <div className="mt-6 grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link href={`/projects/${project.id}`} className="text-lg font-medium text-white hover:text-sky-200">
                        {project.name}
                      </Link>
                      <StatusBadge value={project.scheduleStatus} />
                      <StatusBadge value={project.budgetStatus} />
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      {project.client} · {project.location} · {project.phase}
                    </p>
                  </div>
                  <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-3 xl:w-[420px]">
                    <div>
                      <p className="text-slate-500">Completion</p>
                      <p className="font-medium text-white">{project.completion}%</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Schedule</p>
                      <p className="font-medium text-white">{formatDays(project.scheduleVarianceDays)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Budget</p>
                      <p className="font-medium text-white">{formatVariance(project.budgetVariancePct)}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <HealthIndicator label="Health score" value={project.projectHealthScore} status={project.scheduleStatus} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <AiCallout
            title="Reassign Crew B to Zone 3 to prevent a 2-day delay"
            summary="Aurora Tower can recover the current rough-in slippage if structure support is temporarily rebalanced and cable tray delivery is prioritized."
            action="Expected impact: restore 1.5 days on the current milestone chain and reduce overtime cost exposure."
          />
          <AiCallout
            title="Crane usage conflict detected on Wednesday"
            summary="Delta Logistics Hub shows overlap between steel unloading and mobile crane lift windows."
            action="Recommended action: shift unloading to 07:00 and reserve the crane from 11:00 to 15:00 for primary erection lifts."
          />
          <AiCallout
            title="Concrete team under-allocated for next phase"
            summary="Aurora's next slab pour sequence will require 3 additional workers if the podium and tower packages run in parallel."
            action="Suggested action: borrow labor from Skyline for a two-day recovery window."
          />
          <GlassCard>
            <div className="flex items-center gap-3 text-slate-300">
              <BriefcaseBusiness className="h-5 w-5 text-sky-300" />
              Provider watchlist
            </div>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Prime Electrical Services</p>
                <p className="mt-2 text-sm text-slate-400">Performance dropped on two projects after repeated late mobilization.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">BlueSpan Steel</p>
                <p className="mt-2 text-sm text-slate-400">Supplier delivery risk is the main driver of Delta&apos;s current schedule pressure.</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3 text-slate-300">
              <ShieldAlert className="h-5 w-5 text-amber-300" />
              Safety pulse
            </div>
              <p className="mt-4 text-sm text-slate-300">
                Harbor Point Mall has repeated PPE non-compliance in Zone C, while Delta&apos;s laydown area requires pedestrian segregation correction.
              </p>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3 text-slate-300">
              <AlertTriangle className="h-5 w-5 text-red-300" />
              Demo note
            </div>
            <p className="mt-4 text-sm text-slate-300">
              All data and AI recommendations are mocked for showcase storytelling, but the workflows and information architecture are designed to feel operationally believable.
            </p>
          </GlassCard>
        </div>
      </section>
    </AppShell>
  );
}
