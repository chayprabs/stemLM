"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const question = "Design a 2-bit synchronous counter using JK flip-flops";
const frameworkTag = "STEM-ECE-07-03-02";

const stateRows = [
  { present: "00", next: "01" },
  { present: "01", next: "10" },
  { present: "10", next: "11" },
  { present: "11", next: "00" },
] as const;

const steps = [
  {
    title: "Identify the states",
    body: "A 2-bit counter cycles through 4 states: 00 -> 01 -> 10 -> 11 -> 00",
  },
  {
    title: "Build the state transition table",
    table: true,
  },
  {
    title: "Derive JK inputs",
    bullets: [
      "For Q0: J0=1, K0=1 (toggles every clock)",
      "For Q1: J1=Q0, K1=Q0",
    ],
  },
  {
    title: "Final answer",
    body: "Connect J0=K0=1. Connect J1=K1=Q0. Clock both flip-flops simultaneously.",
  },
] as const;

const TYPE_SPEED_MS = 50;
const MATCH_DURATION_MS = 800;
const STEP_DELAY_MS = 600;
const HOLD_DURATION_MS = 3000;

export function DatabaseTeaser() {
  const [typedLength, setTypedLength] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    setTypedLength(0);
    setIsMatching(false);
    setVisibleSteps(0);

    for (let index = 1; index <= question.length; index += 1) {
      timers.push(setTimeout(() => setTypedLength(index), index * TYPE_SPEED_MS));
    }

    const typingEnd = question.length * TYPE_SPEED_MS;
    const matchingStart = typingEnd + 120;
    const matchingEnd = matchingStart + MATCH_DURATION_MS;
    const stepsStart = matchingEnd + 120;
    const loopRestart = stepsStart + steps.length * STEP_DELAY_MS + HOLD_DURATION_MS;

    timers.push(setTimeout(() => setIsMatching(true), matchingStart));
    timers.push(setTimeout(() => setIsMatching(false), matchingEnd));

    steps.forEach((_, index) => {
      timers.push(setTimeout(() => setVisibleSteps(index + 1), stepsStart + index * STEP_DELAY_MS));
    });

    timers.push(setTimeout(() => setCycle((current) => current + 1), loopRestart));

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [cycle]);

  const typedQuestion = question.slice(0, typedLength);
  const hasFinishedTyping = typedLength === question.length;
  const hasMatchedFramework = !isMatching && visibleSteps > 0;

  return (
    <section
      id="extension"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] px-5 py-16 md:px-12 md:py-24"
    >
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes demo-cursor {
            0%,
            45% {
              opacity: 1;
            }

            46%,
            100% {
              opacity: 0;
            }
          }

          @keyframes demo-shimmer {
            0% {
              background-position: 200% 0;
            }

            100% {
              background-position: -200% 0;
            }
          }

          @keyframes demo-step-in {
            from {
              opacity: 0;
              transform: translateY(14px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .demo-cursor {
            animation: demo-cursor 1s steps(1, end) infinite;
          }

          .demo-shimmer {
            background-image: linear-gradient(
              90deg,
              rgba(14, 165, 160, 0.06) 0%,
              rgba(14, 165, 160, 0.18) 48%,
              rgba(14, 165, 160, 0.06) 100%
            );
            background-size: 200% 100%;
            animation: demo-shimmer 1.2s linear infinite;
          }

          .demo-step-in {
            animation: demo-step-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-x-0 top-10 h-72 bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,160,0.08),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.06),transparent_28%)]" />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
            Interactive demo
          </p>
          <h2 className="mb-4 text-[34px] font-medium leading-tight tracking-[-0.5px] text-[#0F1117] md:text-[38px]">
            See stemLM solve a Digital Electronics question.
          </h2>
          <p className="mx-auto max-w-[600px] text-[16px] leading-[1.7] text-[#64748B]">
            A realistic in-product walkthrough of framework matching and
            step-by-step reasoning for sequential logic problems.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="rounded-[26px] border border-[#E2E8F0] bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#0F1117]">stemLM input</p>
                <p className="mt-1 text-xs text-[#64748B]">
                  Ask a problem the way a student actually would.
                </p>
              </div>
              <span className="rounded-full border border-[#D7F3F0] bg-[#0EA5A012] px-3 py-1 text-[11px] font-medium text-[#0EA5A0]">
                Digital Electronics
              </span>
            </div>

            <div className="rounded-[22px] border border-[#DCE5EE] bg-[#FBFCFD] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <div className="mb-3 flex items-center gap-2 text-xs text-[#64748B]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0EA5A012] text-[#0EA5A0]">
                  <Sparkles aria-hidden="true" size={14} strokeWidth={1.7} />
                </span>
                <span>Prompt stemLM</span>
              </div>

              <div className="min-h-[148px] rounded-[18px] border border-[#E2E8F0] bg-white px-4 py-4 text-[17px] leading-[1.8] text-[#0F1117] shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <span>{typedQuestion}</span>
                <span
                  className={`demo-cursor ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-1 bg-[#0EA5A0] ${
                    hasFinishedTyping ? "opacity-60" : ""
                  }`}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs text-[#64748B]">
                  Sequential logic
                </span>
                <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs text-[#64748B]">
                  JK flip-flops
                </span>
              </div>

              <div className="mt-5 rounded-[18px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                {isMatching ? (
                  <div className="flex items-center gap-3">
                    <div className="demo-shimmer h-9 flex-1 rounded-xl border border-[#D7F3F0]" />
                    <span className="text-xs font-medium text-[#0EA5A0]">
                      Matching framework...
                    </span>
                  </div>
                ) : hasMatchedFramework ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs text-[#64748B]">Matched framework</span>
                    <span className="rounded-full bg-[#0EA5A012] px-3 py-1 font-mono text-xs text-[#0EA5A0]">
                      {frameworkTag}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-[#94A3B8]">
                    Waiting for the full question before matching the framework.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-[#E2E8F0] bg-white/95 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#0F1117]">Structured solution</p>
                <p className="mt-1 text-xs text-[#64748B]">
                  stemLM reveals the reasoning in the order a student can follow.
                </p>
              </div>
              {hasMatchedFramework ? (
                <span className="rounded-full bg-[#0EA5A012] px-3 py-1 font-mono text-xs text-[#0EA5A0]">
                  {frameworkTag}
                </span>
              ) : (
                <span className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs text-[#94A3B8]">
                  {isMatching ? "Matching..." : "Framework pending"}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {steps.slice(0, visibleSteps).map((step, index) => (
                <article
                  key={`${cycle}-${step.title}`}
                  className="demo-step-in rounded-[20px] border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
                >
                  <div className="mb-3 flex items-start gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0EA5A012] text-sm font-semibold text-[#0EA5A0]">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-medium text-[#0F1117]">
                        {step.title}
                      </h3>

                      {"body" in step ? (
                        <p className="mt-2 text-sm leading-[1.7] text-[#475569]">
                          {step.body}
                        </p>
                      ) : null}

                      {"bullets" in step ? (
                        <div className="mt-3 space-y-2 text-sm leading-[1.7] text-[#475569]">
                          {step.bullets.map((bullet) => (
                            <p key={bullet}>{bullet}</p>
                          ))}
                        </div>
                      ) : null}

                      {"table" in step ? (
                        <div className="mt-3 overflow-hidden rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC]">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-white text-[#0F1117]">
                              <tr>
                                <th className="px-4 py-3 font-medium">
                                  Present State (Q1 Q0)
                                </th>
                                <th className="px-4 py-3 font-medium">
                                  Next State (Q1+ Q0+)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {stateRows.map((row) => (
                                <tr
                                  key={`${row.present}-${row.next}`}
                                  className="border-t border-[#E2E8F0] text-[#475569]"
                                >
                                  <td className="px-4 py-3">{row.present}</td>
                                  <td className="px-4 py-3">{row.next}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}

              {visibleSteps === 0 ? (
                <div className="rounded-[20px] border border-dashed border-[#D8E3EC] bg-[#FBFCFD] px-4 py-6 text-sm text-[#94A3B8]">
                  Solution steps will appear here after stemLM matches the right
                  Digital Electronics framework.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
