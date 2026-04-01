import AppShell from "@/components/AppShell";
import { AiCallout, GlassCard, SectionHeading, StatusBadge } from "@/components/ui";
import { getProjectName, providers } from "@/data/mock";

export default function ProvidersPage() {
  return (
    <AppShell
      title="Providers"
      description="Manage subcontractors and suppliers with contract visibility, performance scoring, issue flags, and AI recommendations."
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard>
          <SectionHeading
            eyebrow="Provider network"
            title="Subcontractors and suppliers"
            description="A credible provider management view for comparing execution quality, delivery reliability, and active project exposure."
          />
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {providers.map((provider) => (
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
                  <p className="text-sm text-slate-400">Current assignments</p>
                  <p className="mt-2 text-sm text-white">
                    {provider.activeProjects.length > 0 ? provider.activeProjects.map(getProjectName).join(", ") : "Not currently assigned"}
                  </p>
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

        <div className="space-y-6">
          <AiCallout
            title="Supplier X has rising delivery risk"
            summary="BlueSpan Steel is showing repeated slippage against committed fabrication release dates on Delta Logistics Hub."
            action="Lock a backup transport partner and split the upcoming steel shipment into staged lots."
          />
          <AiCallout
            title="Electrical subcontractor performance dropped on 2 projects"
            summary="Prime Electrical Services now has low on-time reliability across Aurora and Greenline after multiple late starts."
            action="Escalate a recovery meeting and hold VoltEdge as a prequalified alternative."
          />
          <AiCallout
            title="Alternative vendor available for steel delivery"
            summary="The market pool shows one standby logistics partner with enough capacity for partial recovery on the north span package."
            action="Use alternate transport for the next 74-ton shipment to preserve the erection sequence."
          />
        </div>
      </section>
    </AppShell>
  );
}
