/* global chrome */

const STORAGE_KEY = "stemlm.latestSession";

chrome.runtime.onInstalled.addListener(() => {
  if (chrome.sidePanel?.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {
      // Older Chromium builds may not support this behavior yet.
    });
  }
});

async function openPanel(tabId) {
  if (!tabId || !chrome.sidePanel?.open) {
    return;
  }

  await chrome.sidePanel.open({ tabId });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const tabId = sender.tab?.id;

  if (message?.type === "STEMLM_OPEN_PANEL") {
    openPanel(tabId)
      .then(() => sendResponse({ ok: true }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }

  if (message?.type === "STEMLM_KEY_FOUND") {
    const session = {
      key: message.key,
      url: sender.tab?.url ?? "",
      title: sender.tab?.title ?? "",
      detectedAt: new Date().toISOString()
    };

    chrome.storage.local.set({ [STORAGE_KEY]: session }, () => {
      openPanel(tabId)
        .then(() => sendResponse({ ok: true, session }))
        .catch((error) => sendResponse({ ok: false, error: error.message }));
    });

    return true;
  }

  return false;
});
