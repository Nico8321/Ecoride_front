//Import de la fonction pour validfation du password
import { inputValidator } from "../utils/inputValidator.js";
import { isEmpty, nettoyage, ajoutMessage } from "../utils/inputValidator.js";
//verification du la complexité du mot de passe

const passwordInput = document.getElementById("password");
passwordInput.addEventListener("change", () => {
  inputValidator("password");
});

// Récuperation des champs
const pseudo = document.getElementById("pseudo");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmePassword = document.getElementById("confirmePassword");
const button = document.getElementById("envoyer");
const signup = document.getElementById("signup");

// Vérification de la saisie de mdp

confirmePassword.addEventListener("change", () => {
  nettoyage(confirmePassword);
  if (password.value !== confirmePassword.value) {
    ajoutMessage(confirmePassword, "les mots de passe doivent être identiques");
  }
});

// Vérification des champs vide
function verificationChamps() {
  const inputs = signup.querySelectorAll("input");
  inputs.forEach((input) => {
    nettoyage(input);
    if (isEmpty(input)) {
      ajoutMessage(input, "Le champ ne doit pas etre vide ");
    }
  });
}

button.addEventListener("click", () => {
  verificationChamps();
});
