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
    <section id="live-demo" className="mx-auto max-w-[1100px] px-4 py-7 sm:px-5 md:px-12 md:py-10">
      <div className="grid items-start gap-7 lg:grid-cols-[0.4fr_0.6fr] lg:gap-14">
        <div className="max-w-[520px]">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
            The extension
          </p>
          <h2 className="mb-4 max-w-[15ch] text-balance text-[22px] font-medium leading-[1.12] tracking-[-0.5px] text-[#0F1117] sm:max-w-none sm:text-[34px] sm:leading-tight md:text-[36px]">
            Keep using ChatGPT. stemLM adds the structure AI skips.
          </h2>
          <p className="max-w-[34ch] text-[15px] leading-[1.72] text-[#64748B] sm:max-w-[520px] sm:text-[16px] sm:leading-[1.7]">
            Ask normally, tap stemLM beside send, and turn the reply into
            a framework-matched study view with steps, formulas, diagrams,
            and timing analysis.
          </p>
        </div>

        <div className="mx-auto max-w-[680px] space-y-0 lg:mx-0 lg:max-w-none">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="relative flex items-start gap-3.5 sm:gap-5">
              {!isLast ? (
                <div className="absolute left-[17px] top-[36px] h-full w-px bg-[#E2E8F0] sm:left-[19px] sm:top-[40px]" />
              ) : null}

              <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#0EA5A0] bg-white text-[13px] font-medium text-[#0EA5A0] sm:h-10 sm:w-10 sm:text-[14px]">
                {step.number}
              </div>

              <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-7 sm:pb-8"}`}>
                <h3 className="mb-1 max-w-[24ch] text-[14px] font-medium leading-[1.45] text-[#0F1117] sm:max-w-none sm:text-[16px] sm:leading-normal">
                  {step.title}
                </h3>
                <p className="mb-3 text-[13px] leading-[1.65] text-[#64748B] sm:text-[14px] sm:leading-[1.6]">
                  {step.body}
                </p>

                {step.tag ? (
                  <span
                    className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] sm:text-[11px] ${
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
      </div>
    </section>
  );
}
