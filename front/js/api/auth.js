export function newUser(user) {
  fetch(`${apiUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Utilisateur créé avec succés");
      } else {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
    })
    .catch((error) => console.error(error));
}
