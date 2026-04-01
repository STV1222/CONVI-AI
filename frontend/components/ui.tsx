import type { ReactNode } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { cn, formatPercent, riskPillTone, statusTone } from "@/lib/format";
import type { HealthState, RiskLevel } from "@/types/light";

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "themed-glass rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.35)] backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">{eyebrow}</p> : null}
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          {description ? <p className="max-w-3xl text-sm text-slate-300">{description}</p> : null}
        </div>
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ value }: { value: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize", statusTone(value as never))}>
      {value.replace("-", " ")}
    </span>
  );
}

export function RiskBadge({ value }: { value: RiskLevel }) {
  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide", riskPillTone(value))}>{value}</span>;
}

export function MetricCard({
  label,
  value,
  delta,
  tone = "default",
}: {
  label: string;
  value: string | number;
  delta: string;
  tone?: "default" | "alert" | "good";
}) {
  const toneClass =
    tone === "alert"
      ? "from-red-500/20 via-slate-950 to-slate-950"
      : tone === "good"
        ? "from-emerald-500/20 via-slate-950 to-slate-950"
        : "from-sky-500/20 via-slate-950 to-slate-950";

  return (
    <GlassCard className={cn("bg-gradient-to-br", toneClass)}>
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-4xl font-semibold text-white">{value}</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {delta}
        </span>
      </div>
    </GlassCard>
  );
}

export function ProgressBar({
  value,
  tone = "sky",
}: {
  value: number;
  tone?: "sky" | "emerald" | "amber" | "red";
}) {
  const barTone = {
    sky: "bg-sky-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    red: "bg-red-400",
  }[tone];

  return (
    <div className="h-2.5 rounded-full bg-white/10">
      <div className={cn("h-2.5 rounded-full", barTone)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function HealthIndicator({
  label,
  value,
  status,
}: {
  label: string;
  value: number;
  status: HealthState;
}) {
  const tone = status === "on-track" ? "emerald" : status === "watch" ? "amber" : "red";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-medium text-white">{formatPercent(value)}</span>
      </div>
      <ProgressBar value={value} tone={tone} />
    </div>
  );
}

export function AiCallout({
  title,
  summary,
  action,
}: {
  title: string;
  summary: string;
  action: string;
}) {
  return (
    <div className="themed-ai-callout rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-sky-200">
        <Sparkles className="h-4 w-4" />
        AI Recommendation
      </div>
      <p className="text-base font-medium text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-300">{summary}</p>
      <p className="mt-3 text-sm text-sky-100">{action}</p>
    </div>
  );
}

export function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="themed-table overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left">
          <thead className="bg-white/5">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
