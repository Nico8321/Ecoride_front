import { apiUrl } from "../config.js";

export function createReservationValidationCard(reservation, destination) {
  const container = destination;
  const card = document.createElement("div");
  card.className = "card shadow-sm w-100 rounded-4 overflow-hidden mb-2";
  card.innerHTML = `
<div class="card-body d-flex flex-column flex-md-row gap-3 " >
      <!-- Colonne : Profil + Nom + Note -->
      <div class="d-flex align-items-center">
        <div class="me-3">
          <img src="${apiUrl}/uploads/photos/${
    reservation.utilisateur_photo
  }" alt="photo de profil" style="height: 75px; width: 75px; object-fit: cover" class="rounded-circle" />
        </div>
        <div>
          <p class="card-text fw-bold mb-1">${reservation.utilisateur_pseudo}</p>
        </div>
      </div>

      <!-- Colonne : Infos covoiturage -->
      <div class="d-block align-items-center justify-content-center text-center flex-fill">
       <p>Nombre de places souhaité: ${reservation.nb_places}
      <p>Statut de la réservation: ${reservation.statut}
      </div>

      <!-- Colonne : Bouton + crédits -->
      <div class="d-flex align-items-center justify-content-end ms-md-auto gap-3">
        ${
          reservation.statut === "en attente"
            ? `
            <button class="btn btn-primary" data-reservation-id="${reservation.id}" data-bs-toggle="modal" data-bs-target="#validationReservationModal">
              Gerer la reservation
            </button> `
            : `<p class="h3" >
              Reservation ${reservation.statut}<p>`
        }
      </div>
    </div

   
        </div>
      </div>
 
    </div>
  `;

  container.appendChild(card);
}
