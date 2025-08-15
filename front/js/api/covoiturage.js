import { apiUrl } from "../config.js";
export async function postCovoiturage(covoiturage) {
  try {
    const response = await fetch(`${apiUrl}/covoiturage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(covoiturage),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
export async function getCovoituragesByUser(id) {
  try {
    const response = await fetch(`${apiUrl}/covoiturage/user/${id}`);
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
export async function findCovoiturage(filtres) {
  try {
    const query = new URLSearchParams(filtres).toString();
    const response = await fetch(`${apiUrl}/covoiturages?${query}`);
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

export async function annulerCovoiturage(userId, covoiturageId) {
  try {
    const response = await fetch(`${apiUrl}/covoiturage/annuler/${userId}/${covoiturageId}`, {
      method: "PATCH",
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
export async function demarreCovoiturage(userId, covoiturageId) {
  try {
    const response = await fetch(`${apiUrl}/covoiturage/demarrer/${userId}/${covoiturageId}`, {
      method: "PATCH",
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
export async function termineCovoiturage(userId, covoiturageId) {
  try {
    const response = await fetch(`${apiUrl}/covoiturage/terminer/${userId}/${covoiturageId}`, {
      method: "PATCH",
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
