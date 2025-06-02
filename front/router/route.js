export default class Route {
  constructor(url, title, pathHtml, authorize, pathJS = "") {
    this.url = url;
    this.title = title;
    this.pathHtml = pathHtml;
    this.pathJS = pathJS;
    this.authorize = authorize;
  }
}
/*
[]-> Tout le monde peut y acceder
["disconnected"] -> Reservé aux utilisateurs déconnecté
["client"] -> reservé aux utilisateurs avec le role client
["admin"] -> réservé aux utilisateurs avec le role admin
["client","admin"] -> Réservé aux utilisateurs avec le role client OU admin 
*/
