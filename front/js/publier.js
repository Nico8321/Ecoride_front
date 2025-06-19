import { verificationAdresse } from "./utils/verifAdresse.js";
import { isLoggedIn } from "./auth/authHelper.js";
import { postTrajet } from "./api/trajet.js";

// Lancement de l'autocomplétion sur les champs départ et destination
verificationAdresse("depart", "suggestions-depart");
verificationAdresse("destination", "suggestions-destination");

// Récupération des véhicules de l'utilisateur connecté
const vehiculeSelect = document.getElementById("vehicule");
const user = JSON.parse(sessionStorage.getItem("user"));
const vehicules = user.vehicule;

// Ajout des véhicules dans la liste si y en a

if (vehicules) {
  vehicules.forEach((vehicule) => {
    const option = document.createElement("option");
    option.innerText = `
          ${vehicule.marque},
          ${vehicule.modele},
          ${vehicule.energie}`;
    option.value = vehicule.id;

    vehiculeSelect.appendChild(option);
  });
} else {
  // Affichage d’un message si aucun véhicule dispo
  const option = document.createElement("option");
  option.innerText = "Aucun véhicule enregistré";
  option.disabled = true;
  option.selected = true;
  vehiculeSelect.appendChild(option);
}

const form = document.getElementById("form_publier");
const publierBtn = document.getElementById("publierBtn");

//fonction pour l'envoi du formulaire

const depart = document.getElementById("depart");
const destination = document.getElementById("destination");
const d_date = document.getElementById("d_date");
const d_time = document.getElementById("d_time");
const nbPlace = document.getElementById("nb_places");
const prix = document.getElementById("prix");
const vehicule = document.getElementById("vehicule");
const fumeur = document.getElementById("fumeur");
const animaux = document.getElementById("animaux");

const trajet = {
  depart: depart.value,
  destination: destination.value,
  d_date: d_date.value,
  d_time: d_time.value,
  nbPlace: nbPlace.value,
  prix: prix.value,
  vehicule: vehicule.value,
  fumeur: fumeur.value,
  animaux: animaux.value,
  conducteur_id: user.id,
};

// Gestion du clic sur publier : vérification du formulaire et de la connexion
publierBtn.addEventListener("click", async () => {
  const loggedIn = await isLoggedIn();
  if (form.reportValidity()) {
    if (!loggedIn) {
      // Redirection vers la connexion si l'utilisateur est pas connecté
      window.location.href = "signin.html";
    } else {
      const trajet = {
        depart: depart.value,
        destination: destination.value,
        d_date: d_date.value,
        d_time: d_time.value,
        nbPlace: nbPlace.value,
        prix: prix.value,
        vehicule: vehicule.value,
        fumeur: fumeur.value,
        animaux: animaux.value,
        conducteur_id: user.id,
      };
      // Envoi des infos du trajet si tout est bon
      try {
        const res = await postTrajet(trajet);
        alert("Trajet créé avec succès");
        window.location.href = "monCompte.html";
      } catch (error) {
        console.error("Erreur:", error.message);
      }
    }
  }
});
