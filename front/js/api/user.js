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
