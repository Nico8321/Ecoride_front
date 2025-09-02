import {
  getReservationByUser,
  getReservationsByCovoiturage,
  deleteReservation,
  accepterReservation,
  refuserReservation,
  terminerReservation,
  annulerReservation,
} from "./api/reservation.js";
import { getCovoituragesByUser, annulerCovoiturage, demarreCovoiturage, termineCovoiturage } from "./api/covoiturage.js";
import { addVehicule, deleteUser, deleteVehicule, postPhoto, getVehicules, patchUser } from "./api/user.js";
import { createCovoiturageCard } from "./components/covoiturageCard.js";
import { createReservationCard } from "./components/ReservationCard.js";
import { createAvisCard } from "./components/AvisCard.js";
import { createReservationValidationCard } from "./components/reservationValidationCard.js";
import { inputValidator } from "./utils/inputValidator.js";
import { showToast } from "./components/toast.js";
import { apiUrl } from "./config.js";
import { getAvisByCovoiturage, getMoyenneByUser, postAvis } from "./api/avis.js";

// 1. GESTION DES INFOS DE L'USER
// ───────────────────────────────

// Récupération de l'user depuis le sessionStorage

const données = ["pseudo", "nom", "prenom", "adresse", "telephone"];
const user = JSON.parse(sessionStorage.getItem("user"));
// ajout de la note au sessionStorage
const userId = user.id;

// ajouterNoteUser : récupérer et afficher la note de l'utilisateur

async function ajouterNoteUser() {
  try {
    const note = await getMoyenneByUser(userId);
    if (note.moyenne == null) {
      user.note = "Aucune note";
    } else {
      user.note = note.moyenne;
    }
    sessionStorage.setItem("user", JSON.stringify(user));
    sidebarNote.innerText = user.note;
    sidebarNoteM.innerText = user.note;
  } catch (error) {
    showToast("Erreur lors de la récupération de la note", "danger");
  }
}
ajouterNoteUser();
//remplissage des champs

// inputIncrement : remplir les champs du formulaire avec les données utilisateur

function inputIncrement() {
  données.forEach((key) => {
    const input = document.getElementById(key);
    if (input) input.value = user[key];
  });
}
inputIncrement();
// updateUser : envoyer les modifications du profil au serveur

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
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalValidation"));
      modal.hide();
      showToast("Profil mis à jour");
    } catch (error) {
      showToast(`Erreur : ${error.message}`, "danger");
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

// 2. GESTION DES VÉHICULES
// ──────────────────────────

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

// ajoutDivVehicule : générer et afficher une carte de véhicule

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

// supprimerVehicule : supprimer un véhicule et mettre à jour l'affichage

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
    showToast(`Erreur : ${error.message}`, "danger");
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

// ajoutVehicule : envoyer un nouveau véhicule au backend et rafraîchir la liste

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
      showToast(`Erreur : ${error.message}`, "danger");
    }
  }
}
// Ajout de l'ecouteur sur le bouton pour ajouter le véhicule

const btnAddVehicule = document.getElementById("addVehicule");
btnAddVehicule.addEventListener("click", () => {
  ajoutVehicule(user.id);
});

// 3. GESTION DES COVOITURAGES
// ────────────────────────────
// affichageCovoiturage : récupérer et afficher les covoiturages de l'utilisateur

