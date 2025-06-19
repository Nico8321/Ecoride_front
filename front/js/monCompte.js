import { getReservationByUser } from "./api/reservation.js";
import { getTrajetsByUser, postTrajet } from "./api/trajet.js";
import { createTrajetCard } from "./components/trajetCard.js";
import { inputValidator } from "./utils/inputValidator.js";

// A SUPPRIMER  Injection temporaire de données dans le sessionStorage

if (!sessionStorage.getItem("user")) {
  sessionStorage.setItem(
    "user",
    JSON.stringify({
      pseudo: "NicoTest",
      nom: "Beuve",
      prenom: "Nicolas",
      adresse: "123 rue du Test",
      telephone: "0612345678",
      note: "4.2",
      credit: "25",
      vehicule: [
        { id: "1", marque: "Bmw", modele: "serie 3", energie: "essence" },
        { id: "2", marque: "Mercedes", modele: "classe a", energie: "hybride" },
        { id: "3", marque: "Mercedes", modele: "classe c", energie: "electrique" },
      ],
    })
  );
}

// Ajout d'un écouteur sur l'input telephone pour le controle de la saisie

const telInput = document.getElementById("telephone");
telInput.addEventListener("change", () => {
  inputValidator("telephone");
});

//remplissage auto des champs avec les données de sessionStorage

const user = JSON.parse(sessionStorage.getItem("user"));
const données = ["pseudo", "nom", "prenom", "adresse", "telephone"];

données.forEach((key) => {
  const input = document.getElementById(key);
  if (input) input.value = user[key];
});

//Recuperation et affichage des trajets proposés

const propose = document.getElementById("propose");
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const trajets = await getTrajetsByUser(user.id);
    if (trajets.length > 0) {
      propose.innerHTML = "";
      trajets.forEach((trajet) => {
        if (trajet.conducteur_id === user.id) {
          createTrajetCard(trajet, propose);
        }
      });
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
});

//Recuperation et affichage des trajets reservés

const reserve = document.getElementById("reserve");
const passe = document.getElementById("passe");
document.addEventListener("DOMContentLoaded", async () => {
  const today = new Date().toISOString().split("T")[0];
  try {
    const trajets = await getReservationByUser(user.id);
    if (trajets.length > 0) {
      propose.innerHTML = "";
      trajets.forEach((trajet) => {
        if (trajet.date >= today) {
          createTrajetCard(trajet, reserve);
        } else {
          createTrajetCard(trajet, passe);
        }
      });
    }
  } catch (error) {}
});
// Affichage des vehicules de l'user (récuperation dans session storage)

const vehiculeDiv = document.getElementById("vehicule");
const vehicules = user.vehicule;
let vehiculeCount = 1;

// incrementation des véhicules dans le DOM

vehicules.forEach((vehicule) => {
  const div = document.createElement("div");
  div.className = "p-3";
  div.innerHTML = `
  <h3>Véhicule ${vehiculeCount} </h3>
          <p>${vehicule.marque}</p>
          <p>${vehicule.modele}</p>
          <p>${vehicule.energie}</p>
          <a href="">Supprimer</a>`;
  vehiculeDiv.appendChild(div);
  vehiculeCount++;
});

//remplissage de la sidebar desktop

const sidebarPseudo = document.getElementById("sidebarPseudo");
const sidebarNote = document.getElementById("sidebarNote");
const sidebarCredit = document.getElementById("sidebarCredit");
sidebarPseudo.innerHTML = `${user.pseudo}`;
sidebarCredit.innerHTML = `${user.credit} credits restants `;
sidebarNote.innerText = user.note;

const sidebarPseudoM = document.getElementById("sidebarPseudoM");
const sidebarNoteM = document.getElementById("sidebarNoteM");
const sidebarCreditM = document.getElementById("sidebarCreditM");
sidebarPseudoM.innerHTML = `${user.pseudo}`;
sidebarCreditM.innerHTML = `${user.credit} crédits restants `;
sidebarNoteM.innerText = user.note;
