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
    <section className="bg-white px-4 py-8 sm:px-5 md:px-12 md:py-12">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-8 md:mb-10">
          <div className="mb-6 flex items-center gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
              Built for
            </p>
            <div className="h-px max-w-[60px] flex-1 bg-[#E2E8F0]" />
          </div>

          <h2 className="max-w-[13ch] text-balance text-[24px] font-medium tracking-[-0.5px] text-[#0F1117] sm:max-w-none sm:text-[32px] md:text-[34px]">
            Built for students who need the missing steps, not just the answer.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.number}
              className="rounded-[14px] border border-[#E2E8F0] bg-[#F8F9FC] p-4 sm:p-6"
            >
              <p className="mb-3 font-mono text-[12px] font-medium text-[#0EA5A0] sm:mb-4 sm:text-[13px]">
                {card.number}
              </p>
              <h3 className="mb-3 text-[15px] font-medium text-[#0F1117] sm:text-[16px]">{card.title}</h3>
              <p className="text-[13px] leading-[1.65] text-[#64748B] sm:text-[14px] sm:leading-[1.6]">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
