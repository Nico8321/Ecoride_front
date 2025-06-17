export async function postTrajet(trajet) {
  try {
    const response = await fetch(`${apiUrl}/postTrajet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trajet),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    alert("Trajet créé avec succés");
    window.location.href = "monCompte.html";
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
  }
}
