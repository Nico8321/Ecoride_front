import { isLoggedIn } from "./auth/authHelper.js";

const connexion = document.getElementById("connexion");

document.addEventListener("DOMContentLoaded", async () => {
  const loggedIn = await isLoggedIn();

  if (loggedIn) {
    connexion.innerText = "Déconnexion";
    connexion.href = "#";

    connexion.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.clear(); // Supprime toutes les données stockées
      window.location.href = "/"; // Redirection vers la page d'accueil
    });
  }
});
