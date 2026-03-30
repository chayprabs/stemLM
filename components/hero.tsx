"use client";

import {
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  Download,
  LoaderCircle,
  SendHorizontal,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

type QuestionIndex = 0 | 1 | 2;
type DemoStage = "idle" | "injecting" | "responding" | "done";

interface HeroProps {
  onOpenModal: () => void;
}

const questions = [
  {
    chip: "Projectile motion range",
    userMessage: "A particle is projected at 30 deg with v0 = 40 m/s. Find the horizontal range.",
    aiPartial: "The horizontal range can be found using the projectile-motion framework.",
    topic: "Projectile motion",
    key: "STEM-PHY-03-07-02",
    subject: "Physics",
    steps: [
      { n: "01", title: "Resolve components", desc: "u_x = 40cos30 deg = 34.6 m/s" },
      { n: "02", title: "Time of flight", desc: "T = 2u_y/g = 4.08 s" },
      { n: "03", title: "Apply formula", desc: "R = u^2 sin 2theta / g" },
      { n: "04", title: "Substitute", desc: "R = 141.4 m" },
    ],
  },
  {
    chip: "Solve x^2 - 5x + 6 = 0",
    userMessage: "Solve the quadratic equation x^2 - 5x + 6 = 0.",
    aiPartial: "This quadratic can be solved cleanly by factorisation.",
    topic: "Quadratic equations",
    key: "STEM-MATH-01-04-01",
    subject: "Mathematics",
    steps: [
      { n: "01", title: "Identify coefficients", desc: "a = 1, b = -5, c = 6" },
      { n: "02", title: "Find factors", desc: "p + q = -5, pq = 6" },
      { n: "03", title: "Factorise", desc: "(x - 2)(x - 3) = 0" },
      { n: "04", title: "Solve", desc: "x = 2 or x = 3" },
    ],
  },
  {
    chip: "Time complexity of merge sort",
    userMessage: "What is the time complexity of merge sort and why?",
    aiPartial: "Merge sort runs in O(n log n) because each level merges O(n) work.",
    topic: "Merge sort",
    key: "STEM-CS-02-08-01",
    subject: "Computer science",
    steps: [
      { n: "01", title: "Divide phase", desc: "Split array across O(log n) levels" },
      { n: "02", title: "Merge phase", desc: "Each level processes O(n) elements" },
      { n: "03", title: "Combine", desc: "O(n) times O(log n)" },
      { n: "04", title: "Result", desc: "T(n) = O(n log n)" },
    ],
  },
] as const;

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function StageDots() {
  return (
    <span className="ml-1 inline-flex items-center gap-1">
      <span className="hero-stage-dot hero-stage-dot-1 h-1 w-1 rounded-sm bg-[#64748B]" />
      <span className="hero-stage-dot hero-stage-dot-2 h-1 w-1 rounded-sm bg-[#64748B]" />
      <span className="hero-stage-dot hero-stage-dot-3 h-1 w-1 rounded-sm bg-[#64748B]" />
    </span>
  );
}

export function Hero({ onOpenModal }: HeroProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionIndex>(0);
  const [stage, setStage] = useState<DemoStage>("idle");
  const [showAll, setShowAll] = useState(false);
  const [runId, setRunId] = useState(0);

  const activeQuestion = questions[selectedQuestion];
  const visibleSteps = showAll ? activeQuestion.steps : activeQuestion.steps.slice(0, 2);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (stage === "idle") {
      timeoutId = setTimeout(() => setStage("injecting"), 800);
    }

    if (stage === "injecting") {
      timeoutId = setTimeout(() => setStage("responding"), 1200);
    }

    if (stage === "responding") {
      timeoutId = setTimeout(() => setStage("done"), 1500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [runId, stage]);

  function handleChipClick(index: QuestionIndex) {
    setSelectedQuestion(index);
    setShowAll(false);
    setStage("idle");
    setRunId((current) => current + 1);
  }

  function handleStemClick() {
    if (stage === "idle") {
      setStage("injecting");
    }
  }

  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-5 pb-12 pt-16 lg:grid-cols-[55fr_45fr] lg:px-12 lg:pb-16 lg:pt-20">
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes bubble-in {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes panel-in {
            from {
              opacity: 0;
              transform: translateY(12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes dot-fade {
            0%,
            100% {
              opacity: 0.35;
              transform: translateY(0);
            }

            50% {
              opacity: 1;
              transform: translateY(-1px);
            }
          }

          @keyframes button-pulse {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }

            50% {
              opacity: 0.9;
              transform: scale(1.02);
            }
          }

          .hero-bubble-in {
            animation: bubble-in 250ms cubic-bezier(0.4, 0, 0.2, 1) both;
          }

          .hero-panel-in {
            animation: panel-in 350ms cubic-bezier(0, 0, 0.2, 1) both;
          }

          .hero-stage-dot {
            animation: dot-fade 900ms cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .hero-stage-dot-2 {
            animation-delay: 120ms;
          }

          .hero-stage-dot-3 {
            animation-delay: 240ms;
          }

          .hero-stem-idle {
            animation: button-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        }
      `}</style>

      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-sm bg-[#0EA5A015] px-3 py-1 text-xs font-medium text-[#0EA5A0]">
          <Sparkles aria-hidden="true" size={16} strokeWidth={1.5} />
          <span>Now in private beta</span>
        </div>

        <h1 className="mb-6 text-2xl font-medium leading-[1.1] tracking-[-0.5px] text-[#0F1117] md:text-3xl lg:text-4xl">
          The <span className="text-[#0EA5A0]">structured</span> way
          <br />
          to solve STEM
          <br />
          problems with AI.
        </h1>

        <p className="mb-8 max-w-[480px] text-base text-[#64748B]">
          stemLM works alongside ChatGPT, Gemini, and Claude, injecting the exact
          step-by-step framework your subject demands so every solution is correct,
          complete, and curriculum-aligned.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 rounded-md bg-[#0EA5A0] px-6 py-3 text-base font-medium text-[#F0F0F2] transition-transform duration-150 hover:scale-[1.01] hover:bg-[#0D9490]"
          >
            <span>Get early access</span>
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("how-it-works")}
            className="inline-flex items-center gap-2 rounded-md border border-[#E2E8F0] px-5 py-3 text-base text-[#64748B] transition-colors duration-150 hover:border-[#0EA5A0] hover:text-[#0F1117]"
          >
            <span>See how it works</span>
            <ArrowDown aria-hidden="true" size={16} strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-4 text-xs text-[#4A4A5A]">
          Free forever · Works with ChatGPT, Gemini &amp; Claude
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[480px]">
        <p className="mb-2 text-xs text-[#64748B]">Try a question:</p>

        <div className="mb-3 flex flex-wrap gap-2">
          {questions.map((question, index) => {
            const isActive = selectedQuestion === index;

            return (
              <button
                key={question.chip}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleChipClick(index as QuestionIndex)}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors duration-150 ${
                  isActive
                    ? "border-[#0EA5A0] bg-[#0EA5A015] text-[#0EA5A0]"
                    : "border-[#E2E8F0] text-[#64748B] hover:border-[#0EA5A0] hover:text-[#0EA5A0]"
                }`}
              >
                {question.chip}
              </button>
            );
          })}
        </div>

        {stage === "done" ? (
          <div className="hero-panel-in absolute bottom-16 left-3 right-3 z-10 rounded-lg border border-[#0EA5A0] bg-[#FFFFFF] px-4 py-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-[#0EA5A0]">Topic identified</span>
              <span className="rounded-sm bg-[#0EA5A015] px-2 py-1 font-mono text-xs text-[#0EA5A0]">
                {activeQuestion.key}
              </span>
            </div>

            <div className="mb-3 text-lg font-medium text-[#0F1117]">{activeQuestion.topic}</div>

            <div className="mb-3 space-y-2">
              {visibleSteps.map((step) => (
                <div key={step.n} className="flex items-start gap-2">
                  <span className="w-6 flex-shrink-0 font-mono text-xs text-[#0EA5A0]">
                    {step.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-[#0F1117]">{step.title}</p>
                    <p className="font-mono text-xs text-[#64748B]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0EA5A0] transition-colors duration-150 hover:text-[#0D9490]"
            >
              <span>{showAll ? "Hide full solution" : "View full solution"}</span>
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </button>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#FFFFFF]">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] bg-[#F8F9FC] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#0EA5A0]" />
              <span className="h-2.5 w-2.5 rounded-sm bg-[#F59E0B]" />
              <span className="h-2.5 w-2.5 rounded-sm bg-[#64748B]" />
            </div>
            <span className="mx-auto rounded-sm bg-[#E2E8F0] px-3 py-1 text-xs text-[#64748B]">
              ChatGPT
            </span>
            <div className="w-10" />
          </div>

          <div className="min-h-40 space-y-3 p-4">
            <div
              key={`user-${selectedQuestion}-${runId}`}
              className="hero-bubble-in ml-auto max-w-[85%] rounded-md border border-[#E2E8F0] bg-[#F8F9FC] px-3 py-3 text-sm text-[#0F1117]"
            >
              {activeQuestion.userMessage}
            </div>

            {stage === "responding" || stage === "done" ? (
              <div
                key={`ai-${selectedQuestion}-${stage}`}
                className="hero-bubble-in max-w-[90%] rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-3 text-sm text-[#64748B]"
              >
                <div className="mb-2 inline-flex items-center gap-2 rounded-sm bg-[#0EA5A015] px-2 py-1 text-xs font-medium text-[#0EA5A0]">
                  <Check aria-hidden="true" size={16} strokeWidth={1.5} />
                  <span>Framework active</span>
                </div>
                <p className="flex flex-wrap items-center gap-1">
                  <span>{activeQuestion.aiPartial}</span>
                  {stage === "responding" ? <StageDots /> : null}
                </p>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 border-t border-[#E2E8F0] px-3 py-3">
            <div className="flex-1 rounded-md bg-[#F8F9FC] px-3 py-2 text-xs text-[#4A4A5A]">
              Message ChatGPT...
            </div>

            <button
              type="button"
              aria-label="Send message"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0F1117] text-[#F0F0F2]"
            >
              <SendHorizontal aria-hidden="true" size={16} strokeWidth={1.5} />
            </button>

            {stage === "idle" ? (
              <button
                type="button"
                onClick={handleStemClick}
                className="hero-stem-idle inline-flex items-center gap-2 rounded-sm bg-[#0EA5A0] px-3 py-2 text-xs font-medium text-[#F0F0F2]"
              >
                <Sparkles aria-hidden="true" size={16} strokeWidth={1.5} />
                <span>stemLM</span>
              </button>
            ) : null}

            {stage === "injecting" ? (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-sm bg-[#0EA5A0] px-3 py-2 text-xs font-medium text-[#F0F0F2]"
              >
                <LoaderCircle aria-hidden="true" size={16} strokeWidth={1.5} className="animate-spin" />
                <span>Analyzing</span>
              </button>
            ) : null}

            {stage === "responding" || stage === "done" ? (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-sm border border-[#0EA5A0] bg-[#0EA5A015] px-3 py-2 text-xs font-medium text-[#0EA5A0]"
              >
                <Check aria-hidden="true" size={16} strokeWidth={1.5} />
                <span>stemLM</span>
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-3 text-center text-xs text-[#64748B]">
          {stage === "idle" ? "Click stemLM to analyze" : null}
          {stage === "injecting" ? (
            <span className="inline-flex items-center">
              <span>Identifying topic</span>
              <StageDots />
            </span>
          ) : null}
          {stage === "responding" ? "Generating structured solution..." : null}
          {stage === "done" ? (
            <span className="inline-flex items-center gap-2">
              <Check aria-hidden="true" size={16} strokeWidth={1.5} className="text-[#22C55E]" />
              <span>Framework matched · {activeQuestion.subject}</span>
            </span>
          ) : null}
        </div>

        {stage === "done" ? (
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-[#64748B]">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-sm border border-[#E2E8F0] px-3 py-2 transition-colors duration-150 hover:border-[#0EA5A0] hover:text-[#0EA5A0]"
            >
              <Download aria-hidden="true" size={16} strokeWidth={1.5} />
              <span>Download</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-sm border border-[#E2E8F0] px-3 py-2 transition-colors duration-150 hover:border-[#0EA5A0] hover:text-[#0EA5A0]"
            >
              <Copy aria-hidden="true" size={16} strokeWidth={1.5} />
              <span>Copy</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
