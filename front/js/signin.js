//imort de la fonction pour validfation du password
import { inputValidator } from "./utils/inputValidator.js";

const passwordInput = document.getElementById("password");
passwordInput.addEventListener("change", () => {
  inputValidator("password");
});
