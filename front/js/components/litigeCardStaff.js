export function createLitigeCardStaff(litige, destination) {
  const container = destination;
  const card = document.createElement("div");
  card.className = "card shadow-sm w-100 rounded-4 overflow-hidden mb-2";
  card.innerHTML = `

    <div class="card-body d-flex flex-column flex-md-row gap-3 position-relative">
      <div class="d-flex align-items-center">
        <h5 class="me-2">Litige du ${new Date(litige.createdAt).toLocaleDateString("fr-FR")}</h5>
        <div class="ps-5 border-start">
          <p class="card-title mb-0">Conducteur: ${litige.conducteur.pseudo}</p>
          <p class="card-title mb-0">Passager: ${litige.redacteur.pseudo}</p>
        </div>
      </div>
      <div class="mt-3 ps-md-4 text-center mx-md-auto">
        <p class="h5 mb-1">Trajet:</p>
        <p class="h5 mb-0">${litige.covoiturage.depart} -> ${litige.covoiturage.destination}</p>
      </div>
      <div class="mt-3 mt-md-0 d-flex align-items-center ms-md-auto">
        <button class="btn btn-primary voirLitige" data-id="${litige.id}">Voir</button>
      </div>
    </div>

`;
  container.appendChild(card);
  return card;
}
