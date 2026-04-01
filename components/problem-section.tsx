const painPoints = [
  "Skips the exact 3 steps where you actually get lost",
  "No diagrams \u2014 just prose describing what a circuit looks like",
  "Treats a free body diagram the same as a history essay",
  "Solution disappears into chat history with nothing to revise from",
] as const;

export function ProblemSection() {
  return (
    <section className="px-4 py-6 sm:px-5 md:px-12 md:py-10">
      <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-[0.48fr_0.52fr] lg:gap-14">
        <div className="max-w-[560px]">
          <div className="mb-6 flex items-center gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
              The problem
            </p>
            <div className="h-px max-w-[60px] flex-1 bg-[#E2E8F0]" />
          </div>

          <h2 className="mb-3 max-w-[17ch] text-balance text-[22px] font-medium leading-[1.1] tracking-[-0.5px] text-[#0F1117] sm:max-w-none sm:text-[32px] sm:leading-tight md:text-[34px]">
            AI gives answers. Students need understanding.
          </h2>

          <p className="mb-8 max-w-[34ch] text-sm leading-[1.7] text-[#64748B] sm:max-w-none">
            Every STEM student uses AI. Most still don&apos;t understand what they
            submitted.
          </p>
        </div>

        <div className="max-w-[580px] lg:pt-8">
          <div className="space-y-2.5">
            {painPoints.map((line) => (
              <div key={line} className="flex items-start gap-2.5 sm:gap-3">
                <span
                  aria-hidden="true"
                  className="pt-[2px] text-[15px] leading-[1.8] text-[#EF4444]"
                >
                  &times;
                </span>
                <p className="text-[13px] leading-[1.75] text-[#334155] sm:text-[15px] sm:leading-[1.8]">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
