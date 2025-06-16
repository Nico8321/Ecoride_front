export async function verifyToken(route, token) {
  try {
    const response = await fetch(`${apiUrl}/${route.url}`, {
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
  }
}
function isConnected() {
  if (verifyToken) {
    return false;
  } else {
    return true;
  }
}
