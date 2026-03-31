type Step = {
  number: string;
  title: string;
  body: string;
  tag?: string;
  accent?: boolean;
};

const steps: Step[] = [
  {
    number: "1",
    title: "Type your question into ChatGPT, Claude, or Gemini",
    body: "Nothing changes about how you work.",
  },
  {
    number: "2",
    title: "Click stemLM",
    body: "One click. No setup. No tab switching.",
  },
  {
    number: "3",
    title: "stemLM matches the exact topic and framework",
    body: "The system maps your question to a chapter, topic, and subtopic key.",
    tag: "PHY \u2192 Circuits \u2192 Parallel Networks \u2192 STEM-EL-RC-001",
    accent: true,
  },
  {
    number: "4",
    title: "Get a structured, step-by-step solution",
    body: "Every step shows the method, the formula, and the working. No skipped stages.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1100px] px-5 py-16 md:px-12 md:py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
          How it works
        </p>
        <h2 className="mb-4 text-[36px] font-medium leading-tight tracking-[-0.5px] text-[#0F1117]">
          One button. Your AI gets a whole lot smarter.
        </h2>
        <p className="mx-auto max-w-[520px] text-[16px] leading-[1.7] text-[#64748B]">
          No setup. No switching tabs. Ask your question, click stemLM,
          and get a solution built the right way.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-[680px] space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="relative flex items-start gap-5">
              {!isLast ? (
                <div className="absolute left-[19px] top-[40px] h-full w-px bg-[#E2E8F0]" />
              ) : null}

              <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#0EA5A0] bg-white text-[14px] font-medium text-[#0EA5A0]">
                {step.number}
              </div>

              <div className={`flex-1 ${isLast ? "pb-0" : "pb-10"}`}>
                <h3 className="mb-1 text-[16px] font-medium text-[#0F1117]">{step.title}</h3>
                <p className="mb-3 text-[14px] leading-[1.6] text-[#64748B]">{step.body}</p>

                {step.tag ? (
                  <span
                    className={`inline-block rounded-full px-3 py-1 font-mono text-[11px] ${
                      step.accent
                        ? "bg-[#0EA5A015] text-[#0EA5A0]"
                        : "border border-[#E2E8F0] bg-[#F8F9FC] text-[#64748B]"
                    }`}
                  >
                    {step.tag}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
