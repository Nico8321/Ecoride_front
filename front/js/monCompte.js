import { getReservationByUser, getReservationsByCovoiturage, deleteReservation } from "./api/reservation.js";
import { getCovoituragesByUser } from "./api/covoiturage.js";
import { addVehicule, deleteUser, deleteVehicule, postPhoto, getVehicules, patchUser } from "./api/user.js";
import { createCovoiturageCard } from "./components/covoiturageCard.js";
import { createReservationCard } from "./components/ReservationCard.js";
import { createAvisCard } from "./components/AvisCard.js";
import { createReservationValidationCard } from "./components/reservationValidationCard.js";
import { inputValidator } from "./utils/inputValidator.js";
import { showToast } from "./components/toast.js";
import { apiUrl } from "./config.js";
import { getAvisByCovoiturage, getMoyenneByUser, postAvis, changeStatut } from "./api/avis.js";

// ==========================
// GESTION DES INFOS DE L'USER
// ==========================

// Récupération de l'user depuis le sessionStorage

const données = ["pseudo", "nom", "prenom", "adresse", "telephone"];
const user = JSON.parse(sessionStorage.getItem("user"));
// ajout de la note au sessionStorage
const userId = user.id;

async function ajouterNoteUser() {
  try {
    const note = await getMoyenneByUser(userId);
    user.note = note;
    sessionStorage.setItem("user", JSON.stringify(user));
    sidebarNote.innerText = note.moyenne;
    sidebarNoteM.innerText = note.moyenne;
  } catch (error) {
    console.error("Erreur lors de la récupération de la note :", error);
  }
}
ajouterNoteUser();
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

