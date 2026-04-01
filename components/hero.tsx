"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type QuestionIndex = 0 | 1 | 2;
type DemoStage = "idle" | "injecting" | "responding" | "done";

interface HeroProps {
  onOpenModal: () => void;
}

type QuestionStep = {
  n: string;
  title: string;
  value: string;
};

type QuestionData = {
  chip: string;
  shortMessage: string;
  aiPartial: string;
  topicName: string;
  key: string;
  subjectName: string;
  steps: readonly QuestionStep[];
  diagram: ReactNode | null;
};

const REPLAY_DURATION_SECONDS = 6;

function getNextQuestion(index: QuestionIndex): QuestionIndex {
  return index === 2 ? 0 : ((index + 1) as QuestionIndex);
}

function StemMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="16" y="2" width="16" height="16" rx="4" fill="#0EA5A0" />
      <rect x="2" y="30" width="16" height="16" rx="4" fill="#0EA5A0" opacity="0.4" />
      <rect x="30" y="30" width="16" height="16" rx="4" fill="#0EA5A0" opacity="0.4" />
      <line x1="24" y1="18" x2="24" y2="28" stroke="#0EA5A0" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="28" x2="10" y2="30" stroke="#0EA5A0" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="28" x2="38" y2="30" stroke="#0EA5A0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12H18M18 12L12.5 6.5M18 12L12.5 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectileDiagram() {
  return (
    <svg viewBox="0 0 200 100" width="100%" height="100%" role="img" aria-label="Projectile motion diagram">
      <line x1="10" y1="80" x2="190" y2="80" stroke="#1E1E24" strokeWidth="1" />
      <path
        d="M 20 80 C 20 20, 100 5, 100 25 S 180 20, 180 80"
        stroke="#0EA5A0"
        strokeWidth="1.5"
        fill="none"
      />
      <line x1="20" y1="80" x2="45" y2="55" stroke="#0EA5A0" strokeWidth="1.5" />
      <path d="M 40 56 L 45 55 L 44 60" fill="none" stroke="#0EA5A0" strokeWidth="1.5" />
      <path d="M 34 80 A 14 14 0 0 1 44 70" stroke="#0EA5A0" strokeWidth="1" fill="none" />
      <g aria-label="Launch angle 45 degrees">
        <rect x="36" y="66" width="21" height="11" rx="5.5" fill="#FFFFFF" stroke="#DCE5EE" />
        <text x="45" y="73.2" textAnchor="middle" fontSize="7" fontWeight="600" fill="#0EA5A0">
          45
        </text>
        <circle cx="51.5" cy="69.5" r="1.4" fill="none" stroke="#0EA5A0" strokeWidth="1" />
      </g>
      <text x="24" y="66" fontSize="7" fill="#8A8A9A">
        20 m/s
      </text>
      <line x1="100" y1="25" x2="100" y2="80" stroke="#1E1E24" strokeDasharray="2 2" />
      <text x="105" y="50" fontSize="7" fill="#8A8A9A">
        max H
      </text>
      <line x1="20" y1="90" x2="180" y2="90" stroke="#0EA5A0" strokeWidth="1" />
      <path d="M 20 90 L 24 88 M 20 90 L 24 92" stroke="#0EA5A0" strokeWidth="1" fill="none" />
      <path d="M 180 90 L 176 88 M 180 90 L 176 92" stroke="#0EA5A0" strokeWidth="1" fill="none" />
      <text x="100" y="96" textAnchor="middle" fontSize="8" fill="#0EA5A0">
        R = 40.8 m
      </text>
      <circle cx="20" cy="80" r="3" fill="#0EA5A0" />
      <circle cx="180" cy="80" r="3" stroke="#0EA5A0" fill="none" />
    </svg>
  );
}

