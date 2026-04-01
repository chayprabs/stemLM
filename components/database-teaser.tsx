"use client";

import {
  Check,
  Copy,
  Download,
  LoaderCircle,
  PanelRightOpen,
  SendHorizontal,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const question = `Implement a 4-bit ripple carry adder using full adder subcircuits.
Derive the Boolean expressions, draw the gate-level circuit,
and determine the maximum propagation delay if each gate has 10ns delay.`;

const frameworkTag = "STEM-ECE-04-02-07";

const responseSections = [
  {
    title: "Matched topic",
    body: "Digital Electronics -> Combinational circuits -> 4-bit ripple carry adder",
  },
  {
    title: "Step 1. Full-adder Boolean expressions",
    body: "S_i = A_i XOR B_i XOR C_i\nC_(i+1) = A_iB_i + A_iC_i + B_iC_i",
    mono: true,
  },
  {
    title: "Step 2. Cascade four stages",
    body: "FA0 handles the LSB. Each carry-out ripples into the next stage: C1 -> C2 -> C3 -> C4.",
  },
  {
    title: "Step 3. Critical-path delay",
    body: "C4 = 4 stages x 2 gates x 10ns = 80ns. S3 also reaches 80ns because it waits for C3, then passes through two XOR gates.",
  },
] as const;

const panelSteps = [
  "Full-adder logic",
  "4-stage ripple chain",
  "Propagation delay",
  "Final takeaway",
] as const;

const TYPE_SPEED_MS = 16;
const BUTTON_PROMPT_DELAY_MS = 380;
const INJECTION_DURATION_MS = 900;
const SEND_DELAY_MS = 260;
const RESPONSE_SECTION_DELAY_MS = 650;
const PANEL_DELAY_MS = 900;
const PANEL_SETTLE_MS = 380;
const PANEL_STEP_DELAY_MS = 700;
const REPLAY_COUNTDOWN_SECONDS = 10;
const REPLAY_COUNTDOWN_MS = REPLAY_COUNTDOWN_SECONDS * 1000;

function StageDots() {
  return (
    <span className="ml-1 inline-flex items-center gap-1">
      <span className="demo-stage-dot demo-stage-dot-1 h-1 w-1 rounded-sm bg-[#64748B]" />
      <span className="demo-stage-dot demo-stage-dot-2 h-1 w-1 rounded-sm bg-[#64748B]" />
      <span className="demo-stage-dot demo-stage-dot-3 h-1 w-1 rounded-sm bg-[#64748B]" />
    </span>
  );
}

function RippleCarryPanelDiagram() {
  const blockXs = [34, 112, 190, 268];
  const boxY = 78;
  const boxWidth = 56;
  const boxHeight = 46;
  const carryY = boxY + boxHeight / 2;
  const outputY = 166;

  return (
    <svg
      viewBox="0 0 360 196"
      className="h-auto w-full"
      role="img"
      aria-label="4-bit ripple carry adder built from four full adder blocks"
    >
      <rect x="0" y="0" width="360" height="196" rx="18" fill="#F8FAFC" />
      <text x="22" y="26" fill="#0F1117" fontSize="12" fontWeight="500">
        4-bit ripple-carry adder
      </text>
      <text x="22" y="44" fill="#64748B" fontSize="10">
        C0 enters FA0 and ripples stage-by-stage to Cout
      </text>

      {blockXs.map((x, index) => (
        <g key={`fa-${index}`}>
          <rect
            x={x - 2}
            y={boxY - 2}
            width={boxWidth + 4}
            height={boxHeight + 4}
            rx="14"
            fill="#FFFFFF"
            stroke="#DCE5EE"
            strokeWidth="1.5"
          />
          <rect
            x={x}
            y={boxY}
            width={boxWidth}
            height={boxHeight}
            rx="12"
            fill="#FDFEFE"
            stroke="#CFE3E8"
            strokeWidth="1.5"
          />
          <text
            x={x + boxWidth / 2}
            y={boxY + 21}
            fill="#0F1117"
            fontSize="12"
            fontWeight="500"
            textAnchor="middle"
          >
            {`FA${index}`}
          </text>
          <line
            x1={x + 16}
            y1={62}
            x2={x + 16}
            y2={boxY}
            stroke="#64748B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1={x + 40}
            y1={62}
            x2={x + 40}
            y2={boxY}
            stroke="#64748B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text x={x + 16} y={62} fill="#0F1117" fontSize="10" textAnchor="middle">
            {`A${index}`}
          </text>
          <text x={x + 40} y={62} fill="#0F1117" fontSize="10" textAnchor="middle">
            {`B${index}`}
          </text>
          <line
            x1={x + boxWidth / 2}
            y1={boxY + boxHeight}
            x2={x + boxWidth / 2}
            y2={outputY - 12}
            stroke="#475569"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <text
            x={x + boxWidth / 2}
            y={outputY}
            fill="#0F1117"
            fontSize="10"
            textAnchor="middle"
          >
            {`S${index}`}
          </text>
        </g>
      ))}

      <line
        x1="18"
        y1={carryY}
        x2={blockXs[0]}
        y2={carryY}
        stroke="#0EA5A0"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <text x="18" y={carryY - 12} fill="#0EA5A0" fontSize="10" fontWeight="500">
        Cin
      </text>

      {blockXs.map((x, index) => {
        const rightX = x + boxWidth;
        const nextX = index === blockXs.length - 1 ? 342 : blockXs[index + 1];

        return (
          <g key={`carry-${index}`}>
            <circle cx={x} cy={carryY} r="3.5" fill="#0EA5A0" />
            <circle cx={rightX} cy={carryY} r="3.5" fill="#0EA5A0" />
            <line
              x1={x}
              y1={carryY}
              x2={rightX}
              y2={carryY}
              stroke="#0EA5A0"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <line
              x1={rightX}
              y1={carryY}
              x2={nextX}
              y2={carryY}
              stroke="#0EA5A0"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {index < blockXs.length - 1 ? (
              <text
                x={(rightX + nextX) / 2}
                y={carryY - 12}
                fill="#0EA5A0"
                fontSize="10"
                fontWeight="500"
                textAnchor="middle"
              >
                {`C${index + 1}`}
              </text>
            ) : (
              <text
                x="342"
                y={carryY - 12}
                fill="#0EA5A0"
                fontSize="10"
                fontWeight="500"
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

function PanelStepContent({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mt-3">
        <div className="space-y-1.5 rounded-[12px] border border-[#DCE5EE] bg-[#F8FAFC] px-3 py-2.5 text-[12px] leading-[1.75] text-[#0F1117]">
          <div className="grid grid-cols-[58px_minmax(0,1fr)] items-start gap-3">
            <span className="text-[#64748B]">Sum</span>
            <code className="font-mono text-[12px] text-[#0F1117]">
              S<sub>i</sub> = A<sub>i</sub> XOR B<sub>i</sub> XOR C<sub>i</sub>
            </code>
          </div>
          <div className="grid grid-cols-[58px_minmax(0,1fr)] items-start gap-3 border-t border-[#E2E8F0] pt-2">
            <span className="text-[#64748B]">Carry</span>
            <code className="font-mono text-[12px] text-[#0F1117]">
              C<sub>i+1</sub> = A<sub>i</sub>B<sub>i</sub> + A<sub>i</sub>C<sub>i</sub> + B<sub>i</sub>C<sub>i</sub>
            </code>
          </div>
        </div>
        <p className="mt-2.5 text-[13px] leading-[1.65] text-[#64748B]">
          Each stage uses the same full-adder equations. Only the carry input changes
          as the chain moves from bit 0 to bit 3.
        </p>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="mt-3">
        <p className="mb-2.5 text-[13px] leading-[1.65] text-[#64748B]">
          Four identical full adders are cascaded. The carry-out of one stage becomes
          the carry-in of the next stage.
        </p>
        <div className="overflow-hidden rounded-[16px] border border-[#DCE5EE] bg-[#FFFFFF] p-3">
          <RippleCarryPanelDiagram />
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="mt-3 space-y-2.5 text-[13px] leading-[1.65] text-[#64748B]">
        <div className="rounded-[12px] border border-[#DCE5EE] bg-[#F8FAFC] px-3 py-2.5">
          <p>Carry through one full adder = 2 gate delays = 20ns.</p>
          <p className="mt-2">Final carry C4 = 4 stages x 20ns = 80ns.</p>
          <p className="mt-2">Last sum S3 also reaches 80ns after waiting for C3 and two XOR gates.</p>
        </div>
        <div className="rounded-[12px] bg-[#0EA5A015] px-3 py-2 text-[13px] font-medium text-[#0F1117]">
          Worst-case propagation delay: 80ns
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2.5 text-[13px] leading-[1.65] text-[#64748B]">
      <p>
        The 4-bit ripple carry adder works correctly, but its speed is limited because
        every carry has to ripple through the previous stage first.
      </p>
      <div className="rounded-[12px] border border-[#DCE5EE] bg-[#F8FAFC] px-3 py-2.5 text-[#0F1117]">
        Final answer: the adder produces S0-S3 with a final carry-out after 80ns.
        For higher-speed addition, a carry lookahead adder is the better choice.
      </div>
    </div>
  );
}

export function DatabaseTeaser() {
  const [typedLength, setTypedLength] = useState(0);
  const [isInjecting, setIsInjecting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [visibleResponseSections, setVisibleResponseSections] = useState(0);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [visiblePanelSteps, setVisiblePanelSteps] = useState(0);
  const [replayCountdown, setReplayCountdown] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const panelScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    setTypedLength(0);
    setIsInjecting(false);
    setMessageSent(false);
    setVisibleResponseSections(0);
    setIsPanelVisible(false);
    setVisiblePanelSteps(0);
    setReplayCountdown(null);

    for (let index = 1; index <= question.length; index += 1) {
      timers.push(setTimeout(() => setTypedLength(index), index * TYPE_SPEED_MS));
    }

    const typingEnd = question.length * TYPE_SPEED_MS;
    const injectionStart = typingEnd + BUTTON_PROMPT_DELAY_MS;
    const sendAt = injectionStart + INJECTION_DURATION_MS + SEND_DELAY_MS;
    const responseStart = sendAt + 340;
    const panelAt = responseStart + PANEL_DELAY_MS;
    const panelStepsStart = panelAt + PANEL_SETTLE_MS;
    const replayCountdownStart = panelStepsStart + panelSteps.length * PANEL_STEP_DELAY_MS;
    const loopRestart = replayCountdownStart + REPLAY_COUNTDOWN_MS;

    timers.push(setTimeout(() => setIsInjecting(true), injectionStart));
    timers.push(setTimeout(() => setIsInjecting(false), sendAt - 80));
    timers.push(setTimeout(() => setMessageSent(true), sendAt));

    responseSections.forEach((_, index) => {
      timers.push(setTimeout(() => setVisibleResponseSections(index + 1), responseStart + index * RESPONSE_SECTION_DELAY_MS));
    });

    timers.push(setTimeout(() => setIsPanelVisible(true), panelAt));

    panelSteps.forEach((_, index) => {
      timers.push(setTimeout(() => setVisiblePanelSteps(index + 1), panelStepsStart + index * PANEL_STEP_DELAY_MS));
    });

    for (let index = 0; index <= REPLAY_COUNTDOWN_SECONDS; index += 1) {
      const nextCountdown = REPLAY_COUNTDOWN_SECONDS - index;
      timers.push(
        setTimeout(
          () => setReplayCountdown(nextCountdown === 0 ? null : nextCountdown),
          replayCountdownStart + index * 1000,
        ),
      );
    }

    timers.push(setTimeout(() => setCycle((current) => current + 1), loopRestart));

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [cycle]);

  useEffect(() => {
    if (!panelScrollRef.current) {
      return;
    }

    if (!isPanelVisible) {
      panelScrollRef.current.scrollTop = 0;
      return;
    }

    panelScrollRef.current.scrollTo({
      top: panelScrollRef.current.scrollHeight,
      behavior: visiblePanelSteps > 1 ? "smooth" : "auto",
    });
  }, [cycle, isPanelVisible, visiblePanelSteps]);

  const typedQuestion = question.slice(0, typedLength);
  const isReadyToInject = typedLength === question.length && !isInjecting && !messageSent;

  return (
    <section id="extension" className="bg-[#FFFFFF] px-4 py-8 sm:px-5 md:px-12 md:py-12">
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

          @keyframes demo-fade-up {
            from {
              opacity: 0;
              transform: translateY(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes demo-panel-in {
            from {
              opacity: 0;
              transform: translateX(20px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes demo-dot {
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

          @keyframes demo-button-pulse {
            0%,
            100% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.02);
            }
          }

          .demo-cursor {
            animation: demo-cursor 1s steps(1, end) infinite;
          }

          .demo-response-in,
          .demo-step-in {
            animation: demo-fade-up 320ms cubic-bezier(0.4, 0, 0.2, 1) both;
          }

          .demo-panel-in {
            animation: demo-panel-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          .demo-stage-dot {
            animation: demo-dot 900ms cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .demo-stage-dot-2 {
            animation-delay: 120ms;
          }

          .demo-stage-dot-3 {
            animation-delay: 240ms;
          }

          .demo-stem-ready {
            animation: demo-button-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        }

        .demo-scroll {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
          scrollbar-gutter: stable;
        }

        .demo-scroll::-webkit-scrollbar {
          width: 10px;
        }

        .demo-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .demo-scroll::-webkit-scrollbar-thumb {
          border: 2px solid transparent;
          border-radius: 999px;
          background: linear-gradient(180deg, #d5dee8, #b8c6d8);
          background-clip: padding-box;
        }

        .demo-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #becadb, #9fb0c6);
          background-clip: padding-box;
        }

        .demo-scroll::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }

        .demo-scroll::-webkit-scrollbar-corner {
          background: transparent;
        }

        .demo-panel-shell {
          transition:
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 320ms cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 320ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (min-width: 1024px) {
          .demo-frame {
            height: min(760px, calc(100vh - 112px));
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 max-w-[860px] md:mb-10">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
            The extension
          </p>
          <h2 className="text-balance text-[24px] font-medium leading-tight tracking-[-0.5px] text-[#0F1117] sm:text-[34px] md:text-[38px]">
            Use ChatGPT the way you already do. stemLM adds the missing structure.
          </h2>
          <p className="mt-4 max-w-[760px] text-[16px] leading-[1.8] text-[#64748B]">
            Type the question normally, tap the stemLM button beside send, and let the
            extension reshape the returned answer into a framework-matched study view
            with equations, circuit diagrams, and timing analysis.
          </p>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-[#FCFDFE] shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:rounded-[30px]">
          <div className="flex flex-wrap items-center gap-3 border-b border-[#E2E8F0] bg-[#F8F9FC] px-3 py-3 sm:h-12 sm:flex-nowrap sm:px-4 sm:py-0">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E2E8F0]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#94A3B8]" />
            </div>

            <div className="min-w-0 flex-1 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-1.5 text-xs text-[#64748B]">
              <span className="block truncate">ChatGPT tab active</span>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1 text-[11px] text-[#64748B] md:inline-flex">
              <span className={`h-2 w-2 rounded-full ${messageSent ? "bg-[#22C55E]" : "bg-[#0EA5A0]"}`} />
              <span>
                {replayCountdown !== null
                  ? `Next replay in ${replayCountdown}s`
                  : messageSent
                    ? "stemLM is structuring the answer"
                    : "stemLM button is ready"}
              </span>
            </div>
          </div>

          <div className="demo-frame relative flex flex-col lg:block">
            <div
              className={`order-2 flex min-h-[440px] flex-col bg-[#FBFCFE] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-h-[560px] lg:h-full lg:min-h-0 ${
                isPanelVisible
                  ? "lg:w-[calc(100%-460px)] lg:border-r lg:border-[#E2E8F0]"
                  : "lg:w-full"
              }`}
            >
              <div className="border-b border-[#E2E8F0] bg-[#FFFFFF]/80 px-3 py-3 sm:px-4 sm:py-3.5 md:px-5">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[1px] text-[#94A3B8]">
                      Live flow
                    </p>
                    <h3 className="mt-1 text-lg font-medium text-[#0F1117]">
                      Student asks in ChatGPT. stemLM handles the method.
                    </h3>
                  </div>

                  <span className="rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1 text-xs text-[#64748B]">
                    Digital electronics
                  </span>
                </div>
              </div>

              <div className="demo-scroll flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4 md:space-y-4 md:px-5">
                <div className="mx-auto hidden w-full max-w-[760px] rounded-[20px] border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-3.5 text-sm leading-[1.65] text-[#64748B] sm:block sm:px-5">
                  <p className="text-xs font-medium uppercase tracking-[1px] text-[#0EA5A0]">
                    What stemLM changes
                  </p>
                  <p className="mt-2">
                    Nothing about the way the student asks the question. stemLM only
                    injects the right framework before send, then restructures the
                    answer into something you can actually revise from.
                  </p>
                </div>

                {messageSent ? (
                  <div className="mx-auto ml-auto w-full max-w-[760px] rounded-[22px] border border-[#DDE6EF] bg-[#FFFFFF] px-4 py-3.5 text-[14px] leading-[1.75] text-[#0F1117] shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-5 sm:py-4 sm:text-[15px]">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[1px] text-[#94A3B8]">
                      You
                    </p>
                    <p className="whitespace-pre-wrap">{question}</p>
                  </div>
                ) : null}

                {visibleResponseSections > 0 ? (
                  <div className="mx-auto w-full max-w-[760px] rounded-[22px] border border-[#DDE6EF] bg-[#FFFFFF] px-4 py-3.5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-5 sm:py-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9] text-[11px] font-medium text-[#0F1117]">
                        AI
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#0F1117]">
                          Answer returned from ChatGPT
                        </p>
                        <p className="text-xs text-[#64748B]">
                          {visibleResponseSections < responseSections.length ? (
                            <span className="inline-flex items-center">
                              <span>Responding with stemLM instructions attached</span>
                              <StageDots />
                            </span>
                          ) : (
                            "Answer completed with a hidden framework key for extraction"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {responseSections.slice(0, visibleResponseSections).map((section) => (
                        <div
                          key={`${cycle}-${section.title}`}
                          className="demo-response-in rounded-[18px] border border-[#E2E8F0] bg-[#F8F9FC] px-4 py-3"
                        >
                          <p className="text-xs font-medium uppercase tracking-[1px] text-[#94A3B8]">
                            {section.title}
                          </p>
                          <p
                            className={`mt-2 whitespace-pre-wrap text-[13px] leading-[1.7] ${
                              "mono" in section ? "font-mono text-[#0F1117]" : "text-[#475569]"
                            }`}
                          >
                            {section.body}
                          </p>
                        </div>
                      ))}
                    </div>

                    {visibleResponseSections === responseSections.length ? (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0EA5A015] px-3 py-2 text-xs font-medium text-[#0EA5A0]">
                        <PanelRightOpen aria-hidden="true" size={14} strokeWidth={1.6} />
                        <span>stemLM detects the returned key and opens the side panel.</span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="border-t border-[#E2E8F0] bg-[#FFFFFF] p-3 sm:p-4 md:p-4">
                <div className="mx-auto w-full max-w-[760px]">
                  {!messageSent ? (
                    <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#64748B]">
                      {isInjecting ? (
                        <LoaderCircle aria-hidden="true" size={14} strokeWidth={1.7} className="animate-spin text-[#0EA5A0]" />
                      ) : (
                        <Sparkles aria-hidden="true" size={14} strokeWidth={1.7} className="text-[#0EA5A0]" />
                      )}
                      <span>
                        {isInjecting
                          ? "stemLM is attaching the framework prompt"
                          : isReadyToInject
                            ? "Click stemLM before you send"
                            : "Type in ChatGPT exactly like you normally would"}
                      </span>
                      {isInjecting ? <StageDots /> : null}
                    </div>
                  ) : (
                    <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#64748B]">
                      <PanelRightOpen aria-hidden="true" size={14} strokeWidth={1.7} className="text-[#0EA5A0]" />
                      <span>stemLM is reading the streamed answer and opening the side panel.</span>
                      {visiblePanelSteps < panelSteps.length ? <StageDots /> : null}
                    </div>
                  )}

                  <div className="rounded-[22px] border border-[#E2E8F0] bg-[#FFFFFF] p-2.5">
                    <div className="min-h-[84px] rounded-[18px] bg-[#F8F9FC] px-4 py-3.5 text-[14px] leading-[1.75] text-[#0F1117] sm:min-h-[96px] sm:text-[15px]">
                      {messageSent ? (
                        <span className="text-[#94A3B8]">Ask another question...</span>
                      ) : (
                        <>
                          <span className="whitespace-pre-wrap">{typedQuestion}</span>
                          <span className="demo-cursor ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-1 bg-[#0EA5A0]" />
                        </>
                      )}
                    </div>

                    <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-xs text-[#64748B]">Enter to send</span>

                      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start">
                        {!messageSent ? (
                          <button
                            type="button"
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-[#F0F0F2] ${
                              isInjecting
                                ? "bg-[#0EA5A0]"
                                : isReadyToInject
                                  ? "demo-stem-ready bg-[#0EA5A0]"
                                  : "bg-[#0F1117]"
                            }`}
                          >
                            {isInjecting ? (
                              <LoaderCircle aria-hidden="true" size={14} strokeWidth={1.7} className="animate-spin" />
                            ) : (
                              <Sparkles aria-hidden="true" size={14} strokeWidth={1.7} />
                            )}
                            <span>{isInjecting ? "Injecting" : "stemLM"}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-[#0EA5A0] bg-[#0EA5A015] px-3 py-2 text-xs font-medium text-[#0EA5A0]"
                          >
                            <Check aria-hidden="true" size={14} strokeWidth={1.7} />
                            <span>Attached</span>
                          </button>
                        )}

                        <button
                          type="button"
                          aria-label="Send message"
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            messageSent
                              ? "border border-[#E2E8F0] bg-[#FFFFFF] text-[#94A3B8]"
                              : "bg-[#0F1117] text-[#F0F0F2]"
                          }`}
                        >
                          <SendHorizontal aria-hidden="true" size={16} strokeWidth={1.7} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>

            <div
              className={`${
                isPanelVisible ? "flex" : "hidden lg:flex"
              } order-1 min-h-[420px] flex-col border-t border-[#E2E8F0] bg-[#F4F8FB] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-h-[560px] lg:absolute lg:right-0 lg:top-0 lg:h-full lg:min-h-0 lg:w-[460px] lg:border-l lg:border-t-0 lg:border-[#E2E8F0] ${
                isPanelVisible
                  ? "lg:translate-x-0 lg:opacity-100"
                  : "lg:pointer-events-none lg:translate-x-[108%] lg:opacity-0"
              }`}
            >
              <div
                className={`demo-panel-shell m-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[24px] border bg-[#F9FBFD] sm:m-2.5 ${
                  isPanelVisible
                    ? "demo-panel-in translate-x-0 translate-y-0 scale-100 border-[#DCE5EE] shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
                    : "translate-x-4 translate-y-2 scale-[0.985] border-[#E7EEF5] shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
                }`}
              >
                <div className="h-1 w-full bg-[#0EA5A0]" />
                <div className="flex h-12 items-center justify-between border-b border-[#E2E8F0] bg-[#FFFFFF] px-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0EA5A015] text-[#0EA5A0]">
                      <Sparkles aria-hidden="true" size={14} strokeWidth={1.7} />
                    </span>
                    <span className="font-wordmark text-sm font-medium">
                      <span className="text-[#0F1117]">stem</span>
                      <span className="text-[#0EA5A0]">LM</span>
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[1px] text-[#94A3B8]">
                    Side panel
                  </span>
                </div>

                <div className="border-b border-[#E2E8F0] px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-sm bg-[#0EA5A015] px-2 py-1 text-[11px] font-medium text-[#0EA5A0]">
                      Framework matched
                    </span>
                    <span className="rounded-sm border border-[#DCE5EE] bg-[#FFFFFF] px-2 py-1 font-mono text-[11px] text-[#0F1117]">
                      {frameworkTag}
                    </span>
                  </div>
                </div>

                <div
                  ref={panelScrollRef}
                  className="demo-scroll min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3 sm:px-4 sm:py-4"
                >
                  {visiblePanelSteps === 0 ? (
                    <div className="rounded-[14px] border border-dashed border-[#DCE5EE] bg-[#FFFFFF] px-4 py-3 text-sm text-[#64748B]">
                      Listening for the returned framework key...
                    </div>
                  ) : null}

                  {panelSteps.slice(0, visiblePanelSteps).map((step, index) => (
                    <article
                      key={`${cycle}-${step}`}
                      className="demo-step-in rounded-[18px] border border-[#DCE5EE] bg-[#FFFFFF] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0EA5A015] text-[11px] font-medium text-[#0EA5A0]">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-[14px] font-medium text-[#0F1117]">
                            {step}
                          </h3>
                          <PanelStepContent index={index} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="border-t border-[#E2E8F0] bg-[#FFFFFF] px-4 py-2.5">
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[11px] text-[#94A3B8]">Powered by stemLM</span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-[#DCE5EE] bg-[#FFFFFF] px-3 py-2 text-[11px] text-[#64748B]"
                      >
                        <Copy aria-hidden="true" size={13} strokeWidth={1.6} />
                        <span className="hidden sm:inline">Copy</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-[#DCE5EE] bg-[#FFFFFF] px-3 py-2 text-[11px] text-[#64748B]"
                      >
                        <Download aria-hidden="true" size={13} strokeWidth={1.6} />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
          {[
            "Injected beside the ChatGPT send button",
            "Reads the streamed response and finds the STEM key",
            "Rebuilds the answer into steps, circuit, and delay analysis",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#64748B]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
