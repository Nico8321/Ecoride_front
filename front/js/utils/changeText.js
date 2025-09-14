export function changeText() {
  setTimeout(() => {
    const isExpanded = accordionButton.getAttribute("aria-expanded") === "true";
    accordionButton.innerHTML = isExpanded ? "Moins de filtres " : "Plus de filtres ";
  }, 50);
}
