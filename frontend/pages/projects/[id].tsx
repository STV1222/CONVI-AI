import { useMemo, useState } from "react";
import { useRouter } from "next/router";

import AppShell from "@/components/AppShell";
import { AiCallout, DataTable, GlassCard, ProgressBar, RiskBadge, SectionHeading, StatusBadge } from "@/components/ui";
import {
  getProjectAlerts,
  getProjectById,
  getProjectEquipment,
  getProjectProcurement,
  getProjectProgress,
  getProjectProviders,
  getProjectSafety,
  getProjectWorkPackages,
  projectTabs,
} from "@/data/mock";
import { formatDays, formatVariance } from "@/lib/format";
import type { ProjectDetailTab } from "@/types/light";

export default function ProjectDetailPage() {
  const router = useRouter();
  const projectId = typeof router.query.id === "string" ? router.query.id : "";
  const project = getProjectById(projectId);
  const [activeTab, setActiveTab] = useState<ProjectDetailTab["id"]>("overview");

  const detail = useMemo(() => {
    if (!projectId) return null;

    return {
      providers: getProjectProviders(projectId),
      workPackages: getProjectWorkPackages(projectId),
      procurement: getProjectProcurement(projectId),
      safety: getProjectSafety(projectId),
      equipment: getProjectEquipment(projectId),
      progress: getProjectProgress(projectId),
      alerts: getProjectAlerts(projectId),
    };
  }, [projectId]);

  if (!project || !detail) {
    return (
      <AppShell title="Project Not Found" description="The requested project could not be found in the showcase dataset.">
        <GlassCard>
          <p className="text-lg font-medium text-white">Project unavailable</p>
          <p className="mt-3 text-sm text-slate-300">Try opening one of the portfolio projects from the Projects page or the dashboard.</p>
        </GlassCard>
      </AppShell>
    );
  }

  const blockedPackages = detail.workPackages.filter((item) => item.status === "blocked").length;
  const procurementRisks = detail.procurement.filter((item) => item.deliveryStatus !== "confirmed").length;

  return (
    <AppShell
      title={project.name}
      description={`${project.location} · ${project.phase}. Drill into work allocation, providers, procurement, safety, and AI insights for this project.`}
    >
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard>
          <SectionHeading eyebrow="Project summary" title={project.name} description={project.summary} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <RiskBadge value={project.riskLevel} />
            <StatusBadge value={project.scheduleStatus} />
            <StatusBadge value={project.budgetStatus} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Client</p>
              <p className="mt-2 font-medium text-white">{project.client}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Lead PM</p>
              <p className="mt-2 font-medium text-white">{project.manager}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Site lead</p>
              <p className="mt-2 font-medium text-white">{project.siteLead}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Next milestone</p>
              <p className="mt-2 font-medium text-white">{project.nextMilestone}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-400">Completion</p>
              <p className="mt-2 text-3xl font-semibold text-white">{project.completion}%</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Budget variance</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatVariance(project.budgetVariancePct)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Schedule variance</p>
              <p className="mt-2 text-3xl font-semibold text-white">{formatDays(project.scheduleVarianceDays)}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-300">Project health score</span>
              <span className="font-medium text-white">{project.projectHealthScore}/100</span>
            </div>
            <ProgressBar
              value={project.projectHealthScore}
              tone={project.projectHealthScore > 84 ? "emerald" : project.projectHealthScore > 72 ? "amber" : "red"}
            />
          </div>
        </GlassCard>

        <div className="space-y-6">
          <AiCallout
            title={detail.alerts[0]?.title ?? "AI monitoring active"}
            summary={detail.alerts[0]?.summary ?? "No major risks detected."}
            action={detail.alerts[0]?.action ?? "Keep current execution plan."}
          />
          <GlassCard>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Current blockers</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Blocked work packages</p>
                <p className="mt-2 text-3xl font-semibold text-white">{blockedPackages}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Procurement risk items</p>
                <p className="mt-2 text-3xl font-semibold text-white">{procurementRisks}</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {detail.alerts.map((alert) => (
                <div key={alert.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-white">{alert.title}</p>
                    <RiskBadge value={alert.severity} />
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{alert.summary}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="mt-8 flex flex-wrap gap-3">
        {projectTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeTab === tab.id ? "bg-sky-400 text-slate-950" : "border border-white/10 bg-white/5 text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </section>

      <section className="mt-8 space-y-6">
        {(activeTab === "overview" || activeTab === "progress") && (
          <GlassCard>
            <SectionHeading
              eyebrow="Progress"
              title="Site progress tracker"
              description="Zone-based updates, milestone movement, and field reporting."
            />
            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {detail.progress.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-400">{item.date}</p>
                      <p className="mt-1 text-lg font-medium text-white">{item.zone}</p>
                    </div>
                    <StatusBadge value={item.status} />
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{item.summary}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-sm text-slate-400">Planned vs completed</p>
                      <p className="mt-2 font-medium text-white">
                        {item.completedTasks}/{item.plannedTasks} tasks completed
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-sm text-slate-400">Photo upload</p>
                      <p className="mt-2 font-medium text-white">{item.photoLabel}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
                    <p className="text-sm font-medium text-sky-100">Drone / image analysis</p>
                    <p className="mt-2 text-sm text-slate-200">{item.droneInsight}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {(activeTab === "overview" || activeTab === "allocation") && (
          <GlassCard>
            <SectionHeading
              eyebrow="Work allocation"
              title="Work package status"
              description="Track assigned teams, dependencies, and package execution status."
            />
            <div className="mt-6">
              <DataTable headers={["Work package", "Zone", "Assigned team", "Dates", "Priority", "Dependencies", "Status"]}>
                {detail.workPackages.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 text-sm text-white">{item.title}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">{item.zone}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">{item.assignedTeam}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {item.startDate} to {item.dueDate}
                    </td>
                    <td className="px-4 py-4 text-sm capitalize text-slate-300">{item.priority}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">{item.dependencies.join(", ") || "None"}</td>
                    <td className="px-4 py-4 text-sm">
                      <StatusBadge value={item.status} />
                    </td>
                  </tr>
                ))}
              </DataTable>
            </div>
          </GlassCard>
        )}

        {(activeTab === "overview" || activeTab === "providers") && (
          <GlassCard>
            <SectionHeading
              eyebrow="Providers"
              title="Subcontractors and suppliers"
              description="Commercial and performance visibility for the active project team."
            />
            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {detail.providers.map((provider) => (
                <div key={provider.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-medium text-white">{provider.name}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {provider.category} · {provider.contact}
                      </p>
                    </div>
                    <StatusBadge value={provider.contractStatus} />
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-sm text-slate-400">Performance score</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{provider.performanceScore}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-sm text-slate-400">On-time delivery</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{provider.onTimeScore}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Issue flags</p>
                    <p className="mt-2 text-sm text-white">{provider.issueFlags.join(", ") || "No active issue flags"}</p>
                  </div>
                  <p className="mt-4 text-sm text-sky-100">{provider.aiNote}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {(activeTab === "overview" || activeTab === "procurement") && (
          <GlassCard>
            <SectionHeading
              eyebrow="Procurement"
              title="Materials and delivery status"
              description="Track linked work packages and potential material shortages before they hit the schedule."
            />
            <div className="mt-6">
              <DataTable headers={["Material", "Required date", "Supplier", "ETA", "Status", "Shortage risk", "Work package"]}>
                {detail.procurement.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 text-sm text-white">{item.material}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">{item.requiredDate}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">{item.supplier}</td>
                    <td className="px-4 py-4 text-sm text-slate-300">{item.eta}</td>
                    <td className="px-4 py-4 text-sm">
                      <StatusBadge value={item.deliveryStatus} />
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <RiskBadge value={item.shortageRisk} />
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">{item.workPackage}</td>
                  </tr>
                ))}
              </DataTable>
            </div>
          </GlassCard>
        )}

        {(activeTab === "overview" || activeTab === "safety") && (
          <GlassCard>
            <SectionHeading
              eyebrow="Safety and quality"
              title="Incidents, inspections, and non-conformance"
              description="A combined safety and quality lens for field compliance and issue closeout."
            />
            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {detail.safety.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.type}</p>
                      <p className="mt-1 text-lg font-medium text-white">{item.title}</p>
                    </div>
                    <StatusBadge value={item.status} />
                  </div>
                  <p className="mt-3 text-sm text-slate-300">
                    {item.zone} · {item.owner} · {item.reportedAt}
                  </p>
                  <p className="mt-4 text-sm text-slate-200">{item.note}</p>
                  <div className="mt-4 inline-flex">
                    <StatusBadge value={item.severity} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {(activeTab === "overview" || activeTab === "budget") && (
          <GlassCard>
            <SectionHeading
              eyebrow="Budget and schedule"
              title="Commercial and delivery snapshot"
              description="A simple investor-demo ready budget and schedule summary."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Budget spent</p>
                <p className="mt-2 text-3xl font-semibold text-white">{project.budgetSpentPct}%</p>
                <p className="mt-2 text-sm text-slate-300">Against current baseline budget.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Forecast variance</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatVariance(project.budgetVariancePct)}</p>
                <p className="mt-2 text-sm text-slate-300">Primarily driven by active package recovery effort.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Schedule variance</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatDays(project.scheduleVarianceDays)}</p>
                <p className="mt-2 text-sm text-slate-300">Compared with current milestone baseline.</p>
              </div>
            </div>
          </GlassCard>
        )}

        {(activeTab === "overview" || activeTab === "ai") && (
          <GlassCard>
            <SectionHeading
              eyebrow="AI insights"
              title="Construction-aware recommendations"
              description="These demo insights show how Light connects site execution, procurement, providers, and equipment into operational guidance."
            />
            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {detail.alerts.map((alert) => (
                <AiCallout key={alert.id} title={alert.title} summary={alert.summary} action={alert.action} />
              ))}
              {detail.equipment.map((asset) => (
                <AiCallout key={asset.id} title={asset.name} summary={asset.insight} action={`Location: ${asset.activeLocation}. Utilization ${asset.utilizationRate}%.`} />
              ))}
            </div>
          </GlassCard>
        )}
      </section>
    </AppShell>
  );
}
