import { creationLitige } from "./api/litiges.js";
import { showToast } from "./components/toast.js";

//Recuperation des params dans l'url
const param = new URLSearchParams(window.location.search);
const reservationId = param.get("reservationId");
//Recuperation de l'id de l'user dans sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));
const userId = user.id;

//recuperation de la description dans le DOM
const description = document.getElementById("message");

//Fonction pour l'appelle de creationLitige
async function litigeFinReservation(reservationId, userId) {
  {
    const message = description.value.trim();
    if (!message) {
      showToast("Le message est requis", "danger");
      return;
    }
    button.disabled = true;
    //creation de l'objet litige
    const litige = {
      user_id: userId,
      reservation_id: reservationId,
      message: message,
    };
    try {
      const response = await creationLitige(reservationId, userId, litige);
      if (response) {
        showToast(response.message); //toast de confirmation
        window.location.href = "/monCompte";
      }
    } catch (error) {
      showToast(error.message, "danger"); //toast d'erreur
    } finally {
      button.disabled = false;
    }
  }
}
//recuperation du bouton envoyer
const button = document.getElementById("btnEnvoyerLitige");
//ajout de l'ecouteur sur le bouton
button.addEventListener("click", () => {
  litigeFinReservation(reservationId, userId);
});
