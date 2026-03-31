const painPoints = [
  "Skips the exact 3 steps where you actually get lost",
  "No diagrams \u2014 just prose describing what a circuit looks like",
  "Treats a free body diagram the same as a history essay",
  "Solution disappears into chat history with nothing to revise from",
] as const;

export function ProblemSection() {
  return (
    <section className="px-5 py-12 md:px-12 md:py-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-[580px]">
          <div className="mb-6 flex items-center gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
              The problem
            </p>
            <div className="h-px max-w-[60px] flex-1 bg-[#E2E8F0]" />
          </div>

          <h2 className="mb-3 text-[34px] font-medium leading-tight tracking-[-0.5px] text-[#0F1117]">
            AI gives answers. Students need understanding.
          </h2>

          <p className="mb-8 text-sm leading-[1.7] text-[#64748B]">
            Every STEM student uses AI. Most still don&apos;t understand what they
            submitted.
          </p>

          <div className="space-y-3">
            {painPoints.map((line) => (
              <div key={line} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="pt-[2px] text-[15px] leading-[1.8] text-[#EF4444]"
                >
                  &times;
                </span>
                <p className="text-[15px] leading-[1.8] text-[#334155]">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
