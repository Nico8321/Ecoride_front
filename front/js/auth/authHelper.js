export async function verifyToken() {
  /*
  const token = sessionStorage.getItem("token");
  try {
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

  return true;
}

export async function isLoggedIn() {
  return await verifyToken();
}