function CircuitDiagram() {
  return (
    <svg viewBox="0 0 200 100" width="100%" height="100%" role="img" aria-label="Parallel circuit diagram">
      <line x1="30" y1="20" x2="30" y2="80" stroke="#0EA5A0" strokeWidth="1.5" />
      <line x1="24" y1="45" x2="36" y2="45" stroke="#0EA5A0" strokeWidth="1.5" />
      <line x1="26" y1="52" x2="34" y2="52" stroke="#0EA5A0" strokeWidth="1.5" />
      <text x="22" y="52" fontSize="8" fill="#8A8A9A">
        V
      </text>

      <line x1="30" y1="20" x2="170" y2="20" stroke="#0EA5A0" strokeWidth="1.5" />
      <line x1="30" y1="80" x2="170" y2="80" stroke="#0EA5A0" strokeWidth="1.5" />
      <line x1="170" y1="20" x2="170" y2="80" stroke="#0EA5A0" strokeWidth="1.5" />

      <line x1="80" y1="20" x2="80" y2="35" stroke="#0EA5A0" strokeWidth="1.5" />
      <rect x="65" y="35" width="30" height="18" rx="2" stroke="#0EA5A0" fill="#0EA5A015" />
      <text x="80" y="46.5" textAnchor="middle" fontSize="8" fill="#8A8A9A">
        {"R\u2081=6\u03A9"}
      </text>
      <line x1="80" y1="53" x2="80" y2="80" stroke="#0EA5A0" strokeWidth="1.5" />

      <line x1="130" y1="20" x2="130" y2="35" stroke="#0EA5A0" strokeWidth="1.5" />
      <rect x="115" y="35" width="30" height="18" rx="2" stroke="#0EA5A0" fill="#0EA5A015" />
      <text x="130" y="46.5" textAnchor="middle" fontSize="8" fill="#8A8A9A">
        {"R\u2082=3\u03A9"}
      </text>
      <line x1="130" y1="53" x2="130" y2="80" stroke="#0EA5A0" strokeWidth="1.5" />

      <path d="M 52 18 L 55 20 L 52 22" stroke="#0EA5A0" strokeWidth="1.2" fill="none" />
      <path d="M 147 18 L 150 20 L 147 22" stroke="#0EA5A0" strokeWidth="1.2" fill="none" />

      <text x="100" y="95" textAnchor="middle" fontSize="9" fill="#0EA5A0" fontWeight="500">
        {"Req = 2\u03A9"}
      </text>
    </svg>
  );
}

function TitrationDiagram() {
  return (
    <svg viewBox="0 0 200 100" width="100%" height="100%" role="img" aria-label="Titration mixture diagram">
      <rect x="15" y="30" width="50" height="50" rx="3" stroke="#0EA5A0" fill="#0EA5A015" />
      <rect x="16" y="55" width="48" height="24" rx="2" fill="#0EA5A015" />
      <text x="40" y="48" textAnchor="middle" fontSize="9" fill="#8A8A9A">
        HCl
      </text>
      <text x="40" y="72" textAnchor="middle" fontSize="8" fill="#8A8A9A">
        0.1M
      </text>
      <text x="40" y="85" textAnchor="middle" fontSize="7" fill="#8A8A9A">
        25mL
      </text>

      <rect x="135" y="30" width="50" height="50" rx="3" stroke="#0EA5A0" fill="#0EA5A015" />
      <rect x="136" y="60" width="48" height="19" rx="2" fill="#0EA5A015" />
      <text x="160" y="48" textAnchor="middle" fontSize="9" fill="#8A8A9A">
        NaOH
      </text>
      <text x="160" y="72" textAnchor="middle" fontSize="8" fill="#8A8A9A">
        0.2M
      </text>
      <text x="160" y="85" textAnchor="middle" fontSize="7" fill="#8A8A9A">
        10mL
      </text>

      <line x1="68" y1="55" x2="132" y2="55" stroke="#0EA5A0" strokeWidth="1.5" />
      <path d="M 128 52 L 132 55 L 128 58" stroke="#0EA5A0" strokeWidth="1.5" fill="none" />
      <text x="100" y="50" textAnchor="middle" fontSize="12" fill="#0EA5A0">
        +
      </text>

      <rect x="75" y="88" width="50" height="12" rx="3" fill="#0EA5A015" stroke="#0EA5A0" />
      <text x="100" y="96" textAnchor="middle" fontSize="8" fill="#0EA5A0" fontWeight="500">
        pH = 1.85
      </text>
    </svg>
  );
}

