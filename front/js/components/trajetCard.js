export function createTrajetCard(trajet, destination) {
  const container = document.getElementById(destination);
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
}
