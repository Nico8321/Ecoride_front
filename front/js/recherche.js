import { createTrajetCard } from "./components/trajetCard.js";
import { changeText } from "./utils/changeText.js";
import { verificationAdresse } from "./utils/verifAdresse.js";
import { showToast } from "./components/toast.js";
import { findTrajet } from "./api/trajet.js";
import { isLoggedIn } from "./auth/authHelper.js";

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

const reservationModal = document.getElementById("reservationModal");

reservationModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const trajetId = button.getAttribute("data-id");
  const btnConfirm = document.getElementById("btnConfirmation");
  btnConfirm.dataset.id = trajetId;
});

const user = JSON.parse(sessionStorage.getItem("user"));
const nbPlaces = document.getElementById("nbPlaces");

async function confirmerReservation(trajetId) {
  const reservationInfo = {
    userId: user.id,
    trajetId: trajetId,
    nbPlaces: nbPlaces.value,
  };
  try {
    const response = await reserver(reservationInfo, trajetId);
    if (response) {
      showToast("Reservation envoyée", response);
    }
  } catch (error) {
    showToast(error.message, "error");
  }
}
const btnConfirm = document.getElementById("btnConfirmation");
btnConfirm.addEventListener("click", async () => {
  const trajetId = btnConfirm.dataset.id;
  const result = await isLoggedIn();
  if (!result) {
    showToast("Vous devais etre connecté pour reserver", "info");
    window.location.replace("/signin");
    return;
  }
  confirmerReservation(trajetId);
});

//Recherche automatique apres redirection depuis le Header

const filtreUrl = new URLSearchParams(window.location.search);
if (filtreUrl) {
  const depart = filtreUrl.get("depart");
  const destination = filtreUrl.get("destination");
  const departInput = document.getElementById("depart");
  const destinationInput = document.getElementById("destination");
  departInput.value = depart;
  destinationInput.value = destination;
  if (destinationInput?.value || departInput?.value) {
    rechercherTrajets();
  }
}
