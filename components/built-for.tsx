const cards = [
  {
    number: "01",
    title: "Engineering & CS undergrads",
    body: "When lectures move fast and worked examples skip the logic, stemLM breaks each problem into the exact steps, formulas, and reasoning you need to actually understand it.",
  },
  {
    number: "02",
    title: "Students preparing for exams that reward method",
    body: "From internals to end-sems, stemLM follows the topic-specific approach your syllabus expects, so you learn how to reach the answer, not just what it is.",
  },
  {
    number: "03",
    title: "Anyone tired of answers they still can't explain",
    body: "If you've ever copied an AI solution and still felt lost, stemLM turns it into something you can follow, question, and confidently explain on your own.",
  },
] as const;

export function BuiltFor() {
  return (
    <section className="bg-white px-4 py-7 sm:px-5 md:px-12 md:py-12">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-7 md:mb-10">
          <div className="mb-5 flex items-center gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
              Built for
            </p>
            <div className="h-px max-w-[60px] flex-1 bg-[#E2E8F0]" />
          </div>

          <h2 className="max-w-[16ch] text-balance text-[21px] font-medium leading-[1.18] tracking-[-0.45px] text-[#0F1117] sm:max-w-none sm:text-[32px] sm:leading-tight md:text-[34px]">
            Built for students who need the missing steps, not just the answer.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.number}
              className="rounded-[14px] border border-[#E2E8F0] bg-[#F8F9FC] p-3.5 sm:p-6"
            >
              <p className="mb-2.5 font-mono text-[11px] font-medium text-[#0EA5A0] sm:mb-4 sm:text-[13px]">
                {card.number}
              </p>
              <h3 className="mb-2.5 max-w-[24ch] text-[14px] font-medium leading-[1.45] text-[#0F1117] sm:max-w-none sm:text-[16px] sm:leading-normal">
                {card.title}
              </h3>
              <p className="text-[12px] leading-[1.7] text-[#64748B] sm:text-[14px] sm:leading-[1.6]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
