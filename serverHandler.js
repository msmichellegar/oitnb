var handlers = require('./handlers.js');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');

function getRandomUserId() {
  var userId = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i < 10; i++) {
      userId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return userId;
}

function serverHandler (req, res){
  if(req.headers.cookie === undefined) {
    res.writeHead(200, {
      'Set-Cookie': 'userId=' + getRandomUserId() + "; expires=Fri, 18 Dec 2015 12:00:00 UTC",
      'Content-Type': 'text/plain'
    });
  }

  if (req.url.length === 1) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(index.toString());
  }

  else {
    var route = req.method + " " + req.url;
    var handler = handlers[route];
    if (handler) {
      handler(req, res);
    } else {
      handlers.generic(req, res);
    }
  }
}

module.exports = serverHandler;
