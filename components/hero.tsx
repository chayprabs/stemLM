"use client"

import { useEffect, useState } from 'react'

type QuestionIndex = 0 | 1 | 2
type DemoStage = 'idle' | 'injecting' | 'responding' | 'done'

interface HeroProps {
  onOpenModal: () => void
}

const questions = [
  {
    chip: 'Projectile motion range',
    userMessage: 'A particle projected at 30° with v₀ = 40 m/s. Find the horizontal range.',
    aiPartial: 'The horizontal range can be found using the exact projectile-motion framework.',
    topic: 'Projectile Motion',
    key: 'STEM-PHY-03-07-02',
    subject: 'Physics',
    steps: [
      { n: '01', title: 'Resolve components', desc: 'uₓ = 40cos30° = 34.6 m/s' },
      { n: '02', title: 'Time of flight', desc: 'T = 2uᵧ/g = 4.08 s' },
      { n: '03', title: 'Apply formula', desc: 'R = u²sin2θ / g' },
      { n: '04', title: 'Substitute', desc: 'R = 141.4 m ✓' },
    ],
  },
  {
    chip: 'Solve x² - 5x + 6 = 0',
    userMessage: 'Solve the quadratic equation x² - 5x + 6 = 0.',
    aiPartial: 'This quadratic can be solved cleanly by factorisation using a standard algebra playbook.',
    topic: 'Quadratic Equations',
    key: 'STEM-MATH-01-04-01',
    subject: 'Mathematics',
    steps: [
      { n: '01', title: 'Identify coefficients', desc: 'a=1, b=-5, c=6' },
      { n: '02', title: 'Find factors', desc: 'Find p,q: p+q=-5, pq=6' },
      { n: '03', title: 'Factorise', desc: '(x-2)(x-3) = 0' },
      { n: '04', title: 'Solve', desc: 'x = 2 or x = 3 ✓' },
    ],
  },
  {
    chip: 'Time complexity of merge sort',
    userMessage: 'What is the time complexity of merge sort and why?',
    aiPartial: 'Merge sort has a time complexity of O(n log n) because its split and merge phases scale predictably.',
    topic: 'Merge Sort',
    key: 'STEM-CS-02-08-01',
    subject: 'Computer Science',
    steps: [
      { n: '01', title: 'Divide phase', desc: 'Split array: O(log n) levels' },
      { n: '02', title: 'Merge phase', desc: 'Each level merges O(n) elements' },
      { n: '03', title: 'Combine', desc: 'Total: O(n) × O(log n)' },
      { n: '04', title: 'Result', desc: 'T(n) = O(n log n) ✓' },
    ],
  },
] as const

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function Hero({ onOpenModal }: HeroProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionIndex>(0)
  const [stage, setStage] = useState<DemoStage>('idle')
  const [showAll, setShowAll] = useState(false)
  const [runId, setRunId] = useState(0)

  const activeQuestion = questions[selectedQuestion]

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    if (stage === 'idle') {
      timeoutId = setTimeout(() => setStage('injecting'), 800)
    }

    if (stage === 'injecting') {
      timeoutId = setTimeout(() => setStage('responding'), 1200)
    }

    if (stage === 'responding') {
      timeoutId = setTimeout(() => setStage('done'), 1500)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [stage, runId])

  function handleChipClick(index: QuestionIndex) {
    setSelectedQuestion(index)
    setShowAll(false)
    setStage('idle')
    setRunId((current) => current + 1)
  }

  function handleStemClick() {
    if (stage === 'idle') {
      setStage('injecting')
    }
  }

  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-5 pb-12 pt-16 lg:grid-cols-[55fr_45fr] lg:px-12 lg:pb-[80px] lg:pt-[100px]">
      <style jsx>{`
        .hero-demo-dots::after {
          content: '.';
        }

        @media (prefers-reduced-motion: no-preference) {
          @keyframes pulse-glow {
            0%,
            100% {
              box-shadow: 0 0 0 0 rgba(14, 165, 160, 0);
            }
            50% {
              box-shadow: 0 0 0 5px rgba(14, 165, 160, 0.2);
            }
          }

          @keyframes dots {
            0% {
              content: '.';
            }
            33% {
              content: '..';
            }
            66% {
              content: '...';
            }
          }

          @keyframes bubble-in {
            0% {
              opacity: 0;
              transform: translateY(6px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes panel-in {
            0% {
              opacity: 0;
              transform: translateY(12px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .hero-demo-dots::after {
            animation: dots 1.2s steps(1, end) infinite;
          }
        }
      `}</style>

      <div>
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-[6px] bg-[#0EA5A015] px-3 py-1 text-[11px] font-medium text-[#0EA5A0]">
          <span>&#10022;</span>
          <span>Now in private beta</span>
        </div>

        <h1 className="mb-6 text-[30px] font-medium leading-[1.1] tracking-[-0.8px] text-[#0F1117] md:text-[38px] lg:text-[52px]">
          The <span className="text-[#0EA5A0]">structured</span> way
          <br />
          to solve STEM
          <br />
          problems with AI.
        </h1>

        <p className="mb-9 max-w-[480px] text-[16px] leading-[1.7] text-[#64748B]">
          stemLM works alongside ChatGPT, Gemini, and Claude &mdash; injecting the
          exact step-by-step framework your subject demands, so every solution is
          correct, complete, and curriculum-aligned.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenModal}
            className="rounded-[10px] bg-[#0EA5A0] px-6 py-3 text-[15px] font-medium text-white transition-all duration-150 hover:scale-[1.01] hover:bg-[#0D9490]"
          >
            Get early access &rarr;
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="rounded-[10px] border border-[#E2E8F0] bg-transparent px-5 py-3 text-[15px] text-[#64748B] transition-all duration-150 hover:bg-gray-50 hover:text-[#0F1117]"
          >
            See how it works &darr;
          </button>
        </div>

        <p className="mt-4 text-[12px] text-[#4A4A5A]">
          Free forever &middot; Works with ChatGPT, Gemini &amp; Claude
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[480px]">
        <p className="mb-2 text-[11px] text-[#64748B]">Try a question:</p>

        <div className="mb-3 flex flex-wrap gap-2">
          {questions.map((question, index) => {
            const questionIndex = index as QuestionIndex
            const isActive = selectedQuestion === questionIndex

            return (
              <button
                key={question.chip}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleChipClick(questionIndex)}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-[12px] transition-all duration-150 ${
                  isActive
                    ? 'border-[#0EA5A0] bg-[#0EA5A015] text-[#0EA5A0]'
                    : 'border-[#E2E8F0] text-[#64748B] hover:border-[#0EA5A0] hover:text-[#0EA5A0]'
                }`}
              >
                {question.chip}
              </button>
            )
          })}
        </div>

        {stage === 'done' ? (
          <div
            className="absolute bottom-[72px] left-[12px] right-[12px] z-10 rounded-[12px] border-2 border-[#0EA5A0] bg-white px-4 py-3.5 shadow-lg"
            style={{ animation: 'panel-in 350ms ease-out both' }}
          >
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="text-[9px] font-medium uppercase tracking-wider text-[#0EA5A0]">
                Topic identified
              </span>
              <span className="rounded bg-[#0EA5A015] px-1.5 py-0.5 font-mono text-[9px] text-[#0EA5A0]">
                {activeQuestion.key}
              </span>
            </div>

            <div className="mb-2.5 text-[14px] font-medium text-[#0F1117]">
              {activeQuestion.topic}
            </div>

            <div
              className={`mb-3 overflow-hidden space-y-1.5 transition-all duration-300 ease-in-out ${
                showAll ? 'max-h-[200px]' : 'max-h-[60px]'
              }`}
            >
              {activeQuestion.steps.map((step) => (
                <div key={step.n} className="flex items-start gap-2">
                  <span className="mt-0.5 w-4 flex-shrink-0 font-mono text-[9px] text-[#0EA5A0]">
                    {step.n}
                  </span>
                  <span className="text-[11px] font-medium text-[#0F1117]">{step.title}</span>
                  <span className="ml-auto font-mono text-[10px] text-[#64748B]">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="cursor-pointer text-[12px] font-medium text-[#0EA5A0] hover:underline"
            >
              {showAll ? '← Hide' : 'View full solution →'}
            </button>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-[14px] border border-[#E2E8F0] bg-white shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#E2E8F0] bg-[#F8F9FC] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span className="mx-auto rounded-full bg-[#E2E8F0] px-3 py-0.5 text-[11px] text-[#64748B]">
              ChatGPT
            </span>
            <div className="w-[38px]" />
          </div>

          <div className="min-h-[160px] space-y-3 p-4">
            <div
              key={`user-${selectedQuestion}-${runId}`}
              className="ml-auto max-w-[85%] rounded-[10px] bg-[#F0F0F0] px-3 py-2.5 text-[12px] leading-[1.5] text-[#0F1117]"
              style={{ animation: 'bubble-in 300ms ease-out both' }}
            >
              {activeQuestion.userMessage}
            </div>

            {stage === 'responding' || stage === 'done' ? (
              <div
                key={`ai-${selectedQuestion}-${stage}`}
                className="max-w-[90%] rounded-[10px] border border-[#E2E8F0] border-l-2 border-l-[#0EA5A0] bg-white px-3 py-2.5 text-[12px] leading-[1.5] text-[#64748B]"
                style={{ animation: 'bubble-in 300ms ease-out both' }}
              >
                {activeQuestion.aiPartial}
                {stage === 'responding' ? (
                  <span className="ml-0.5 inline-block h-[12px] w-[2px] animate-pulse bg-[#64748B]" />
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 border-t border-[#E2E8F0] px-3 py-2.5">
            <div className="flex-1 rounded-[7px] bg-[#F8F9FC] px-3 py-1.5 text-[11px] text-[#4A4A5A]">
              Message ChatGPT...
            </div>

            <button
              type="button"
              aria-label="Send message"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F1117]"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1.5 5H7.25M7.25 5L4.75 2.5M7.25 5L4.75 7.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {stage === 'idle' ? (
              <button
                type="button"
                onClick={handleStemClick}
                className="rounded-[6px] bg-[#0EA5A0] px-2.5 py-1.5 text-[10px] font-medium text-white"
                style={{ animation: 'pulse-glow 2s infinite' }}
              >
                ✦ stemLM
              </button>
            ) : null}

            {stage === 'injecting' ? (
              <button
                type="button"
                disabled
                className="flex items-center rounded-[6px] bg-[#0EA5A0] px-2.5 py-1.5 text-[10px] font-medium text-white"
              >
                <span className="mr-1 inline-block h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
                Analyzing...
              </button>
            ) : null}

            {stage === 'responding' || stage === 'done' ? (
              <button
                type="button"
                disabled
                className="rounded-[6px] border border-[#0EA5A0] bg-[#0EA5A015] px-2.5 py-1.5 text-[10px] font-medium text-[#0EA5A0]"
              >
                ✓ stemLM
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-3 text-center text-[11px] text-[#64748B]">
          {stage === 'idle' ? 'Click ✦ stemLM to analyze' : null}
          {stage === 'injecting' ? (
            <>
              Identifying topic
              <span className="hero-demo-dots" />
            </>
          ) : null}
          {stage === 'responding' ? 'Generating structured solution...' : null}
          {stage === 'done' ? `✓ Framework matched · ${activeQuestion.subject}` : null}
        </div>
      </div>
    </section>
  )
}
