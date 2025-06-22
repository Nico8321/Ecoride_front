import { isEmpty, nettoyage, ajoutMessage, validator, inputValidator } from "./utils/inputValidator.js";
import { patchUserPassword } from "./api/user.js";
import { showToast } from "./components/toast.js";

const password = document.getElementById("password");
const newPassword = document.getElementById("newPassword");
const confirmePassword = document.getElementById("confirmePassword");
const formUpdatePassword = document.getElementById("formUpdatePassword");
const user = JSON.parse(sessionStorage.getItem("user"));
const btnUpdatePassword = document.getElementById("btnUpdatePassword");

//  1/ Verification du la complexité du mot de passe

newPassword.addEventListener("change", () => {
  inputValidator("newPassword");
});
password.addEventListener("change", () => {
  inputValidator("password");
});
confirmePassword.addEventListener("change", () => {
  inputValidator("confirmePassword");
});
// 2/ Vérifie que les deux mots de passe sont identiques

confirmePassword.addEventListener("change", () => {
  nettoyage(confirmePassword);
  if (newPassword.value !== confirmePassword.value) {
    ajoutMessage(confirmePassword, "les mots de passe doivent être identiques");
  }
});

// Vérifie  tous les champs du formulaire
function formulaireValide() {
  let isValid = true;
  const inputs = formUpdatePassword.querySelectorAll("input");

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

async function updatedPassword(userId, password, newPassword) {
  if (formUpdatePassword.reportValidity()) {
    try {
      const updatedPassword = await patchUserPassword(userId, password, newPassword);
      if (updatedPassword) {
        showToast("Le mot de passe a été mis à jour");
        window.location.href = "monCompte.html";
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  }
}

btnUpdatePassword.addEventListener("click", () => {
  updatedPassword(user.id, password.value, newPassword.value);
});
