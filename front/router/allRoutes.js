import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", true, "/js/home.js"),
  new Route("/recherche", "Recherche", "/pages/recherche.html", true, "/js/recherche.js"),
  new Route("/signup", "Inscription", "/pages/signup.html", true, "/js/signup.js"),
  new Route("/signin", "Connexion", "/pages/signin.html", true, "/js/signin.js"),
  new Route("/publier", "publier", "/pages/publier.html", true, "/js/publier.js"),
  new Route("/monCompte", "Mon Compte", "/pages/monCompte.html", false, "/js/monCompte.js"),
  new Route("/modifierMotDePasse", "Modification du mot de passe", "/pages/modifierMotDePasse.html", false, "/js/modifierMotDePasse.js"),
  new Route("/contact", "Contact", "/pages/contact.html", true, ""),
  new Route("/mentionsLegales", "Mentions Légales", "/pages/mentions.html", true, ""),
  new Route("/signalerProbleme", "signaler un problème", "/pages/signalerProbleme.html", false, "/js/litige.js"),
  new Route("/homeStaff", "Acceuil Staff", "/pages/staff/homeStaff.html", true, "/js/homeStaff.js"),
  new Route("/avisStaff", "Avis Staff", "/pages/staff/avisStaff.html", true, "/js/avisStaff.js"),
  new Route("/litigeStaff", "litige Staff", "/pages/staff/litigeStaff.html", true, "/js/litigeStaff.js"),
  new Route("/graphiqueCovoiturage", "graphique covoiturage", "/pages/staff/graphCovoitStaff.html", true, "/js/graphCovoit.js"),
  new Route("/gestionCompteStaff", "gestion compte", "/pages/staff/gestionCompteStaff.html", true, "/js/graphiqueCredit.js"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";
