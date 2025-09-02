import { apiUrl } from "../config.js";
import { authHeaders } from "./auth.js";
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
export async function postAvis(avis, userId) {
  try {
    const response = await fetch(`${apiUrl}/avis?utilisateur_id=${userId}`, {
      method: "POST",
      headers: authHeaders(),
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
    const response = await fetch(`${apiUrl}/avis/staff`, { headers: authHeaders() });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
export async function accepterAvis(id) {
  try {
    const response = await fetch(`${apiUrl}/avis/${id}/accepte`, {
      method: "PATCH",
      headers: authHeaders(),
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
export async function refusAvis(id) {
  try {
    const response = await fetch(`${apiUrl}/avis/${id}/refus`, {
      method: "PATCH",
      headers: authHeaders(),
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
