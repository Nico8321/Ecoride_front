import { changeText } from "./utils/changeText.js";
import { verificationAdresse } from "./utils/verifAdresse.js";
import { getFiltres } from "./utils/getFiltres.js";

// Gestion du texte du bouton accordéon
const accordionButton = document.getElementById("accordionButton");

accordionButton.addEventListener("click", changeText);

// Vérifie et suggère les adresses au fur et à mesure de la saisie
verificationAdresse("depart", "suggestions-depart");
verificationAdresse("destination", "suggestions-destination");

// Gestion du formulaire de recherche (depuis la home)
const btn = document.getElementById("btnFormRechercher");

// Fonction pour rediriger vers la page recherche avec les filtres saisis
function redirectionRecherche() {
  const filtres = getFiltres();
  if (filtres["depart"] || filtres["destination"]) {
    const query = new URLSearchParams();
    for (const key in filtres) {
      if (filtres[key]) {
        query.append(key, filtres[key]);
      }
    }
    window.location.href = `/recherche?${query.toString()}`;
  }
}
btn.addEventListener("click", () => redirectionRecherche());
