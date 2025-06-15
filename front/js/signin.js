//import des fonctions pour validation du password et connexion

//import { loginUser } from "./api/auth";
import { inputValidator } from "./utils/inputValidator.js";
import { isEmpty, nettoyage, ajoutMessage, validator } from "./utils/inputValidator.js";

const password = document.getElementById("password");
const email = document.getElementById("email");
const button = document.getElementById("connexion");

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
      validator(input); // Vérifie regex si besoin
      if (input.classList.contains("invalid")) {
        isValid = false;
      }
    }
  });

  return isValid;
}
button.addEventListener("click", () => {
  if (formulaireValide()) {
    //loginUser(email.value, password.value);
    console.log("ok");
  }
});
