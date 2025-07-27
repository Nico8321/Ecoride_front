import { apiUrl } from "../config.js";

export async function getAvisByUser(utilisateurId) {
  try {
    const response = await fetch(`${apiUrl}/avis?utilisateur_id=${utilisateurId}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
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
      throw new Error(`Erreur HTTP: ${response.status}`);
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
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
    throw error;
  }
}
export async function getAvisByCovoiturage(covoiturageId) {
  try {
    const response = await fetch(`${apiUrl}/avis?covoiturage_id=${covoiturageId}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function changeStatut(reservationId, statut) {
  try {
    const response = await fetch(`${apiUrl}/reservation/change/${reservationId}/${statut}`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
