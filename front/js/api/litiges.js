import { apiUrl } from "../config.js";

export async function getLitigeById(id) {
  try {
    const response = await fetch(`${apiUrl}/litige/${id}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function envoyerNoteSuiviLitige(id, noteSuivi) {
  try {
    const response = await fetch(`${apiUrl}/litige/note/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteSuivi),
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

export async function cloturerLitige(id) {
  try {
    const response = await fetch(`${apiUrl}/litige/${id}/cloture`, {
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

export async function creationLitige(reservationId, userId, litige) {
  try {
    const response = await fetch(`${apiUrl}/litige/${reservationId}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(litige),
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

export async function getAllLitiges(userId) {
  try {
    const response = await fetch(`${apiUrl}/litige/${userId}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
