export async function verifyToken(token) {
  /*try {
    const response = await fetch(`${apiUrl}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Erreur HTTP: ${error.message}`);
    return false;
  }*/
  // TEMP : simule une vérification réussie tant que le backend n’est pas prêt
  return true;
}
