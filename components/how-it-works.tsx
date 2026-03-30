const cards = [
  {
    step: '01',
    title: 'Ask your question',
    body: 'Type any STEM question into ChatGPT, Gemini, or Claude exactly as you normally would. Nothing changes on your end.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="3.25" y="3.25" width="13.5" height="13.5" rx="2" stroke="#0EA5A0" strokeWidth="1.5" />
        <line x1="7" y1="13" x2="13" y2="7" stroke="#0EA5A0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Click stemLM',
    body: 'One click injects the exact solving framework for your topic directly into your prompt — before it reaches the AI.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points="4.5,3.5 14,10 10.5,10.6 13.2,16 10.9,17 8.2,11.7 5.8,14"
          stroke="#0EA5A0"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Get a real solution',
    body: 'Your AI responds step by step, following the framework. Download the full solution in one click — no LaTeX, no formatting headaches.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="6.75" stroke="#0EA5A0" strokeWidth="1.5" />
        <polyline
          points="6.8,10.2 9,12.4 13.4,8"
          stroke="#0EA5A0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1100px] px-5 py-16 md:px-12 md:py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
          How it works
        </p>
        <h2 className="mb-4 text-[36px] font-medium leading-tight tracking-[-0.5px] text-[#0F1117]">
          Three steps, zero friction.
        </h2>
        <p className="mx-auto max-w-[520px] text-[16px] leading-[1.7] text-[#64748B]">
          No setup. No switching tabs. Ask your question, click stemLM, and get a
          solution built the right way.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.step}
            className="rounded-[14px] border border-[#E2E8F0] bg-white p-7 transition-colors duration-200 hover:border-[#0EA5A0]"
          >
            <div className="mb-4 font-mono text-[12px] font-medium text-[#0EA5A0]">{card.step}</div>
            {card.icon}
            <h3 className="mb-2 mt-3 text-[17px] font-medium text-[#0F1117]">{card.title}</h3>
            <p className="text-[14px] leading-[1.6] text-[#64748B]">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
