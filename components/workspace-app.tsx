"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { startTransition, useEffect, useState } from "react";
import Reveal from "@/components/reveal";
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

type WorkspaceDraft = {
  question: string;
  goal: string;
  scenarioId: string;
  generatedQuestion: string;
  generatedAt: string | null;
  activeStepId: string;
  reviewedStepIds: string[];
};

const storageKey = "stemlm-workspace-sessions";
const draftKey = "stemlm-workspace-draft";
const defaultScenario = demoScenarios[0];
const defaultGoal = "Understand the method";

function getValidReviewedSteps(scenarioId: string, stepIds: string[]) {
  const scenario = findScenarioById(scenarioId);

  return stepIds.filter((stepId) => scenario.steps.some((step) => step.id === stepId));
}

function normalizeSavedSession(value: unknown): SavedSession | null {
  if (!value || typeof value !== "object") {
    return null;
  }

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
    ? getValidReviewedSteps(
        scenario.id,
        session.reviewedSteps.filter((stepId): stepId is string => typeof stepId === "string"),
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
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [activeStepId, setActiveStepId] = useState(defaultScenario.steps[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [reviewedStepIds, setReviewedStepIds] = useState<string[]>([]);
  const [revealedCheckIndexes, setRevealedCheckIndexes] = useState<number[]>([]);
  const [draftReady, setDraftReady] = useState(false);

  const activeScenario = findScenarioById(activeScenarioId);
  const activeStep =
    activeScenario.steps.find((step) => step.id === activeStepId) ?? activeScenario.steps[0];
  const activeStepIndex = activeScenario.steps.findIndex((step) => step.id === activeStep.id);
  const reviewedCount = activeScenario.steps.filter((step) =>
    reviewedStepIds.includes(step.id),
  ).length;
  const progressPercent = Math.round((reviewedCount / activeScenario.steps.length) * 100);
  const activeStepReviewed = reviewedStepIds.includes(activeStep.id);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        return;
      }

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
    try {
      const raw = window.localStorage.getItem(draftKey);

      if (!raw) {
        setGeneratedAt(new Date().toLocaleString());
        setDraftReady(true);
        return;
      }

      const parsed = JSON.parse(raw) as Partial<WorkspaceDraft>;
      const scenario = findScenarioById(
        typeof parsed.scenarioId === "string" ? parsed.scenarioId : defaultScenario.id,
      );
      const nextQuestion =
        typeof parsed.question === "string" && parsed.question.trim()
          ? parsed.question
          : scenario.defaultQuestion;
      const nextGoal =
        typeof parsed.goal === "string" && parsed.goal.trim() ? parsed.goal : defaultGoal;
      const nextGeneratedQuestion =
        typeof parsed.generatedQuestion === "string" && parsed.generatedQuestion.trim()
          ? parsed.generatedQuestion
          : nextQuestion;
      const nextActiveStepId =
        typeof parsed.activeStepId === "string" &&
        scenario.steps.some((step) => step.id === parsed.activeStepId)
          ? parsed.activeStepId
          : scenario.steps[0].id;
      const nextReviewedStepIds = Array.isArray(parsed.reviewedStepIds)
        ? getValidReviewedSteps(
            scenario.id,
            parsed.reviewedStepIds.filter((stepId): stepId is string => typeof stepId === "string"),
          )
        : [];

      setQuestion(nextQuestion);
      setGoal(nextGoal);
      setActiveScenarioId(scenario.id);
      setGeneratedQuestion(nextGeneratedQuestion);
      setGeneratedAt(
        typeof parsed.generatedAt === "string" && parsed.generatedAt
          ? parsed.generatedAt
          : new Date().toLocaleString(),
      );
      setActiveStepId(nextActiveStepId);
      setReviewedStepIds(nextReviewedStepIds);
      setDraftReady(true);
    } catch {
      setGeneratedAt(new Date().toLocaleString());
      setDraftReady(true);
    }
  }, []);

  useEffect(() => {
    if (!draftReady) {
      return;
    }

    try {
      const draft: WorkspaceDraft = {
        question,
        goal,
        scenarioId: activeScenario.id,
        generatedQuestion,
        generatedAt,
        activeStepId,
        reviewedStepIds,
      };

      window.localStorage.setItem(draftKey, JSON.stringify(draft));
    } catch {
      // Ignore localStorage write issues so the demo keeps working.
    }
  }, [
    activeScenario.id,
    activeStepId,
    draftReady,
    generatedAt,
    generatedQuestion,
    goal,
    question,
    reviewedStepIds,
  ]);

  useEffect(() => {
    document.body.style.overflow = waitlistOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [waitlistOpen]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => setFeedback(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  function applyScenario(
    nextScenarioId: string,
    nextQuestion: string,
    options?: {
      goal?: string;
      reviewedSteps?: string[];
      activeStepId?: string;
      generatedAt?: string | null;
    },
  ) {
    const scenario = findScenarioById(nextScenarioId);
    const nextReviewedSteps = getValidReviewedSteps(scenario.id, options?.reviewedSteps ?? []);
    const nextActiveStepId =
      options?.activeStepId && scenario.steps.some((step) => step.id === options.activeStepId)
        ? options.activeStepId
        : scenario.steps[0].id;

    startTransition(() => {
      setActiveScenarioId(scenario.id);
      setGeneratedQuestion(nextQuestion);
      setGeneratedAt(options?.generatedAt ?? new Date().toLocaleString());
      setActiveStepId(nextActiveStepId);
      setGoal(options?.goal ?? goal);
      setReviewedStepIds(nextReviewedSteps);
      setRevealedCheckIndexes([]);
    });
  }

  function handlePreset(scenarioId: string) {
    const scenario = findScenarioById(scenarioId);
    setQuestion(scenario.defaultQuestion);
    applyScenario(scenario.id, scenario.defaultQuestion, { goal });
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
      applyScenario(scenario.id, trimmed, { goal });
      setIsGenerating(false);
      setFeedback(`Loaded ${scenario.outputLabel.toLowerCase()}.`);
    }, 650);
  }

  function persistSavedSessions(nextSessions: SavedSession[]) {
    setSavedSessions(nextSessions);

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextSessions));
    } catch {
      // Ignore localStorage write issues so the rest of the UI still works.
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
    applyScenario(session.scenarioId, session.question, {
      goal: session.goal,
      reviewedSteps: session.reviewedSteps,
      activeStepId: session.activeStepId,
      generatedAt: new Date(session.savedAt).toLocaleString(),
    });
    setFeedback("Saved session loaded.");
  }

  function removeSession(sessionId: string) {
    const nextSessions = savedSessions.filter((session) => session.id !== sessionId);
    persistSavedSessions(nextSessions);
    setFeedback("Saved session removed.");
  }

  function clearSessions() {
    persistSavedSessions([]);

    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Ignore localStorage removal issues.
    }

    setFeedback("Saved sessions cleared.");
  }

  function buildOutlineLines() {
    return [
      "stemLM Study Export",
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

  async function copyOutline() {
    try {
      await navigator.clipboard.writeText(buildOutlineLines().join("\n"));
      setFeedback("Outline copied.");
    } catch {
      setFeedback("Clipboard access was not available.");
    }
  }

  async function copyPrompt(prompt: string, successMessage = "Prompt copied.") {
    try {
      await navigator.clipboard.writeText(prompt);
      setFeedback(successMessage);
    } catch {
      setFeedback("Clipboard access was not available.");
    }
  }

  async function copyFollowUpPrompt() {
    await copyPrompt(
      `Explain the step "${activeStep.title}" for the question "${generatedQuestion}" like a patient STEM tutor. Focus on this goal: ${goal}.`,
      "Follow-up prompt copied.",
    );
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

    if (!nextStep) {
      return;
    }

    setActiveStepId(nextStep.id);
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
      <main className="workspace-page">
        <header className="workspace-header">
          <div className="container workspace-header-row">
            <div>
              <Link href="/" className="logo">
                <span className="logo-dot" />
                <span>stemLM</span>
              </Link>
              <p className="workspace-subtitle">Interactive study workspace demo</p>
            </div>

            <div className="workspace-header-actions">
              <Link href="/" className="btn-secondary">
                Back to landing page
              </Link>
              <button className="btn-primary" onClick={() => setWaitlistOpen(true)}>
                Join waitlist
              </button>
            </div>
          </div>
        </header>

        <section className="workspace-hero">
          <div className="container">
            <Reveal>
              <div className="workspace-intro">
                <div>
                  <div className="section-label">LIVE DEMO</div>
                  <h1 className="workspace-title">A study workspace that feels like a real product</h1>
                  <p className="workspace-lead">
                    Match a STEM question to the right framework, move through the solution step by
                    step, review key pitfalls, and save the session for later revision.
                  </p>
                </div>

                <div className="workspace-kpis">
                  <div className="workspace-kpi">
                    <span>Topic key</span>
                    <strong>{activeScenario.topicKey}</strong>
                  </div>
                  <div className="workspace-kpi">
                    <span>Difficulty</span>
                    <strong>{activeScenario.difficulty}</strong>
                  </div>
                  <div className="workspace-kpi">
                    <span>Progress</span>
                    <strong>{reviewedCount}/{activeScenario.steps.length} reviewed</strong>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="workspace-main">
          <div className="container">
            <div className="workspace-shell">
              <aside className="workspace-panel">
                <div className="panel-card">
                  <h2>Question input</h2>
                  <p>
                    The matcher picks between circuits, optics, and mechanics based on your prompt.
                  </p>

                  <div className="preset-list">
                    {demoScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        className={`preset-chip ${activeScenario.id === scenario.id ? "active" : ""}`}
                        onClick={() => handlePreset(scenario.id)}
                        type="button"
                      >
                        {scenario.label}
                      </button>
                    ))}
                  </div>

                  <form className="workspace-form" onSubmit={handleGenerate}>
                    <label className="field">
                      <span>Question</span>
                      <textarea
                        rows={7}
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        placeholder="Paste a STEM question here"
                      />
                    </label>

                    <label className="field">
                      <span>Study goal</span>
                      <select value={goal} onChange={(event) => setGoal(event.target.value)}>
                        <option>Understand the method</option>
                        <option>Check my final answer</option>
                        <option>Prepare for revision</option>
                      </select>
                    </label>

                    <div className="workspace-form-actions">
                      <button className="btn-primary" type="submit" disabled={isGenerating}>
                        {isGenerating ? "Generating..." : "Generate guided solution"}
                      </button>
                      <button className="btn-secondary" type="button" onClick={saveSession}>
                        Save session
                      </button>
                    </div>
                  </form>
                </div>

                <div className="panel-card">
                  <div className="panel-card-header">
                    <div>
                      <h2>Saved sessions</h2>
                      <small>Stored locally in this browser</small>
                    </div>
                    {savedSessions.length > 0 ? (
                      <button className="text-action" type="button" onClick={clearSessions}>
                        Clear all
                      </button>
                    ) : null}
                  </div>

                  {savedSessions.length === 0 ? (
                    <p className="empty-state">No saved sessions yet. Save one after generating.</p>
                  ) : (
                    <div className="saved-session-list">
                      {savedSessions.map((session) => (
                        <div key={session.id} className="saved-session-card">
                          <div className="saved-session-top">
                            <strong>{findScenarioById(session.scenarioId).label}</strong>
                            <button
                              className="saved-session-remove"
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                removeSession(session.id);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                          <button
                            className="saved-session-load"
                            type="button"
                            onClick={() => loadSession(session)}
                          >
                            <span>{session.question}</span>
                            <small>
                              {session.goal} | {new Date(session.savedAt).toLocaleString()}
                            </small>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </aside>

              <section className="workspace-results">
                <div className="results-header">
                  <div>
                    <span className="results-eyebrow">CURRENT OUTPUT</span>
                    <h2>{activeScenario.outputLabel}</h2>
                    <p>{generatedQuestion}</p>
                  </div>

                  <div className="results-tags">
                    {activeScenario.tags.map((tag) => (
                      <span key={tag} className="results-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="results-toolbar">
                  <button className="btn-secondary" type="button" onClick={copyOutline}>
                    Copy outline
                  </button>
                  <button className="btn-secondary" type="button" onClick={exportOutline}>
                    Export outline
                  </button>
                  <button className="btn-secondary" type="button" onClick={copyFollowUpPrompt}>
                    Copy focus-step prompt
                  </button>
                </div>

                <div className="results-metrics">
                  <div className="results-metric">
                    <span>Domain</span>
                    <strong>{activeScenario.domain}</strong>
                  </div>
                  <div className="results-metric">
                    <span>Goal</span>
                    <strong>{goal}</strong>
                  </div>
                  <div className="results-metric">
                    <span>Generated</span>
                    <strong>{generatedAt ?? "Ready to generate"}</strong>
                  </div>
                  <div className="results-metric">
                    <span>Progress</span>
                    <strong>{progressPercent}% complete</strong>
                  </div>
                </div>

                <div className="workspace-insight-grid">
                  <div className="workspace-insight-card">
                    <span className="results-eyebrow">REVISION SUMMARY</span>
                    <h3>What to remember from this pattern</h3>
                    <p>{activeScenario.revisionSummary}</p>
                    <div className="focus-takeaway">Common pitfall: {activeScenario.commonMistake}</div>
                  </div>

                  <div className="workspace-toolkit-card">
                    <div className="panel-card-header">
                      <div>
                        <span className="results-eyebrow">PROMPT STUDIO</span>
                        <h3>Useful next prompts</h3>
                      </div>
                      <small>Copy into any AI</small>
                    </div>

                    <div className="toolkit-prompt-list">
                      {activeScenario.followUpPrompts.map((tool) => (
                        <button
                          key={tool.label}
                          className="toolkit-prompt-card"
                          type="button"
                          onClick={() => copyPrompt(tool.prompt, `${tool.label} prompt copied.`)}
                        >
                          <strong>{tool.label}</strong>
                          <span>{tool.prompt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="workspace-step-grid">
                  <div className="workspace-step-list">
                    {activeScenario.steps.map((step, index) => {
                      const reviewed = reviewedStepIds.includes(step.id);

                      return (
                        <button
                          key={step.id}
                          type="button"
                          className={`workspace-step-card ${activeStep.id === step.id ? "active" : ""}`}
                          onClick={() => setActiveStepId(step.id)}
                        >
                          <div className="workspace-step-top">
                            <div className="workspace-step-index">Step {index + 1}</div>
                            {reviewed ? <span className="workspace-step-status">Reviewed</span> : null}
                          </div>
                          <h3>{step.title}</h3>
                          <p>{step.explanation}</p>
                          <code>{step.formula}</code>
                        </button>
                      );
                    })}
                  </div>

                  <div className="workspace-focus-card">
                    <div className="workspace-diagram-frame">
                      <StepDiagram diagram={activeStep.diagram} />
                    </div>

                    <div className="workspace-focus-copy">
                      <span className="results-eyebrow">FOCUS STEP</span>
                      <h3>{activeStep.title}</h3>
                      <p>{activeStep.explanation}</p>
                      <div className="focus-formula">{activeStep.formula}</div>
                      <div className="focus-takeaway">{activeStep.takeaway}</div>
                    </div>

                    <div className="focus-step-nav">
                      <button
                        className="btn-secondary"
                        type="button"
                        onClick={() => jumpToStep(-1)}
                        disabled={activeStepIndex === 0}
                      >
                        Previous step
                      </button>
                      <button
                        className="btn-secondary"
                        type="button"
                        onClick={() => toggleReviewedStep()}
                        aria-pressed={activeStepReviewed}
                      >
                        {activeStepReviewed ? "Reviewed" : "Mark reviewed"}
                      </button>
                      <button
                        className="btn-secondary"
                        type="button"
                        onClick={() => jumpToStep(1)}
                        disabled={activeStepIndex === activeScenario.steps.length - 1}
                      >
                        Next step
                      </button>
                    </div>

                    <div className="focus-actions">
                      <button className="btn-secondary" type="button" onClick={copyFollowUpPrompt}>
                        Copy follow-up prompt
                      </button>
                      <button className="btn-primary" type="button" onClick={saveSession}>
                        Save this output
                      </button>
                    </div>
                  </div>
                </div>

                <section className="quick-checks-card">
                  <div className="panel-card-header">
                    <div>
                      <span className="results-eyebrow">SELF-CHECK</span>
                      <h3>Quick questions before you move on</h3>
                    </div>
                    <small>{revealedCheckIndexes.length} answers revealed</small>
                  </div>

                  <div className="quick-check-grid">
                    {activeScenario.quickChecks.map((check, index) => {
                      const revealed = revealedCheckIndexes.includes(index);

                      return (
                        <article key={check.prompt} className="quick-check-card">
                          <strong>Check {index + 1}</strong>
                          <p>{check.prompt}</p>
                          {revealed ? (
                            <div className="quick-check-answer">
                              <p>{check.answer}</p>
                              <small>{check.tip}</small>
                            </div>
                          ) : null}
                          <button
                            className="btn-secondary"
                            type="button"
                            onClick={() => toggleQuickCheck(index)}
                            aria-pressed={revealed}
                          >
                            {revealed ? "Hide answer" : "Reveal answer"}
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </section>

                {feedback ? <div className="workspace-feedback">{feedback}</div> : null}
              </section>
            </div>
          </div>
        </section>
      </main>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}

export default WorkspaceApp;
