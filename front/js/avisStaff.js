import { createAvisCardStaff } from "./components/avisCardStaff.js";
import { getAllAvisToCheck, accepterAvis, refusAvis } from "./api/avis.js";
import { showToast } from "./components/toast.js";

const containerAvis = document.getElementById("containerAvis");

async function afficherAvis() {
  try {
    const listeAvis = await getAllAvisToCheck();
    if (listeAvis.length === 0) {
      const h1 = document.createElement("h1");
      h1.textContent = "Aucun avis à valider";
      h1.className = "mt-5";
      h1.style.textAlign = "center";
      containerAvis.appendChild(h1);
      return;
    }
    listeAvis.forEach((avis) => {
      createAvisCardStaff(avis, containerAvis);
    });
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
afficherAvis();
async function validerAvis(id) {
  try {
    const response = await accepterAvis(id);
    if (response) {
      showToast(response.message);
      location.reload();
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
async function refuserAvis(id) {
  try {
    const response = await refusAvis(id);
    if (response) {
      showToast(response.message);
      location.reload();
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

containerAvis.addEventListener("click", (e) => {
  const btn = e.target.closest(".validerAvisBtn, .refuserAvisBtn");
  if (!btn) return;
  const id = btn.getAttribute("data-id");
  if (btn.classList.contains("validerAvisBtn")) return validerAvis(id);
  if (btn.classList.contains("refuserAvisBtn")) return refuserAvis(id);
});
