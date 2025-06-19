export async function getReservationByUser(id) {
  try {
    const response = await fetch(`${api}/reservation/utilisateur/${id}`);
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
