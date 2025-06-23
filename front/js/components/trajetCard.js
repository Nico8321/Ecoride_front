export function createTrajetCard(trajet, destination) {
  const container = document.getElementById(destination);
  const card = document.createElement("div");
  card.className = "card shadow-sm w-100 mb-3";
  card.innerHTML = `
    <div class="card-body row">
      <!-- Colonne : Profil + Nom + Note -->
      <div class="col d-flex align-items-center">
        <!-- Image de profil -->
        <div class="me-3">
          <img src="/images/profil.JPG" alt="photo de profil" style="height: 75px; width: 75px; object-fit: cover" class="rounded-circle" />
        </div>

        <!-- Nom et note -->
        <div>
          <p class="card-text h3 mb-1">${trajet.pseudo}</p>
          <p class="card-text h3 mb-1">${trajet.note}<i class="bi bi-star-fill text-warning"></i></p>
        </div>
      </div>

      <!-- Colonne : Infos trajet -->
      <div class="col d-flex align-items-center justify-content-start">
        <h3 class="card-title"><span class="small-text p-3">${trajet.date} à ${trajet.heure} </span>
        ${trajet.depart}  → ${trajet.destination} 
        </h3>
      </div>

      <!-- Colonne : Bouton + crédits -->
      <div class="col-auto ms-auto d-flex align-items-center gap-4">
        <div class="row align-items-center g-5">
          <a class="btn btn-primary col" href="/reservation/${trajet.id}">Réserver</a>
          <p class="card-text h3 col text-nowrap">${trajet.cout} crédits</p>
        </div>
      </div>
    </div>
  </div>`;

  container.appendChild(card);
}
