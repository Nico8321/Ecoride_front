const user = JSON.parse(sessionStorage.getItem("user"));
const role = user.role_id;

if (role != 3) {
  document.querySelectorAll("a[href='/gestionCompteStaff'], a[href='/graphiqueCredit'], a[href='/graphiqueCovoiturage']").forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault());
    link.classList.add("disabled-link");
    link.removeAttribute("href");
  });
}
