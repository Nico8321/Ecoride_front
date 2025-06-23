import { changeText } from "./utils/changeText.js";
import { verificationAdresse } from "./utils/verifAdresse.js";

const accordionButton = document.getElementById("accordionButton");

accordionButton.addEventListener("click", changeText);

//verification adresse depart et destination

verificationAdresse("depart", "suggestions-depart");
verificationAdresse("destination", "suggestions-destination");
