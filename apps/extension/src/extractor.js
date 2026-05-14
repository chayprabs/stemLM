(() => {
  const seenKeys = new Set();

  function scanForKey() {
    const text = [
      document.body?.innerText ?? "",
      document.documentElement?.innerHTML ?? ""
    ].join("\n");

    return window.stemLMKeyParser.extractKey(text);
  }

  function observeForKey(onKeyFound) {
    const existingKey = scanForKey();

    if (existingKey && !seenKeys.has(existingKey)) {
      seenKeys.add(existingKey);
      onKeyFound(existingKey);
    }

    const observer = new MutationObserver(() => {
      const key = scanForKey();

      if (!key || seenKeys.has(key)) {
        return;
      }

      seenKeys.add(key);
      onKeyFound(key);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }

  window.stemLMExtractor = {
    observeForKey
  };
})();
