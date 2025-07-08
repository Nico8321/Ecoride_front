import { apiUrl } from "../config.js";
export async function verifyToken() {
  const token = sessionStorage.getItem("token");
  /*if (!token) return false;

  try {
    const response = await fetch(`${apiUrl}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error(`Erreur HTTP: ${error.message}`);
    return false;
  }*/ return true;
}

export async function isLoggedIn() {
  return await verifyToken();
}
