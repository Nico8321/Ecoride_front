import { litigeReservation } from "./api/reservation.js";
import { showToast } from "./components/toast.js";

//Recuperation des params dans l'url
const param = new URLSearchParams(window.location.search);
const reservationId = param.get("reservationId");
//Recuperation de l'id de l'user dans sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));
const userId = user.id;

//recuperation de la description dans le DOM
const description = document.getElementById("message");

//Fonction pour l'appelle de litigeReservation
async function litigeFinReservation(reservationId, userId) {
  {
    //creation de l'objet litige
    const litige = {
      user_id: userId,
      reservation_id: reservationId,
      message: description.value,
    };
    try {
      const response = await litigeReservation(reservationId, userId, litige);
      if (response) {
        showToast(response.message); //toast de confirmation
        window.location.href = "/monCompte";
      }
    } catch (error) {
      showToast(error.message, "error"); //toast d'erreur
    }
  }
}
//recuperation du bouton envoyer
const button = document.getElementById("btnEnvoyerLitige");
//ajout de l'ecouteur sur le bouton
button.addEventListener("click", () => {
  litigeFinReservation(reservationId, userId);
});
