import { showToast } from "./components/toast.js";
import { getLitigeById, envoyerNoteSuiviLitige } from "./api/litiges.js";

//Récuperation des id du DOM

const litigeId = document.getElementById("litigeId");
const dateCreation = document.getElementById("dateCreation");
const trajet = document.getElementById("trajet");
const dateTrajet = document.getElementById("dateTrajet");
const prix = document.getElementById("prix");
const nbPlaces = document.getElementById("nbPlaces");
const conducteurPseudo = document.getElementById("conducteurPseudo");
const conducteurMail = document.getElementById("conducteurMail");
const passagerPseudo = document.getElementById("passagerPseudo");
const passagerMail = document.getElementById("passagerMail");
const message = document.getElementById("message");
const suiviList = document.getElementById("suiviList");
const suiviInput = document.getElementById("suiviInput");
const btnAjouterSuivi = document.getElementById("btnAjouterSuivi");
const btnCloturer = document.getElementById("btnCloturer");

//mise en forme de la date

const formatDate = (d) => (d ? new Date(d).toLocaleDateString("fr-FR") : "—");

//function pour charger les informations

async function chargerLitige(id) {
  try {
    // chargement des infos du litige dans le DOM
    const litige = await getLitigeById(id);
    if (litige) {
      litigeId.textContent = `Litige n° ${litige.id ?? "—"}`;
      dateCreation.textContent = `Émis le ${formatDate(litige.createdAt)}`;
      dateTrajet.textContent = formatDate(litige.dateTrajet) ?? "—";
      trajet.textContent = `${litige.depart ?? "—"} -> ${litige.destination ?? "—"}`;
      prix.textContent = litige.prix ?? "—";
      nbPlaces.textContent = litige.nbPlaces ?? "—";
      conducteurPseudo.textContent = litige.conducteurPseudo ?? "—";
      conducteurMail.textContent = litige.conducteurMail ?? "—";
      conducteurMail.href = `mailto:${litige.conducteurMail ?? "#"}`;
      passagerPseudo.textContent = litige.passagerPseudo ?? "—";
      passagerMail.textContent = litige.passagerMail ?? "—";
      passagerMail.href = `mailto:${litige.passagerMail ?? "#"}`;
      message.textContent = litige.message ?? "—";
      if (litige.suivi?.length) {
        litige.suivi.forEach((element) => {
          const li = document.createElement("li");
          li.textContent = `${formatDate(element.createdAt) ?? "-"}: ${element.message ?? "-"}`;
          suiviList.appendChild(li);
        });
      }
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
//Récupereation de l'id dans l'url
const qs = new URLSearchParams(location.search);
const id = qs.get("id");
if (id) {
  chargerLitige(id);
} else {
  showToast("Id non present dans l'url", "danger");
}

//ajout d'une note de suivi

async function ajouterNoteSuivi(id) {
  const noteSuivi = suiviInput.value;
  if (noteSuivi.trim() === "") {
    showToast("Le message ne peux pas être vide ");
    return;
  }
  try {
    const response = await envoyerNoteSuiviLitige(id, noteSuivi);
    if (response) showToast(response.message);
    suiviInput.value = "";
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
btnAjouterSuivi.addEventListener("click", () => {
  ajouterNoteSuivi(id);
});
