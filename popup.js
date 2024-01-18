// Initialize button with users' preferred color
const changeCardCover = document.getElementById("changeCardCover");

chrome.storage.sync.get("cardCover", ({ cardCover }) => {
  changeCardCover.style.backgroundImage =
    "url('https://i.giphy.com/UtcBRO8cxulRzkrVLc.webp')";
  changeCardCover.style.backgroundRepeat = "no-repeat";
  changeCardCover.style.backgroundPosition = "center";
});

// When the button is clicked, inject setCardCover into current page
changeCardCover.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setCardCover,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setCardCover() {
  chrome.storage.sync.get("cardCover", ({ cardCover }) => {
    const cards = document.querySelectorAll(".Card_wrapper__r1iDw");

    cards.forEach((card) => {
      card.style.backgroundImage =
        "url('https://i.giphy.com/UtcBRO8cxulRzkrVLc.webp')";
      card.style.backgroundRepeat = "no-repeat";
      card.style.backgroundPosition = "center";
    });
  });
}
