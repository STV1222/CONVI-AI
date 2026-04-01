import AppShell from "@/components/AppShell";
import { AiCallout, GlassCard, ProgressBar, SectionHeading, StatusBadge } from "@/components/ui";
import { progressUpdates, projects } from "@/data/mock";

export default function SiteProgressPage() {
  return (
    <AppShell
      title="Site Progress"
      description="Daily and zone-based progress tracking for field teams, managers, and executives who need rapid operational visibility."
    >
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard>
          <SectionHeading
            eyebrow="Progress tracking"
            title="Area and zone-based updates"
            description="Capture completed versus planned work, upload photos, review drone analysis placeholders, and narrate daily production."
          />
          <div className="mt-6 grid gap-4">
            {progressUpdates.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{item.date}</p>
                    <p className="mt-1 text-lg font-medium text-white">{item.zone}</p>
                    <p className="mt-1 text-sm text-slate-400">{projects.find((project) => project.id === item.projectId)?.name}</p>
                  </div>
                  <StatusBadge value={item.status} />
                </div>

                <p className="mt-4 text-sm text-slate-300">{item.summary}</p>

                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Daily output</p>
                    <p className="mt-2 text-base font-medium text-white">
                      {item.completedTasks} of {item.plannedTasks} planned tasks completed
                    </p>
                    <div className="mt-3">
                      <ProgressBar value={(item.completedTasks / item.plannedTasks) * 100} tone={item.completedTasks === item.plannedTasks ? "emerald" : item.completedTasks >= item.plannedTasks - 1 ? "amber" : "red"} />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Photo upload placeholder</p>
                    <div className="mt-3 flex h-28 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 text-center text-sm text-slate-400">
                      {item.photoLabel}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
                    <p className="text-sm font-medium text-sky-100">Drone / image analysis</p>
                    <p className="mt-3 text-sm text-slate-200">{item.droneInsight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <AiCallout
            title="AI-generated daily summary"
            summary="Foundation works are complete across the active concrete packages. Tower A level 12 framing remains in progress, while Harbor Point's HVAC balancing is 2 days behind planned completion."
            action="Recommended focus tomorrow: recover Aurora rough-in access and unblock Harbor Point material approval."
          />
          <GlassCard>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Progress history</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Yesterday</p>
                <p className="mt-2 text-sm text-slate-300">4 zones completed above plan, 2 zones on watch, 2 blocked by logistics or MEP dependencies.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">This week</p>
                <p className="mt-2 text-sm text-slate-300">Portfolio productivity is stable overall, with key variance coming from procurement-linked activities rather than crew productivity.</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Field workflow</p>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <p>1. Supervisor logs the day by zone and work package.</p>
              <p>2. Photos, drone scans, and notes become part of the project history.</p>
              <p>3. AI creates a concise summary for management and flags slippage early.</p>
            </div>
          </GlassCard>
        </div>
      </section>
    </AppShell>
  );
}
