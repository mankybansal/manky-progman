var fs = require('fs');
var https = require('https');
var options = {
	key  : fs.readFileSync('/etc/letsencrypt/live/www.dev.manky.me/privkey.pem'),
	cert : fs.readFileSync('/etc/letsencrypt/live/www.dev.manky.me/cert.pem')
};

var ls = require('list-directory-contents');
var express = require('express');
var app = express();

app.get('/listProjects', function (req, res) {
  ls('projects', function (err, tree) {
        console.log(tree);
  });
  res.send();
})

https.createServer(options, app).listen(3000, function () {
	console.log('Started!');
});
