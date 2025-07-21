import { apiUrl } from "../config.js";

const isMonCompte = window.location.pathname.includes("monCompte");

export function createAvisCard(reservation, destination) {
  const container = destination;
  const card = document.createElement("div");
  card.className = "card shadow-sm w-100 rounded-4 overflow-hidden mb-2";
  card.innerHTML = `
<div class="card-body d-flex flex-column flex-md-row gap-3">
      <div class="d-flex align-items-center">
        <div class="me-3">
          <img src="${apiUrl}/uploads/photos/${avis.auteur_photo}" alt="photo de profil" style="height: 75px; width: 75px; object-fit: cover" class="rounded-circle" />
        </div>
        <div>
          <p class="card-text fw-bold mb-1">${avis.auteur_id.pseudo}</p>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-center text-center flex-fill">
        <h3 class="card-title mb-0">
                  <span class=" p-3 d-block">Date : ${avis.date_avis} </span>
          <span class=" small-text p-3 d-block">Note : ${avis.note} </span>
           <br />
           <span class=" pt-3 d-block ">Durée: ${avis.commentaire} </span>
        </h3>
      </div>
</div>
  `;

  container.appendChild(card);
  return card;
}
