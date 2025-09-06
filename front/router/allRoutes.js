import Route from "./route.js";

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", true, "/js/home.js"),
  new Route("/recherche", "Recherche", "/pages/recherche.html", true, "/js/recherche.js"),
  new Route("/signup", "Inscription", "/pages/signup.html", true, "/js/signup.js"),
  new Route("/signin", "Connexion", "/pages/signin.html", true, "/js/signin.js"),
  new Route("/publier", "publier", "/pages/publier.html", true, "/js/publier.js"),
  new Route("/monCompte", "Mon Compte", "/pages/monCompte.html", false, "/js/monCompte.js", [1]),
  new Route("/modifierMotDePasse", "Modification du mot de passe", "/pages/modifierMotDePasse.html", false, "/js/modifierMotDePasse.js", [1]),
  new Route("/contact", "Contact", "/pages/contact.html", true, ""),
  new Route("/mentionsLegales", "Mentions Légales", "/pages/mentions.html", true, ""),
  new Route("/signalerProbleme", "signaler un problème", "/pages/signalerProbleme.html", false, "/js/litige.js", [1]),
  new Route("/homeStaff", "Accueil Staff", "/pages/staff/homeStaff.html", false, "/js/homeStaff.js", [2, 3]),
  new Route("/avisStaff", "Avis Staff", "/pages/staff/avisStaff.html", false, "/js/avisStaff.js", [2, 3]),
  new Route("/litigeStaff", "litige Staff", "/pages/staff/litigeStaff.html", false, "/js/litigeStaff.js", [2, 3]),
  new Route("/graphiqueCovoiturage", "graphique covoiturage", "/pages/staff/graphCovoitStaff.html", false, "/js/graphCovoit.js", [3]),
  new Route("/graphiqueCredit", "graphique credits", "/pages/staff/graphCreditStaff.html", false, "/js/graphCredit.js", [3]),
  new Route("/gestionCompteStaff", "gestion compte", "/pages/staff/gestionCompteStaff.html", false, "/js/gestionCompte.js", [3]),
  new Route("/vueLitige", "gestion du litige", "/pages/staff/vueLitige.html", false, "/js/vueLitige.js", [2, 3]),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";