const questions: QuestionData[] = [
  {
    chip: "Projectile range",
    shortMessage: "Find the range of a projectile at 20 m/s, 45\u00B0",
    aiPartial: "Using R = u\u00B2sin2\u03B8/g, with \u03B8=45\u00B0...",
    topicName: "Projectile Motion \u2014 Range",
    key: "STEM-PHY-03-07-02",
    subjectName: "Physics",
    steps: [
      { n: "01", title: "Identify values", value: "u=20, \u03B8=45\u00B0, g=9.8" },
      { n: "02", title: "Apply formula", value: "R = u\u00B2sin2\u03B8 / g" },
      { n: "03", title: "Substitute", value: "R = 400\u00D71 / 9.8 = 40.8 m" },
    ],
    diagram: null,
  },
  {
    chip: "Parallel resistance",
    shortMessage: "Find Req for 6\u03A9 and 3\u03A9 in parallel",
    aiPartial: "For parallel: 1/Req = 1/R1 + 1/R2...",
    topicName: "Parallel Circuits \u2014 Req",
    key: "STEM-EE-02-04-01",
    subjectName: "Electronics",
    steps: [
      { n: "01", title: "Write formula", value: "1/Req = 1/6 + 1/3" },
      { n: "02", title: "Simplify", value: "1/Req = 1/2" },
      { n: "03", title: "Solve", value: "Req = 2\u03A9" },
    ],
    diagram: null,
  },
  {
    chip: "pH of mixture",
    shortMessage: "pH after mixing 25mL HCl + 10mL NaOH",
    aiPartial: "Find moles of each, then excess H\u207A...",
    topicName: "Acid-Base \u2014 pH Calculation",
    key: "STEM-CHEM-05-03-02",
    subjectName: "Chemistry",
    steps: [
      { n: "01", title: "Find moles", value: "nHCl=0.0025, nNaOH=0.002" },
      { n: "02", title: "Find excess", value: "H\u207A excess = 0.0005 mol" },
      { n: "03", title: "Calculate pH", value: "pH = -log(0.0143) = 1.85" },
    ],
    diagram: null,
  },
];

questions[0].diagram = <ProjectileDiagram />;
questions[1].diagram = <CircuitDiagram />;
questions[2].diagram = <TitrationDiagram />;

