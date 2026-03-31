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
    chip: "Derive the time complexity of Dijkstra's algorithm using a min-heap",
  },
  {
    chip: "Find the Thevenin equivalent of a circuit with dependent sources",
  },
  {
    chip: "Prove that NP-complete problems are closed under polynomial reduction",
  },
] as const;

const overlayCard = {
  key: "STEM-CS-06-03-02",
  title: "Graph algorithms \u2014 Shortest path",
  subject: "Computer Science",
  steps: [
    {
      n: "01",
      title: "Define the priority queue structure",
      desc: "Min-heap with (distance, vertex) pairs",
    },
    {
      n: "02",
      title: "Relaxation condition",
      desc: "if dist[u] + w(u,v) < dist[v]: update dist[v]",
    },
    {
      n: "03",
      title: "Complexity breakdown",
      desc: "O((V + E) log V) \u2014 V extractions \u00d7 log V each",
    },
  ],
} as const;

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getNextQuestion(index: QuestionIndex): QuestionIndex {
  return index === 2 ? 0 : ((index + 1) as QuestionIndex);
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

  const activeQuestion = questions[selectedQuestion];

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
  }, [stage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedQuestion((current) => getNextQuestion(current));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function handleChipClick(index: QuestionIndex) {
    setSelectedQuestion(index);
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
          Free forever &middot; Works with ChatGPT, Gemini &amp; Claude
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
                className={`rounded-lg border px-3 py-2 text-sm transition-all duration-500 ease-in-out ${
                  isActive
                    ? "border-[#0EA5A0] bg-[#0EA5A015] text-[#0EA5A0] opacity-100 shadow-[0_8px_20px_rgba(14,165,160,0.08)]"
                    : "border-[#E2E8F0] text-[#64748B] opacity-65 hover:border-[#0EA5A0] hover:text-[#0EA5A0] hover:opacity-100"
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
                {overlayCard.key}
              </span>
            </div>

            <div className="mb-3 text-lg font-medium text-[#0F1117]">{overlayCard.title}</div>

            <div className="mb-3 space-y-2">
              {overlayCard.steps.map((step) => (
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

            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#0F1117]">
              <span>Framework matched &middot; {overlayCard.subject}</span>
              <Check aria-hidden="true" size={16} strokeWidth={1.8} className="text-[#22C55E]" />
            </div>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#FCFCFD] shadow-[0_14px_34px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E2E8F0]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#94A3B8]" />
            </div>
            <span className="mx-auto rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1 text-xs text-[#64748B]">
              ECE 610 course portal
            </span>
            <div className="w-10" />
          </div>

          <div className="min-h-40 space-y-3 bg-[#FBFCFE] p-4 opacity-85">
            <div
              key={`document-${selectedQuestion}`}
              className="hero-bubble-in rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-4 text-sm text-[#0F1117] shadow-[0_8px_20px_rgba(15,23,42,0.03)]"
            >
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[1px] text-[#94A3B8]">
                Discussion draft
              </div>
              <p className="leading-[1.7] text-[#0F1117]">{activeQuestion.chip}</p>
            </div>

            {stage === "responding" || stage === "done" ? (
              <div
                key={`portal-${stage}`}
                className="hero-bubble-in rounded-md border border-dashed border-[#DCE5EE] bg-[#F8FAFC] px-4 py-4 text-sm text-[#64748B]"
              >
                <div className="mb-2 inline-flex items-center gap-2 rounded-sm bg-[#0EA5A015] px-2 py-1 text-xs font-medium text-[#0EA5A0]">
                  <Check aria-hidden="true" size={16} strokeWidth={1.5} />
                  <span>Extension ready</span>
                </div>
                <p className="flex flex-wrap items-center gap-1">
                  <span>Open stemLM from the toolbar to structure the solution inside the page.</span>
                  {stage === "responding" ? <StageDots /> : null}
                </p>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 border-t border-[#E2E8F0] bg-[#FAFBFC] px-3 py-3">
            <div className="flex-1 rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#94A3B8]">
              Paste a question from your notes or assignment...
            </div>

            <button
              type="button"
              aria-label="Open course document"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B]"
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
          {stage === "idle" ? "Launch stemLM from the toolbar" : null}
          {stage === "injecting" ? (
            <span className="inline-flex items-center">
              <span>Matching framework</span>
              <StageDots />
            </span>
          ) : null}
          {stage === "responding" ? "Generating structured solution..." : null}
          {stage === "done" ? (
            <span className="inline-flex items-center gap-2">
              <Check aria-hidden="true" size={16} strokeWidth={1.5} className="text-[#22C55E]" />
              <span>Framework matched &middot; {overlayCard.subject}</span>
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
