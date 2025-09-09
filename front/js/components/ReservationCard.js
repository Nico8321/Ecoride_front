import { apiUrl } from "../config.js";

const isMonCompte = window.location.pathname.includes("monCompte");

export function createReservationCard(reservation, destination) {
  const container = destination;
  const card = document.createElement("div");
  if (reservation.statut == "refuse") {
    card.className = "card shadow-sm w-100 rounded-4 overflow-hidden mb-2 bg-danger-subtle border-start border-5 border-danger";
  } else if (reservation.statut == "confirme" || reservation.statut == "termine") {
    card.className = "card shadow-sm w-100 rounded-4 overflow-hidden mb-2 bg-success-subtle border-start border-5 border-success";
  } else if (reservation.statut == "retour client") {
    card.className = "card shadow-sm w-100 rounded-4 overflow-hidden mb-2 bg-warning-subtle border-start border-5 border-warning";
  } else if (reservation.statut == "en attente") {
    card.className = "card shadow-sm w-100 rounded-4 overflow-hidden mb-2 bg-warning-subtle border-start border-5 border-info";
  }
  card.innerHTML = `
<div class="card-body d-flex flex-column flex-md-row gap-3">
 ${
   reservation.covoiturage.vehicule_energie === "electrique"
     ? `<div class="position-absolute top-0 start-0 bg-success text-white px-2 py-1 rounded-top-start">
         ECO
       </div>`
     : ""
 }

      <!-- Colonne : Profil + Nom + Note -->
      <div class="d-flex align-items-center">
        <div class="me-3">
          <img src="${apiUrl}/uploads/photos/${
    reservation.covoiturage.conducteur_photo
  }" alt="photo de profil" style="height: 75px; width: 75px; object-fit: cover" class="rounded-circle" />
        </div>
        <div>
          <p class="card-text fw-bold mb-1">${reservation.covoiturage.conducteur_pseudo}</p>
          <p class="card-text text-warning mb-0">Note : ${
            reservation.covoiturage.conducteur_note || "aucune note"
          } <i class="bi bi-star-fill"></i></p>
        </div>
      </div>

      <!-- Colonne : Infos covoiturage -->
      <div class="d-flex align-items-center justify-content-center text-center flex-fill">
        <h3 class="card-title mb-0">
          <span class="d-block p-1 ">Statut: ${reservation.statut}</span>
                    <span class="small-text d-block p-1 ">Nombres de places souhaitées : ${reservation.nb_places}</span>
          <span class="small-text p-3 d-block">${reservation.covoiturage.date_depart} à ${reservation.covoiturage.heure_depart}</span>
           ${reservation.covoiturage.ville_depart} → ${reservation.covoiturage.ville_arrivee}
           <br />
           <span class="small-text pt-3 d-block ">Durée: ${reservation.covoiturage.duree} minutes</span>

         
        </h3>
      </div>

      <!-- Colonne : Bouton + crédits -->
      <div class="d-flex align-items-center justify-content-end ms-md-auto gap-3">
        ${(function () {
          const now = new Date();
          const dateDepart = new Date(reservation.covoiturage.date_depart);
          const departPlusUnJour = new Date(dateDepart);
          departPlusUnJour.setDate(dateDepart.getDate() + 1);
          if (reservation.statut === "en attente" && now > departPlusUnJour) {
            return `
                 <button class="btn btn-primary" data-id="${reservation.covoiturage.id}"
                 data-bs-toggle="modal"
                 data-bs-target="#deleteReservationModal"
                 onclick="document.querySelector('#deleteOldReservation').setAttribute('data-id','${reservation.id}')">
                  Supprimer la </br> réservation expirée
                </button>`;
          } else if (reservation.statut === "en attente") {
            return `
                <button class="btn btn-danger" data-id="${reservation.id}" data-bs-toggle="modal" data-bs-target="#annulationReservationModal">
                  Annuler
                </button> `;
          } else {
            return "";
          }
        })()}${
    reservation.statut === "termine" && reservation.covoiturage.statut === "termine"
      ? `
        <button 
          class="btn btn-primary btn-open-modal-avis"
          data-covoiturage-id="${reservation.covoiturage.id}" 
          data-conducteur-id="${reservation.covoiturage.conducteur_id}" 
          data-utilisateur-id="${reservation.utilisateur_id}" 
          data-bs-toggle="modal" 
          data-bs-target="#deposerAvisModal">
          Déposer un avis 
        </button> 
 `
      : ""
  }${
    reservation.statut === "retour client" && reservation.covoiturage.statut === "termine"
      ? `
         <button 
          class="btn btn-primary btn-open-modal-feedback"
          data-reservation-id="${reservation.id}" 
          data-bs-toggle="modal" 
          data-bs-target="#feedbackModal">
          Terminer
        </button> `
      : ""
  }
        <p class="card-text fw-bold mb-0 text-nowrap">${reservation.covoiturage.prix}  crédits</p>
      </div>
    </div>

    <!-- Accordéon détails -->
    <div class="accordion mt-3" id="accordionDetails-${reservation.covoiturage.id}">
      <div class="accordion-item border-0">
        <h2 class="accordion-header" id="heading-${reservation.covoiturage.id}">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-${reservation.covoiturage.id}"
            aria-expanded="false"
            aria-controls="collapse-${reservation.covoiturage.id}"
          >
            Détails du covoiturage
          </button>
        </h2>
        <div
          id="collapse-${reservation.covoiturage.id}"
          class="accordion-collapse collapse border-0"
          aria-labelledby="heading-${reservation.covoiturage.id}"
          data-bs-parent="#accordionDetails-${reservation.covoiturage.id}"
        >
          <div class="accordion-body">
            <p><strong>Départ :</strong> ${reservation.covoiturage.rue_depart} ${reservation.covoiturage.code_postal_depart} ${
    reservation.covoiturage.ville_depart
  }</p>
            <p><strong>Destination :</strong> ${reservation.covoiturage.rue_arrivee} ${reservation.covoiturage.code_postal_arrivee} ${
    reservation.covoiturage.ville_arrivee
  }</p>
            <p><strong>Date :</strong> ${reservation.covoiturage.date_depart}</p>
            <p><strong>Heure :</strong> ${reservation.covoiturage.heure_depart}</p>
            <p><strong>Énergie :</strong> ${reservation.covoiturage.vehicule_energie}</p>
            <p><strong>Fumeur accepté :</strong> ${reservation.covoiturage.fumeur ? "Oui" : "Non"}</p>
            <p><strong>Animaux acceptés :</strong> ${reservation.covoiturage.animaux ? "Oui" : "Non"}</p>
            <p><strong>Places disponibles :</strong> ${reservation.covoiturage.nb_places}</p>
              <p><strong>Vehicules:</strong> ${reservation.covoiturage.vehicule_marque}  ${reservation.covoiturage.vehicule_modele} ${
    reservation.covoiturage.vehicule_couleur
  } </p>

          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(card);
  return card;
}