export function Hero({ onOpenModal }: HeroProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionIndex>(0);
  const [stage, setStage] = useState<DemoStage>("idle");
  const [replaySeconds, setReplaySeconds] = useState(REPLAY_DURATION_SECONDS);
  const [playKey, setPlayKey] = useState(0);
  const replayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const replayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stageTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const activeQuestion = questions[selectedQuestion];
  const isSplit = stage === "responding" || stage === "done";

  function clearStageTimeouts() {
    stageTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    stageTimeoutsRef.current = [];
  }

  function clearReplayTimers() {
    if (replayIntervalRef.current) {
      clearInterval(replayIntervalRef.current);
      replayIntervalRef.current = null;
    }

    if (replayTimeoutRef.current) {
      clearTimeout(replayTimeoutRef.current);
      replayTimeoutRef.current = null;
    }
  }

  function scheduleStageChain(startFromInjecting: boolean) {
    clearStageTimeouts();

    if (startFromInjecting) {
      setStage("injecting");
      stageTimeoutsRef.current = [
        setTimeout(() => setStage("responding"), 1200),
        setTimeout(() => setStage("done"), 2700),
      ];
      return;
    }

    setStage("idle");
    stageTimeoutsRef.current = [
      setTimeout(() => setStage("injecting"), 800),
      setTimeout(() => setStage("responding"), 2000),
      setTimeout(() => setStage("done"), 3500),
    ];
  }

  useEffect(() => {
    scheduleStageChain(false);

    return () => {
      clearStageTimeouts();
    };
  }, [selectedQuestion, playKey]);

  useEffect(() => {
    clearReplayTimers();

    setReplaySeconds(REPLAY_DURATION_SECONDS);

    let nextReplaySeconds = REPLAY_DURATION_SECONDS;
    replayIntervalRef.current = setInterval(() => {
      nextReplaySeconds -= 1;

      if (nextReplaySeconds <= 1) {
        setReplaySeconds(1);
        clearReplayTimers();
        return;
      }

      setReplaySeconds(nextReplaySeconds);
    }, 1000);

    replayTimeoutRef.current = setTimeout(() => {
      clearReplayTimers();
      setSelectedQuestion((current) => getNextQuestion(current));
      setPlayKey((current) => current + 1);
    }, REPLAY_DURATION_SECONDS * 1000);

    return () => {
      clearReplayTimers();
    };
  }, [selectedQuestion, playKey]);

  function handleChipClick(index: QuestionIndex) {
    clearStageTimeouts();
    clearReplayTimers();

    setStage("idle");
    setReplaySeconds(REPLAY_DURATION_SECONDS);
    setSelectedQuestion(index);
    setPlayKey((current) => current + 1);
  }

  function handleStemClick() {
    if (stage !== "idle") {
      return;
    }

    scheduleStageChain(true);
  }

  const statusText =
    stage === "idle"
      ? "Click \u2726 stemLM to analyze"
      : stage === "injecting"
        ? "Injecting framework..."
        : stage === "responding"
          ? "Reading response..."
          : `\u2713 Framework matched \u00B7 ${activeQuestion.subjectName}`;

  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-9 px-4 pb-8 pt-10 sm:px-5 md:gap-14 lg:grid-cols-[55fr_45fr] lg:px-12 lg:pb-12 lg:pt-16">
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes button-pulse {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }

            50% {
              opacity: 0.92;
              transform: scale(1.02);
            }
          }

          @keyframes cursor-blink {
            0%,
            45% {
              opacity: 1;
            }

            46%,
            100% {
              opacity: 0;
            }
          }

          @keyframes hero-progress {
            from {
              transform: scaleX(1);
            }

            to {
              transform: scaleX(0);
            }
          }

          .hero-stem-idle {
            animation: button-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .hero-cursor {
            animation: cursor-blink 1s steps(1, end) infinite;
          }

          .hero-progress-bar {
            animation: hero-progress ${REPLAY_DURATION_SECONDS}s linear forwards;
            transform-origin: left center;
          }
        }
      `}</style>

      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-sm bg-[#0EA5A015] px-3 py-1 text-xs font-medium text-[#0EA5A0]">
          <StemMark />
          <span>Now in private beta</span>
        </div>

        <h1 className="mb-6 text-balance text-[30px] font-medium leading-[1.06] tracking-[-0.7px] text-[#0F1117] sm:text-[38px] md:text-3xl lg:text-4xl">
          <span>
            The <span className="text-[#0EA5A0]">structured</span> way
          </span>{" "}
          <span className="sm:block">to solve STEM</span>{" "}
          <span className="sm:block">problems with AI.</span>
        </h1>

        <p className="mb-8 max-w-[480px] text-base text-[#64748B]">
          stemLM works alongside ChatGPT, Gemini, and Claude, injecting the exact
          step-by-step framework your subject demands so every solution is correct,
          complete, and curriculum-aligned.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0EA5A0] px-6 py-3 text-base font-medium text-[#F0F0F2] transition-transform duration-150 hover:scale-[1.01] hover:bg-[#0EA5A0] sm:w-auto"
          >
            <span>Get early access</span>
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => {
              document.getElementById("live-demo")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#E2E8F0] px-5 py-3 text-base text-[#64748B] transition-colors duration-150 hover:border-[#0EA5A0] hover:text-[#0F1117] sm:w-auto"
          >
            <span>See how it works</span>
            <ArrowDown aria-hidden="true" size={16} strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-4 text-xs text-[#4A4A5A]">
          Free forever &middot; Works with ChatGPT, Gemini &amp; Claude
        </p>
      </div>

      <div className="mx-auto w-full max-w-[520px]">
        <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="mr-1 flex-shrink-0 text-[11px] text-[#64748B]">Try:</span>

          {questions.map((question, index) => {
            const isActive = selectedQuestion === index;

            return (
              <button
                key={question.chip}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleChipClick(index as QuestionIndex)}
                className={`flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3 py-1 text-[11px] transition-all duration-150 ${
                  isActive
                    ? "border-[#0EA5A0] bg-[#0EA5A015] text-[#0EA5A0]"
                    : "border-[#E2E8F0] text-[#64748B]"
                }`}
              >
                {question.chip}
              </button>
            );
          })}
        </div>

        <div
          className={`flex h-[360px] flex-row overflow-hidden rounded-[16px] bg-[#F1F5F5] p-2 sm:p-2.5 ${
            isSplit ? "gap-2" : "gap-0"
          }`}
        >
          <div
            className="min-h-0 min-w-0 overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white"
            style={{
              flex: isSplit ? "0 0 55%" : "1 1 100%",
            }}
          >
            <div className="flex h-8 flex-shrink-0 items-center gap-1.5 border-b border-[#E2E8F0] bg-[#F8F9FC] px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="mx-auto max-w-[112px] truncate rounded-full border border-[#E2E8F0] bg-white px-2 py-0.5 text-[10px] leading-none text-[#8A8A9A]">
                chat.openai.com
              </span>
              {isSplit ? (
                <span className="inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[8px] border border-[#D8E2E8] bg-white px-2 py-1 text-[9px] leading-none shadow-[0_6px_16px_rgba(15,17,23,0.05)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0EA5A0]" />
                  <span className="text-[#8A8A9A]">Next reply</span>
                  <span className="rounded-full bg-[#0EA5A015] px-1.5 py-0.5 font-mono text-[8px] font-medium text-[#0EA5A0]">
                    {replaySeconds}s
                  </span>
                </span>
              ) : null}
            </div>

            <div className="flex h-[calc(100%-32px)] flex-col">
              <div className="flex-1 overflow-hidden p-3">
                <div className="flex h-full flex-col gap-2 overflow-hidden">
                  {isSplit ? (
                    <div className="mb-0.5 sm:mb-1">
                      <div className="text-[8px] font-medium uppercase tracking-wider text-[#8A8A9A] sm:text-[9px]">
                        LIVE FLOW
                      </div>
                      <div className="text-[11px] font-medium leading-[1.45] text-[#0F1117] sm:text-[12px]">
                        Student asks in ChatGPT. stemLM handles the method.
                      </div>
                    </div>
                  ) : null}

                  <div className="ml-auto max-w-[88%] rounded-[8px] bg-[#F0F0F0] px-3 py-2 text-[11px] leading-[1.55] text-[#0F1117]">
                    {activeQuestion.shortMessage}
                  </div>

                  {stage !== "idle" ? (
                    <div className="max-w-[92%] rounded-[8px] border border-[#E2E8F0] border-l-2 border-l-[#0EA5A0] bg-white px-3 py-2 text-[11px] leading-[1.55] text-[#64748B]">
                      {stage === "injecting" ? (
                        <span className="inline-flex items-center">
                          <span className="mr-1.5 inline-block h-3 w-3 rounded-full border border-[#0EA5A0] border-t-transparent animate-spin" />
                          <span>Preparing framework...</span>
                        </span>
                      ) : (
                        <span>
                          {activeQuestion.aiPartial}
                          {stage === "responding" ? (
                            <span className="hero-cursor ml-0.5 inline-block h-[11px] w-[1.5px] bg-[#64748B]" />
                          ) : null}
                        </span>
                      )}
                    </div>
                  ) : null}

                  {stage === "done" ? (
                    <div className="rounded-[6px] border border-[#E2E8F0] bg-[#F8F9FC] px-2 py-1.5 text-[10px] leading-[1.45] text-[#64748B]">
                      <span>Matched topic: {activeQuestion.topicName}</span>
                      <span className="ml-0 mt-0.5 block font-mono text-[9px] text-[#0EA5A0] sm:ml-1 sm:mt-0 sm:inline">
                        {activeQuestion.key}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center gap-2 border-t border-[#E2E8F0] px-3 py-2">
                <div className="min-w-0 flex-1 truncate text-[10px] text-[#4A4A5A]">
                  {activeQuestion.shortMessage}
                </div>

                {stage === "idle" ? (
                  <>
                    <button
                      type="button"
                      onClick={handleStemClick}
                      className="hero-stem-idle rounded-[6px] bg-[#0EA5A0] px-2.5 py-1.5 text-[10px] font-medium text-white"
                    >
                      {"\u2726 stemLM"}
                    </button>
                    <button
                      type="button"
                      aria-label="Send question"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E2E8F0] text-[#8A8A9A]"
                    >
                      <SendArrowIcon />
                    </button>
                  </>
                ) : null}

                {stage === "injecting" ? (
                  <div className="inline-flex items-center gap-1 text-[10px] text-[#0EA5A0]">
                    <span className="inline-block h-3 w-3 rounded-full border border-[#0EA5A0] border-t-transparent animate-spin" />
                    <span>Injecting...</span>
                  </div>
                ) : null}

                {stage === "responding" || stage === "done" ? (
                  <>
                    <span className="text-[10px] font-medium text-[#0EA5A0]">{"\u2713 Attached"}</span>
                    <button
                      type="button"
                      aria-label="Send question"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F1117] text-white"
                    >
                      <SendArrowIcon />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className={`min-h-0 min-w-0 overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white transition-[transform,opacity] duration-300 ease-out ${
              isSplit ? "translate-x-0" : "translate-x-5"
            }`}
            style={{
              flex: isSplit ? "0 0 45%" : "0 0 0%",
              opacity: isSplit ? 1 : 0,
              pointerEvents: isSplit ? "auto" : "none",
            }}
          >
            <div className="flex h-full flex-col">
              <div className="flex flex-shrink-0 items-center justify-between border-b border-[#E2E8F0] px-3 py-2.5">
                <div className="flex items-center gap-[6px]">
                  <span className="text-[12px] font-medium text-[#0F1117]">stem</span>
                  <span className="text-[12px] font-medium text-[#0EA5A0]">LM</span>
                </div>
                <span className="text-[8px] uppercase tracking-wider text-[#94A3B8] sm:text-[9px]">
                  SIDE PANEL
                </span>
              </div>

              <div className="flex-shrink-0 border-b border-[#E2E8F0] px-3 py-2">
                <div className="mb-1 text-[9px] uppercase tracking-wider text-[#94A3B8]">
                  EXTRACTION STATUS
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  <span className="text-[10px] text-[#64748B]">
                    Hidden framework key found in response.
                  </span>
                </div>
                <span className="mt-1 inline-block rounded bg-[#0EA5A015] px-1.5 py-0.5 font-mono text-[9px] text-[#0EA5A0]">
                  {activeQuestion.key}
                </span>
              </div>

              <div className="hidden flex-shrink-0 border-b border-[#E2E8F0] px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] uppercase tracking-wider text-[#94A3B8]">Matched topic</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0EA5A015] px-2 py-1 font-mono text-[9px] text-[#0EA5A0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                    {activeQuestion.subjectName}
                  </span>
                </div>
              </div>

              <div className="flex-[0_0_110px] border-b border-[#E2E8F0] px-3 py-2">
                <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#F1F5F5]">
                  {activeQuestion.diagram}
                </div>
              </div>

              <div className="flex-1 overflow-hidden px-3 py-2">
                <div className="space-y-2">
                  {activeQuestion.steps.map((step) => (
                    <div
                      key={step.n}
                      className="rounded-[6px] border border-[#E2E8F0] bg-[#F8F9FC] px-2.5 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#0EA5A015] px-1.5 py-0.5 font-mono text-[9px] text-[#0EA5A0]">
                          {step.n}
                        </span>
                        <span className="text-[11px] font-medium text-[#0F1117]">
                          {step.title}
                        </span>
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] text-[#64748B]">
                        {step.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center justify-between border-t border-[#E2E8F0] px-3 py-2">
                <span className="text-[9px] text-[#94A3B8]">Powered by stemLM</span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="text-[10px] text-[#64748B] transition-colors hover:text-[#0F1117]"
                  >
                    Copy
                  </button>
                  <button
                    type="button"
                    className="text-[10px] text-[#64748B] transition-colors hover:text-[#0F1117]"
                  >
                    Download
                  </button>
                </div>
              </div>

              <div className="h-[2px] w-full flex-shrink-0 bg-[#E2E8F0]">
                <div key={playKey} className="hero-progress-bar h-full w-full bg-[#0EA5A0]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2.5 min-h-[17px] text-center text-[11px] text-[#8A8A9A]">{statusText}</div>
      </div>
    </section>
  );
}
