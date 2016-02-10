## Overview

In Elven Site Config we add configuration files to our ElvenSite.

See [this note][est] on setting up the proper version of **elven-site-tools**.

## Step One: Copy Project {#copy-project}

Navigate to the root of your repository and copy ElvenSiteStarter to ElvenSiteConfig:

  cp -r Week03-ElvenSiteStarter/ Week05-ElvenSiteConfig

Open up your project in WebStorm or your preferred editor/IDE.

Change the title and add an author property for use when rendering your home page:

```
  res.render('index', { title: 'Elven Site Config', author: 'Charlie Calvert' });
```

In **index.jade**, remove the welcome message and insert a paragraph that displays your name in a italics:

 _by Charlie Calvert_.  

The title should appear as an H1, and then your italicized attribution.

Make sure you don't have a favicon error.

## Step Two: Setup Config {#config}

We want to read a config file. First create a folder for it in the root of your project. I need this folder so I can see your config file:

```
mkdir config
```

In the **config** directory, create the following file, where **lastname** is your last name and **base-dir** is your home directory:

```javascript
{
    "lastname": {
        "base-dir": "/home/charlie/",
        "site-dirs": [
            "Documents/AllTest",
            "Git/CloudNotes/Assignments"
        ]
    }
}
```

Create a symbolic link to this file from here: **~/.config**:

```
cd ~/.config
ln -s <PATH-TO-YOUR-CONFIG-FILE> ElvenConfig.json
```

This directory should already exist on your system. This is your configuration file. To complete the assignment, you must add at least one more folder to the **site-dirs** array, and you must put markdown content in the directory you specify.

Note the **base-dir** property. We combine this property and a specific item from the **site-dirs** property to get the full path to a folder: **/home/bcuser/Documents/AllTest**. We need **base_dir** to be configurable because:

- We might have different paths to our home dir on different systems or for different users.
- We might not want to store these files in our home directory at all.

We will build our own config tools, but we will note the presence and try to remain compatible with this:

- <https://github.com/lorenwest/node-config>

Here is our code, where you will finish implementing **load** by using the **readFile** method from your **npmPackage**. Call it **routes/elven-config.js**:

```javascript
/**
 * @author Charlie
 */

var os = require('os');

function getConfigName() { 'use strict';
	var configFileName = "ElvenConfig.json";
	var configName = '';
	if (os.platform() === 'darwin') {
		configName = process.env.HOME + '/.config/' + configFileName;
	} else if (os.platform() === 'linux') {
		configName = process.env.HOME + '/.config/' + configFileName;
	} else if (os.platform() === 'win32') {		
		configName = process.env.USERPROFILE + "\\Config\\" + configFileName;
	}
	return configName;
}

function reportError(err) { 'use strict';
	console.log("*********************************");
	console.log(err);
	console.log("*********************************");
	console.log("Error condition in elven-config.js!");
	console.log("This program requires a config file");
	console.log("Please put ElvenConfig.json somewhere we can find it.");
	console.log("Contrl-C to abort");
	console.log("Error condition!");
	console.log("*********************************");
}

function elvenConfig() {

}

elvenConfig.configData = {};

var load = function(callback) {
	'use strict';
	var configName = getConfigName();
	try {
    // PUT YOUR CALL TO READFILE HERE
	} catch(e) {
		console.log(e);
	}
};

elvenConfig.get = function(property) {
	console.log("in get", elvenConfig.configData);
	return elvenConfig.configData.calvert[property];
};

load();

module.exports = elvenConfig;
```

You will also need to change the **elvenConfig.get** method to use your last name. The point is that it must be compatible with your **ElvenConfig.json** file.

## Step Two.Five

Update **elven-site-tools**.

```
npm install elven-site-tools --save
```

**NOTE**: _The **elven-site-tools** package needs to be updated. At the time of this writing is at **0.1.0**. Because we are installing something new, I have updated the package.json file found in your **~/tmp** directory. Since you already ran **npm install elven-site-tools** above, this could be a no-op for you. I'm simply reminding you that the contents of **~/temp/package.json** was updated. So long as you have a symbolic link to JsObjects set up for that file, then all should be good. Make sure, however, that you are accessing version 0.1.0 of **elven-site-tools._

**IMPORTANT**: *See [this note][est] on setting up the proper version of **elven-site-tools**.*

This update fixes the bug reported in the discussion area, and adds a new property to the return value **destinationDir**:

![Elven Site Config](https://s3.amazonaws.com/bucket01.elvenware.com/images/elven-site-config-01.png)



## Step Three: Load Config {#load-config}

In control.js set up the modular pattern. Here is the start, you do the rest:

```javascript
var elf = {
    init: function() {
        elf.siteConfig = new elf.SiteConfig();
    }
};

elf.SiteConfig = (function() {

});
```

On the client, create two methods called **loadConfig** and **writeConfig**. Implement them with **getJSON**. All calls to **getJSON** must follow this format:

```javascript
  $.getJSON(<SOME ROUTE>, function(result) {
      // Success: display results
    }).done(function() {
            showDebug( "Config loaded second success" );
        })
        .fail(function(jqxhr, textStatus, error) {
            showDebug( "Walk loaded error: " + jqxhr.status + ' ' + textStatus + ' ' + error );
        })
        .always(function() {
            showDebug( "Config loaded complete" );
        });
```

Where **showDebug** adds a list item to a UL element in **index.jade**.

The **loadConfig** method should call a route on the server in **routes/index.js** called **/config**. It should return the **base-dir** and the **site-dirs**:

First load the **config** package:

```javascript
var config = require('config');
```

Then set up your '/config' route. Inside it, include the following:

```
var baseDir = config.get('base-dir');
var siteDirs = config.get('site-dirs');
// Write code here to respond with an object
// that contains both your baseDir and your siteDir
```

The first two lines call the **get** method that is part of the **config** package. It works much like the [**get**][cget] from the loren west repository.

On the server side, use your **readFile** and **writeFile** npm utilities.

Use a select object to display the paths to your markdown files. The user will choose one path at a time. The point is that you can set up multiple sites with this one tool, where each path leads to the root directory for the markdown files for your site. The user picks the item and send it to the server. You build this dynamically, of course, but in your working code, it might look a bit like this:

```
  <div>
    <select id="dirsToWalk">
      <option value="/home/charlie/Documents/AllTest">/home/charlie/Documents/AllTest</option>
      <option value="/home/charlie/Git/CloudNotes/Assignments">/home/charlie/Git/CloudNotes/Assignments</option>
    </select>
  </div>
```

And here is how to get the selected item out of the **select** element, which we have called 'dirsToWalk':

```javascript
var dirsToWalk = document.getElementById("dirsToWalk");
var directory = dirsToWalk.options[dirsToWalk.selectedIndex].value;
```

[cget]: https://github.com/lorenwest/node-config/wiki/Common-Usage

## Turn it in

Push folder to repository and submit something in Canvas so I know its available.

**NOTE**: *Be sure that you application is not throwing favicon error.*

[est]: http://www.ccalvert.net/books/CloudNotes/Assignments/ElvenSiteOptions.html#elven-site-tools
