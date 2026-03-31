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
    <section className="bg-white px-5 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
              Built for
            </p>
            <div className="h-px max-w-[60px] flex-1 bg-[#E2E8F0]" />
          </div>

          <h2 className="text-[34px] font-medium tracking-[-0.5px] text-[#0F1117]">
            Built for the student who needs the missing steps, not just the final answer.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.number}
              className="rounded-[14px] border border-[#E2E8F0] bg-[#F8F9FC] p-6"
            >
              <p className="mb-4 font-mono text-[13px] font-medium text-[#0EA5A0]">
                {card.number}
              </p>
              <h3 className="mb-3 text-[16px] font-medium text-[#0F1117]">{card.title}</h3>
              <p className="text-[14px] leading-[1.6] text-[#64748B]">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