const covoituragePropose = document.getElementById("covoituragePropose");
const historiqueCovoiturage = document.getElementById("historiqueCovoiturage");
async function affichageCovoiturage() {
  try {
    const covoiturages = await getCovoituragesByUser(user.id);
    if (covoiturages.length > 0) {
      covoituragePropose.innerHTML = "";
      historiqueCovoiturage.innerHTML = "";
      covoiturages.forEach((covoiturage) => {
        if (covoiturage.conducteur_id === user.id) {
          if (covoiturage.statut === "termine") {
            const card = createCovoiturageCard(covoiturage, historiqueCovoiturage);
            getAvis(covoiturage.id, card);
          } else {
            const card = createCovoiturageCard(covoiturage, covoituragePropose);
            const module = document.getElementById(`moduleCovoiturage${covoiturage.id}`);
            if (module) {
              getReservationsByCovoiturage(covoiturage.id, user.id)
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
                  showToast(`Erreur : ${error.message}`, "danger");
                });
            }
          }
        }
      });
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

affichageCovoiturage();
async function getAvis(covoiturageId, destination) {
  try {
    const liste = await getAvisByCovoiturage(covoiturageId);
    if (liste) {
      liste.forEach((avis) => createAvisCard(avis, destination));
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
// 4. DEMARRER UN COVOITURAGE
// ───────────────────────────────
// demarrerCovoiturageModal : préparer l'ID pour la modal d'annulation

const demarrerCovoiturageModal = document.getElementById("demarrerCovoiturageModal");
demarrerCovoiturageModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const covoiturageId = button.getAttribute("data-id");
  const btnDemarrerCovoiturage = document.getElementById("btnDemarrerCovoiturage");
  btnDemarrerCovoiturage.dataset.id = covoiturageId;
});

// demarrerCovoiturage : appeler l'API pour demarrer un covoiturage et rafraîchir l'affichage

async function demarrerCovoiturage(userId, covoiturageId) {
  try {
    const response = await demarreCovoiturage(userId, covoiturageId);
    if (response) {
      showToast(response.message); //toast de confirmation
      const modal = bootstrap.Modal.getInstance(document.getElementById("demarrerCovoiturageModal"));
      modal.hide();
      affichageCovoiturage();
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger"); //toast d'erreur
  }
}

btnDemarrerCovoiturage.addEventListener("click", () => {
  demarrerCovoiturage(userId, btnDemarrerCovoiturage.dataset.id);
});
// 5. TERMINER UN COVOITURAGE
// ───────────────────────────────
// terminerCovoiturageModal : préparer l'ID pour la modal

const terminerCovoiturageModal = document.getElementById("terminerCovoiturageModal");
terminerCovoiturageModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const covoiturageId = button.getAttribute("data-id");
  const btnTerminerCovoiturage = document.getElementById("btnTerminerCovoiturage");
  btnTerminerCovoiturage.dataset.id = covoiturageId;
});

// demarrerCovoiturage : appeler l'API pour demarrer un covoiturage et rafraîchir l'affichage

async function terminerCovoiturage(userId, covoiturageId) {
  try {
    const response = await termineCovoiturage(userId, covoiturageId);
    if (response) {
      showToast(response.message); //toast de confirmation
      const modal = bootstrap.Modal.getInstance(document.getElementById("terminerCovoiturageModal"));
      modal.hide();
      affichageCovoiturage();
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

btnTerminerCovoiturage.addEventListener("click", () => {
  terminerCovoiturage(userId, btnTerminerCovoiturage.dataset.id);
});

// 5. ANNULATION D'UN COVOITURAGE
// ───────────────────────────────
// annulationCovoiturageModal : préparer l'ID pour la modal d'annulation

const annulationCovoiturageModal = document.getElementById("annulationCovoiturageModal");
annulationCovoiturageModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const covoiturageId = button.getAttribute("data-id");
  const btnConfirmationAnnulation = document.getElementById("btnConfirmationAnnulation");
  btnConfirmationAnnulation.dataset.id = covoiturageId;
});

// annulationCovoiturage : appeler l'API pour annuler un covoiturage et rafraîchir l'affichage

async function annulationCovoiturage(userId, covoiturageId) {
  try {
    const response = await annulerCovoiturage(userId, covoiturageId);
    if (response) {
      showToast(response.message); //toast de confirmation
      const modal = bootstrap.Modal.getInstance(document.getElementById("annulationCovoiturageModal"));
      modal.hide();
      affichageCovoiturage();
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

btnConfirmationAnnulation.addEventListener("click", () => {
  annulationCovoiturage(userId, btnConfirmationAnnulation.dataset.id);
});

// 6. GESTION DES RÉSERVATIONS
// ─────────────────────────────
// affichageReservation : récupérer et afficher les réservations passées et à venir

const reservationsEnCours = document.getElementById("reservationsEnCours");
const historiqueReservations = document.getElementById("historiqueReservations");

async function affichageReservation() {
  // Date du jour pour différencier les covoiturages passés / à venir

  const today = new Date().toISOString().split("T")[0];
  try {
    const reservations = await getReservationByUser(user.id);
    if (reservations.length > 0) {
      reservationsEnCours.innerHTML = "";
      historiqueReservations.innerHTML = "";
      reservations.forEach((reservation) => {
        if (reservation.covoiturage.date_depart >= today) {
          createReservationCard(reservation, reservationsEnCours);
        } else {
          createReservationCard(reservation, historiqueReservations);
        }
      });
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

affichageReservation();

// supprimerReservation : appeler l'API pour supprimer une ancienne réservation et rafraîchir

async function supprimerReservation(reservationId, userId) {
  try {
    const response = await deleteReservation(reservationId, userId);
    if (response) {
      showToast(response.message); //toast de confirmation
      const modal = bootstrap.Modal.getInstance(document.getElementById("deleteReservationModal"));
      modal.hide();
      affichageReservation();
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
const deleteBtn = document.querySelector("#deleteOldReservation");

// récupération de l'id de réservation à supprimer (ancienne résa)
deleteBtn.addEventListener("click", () => {
  const reservationId = deleteBtn.getAttribute("data-id");
  supprimerReservation(reservationId, userId);
});

// annulationReservation : appeler l'API pour annuler une réservation et rafraîchir

const annulationReservationModal = document.getElementById("annulationReservationModal");
annulationReservationModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const reservationId = button.getAttribute("data-id");
  const btnAnnulerReservation = document.getElementById("btnAnnulerReservation");
  btnAnnulerReservation.dataset.id = reservationId;
});

async function annulationReservation(reservationId, userId) {
  try {
    const response = await annulerReservation(reservationId, userId);
    if (response) {
      showToast(response.message); //toast de confirmation
      const modal = bootstrap.Modal.getInstance(document.getElementById("annulationReservationModal"));
      modal.hide();
      affichageReservation();
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
const btnAnnulerReservation = document.querySelector("#btnAnnulerReservation");

// récupération de l'id de réservation à supprimer (ancienne résa)
btnAnnulerReservation.addEventListener("click", () => {
  const reservationId = btnAnnulerReservation.getAttribute("data-id");
  annulationReservation(reservationId, user.id);
});

// changeStatutReservation : mettre à jour le statut d'une réservation et rafraîchir

async function changeStatutReservation(reservationId, statut) {
  if (statut === "confirme") {
    try {
      const response = await accepterReservation(reservationId, userId);
      if (response) {
        showToast(response.message); //toast de confirmation
        const modal = bootstrap.Modal.getInstance(document.getElementById("validationReservationModal"));
        modal.hide();
        affichageCovoiturage();
      }
    } catch (error) {
      showToast(`Erreur : ${error.message}`, "danger");
    }
  } else if (statut === "refuse") {
    try {
      const response = await refuserReservation(reservationId, userId);
      if (response) {
        showToast(response.message); //toast de confirmation
        const modal = bootstrap.Modal.getInstance(document.getElementById("validationReservationModal"));
        modal.hide();
        affichageCovoiturage();
      }
    } catch (error) {
      showToast(`Erreur : ${error.message}`, "danger");
    }
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

// TERMINER RESERVATION: declarer la fin d'une reservation ou un litige

async function validerFinReservation(reservationId) {
  try {
    const response = await terminerReservation(reservationId, userId);
    if (response) {
      showToast(response.message); //toast de confirmation
      const modal = bootstrap.Modal.getInstance(document.getElementById("feedbackModal"));
      modal.hide();
      affichageCovoiturage();
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

//redirection vers page Litige

function redirectionlitige(reservationId) {
  const query = new URLSearchParams();
  query.append("reservationId", reservationId);

  window.location.href = `/signalerProbleme?${query.toString()}`;
}

// injection de l'id de la réservation dans les boutons de la modal
feedbackModal.addEventListener("show.bs.modal", function (event) {
  const trigger = event.relatedTarget;
  const reservationId = trigger.getAttribute("data-reservation-id");

  btnTerminerReservation.dataset.idReservation = reservationId;
  btnLitigeReservation.dataset.idReservation = reservationId;
});

// ajout des écouteurs pour terminer la reservation via la modal
btnTerminerReservation.addEventListener("click", () => {
  validerFinReservation(btnTerminerReservation.dataset.idReservation);
});

// ajout des écouteurs pour changer declarer un litige
btnLitigeReservation.addEventListener("click", () => {
  redirectionlitige(btnLitigeReservation.dataset.idReservation);
});

// 7. GESTION DES AVIS
// ────────────────────

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

// envoyerAvis : envoyer un nouvel avis au backend et fermer la modal

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
    const response = await postAvis(avis, userId);
    if (response) {
      showToast("Avis publié avec succès");
      const modalAvis = bootstrap.Modal.getInstance(document.getElementById("deposerAvisModal"));
      if (modalAvis) {
        modalAvis.hide();
      }
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

// 8. DÉSINSCRIPTION UTILISATEUR
// ───────────────────────────────
// desinscription : supprimer le compte utilisateur et rediriger

async function desinscription(userId) {
  try {
    const response = await deleteUser(userId);
    if (response) {
      showToast(response.message); //toast de confirmation
      sessionStorage.clear(); //suppression de l'user dans sessionStorage
      window.location.href = "/"; //redirection a l'accueil
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

// Ajout de l'ecouteur sur le bouton pour confirmer la desinscription
const deleteUserBtn = document.getElementById("deleteUserBtn");
deleteUserBtn.addEventListener("click", () => {
  desinscription(user.id);
});

// 9. PHOTO DE PROFIL
// ───────────────────
// addPhoto : récupération du fichier dans le champ input et envoi via l'API

const btnAddPhoto = document.getElementById("btnAddPhoto");

function addPhoto() {
  // Récupère le fichier sélectionné dans le champ "photo"
  const fichier = document.getElementById("photo").files[0];
  if (fichier) {
    if (fichier.size > 2 * 1024 * 1024) {
      showToast("Fichier trop lourd (max 2 Mo)", "warning");
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
