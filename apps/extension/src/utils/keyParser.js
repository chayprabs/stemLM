(() => {
  const keyPattern = /(?:STEMLM_KEY:\s*)?(STEM-[A-Z]{2,4}-\d{2}-\d{2}-\d{2})/;

  function extractKey(text) {
    if (!text) {
      return null;
    }

    const match = text.match(keyPattern);
    return match?.[1] ?? null;
  }

  window.stemLMKeyParser = {
    extractKey,
    keyPattern
  };
})();