const covoituragePropose = document.getElementById("covoituragePropose");
const historiqueCovoiturage = document.getElementById("historiqueCovoiturage");
async function affichageCovoiturage() {
  try {
    const covoiturages = await getCovoituragesByUser(user.id);
    if (covoiturages.length > 0) {
      covoituragePropose.innerHTML = "";
      covoiturages.forEach((covoiturage) => {
        if (covoiturage.conducteur_id === user.id) {
          if (covoiturage.statut === "termine") {
            createCovoiturageCard(covoiturage, historiqueCovoiturage);
            getAvisByCovoiturage(covoiturage.id)
              .then((avis) => {
                createAvisCard(avis, historiqueCovoiturage);
              })
              .catch((error) => {
                console.error("Erreur lors de la récupération des avis :", error);
              });
          } else {
            const card = createCovoiturageCard(covoiturage, covoituragePropose);
            const module = document.getElementById(`moduleCovoiturage${covoiturage.id}`);
            if (module) {
              getReservationsByCovoiturage(covoiturage.id)
                .then((reservations) => {
                  if (reservations.length > 0) {
                    const statuts = {
                      "en attente": [],
                      confirme: [],
                      refuse: [],
                    };

                    reservations.forEach((reservation) => {
                      if (statuts[reservation.statut]) {
                        statuts[reservation.statut].push(reservation);
                      }
                    });

                    for (const [statut, liste] of Object.entries(statuts)) {
                      if (liste.length > 0) {
                        const section = document.createElement("div");
                        section.className = "p-3";

                        const titre = {
                          "en attente": "Réservations en attente",
                          confirme: "Réservations acceptées",
                          refuse: "Réservations refusées",
                        };

                        section.innerHTML = `<h5>${titre[statut]}</h5>`;

                        liste.forEach((reservation) => {
                          createReservationValidationCard(reservation, section);
                        });

                        module.appendChild(section);
                      }
                    }
                  }
                })
                .catch((error) => {
                  console.error("Erreur lors de la récupération des réservations :", error);
                });
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}
affichageCovoiturage();

// ==========================
// GESTION DES RESERVATIONS
// ==========================
// Récupère les covoiturages réservés :

const reservationsEnCours = document.getElementById("reservationsEnCours");
const historiqueReservations = document.getElementById("historiqueReservations");

async function affichageReservation() {
  // Date du jour pour différencier les covoiturages passés / à venir

  const today = new Date().toISOString().split("T")[0];
  try {
    const reservations = await getReservationByUser(user.id);
    if (reservations.length > 0) {
      reservationsEnCours.innerHTML = "";
      reservations.forEach((reservation) => {
        if (reservation.covoiturage.date_depart >= today) {
          createReservationCard(reservation, reservationsEnCours);
        } else {
          createReservationCard(reservation, historiqueReservations);
        }
      });
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

affichageReservation();

// ==========================
// GESTION DES AVIS
// ==========================

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("btn-open-modal-avis")) {
    const covoiturageId = e.target.getAttribute("data-covoiturage-id");
    const conducteurId = e.target.getAttribute("data-conducteur-id");
    const utilisateurId = e.target.getAttribute("data-utilisateur-id");

    document.getElementById("avisCovoiturageId").value = covoiturageId;
    document.getElementById("avisConducteurId").value = conducteurId;
    document.getElementById("avisAuteurId").value = utilisateurId;
  }

  if (e.target && e.target.id === "btnPostAvis") {
    envoyerAvis();
  }
});

async function envoyerAvis() {
  const avisCovoiturageId = document.getElementById("avisCovoiturageId");
  const avisAuteurId = document.getElementById("avisAuteurId");
  const noteAvis = document.getElementById("noteAvis");
  const commentaireAvis = document.getElementById("commentaireAvis");
  // Création de l'objet avis
  const avis = {
    conducteur_id: document.getElementById("avisConducteurId").value,
    covoiturage_id: avisCovoiturageId.value,
    auteur_id: avisAuteurId.value,
    note: noteAvis.value,
    commentaire: commentaireAvis.value,
  };
  try {
    const response = await postAvis(avis);
    if (response) {
      showToast("Avis publié avec succès");
      const modalAvis = bootstrap.Modal.getInstance(document.getElementById("deposerAvisModal"));
      if (modalAvis) {
        modalAvis.hide();
      }
    }
  } catch (error) {
    console.error("Erreur lors de la publication de l'avis :", error);
  }
}

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

document.querySelectorAll("[data-scroll]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("data-scroll");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// suppression d'une ancienne réservation via l'API
async function supprimerReservation(reservationId) {
  try {
    const response = await deleteReservation(reservationId);
    if (response) {
      showToast(response.message); //toast de confirmation
      const modal = bootstrap.Modal.getInstance(document.getElementById("deleteReservationModal"));
      modal.hide();
    }
  } catch (error) {
    showToast(error.message, "error"); //toast d'erreur
  }
}
const deleteBtn = document.querySelector("#deleteOldReservation");

// récupération de l'id de réservation à supprimer (ancienne résa)
deleteBtn.addEventListener("click", () => {
  const reservationId = deleteBtn.getAttribute("data-id");
  supprimerReservation(reservationId);
});

// modification du statut d'une réservation (confirme ou refuse)
async function changeStatutReservation(reservationId, statut) {
  try {
    const response = await changeStatut(reservationId, statut);
    if (response) {
      showToast(response.message); //toast de confirmation
      const modal = bootstrap.Modal.getInstance(document.getElementById("validationReservationModal"));
      modal.hide();
    }
  } catch (error) {
    showToast(error.message, "error"); //toast d'erreur
  }
}

const modal = document.getElementById("validationReservationModal");
const confirmBtn = modal.querySelector("#btnAccepterReservation");
const refuseBtn = modal.querySelector("#btnRefuserReservation");

// injection de l'id de la réservation dans les boutons de la modal
modal.addEventListener("show.bs.modal", function (event) {
  const trigger = event.relatedTarget;
  const reservationId = trigger.getAttribute("data-reservation-id");

  confirmBtn.dataset.idReservation = reservationId;
  refuseBtn.dataset.idReservation = reservationId;
});

// ajout des écouteurs pour changer le statut via la modal (acceptation)
confirmBtn.addEventListener("click", () => {
  changeStatutReservation(confirmBtn.dataset.idReservation, "confirme");
});

// ajout des écouteurs pour changer le statut via la modal (refus)
refuseBtn.addEventListener("click", () => {
  changeStatutReservation(refuseBtn.dataset.idReservation, "refuse");
});
