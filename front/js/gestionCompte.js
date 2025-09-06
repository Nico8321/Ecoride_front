import { getAllUtilisateur, newEmploye, suspendreUser, reactiverUser } from "./api/user.js";
import { showToast } from "./components/toast.js";
import { inputValidator, isEmpty, nettoyage, ajoutMessage, validator } from "./utils/inputValidator.js";

//////////
//gestion de la navbar
//////////

const filtres = document.getElementById("filtres");
const sections = [document.getElementById("liste"), document.getElementById("ajouter")];

sections.forEach((sec) => sec.classList.toggle("d-none", sec.id !== "liste"));

filtres.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filtre]");
  if (!btn) return;

  filtres.querySelectorAll("button").forEach((b) => b.classList.remove("active", "btn-primary"));
  btn.classList.add("active", "btn-primary");

  const cible = btn.dataset.filtre;
  sections.forEach((sec) => sec.classList.toggle("d-none", sec.id !== cible));
});

const thead = document.querySelector("thead tr");
const tbody = document.getElementById("tbody");

//fonction affichage du listing d'user

async function afficherUtilisateur() {
  tbody.innerHTML = "";
  thead.innerHTML = "";
  try {
    const utilisateurs = await getAllUtilisateur();
    if (!utilisateurs.length) {
      return showToast("Aucune donnée à afficher");
    }
    const keys = Object.keys(utilisateurs[0]);
    keys.forEach((key) => {
      let th = document.createElement("th");
      th.scope = "col";
      th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
      thead.appendChild(th);
    });
    let th = document.createElement("th");
    th.scope = "col";
    th.textContent = "Suspendre";
    thead.appendChild(th);

    utilisateurs.forEach((u) => {
      const tab = Object.values(u);
      createRow(tab, tbody);
    });
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

// function pour création des lignes du tableau

function createRow(u, destination) {
  let tr = document.createElement("tr");
  destination.appendChild(tr);
  let th = document.createElement("th");
  tr.appendChild(th);
  th.textContent = u[0];
  th.scope = "row";
  for (let i = 1; i < u.length; i++) {
    let td = document.createElement("td");
    td.textContent = u[i];
    td.classList.add("text-center");
    tr.appendChild(td);
  }
  let td = document.createElement("td");
  let button = document.createElement("button");
  td.appendChild(button);
  button.dataset.userId = u[0];
  if (u[6] == 1) {
    button.title = "Suspendre cet utilisateur";
    button.classList.add("btn", "btn-outline-danger", "btn-sm", "rounded-pill");
    button.innerHTML = '<i class="bi bi-slash-circle"></i> Suspendre';
    button.dataset.bsToggle = "modal";
    button.dataset.bsTarget = "#modalSuspension";
  } else if (u[6] == 0) {
    button.classList.add("btn", "btn-outline-success", "btn-sm", "rounded-pill");
    button.title = "Réactiver cet utilisateur";
    button.innerHTML = '<i class="bi bi-check-circle "></i> Réactiver';
    button.dataset.bsToggle = "modal";
    button.dataset.bsTarget = "#modalReactivation";
  }
  tr.appendChild(td);
}

//appelle de la fonction pour l'affichage
afficherUtilisateur();

///////////
//section ajout employé
//////////

//function pour la verification du formulaire
function formulaireValide(form) {
  let isValid = true;
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    nettoyage(input); // Nettoie l'affichage précédent
    if (isEmpty(input)) {
      ajoutMessage(input, "Le champ ne doit pas être vide");
      isValid = false;
    } else {
      validator(input); // Vérifie regex si besoin
      if (input.classList.contains("invalid")) {
        isValid = false;
      }
    }
  });

  return isValid;
}
//function pour generer un mot de pass aléatoire
const chaineAleatoire = (nbChar) => {
  let chaine = "";
  while (chaine.length < nbChar) chaine += Math.random().toString(36).slice(2);
  return chaine.slice(0, nbChar);
};

// Ajout d'utilisateur employé
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const email = document.getElementById("email");
email.addEventListener("input", () => {
  inputValidator("email");
});

// fonction pour l'ajout d'employé

async function addEmploye() {
  const pwd = chaineAleatoire(12);
  const employe = {
    nom: nom.value.trim(),
    prenom: prenom.value.trim(),
    email: email.value.trim(),
    password: pwd,
  };
  try {
    const res = await newEmploye(employe);
    if (res) {
      alert(`mot de passe employé pour ${employe.prenom} ${employe.nom} : ${employe.password}`);
    }
    nom.value = "";
    prenom.value = "";
    email.value = "";
    await afficherUtilisateur();
    showToast(res.message);
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

//recup du form
const addEmployeForm = document.getElementById("addEmployeForm");

//recup du bouton
const ajouterEmployeBtn = document.getElementById("ajouterEmployeBtn");
ajouterEmployeBtn.addEventListener("click", () => {
  if (formulaireValide(addEmployeForm)) {
    addEmploye();
  }
});

///////////
// Suspension de compte
///////////

const modalSuspension = document.getElementById("modalSuspension");

// transfert de l'id au bouton
modalSuspension.addEventListener("show.bs.modal", (event) => {
  const triggerBtn = event.relatedTarget;

  const userId = triggerBtn ? triggerBtn.dataset.userId : null;

  const btnSuspendre = document.getElementById("btnSuspendre");
  btnSuspendre.dataset.userId = userId;
});

const btnSuspendre = document.getElementById("btnSuspendre");
btnSuspendre.addEventListener("click", async () => {
  const userId = btnSuspendre.dataset.userId;
  await suspendreCompte(userId);

  // Fermeture modal
  const modal = bootstrap.Modal.getInstance(modalSuspension);
  if (modal) modal.hide();
});
//fonction de suspension de compte
async function suspendreCompte(userId) {
  try {
    const data = await suspendreUser(userId);
    showToast(data.message);
    await afficherUtilisateur();
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
///////////
// Réactivation de compte
///////////

const modalReactivation = document.getElementById("modalReactivation");

// transfert de l'id au bouton
modalReactivation.addEventListener("show.bs.modal", (event) => {
  const triggerBtn = event.relatedTarget;

  const userId = triggerBtn ? triggerBtn.dataset.userId : null;

  const btnActiver = document.getElementById("btnActiver");
  btnActiver.dataset.userId = userId;
});

const btnActiver = document.getElementById("btnActiver");
btnActiver.addEventListener("click", async () => {
  const userId = btnActiver.dataset.userId;
  await reactiverCompte(userId);

  // Fermeture modal
  const modal = bootstrap.Modal.getInstance(modalReactivation);
  if (modal) modal.hide();
});
//fonction de réactivation de compte
async function reactiverCompte(userId) {
  try {
    const data = await reactiverUser(userId);
    showToast(data.message);
    await afficherUtilisateur();
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
