// fonction pour la recuperation des valeurs des inputs pour la recherche

export function getFiltres() {
  const donnees = ["depart", "arrivee", "date", "heure", "prix", "note", "duree"];
  const filtres = {};

  donnees.forEach((key) => {
    const input = document.getElementById(key);
    if (input?.value) {
      filtres[key] = input.value;
    }
  });
  const energieChecked = document.querySelector('input[name="radioEnergie"]:checked');
  if (energieChecked) {
    filtres["energie"] = energieChecked.id;
  }
  const userData = sessionStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    filtres["userId"] = user.id;
  }

  return filtres;
}
export function getFiltresLight() {
  const donnees = ["depart", "arrivee"];
  const filtres = {};

  donnees.forEach((key) => {
    const input = document.getElementById(key);
    if (input?.value) {
      filtres[key] = input.value;
    }
  });
  const energieChecked = document.querySelector('input[name="radioEnergie"]:checked');
  if (energieChecked) {
    filtres["energie"] = energieChecked.id;
  }
  const userData = sessionStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    filtres["userId"] = user.id;
  }

  return filtres;
}
