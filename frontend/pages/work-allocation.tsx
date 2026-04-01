import AppShell from "@/components/AppShell";
import { AiCallout, DataTable, GlassCard, SectionHeading, StatusBadge } from "@/components/ui";
import { getProjectName, workPackages } from "@/data/mock";

export default function WorkAllocationPage() {
  const totalWorkforce = workPackages.reduce((total, item) => total + item.workforce, 0);
  const blockedCount = workPackages.filter((item) => item.status === "blocked").length;

  return (
    <AppShell
      title="Work Allocation"
      description="Assign work across zones, phases, subcontractors, and crews while keeping dependencies and workforce loading visible."
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard>
          <SectionHeading
            eyebrow="Assignment board"
            title="Tasks by zone and phase"
            description="A clean work allocation view for project managers coordinating teams, subcontractors, and critical dependencies."
          />
          <div className="mt-6">
            <DataTable headers={["Task", "Project", "Zone", "Assigned team", "Start", "Due", "Priority", "Dependencies", "Status"]}>
              {workPackages.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 text-sm text-white">{item.title}</td>
                  <td className="px-4 py-4 text-sm text-slate-300">{getProjectName(item.projectId)}</td>
                  <td className="px-4 py-4 text-sm text-slate-300">{item.zone}</td>
                  <td className="px-4 py-4 text-sm text-slate-300">{item.assignedTeam}</td>
                  <td className="px-4 py-4 text-sm text-slate-300">{item.startDate}</td>
                  <td className="px-4 py-4 text-sm text-slate-300">{item.dueDate}</td>
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

        <div className="space-y-6">
          <GlassCard>
            <SectionHeading eyebrow="Workforce summary" title="Allocation pulse" description="A quick readout for manager-level labor balancing." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Assigned workforce</p>
                <p className="mt-2 text-3xl font-semibold text-white">{totalWorkforce}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Blocked packages</p>
                <p className="mt-2 text-3xl font-semibold text-white">{blockedCount}</p>
              </div>
            </div>
          </GlassCard>
          <AiCallout
            title="Reassign Crew B to Zone 3 to prevent a 2-day delay"
            summary="Aurora's framing and rough-in recovery can improve if support labor is shifted for two days from lower-pressure works."
            action="Move 4 workers from Skyline's optimization package to Aurora by Tuesday morning."
          />
          <AiCallout
            title="Crane usage conflict detected on Wednesday"
            summary="Delta Logistics Hub currently overlaps unloading, steel erection, and roof insulation staging in the same equipment window."
            action="Move unloading earlier and reserve the mobile crane for erection after 11:00."
          />
          <AiCallout
            title="Concrete team under-allocated for next phase"
            summary="Aurora's podium and tower sequencing will both peak in the same 48-hour window."
            action="Increase concrete crew allocation by 3 and confirm pump booking one day earlier."
          />
        </div>
      </section>
    </AppShell>
  );
}
