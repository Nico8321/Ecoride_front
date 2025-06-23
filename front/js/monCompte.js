import { getReservationByUser } from "./api/reservation.js";
import { getTrajetsByUser, postTrajet } from "./api/trajet.js";
import { addVehicule, deleteUser, deleteVehicule } from "./api/user.js";
import { createTrajetCard } from "./components/trajetCard.js";
import { inputValidator } from "./utils/inputValidator.js";
import { patchUser } from "./api/user.js";
import { showToast } from "./components/toast.js";
// TEMPORAIRE : Ajout manuel de données user dans sessionStorage pour test (à retirer après lien avec le back)

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
// ==========================
// GESTION DES INFOS DE L'USER
// ==========================

// Récupération de l'user depuis le sessionStorage

const données = ["pseudo", "nom", "prenom", "adresse", "telephone"];
const user = JSON.parse(sessionStorage.getItem("user"));

//remplissage des champs

function inputIncrement() {
  données.forEach((key) => {
    const input = document.getElementById(key);
    if (input) input.value = user[key];
  });
}
inputIncrement();
async function updateUser() {
  const form = document.getElementById("formUserData");
  if (form.reportValidity()) {
    const userUpdated = {};
    données.forEach((key) => {
      const input = document.getElementById(key);
      if (input) userUpdated[key] = input.value;
    });
    try {
      const data = await patchUser(user.id, userUpdated);
      sessionStorage.setItem("user", JSON.stringify(data));
      inputIncrement();
    } catch (error) {
      console.error("Erreur:", error.message);
    }
  }
}
// Ajout de l'ecouter sur le bouton pour modifier les infos

const updateUserBtn = document.getElementById("updateUserBtn");
if (updateUserBtn) {
  updateUserBtn.addEventListener("click", () => {
    updateUser();
  });
}

// Affichage des infos user dans la sidebar (desktop + mobile)

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

// Contrôle champ téléphone (validation à la saisie)

const telInput = document.getElementById("telephone");
telInput.addEventListener("change", () => {
  inputValidator("telephone");
});

// ==========================
// GESTION VEHICULES
// ==========================

// Affichage des véhicules de l'user depuis sessionStorage

const vehiculeDiv = document.getElementById("vehicule");
const vehicules = user.vehicule;

// Génère le bloc HTML d’un véhicule (utilisé pour chaque véhicule ou pour l'ajout)

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

// Suppression d’un véhicule
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
// Écouteur sur les boutons "Supprimer" pour chaque véhicule
const boutonsSuppr = vehiculeDiv.querySelectorAll("button");
boutonsSuppr.forEach((button) => {
  button.addEventListener("click", () => {
    supprimerVehicule(user.id, button.id);
  });
});

// Ajout d’un véhicule

// Récupération des inputs du formulaire d’ajout véhicule

const marque = document.getElementById("marque");
const modele = document.getElementById("modele");
const energie = document.getElementById("energie");

async function ajoutVehicule(userId) {
  const form = document.getElementById("form-ajout-vehicule");
  if (form.reportValidity()) {
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
}
// Ajout de l'ecouteur sur le bouton pour ajouter le véhicule

const btnAddVehicule = document.getElementById("addVehicule");
btnAddVehicule.addEventListener("click", () => {
  ajoutVehicule(user.id);
});

// ==========================
// GESTION DES TRAJETS
// ==========================
// Récupère et affiche les trajets proposés par l’utilisateur

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

// Récupère les trajets réservés : à venir → zone "Réservés", passés → zone "Passés"

const reserve = document.getElementById("reserve");
const passe = document.getElementById("passe");
document.addEventListener("DOMContentLoaded", async () => {
  // Date du jour pour différencier les trajets passés / à venir

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
// ==========================
// GESTION DE LA DESINSCRIPTION
// ==========================

//Fonction pour la desinscriprion

async function desinscription(userId) {
  try {
    const response = await deleteUser(userId);
    if (response) {
      showToast(response.message); //toast de confirmation
      sessionStorage.clear(); //suppression de l'user dans sessionStorage
      window.location.href = "home.html"; //redirection a l'accueil
    }
  } catch (error) {
    showToast(error.message, "error"); //toast d'erreur
  }
}
// Ajout de l'ecouteur sur le bouton pour confirmer la desinscription
const deleteUserBtn = document.getElementById("deleteUserBtn");
deleteUserBtn.addEventListener("click", () => {
  desinscription(user.id);
});
