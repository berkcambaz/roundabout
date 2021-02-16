const http = require("http");
const fs = require("fs");

module.exports = class Roundabout {
  constructor() {
    this.mimeTypes = {
      'ico': 'image/x-icon',
      'html': 'text/html',
      'js': 'text/javascript',
      'json': 'application/json',
      'css': 'text/css',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'wav': 'audio/wav',
      'mp3': 'audio/mpeg',
      'svg': 'image/svg+xml',
      'pdf': 'application/pdf',
      'zip': 'application/zip',
      'doc': 'application/msword',
      'eot': 'application/vnd.ms-fontobject',
      'ttf': 'application/x-font-ttf'
    };

    this.routes;
  }

  listen(port) {
    http.createServer((req, res) => {
      let url = req.url;
      if (url === "/")
        url = "/index.html"

      if (this.routes[url] && this.routes[url].options.get) {
        const fileExtension = url.split(".")[1];
        res.setHeader("Content-type", this.mimeTypes[fileExtension] || "text/plain");
        res.end(this.routes[url].content);
      } else {

      }
    }).listen(port);
  }

  /**
   * 
   * @param {string} dir 
   * @param {{use?=boolean, get?:boolean, post?:boolean, put?:boolean, delete?:boolean}} options 
   */
  static(dir, options) {
    this.routes = {};
    this.searchDirectory(dir, "");
    for (const route in this.routes) {
      this.routes[route].content = fs.readFileSync("." + dir + route, { encoding: "utf-8" });
      this.routes[route].options = options;
    }
  }

  /**
     * 
     * @param {string} dir 
     * @param {(req:http.IncomingMessage, res:http.ServerResponse) => void} callback 
     */
  use(dir, callback) {

  }

  /**
   * 
   * @param {string} dir 
   * @param {(req:http.IncomingMessage, res:http.ServerResponse) => void} callback 
   */
  get(dir, callback) {

  }

  /**
   * 
   * @param {string} dir 
   * @param {(req:http.IncomingMessage, res:http.ServerResponse) => void} callback 
   */
  post(dir, callback) {

  }

  /**
   * 
   * @param {string} dir 
   * @param {(req:http.IncomingMessage, res:http.ServerResponse) => void} callback 
   */
  put(dir, callback) {

  }

  /**
   * 
   * @param {string} dir 
   * @param {(req:http.IncomingMessage, res:http.ServerResponse) => void} callback 
   */
  delete(dir, callback) {

  }

  searchDirectory(baseDir, targetDir) {
    let dirs = fs.readdirSync("." + baseDir + targetDir, { encoding: "utf-8" });

    for (let i = 0; i < dirs.length; ++i) {
      if (dirs[i].indexOf(".") === -1)
        this.searchDirectory(baseDir, targetDir + "/" + dirs[i]);
      else
        this.routes[targetDir + "/" + dirs[i]] = {};
    }
  }
}