import { isLoggedIn } from "./auth/authHelper.js";

const connexion = document.getElementById("connexion");
document.addEventListener("DOMContentLoaded", async () => {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    connexion.innerText = "Déconnexion";
    connexion.href = "/deconnexion";
  }
});
