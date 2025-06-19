export async function postTrajet(trajet) {
  try {
    const response = await fetch(`${apiUrl}/trajets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trajet),
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
export async function getTrajetsByUser(id) {
  try {
    const response = await fetch(`${api}/user/${id}/trajet`);
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
