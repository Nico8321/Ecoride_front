import { inputValidator } from "./utils/inputValidator.js";

const telInput = document.getElementById("telephone");
telInput.addEventListener("change", () => {
  inputValidator("telephone");
});
