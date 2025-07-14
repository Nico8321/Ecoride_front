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
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    storeSession(data);
    window.location.href = "/monCompte";
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
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
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    showToast("Utilisateur créé avec succés", "succes");
    window.location.href = "/signin";
  } catch (error) {
    showToast(error.message, "alert");
  }
}

function storeSession(data) {
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("user", JSON.stringify(data));
}
