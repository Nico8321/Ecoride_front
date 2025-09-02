import { apiUrl } from "../config.js";
import { authHeaders } from "./auth.js";
export async function getReservationByUser(id) {
  try {
    const response = await fetch(`${apiUrl}/reservation/utilisateur/${id}`, {
      headers: authHeaders(),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
    throw error;
  }
}

export async function reserver(info, covoiturageId, userId) {
  try {
    const response = await fetch(`${apiUrl}/reservation/covoiturage/${covoiturageId}/${userId}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(info),
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
export async function getReservationsByCovoiturage(id, userId) {
  try {
    const response = await fetch(`${apiUrl}/reservations/${id}/${userId}`, {
      headers: authHeaders(),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}, ${data.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
    throw error;
  }
}

export async function deleteReservation(reservationId, userId) {
  try {
    const response = await fetch(`${apiUrl}/reservation/delete/${reservationId}/${userId}`, {
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
export async function annulerReservation(reservationId, userId) {
  try {
    const response = await fetch(`${apiUrl}/reservation/annuler/${reservationId}/${userId}`, {
      method: "PATCH",
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
export async function accepterReservation(reservationId, userId) {
  try {
    const response = await fetch(`${apiUrl}/reservation/accepte/${reservationId}/${userId}`, {
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
export async function refuserReservation(reservationId, userId) {
  try {
    const response = await fetch(`${apiUrl}/reservation/refuse/${reservationId}/${userId}`, {
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
export async function terminerReservation(reservationId, userId) {
  try {
    const response = await fetch(`${apiUrl}/reservation/termine/${reservationId}/${userId}`, {
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
