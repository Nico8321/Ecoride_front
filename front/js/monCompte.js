import { getReservationByUser } from "./api/reservation.js";
import { getCovoituragesByUser, postCovoiturage } from "./api/covoiturage.js";
import { addVehicule, deleteUser, deleteVehicule, postPhoto, getVehicules, patchUser } from "./api/user.js";
import { createCovoiturageCard } from "./components/covoiturageCard.js";
import { inputValidator } from "./utils/inputValidator.js";
import { showToast } from "./components/toast.js";
import { apiUrl } from "./config.js";
// TEMPORAIRE : Ajout manuel de données user dans sessionStorage pour test (à retirer après lien avec le back)

/*if (!sessionStorage.getItem("user")) {
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
        {
          id: "154",
          immatriculation: "AB-454-CD",
          marque: "Bmw",
          modele: "serie 3",
          energie: "essence",
          couleur: "noir",
          dateImmat: "25.01.2023",
        },
        {
          id: "258",
          marque: "Mercedes",
          modele: "classe a",
          energie: "hybride",
        },
        {
          id: "345",
          marque: "Mercedes",
          modele: "classe c",
          energie: "electrique",
        },
      ],
    })
  );
}
*/
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
      showToast("Profil mis à jour");
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

let vehicules = [];

(async () => {
  vehicules = await getVehicules(user.id);
  user.vehicules = vehicules;
  sessionStorage.setItem("user", JSON.stringify(user));
  vehicules.forEach((vehicule) => {
    ajoutDivVehicule(vehicule);
  });
})();

// Génère le bloc HTML d’un véhicule (utilisé pour chaque véhicule ou pour l'ajout)

function ajoutDivVehicule(vehicule) {
  const div = document.createElement("div");
  div.className = "p-3";
  div.id = vehicule.id;
  div.innerHTML = `
    <h3>Véhicule ${vehicule.id} </h3>
            <p>${vehicule.immatriculation}</p>
            <p>${vehicule.marque}</p>
            <p>${vehicule.modele}</p>
            <p>${vehicule.couleur}</p>
            <p>${vehicule.dateImmat}</p>
            <p>${vehicule.energie}</p>
            <button class="btn btn-link shadow-none p-0 m-0">Supprimer</button>`;

  div.querySelector("button").addEventListener("click", () => {
    supprimerVehicule(user.id, vehicule.id);
  });

  vehiculeDiv.appendChild(div);
}

// Suppression d’un véhicule
//fonction pour suppression

async function supprimerVehicule(userId, vehiculeId) {
  try {
    const idVehiculeSupprime = await deleteVehicule(userId, vehiculeId);
    if (idVehiculeSupprime) {
      document.getElementById(idVehiculeSupprime).remove();
      const updatedVehicules = user.vehicules.filter((v) => v.id !== idVehiculeSupprime);
      user.vehicules = updatedVehicules;
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

// Ajout d’un véhicule

// Récupération des inputs du formulaire d’ajout véhicule

const marque = document.getElementById("marque");
const modele = document.getElementById("modele");
const energie = document.getElementById("energie");
const couleur = document.getElementById("couleur");
const immatriculation = document.getElementById("immatriculation");
const dateImmat = document.getElementById("dateImmat");

async function ajoutVehicule(userId) {
  const form = document.getElementById("form-ajout-vehicule");
  if (form.reportValidity()) {
    const vehicule = {
      marque: marque.value,
      modele: modele.value,
      energie: energie.value,
      dateImmat: dateImmat.value,
      immatriculation: immatriculation.value,
      couleur: couleur.value,
    };

    try {
      const response = await addVehicule(user.id, vehicule);
      if (response) {
        const modal = bootstrap.Modal.getInstance(document.getElementById("modalVehicule"));
        modal.hide();
        showToast(response.message);

        // Mise à jour des véhicules
        const updatedVehicules = await getVehicules(user.id);
        user.vehicules = updatedVehicules;
        sessionStorage.setItem("user", JSON.stringify(user));

        // Réaffichage
        vehiculeDiv.innerHTML = "";
        updatedVehicules.forEach((v) => ajoutDivVehicule(v));
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  }
}
// Ajout de l'ecouteur sur le bouton pour ajouter le véhicule

const btnAddVehicule = document.getElementById("addVehicule");
btnAddVehicule.addEventListener("click", () => {
  ajoutVehicule(user.id);
});

// ==========================
// GESTION DES COVOITURAGES
// ==========================
// Récupère et affiche les covoiturages proposés par l’utilisateur

const trajetPropose = document.getElementById("trajetPropose");
async function affichageTrajet() {
  try {
    const covoiturages = await getCovoituragesByUser(user.id);
    if (covoiturages.length > 0) {
      trajetPropose.innerHTML = "";
      covoiturages.forEach((covoiturage) => {
        if (covoiturage.conducteur_id === user.id) {
          createCovoiturageCard(covoiturage, trajetPropose);
        }
      });
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}
affichageTrajet();
// Récupère les covoiturages réservés : à venir → zone "Réservés", passés → zone "Passés"

const reserve = document.getElementById("reserve");
const passe = document.getElementById("passe");
async function affichageReservation() {
  // Date du jour pour différencier les covoiturages passés / à venir

  const today = new Date().toISOString().split("T")[0];
  try {
    const covoiturages = await getReservationByUser(user.id);
    if (covoiturages.length > 0) {
      propose.innerHTML = "";
      covoiturages.forEach((covoiturage) => {
        if (covoiturage.date >= today) {
          createCovoiturageCard(covoiturage, reserve);
        } else {
          createCovoiturageCard(covoiturage, passe);
        }
      });
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}
affichageReservation();
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
      window.location.href = "/"; //redirection a l'accueil
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

// GESTION DE LA PHOTO DE PROFIL
// récupération du fichier dans le champ input et envoi via l'API
const btnAddPhoto = document.getElementById("btnAddPhoto");

function addPhoto() {
  // Récupère le fichier sélectionné dans le champ "photo"
  const fichier = document.getElementById("photo").files[0];
  if (fichier) {
    if (fichier.size > 2 * 1024 * 1024) {
      showToast("Fichier trop lourd (max 2 Mo)", "error");
      return;
    } else {
      postPhoto(fichier);
    }
  }
}
btnAddPhoto.addEventListener("click", () => addPhoto());

const nomFichier = user.photo;
document.getElementById("photoProfil").src = `${apiUrl}/uploads/photos/${nomFichier}`;
document.getElementById("photoProfilMobile").src = `${apiUrl}/uploads/photos/${nomFichier}`;
