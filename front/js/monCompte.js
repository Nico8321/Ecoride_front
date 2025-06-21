import { getReservationByUser } from "./api/reservation.js";
import { getTrajetsByUser, postTrajet } from "./api/trajet.js";
import { addVehicule, deleteVehicule } from "./api/user.js";
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
        { id: "154", marque: "Bmw", modele: "serie 3", energie: "essence" },
        { id: "258", marque: "Mercedes", modele: "classe a", energie: "hybride" },
        { id: "345", marque: "Mercedes", modele: "classe c", energie: "electrique" },
      ],
    })
  );
}

// SECTION INFO PERSO
// Remplissage auto des champs avec les données de sessionStorage

const user = JSON.parse(sessionStorage.getItem("user"));
const données = ["pseudo", "nom", "prenom", "adresse", "telephone"];

données.forEach((key) => {
  const input = document.getElementById(key);
  if (input) input.value = user[key];
});

// SIDEBAR
// Remplissage de la sidebar desktop

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

// Controle de  saisie champ telephone : Ajout d'un écouteur sur l'input telephone

const telInput = document.getElementById("telephone");
telInput.addEventListener("change", () => {
  inputValidator("telephone");
});

// SECTION MES VEHICULES
// Affichage des vehicules de l'user (récuperation dans session storage)

const vehiculeDiv = document.getElementById("vehicule");
const vehicules = user.vehicule;

// Incrementation des véhicules dans le DOM
function ajoutDivVehicule(vehicule) {
  const div = document.createElement("div");
  div.className = "p-3";
  div.id = vehicule.id;
  div.innerHTML = `
  <h3>Véhicule ${vehicule.id} </h3>
          <p>${vehicule.marque}</p>
          <p>${vehicule.modele}</p>
          <p>${vehicule.energie}</p>
          <button  id="${vehicule.id}" class="btn btn-link shadow-none p-0 m-0">Supprimer</button>`;
  vehiculeDiv.appendChild(div);
}

vehicules.forEach((vehicule) => {
  ajoutDivVehicule(vehicule);
});

//Suppression d'un vehicule
//fonction pour suppression

async function supprimerVehicule(userId, vehiculeId) {
  try {
    const idVehiculeSupprime = await deleteVehicule(userId, vehiculeId);
    if (idVehiculeSupprime) {
      document.getElementById(idVehiculeSupprime).remove();
      const updatedVehicules = user.vehicule.filter((v) => v.id !== idVehiculeSupprime);
      user.vehicule = updatedVehicules;
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}
const boutonsSuppr = vehiculeDiv.querySelectorAll("button");
boutonsSuppr.forEach((button) => {
  button.addEventListener("click", () => {
    supprimerVehicule(user.id, button.id);
  });
});

//Ajout d'un vehicule
//fonction pour ajout

const marque = document.getElementById("marque");
const modele = document.getElementById("modele");
const energie = document.getElementById("energie");

async function ajoutVehicule(userId) {
  const vehicule = {
    marque: marque.value,
    modele: modele.value,
    energie: energie.value,
  };
  try {
    const newVehicule = await addVehicule(user.id, vehicule);
    if (newVehicule) {
      ajoutDivVehicule(newVehicule);
      user.vehicule.push(newVehicule);
      sessionStorage.setItem("user", JSON.stringify(user));
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalVehicule"));
      modal.hide();
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}
const btnAddVehicule = document.getElementById("addVehicule");
btnAddVehicule.addEventListener("click", ajoutVehicule(user.id));

// SECTION TRAJETS PROPOSES
// Recuperation et affichage des trajets proposés

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

// SECTION TRAJETS RESERVES ET PASSES
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
  } catch (error) {
    console.error("Erreur:", error.message);
  }
});
