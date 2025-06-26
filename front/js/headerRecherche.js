const departInput = document.getElementById("headerDepart");
const destinationInput = document.getElementById("headerDestination");
const button = document.getElementById("searchButton");

function redirectionRecherche() {
  const depart = departInput.value.trim();
  const destination = destinationInput.value.trim();
  if (depart || destination) {
    const query = new URLSearchParams();
    if (depart) query.append("depart", depart);
    if (destination) query.append("destination", destination);
    window.location.href = `/recherche?${query.toString()}`;
  }
}
button.addEventListener("click", () => redirectionRecherche());
