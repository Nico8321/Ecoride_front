import { apiUrl } from "../config.js";
import { authHeaders } from "./auth.js";

export async function gethistoriqueTransactions() {
  try {
    const response = await fetch(`${apiUrl}/transaction/historique`, {
      headers: authHeaders(),
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
