// Déclaration des regexs
const telRegex = /^(\+33|0033|0)(6|7)[0-9]{8}$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()\-_=+{}[\]|\\:;"'<>,.?/~`]).{8,}$/;
const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Déclaration des essages d’erreur
const messages = {
  tel: "Vérifier la saisie. Format attendu : 0612345678",
  password: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
  number: "Vérifier la saisie, seuls les chiffres sont acceptés",
  mail: "Vérifier la saisie, Format attendu : mail@domaine.com",
};

//  Fonction pour ajout du span avec message  sous l'input

export function ajoutMessage(input, message) {
  const span = document.createElement("span");
  span.textContent = message;
  span.id = "messageErreur";
  span.classList.add("text-danger", "small", "d-block", "mt-2");

  input.classList.add("invalid");
  input.parentNode.appendChild(span);
}

//  Supprime le span et les classes
export function nettoyage(input) {
  const next = input.nextElementSibling;
  if (next && next.id === "messageErreur") {
    next.remove();
  }
  input.classList.remove("invalid");
}

//  fonction pour la vérification des inputs

export function validator(input) {
  const type = input.type;
  nettoyage(input);

  if (type === "password" && !passwordRegex.test(input.value)) {
    ajoutMessage(input, messages.password);
  } else if (type === "tel" && !telRegex.test(input.value)) {
    ajoutMessage(input, messages.tel);
  } else if (type === "email" && !mailRegex.test(input.value)) {
    ajoutMessage(input, messages.mail);
  }
}
//  Fonction centrale à appeler dans les pages
export function inputValidator(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  validator(input);
}

export function isEmpty(input) {
  return input.value.trim() === "";
}
