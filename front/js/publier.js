import { verificationAdresse } from "./utils/verifAdresse.js";

verificationAdresse("depart", "suggestions-depart");
verificationAdresse("destination", "suggestions-destination");

const vehiculeSelect = document.getElementById("vehicule");
const user = JSON.parse(sessionStorage.getItem("user"));
const vehicules = user.vehicule;

// Incrementation des options de choix du véhicule dans le select
if (vehicules) {
  vehicules.forEach((vehicule) => {
    const option = document.createElement("option");
    option.innerText = `
          ${vehicule.marque},
          ${vehicule.modele},
          ${vehicule.energie}`;
    option.value = vehicule.id;

    vehiculeSelect.appendChild(option);
  });
} else {
  const option = document.createElement("option");
  option.innerText = "Aucun véhicule enregistré";
  option.disabled = true;
  option.selected = true;
  vehiculeSelect.appendChild(option);
}
