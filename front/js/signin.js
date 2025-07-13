//import des fonctions pour validation du password et connexion

import { loginUser } from "./api/auth.js";
import { inputValidator } from "./utils/inputValidator.js";
import { isEmpty, nettoyage, ajoutMessage, validator } from "./utils/inputValidator.js";

const signin = document.getElementById("signin");
const password = document.getElementById("password");
const email = document.getElementById("email");
const bouton = document.getElementById("bouton");
// Vérifie le format de l'adresse email

email.addEventListener("change", () => {
  inputValidator("email");
});

function formulaireValide() {
  let isValid = true;
  const inputs = signin.querySelectorAll("input");

  inputs.forEach((input) => {
    nettoyage(input); // Nettoie l'affichage précédent
    if (isEmpty(input)) {
      ajoutMessage(input, "Le champ ne doit pas être vide");
      isValid = false;
    } else {
      validator(email); // Vérifie regex si besoin
      if (input.classList.contains("invalid")) {
        isValid = false;
      }
    }
  });

  return isValid;
}

bouton.addEventListener("click", () => {
  if (formulaireValide()) {
    loginUser(email.value, password.value);
  }
});
