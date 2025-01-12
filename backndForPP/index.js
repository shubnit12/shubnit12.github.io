const http = require("http");
// const fs = require("node:fs");
console.log("MyServer");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
  })
  .listen(8080);
