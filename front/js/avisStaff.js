import { createAvisCardStaff } from "./components/avisCardStaff.js";
import { getAllAvisToCheck, checkAvis } from "./api/avis.js";
import { showToast } from "./components/toast.js";

const containerAvis = document.getElementById("containerAvis");

async function afficherAvis() {
  try {
    const listeAvis = await getAllAvisToCheck();
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
    const response = await checkAvis(id, "accepter");
    if (response) {
      showToast(response.message);
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
async function refuserAvis(id) {
  try {
    const response = await checkAvis(id, "refuser");
    if (response) {
      showToast(response.message);
    }
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

document.querySelectorAll(".validerAvisBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    validerAvis(id);
  });
});

containerAvis.addEventListener("click", (e) => {
  const btn = e.target.closest(".validerAvisBtn, .refuserAvisBtn");
  if (!btn) return;
  const id = btn.getAttribute("data-id");
  if (btn.classList.contains("validerAvisBtn")) return validerAvis(id);
  if (btn.classList.contains("refuserAvisBtn")) return refuserAvis(id);
});
