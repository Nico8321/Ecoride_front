export async function postCovoiturage(covoiturage) {
  try {
    const response = await fetch(`${api}/covoiturages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(covoiturage),
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
export async function getCovoituragesByUser(id) {
  try {
    const response = await fetch(`${api}/user/${id}/covoiturage`);
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
export async function findCovoiturage(filtres) {
  try {
    const query = new URLSearchParams(filtres).toString();
    const response = await fetch(`${api}/covoiturages?${query}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
