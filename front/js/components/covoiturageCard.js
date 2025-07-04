export function createCovoiturageCard(covoiturage, destination) {
  const container = document.getElementById(destination);
  const card = document.createElement("div");
  card.className = "card shadow-sm w-100 mb-3";
  card.innerHTML = `
<div class="card-body d-flex flex-column flex-md-row gap-3">
      <!-- Colonne : Profil + Nom + Note -->
      <div class="d-flex align-items-center">
        <div class="me-3">
          <img src="/images/profil.JPG" alt="photo de profil" style="height: 75px; width: 75px; object-fit: cover" class="rounded-circle" />
        </div>
        <div>
          <p class="card-text fw-bold mb-1">${covoiturage.conducteur}</p>
          <p class="card-text text-warning mb-0">Note : ${covoiturage.note} <i class="bi bi-star-fill"></i></p>
        </div>
      </div>

      <!-- Colonne : Infos covoiturage -->
      <div class="d-flex align-items-center justify-content-center text-center flex-fill">
        <h3 class="card-title mb-0">
          <span class="small-text p-3 d-block">${covoiturage.date} à ${covoiturage.heure}</span>
           ${covoiturage.depart} → ${covoiturage.destination}
        </h3>
      </div>

      <!-- Colonne : Bouton + crédits -->
      <div class="d-flex align-items-center justify-content-end ms-md-auto gap-3">
        <button class="btn btn-primary" data-id="${covoiturage.id}" data-bs-toggle="modal" data-bs-target="#reservationModal">Réserver</button>
        <p class="card-text fw-bold mb-0 text-nowrap">${covoiturage.prix}  crédits</p>
      </div>
    </div>

    <!-- Accordéon détails -->
    <div class="accordion mt-3" id="accordionDetails-${covoiturageid}">
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
            <p><strong>Départ :</strong> ${covoiturage.depart}</p>
            <p><strong>Destination :</strong> ${covoiturage.destination}</p>
            <p><strong>Date :</strong> ${covoiturage.date}</p>
            <p><strong>Heure :</strong> ${covoiturage.heure}</p>
            <p><strong>Énergie :</strong> ${covoiturage.energie}</p>
            <p><strong>Fumeur accepté :</strong> ${covoiturage.fumeur ? "Oui" : "Non"}</p>
            <p><strong>Animaux acceptés :</strong> ${covoiturage.animaux ? "Oui" : "Non"}</p>
            <p><strong>Places disponibles :</strong> ${covoiturage.places}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(card);
}
