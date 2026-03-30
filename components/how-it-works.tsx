import { CircleCheck, MousePointerClick, PencilLine } from "lucide-react";

const cards = [
  {
    step: "01",
    title: "Ask your question",
    body: "Type any STEM question into ChatGPT, Gemini, or Claude exactly as you normally would. Nothing changes on your end.",
    icon: PencilLine,
  },
  {
    step: "02",
    title: "Click stemLM",
    body: "One click injects the exact solving framework for your topic directly into your prompt before it reaches the AI.",
    icon: MousePointerClick,
  },
  {
    step: "03",
    title: "Get a real solution",
    body: "Your AI responds step by step, following the framework. Download the full solution in one click with clean formatting.",
    icon: CircleCheck,
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1100px] px-5 py-16 md:px-12 md:py-20">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[1px] text-[#0EA5A0]">
          How it works
        </p>
        <h2 className="mb-4 text-3xl font-medium leading-[1.15] tracking-[-0.5px] text-[#0F1117]">
          Three steps, zero friction.
        </h2>
        <p className="mx-auto max-w-[520px] text-base text-[#64748B]">
          No setup. No switching tabs. Ask your question, click stemLM, and get a
          solution built the right way.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.step}
              className="rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-6 transition-colors duration-150 hover:border-[#0EA5A0]"
            >
              <div className="mb-4 font-mono text-sm font-medium text-[#0EA5A0]">{card.step}</div>
              <Icon aria-hidden="true" size={24} strokeWidth={1.5} className="text-[#0EA5A0]" />
              <h3 className="mb-2 mt-4 text-lg font-medium text-[#0F1117]">{card.title}</h3>
              <p className="text-sm text-[#64748B]">{card.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
