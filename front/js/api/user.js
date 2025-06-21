export async function deleteVehicule(userId, vehiculeId) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}/vehicule/${vehiculeId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return vehiculeId;
  } catch (error) {
    throw error;
  }
}
export async function addVehicule(userId, newVehicule) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}/vehicule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVehicule),
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
