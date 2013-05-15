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

VirtualBox
----------

The minimal cd, let's use the 32 bit 13.04 ringtail option.

<https://help.ubuntu.com/community/Installation/MinimalCD>
<http://archive.ubuntu.com/ubuntu/dists/raring/main/installer-i386/current/images/netboot/mini.iso>
<http://elvenware.com/charlie/os/linux/VirtualBox.html>
<http://elvenware.com/charlie/os/linux/VirtualBox.html#minimal>

When doing the install, you can follow the steps for minimal install, linked
above. Some quick reminders if you just need a few hints:

- At 1048 MB of Memory (2048 preferred)
- Create virtual hard drive now
- VDI, Dynamically allocated, 8 GB if you are short on disk space, else 16 GB.
- Settings | Storage | Add CD
- Network Bridged Adapter PCNet Fast III (If you are at school, see notes)

During the install:

- Guided, use entire disk.
- Just install Ubuntu Server and SSH Server.
- If you create other installs, then create an Ubuntu Desktop or Lubuntu desktop.

As soon as you have the puppy properly installed, then immediately make a 
VirtualBox appliance as a back up. Make more applianaces as needed, and name
them carefully.

I have generally found that it is not worth the effort to try to get two copies
of the same virtual appliance running at the same time. (Let me know if you find
a clean way to do this.) 

My suggestion is that you do a VBox Ubuntu install, make an appliance as a back
up, and get to work. Then some Saturday afternoon when nothing much is happening,
create a few more VBox Ubuntu installs. It might be nice to have four or five
of them around, assuming you have the hard drive space. Name them carefully.
<http://www.elvenware.com/charlie/development/cloud/virtualization.html>



Databases
---------

CouchDb
-------

There is a Windows install. For the Linux install:

sudo apt-get install couchdb -y

For windows:

<http://apache.mirrors.pair.com/couchdb/binary/win/1.3.0/setup-couchdb-1.3.0_R15B03-1.exe>

<http://couchdb.apache.org/>
<http://wiki.apache.org/couchdb/>
<http://wiki.apache.org/couchdb/Installing_on_Ubuntu>

We will access the database via HTTP and use request:

<https://github.com/mikeal/request>

Getting started:

<http://guide.couchdb.org/draft/tour.html>

Once you have it installed on Windows, use the browser:

<http://127.0.0.1:5984/>



SqlLite
-------

We probably won't be using SqlLite.

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



