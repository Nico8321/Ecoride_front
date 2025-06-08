import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", []),
  new Route("/recherche", "Recherche", "/pages/recherche.html", [], "/js/recherche.js"),
  new Route("/signup", "Inscription", "/pages/signup.html", []),
  new Route("/signin", "Connexion", "/pages/signin.html", []),
  new Route("/publier", "Connexion", "/pages/publier.html", [], "/js/publier.js"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";
