export async function loginUser(email, password) {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    storeSession(data);
    window.location.href = "monCompte.html";
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
  }
}

export async function newUser(user) {
  try {
    const response = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    console.log("Utilisateur créé avec succés");
    window.location.href = "signin.html";
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
  }
}

function storeSession(data) {
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("user", JSON.stringify(data.user));
}
