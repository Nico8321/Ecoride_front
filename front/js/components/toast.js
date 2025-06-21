export function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toastContainer");

  if (!toastContainer) {
    console.error("Aucun conteneur 'toastContainer' trouvé dans le DOM.");
    return;
  }

  const toastElement = document.createElement("div");
  toastElement.className = `toast align-items-center text-bg-${type} border-0`;
  toastElement.setAttribute("role", "alert");
  toastElement.setAttribute("aria-live", "assertive");
  toastElement.setAttribute("aria-atomic", "true");

  toastElement.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toastContainer.appendChild(toastElement);

  const toast = new bootstrap.Toast(toastElement);
  toast.show();

  // Supprimer automatiquement le toast après qu’il soit masqué
  toastElement.addEventListener("hidden.bs.toast", () => {
    toastElement.remove();
  });
}
