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
        { marque: "Bmw", modele: "serie 3", energie: "essence" },
        { marque: "Mercedes", modele: "classe a", energie: "hybride" },
        { marque: "Mercedes", modele: "classe c", energie: "electrique" },
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
