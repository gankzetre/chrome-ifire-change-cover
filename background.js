const cardCover = "https://i.giphy.com/UtcBRO8cxulRzkrVLc.webp";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ cardCover });
  console.log(`card cover url: ${cardCover}`);
});
