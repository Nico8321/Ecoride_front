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
      throw new Error(`Erreur HTTP: ${response.status}`);
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

export async function litigeReservation(reservationId, userId, litige) {
  try {
    const response = await fetch(`${apiUrl}/reservation/litige/${reservationId}/${userId}`, {
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
