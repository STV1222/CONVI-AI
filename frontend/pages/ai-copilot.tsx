import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

import AppShell from "@/components/AppShell";
import { GlassCard, SectionHeading } from "@/components/ui";
import { copilotExchanges } from "@/data/mock";

export default function AiCopilotPage() {
  const [selectedId, setSelectedId] = useState(copilotExchanges[0]?.id ?? "");
  const selected = useMemo(() => copilotExchanges.find((item) => item.id === selectedId) ?? copilotExchanges[0], [selectedId]);

  return (
    <AppShell
      title="AI Copilot"
      description="A demo AI assistant interface for portfolio questions, operational summaries, supplier risk, and labor balancing recommendations."
    >
      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <GlassCard>
          <SectionHeading
            eyebrow="Suggested prompts"
            title="Ask Light anything about the portfolio"
            description="This showcase uses mocked construction-aware answers to demonstrate how a future copilot experience could feel."
          />
          <div className="mt-6 space-y-3">
            {copilotExchanges.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full rounded-3xl border p-4 text-left transition ${
                  selected?.id === item.id
                    ? "border-sky-300/30 bg-sky-400/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/8"
                }`}
              >
                <p className="font-medium">{item.question}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.chips.map((chip) => (
                    <span key={chip} className="rounded-full bg-white/8 px-3 py-1 text-xs text-slate-300">
                      {chip}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <SectionHeading eyebrow="Conversation" title="Simulated AI response" description="Designed to feel concise, smart, and operationally useful." />
          <div className="mt-6 space-y-5">
            <div className="ml-auto max-w-3xl rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">You asked</p>
              <p className="mt-2 text-lg font-medium text-white">{selected?.question}</p>
            </div>

            <div className="max-w-3xl rounded-[28px] border border-sky-300/20 bg-sky-400/10 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-sky-100">
                <Sparkles className="h-4 w-4" />
                Light AI Copilot
              </div>
              <p className="mt-4 text-base leading-7 text-slate-100">{selected?.answer}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {selected?.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-sky-300/20 bg-slate-950/40 px-3 py-1 text-xs text-sky-100">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Demo prompts to showcase live</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                Which projects are at highest delay risk?
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                Why is Project Aurora over budget?
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                What was completed this week on Site Delta?
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                How should I rebalance labor next week?
              </div>
            </div>
          </div>
        </GlassCard>
      </section>
    </AppShell>
  );
}
