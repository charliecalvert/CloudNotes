Week07
======

Main Topics 
===========

- Databases
- VirtualBox
- Two Grids (Background and NPCs - GridCanvas04
- Finding an NPC

~~~~
	var detectCollision = function(playerX, playerY) {
		var npcNumber = npcs[playerY][playerX];
		if (npcNumber !== 0) {
			$("#npc").html("Found an npc with number: " + npcNumber);
		}
	}
~~~~

Databases
---------

When downloading for Windows, look for the **Precompiled Binaries** and
look for the command line shell.

- <http://www.sqlite.org/>
- <http://www.sqlite.org/download.html>
- <http://www.sqlite.org/datatype3.html>

~~~~
apt-get install sqlite3
apt-get install libsqlite3-dev
npm install sqlite3
~~~~

CREATE TABLE people(
   varchar(30) primary key,
   firstName text,
   lastName text,
   age integer
);

Free Graphics
-------------

- <http://opengameart.org/>
- <http://www.lostgarden.com/2006/07/more-free-game-graphics.html>
- <http://gamedev.stackexchange.com/questions/20/where-can-i-find-free-sprites-and-images>
- <http://www.cgtextures.com/>

Angular JS
----------

Folder Manipulation
-------------------

A library with a routine for ensuring a directory exists and for
recursively removing directories.

~~~~
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require("path");

var SimpleDir = (function() {

	function SimpleDir() {
	}
	
	var makeDir = function(folder) {
		mkdirp(folder);
	}
	
	// Test if a directory exists, if it does not exist create it
	SimpleDir.prototype.ensureDir = function(folder) {
		fs.exists(folder, existsFunc);
	}
	
	// Synchronous version of directory exists
	SimpleDir.prototype.ensureDirSync = function(folder) {
		currentFolder = folder;
		if (fs.existsSync(folder)) {
			return fs.statSync(folder);
		} else {
			makeDir(folder);
			return 'successfully created directory';
		}		
	};

	// Remove directories recursively
	// Credit to tkihira: https://gist.github.com/tkihira/2367067
	SimpleDir.prototype.rmdirSync = function(dir) {
		var list = fs.readdirSync(dir);
		for(var i = 0; i < list.length; i++) {
			var filename = path.join(dir, list[i]);
			var stat = fs.statSync(filename);
			
			if(filename == "." || filename == "..") {
				// pass these files
			} else if(stat.isDirectory()) {
				// rmdir recursively
				this.rmdirSync(filename);
			} else {
				// rm filename
				fs.unlinkSync(filename);
			}
		}
		fs.rmdirSync(dir);
	};
		
	return SimpleDir;
})();

exports.dirs = new SimpleDir();
~~~~

Angular JS
----------

<http://stephanebegaudeau.tumblr.com/post/48776908163/everything-you-need-to-understand-to-start-with>
<http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/all-you-need-to-know-about-the-html5-data-attribute/>



