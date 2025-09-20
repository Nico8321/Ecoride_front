import { apiUrl } from "../config.js";

const isMonCompte = window.location.pathname.includes("monCompte");
const today = new Date().toISOString().split("T")[0];
export function createCovoiturageCard(covoiturage, destination) {
  const container = destination;
  const card = document.createElement("div");
  card.className = "card shadow-sm w-100 rounded-4 overflow-hidden mb-2";
  card.innerHTML = `
<div class="card-body d-flex flex-column flex-md-row gap-3">
 ${
   covoiturage.vehicule_energie === "electrique"
     ? `<div class="position-absolute top-0 start-0 bg-success text-white px-2 py-1 rounded-top-start">
         ECO
       </div>`
     : ""
 }
    <div id="moduleReservation${covoiturage.id}"></div>
      <!-- Colonne : Profil + Nom + Note -->
      <div class="d-flex align-items-center">
        <div class="me-3">
          <img src="${
            covoiturage.conducteur_photo
          }" alt="photo de profil" style="height: 75px; width: 75px; object-fit: cover" class="rounded-circle" />
        </div>
        <div>
          <p class="card-text fw-bold mb-1">${covoiturage.conducteur_pseudo}</p>
          <p class="card-text text-warning mb-0">Note : ${covoiturage.conducteur_note || "aucune note"} <i class="bi bi-star-fill"></i></p>
        </div>
      </div>

      <!-- Colonne : Infos covoiturage -->
      <div class="d-flex align-items-center justify-content-center text-center flex-fill">
        <h3 class="card-title mb-0">
          <span class=" p-3 d-block">${covoiturage.date_depart} à ${covoiturage.heure_depart}</span>
           ${covoiturage.ville_depart} → ${covoiturage.ville_arrivee}
           <br />
           <span class="small-text pt-3 d-block ">Durée: ${covoiturage.duree} minutes</span>
          <span class="small-text d-block p-1 ">places disponibles : ${covoiturage.nb_places}</span>
        </h3>
      </div>

      <!-- Colonne : Bouton + crédits -->
      <div class="d-block align-items-center justify-content-end ms-md-auto gap-3">
              <p class="card-text fw-bold mb-0 text-nowrap p-1 "> ${covoiturage.prix}  crédits</p>
        <p class="card-text fw-bold mb-0 text-nowrap pb-3 ">Statut: ${covoiturage.statut}</p>
          
  ${
    !isMonCompte
      ? `<button class="btn btn-primary" data-id="${covoiturage.id}" data-bs-toggle="modal" data-bs-target="#reservationModal">
        Réserver
      </button>`
      : ""
  }
${
  isMonCompte && (covoiturage.statut === "ouvert" || covoiturage.statut === "complet") && covoiturage.date_depart > today
    ? `
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#annulationCovoiturageModal"
              data-id="${covoiturage.id}"
            >
              Annuler
            </button>
          `
    : ""
}
${
  isMonCompte && (covoiturage.statut === "ouvert" || covoiturage.statut === "complet") && covoiturage.date_depart === today
    ? `
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#demarrerCovoiturageModal"
              data-id="${covoiturage.id}"
            >
              Demarrer
            </button>
          `
    : ""
}
${
  isMonCompte && covoiturage.statut === "demarre"
    ? `
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#terminerCovoiturageModal"
              data-id="${covoiturage.id}"
            >
              Terminer
            </button>
          `
    : ""
}
  

      </div>
      </div>
    </div>

    <!-- Accordéon détails -->
    <div class="accordion mt-3" id="accordionDetails-${covoiturage.id}">
      <div class="accordion-item border-0">
        <h2 class="accordion-header" id="heading-${covoiturage.id}">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-${covoiturage.id}"
            aria-expanded="false"
            aria-controls="collapse-${covoiturage.id}"
          >
            Détails du covoiturage
          </button>
        </h2>
        <div
          id="collapse-${covoiturage.id}"
          class="accordion-collapse collapse border-0"
          aria-labelledby="heading-${covoiturage.id}"
          data-bs-parent="#accordionDetails-${covoiturage.id}"
        >
          <div class="accordion-body">
            <p><strong>Départ :</strong> ${covoiturage.rue_depart} ${covoiturage.code_postal_depart} ${covoiturage.ville_depart}</p>
            <p><strong>Destination :</strong> ${covoiturage.rue_arrivee} ${covoiturage.code_postal_arrivee} ${covoiturage.ville_arrivee}</p>
            <p><strong>Date :</strong> ${covoiturage.date_depart}</p>
            <p><strong>Heure :</strong> ${covoiturage.heure_depart}</p>
            <p><strong>Énergie :</strong> ${covoiturage.vehicule_energie}</p>
            <p><strong>Fumeur accepté :</strong> ${covoiturage.fumeur ? "Oui" : "Non"}</p>
            <p><strong>Animaux acceptés :</strong> ${covoiturage.animaux ? "Oui" : "Non"}</p>
            <p><strong>Places disponibles :</strong> ${covoiturage.nb_places}</p>
              <p><strong>Vehicules:</strong> ${covoiturage.vehicule_marque}  ${covoiturage.vehicule_modele} ${covoiturage.vehicule_couleur} </p>

          </div>
        </div>
      </div>
<div id =moduleCovoiturage${covoiturage.id}></div>
    </div>
  `;

  container.appendChild(card);
  return card;
}
