const express = require('express');
const fs = require('fs');
let io = require('socket.io');
const _ = require('underscore');
const Mustache = require('mustache');

const app = express.createServer();
const staticDir = express.static;

io = io.listen(app);

const opts = {
    port: 1947,
    baseDir: __dirname + '/../../',
};

io.sockets.on('connection', function(socket) {
    socket.on('slidechanged', function(slideData) {
        socket.broadcast.emit('slidedata', slideData);
    });
    socket.on('fragmentchanged', function(fragmentData) {
        socket.broadcast.emit('fragmentdata', fragmentData);
    });
});

app.configure(function() {
    ['css', 'js', 'images', 'plugin', 'lib'].forEach(function(dir) {
        app.use('/' + dir, staticDir(opts.baseDir + dir));
    });
});

app.get('/', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(opts.baseDir + '/index.html').pipe(res);
});

app.get('/notes/:socketId', function(req, res) {
    fs.readFile(opts.baseDir + 'plugin/notes-server/notes.html', function(err, data) {
        res.send(Mustache.to_html(data.toString(), {
            socketId: req.params.socketId,
        }));
    });
    // fs.createReadStream(opts.baseDir + 'notes-server/notes.html').pipe(res);
});

// Actually listen
app.listen(opts.port || null);

const brown = '\033[33m';
const green = '\033[32m';
const reset = '\033[0m';

const slidesLocation = 'http://localhost' + ( opts.port ? ( ':' + opts.port ) : '' );

console.log( brown + 'reveal.js - Speaker Notes' + reset );
console.log( '1. Open the slides at ' + green + slidesLocation + reset );
console.log( '2. Click on the link your JS console to go to the notes page' );
console.log( '3. Advance through your slides and your notes will advance automatically' );
