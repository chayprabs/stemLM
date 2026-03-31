"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const question = `Implement a 4-bit ripple carry adder using full adder subcircuits.
Derive the Boolean expressions, draw the gate-level circuit,
and determine the maximum propagation delay if each gate has 10ns delay.`;

const frameworkTag = "STEM-ECE-04-02-07";

const stepTitles = [
  "Full Adder Logic",
  "Circuit Diagram",
  "Propagation Delay Analysis",
  "Result",
] as const;

const TYPE_SPEED_MS = 22;
const POPUP_DELAY_MS = 320;
const POPUP_SETTLE_MS = 420;
const STEP_DELAY_MS = 700;
const HOLD_DURATION_MS = 3600;

function RippleCarryDiagram() {
  const blockXs = [20, 95, 170, 245];
  const boxY = 74;
  const boxWidth = 50;
  const boxHeight = 44;
  const centerY = boxY + boxHeight / 2;

  return (
    <svg
      viewBox="0 0 320 176"
      className="h-auto w-full"
      role="img"
      aria-label="4-bit ripple carry adder circuit"
    >
      <rect x="0" y="0" width="320" height="176" rx="14" fill="#FFFFFF" />

      {blockXs.map((x, index) => (
        <g key={`fa-${index}`}>
          <rect
            x={x}
            y={boxY}
            width={boxWidth}
            height={boxHeight}
            rx="10"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <text
            x={x + boxWidth / 2}
            y={boxY + 18}
            fill="#0F172A"
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
          >
            {`FA${index}`}
          </text>
          <text
            x={x + boxWidth / 2}
            y={boxY + 32}
            fill="#64748B"
            fontSize="9"
            textAnchor="middle"
          >
            Full Adder
          </text>

          <line
            x1={x + 14}
            y1={42}
            x2={x + 14}
            y2={boxY}
            stroke="#334155"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1={x + 36}
            y1={42}
            x2={x + 36}
            y2={boxY}
            stroke="#334155"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <text
            x={x + 14}
            y={31}
            fill="#334155"
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
          >
            {`A${index}`}
          </text>
          <text
            x={x + 36}
            y={31}
            fill="#334155"
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
          >
            {`B${index}`}
          </text>

          <line
            x1={x + boxWidth / 2}
            y1={boxY + boxHeight}
            x2={x + boxWidth / 2}
            y2={146}
            stroke="#334155"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <text
            x={x + boxWidth / 2}
            y={160}
            fill="#334155"
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
          >
            {`S${index}`}
          </text>
        </g>
      ))}

      <line
        x1={2}
        y1={centerY}
        x2={blockXs[0]}
        y2={centerY}
        stroke="#0EA5A0"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <text x={4} y={centerY - 8} fill="#0EA5A0" fontSize="10" fontWeight="600">
        Cin
      </text>

      {blockXs.map((x, index) => {
        const lineStart = x + boxWidth;
        const lineEnd = index === blockXs.length - 1 ? 318 : blockXs[index + 1];

        return (
          <g key={`carry-${index}`}>
            <circle cx={x} cy={centerY} r="3" fill="#0EA5A0" />
            <circle cx={lineStart} cy={centerY} r="3" fill="#0EA5A0" />
            <line
              x1={lineStart}
              y1={centerY}
              x2={lineEnd}
              y2={centerY}
              stroke="#0EA5A0"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {index < blockXs.length - 1 ? (
              <text
                x={(lineStart + lineEnd) / 2}
                y={centerY - 8}
                fill="#0EA5A0"
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
              >
                {`C${index + 1}`}
              </text>
            ) : (
              <text
                x={316}
                y={centerY - 8}
                fill="#0EA5A0"
                fontSize="10"
                fontWeight="600"
                textAnchor="end"
              >
                Cout
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function StepContent({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mt-3 rounded-xl bg-[#F8FAFC] px-3 py-3 font-mono text-[12px] leading-[1.8] text-[#334155]">
        <p>
          Sum = A <span aria-hidden="true">&oplus;</span> B{" "}
          <span aria-hidden="true">&oplus;</span> Cin
        </p>
        <p className="mt-2">
          Cout = (A<span aria-hidden="true">&middot;</span>B) + (B
          <span aria-hidden="true">&middot;</span>Cin) + (A
          <span aria-hidden="true">&middot;</span>Cin)
        </p>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="mt-3">
        <p className="mb-3 text-[13px] leading-[1.7] text-[#475569]">
          Four full adder stages are chained so each carry-out feeds the next
          stage&apos;s carry-in.
        </p>
        <div className="overflow-hidden rounded-[14px] border border-[#E2E8F0] bg-white p-2">
          <RippleCarryDiagram />
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="mt-3 space-y-2 text-[13px] leading-[1.7] text-[#475569]">
        <p>Each full adder introduces 2-gate delay for Sum, 2-gate delay for Carry.</p>
        <p>Ripple carry chain: 4 x 2 = 8 gate delays for final carry.</p>
        <p className="font-medium text-[#0F1117]">Total max delay = 8 x 10ns = 80ns</p>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2 text-[13px] leading-[1.7] text-[#475569]">
      <p>4-bit RCA operational. Max propagation delay: 80ns.</p>
      <p>For faster addition, consider Carry Lookahead Adder (CLA).</p>
    </div>
  );
}

export function DatabaseTeaser() {
  const [typedLength, setTypedLength] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [cycle, setCycle] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    setTypedLength(0);
    setIsPopupVisible(false);
    setVisibleSteps(0);

    for (let index = 1; index <= question.length; index += 1) {
      timers.push(setTimeout(() => setTypedLength(index), index * TYPE_SPEED_MS));
    }

    const typingEnd = question.length * TYPE_SPEED_MS;
    const popupStart = typingEnd + POPUP_DELAY_MS;
    const stepsStart = popupStart + POPUP_SETTLE_MS;
    const loopRestart = stepsStart + stepTitles.length * STEP_DELAY_MS + HOLD_DURATION_MS;

    timers.push(setTimeout(() => setIsPopupVisible(true), popupStart));

    stepTitles.forEach((_, index) => {
      timers.push(
        setTimeout(() => setVisibleSteps(index + 1), stepsStart + index * STEP_DELAY_MS),
      );
    });

    timers.push(setTimeout(() => setCycle((current) => current + 1), loopRestart));

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [cycle]);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    if (!isPopupVisible) {
      scrollRef.current.scrollTop = 0;
      return;
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: visibleSteps > 1 ? "smooth" : "auto",
    });
  }, [isPopupVisible, visibleSteps, cycle]);

  const typedQuestion = question.slice(0, typedLength);

  return (
    <section id="extension" className="bg-white px-5 py-16 md:px-12 md:py-24">
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

          .demo-step-in {
            animation: demo-step-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 max-w-[760px]">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
            See it work
          </p>
          <h2 className="mb-4 text-[34px] font-medium leading-tight tracking-[-0.5px] text-[#0F1117] md:text-[38px]">
            Watch stemLM break down a real ECE problem.
          </h2>
          <p className="max-w-[620px] text-[16px] leading-[1.7] text-[#64748B]">
            Paste any STEM question. Get a framework-matched, step-by-step
            solution right in your browser.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[30px] border border-[#E2E8F0] bg-[#F5F8FC] shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="flex h-12 items-center justify-between border-b border-[#E2E8F0] bg-white/80 px-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E2E8F0]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#94A3B8]" />
            </div>

            <div className="mx-4 flex h-8 flex-1 items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-xs text-[#64748B]">
              campus.university.edu/courses/ece-304/week-4
            </div>

            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-300 ${
                isPopupVisible
                  ? "border-[#0EA5A0] bg-[#0EA5A012] text-[#0EA5A0]"
                  : "border-[#E2E8F0] bg-white text-[#94A3B8]"
              }`}
            >
              <Sparkles aria-hidden="true" size={16} strokeWidth={1.7} />
            </div>
          </div>

          <div className="relative min-h-[680px] overflow-hidden">
            <div className="grid min-h-[680px] lg:grid-cols-[220px_1fr]">
              <aside className="border-r border-[#E2E8F0] bg-[#F8FAFC]/70 px-5 py-6">
                <p className="text-[11px] font-medium uppercase tracking-[1px] text-[#94A3B8]">
                  Course modules
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "Boolean algebra refresh",
                    "Combinational logic design",
                    "Arithmetic circuits",
                    "Sequential building blocks",
                    "Timing and hazards",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-xl border px-3 py-3 text-sm ${
                        index === 2
                          ? "border-[#0EA5A0] bg-[#0EA5A012] text-[#0EA5A0]"
                          : "border-[#E2E8F0] bg-white/70 text-[#64748B]"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="space-y-5 px-5 py-6 md:px-8 md:py-8">
                <div className="rounded-[24px] border border-[#E2E8F0] bg-white/80 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
                  <p className="text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
                    ECE 304 - Digital Electronics
                  </p>
                  <h3 className="mt-3 text-[28px] font-medium tracking-[-0.4px] text-[#0F1117]">
                    Arithmetic Circuits Problem Lab
                  </h3>
                  <p className="mt-3 max-w-[620px] text-sm leading-[1.7] text-[#64748B]">
                    Submit a circuit-design question and compare your working
                    with a fully structured breakdown.
                  </p>

                  <div className="mt-6 rounded-[22px] border border-[#DCE5EE] bg-[#F8FAFC] p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-[#0F1117]">
                          Ask about this module
                        </p>
                        <p className="mt-1 text-xs text-[#64748B]">
                          Question drafted by student in the course portal.
                        </p>
                      </div>
                      <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs text-[#3B82F6]">
                        Draft
                      </span>
                    </div>

                    <div className="min-h-[160px] rounded-[18px] border border-[#E2E8F0] bg-white px-4 py-4 text-[15px] leading-[1.8] text-[#0F1117] shadow-[0_8px_22px_rgba(15,23,42,0.03)]">
                      <span className="whitespace-pre-wrap">{typedQuestion}</span>
                      <span className="demo-cursor ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-1 bg-[#0EA5A0]" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[20px] border border-[#E2E8F0] bg-white/70 p-5">
                    <p className="text-xs font-medium uppercase tracking-[1px] text-[#94A3B8]">
                      This week
                    </p>
                    <p className="mt-3 text-sm leading-[1.7] text-[#64748B]">
                      Focus on adders, subtractors, and timing paths before the
                      lab practical.
                    </p>
                  </div>
                  <div className="rounded-[20px] border border-[#E2E8F0] bg-white/70 p-5">
                    <p className="text-xs font-medium uppercase tracking-[1px] text-[#94A3B8]">
                      Notes
                    </p>
                    <p className="mt-3 text-sm leading-[1.7] text-[#64748B]">
                      Review carry propagation and identify the longest critical
                      path through the design.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.12),rgba(248,250,252,0.46))] backdrop-blur-[1.8px]" />

            <div
              className={`absolute left-4 right-4 top-6 z-20 w-auto rounded-[12px] border border-[#DCE5EE] bg-white shadow-[0_28px_70px_rgba(15,23,42,0.24)] transition-all duration-500 ease-out sm:left-auto sm:right-6 sm:w-[380px] ${
                isPopupVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-8 opacity-0"
              }`}
            >
              <div className="flex h-10 items-center justify-between rounded-t-[12px] bg-[#0EA5A0] px-4 text-white">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20 text-[10px] font-semibold">
                    S
                  </span>
                  <span className="font-wordmark text-sm font-semibold">stemLM</span>
                </div>
                <span className="text-[10px] uppercase tracking-[1px] text-white/80">
                  Extension
                </span>
              </div>

              <div className="p-4">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#0EA5A012] px-3 py-1 text-[11px] font-medium text-[#0EA5A0]">
                    Framework matched
                  </span>
                  <span className="rounded-full border border-[#D7F3F0] px-3 py-1 font-mono text-[11px] text-[#0EA5A0]">
                    {frameworkTag}
                  </span>
                </div>

                <div ref={scrollRef} className="max-h-[430px] space-y-3 overflow-y-auto pr-1">
                  {visibleSteps === 0 ? (
                    <div className="rounded-[12px] border border-dashed border-[#D8E3EC] bg-[#FBFCFD] px-4 py-4 text-sm text-[#94A3B8]">
                      Building the structured solution...
                    </div>
                  ) : null}

                  {stepTitles.slice(0, visibleSteps).map((title, index) => (
                    <article
                      key={`${cycle}-${title}`}
                      className="demo-step-in rounded-[14px] border border-[#E2E8F0] bg-[#FCFDFE] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0EA5A012] text-sm font-semibold text-[#0EA5A0]">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[14px] font-semibold text-[#0F1117]">
                            {title}
                          </h3>
                          <StepContent index={index} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] bg-[#FAFBFC] px-4 py-3 text-[11px] text-[#94A3B8]">
                Powered by stemLM
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
