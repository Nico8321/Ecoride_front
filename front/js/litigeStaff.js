import { createLitigeCardStaff } from "./components/litigeCardStaff.js";
import { showToast } from "./components/toast.js";
import { getAllLitiges } from "./api/litiges.js";

//recuperation des elements dans le DOM
const containerLitiges = document.getElementById("containerLitiges");
const filtres = document.getElementById("filtresLitiges");

// tableau pour stockage de tous les litiges
let cacheLitiges = [];

//fonction pour affichage de tous les litiges
async function afficherLitiges(filtre = "tous") {
  //vide pour doublon
  containerLitiges.innerHTML = "";

  const litiges = filtre === "tous" ? cacheLitiges : cacheLitiges.filter((l) => l.status === filtre);
  // si aucun litige
  if (!litiges.length) {
    containerLitiges.innerHTML = `<p class="text-center mt-5">Aucun litige à afficher</p>`;
    return;
  }

  litiges.forEach((l) => createLitigeCardStaff(l, containerLitiges));
}
//fonction pour charger les litiges dans les sections correspondantes
async function chargerLitiges() {
  try {
    cacheLitiges = await getAllLitiges();
    //compteur de litige par status
    const counts = cacheLitiges.reduce(
      (acc, l) => {
        acc.all++;
        acc[l.status] = (acc[l.status] || 0) + 1;
        return acc;
      },
      { all: 0 }
    );
    document.querySelector('[data-filtre="tous"]').textContent = `Tous (${counts.all})`;
    document.querySelector('[data-filtre="en_attente"]').textContent = `En attente (${counts.en_attente || 0})`;
    document.querySelector('[data-filtre="en_traitement"]').textContent = `En traitement (${counts.en_traitement || 0})`;
    document.querySelector('[data-filtre="clos"]').textContent = `Clôturés (${counts.clos || 0})`;
    afficherLitiges();
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}
//ecouteur pour affichage correspondant au statut
filtres.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filtre]");
  if (!btn) return;
  filtres.querySelectorAll("button").forEach((b) => b.classList.remove("active", "btn-primary"));
  btn.classList.add("active", "btn-primary");
  afficherLitiges(btn.dataset.filtre);
});

chargerLitiges();
