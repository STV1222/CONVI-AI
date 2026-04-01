import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import {
  Bot,
  BriefcaseBusiness,
  ClipboardCheck,
  FolderKanban,
  Gauge,
  HardHat,
  LayoutDashboard,
  Settings,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { LightWordmark } from "@/components/LightWordmark";
import { cn } from "@/lib/format";
import { ThemeToggle } from "@/components/theme";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/site-progress", label: "Site Progress", icon: HardHat },
  { href: "/work-allocation", label: "Work Allocation", icon: ClipboardCheck },
  { href: "/providers", label: "Providers", icon: BriefcaseBusiness },
  { href: "/procurement", label: "Procurement", icon: ShoppingCart },
  { href: "/safety-quality", label: "Safety & Quality", icon: Shield },
  { href: "/equipment", label: "Equipment", icon: Truck },
  { href: "/ai-copilot", label: "AI Copilot", icon: Bot },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${title} | Light`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-shell-root min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),_transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_46%,#111827_100%)] text-white">
        <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-6 px-4 py-4 lg:flex-row lg:gap-8 lg:px-6">
          <aside className="app-sidebar relative z-[60] w-full overflow-visible rounded-[28px] border border-white/10 bg-slate-950/70 p-4 shadow-2xl backdrop-blur sm:p-5 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-[280px] lg:min-w-[280px] lg:max-w-[280px] lg:shrink-0">
            <div className="space-y-2 border-b border-white/10 pb-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 shrink truncate">
                  <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-200 sm:text-xs sm:tracking-[0.25em]">
                    <Gauge className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">Construction OS</span>
                  </div>
                </div>
                <div className="relative z-[70] shrink-0">
                  <ThemeToggle />
                </div>
              </div>
              <div className="leading-none">
                <LightWordmark />
              </div>
              <p className="text-xs leading-snug text-slate-400 sm:text-sm">AI-powered construction command center</p>
            </div>

            <nav className="mt-4 space-y-1.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = router.pathname === item.href || (item.href === "/projects" && router.pathname.startsWith("/projects/"));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                      active
                        ? "bg-sky-400/15 text-white ring-1 ring-inset ring-sky-300/30"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">Live AI Signal</p>
              <p className="mt-3 text-sm text-white">3 critical portfolio interventions recommended this week.</p>
              <p className="mt-2 text-sm text-slate-300">Biggest impact: recover Aurora rough-in and split Delta steel delivery.</p>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Demo persona</p>
              <p className="mt-1 text-sm text-slate-400">Project Manager view with executive portfolio visibility enabled.</p>
            </div>
          </aside>

          <main className="app-main relative z-0 min-w-0 flex-1 rounded-[32px] border border-white/10 bg-slate-950/45 p-4 shadow-2xl backdrop-blur md:p-6 lg:p-8">
            <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Light platform</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
                <p className="mt-2 max-w-3xl text-sm text-slate-300 md:text-base">{description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  Portfolio pulse
                  <div className="mt-1 font-medium text-white">86 open workstreams</div>
                </div>
                <div className="rounded-2xl border border-sky-300/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-100">
                  AI summary refreshed
                  <div className="mt-1 font-medium">4 minutes ago</div>
                </div>
              </div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
