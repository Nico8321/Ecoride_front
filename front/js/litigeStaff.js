import { createLitigeCardStaff } from "./components/litigeCardStaff.js";
import { showToast } from "./components/toast.js";
import { getAllLitiges } from "./api/litiges.js";

const containerLitiges = document.getElementById("containerLitiges");

const user = JSON.parse(sessionStorage.getItem("user"));
const userId = user.id;

async function afficherLitiges() {
  try {
    const listLitiges = await getAllLitiges(userId);
    if (listLitiges.length === 0) {
      const h1 = document.createElement("h1");
      h1.textContent = "Aucun litige à traiter";
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
