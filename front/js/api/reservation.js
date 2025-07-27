import { apiUrl } from "../config.js";
export async function getReservationByUser(id) {
  try {
    const response = await fetch(`${apiUrl}/reservation/utilisateur/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
    throw error;
  }
}

export async function reserver(info, covoiturageId) {
  try {
    const response = await fetch(`${apiUrl}/reservation/covoiturage/${covoiturageId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    if (!response.ok) {
      throw new Error("Erreur HTTP:", response.status);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
export async function getReservationsByCovoiturage(id) {
  try {
    const response = await fetch(`${apiUrl}/reservations/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
    throw error;
  }
}

export async function deleteReservation(reservationId) {
  try {
    const response = await fetch(`${apiUrl}/reservation/delete/${reservationId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
