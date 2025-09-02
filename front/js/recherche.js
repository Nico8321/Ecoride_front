import { createCovoiturageCard } from "./components/covoiturageCard.js";
import { changeText } from "./utils/changeText.js";
import { verificationAdresse } from "./utils/verifAdresse.js";
import { showToast } from "./components/toast.js";
import { findCovoiturage } from "./api/covoiturage.js";
import { isLoggedIn } from "./auth/authHelper.js";
import { getFiltres } from "./utils/getFiltres.js";
import { reserver } from "./api/reservation.js";
import { getMoyenneByUser } from "./api/avis.js";

// Active la suggestion automatique pour les champs adresse

verificationAdresse("depart", "suggestions-depart");
verificationAdresse("arrivee", "suggestions-destination");

// Change le texte du bouton accordéon au clic

const accordionButton = document.getElementById("accordionButton");
accordionButton.addEventListener("click", changeText);

// Fonction principale pour lancer la recherche récupère les covoiturages filtrés et les affiche
async function ajouterNoteUser(userId) {
  try {
    const note = await getMoyenneByUser(userId);
    return note;
  } catch (error) {
    showToast("Erreur lors de la récupération de la note", "danger");
  }
}

async function rechercherCovoiturages() {
  const filtres = getFiltres();
  const resultatsContainer = document.getElementById("resultatsContainer");
  resultatsContainer.innerHTML = "";
  try {
    const covoiturages = await findCovoiturage(filtres);
    if (covoiturages.length > 0) {
      for (const covoiturage of covoiturages) {
        if (covoiturage.nb_places > 0) {
          createCovoiturageCard(covoiturage, resultatsContainer);
        }
      }
    } else {
      showToast("Aucun covoiturage trouvé", "info");
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
// Lancement de la recherche au clic sur le bouton

const btnRechercher = document.getElementById("btnRechercher");
btnRechercher.addEventListener("click", () => {
  rechercherCovoiturages();
});

// Gère l'ouverture du modal de réservation

const reservationModal = document.getElementById("reservationModal");

reservationModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const covoiturageId = button.getAttribute("data-id");
  const btnConfirm = document.getElementById("btnConfirmation");
  btnConfirm.dataset.id = covoiturageId;
});

const user = JSON.parse(sessionStorage.getItem("user"));
const nbPlaces = document.getElementById("nbPlaces");

// Envoie les infos de réservation au serveur

async function confirmerReservation(covoiturageId, userId) {
  const reservationInfo = {
    utilisateurId: user.id,
    covoiturageId: covoiturageId,
    nbPlaces: nbPlaces.value,
  };
  try {
    const response = await reserver(reservationInfo, covoiturageId, userId);
    if (response) {
      showToast("Reservation envoyée");
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
// Vérifie si l'utilisateur est connecté avant de réserver

const btnConfirm = document.getElementById("btnConfirmation");
btnConfirm.addEventListener("click", async () => {
  const covoiturageId = btnConfirm.dataset.id;
  const result = await isLoggedIn();
  if (!result) {
    showToast("Vous devez être connecté pour reserver", "info");
    window.location.replace("/signin");
    return;
  }
  confirmerReservation(covoiturageId, user.id);
  const reservationModal = bootstrap.Modal.getInstance(document.getElementById("reservationModal"));
  if (reservationModal) {
    reservationModal.hide();
  }
});

// recherche automatique apres redirection depuis le Header ou page Home

const filtreUrl = new URLSearchParams(window.location.search);
if (filtreUrl) {
  const keys = ["depart", "arrivee", "date", "heure", "prix", "note", "duree", "energie"];
  let hasValue = false;

  keys.forEach((key) => {
    const value = filtreUrl.get(key);
    if (value !== null) {
      const input = document.getElementById(key);
      if (input) {
        input.value = value;
        hasValue = true;
      } else if (key === "energie") {
        const radio = document.getElementById(value);
        if (radio) {
          radio.checked = true;
          hasValue = true;
        }
      }
    }
  });

  if (hasValue) {
    rechercherCovoiturages();
  }
}
