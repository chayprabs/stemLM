/* global chrome */

const STORAGE_KEY = "stemlm.latestSession";
let currentSession = null;

function getElement(id) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing panel element: ${id}`);
  }

  return element;
}

function renderSession(session) {
  currentSession = session;
  getElement("detected-key").textContent = session?.key ?? "Waiting for STEMLM_KEY...";
  getElement("tab-title").textContent = session?.title || session?.url || "No active stemLM session yet.";
}

function downloadSession(session) {
  const html = window.stemLMFormatter.formatSessionAsHtml(session);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `${session?.key ?? "stemlm-session"}.html`;
  anchor.click();

  URL.revokeObjectURL(url);
}

chrome.storage.local.get(STORAGE_KEY, (result) => {
  const session = result[STORAGE_KEY] ?? null;
  renderSession(session);

  getElement("copy-key").addEventListener("click", () => {
    if (currentSession?.key) {
      navigator.clipboard.writeText(currentSession.key);
    }
  });

  getElement("download-session").addEventListener("click", () => {
    downloadSession(currentSession);
  });
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes[STORAGE_KEY]) {
    return;
  }

  renderSession(changes[STORAGE_KEY].newValue);
});
