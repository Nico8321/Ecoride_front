import { apiUrl } from "../config.js";

export async function getAvisByUser(utilisateurId) {
  try {
    const response = await fetch(`${apiUrl}/avis?utilisateur_id=${utilisateurId}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getMoyenneByUser(utilisateurId) {
  try {
    const response = await fetch(`${apiUrl}/avis-moyenne?moyenne_id=${utilisateurId}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
export async function postAvis(avis) {
  try {
    const response = await fetch(`${apiUrl}/avis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avis),
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
export async function getAvisByCovoiturage(covoiturageId) {
  try {
    const response = await fetch(`${apiUrl}/avis?covoiturage_id=${covoiturageId}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
export async function getAllAvisToCheck() {
  try {
    const response = await fetch(`${apiUrl}/avis/staff`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
export async function checkAvis(id, check) {
  try {
    const response = await fetch(`${apiUrl}/avis/check/${id}/${check}`, {
      method: "PATCH",
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
