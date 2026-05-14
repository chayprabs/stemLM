/* global chrome */

(() => {
  const platform = window.stemLMInjector.detectPlatform(location.hostname);

  window.stemLMInjector.installButton({
    platform,
    onActivate: async () => {
      const result = await window.stemLMInjector.injectPrompt();

      chrome.runtime.sendMessage({
        type: "STEMLM_OPEN_PANEL",
        platform,
        injected: result.ok
      });

      if (!result.ok) {
        window.stemLMInjector.showToast(result.message);
      }
    }
  });

  window.stemLMExtractor.observeForKey((key) => {
    chrome.runtime.sendMessage({
      type: "STEMLM_KEY_FOUND",
      key,
      platform
    });
  });
})();
