import Head from "next/head";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  ChartColumnBig,
  ClipboardCheck,
  Shield,
} from "lucide-react";

import { LightWordmark } from "@/components/LightWordmark";
import { aiAlerts, dashboardStats, projects } from "@/data/mock";
import { ThemeToggle } from "@/components/theme";
import { GlassCard, ProgressBar } from "@/components/ui";

const features = [
  {
    title: "Portfolio visibility",
    description: "Track active projects, risk levels, health scores, budget drift, and critical delays across the full company portfolio.",
    icon: ChartColumnBig,
  },
  {
    title: "Work coordination",
    description: "Assign work by zone, phase, team, and subcontractor with clear dependencies and workforce loading.",
    icon: ClipboardCheck,
  },
  {
    title: "Provider intelligence",
    description: "Monitor subcontractor performance, supplier delivery reliability, and contract issues before they disrupt execution.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Safety and equipment oversight",
    description: "Surface incidents, compliance risks, inspections, and predictive maintenance insights in one operating system.",
    icon: Shield,
  },
];

const customerSegments = [
  "Company Owners and Executives",
  "Project Managers",
  "Site Engineers and Supervisors",
  "Procurement Managers",
  "Safety and Quality Managers",
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Light | AI-Powered Construction Management</title>
        <meta
          name="description"
          content="Light is an AI-powered construction operating system for project visibility, site progress, procurement, safety, and intelligent decision-making."
        />
      </Head>

      <div className="marketing-shell min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#f8fafc_55%,#ffffff_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="marketing-header flex flex-col gap-4 rounded-[32px] border border-white/10 bg-slate-950/70 px-6 py-5 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                AI Construction OS
              </div>
              <div className="mt-2">
                <LightWordmark />
              </div>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <a href="#features">Features</a>
              <a href="#ai">AI Layer</a>
              <a href="#customers">Who It&apos;s For</a>
              <ThemeToggle />
              <Link href="/dashboard" className="rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-2 font-medium text-white">
                View Demo
              </Link>
            </nav>
          </header>

          <section className="grid gap-8 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200">Built for modern construction operators</p>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl">
                  One intelligent view of progress, providers, procurement, safety, and project risk.
                </h1>
                <p className="max-w-2xl text-lg text-slate-300">
                  Light gives construction companies a premium command center for tracking site execution and using AI to spot delays,
                  cost pressure, supplier risk, and resource conflicts before they become expensive surprises.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
                >
                  View Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#request-access"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Request Access
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <GlassCard className="bg-white/5">
                  <p className="text-sm text-slate-400">Active projects</p>
                  <p className="mt-3 text-4xl font-semibold">{dashboardStats.totalActiveProjects}</p>
                </GlassCard>
                <GlassCard className="bg-white/5">
                  <p className="text-sm text-slate-400">Pending procurement risks</p>
                  <p className="mt-3 text-4xl font-semibold">{dashboardStats.pendingProcurementItems}</p>
                </GlassCard>
                <GlassCard className="bg-white/5">
                  <p className="text-sm text-slate-400">AI interventions this week</p>
                  <p className="mt-3 text-4xl font-semibold">{aiAlerts.length}</p>
                </GlassCard>
              </div>
            </div>

            <GlassCard className="overflow-hidden p-0">
              <div className="border-b border-white/10 bg-white/5 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Portfolio command center preview</p>
                    <p className="mt-1 text-xl font-semibold text-white">Executive operating snapshot</p>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-200">Live demo data</div>
                </div>
              </div>
              <div className="grid gap-4 p-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                  <p className="text-sm text-slate-400">Project health overview</p>
                  <div className="mt-5 space-y-4">
                    {projects.slice(0, 4).map((project) => (
                      <div key={project.id}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span>{project.name}</span>
                          <span className="text-slate-400">{project.projectHealthScore}/100</span>
                        </div>
                        <ProgressBar
                          value={project.projectHealthScore}
                          tone={project.projectHealthScore > 84 ? "emerald" : project.projectHealthScore > 72 ? "amber" : "red"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                  <p className="text-sm text-slate-400">AI alerts</p>
                  <div className="mt-4 space-y-3">
                    {aiAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-white">{alert.title}</p>
                          <span className="rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-medium text-red-200">{alert.severity}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-300">{alert.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </section>

          <section className="grid gap-6 rounded-[32px] bg-white px-6 py-10 text-slate-950 md:grid-cols-3 md:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">The problem</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Construction teams still operate through fragmented updates and delayed decisions.</h2>
            </div>
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-base font-medium">Limited site visibility</p>
              <p className="mt-2 text-sm text-slate-600">Progress, blockers, and crew issues are often buried in calls, spreadsheets, and site WhatsApp threads.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-base font-medium">Reactive procurement and risk control</p>
              <p className="mt-2 text-sm text-slate-600">Managers discover supplier delays, cost drift, or safety patterns too late to recover smoothly.</p>
            </div>
          </section>

          <section id="features" className="grid gap-6 py-16 text-slate-950 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="inline-flex rounded-2xl bg-sky-100 p-3 text-sky-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </section>

          <section id="ai" className="grid gap-8 rounded-[32px] bg-slate-950 px-6 py-10 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">AI capability layer</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">AI that speaks the language of construction operations.</h2>
              <p className="mt-4 max-w-xl text-slate-300">
                Light is designed to make the AI layer feel operational, not experimental. It surfaces delay risk, cost overrun patterns,
                supplier issues, safety signals, work resequencing ideas, and natural-language summaries for every stakeholder.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Delay risk detection by zone, package, and dependency",
                "Cost overrun prediction across active packages",
                "Crew reallocation suggestions and work resequencing",
                "Supplier risk alerts and alternate vendor recommendations",
                "Predictive maintenance signals for critical equipment",
                "Daily and weekly AI-generated site summaries",
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-sky-400/15 p-2 text-sky-200">
                      <Bot className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-6 text-slate-200">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="customers" className="grid gap-6 py-16 text-slate-950 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">Target customers</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Built for every decision-maker on a construction program.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {customerSegments.map((segment) => (
                <div key={segment} className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="font-medium">{segment}</p>
                  <p className="mt-2 text-sm text-slate-600">Role-based views can focus on portfolio health, site execution, procurement discipline, or safety oversight.</p>
                </div>
              ))}
            </div>
          </section>

          <section id="request-access" className="rounded-[32px] bg-sky-400 px-6 py-10 text-slate-950 md:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-950/70">Demo-ready showcase MVP</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Position Light as the operating layer for modern construction companies.</h2>
                <p className="mt-4 max-w-2xl text-base text-sky-950/80">
                  Use the showcase to tell a clear investor and client story: one platform, one source of truth, one AI layer helping teams
                  move faster with fewer surprises.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">
                  Open Dashboard
                </Link>
                <a href="mailto:hello@light-demo.com" className="rounded-full border border-slate-950/20 px-6 py-3 text-sm font-semibold text-slate-950">
                  Request Access
                </a>
              </div>
            </div>
          </section>

          <footer className="flex flex-col gap-3 border-t border-slate-200 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>Light showcase MVP for construction operations, AI visibility, and execution storytelling.</p>
            <div className="flex items-center gap-4">
              <span>Portfolio intelligence</span>
              <span>Site coordination</span>
              <span>AI copilot</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
