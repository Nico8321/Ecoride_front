import { createAvisCardStaff } from "./components/avisCardStaff";
import { getAllAvisToCheck } from "./api/avis.js";
import { showToast } from "./components/toast.js";

const containerAvis = document.getElementById("containerAvis");

async function affichageAvis() {
  try {
    listeAvis = await getAllAvisToCheck();
    listeAvis.forEach((avis) => {
      createAvisCardStaff(avis, containerAvis);
    });
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
