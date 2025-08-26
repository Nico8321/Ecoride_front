import { createLitigeCardStaff } from "./components/litigeCardStaff";
import { showToast } from "./components/toast";

const containerLitiges = document.getElementById("containerLitiges");

async function afficherLitiges() {
  try {
    const listLitiges = await getAllLitiges();
    if (listLitiges.length === 0) {
      const h1 = document.createElement("h1");
      h1.textContent = "Aucun litiges à traiter";
      h1.className = "mt-5";
      h1.style.textAlign = "center";
      containerLitiges.appendChild(h1);
      return;
    }
    listLitiges.forEach((litige) => {
      createLitigeCardStaff(litige, containerLitiges);
    });
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
afficherLitiges();
