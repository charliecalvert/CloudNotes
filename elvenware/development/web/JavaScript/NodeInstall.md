---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/NodeInstall.md
relativePath: elvenware/development/web/JavaScript/NodeInstall.md
title: NodeInstall
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

This document covers installing node and running NPM. It is focused mostly on Linux and Windows.

Subjects covered include:

- NPM
- Node Configuration
- package.json

## Windows Install

For Windows, the node install is found here:

* [http://nodejs.org/](http://nodejs.org/)

You should have little trouble downloading and install the application on Windows.

## Linux Install

If you want to install the latest version of node and npm on Linux, you have two choices:

* NodeSource.com (This is the system install of node, you main version)
* Node Version Manager (This allows you to easily switch between versions.)

You can use either or both.

It is **not recommended** to use the following, because it installs a very old version of nodejs. Maybe someday it will start working properly again:

	sudo apt-get install nodejs npm // DON'T DO THIS!

To install node properly, do something like this:

```
    sudo apt-get install curl    
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get install -y nodejs
```

**NOTE**: *You probably already have [curl][curl] installed, but it doesn't hurt to run the install command again.*

The lines shown above will install node version 4.X.

[curl]:http://linux.about.com/od/commands/l/blcmdl1_curl.htm

## An Install Script {#elven-node-script}

There is reason to believe that the code shown in the lines above will become fairly stabal, but it has changed frequently over the last years. As a result, you might find it useful to view the script that I store in JsObjects. I try to maintain it and track the latest version:

* <https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/NodeInstall.sh>

Or look here:

* <https://github.com/nodesource/distributions>

You should confirm that node is at least at version 4.0.0:

```
$ node --version
v4.1.1
```

If it is at some older version, such as 0.10, then use the JsObjects **NodeInstall.sh** script to update it:

```
$ cd ~/Git/JsObjects/Utilities/NodeInstall/
charliecalvert@charlie-winter-2015
~/Git/JsObjects/Utilities/NodeInstall
$ ./NodeInstall.sh
```
Running it might look a bit like this:

```
$ ./NodeInstall.sh
[sudo] password for bcuser:
Reading package lists... Done
Building dependency tree       
Reading state information... Done
curl is already the newest version.
0 upgraded, 0 newly installed, 0 to remove and 2 not upgraded.

## Installing the NodeSource Node.js 4.x repo...


## Populating apt-get cache...

+ apt-get update
Ign http://dl.google.com stable InRelease
etc...
```

When you are done, node should be installed and updated to the latest version. But check the version to make sure it is working properly.

## Is Node Installed

Node does not come installed on most systems, but it is easy to check if it is
already on your system. Here is one simple test to see if it
is installed:

	node --help

Alternatively, you can try:

	nodejs --help

If you don't get an error message, then it is installed. In particular, you
should see output showing available commands.

It is always possible that Node is installed on your system but is not on your
path. On Windows you can generally look for Node in the start menu. There should
be a link to start a Node Command prompt, or to run Node interactively.

On Linux, Node is usually installed here:

	/usr/bin/node
	/usr/bin/nodejs

On Linux, you can use the **which** command to find the location of a program. For instance:

	$ which nodejs
	/usr/bin/nodejs

If that does not work, then NodeJs is probably not properly installed.

Reference from the Node GitHub site and other key links:

- <https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager>
- <http://howtonode.org/>

## NPM Global Packages

NPM is the [Node Package Manager](https://www.npmjs.com/). Many of the libraries that you will want to use with Node are best installed using NPM. Node and NPM are closely linked: I can't imagine using Node without NPM and vice versa. The default Node install includes NPM.

Most NPM packages are installed only for a particular project. They have local scope and are not found on your PATH. However, there are a few libraries that I like to install globally so that they are always on my path. These include:

- karma-cli
- grunt-cli
- jasmine-node
- express-generator
- nodemon
- mocha

On **Windows**, install them like this:


	npm install -g karma-cli
	npm install -g grunt-cli
	npm install -g jasmine-node
	npm install -g express-generator
	npm install -g nodemon
	npm install -g mocha


On **Windows**, this typically installs express into your **AppData/Roaming** directory.

To issue the same commands on **Linux**, you need to do some setup:

	mkdir ~/npm
	npm config set prefix ~/npm

Then add this to the bottom of your .bashrc:

    export PATH="$PATH:$HOME/npm/bin"

### What's Globally Installed? {#whatsGlobal}

To see what is installed globally, issue the **npm list** command with **-g** and **--depth=0** as arguments:

```
npm list -g --depth=0
/home/charliecalvert/npm/lib
├── bower@1.3.12
├── cordova@4.2.0
├── express-generator@4.11.2
├── generator-angular@0.11.0
├── generator-angularjs-cordova@1.0.0
├── generator-express@2.5.6
├── generator-jasmine@0.1.2
├── generator-karma@0.9.0
├── generator-mocha@0.1.6
├── grunt-cli@0.1.13
├── jasmine-node@1.14.5
├── jshint@2.6.0
├── karma-cli@0.0.4
├── mocha@2.1.0
├── node-inspector@0.8.3
├── nodemon@1.3.6
├── npm@2.4.1
├── npm-check-updates@1.5.1
└── yo@1.4.5
```

The **-g** bit ensures that we look only at globally installed packages. We use **--depth=0** to ensure we see only the packages we have explicitly installed, and not the packages that those packages rely upon.

### Configure Global Install {#configGlobal}

To make sure npm is configured correctly, type the following:

	npm config list

One Windows, it might look something like this:

```
>npm config list
; cli configs
registry = "https://registry.npmjs.org/"
user-agent = "npm/1.4.21 node/v0.10.30 win32 x64"

; builtin config undefined
prefix = "C:\\Users\\charlie\\AppData\\Roaming\\npm"

; node bin location = C:\Program Files\nodejs\\node.exe
; cwd = C:\Src\Git\JsObjects\JavaScript
; HOME = C:\Users\charlie
; 'npm config ls -l' to show all defaults.
```

On Linux, the same command yields these results on one of my VMs:

```
$ npm config list
; cli configs
registry = "https://registry.npmjs.org/"
user-agent = "npm/1.4.28 node/v0.10.35 linux x64"

; userconfig /home/charlie/.npmrc
prefix = "/home/charlie/npm"

; node bin location = /usr/bin/node
; cwd = /home/charlie
; HOME = /home/charlie
; 'npm config ls -l' to show all defaults.
```

After making changes to **.bashrc** you either restart your shell or type:  **source ~/.bashrc**. In either case, your **.bashrc** file will be processed and any changes you made should take effect.

Now you can issue the **npm install** commands shown above. The packages will be installed in your **~/npm** directory.

**NOTE**: *On JsObjects there [is a script][nodeInstall] that will perform most of the actions described above, though it will not automatically update your **.bashrc** file.*

**NOTE**: *You might also want to look in this hidden directory for additional details about your NPM installation: **~/.npm**.*

[nodeInstall]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/InstallNodePackages.sh

## NPM Local Libraries

You can use NPM to install local libraries that you will use in your node programs. These libraries are installed in the same directory as your project. In particular, they are placed in a folder called **node_modules**.

Many node program rely on a library called express. Express is not built into Node. Instead, it is a library that you must install.

**NOTE**: *Express gets installed twice. Above you saw how to globally install the express-generator. Here you are learning how to install express itself, which is a local library.*

To install **express**, we typically issue the following command from the root of our project:

	npm install express --save

This will install a local copy of express in a directory called **node_modules**.  The **--save** switch saves the command to install express into a file called **package.json**. Once express is saved into **package.json** you can reinstall it by simply typing **npm install**. You can **--save** multiple packages into **package.json**. Then you can reinstall them at any time by simply typing **npm install**. You would want to do this if you move the project to a new system, or if you deleted the **node_modules** directory. The **package.json** file also helps if you give your project to another developer. Then they can install all the needed libraries by just type **npm install**.

**NOTE**: *It is generally not appropriate to include the **node_modules** directory when you give a project to another developer or when you check it into source control. The reason for this is simple: the **node_modules** directory can be huge if you include a lot of npm packages in your project. As a result, we **--save** the libraries into **package.json** and then let the user install them with **npm install**. This is why we put **node_modules** in our **.gitignore** files.*

Any other libraries you install will also end up in this directory. For instance, if you want to installed the openid library, you would issue this command:

	npm install openid --save

Now the **node_modules** directory will contain libraries: express and openid.

What Version of a Node Package is Installed?
------------------------------------------

Use the following syntax to identify the latest version of a package:

	npm show [PackageName] version

This is not showing the version you have installed, but the latest version that
is available on the net.

For instance:

	G:\Src\Git\MyStuff>npm show voxel-engine version
	npm http GET https://registry.npmjs.org/voxel-engine
	npm http 200 https://registry.npmjs.org/voxel-engine
	0.16.3

This means that the package voxel-engine is at version 0.16.3.

To find the owner of a package, enter the following:

	npm owner ls [package]

For instance:

	G:\Src\Git\voxel-hello-world>npm owner ls voxel-hello-world
	npm http GET https://registry.npmjs.org/voxel-hello-world
	npm http 200 https://registry.npmjs.org/voxel-hello-world
	maxogden <EMAIL ENDS UP HERE>

To update all the packages you have installed globally:

	npm update -g

To update a specific global package such as grunt:

	npm update -g grunt

To update a local package such as grunt:

	npm update grunt

Remember that your globally installed file are placed in your AppData |
Roaming | npm folder. The path on your system might look something
like this:

```
C:\Users\Charlie\AppData\Roaming\npm\node_modules
```

## NPM Latest Packages
It is nice to know that your project is using the latest packages. You can do this by running the **npm outdated** command:

	npm outdated

If you first delete your **node_modules** folder, and then run it, you might see output like this:

```
charlie@mongovbox:~/Git/writings/Tech/Games/ThreeFloor$ npm outdated
npm http GET https://registry.npmjs.org/morgan
npm http GET https://registry.npmjs.org/cookie-parser
npm http GET https://registry.npmjs.org/body-parser
npm http GET https://registry.npmjs.org/debug
npm http GET https://registry.npmjs.org/serve-favicon
npm http GET https://registry.npmjs.org/express
npm http GET https://registry.npmjs.org/jade
npm http 304 https://registry.npmjs.org/morgan
npm http 304 https://registry.npmjs.org/body-parser
npm http 304 https://registry.npmjs.org/serve-favicon
npm http 304 https://registry.npmjs.org/express
npm http 304 https://registry.npmjs.org/debug
npm http 304 https://registry.npmjs.org/jade
npm http 304 https://registry.npmjs.org/cookie-parser
Package        Current  Wanted  Latest  Location
morgan         MISSING   1.3.2   1.4.1  morgan
body-parser    MISSING   1.8.4   1.9.2  body-parser
serve-favicon  MISSING   2.1.6   2.1.6  serve-favicon
express        MISSING   4.9.8  4.10.1  express
debug          MISSING   2.0.0   2.1.0  debug
jade           MISSING   1.6.0   1.7.0  jade
cookie-parser  MISSING   1.3.3   1.3.3  cookie-parser
```

Here you can see that our **package.json** file requests **morgan** 1.3.2. We can see that by opening up **package.json** and looking:

```
{
  "name": "Test05",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "express": "~4.9.0",
    "body-parser": "~1.8.1",
    "cookie-parser": "~1.3.3",
    "morgan": "~1.3.0",
    "serve-favicon": "~2.1.3",
    "debug": "~2.0.0",
    "jade": "~1.6.0"
  }
}
```

As you can see, we are explicitly asking for 1.3.0. But **npm outdated** tells us that there is a newer version. So we just update **package.json** so that it asks for the latest, which is 1.4.1:

    "morgan": "~1.4.1",

We can do the same for all the packages we are using. Then run **npm update** after you have updated your **package.json** file. That will ensure that the installed versions of the files in **node_modules** are up to date. If the call to **npm update** fails, you can always just delete the files in your **node_modules** directory and run **npm install**.

You get the same output if you run **npm outdated** if you have a **node_modules** directory, but you may see reports on the nested packages in the **node_modules**. That information may not be useful. As a result, it might be best to start by deleting the folder:

	rm -r node_modules

## Update NPM in Ubuntu

We usually want to work with a recent version of NPM. For instance, version 1.4.28. We should be able to update it fairly. Here is the standard technique, but don't do this quite yet:

	sudo npm update -g npm // DON'T DO THIS

It is not a good idea to install NPM global or local packages with sudo. We should instead configure NPM to install global updates into our home folders, or into  updates locally to our npm folder, so that we don't have to worry sudo permissions. We set that up by typing the following command:

	npm config set prefix ~/npm

This sets where we install global files as explained here: https://docs.npmjs.com/misc/config#prefix.

We want to do this. It is a best practice. However, when we type **npm update -g npm** it updates our **~/npm** version of **npm** and not the one in **/usr/bin**. Of course, the one in **/usr/bin/** is the one that is on our path. So now we have outdated version of NPM that we can reach and an updated version that we can't access. I suppose we have two solutions. The first looks like this, where we begin by updating the local copy of NPM:

	npm update -g npm
	sudo rm /usr/bin/npm
	sudo ln -s ~/npm/bin/npm /usr/bin/npm

That should create a [symbolic link](http://www.computerhope.com/unix/uln.htm) to the copy of NPM in our **/usr/bin** folder to the one in our **~/npm/bin/npm**. Then we should be on the latest. At the time of this writing, that looks like.

	$ npm --version
	2.4.1

Alternatively, I think we could temporarily set the **prefix** to **/usr/bin:**

	npm config set prefix /usr/bin
	sudo npm update -g npm

Then check your work:

	$ npm --version
	2.4.1

Then set the prefix back to ~/npm

	npm config set prefix ~/npm

##Error: Cannot find module
One of the classic Node errors looks like this:


    node Server.js

    module.js:340
        throw err;
              ^
    Error: Cannot find module XXX

In this case, XXX is usually the name of a library, such as Express, Morgan, Walk, etc. This error usually occurs because you have not typed the following command:

    npm install

This command processes the list of libraries found in the file **package.json.** The **package.json** file is usually part of any node program. There are few cases when you will not need **package.json** and in such cases its absence is not significant. In those cases, you need only type something like **node Server.js** to start the program. If, however, you get a **cannot find module** error, and **package.json** is not present, then you either do not have a complete copy of the program, or the program itself is not complete.

## More Notes on Updating NPM {#npm-update-notes}

You can check which version of NPM you have installed with this code:

```
>npm --version
```

If it returns an old version, you can update npm itself with code like this:

```
npm update -g npm
```

Now try checking your npm version again:

```
>npm --version
3.3.4np
```


A final thing to check is if the global node packages that we have installed are up to date:

```
npm outdated -g --depth=0
```

The above code asks the question: "Which globally installed NPM packages are out of date. The **--depth=0** says that we just want to know about top level packages, and not about packages that our packages rely on. For instance, we don't care if **jshint** depends on an outdated copy of underscore.

Running the outdated command might produce output that looks like this:

```
$ npm outdated -g --depth=0
Package                      Current  Wanted  Latest  Location
bower                         1.3.12   1.5.3   1.5.3  lib
cordova                        4.2.0   5.3.3   5.3.3  lib
express-generator             4.11.2  4.13.1  4.13.1  lib
generator-angular             0.11.0  0.12.1  0.12.1  lib
generator-angularjs-cordova    1.0.0   1.0.1   1.0.1  lib
generator-express              2.5.6   2.9.0   2.9.0  lib
generator-jasmine              0.1.2   0.2.1   0.2.1  lib
generator-karma                0.9.0   1.0.0   1.0.0  lib
generator-mocha                0.1.6   0.2.0   0.2.0  lib
jade                           1.9.2  1.11.0  1.11.0  lib
jasmine-node                  1.14.5   2.0.0  1.14.5  lib
jshint                         2.6.0   2.8.0   2.8.0  lib
karma-cli                      0.0.4   0.1.1   0.1.1  lib
mocha                          2.1.0   2.3.3   2.3.3  lib
node-inspector                 0.8.3  0.12.3  0.12.3  lib
nodemon                        1.3.6   1.7.1   1.7.1  lib
npm                            3.3.4   3.3.5   3.3.4  lib
npm-check-updates              1.5.1   2.2.4   2.2.4  lib
yo                             1.4.5   1.4.8   1.4.8  lib
```

The above listing tells us that many packages on our system are out of date. For instance, bower is currently set to version 1.3.12, but that the latest version of bower is 1.5.3. To fix this, we could update all our globally installed packages, a process we can take a long time on some systems:

```
npm update -g
```

Or, we could just update bower, which should take less time:

```
npm update -g bower
```

If that command fails, try uninstalling bower and then re-installing bower from scratch:

```
npm remove -g bower
npm install -g bower
```

After doing that, we can check to see if bower is still out of date:

```
$ npm outdated -g --depth=0
Package                      Current  Wanted  Latest  Location
cordova                        4.2.0   5.3.3   5.3.3  lib
express-generator             4.11.2  4.13.1  4.13.1  lib
generator-angular             0.11.0  0.12.1  0.12.1  lib
generator-angularjs-cordova    1.0.0   1.0.1   1.0.1  lib
generator-express              2.5.6   2.9.0   2.9.0  lib
generator-jasmine              0.1.2   0.2.1   0.2.1  lib
generator-karma                0.9.0   1.0.0   1.0.0  lib
generator-mocha                0.1.6   0.2.0   0.2.0  lib
jade                           1.9.2  1.11.0  1.11.0  lib
jasmine-node                  1.14.5   2.0.0  1.14.5  lib
jshint                         2.6.0   2.8.0   2.8.0  lib
karma-cli                      0.0.4   0.1.1   0.1.1  lib
mocha                          2.1.0   2.3.3   2.3.3  lib
node-inspector                 0.8.3  0.12.3  0.12.3  lib
nodemon                        1.3.6   1.7.1   1.7.1  lib
npm                            3.3.4   3.3.5   3.3.4  lib
npm-check-updates              1.5.1   2.2.4   2.2.4  lib
yo                             1.4.5   1.4.8   1.4.8  lib
```

As you can see, bower is no longer listed among our **outdated** packages. This assures us that it is up to date.

**NOTE**: *It is common for Linux only to report errors or warnings, and to say nothing on success. This example follows that rule: we are told about outdated packages, but up to date packages are simply not listed.

Get Node and NPM on your Path
-----------------------------

In many cases, and certainly in most classes I teach, your life will be
simpler if both Node and NPM are always on your path. Your install of Node
may set things up that way for you automatically. If not, make sure they are
on your path:

[http://www.elvenware.com/charlie/os/windows/faq.html\#environment](http://www.elvenware.com/charlie/os/windows/faq.html#environment)

Typically, on Windows, this is the item I want to add to my path:

- <C:\Users\Charlie\AppData\Roaming\npm>

Your milage may differ, particularly in regard to the user name, but
that should provide a start for you.

### NODE_PATH and Cannot Find Modules {#nodePath}

A related issue occurs when you cannot find modules that you installed globally with
NPM. Usually there is no need to install modules globally. However, in some cases it can be useful. Suppose you globally install walk:

```
>npm install -g walk
npm http GET https://registry.npmjs.org/walk
etc...
```

At this point, you would normally be all set to use **walk** in your
program. But sometimes you get an error like the following, even after
your install walk globablly:

```
>node Server.js

module.js:340
    throw err;
          ^
Error: Cannot find module 'walk'
    at Function.Module._resolveFilename (module.js:338:15)
    at Function.Module._load (module.js:280:25)
    at Module.require (module.js:364:17)
    at require (module.js:380:17)
```

The problem could be that you don't have the environment variable
called NODE_PATH set up correctly. To fix the problem, simply add
the correct path to your global node_modules directory to your
path:

	set NODE_PATH=C:\\Users\\Charlie\\AppData\\Roaming\\npm\\node_modules

Or, if you want, use the environment dialog as explained above.

- [See also Node and env](http://nodejs.org/api/modules.html#modules_loading_from_the_global_folders)

Node and Environment Variables
------------------------------

If you have set a global environment variable called JSOBJECTS, you
can access it like this:

	process.env.JSOBJECTS

Suppose you set JSOBJECTS to C:\Temp\JsObjects:

	set JSOBJECTS=C:\Temp\JsObjects

Now you can access this variable inside your node code:

	var jsObjects = process.env.JSOBJECTS;

## NVM: The Node Version Manager {#nvm}

Install the Node Version Manager on Linux so you can easily switch between versions of node. The Node Version Manager is designed primarily for Linux or Apple.  

* [https://github.com/creationix/nvm](https://github.com/creationix/nvm)

**NOTE**: *NVM is a great tool if you have a need to switch between versions of node. Otherwise, it can be overkill. If all your code runs find on the latest version of node, or on the currently installed version of node, then you can skip this section.*


To install NVM, do this:

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash

Then restart your shell. Now install the latest node:

    nvm install stable
    nvm use stable

If you open a new shell, you may no longer be using the latest node specified by nvm. To set things up again, type:

    nvm use stable

To make the change permanent, so you don't have to fuss with this each time you open a shell:

    nvm alias default stable

If you want to switch back to the system version installed from nodesource.com, do this:

    nvm use system


## NPM Link {#npm-link}

The following is an advanced technique and not used by most developers. It can allow you to maintain a single global copy of a library, and then reference it from your local project. In general, it is better to simply have multiple copies of your projects since that assures that you have the correct version of each library. But if you are continually using the same version of some library in many projects, then the **link** command can be useful. If you are in doubt, don't try to use this feature. It is not essential.

To link express into your project, go to the root of your project and type the following:

	npm link express.

To update node, type the following

	sudo npm install npm -g
