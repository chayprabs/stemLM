# stemLM Browser Extension

This is the starter Manifest V3 browser extension for stemLM. It is intentionally dependency-free for now, so it can be loaded directly in Chrome without a build step.

## Load Locally

1. Open `chrome://extensions`.
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select this folder: `apps/extension`.
5. Open ChatGPT, Gemini, or Claude and look for the floating `stemLM` button.

## Current Scaffold

- `manifest.json` defines permissions, supported chatbot hosts, content scripts, background service worker, and side panel.
- `src/content.js` wires the page integration together.
- `src/injector.js` adds the stemLM button and injects the prompt into the current composer.
- `src/extractor.js` watches the page for `<!-- STEMLM_KEY: ... -->`.
- `src/background.js` opens the side panel and stores the latest detected session.
- `src/panel/` contains the side panel shell.

## Next Work

- Replace the generic composer selectors with platform-specific adapters.
- Replace the local prompt text with the production prompt template.
- Connect key detection to the website API: `/api/topic/[key]`.
- Add packaging and signing when the extension is ready for Chrome Web Store submission.
