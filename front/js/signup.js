// signup.js
// Gère la validation du formulaire d'inscription côté client :
// - Vérifie les champs vides
// - Valide l'email et le mot de passe
// - Affiche les messages d'erreur dynamiquement

// Imports des fonctions de validation depuis utils

import { newUser } from "./api/auth.js";
import { inputValidator } from "./utils/inputValidator.js";
import { isEmpty, nettoyage, ajoutMessage, validator } from "./utils/inputValidator.js";

// Récuperation des champs

const pseudo = document.getElementById("pseudo");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmePassword = document.getElementById("confirmePassword");
const button = document.getElementById("envoyer");
const signup = document.getElementById("signup");

// Vérification des mots de passe

//  1/ Verification du la complexité du mot de passe

password.addEventListener("change", () => {
  inputValidator("password");
});

// 2/ Vérifie que les deux mots de passe sont identiques

confirmePassword.addEventListener("change", () => {
  nettoyage(confirmePassword);
  if (password.value !== confirmePassword.value) {
    ajoutMessage(confirmePassword, "les mots de passe doivent être identiques");
  }
});

// Vérifie le format de l'adresse email

email.addEventListener("change", () => {
  inputValidator("email");
});

// Vérifie  tous les champs du formulaire

function formulaireValide() {
  let isValid = true;
  const inputs = signup.querySelectorAll("input");

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

// Lors du clic sur le bouton, on vérifie les champs vides

button.addEventListener("click", () => {
  if (formulaireValide()) {
    const user = {
      pseudo: pseudo.value,
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      password: password.value,
    };
    newUser(user);
  }
});
