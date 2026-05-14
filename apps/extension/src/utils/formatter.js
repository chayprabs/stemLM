(() => {
  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatSessionAsHtml(session) {
    const key = escapeHtml(session?.key ?? "No key detected");
    const title = escapeHtml(session?.title ?? "stemLM session");
    const url = escapeHtml(session?.url ?? "");
    const detectedAt = escapeHtml(session?.detectedAt ?? "");

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${key}</title>
    <style>
      body { font: 15px/1.7 system-ui, sans-serif; margin: 32px; color: #0F1117; }
      code { color: #0EA5A0; }
    </style>
  </head>
  <body>
    <h1>stemLM study export</h1>
    <p><strong>Topic key:</strong> <code>${key}</code></p>
    <p><strong>Source:</strong> ${title}</p>
    <p><strong>URL:</strong> ${url}</p>
    <p><strong>Detected:</strong> ${detectedAt}</p>
  </body>
</html>`;
  }

  window.stemLMFormatter = {
    formatSessionAsHtml
  };
})();
