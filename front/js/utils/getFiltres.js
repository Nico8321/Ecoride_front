// fonction pour la recuperation des valeurs des inputs pour la recherche

export function getFiltres() {
  const donnees = ["depart", "destination", "date", "heure", "prix", "note", "duree"];
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

  return filtres;
}
