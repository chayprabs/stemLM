const cards = [
  {
    type: 'x' as const,
    title: 'No intermediate diagrams',
    body: "The AI says 'after combining R1 and R2 in parallel' but never shows what the circuit looks like at that moment.",
  },
  {
    type: 'warning' as const,
    title: 'Steps get skipped',
    body: 'AI jumps from the problem to a near-final answer, cutting the 3 or 4 stages where students actually get confused.',
  },
  {
    type: 'x' as const,
    title: 'No domain awareness',
    body: 'A circuit problem, an optics question, and a mechanics free body diagram each need a different solution structure. Raw AI treats them like plain prose.',
  },
  {
    type: 'warning' as const,
    title: 'Solutions you cannot reuse',
    body: 'You cannot export the work cleanly, select a step and ask about it, or save it for revision. It disappears into chat history.',
  },
] as const

function XIcon() {
  return (
    <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#FEF2F2]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M6 6l4 4m0-4l-4 4"
          stroke="#EF4444"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function WarningIcon() {
  return (
    <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#FFFBEB]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3 13L8 4l5 9H3z"
          stroke="#F59E0B"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M8 8v2.5m0 1.5v.5"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function ProblemSection() {
  return (
    <section className="bg-[#F8F9FC] py-16 px-5 md:py-24 md:px-12">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-6 flex items-center gap-3">
          <p className="text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
            The problem
          </p>
          <div className="h-px max-w-[60px] flex-1 bg-[#E2E8F0]" />
        </div>

        <h2 className="mb-4 text-[34px] font-medium leading-tight tracking-[-0.5px] text-[#0F1117]">
          AI gives answers.<br />
          Students need understanding.
        </h2>

        <p className="mb-12 max-w-[520px] text-[15px] leading-[1.7] text-[#64748B]">
          Engineering and STEM students already use AI every day, but the experience
          is broken. These tools are built for general questions — not for the visual,
          structured reasoning that physics, circuits, and mathematics require.
        </p>

        <div className="grid max-w-[860px] grid-cols-1 gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[14px] border border-[#E2E8F0] bg-white p-6"
            >
              {card.type === 'x' ? <XIcon /> : <WarningIcon />}
              <h3 className="mb-2 text-[15px] font-medium text-[#0F1117]">{card.title}</h3>
              <p className="text-[13px] leading-[1.6] text-[#64748B]">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
