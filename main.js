var fs = require('fs');
var https = require('https');
var options = {
	key  : fs.readFileSync('/etc/letsencrypt/live/www.dev.manky.me/privkey.pem'),
	cert : fs.readFileSync('/etc/letsencrypt/live/www.dev.manky.me/cert.pem')
};

var ls = require('list-directory-contents');
var express = require('express');
var app = express();

function readDirectory = function(parentDir,folder,callback){
  var projects = [];
  fs.readdir(parentDir + '/' + folder, (err, projectFiles) => {
    projectFiles.forEach(projectFile => {
        if(projectFile == "manifest.json"){
          console.log("Found a Manifest: " + projectFile + " in projects/"+file);
          project.manifest = projectFile;
          console.log(project);
          projects[projects.length] = project;
        }
    }, function(){
      callback(projects);
    });
  });
}

app.get('/listProjects', function (req, res) {


  fs.readdir('projects', (err, files) => {
    files.forEach(file => {
        readDirectory('projects', file, function(data){
          res.send(data);
        })
    });
  });

  res.send(projects);

});

https.createServer(options, app).listen(3000, function () {
	console.log('Started!');
});
