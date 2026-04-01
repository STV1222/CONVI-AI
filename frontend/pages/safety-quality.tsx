import AppShell from "@/components/AppShell";
import { AiCallout, GlassCard, SectionHeading, StatusBadge } from "@/components/ui";
import { getProjectName, safetyRecords } from "@/data/mock";

export default function SafetyQualityPage() {
  return (
    <AppShell
      title="Safety & Quality"
      description="Monitor incidents, observations, inspections, PPE compliance, non-conformance, and corrective actions in one place."
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard>
          <SectionHeading
            eyebrow="Site controls"
            title="Safety and quality monitoring"
            description="This module demonstrates how Light can consolidate field safety, QA inspections, and issue closeout workflows."
          />
          <div className="mt-6 grid gap-4">
            {safetyRecords.map((record) => (
              <div key={record.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{record.type}</p>
                    <p className="mt-1 text-lg font-medium text-white">{record.title}</p>
                    <p className="mt-2 text-sm text-slate-400">
                      {getProjectName(record.projectId)} · {record.zone} · {record.reportedAt}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge value={record.severity} />
                    <StatusBadge value={record.status} />
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-300">{record.note}</p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Corrective owner</p>
                    <p className="mt-2 font-medium text-white">{record.owner}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">PPE compliance</p>
                    <p className="mt-2 font-medium text-white">{record.zone === "Zone C" ? "Needs reinforcement" : "Within expected range"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Corrective action</p>
                    <p className="mt-2 font-medium text-white">{record.status === "closed" ? "Completed" : "Tracking in progress"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <AiCallout
            title="Repeated PPE non-compliance in Zone C"
            summary="Harbor Point Mall shows a repeating pattern around overhead installation where eye protection and harness adherence are inconsistent."
            action="Increase supervisor walk frequency and run a focused toolbox talk before the next shift."
          />
          <AiCallout
            title="High-risk equipment behavior detected"
            summary="Field telemetry and site observations suggest one crane is operating outside its normal vibration pattern."
            action="Complete the inspection before the next critical lifting window."
          />
          <AiCallout
            title="Quality deviation between planned and executed wall section"
            summary="Greenline's facade sealant finish varies from the approved visual standard and may affect client sign-off."
            action="Repeat the mock-up closeout process and retrain the install crew on surface preparation sequence."
          />
        </div>
      </section>
    </AppShell>
  );
}
