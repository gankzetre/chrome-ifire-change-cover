// Initialize button with users' preferred color
const changeCardCover = document.getElementById("changeCardCover");

chrome.storage.sync.get("cardCover", ({ cardCover }) => {
  changeCardCover.style.backgroundImage = "url(" + cardCover + ")";
  changeCardCover.style.backgroundRepeat = "no-repeat";
  changeCardCover.style.backgroundPosition = "center";
  changeCardCover.style.backgroundSize = "cover";
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
    document.head.innerHTML +=
      "<style>" +
      ".Card_wrapper__r1iDw {" +
      " background: center center url("+ cardCover +");" +
      " background-repeat: no-repeat;" +
      " background-size: cover;" +
      "}" +
      "</style>";
  });
}
