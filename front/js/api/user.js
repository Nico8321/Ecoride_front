import { apiUrl } from "../config.js";
import { showToast } from "../components/toast.js";
import { authHeaders } from "./auth.js";

export async function deleteVehicule(userId, vehiculeId) {
  try {
    const response = await fetch(`${apiUrl}/vehicule/${vehiculeId}/user/${userId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    return vehiculeId;
  } catch (error) {
    throw error;
  }
}
export async function getVehicules(userId) {
  try {
    const response = await fetch(`${apiUrl}/vehicule/user/${userId}`, {
      headers: authHeaders(),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function addVehicule(userId, newVehicule) {
  try {
    const response = await fetch(`${apiUrl}/vehicule/user/${userId}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(newVehicule),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function patchUser(userId, userData) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function patchUserPassword(userId, password, newPassword) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}/password`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ password, newPassword }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
// Envoie du fichier au backend via fetch (multipart/form-data)
export async function postPhoto(fichier) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  // création d'un formData pour l'envoi du fichier
  const formData = new FormData();
  // ajout du fichier à envoyer dans le formData
  formData.append("photo", fichier);
  try {
    // appel POST vers l'API pour l'envoi de la photo
    const response = await fetch(`${apiUrl}/user/photo/${user.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      user.photo = result.filename;
      sessionStorage.setItem("user", JSON.stringify(user));
      showToast("Photo enregistrée !");
    } else {
      showToast(result.message || "Erreur lors de l'envoi", "danger");
    }
  } catch (error) {
    showToast(error.message, "danger");
  }
}
