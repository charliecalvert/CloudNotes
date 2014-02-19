var express = require('express');
var app = express();
var fs = require('fs');

var port = process.env.PORT || 30025;

app.get('/', function(request, response) {
    // debugger;
    console.log(request.params.id);
	var html = fs.readFileSync(__dirname + '/Prog272/Week06.html');
	response.writeHeader(200, {"Content-Type": "text/html"});   
	response.write(html);
	response.end();
});

// app.use("/", express.static(__dirname + '/Public'));
app.use("/Library", express.static(__dirname + '/Library'));
app.listen(port);
console.log('Listening on port :' + port);