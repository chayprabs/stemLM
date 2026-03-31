"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { WaitlistModal } from "@/components/waitlist-modal";
import { demoScenarios } from "@/lib/site-data";

export default function DatabasePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredScenarios = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return demoScenarios;
    }

    return demoScenarios.filter((scenario) => {
      const haystack = [
        scenario.label,
        scenario.domain,
        scenario.topicKey,
        scenario.defaultQuestion,
        scenario.outputLabel,
        scenario.difficulty,
        scenario.tags.join(" "),
        scenario.steps.map((step) => `${step.title} ${step.explanation}`).join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [query]);

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <Nav onOpenModal={() => setIsModalOpen(true)} />

      <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-5 md:px-12 md:py-16">
        <div className="max-w-[760px]">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[1px] text-[#0EA5A0]">
            Public database
          </p>
          <h1 className="text-balance text-[28px] font-medium leading-tight tracking-[-0.6px] text-[#0F1117] sm:text-[34px] md:text-[40px]">
            Browse framework-matched STEM topics.
          </h1>
          <p className="mt-4 max-w-[700px] text-[15px] leading-[1.8] text-[#64748B] sm:text-[16px]">
            A lightweight public view of the stemLM knowledge structure. Search topics,
            inspect the mapped framework key, and open the step-by-step method behind
            each sample scenario.
          </p>
        </div>

        <div className="mt-8 rounded-[22px] border border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-4">
          <label className="flex items-center gap-3 rounded-[18px] border border-[#E2E8F0] bg-[#FFFFFF] px-4 py-3">
            <Search aria-hidden="true" size={18} strokeWidth={1.6} className="text-[#94A3B8]" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by topic, key, tag, or question"
              className="w-full bg-transparent text-sm text-[#0F1117] placeholder:text-[#94A3B8] focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredScenarios.map((scenario) => (
            <details
              key={scenario.id}
              className="group rounded-[22px] border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#0EA5A015] px-3 py-1 text-[11px] font-medium text-[#0EA5A0]">
                    {scenario.domain}
                  </span>
                  <span className="rounded-full border border-[#E2E8F0] px-3 py-1 text-[11px] text-[#64748B]">
                    {scenario.difficulty}
                  </span>
                </div>

                <h2 className="mt-4 text-[20px] font-medium leading-[1.3] text-[#0F1117]">
                  {scenario.outputLabel}
                </h2>
                <p className="mt-2 text-sm leading-[1.7] text-[#64748B]">{scenario.label}</p>

                <div className="mt-4 rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-3 font-mono text-[11px] leading-[1.7] text-[#0EA5A0]">
                  {scenario.topicKey}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {scenario.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1 text-[11px] text-[#64748B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </summary>

              <div className="mt-5 border-t border-[#EEF2F6] pt-5">
                <p className="text-xs font-medium uppercase tracking-[1px] text-[#94A3B8]">
                  Sample question
                </p>
                <p className="mt-2 text-sm leading-[1.8] text-[#334155]">
                  {scenario.defaultQuestion}
                </p>

                <div className="mt-5 space-y-3">
                  {scenario.steps.map((step, index) => (
                    <article
                      key={step.id}
                      className="rounded-[18px] border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#0EA5A015] text-[11px] font-medium text-[#0EA5A0]">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[15px] font-medium text-[#0F1117]">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-[13px] leading-[1.7] text-[#64748B]">
                            {step.explanation}
                          </p>
                          <div className="mt-3 rounded-[12px] bg-[#FFFFFF] px-3 py-3 font-mono text-[11px] leading-[1.7] text-[#0EA5A0]">
                            {step.formula}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>

        {filteredScenarios.length === 0 ? (
          <div className="mt-8 rounded-[22px] border border-dashed border-[#D9E4EE] bg-[#F8FAFC] px-5 py-8 text-sm text-[#64748B]">
            No topics matched that search yet. Try terms like `circuit`, `lens`, `incline`,
            or paste part of a topic key.
          </div>
        ) : null}
      </section>

      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
