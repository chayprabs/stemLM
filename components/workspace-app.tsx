"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { startTransition, useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { StepDiagram } from "@/components/stem-diagrams";
import { WaitlistModal } from "@/components/waitlist-modal";
import { demoScenarios, findScenarioById, matchScenario } from "@/lib/site-data";

type SavedSession = {
  id: string;
  scenarioId: string;
  question: string;
  goal: string;
  savedAt: string;
};

const storageKey = "stemlm-workspace-sessions";
const defaultScenario = demoScenarios[0];

export function WorkspaceApp() {
  const [question, setQuestion] = useState(defaultScenario.defaultQuestion);
  const [goal, setGoal] = useState("Understand the method");
  const [activeScenarioId, setActiveScenarioId] = useState(defaultScenario.id);
  const [generatedQuestion, setGeneratedQuestion] = useState(defaultScenario.defaultQuestion);
  const [generatedAt, setGeneratedAt] = useState<string | null>(new Date().toLocaleString());
  const [activeStepId, setActiveStepId] = useState(defaultScenario.steps[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const activeScenario = findScenarioById(activeScenarioId);
  const activeStep =
    activeScenario.steps.find((step) => step.id === activeStepId) ?? activeScenario.steps[0];

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as SavedSession[];
      setSavedSessions(parsed);
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
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => setFeedback(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  function applyScenario(nextScenarioId: string, nextQuestion: string, nextGoal = goal) {
    const scenario = findScenarioById(nextScenarioId);

    startTransition(() => {
      setActiveScenarioId(scenario.id);
      setGeneratedQuestion(nextQuestion);
      setGeneratedAt(new Date().toLocaleString());
      setActiveStepId(scenario.steps[0].id);
      setGoal(nextGoal);
    });
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
      applyScenario(scenario.id, trimmed, goal);
      setIsGenerating(false);
      setFeedback(`Loaded ${scenario.outputLabel.toLowerCase()}.`);
    }, 650);
  }

  function saveSession() {
    const nextSession: SavedSession = {
      id: crypto.randomUUID(),
      scenarioId: activeScenario.id,
      question: generatedQuestion,
      goal,
      savedAt: new Date().toISOString(),
    };

    const nextSessions = [nextSession, ...savedSessions].slice(0, 6);
    setSavedSessions(nextSessions);
    window.localStorage.setItem(storageKey, JSON.stringify(nextSessions));
    setFeedback("Session saved in this browser.");
  }

  function loadSession(session: SavedSession) {
    setQuestion(session.question);
    applyScenario(session.scenarioId, session.question, session.goal);
    setFeedback("Saved session loaded.");
  }

  function exportOutline() {
    const lines = [
      "stemLM Study Export",
      "",
      `Question: ${generatedQuestion}`,
      `Goal: ${goal}`,
      `Scenario: ${activeScenario.label}`,
      `Topic key: ${activeScenario.topicKey}`,
      "",
      ...activeScenario.steps.flatMap((step, index) => [
        `${index + 1}. ${step.title}`,
        `Explanation: ${step.explanation}`,
        `Formula: ${step.formula}`,
        `Takeaway: ${step.takeaway}`,
        "",
      ]),
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${activeScenario.id}-study-outline.txt`;
    anchor.click();
    window.URL.revokeObjectURL(url);
    setFeedback("Outline exported.");
  }

  async function copyFollowUpPrompt() {
    const prompt = `Explain the step "${activeStep.title}" for the question "${generatedQuestion}" like a patient STEM tutor. Focus on this goal: ${goal}.`;

    try {
      await navigator.clipboard.writeText(prompt);
      setFeedback("Follow-up prompt copied.");
    } catch {
      setFeedback("Clipboard access was not available.");
    }
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
              <p className="workspace-subtitle">Functional Next.js study workspace</p>
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
                  <h1 className="workspace-title">A study workspace that actually does something</h1>
                  <p className="workspace-lead">
                    Type a STEM question, let the app match it to a topic framework, and review the
                    guided steps with diagrams, saving, and export tools.
                  </p>
                </div>

                <div className="workspace-kpis">
                  <div className="workspace-kpi">
                    <span>Topic key</span>
                    <strong>{activeScenario.topicKey}</strong>
                  </div>
                  <div className="workspace-kpi">
                    <span>Scenario</span>
                    <strong>{activeScenario.outputLabel}</strong>
                  </div>
                  <div className="workspace-kpi">
                    <span>Saved sessions</span>
                    <strong>{savedSessions.length}</strong>
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
                    <h2>Saved sessions</h2>
                    <button className="text-action" type="button" onClick={exportOutline}>
                      Export outline
                    </button>
                  </div>

                  {savedSessions.length === 0 ? (
                    <p className="empty-state">No saved sessions yet. Save one after generating.</p>
                  ) : (
                    <div className="saved-session-list">
                      {savedSessions.map((session) => (
                        <button
                          key={session.id}
                          className="saved-session-card"
                          type="button"
                          onClick={() => loadSession(session)}
                        >
                          <strong>{findScenarioById(session.scenarioId).label}</strong>
                          <span>{session.question}</span>
                          <small>{new Date(session.savedAt).toLocaleString()}</small>
                        </button>
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
                    <strong>{generatedAt ?? "Just now"}</strong>
                  </div>
                </div>

                <div className="workspace-step-grid">
                  <div className="workspace-step-list">
                    {activeScenario.steps.map((step, index) => (
                      <button
                        key={step.id}
                        type="button"
                        className={`workspace-step-card ${activeStep.id === step.id ? "active" : ""}`}
                        onClick={() => setActiveStepId(step.id)}
                      >
                        <div className="workspace-step-index">Step {index + 1}</div>
                        <h3>{step.title}</h3>
                        <p>{step.explanation}</p>
                        <code>{step.formula}</code>
                      </button>
                    ))}
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

                {feedback ? <div className="workspace-feedback">{feedback}</div> : null}
              </section>
            </div>
          </div>
        </section>
      </main>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
