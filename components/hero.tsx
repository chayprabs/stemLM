"use client"

interface HeroProps {
  onOpenModal: () => void
}

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-5 pb-12 pt-16 lg:grid-cols-[55fr_45fr] lg:px-12 lg:pb-[80px] lg:pt-[100px]">
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

      <div>
        <div className="mx-auto w-full max-w-[480px] rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-xl ring-1 ring-[#E2E8F0]">
          <div className="flex gap-3">
            <div className="flex-[6] rounded-[10px] bg-[#F8F9FC] p-4">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>

              <div className="mb-2 rounded-[8px] border border-[#E2E8F0] bg-white p-3 text-[12px] leading-[1.5] text-[#0F1117]">
                A particle is projected at 30&deg; with initial velocity 40 m/s. Find
                the horizontal range.
              </div>

              <div className="mb-3 rounded-[8px] border border-[#E2E8F0] border-l-2 border-l-[#0EA5A0] bg-white p-3 text-[12px] leading-[1.5] text-[#64748B]">
                Step 1: Resolve velocity components into horizontal and vertical...
              </div>

              <div className="flex items-center gap-2 rounded-[8px] border border-[#E2E8F0] bg-white p-2">
                <span className="flex-1 text-[11px] text-[#4A4A5A]">Ask anything...</span>
                <span className="rounded-[5px] bg-[#0EA5A0] px-2 py-1 text-[10px] font-medium text-white">
                  stemLM
                </span>
              </div>
            </div>

            <div className="flex-[4] rounded-[10px] bg-[#141418] p-4">
              <div className="mb-2 text-[9px] font-medium uppercase tracking-widest text-[#0EA5A0]">
                stemLM
              </div>

              <div className="mb-3 inline-block rounded-[4px] bg-[#0EA5A015] px-2 py-0.5 font-mono text-[9px] text-[#0EA5A0]">
                STEM-PHY-03-07-02
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[#0EA5A015] text-[9px] font-medium text-[#0EA5A0]">
                    1
                  </div>
                  <div>
                    <div className="text-[11px] font-medium leading-tight text-[#F0F0F2]">
                      Resolve components
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-[#8A8A9A]">
                      u<sub>x</sub> = 40cos30&deg;
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[#0EA5A015] text-[9px] font-medium text-[#0EA5A0]">
                    2
                  </div>
                  <div>
                    <div className="text-[11px] font-medium leading-tight text-[#F0F0F2]">
                      Time of flight
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-[#8A8A9A]">
                      T = 2u<sub>y</sub>/g
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[#0EA5A015] text-[9px] font-medium text-[#0EA5A0]">
                    3
                  </div>
                  <div>
                    <div className="text-[11px] font-medium leading-tight text-[#F0F0F2]">
                      Apply formula
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-[#8A8A9A]">
                      R = u<sup>2</sup>sin2&theta;/g
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[#0EA5A015] text-[9px] font-medium text-[#0EA5A0]">
                    4
                  </div>
                  <div>
                    <div className="text-[11px] font-medium leading-tight text-[#F0F0F2]">
                      Substitute
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-[#8A8A9A]">
                      R = 141.4 m <span className="text-[#22C55E]">&#10003;</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2 border-t border-[#1E1E24] pt-3">
                <button
                  type="button"
                  className="text-[10px] text-[#8A8A9A] transition-colors hover:text-[#F0F0F2]"
                >
                  &darr; Download
                </button>
                <button
                  type="button"
                  className="text-[10px] text-[#8A8A9A] transition-colors hover:text-[#F0F0F2]"
                >
                  &#9112; Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
