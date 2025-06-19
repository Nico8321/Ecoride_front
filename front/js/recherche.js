import { changeText } from "./utils/changeText.js";
import { verificationAdresse } from "./utils/verifAdresse.js";

verificationAdresse("depart", "suggestions-depart");
verificationAdresse("destination", "suggestions-destination");

const accordionButton = document.getElementById("accordionButton");
accordionButton.addEventListener("click", changeText);
