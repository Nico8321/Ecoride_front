export function verificationAdresse(inputId, listId) {
  const input = document.getElementById(inputId);
  const suggestionsList = document.getElementById(listId);

  input.addEventListener("input", async (e) => {
    const query = e.target.value;
    if (query.length < 3) return;

    const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
    const data = await res.json();

    suggestionsList.innerHTML = "";
    data.features.forEach((item) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = item.properties.label;
      li.onclick = () => {
        input.value = item.properties.label;
        suggestionsList.innerHTML = "";
      };
      suggestionsList.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !suggestionsList.contains(e.target)) {
      suggestionsList.innerHTML = "";
    }
  });
}
