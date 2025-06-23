import { createTrajetCard } from "./components/trajetCard.js";
import { changeText } from "./utils/changeText.js";
import { verificationAdresse } from "./utils/verifAdresse.js";
import { showToast } from "./components/toast.js";
import { findTrajet } from "./api/trajet.js";

verificationAdresse("depart", "suggestions-depart");
verificationAdresse("destination", "suggestions-destination");

const accordionButton = document.getElementById("accordionButton");
accordionButton.addEventListener("click", changeText);

// recuperation des valeurs des inputs pour la recherche
function getFiltres() {
  const donnees = ["depart", "destination", "date", "heure", "cout", "note"];
  const filtres = {};

  donnees.forEach((key) => {
    const input = document.getElementById(key);
    if (input?.value) {
      filtres[key] = input.value;
    }
  });

  const energieChecked = document.querySelector('input[name="radioEnergie"]:checked');
  if (energieChecked) {
    filtres["energie"] = energieChecked.id;
  }

  return filtres;
}

// Appelle de la requete de recherche
async function rechercherTrajets() {
  const filtres = getFiltres();
  const resultatsContainer = document.getElementById("resultatsContainer");
  resultatsContainer.innerHTML = "";
  try {
    const trajets = await findTrajet(filtres);
    if (trajets.length > 0) {
      trajets.forEach((trajet) => {
        createTrajetCard(trajet, "resultatsContainer");
      });
    } else {
      showToast("Aucun trajet trouvé", "info");
    }
  } catch (error) {
    showToast(error.message, "error");
  }
}
const btnRechercher = document.getElementById("btnRechercher");
btnRechercher.addEventListener("click", () => {
  rechercherTrajets();
});
