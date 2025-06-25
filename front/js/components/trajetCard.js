export function createTrajetCard(trajet, destination) {
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
          <p class="card-text fw-bold mb-1">Nicolas</p>
          <p class="card-text text-warning mb-0">4,8 <i class="bi bi-star-fill"></i></p>
        </div>
      </div>

      <!-- Colonne : Infos trajet -->
      <div class="d-flex align-items-center justify-content-center text-center flex-fill">
        <h3 class="card-title mb-0">
          <span class="small-text p-3 d-block">25 juin 2025 à 6h00</span>
          Toulon → Nice
        </h3>
      </div>

      <!-- Colonne : Bouton + crédits -->
      <div class="d-flex align-items-center justify-content-end ms-md-auto gap-3">
        <button class="btn btn-primary">Réserver</button>
        <p class="card-text fw-bold mb-0 text-nowrap">58 crédits</p>
      </div>
    </div>

    <!-- Accordéon détails -->
    <div class="accordion mt-3" id="accordionDetails-${trajet.id}">
      <div class="accordion-item border-0">
        <h2 class="accordion-header" id="heading-${trajet.id}">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-${trajet.id}"
            aria-expanded="false"
            aria-controls="collapse-${trajet.id}"
          >
            Détails du trajet
          </button>
        </h2>
        <div
          id="collapse-${trajet.id}"
          class="accordion-collapse collapse border-0"
          aria-labelledby="heading-${trajet.id}"
          data-bs-parent="#accordionDetails-${trajet.id}"
        >
          <div class="accordion-body">
            <p><strong>Départ :</strong> ${trajet.depart}</p>
            <p><strong>Destination :</strong> ${trajet.destination}</p>
            <p><strong>Date :</strong> ${trajet.date}</p>
            <p><strong>Heure :</strong> ${trajet.heure}</p>
            <p><strong>Énergie :</strong> ${trajet.energie}</p>
            <p><strong>Fumeur accepté :</strong> ${trajet.fumeur ? "Oui" : "Non"}</p>
            <p><strong>Animaux acceptés :</strong> ${trajet.animaux ? "Oui" : "Non"}</p>
            <p><strong>Places disponibles :</strong> ${trajet.places}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(card);
}
