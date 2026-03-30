const cards = [
  {
    number: "01",
    title: "JEE, NEET, and competitive exam students",
    body: "The product is strongest where visual step-by-step reasoning is the difference between solving and guessing.",
  },
  {
    number: "02",
    title: "B.Tech, B.Sc, and university students",
    body: "Assignments, revision, lab work, and exam prep all benefit from structured explanations more than raw answers.",
  },
  {
    number: "03",
    title: "Anyone learning STEM with AI",
    body: "If your AI regularly skips the part where you get confused, stemLM is built exactly for that gap.",
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
            Built for students who want to understand, not just pass
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
