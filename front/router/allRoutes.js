import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", []),
  new Route("/recherche", "Recherche", "/pages/recherche.html", []),
  new Route("/signup", "Inscription", "/pages/signup.html", []),
  new Route("/signin", "Connexion", "/pages/signin.html", []),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";
