const page = document.getElementById("buttonDiv");
const selectedClassName = "current";

const presetCardCovers = [
  "https://c.tenor.com/TSJ8PZ22LR8AAAAC/tenor.gif",
  "https://i.giphy.com/UtcBRO8cxulRzkrVLc.webp",
  "https://i.makeagif.com/media/8-07-2017/aaxHkN.gif",
  "https://c.tenor.com/3CrIwgbopCUAAAAC/tenor.gif",
  "https://media.tenor.com/r2xFWoPJu9sAAAAM/daniel-freeman-flex.gif",
  "https://media1.tenor.com/m/SFSfKbAXw8QAAAAd/พี่คาซึยะ.gif",
  "https://media.tenor.com/QbYh1HzAioIAAAAj/gachi-gachimuchi.gif",
  "https://i.ibb.co/0h11XFH/Image.jpg",
  "https://i.ibb.co/gSHWmmJ/Image-1.jpg",
];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected cover
  const current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  const cardCover = event.target.dataset.cardCover;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ cardCover });
}

// Add a button to the page for each supplied color
function constructOptions(cardCovers) {
  chrome.storage.sync.get("cardCover", (data) => {
    const currentCover = data.cardCover;
    let counter = 1;

    // For each cover we were provided…
    for (const cover of cardCovers) {
      // …create a button with that cover

      let divCardCover = document.createElement("div");
      divCardCover.id = `cardCoverOption_${counter++}`;
      divCardCover.classList.add("cardCover");
      divCardCover.dataset.cardCover = cover;
      divCardCover.style.setProperty(
        "background",
        "center center url(" + cover + ")"
      );
      divCardCover.style.setProperty("background-repeat", "no-repeat");
      divCardCover.style.setProperty("background-size", "cover");
      divCardCover.style.setProperty("display", "inline-block");

      // …mark the currently selected cover
      if (cover === currentCover) {
        divCardCover.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      divCardCover.addEventListener("click", handleButtonClick);
      page.appendChild(divCardCover);
    }
  });
}

// Initialize the page by constructing the cover options
constructOptions(presetCardCovers);
