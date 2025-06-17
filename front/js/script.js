import { isLoggedIn } from "./auth/authHelper";

function changeText() {
  const accordionButton = document.getElementById("accordionButton");
  setTimeout(() => {
    const isExpanded = accordionButton.getAttribute("aria-expanded") === "true";
    accordionButton.innerHTML = isExpanded
      ? 'Moins de filtres <i class="bi bi-caret-right"></i>'
      : 'Plus de filtres <i class="bi bi-caret-down"></i>';
  }, 50);
}

const connexion = document.getElementById("connexion");
document.addEventListener("DOMContentLoaded", async () => {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    connexion.innerText = "Déconnexion";
    connexion.href = "/deconnexion";
  }
});

// Affichage des resultats de la recherche
const container = document.getElementById("resultats-container");

/*trajets.forEach((trajet) => {
  const card = document.createElement("div");
  card.className = "col-md-6 mb-3";

  card.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${trajet.heure} → ${trajet.arrivee}</h5>
        <p class="card-text">Conducteur : ${trajet.conducteur}<br>
        Places dispo : ${trajet.places}<br>
        Prix : ${trajet.prix}</p>
        <a href="#" class="btn btn-primary">Réserver</a>
      </div>
    </div>
  `;

  container.appendChild(card);
});
*/
