"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Download, Trash2 } from "lucide-react";
import StepDiagram from "@/components/stem-diagrams";
import { WaitlistModal } from "@/components/waitlist-modal";
import { demoScenarios, findScenarioById, matchScenario } from "@/lib/site-data";

type SavedSession = {
  id: string;
  scenarioId: string;
  question: string;
  goal: string;
  savedAt: string;
  reviewedSteps: string[];
  activeStepId: string;
};

const storageKey = "stemlm-workspace-sessions";
const defaultScenario = demoScenarios[0];
const defaultGoal = "Understand the method";
const card = "rounded-lg border border-[#E2E8F0] bg-[#FFFFFF]";
const secondary =
  "inline-flex items-center justify-center gap-2 rounded-md border border-[#E2E8F0] px-4 py-3 text-sm font-medium text-[#64748B] transition-colors duration-150 hover:border-[#0EA5A0] hover:text-[#0F1117] disabled:opacity-60";
const primary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#0EA5A0] px-4 py-3 text-sm font-medium text-[#F0F0F2] transition-colors duration-150 hover:bg-[#0D9490] disabled:opacity-60";
const input =
  "w-full rounded-md border border-[#E2E8F0] bg-[#F8F9FC] px-4 py-3 text-sm text-[#0F1117] placeholder:text-[#4A4A5A] focus:border-[#0EA5A0] focus:outline-none focus:ring-[1.5px] focus:ring-[#0EA5A0]";

function normalizeSavedSession(value: unknown): SavedSession | null {
  if (!value || typeof value !== "object") return null;
  const session = value as Partial<SavedSession>;
  if (
    typeof session.id !== "string" ||
    typeof session.scenarioId !== "string" ||
    typeof session.question !== "string" ||
    typeof session.savedAt !== "string"
  ) {
    return null;
  }
  const scenario = findScenarioById(session.scenarioId);
  const reviewedSteps = Array.isArray(session.reviewedSteps)
    ? session.reviewedSteps.filter(
        (stepId): stepId is string =>
          typeof stepId === "string" && scenario.steps.some((step) => step.id === stepId),
      )
    : [];
  const activeStepId =
    typeof session.activeStepId === "string" &&
    scenario.steps.some((step) => step.id === session.activeStepId)
      ? session.activeStepId
      : scenario.steps[0].id;
  return {
    id: session.id,
    scenarioId: scenario.id,
    question: session.question,
    goal: typeof session.goal === "string" && session.goal.trim() ? session.goal : defaultGoal,
    savedAt: session.savedAt,
    reviewedSteps,
    activeStepId,
  };
}

