import AppShell from "@/components/AppShell";
import { GlassCard, SectionHeading, StatusBadge } from "@/components/ui";

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      description="A lightweight settings surface to make the showcase feel like a complete product platform."
    >
      <section className="grid gap-6 xl:grid-cols-2">
        <GlassCard>
          <SectionHeading eyebrow="Workspace" title="Organization configuration" description="Demo-only controls that illustrate product depth without building backend complexity." />
          <div className="mt-6 space-y-4">
            {[
              ["Default portfolio view", "Executive summary with project manager details"],
              ["AI alert threshold", "High and critical risk signals"],
              ["Daily summary cadence", "Every day at 18:00 local time"],
              ["Site reporting standard", "Zone-based update template enabled"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <SectionHeading eyebrow="Modules" title="Feature readiness" description="A simple way to show stakeholders which parts of the platform are live in the MVP." />
          <div className="mt-6 space-y-3">
            {[
              ["Dashboard", "live"],
              ["Projects", "live"],
              ["Site Progress", "live"],
              ["Work Allocation", "live"],
              ["Providers", "live"],
              ["Procurement", "live"],
              ["Safety & Quality", "live"],
              ["Equipment", "live"],
              ["AI Copilot", "demo"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">{label}</p>
                <StatusBadge value={value} />
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </AppShell>
  );
}
