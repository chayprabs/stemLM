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
    title: "Type your question into any AI",
    body: "stemLM works on top of ChatGPT, Claude, and Gemini without changing your normal study workflow.",
    tag: "Platform agnostic",
    accent: false,
  },
  {
    number: "2",
    title: "Activate stemLM mode",
    body: "One click applies a subject-aware solving framework before the answer is generated.",
    tag: "One click workflow",
    accent: false,
  },
  {
    number: "3",
    title: "stemLM identifies the exact topic",
    body: "The system maps your question into a chapter, topic, and subtopic key so the answer structure matches the problem type.",
    tag: "PHY → Circuits → Parallel Networks → STEM-EL-RC-001",
    accent: true,
  },
  {
    number: "4",
    title: "The AI follows the playbook",
    body: "Instead of loose prose, the model returns steps, formulas, and the right approach at each point of the solution.",
  },
  {
    number: "5",
    title: "The guided panel opens",
    body: "The stemLM panel organises the response into steps so you can move through the reasoning without losing context.",
  },
  {
    number: "6",
    title: "Each step is structured",
    body: "Every step shows the method, the formula, and the working. No skipped stages, no ambiguous jumps.",
  },
  {
    number: "7",
    title: "Interact, ask follow-ups, and export",
    body: "Select any step to ask a focused follow-up. Export the full solution as a clean outline for revision.",
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
