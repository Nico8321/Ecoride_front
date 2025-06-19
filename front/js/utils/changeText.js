export function changeText() {
  setTimeout(() => {
    const isExpanded = accordionButton.getAttribute("aria-expanded") === "true";
    accordionButton.innerHTML = isExpanded
      ? 'Moins de filtres <i class="bi bi-caret-right"></i>'
      : 'Plus de filtres <i class="bi bi-caret-down"></i>';
  }, 50);
}