function WorkspaceApp() {
  const [question, setQuestion] = useState(defaultScenario.defaultQuestion);
  const [goal, setGoal] = useState(defaultGoal);
  const [activeScenarioId, setActiveScenarioId] = useState(defaultScenario.id);
  const [generatedQuestion, setGeneratedQuestion] = useState(defaultScenario.defaultQuestion);
  const [generatedAt, setGeneratedAt] = useState<string | null>(new Date().toLocaleString());
  const [activeStepId, setActiveStepId] = useState(defaultScenario.steps[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [reviewedStepIds, setReviewedStepIds] = useState<string[]>([]);
  const [revealedCheckIndexes, setRevealedCheckIndexes] = useState<number[]>([]);

  const activeScenario = findScenarioById(activeScenarioId);
  const activeStep =
    activeScenario.steps.find((step) => step.id === activeStepId) ?? activeScenario.steps[0];
  const activeStepIndex = activeScenario.steps.findIndex((step) => step.id === activeStep.id);
  const reviewedCount = activeScenario.steps.filter((step) =>
    reviewedStepIds.includes(step.id),
  ).length;
  const progressPercent = Math.round((reviewedCount / activeScenario.steps.length) * 100);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return;
      setSavedSessions(
        parsed
          .map((session) => normalizeSavedSession(session))
          .filter((session): session is SavedSession => session !== null),
      );
    } catch {
      setSavedSessions([]);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = waitlistOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [waitlistOpen]);

  useEffect(() => {
    if (!feedback) return;
    const timeout = window.setTimeout(() => setFeedback(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  function applyScenario(nextScenarioId: string, nextQuestion: string, nextGoal = goal) {
    const scenario = findScenarioById(nextScenarioId);
    setActiveScenarioId(scenario.id);
    setGeneratedQuestion(nextQuestion);
    setGeneratedAt(new Date().toLocaleString());
    setActiveStepId(scenario.steps[0].id);
    setGoal(nextGoal);
    setReviewedStepIds([]);
    setRevealedCheckIndexes([]);
  }

  function handlePreset(scenarioId: string) {
    const scenario = findScenarioById(scenarioId);
    setQuestion(scenario.defaultQuestion);
    applyScenario(scenario.id, scenario.defaultQuestion);
  }

  function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) {
      setFeedback("Add a question first.");
      return;
    }
    setIsGenerating(true);
    const scenario = matchScenario(trimmed);
    window.setTimeout(() => {
      applyScenario(scenario.id, trimmed);
      setIsGenerating(false);
      setFeedback(`Loaded ${scenario.outputLabel.toLowerCase()}.`);
    }, 650);
  }

  function persistSavedSessions(nextSessions: SavedSession[]) {
    setSavedSessions(nextSessions);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextSessions));
    } catch {
      // Ignore localStorage issues in the demo.
    }
  }

  function saveSession() {
    const nextSession: SavedSession = {
      id: crypto.randomUUID(),
      scenarioId: activeScenario.id,
      question: generatedQuestion,
      goal,
      savedAt: new Date().toISOString(),
      reviewedSteps: reviewedStepIds,
      activeStepId: activeStep.id,
    };
    persistSavedSessions([nextSession, ...savedSessions].slice(0, 8));
    setFeedback("Session saved in this browser.");
  }

  function loadSession(session: SavedSession) {
    setQuestion(session.question);
    setActiveScenarioId(session.scenarioId);
    setGeneratedQuestion(session.question);
    setGeneratedAt(new Date(session.savedAt).toLocaleString());
    setGoal(session.goal);
    setReviewedStepIds(session.reviewedSteps);
    setActiveStepId(session.activeStepId);
    setRevealedCheckIndexes([]);
    setFeedback("Saved session loaded.");
  }

  function removeSession(sessionId: string) {
    persistSavedSessions(savedSessions.filter((session) => session.id !== sessionId));
    setFeedback("Saved session removed.");
  }

  function buildOutlineLines() {
    return [
      "stemLM study export",
      "",
      `Question: ${generatedQuestion}`,
      `Goal: ${goal}`,
      `Scenario: ${activeScenario.label}`,
      `Difficulty: ${activeScenario.difficulty}`,
      `Topic key: ${activeScenario.topicKey}`,
      `Reviewed steps: ${reviewedCount}/${activeScenario.steps.length}`,
      "",
      "Revision summary:",
      activeScenario.revisionSummary,
      "",
      "Common pitfall:",
      activeScenario.commonMistake,
      "",
      ...activeScenario.steps.flatMap((step, index) => [
        `${index + 1}. ${step.title}${reviewedStepIds.includes(step.id) ? " [reviewed]" : ""}`,
        `Explanation: ${step.explanation}`,
        `Formula: ${step.formula}`,
        `Takeaway: ${step.takeaway}`,
        "",
      ]),
    ];
  }

  async function copyText(value: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback(successMessage);
    } catch {
      setFeedback("Clipboard access was not available.");
    }
  }

  function exportOutline() {
    const blob = new Blob([buildOutlineLines().join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${activeScenario.id}-study-outline.txt`;
    anchor.click();
    window.URL.revokeObjectURL(url);
    setFeedback("Outline exported.");
  }

  function toggleReviewedStep(stepId = activeStep.id) {
    setReviewedStepIds((current) =>
      current.includes(stepId)
        ? current.filter((existingStepId) => existingStepId !== stepId)
        : [...current, stepId],
    );
  }

  function jumpToStep(offset: number) {
    const nextStep = activeScenario.steps[activeStepIndex + offset];
    if (nextStep) setActiveStepId(nextStep.id);
  }

  function toggleQuickCheck(index: number) {
    setRevealedCheckIndexes((current) =>
      current.includes(index)
        ? current.filter((existingIndex) => existingIndex !== index)
        : [...current, index],
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#F8F9FC]">
        <header className="border-b border-[#E2E8F0] bg-[#FFFFFF]">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-12">
            <div>
              <Link href="/" className="font-wordmark text-[18px] font-semibold tracking-[-0.3px] text-[#0F1117]">
                <span className="text-[#0F1117]">stem</span>
                <span className="text-[#0EA5A0]">LM</span>
              </Link>
              <p className="mt-1 text-sm text-[#64748B]">Interactive study workspace demo</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className={secondary}>
                <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
                <span>Back to landing page</span>
              </Link>
              <button type="button" className={primary} onClick={() => setWaitlistOpen(true)}>
                Join waitlist
              </button>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-12 md:py-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[1px] text-[#0EA5A0]">
            Live demo
          </p>
          <h1 className="mb-4 max-w-[720px] text-3xl font-medium leading-[1.15] tracking-[-0.5px] text-[#0F1117]">
            A workspace for guided STEM solutions, revision, and follow-up study
          </h1>
          <p className="max-w-[720px] text-base text-[#64748B]">
            Match a STEM question to the right framework, move through the solution
            step by step, review the common pitfalls, and save the session for later.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className={`${card} p-5`}>
              <p className="mb-2 text-xs font-medium text-[#64748B]">Topic key</p>
              <p className="font-mono text-sm text-[#0F1117]">{activeScenario.topicKey}</p>
            </div>
            <div className={`${card} p-5`}>
              <p className="mb-2 text-xs font-medium text-[#64748B]">Difficulty</p>
              <p className="text-sm text-[#0F1117]">{activeScenario.difficulty}</p>
            </div>
            <div className={`${card} p-5`}>
              <p className="mb-2 text-xs font-medium text-[#64748B]">Progress</p>
              <p className="text-sm text-[#0F1117]">
                {reviewedCount}/{activeScenario.steps.length} reviewed
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 pb-16 md:px-12 md:pb-20">
          <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <section className={`${card} p-6`}>
                <h2 className="mb-2 text-lg font-medium text-[#0F1117]">Question input</h2>
                <p className="mb-6 text-sm text-[#64748B]">
                  The matcher picks between circuits, optics, and mechanics based on
                  your prompt.
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {demoScenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => handlePreset(scenario.id)}
                      className={`rounded-sm border px-3 py-2 text-xs font-medium transition-colors duration-150 ${
                        activeScenario.id === scenario.id
                          ? "border-[#0EA5A0] bg-[#0EA5A015] text-[#0EA5A0]"
                          : "border-[#E2E8F0] text-[#64748B] hover:border-[#0EA5A0] hover:text-[#0F1117]"
                      }`}
                    >
                      {scenario.label}
                    </button>
                  ))}
                </div>
                <form className="space-y-4" onSubmit={handleGenerate}>
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-[#64748B]">Question</span>
                    <textarea
                      rows={7}
                      value={question}
                      onChange={(event) => setQuestion(event.target.value)}
                      placeholder="Paste a STEM question here"
                      className={input}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-[#64748B]">Study goal</span>
                    <select value={goal} onChange={(event) => setGoal(event.target.value)} className={input}>
                      <option>Understand the method</option>
                      <option>Check my final answer</option>
                      <option>Prepare for revision</option>
                    </select>
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button className={primary} type="submit" disabled={isGenerating}>
                      {isGenerating ? "Generating..." : "Generate guided solution"}
                    </button>
                    <button className={secondary} type="button" onClick={saveSession}>
                      Save session
                    </button>
                  </div>
                </form>
              </section>

              <section className={`${card} p-6`}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="mb-2 text-lg font-medium text-[#0F1117]">Saved sessions</h2>
                    <p className="text-xs text-[#64748B]">Stored locally in this browser</p>
                  </div>
                </div>
                {savedSessions.length === 0 ? (
                  <p className="text-sm text-[#64748B]">
                    No saved sessions yet. Save one after generating.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedSessions.map((session) => (
                      <div key={session.id} className="rounded-lg border border-[#E2E8F0] bg-[#F8F9FC] p-4">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <strong className="text-sm font-medium text-[#0F1117]">
                            {findScenarioById(session.scenarioId).label}
                          </strong>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-xs text-[#64748B] transition-colors duration-150 hover:text-[#EF4444]"
                            onClick={() => removeSession(session.id)}
                          >
                            <Trash2 aria-hidden="true" size={16} strokeWidth={1.5} />
                            <span>Remove</span>
                          </button>
                        </div>
                        <button type="button" className="w-full text-left" onClick={() => loadSession(session)}>
                          <p className="text-sm text-[#0F1117]">{session.question}</p>
                          <p className="mt-2 text-xs text-[#64748B]">
                            {session.goal} · {new Date(session.savedAt).toLocaleString()}
                          </p>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </aside>

            <section className="space-y-6">
              <div className={`${card} p-6`}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-medium text-[#64748B]">Current output</p>
                    <h2 className="mb-2 text-xl font-medium tracking-[-0.3px] text-[#0F1117]">
                      {activeScenario.outputLabel}
                    </h2>
                    <p className="text-sm text-[#64748B]">{generatedQuestion}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeScenario.tags.map((tag) => (
                      <span key={tag} className="rounded-sm border border-[#E2E8F0] bg-[#F8F9FC] px-3 py-2 text-xs text-[#64748B]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className={secondary} type="button" onClick={() => copyText(buildOutlineLines().join("\n"), "Outline copied.")}>
                  <Copy aria-hidden="true" size={16} strokeWidth={1.5} />
                  <span>Copy outline</span>
                </button>
                <button className={secondary} type="button" onClick={exportOutline}>
                  <Download aria-hidden="true" size={16} strokeWidth={1.5} />
                  <span>Export outline</span>
                </button>
                <button
                  className={secondary}
                  type="button"
                  onClick={() =>
                    copyText(
                      `Explain the step "${activeStep.title}" for the question "${generatedQuestion}" like a patient STEM tutor. Focus on this goal: ${goal}.`,
                      "Follow-up prompt copied.",
                    )
                  }
                >
                  <Copy aria-hidden="true" size={16} strokeWidth={1.5} />
                  <span>Copy focus-step prompt</span>
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className={`${card} p-5`}>
                  <p className="mb-2 text-xs font-medium text-[#64748B]">Domain</p>
                  <p className="text-sm text-[#0F1117]">{activeScenario.domain}</p>
                </div>
                <div className={`${card} p-5`}>
                  <p className="mb-2 text-xs font-medium text-[#64748B]">Goal</p>
                  <p className="text-sm text-[#0F1117]">{goal}</p>
                </div>
                <div className={`${card} p-5`}>
                  <p className="mb-2 text-xs font-medium text-[#64748B]">Generated</p>
                  <p className="text-sm text-[#0F1117]">{generatedAt ?? "Ready to generate"}</p>
                </div>
                <div className={`${card} p-5`}>
                  <p className="mb-2 text-xs font-medium text-[#64748B]">Progress</p>
                  <p className="text-sm text-[#0F1117]">{progressPercent}% complete</p>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <section className={`${card} p-6`}>
                  <p className="mb-2 text-xs font-medium text-[#64748B]">Revision summary</p>
                  <h3 className="mb-3 text-lg font-medium text-[#0F1117]">What to remember</h3>
                  <p className="text-sm text-[#64748B]">{activeScenario.revisionSummary}</p>
                  <div className="mt-4 rounded-md bg-[#F8F9FC] px-4 py-3 text-sm text-[#0F1117]">
                    Common pitfall: {activeScenario.commonMistake}
                  </div>
                </section>

                <section className={`${card} p-6`}>
                  <p className="mb-2 text-xs font-medium text-[#64748B]">Prompt studio</p>
                  <h3 className="mb-4 text-lg font-medium text-[#0F1117]">Useful next prompts</h3>
                  <div className="space-y-3">
                    {activeScenario.followUpPrompts.map((tool) => (
                      <button
                        key={tool.label}
                        type="button"
                        className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8F9FC] p-4 text-left transition-colors duration-150 hover:border-[#0EA5A0]"
                        onClick={() => copyText(tool.prompt, `${tool.label} prompt copied.`)}
                      >
                        <p className="text-sm font-medium text-[#0F1117]">{tool.label}</p>
                        <p className="mt-2 text-xs text-[#64748B]">{tool.prompt}</p>
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                <div className="space-y-3">
                  {activeScenario.steps.map((step, index) => {
                    const reviewed = reviewedStepIds.includes(step.id);
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setActiveStepId(step.id)}
                        className={`w-full rounded-lg border bg-[#FFFFFF] p-5 text-left transition-colors duration-150 ${
                          activeStep.id === step.id
                            ? "border-[#0EA5A0]"
                            : "border-[#E2E8F0] hover:border-[#0EA5A0]"
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div className="text-xs font-medium text-[#64748B]">Step {index + 1}</div>
                          {reviewed ? (
                            <span className="inline-flex items-center gap-2 rounded-sm bg-[#0EA5A015] px-2 py-1 text-xs font-medium text-[#0EA5A0]">
                              <Check aria-hidden="true" size={16} strokeWidth={1.5} />
                              <span>Reviewed</span>
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-[#0F1117]">{step.title}</h3>
                        <p className="text-sm text-[#64748B]">{step.explanation}</p>
                        <div className="mt-4 rounded-md bg-[#F8F9FC] px-4 py-3 font-mono text-xs text-[#0EA5A0]">
                          {step.formula}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className={`${card} p-6`}>
                  <div className="rounded-lg border border-[#E2E8F0] bg-[#F8F9FC] p-4">
                    <StepDiagram diagram={activeStep.diagram} />
                  </div>
                  <div className="mt-6">
                    <p className="mb-2 text-xs font-medium text-[#64748B]">Focus step</p>
                    <h3 className="mb-3 text-lg font-medium text-[#0F1117]">{activeStep.title}</h3>
                    <p className="text-sm text-[#64748B]">{activeStep.explanation}</p>
                    <div className="mt-4 rounded-md bg-[#F8F9FC] px-4 py-3 font-mono text-xs text-[#0EA5A0]">
                      {activeStep.formula}
                    </div>
                    <div className="mt-4 rounded-md bg-[#F8F9FC] px-4 py-3 text-sm text-[#0F1117]">
                      {activeStep.takeaway}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className={secondary} type="button" onClick={() => jumpToStep(-1)} disabled={activeStepIndex === 0}>
                      <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
                      <span>Previous step</span>
                    </button>
                    <button className={secondary} type="button" onClick={() => toggleReviewedStep()}>
                      <Check aria-hidden="true" size={16} strokeWidth={1.5} />
                      <span>{reviewedStepIds.includes(activeStep.id) ? "Reviewed" : "Mark reviewed"}</span>
                    </button>
                    <button className={secondary} type="button" onClick={() => jumpToStep(1)} disabled={activeStepIndex === activeScenario.steps.length - 1}>
                      <span>Next step</span>
                      <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>

              <section className={`${card} p-6`}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-medium text-[#64748B]">Self-check</p>
                    <h3 className="text-lg font-medium text-[#0F1117]">Quick questions before you move on</h3>
                  </div>
                  <p className="text-xs text-[#64748B]">{revealedCheckIndexes.length} answers revealed</p>
                </div>
                <div className="grid gap-4 xl:grid-cols-3">
                  {activeScenario.quickChecks.map((check, index) => {
                    const revealed = revealedCheckIndexes.includes(index);
                    return (
                      <article key={check.prompt} className="rounded-lg border border-[#E2E8F0] bg-[#F8F9FC] p-5">
                        <p className="mb-2 text-xs font-medium text-[#64748B]">Check {index + 1}</p>
                        <p className="text-sm text-[#0F1117]">{check.prompt}</p>
                        {revealed ? (
                          <div className="mt-4 space-y-2 border-t border-[#E2E8F0] pt-4">
                            <p className="text-sm text-[#64748B]">{check.answer}</p>
                            <p className="font-mono text-xs text-[#0EA5A0]">{check.tip}</p>
                          </div>
                        ) : null}
                        <button className={`${secondary} mt-4 w-full`} type="button" onClick={() => toggleQuickCheck(index)}>
                          {revealed ? "Hide answer" : "Reveal answer"}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </section>

              {feedback ? (
                <div className="rounded-lg border border-[#0EA5A0] bg-[#0EA5A015] px-4 py-3 text-sm text-[#0EA5A0]">
                  {feedback}
                </div>
              ) : null}
            </section>
          </div>
        </section>
      </main>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}

export default WorkspaceApp;
