import AppShell from "@/components/AppShell";
import { AiCallout, GlassCard, SectionHeading, StatusBadge } from "@/components/ui";
import { equipmentAssets, getProjectName } from "@/data/mock";

export default function EquipmentPage() {
  return (
    <AppShell
      title="Equipment"
      description="A lightweight equipment and maintenance dashboard with utilization, service status, downtime risk, and predictive insights."
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard>
          <SectionHeading
            eyebrow="Equipment operations"
            title="Asset and maintenance dashboard"
            description="Demo-friendly equipment visibility for heavy assets, maintenance planning, and predictive service alerts."
          />
          <div className="mt-6 grid gap-4">
            {equipmentAssets.map((asset) => (
              <div key={asset.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-medium text-white">{asset.name}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {asset.type} · {getProjectName(asset.projectId)}
                    </p>
                  </div>
                  <StatusBadge value={asset.maintenanceStatus} />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Utilization rate</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{asset.utilizationRate}%</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Last service</p>
                    <p className="mt-2 text-sm font-medium text-white">{asset.lastServiceDate}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Downtime risk</p>
                    <p className="mt-2 text-sm font-medium capitalize text-white">{asset.downtimeRisk}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Active location</p>
                    <p className="mt-2 text-sm font-medium text-white">{asset.activeLocation}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-sky-100">{asset.insight}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <AiCallout
            title="Excavator EX-14 may require service in 5 days"
            summary="Hydraulic pressure and usage patterns suggest the Skyline asset is approaching its service threshold sooner than planned."
            action="Schedule maintenance before the next major excavation handoff to avoid downtime risk."
          />
          <AiCallout
            title="Crane vibration anomaly detected"
            summary="Telemetry on TC-02 shows irregular movement under peak loading periods compared with its normal operating pattern."
            action="Complete inspection and limit usage to approved lift windows until cleared."
          />
          <AiCallout
            title="Bulldozer idle utilization exceeds threshold"
            summary="BD-05 is underused relative to its allocation on Delta Logistics Hub and is consuming avoidable standby cost."
            action="Reassign to another site or demobilize after current grading activities."
          />
        </div>
      </section>
    </AppShell>
  );
}
