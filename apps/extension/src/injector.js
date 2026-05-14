/* global chrome */

(() => {
  const BUTTON_ID = "stemlm-inject-button";
  const TOAST_ID = "stemlm-toast";

  function detectPlatform(hostname) {
    if (hostname.includes("gemini.google.com")) return "gemini";
    if (hostname.includes("claude.ai")) return "claude";
    return "chatgpt";
  }

  function getComposerCandidates() {
    return [
      ...document.querySelectorAll("textarea"),
      ...document.querySelectorAll('[contenteditable="true"]')
    ];
  }

  function findComposer() {
    const candidates = getComposerCandidates()
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 120 && rect.height > 20;
      })
      .sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom);

    return candidates[0] ?? null;
  }

  async function getPromptTemplate() {
    const url = chrome.runtime.getURL("src/prompt-template.txt");
    const response = await fetch(url);
    return response.text();
  }

  function setNativeValue(element, value) {
    const prototype = Object.getPrototypeOf(element);
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

    if (descriptor?.set) {
      descriptor.set.call(element, value);
    } else {
      element.value = value;
    }

    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  async function injectPrompt() {
    const composer = findComposer();

    if (!composer) {
      return {
        ok: false,
        message: "stemLM could not find the current chat input."
      };
    }

    const prompt = await getPromptTemplate();
    const separator = "\n\n---\n\n";

    if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
      const currentValue = composer.value.trim();
      setNativeValue(composer, `${prompt}${separator}${currentValue}`);
      composer.focus();
      return { ok: true };
    }

    const currentText = composer.textContent?.trim() ?? "";
    composer.textContent = `${prompt}${separator}${currentText}`;
    composer.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText" }));
    composer.focus();

    return { ok: true };
  }

  function injectStyles() {
    if (document.getElementById("stemlm-extension-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "stemlm-extension-styles";
    style.textContent = `
      #${BUTTON_ID} {
        position: fixed;
        right: 20px;
        bottom: 92px;
        z-index: 2147483647;
        border: 0;
        border-radius: 999px;
        background: #0EA5A0;
        color: #F8FAFC;
        box-shadow: 0 14px 34px rgba(14, 165, 160, 0.24);
        cursor: pointer;
        font: 600 13px/1.2 Inter, system-ui, sans-serif;
        padding: 11px 14px;
      }

      #${BUTTON_ID}:hover {
        background: #0D9490;
      }

      #${TOAST_ID} {
        position: fixed;
        right: 20px;
        bottom: 146px;
        z-index: 2147483647;
        max-width: 280px;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        background: #FFFFFF;
        color: #0F1117;
        box-shadow: 0 14px 34px rgba(15, 23, 42, 0.12);
        font: 500 13px/1.5 Inter, system-ui, sans-serif;
        padding: 10px 12px;
      }
    `;

    document.documentElement.appendChild(style);
  }

  function showToast(message) {
    document.getElementById(TOAST_ID)?.remove();

    const toast = document.createElement("div");
    toast.id = TOAST_ID;
    toast.textContent = message;
    document.documentElement.appendChild(toast);

    window.setTimeout(() => toast.remove(), 2600);
  }

  function installButton({ platform, onActivate }) {
    injectStyles();

    if (document.getElementById(BUTTON_ID)) {
      return;
    }

    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.type = "button";
    button.textContent = "stemLM";
    button.title = `Inject stemLM framework for ${platform}`;
    button.addEventListener("click", () => {
      onActivate().catch(() => {
        showToast("stemLM could not inject the framework prompt.");
      });
    });

    document.documentElement.appendChild(button);
  }

  window.stemLMInjector = {
    detectPlatform,
    injectPrompt,
    installButton,
    showToast
  };
})();
