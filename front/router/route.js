export default class Route {
  constructor(url, title, pathHtml, authorize, pathJS = "", role = null) {
    this.url = url;
    this.title = title;
    this.pathHtml = pathHtml;
    this.pathJS = pathJS;
    this.authorize = authorize;
    this.role = role;
  }
}
