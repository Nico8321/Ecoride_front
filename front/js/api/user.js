import { apiUrl } from "../config.js";
import { showToast } from "../components/toast.js";
export async function deleteVehicule(userId, vehiculeId) {
  try {
    const response = await fetch(`${apiUrl}/vehicule/${vehiculeId}/user/${userId}`, {
      method: "DELETE",
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
    const response = await fetch(`${apiUrl}/vehicule/user/${userId}`);
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
  // création d'un formData pour l'envoi du fichier
  const formData = new FormData();
  // ajout du fichier à envoyer dans le formData
  formData.append("photo", fichier);
  const user = JSON.parse(sessionStorage.getItem("user"));

  try {
    // appel POST vers l'API pour l'envoi de la photo
    const response = await fetch(`${apiUrl}/user/photo/${user.id}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      user.photo = result.filename;
      sessionStorage.setItem("user", JSON.stringify(user));
      showToast("Photo enregistrée !");
    } else {
      showToast(result.message || "Erreur lors de l'envoi", "error");
    }
  } catch (error) {
    showToast("Erreur:", "error");
  }
}
