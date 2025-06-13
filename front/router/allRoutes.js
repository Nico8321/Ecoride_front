import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", []),
  new Route("/recherche", "Recherche", "/pages/recherche.html", [], "/js/recherche.js"),
  new Route("/signup", "Inscription", "/pages/signup.html", [], "/js/signup.js"),
  new Route("/signin", "Connexion", "/pages/signin.html", [], "/js/signin.js"),
  new Route("/publier", "Connexion", "/pages/publier.html", [], "/js/publier.js"),
  new Route("/monCompte", "Mon Compte", "/pages/monCompte.html", [], "/js/monCompte.js"),
  new Route("/modifierMotDePasse", "Modification du mot de passe", "/pages/modifierMotDePasse.html", [], "/js/contact.js"),
  new Route("/contact", "Contact", "/pages/contact.html", [], ""),
  new Route("/mentionsLegales", "Mentions Légales", "/pages/mentions.html", [], ""),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";
