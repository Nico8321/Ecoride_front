import { apiUrl } from "../config.js";
import { showToast } from "../components/toast.js";

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${apiUrl}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    const data = await response.json();
    storeSession(data);
    window.location.href = "/monCompte";
  } catch (error) {
    showToast(`Erreur : ${error.message}`, "danger");
  }
}

export async function newUser(user) {
  try {
    const response = await fetch(`${apiUrl}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    showToast("Utilisateur créé avec succès");
    window.location.href = "/signin";
  } catch (error) {
    showToast(error.message, "danger");
  }
}

function storeSession(data) {
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("user", JSON.stringify(data));
}
