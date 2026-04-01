import type { RiskLevel } from "@/types/light";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPercent(value: number) {
  return `${value}%`;
}

export function formatVariance(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function formatDays(value: number) {
  if (value === 0) return "On baseline";
  return value > 0 ? `${value} days ahead` : `${Math.abs(value)} days behind`;
}

export function statusTone(value: string) {
  switch (value) {
    case "critical":
    case "high":
    case "at-risk":
    case "delayed":
    case "blocked":
    case "attention":
    case "major":
      return "bg-red-500/12 text-red-200 ring-1 ring-inset ring-red-400/30";
    case "medium":
    case "watch":
    case "in-transit":
    case "planned":
    case "scheduled":
    case "moderate":
      return "bg-amber-500/12 text-amber-200 ring-1 ring-inset ring-amber-400/30";
    case "low":
    case "on-track":
    case "confirmed":
    case "complete":
    case "healthy":
    case "closed":
    case "minor":
      return "bg-emerald-500/12 text-emerald-200 ring-1 ring-inset ring-emerald-400/30";
    case "in-progress":
    case "active":
      return "bg-sky-500/12 text-sky-200 ring-1 ring-inset ring-sky-400/30";
    case "open":
    case "monitoring":
    case "under-review":
    case "pending-renewal":
      return "bg-violet-500/12 text-violet-200 ring-1 ring-inset ring-violet-400/30";
    default:
      return "bg-white/10 text-slate-200 ring-1 ring-inset ring-white/10";
  }
}

export function riskPillTone(level: RiskLevel) {
  switch (level) {
    case "critical":
      return "bg-red-500 text-white";
    case "high":
      return "bg-red-500/80 text-white";
    case "medium":
      return "bg-amber-400 text-slate-950";
    case "low":
      return "bg-emerald-400 text-slate-950";
    default:
      return "bg-slate-500 text-white";
  }
}
