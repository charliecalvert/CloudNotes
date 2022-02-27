const express = require('express');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 30025;

app.get('/', function(request, response) {
    // debugger;
    console.log(request.params.id);
    const html = fs.readFileSync(__dirname + '/Prog272/Week06.html');
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.write(html);
    response.end();
});

// app.use("/", express.static(__dirname + '/Public'));
app.use('/Library', express.static(__dirname + '/Library'));
app.listen(port);
console.log('Listening on port :' + port);
