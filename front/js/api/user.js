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
export async function patchUser(userId, userData) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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
export async function patchUserPassword(userId, password, newPassword) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, newPassword }),
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

export async function deleteUser(userId) {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "DELETE",
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
