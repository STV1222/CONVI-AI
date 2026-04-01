import AppShell from "@/components/AppShell";
import { AiCallout, DataTable, GlassCard, RiskBadge, SectionHeading, StatusBadge } from "@/components/ui";
import { getProjectName, procurementItems } from "@/data/mock";

export default function ProcurementPage() {
  return (
    <AppShell
      title="Procurement"
      description="Track material readiness, supplier commitments, and shortage risk across the construction portfolio."
    >
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard>
          <SectionHeading
            eyebrow="Materials tracking"
            title="Procurement status"
            description="A procurement-focused view for linking material ETA to project and work package execution."
          />
          <div className="mt-6">
            <DataTable headers={["Material", "Required", "Supplier", "ETA", "Delivery status", "Shortage risk", "Project", "Work package"]}>
              {procurementItems.map((item) => (
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
                  <td className="px-4 py-4 text-sm text-slate-300">{getProjectName(item.projectId)}</td>
                  <td className="px-4 py-4 text-sm text-slate-300">{item.workPackage}</td>
                </tr>
              ))}
            </DataTable>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <SectionHeading eyebrow="Procurement pulse" title="Portfolio summary" description="Believable metrics for a demo-ready procurement storyline." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Tracked items</p>
                <p className="mt-2 text-3xl font-semibold text-white">{procurementItems.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">At-risk deliveries</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {procurementItems.filter((item) => item.deliveryStatus === "delayed" || item.deliveryStatus === "at-risk").length}
                </p>
              </div>
            </div>
          </GlassCard>
          <AiCallout
            title="Concrete delivery may impact Tower B slab pour"
            summary="A late tray and support material sequence on Aurora could compress the concrete pour handoff if unresolved by Tuesday."
            action="Prioritize the blocked delivery and confirm the pump slot 24 hours earlier than normal."
          />
          <AiCallout
            title="Steel shipment risk detected due to supplier delay"
            summary="Delta's steel frame lot 2 remains the main schedule threat because fabrication release has already slipped by 48 hours."
            action="Split the load and use a backup hauler for partial recovery."
          />
          <AiCallout
            title="Recommend alternate supplier for insulation panels"
            summary="EcoShield's factory backlog may push the roofing insulation package beyond the acceptable float window."
            action="Hold alternate panel supply ready for immediate release if ETA drifts another 24 hours."
          />
        </div>
      </section>
    </AppShell>
  );
}
