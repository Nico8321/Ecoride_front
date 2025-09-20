import { apiUrl } from "../config.js";

const isMonCompte = window.location.pathname.includes("monCompte");

export function createAvisCard(avis, destination) {
  const container = destination;
  const card = document.createElement("div");
  card.className = "card shadow-sm w-100 rounded-4 overflow-hidden mb-2";
  card.innerHTML = `
    <div class="card-body d-flex flex-column flex-md-row gap-3">
      <div class="d-flex align-items-center">
        <img src="${avis.auteur_photo}" alt="photo de profil" class="rounded-circle me-3" style="height: 75px; width: 75px; object-fit: cover;" />
        <div>
          <h5 class="card-title mb-0">${avis.auteur_pseudo}</h5>
          <small class="text-muted">${new Date(avis.date_avis).toLocaleDateString("fr-FR")}</small>
        </div>
      </div>
      <div class="mt-3 ps-md-4 border-start">
        <p class="mb-1"><strong>Note :</strong> ${avis.note} <i class="bi bi-star-fill text-warning"></i></p>
        <p class="mb-0"><strong>Commentaire :</strong> ${avis.commentaire}</p>
      </div>
    </div>
  `;

  container.appendChild(card);
  return card;
}
