---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/NodePackages.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript
fileName: NodePackages.md
relativePath: /web/JavaScript/NodePackages.md
title: NodePackages
directoryName: JavaScript
category : cssguide-guide
---

# Node Packages

This document is focused on Node, NPM, webpack, babel with fading sections on Bower. It also covers the **package.json** and **bower.json** files.

## Babel

npm install -D babel-loader @babel/core @babel/preset-env webpack

You don't need to put this in **webpack.config.js** if you are using **.babelrc**:


    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    }

Just do this in **.babelrc**:

    {
        "presets": ["@babel/preset-env"]
    }

## NPM ShortCuts

A few commonly used NPM shortcuts:

| Task              |        Basic         |            Quick |
|-------------------|:--------------------:|-----------------:|
| Install           |   npm install pkg    |       npm i pkg. |
| Global Install    |  npm i --global pkg  |    npm i -g pkg. |
| Dependency        |   npm i --save pkg   |    npm i -S pkg. |
| Dev Dependency    | npm i --save-dev pkg |    npm i -D pkg. |
| list dependencies |        npm ls        | npm ls --depth=0 |

Here is additional information on NPM **scripts**, **dependencies**, **init**, and **test**:

| Task              |      Basic       |
|-------------------|:----------------:|
| See Scripts       |     npm run      |
| npm Init          |   npm init -y    |
| npm Init          |   npm init -f    |
| npm test          |      npm t       |

Also:

- npm docs
- npm version
- npm repo

## Using package.json {#packageJson}

All your projects should include a file called **package.json**. To create one from scratch, go to the root of your project and issue this command:

	npm init

You will be presented with a series of prompts to fill out. Just step through them one by one, leaving the ones that don't interest or confuse you blank. When you are done, there will be a file called **package.json** in your current directory.

To add packages to package.json, issue a command like this:

	npm install require --save

This installs the package called **require** into a folder called **node_modules**. It also saves a command to install the package into **package.json**. To reinstall **require** later, just type this command:

	npm install

This command processes **package.json** and automatically installs all the packages you **saved** into it. You can, of course, **save** information about many packages into a single **package.json** file.

The key point to remember is that **npm install** processes the contents of the file called **package.json**. It installs all the libraries listed in that file in a local directory called **node_modules**. By locally, I mean that the directory is now included in your project.

If you follow the link to [package.json][pj] for [BridgeSailor][bridgeSailor] you will see that karma is listed in that file:

    "devDependencies": {
        "requirejs": "^2.1.11",
        "karma": "^0.12.14",
        "karma-jasmine": "^0.2.0",
        "karma-requirejs": "^0.2.1",
        "karma-chrome-launcher": "^0.1.3",
        "karma-firefox-launcher": "^0.1.3"
    }

This means that running **npm install** will install all the files listed above, including the **karma** library.

The point of **npm install** and **package.json** is that they work together to install a series of libraries, rather than asking you to type the following series of individual commands:

    npm install requirejs
    npm install karma
    npm install karma-jasmine
    npm install karma-requirejs
    npm install karma-chrome-launcher
    npm install karma-firefox-launcher

Typing all of the above commands is time consuming, error prone and repetitious. Therefore we use **package.json**, which needs to be configured correctly once, and works automatically thereafter.

[pj]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/BridgeSailor/package.json
[bridgeSailor]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/BridgeSailor


## Save to Package.json

To put the thing you installed in package.json use **--save** or **--save-dev**. If it is going to be used on the client side, then use **--save**, if it is debugging or other developer tool that is used only during development, then use **--save-dev**

<pre>
	npm install "express" --save
	npm install "karma-script-launcher" --save-dev
</pre>

## Adding entries to package.json

Usually all you need to do is process **package.json** by typing **npm install**. However, you may occassionally. want to add your own dependency to package.json. Here is how to put a library called **karma-script-launcher** in **package.json**:

	npm install "karma-script-launcher" --save-dev

The command shown above first installs **karma-script-launcher** into **node_modules**. It then adds an entry for it to **package.json**. Then next time you run **npm install** the **karma-script-launcher** package will be installed automatically because it is now included in **package.json**.

Consider this command:

    npm install karma --save-dev

This command installs the library, and saves the library name into **package.json** if it is not already there.

| Command                          | Result
| :--------------------------      |:------------- |
| **npm install**                  | process package.json and install all packages it references into **node_modules**
| **npm install chai**             | install chai into node_modules
| **npm install chai --save**      | install chai into **node_modules** and add **chai** to **package.json**
| **npm install chai --save-dev**  | install chai into **node_modules** and add **chai** to **package.json** in a section listing packages used during development.


## NPM and Express

You may have a project that depends on express. In such cases, the author of the project will probably create a file called **package.json** that will contain a reference to express. If this file exists, you can just type the following to install express and any other libraries that the project depends upon:

	npm install

Here is the contents of a simple package.json file that installs both express
and openid as well as a library called mdirp:

```
	{
		"name": "OpenId04",
		"version": "0.0.1",
		"private": true,
		"scripts": {
			"start": "node ./bin/www"
		},
		"dependencies": {
	    "body-parser": "~1.13.2",
    	"cookie-parser": "~1.3.5",
    	"debug": "~2.2.0",
    	"express": "~4.13.1",
    	"jade": "~1.11.0",
    	"morgan": "~1.6.1",
    	"serve-favicon": "~2.3.0"  	
		}
	}
```

## Cannot Find Module {#module-missing}

One useful tip:

* Delete your **node_modules** folder
* Try to start your project: **npm start**

You might see something like this:

```
$ npm start

> Week02-NpmBower@0.0.0 start /home/bcuser/Git/isit320-foo-2015/Week02-NpmBower
> nodemon ./bin/www

28 Sep 17:54:30 - [nodemon] 1.7.1
28 Sep 17:54:30 - [nodemon] to restart at any time, enter `rs`
28 Sep 17:54:30 - [nodemon] watching: *.*
28 Sep 17:54:30 - [nodemon] starting `node ./bin/www`
module.js:338
    throw err;
    ^

Error: Cannot find module 'express'
```

Study this error message. You are likely to see this error quite frequently. In particular, pattern **Error: Cannot find module 'XXX'**. Getting that error usually means we have not run **npm install** or we have a problem in our **package.json** file.

The facts are simple. We often forget to run **npm install**. We make mistakes in our **package.json** files, usually because we forgot to include **--save** when we installed a particular package:

* Correct: npm install jquery --save
* Incorrect: npm install jquery

They both install **jquery**, but only the first adds an entry to **package.json**.  

Understanding the source of errors like those shown above is very helpful. Remember, we fix this error by running the following command:

```
npm install
```

Understand when to run that command, and what it does. In particular, understand that it processes the contents of **package.json**.

## More on Node and Package.json

NPM related issues are specific to node, not to Linux. If you were using node on Windows or the Mac, **npm** behaves in a very similar fashion.

**npm** is the Node Package Manager. It installs libraries that are used by Node projects. Some of the libraries, such as **fs** (the File System package) are built into node, but most are open source projects hosted on GitHub.

Here are a few node packages (libraries) that I often install globally:

    ~/npm/lib/node_modules
    ├─┬ express-generator@4.0.0
    ├─┬ grunt-cli@0.1.13
    ├─┬ jasmine-node@1.14.3
    ├─┬ js-beautify@1.5.1
    ├─┬ jshint@2.5.0
    ├─┬ karma-cli@0.0.4
    └─┬ npm@1.4.9


These are stored here on a typical Linux system:

    $ ls -l /usr/lib/node_modules/
    total 28
    drwxr-xr-x 5 nobody charlie 4096 Apr 21 12:24 express-generator
    drwxr-xr-x 6 nobody charlie 4096 Apr 20 09:57 grunt-cli
    drwxr-xr-x 9 nobody charlie 4096 Apr 21 16:02 jasmine-node
    drwxr-xr-x 4 nobody charlie 4096 Apr 26 15:43 js-beautify
    drwxr-xr-x 6 nobody charlie 4096 Apr 21 18:31 jshint
    drwxr-xr-x 4 nobody charlie 4096 Apr 27 10:23 karma-cli
    drwxr-xr-x 9 root root 4096 May 5 07:56 npm

We install these global packages by typing something like:

    sudo npm install -g karma-cli

Where **karma-cli** is the package we want to install.

Each project also has packages that it uses. Each individual project might rely on a particular version of a package. For instance, one express project might use express 3.5.1, while another might use express 4.0.0. As a result, we don't install these packages globally. Instead, we install them inside the project we are currently using. This way, a particular project can rely on a particular version of a package. Specifically, we install them in a folder called **node_modules**.

Here, for instance, are the packages installed for a project called Week02Jade:

    charlie@MountainStreamsLinux:~/Git/Prog282/Week02Jade
    $ ls -l node_modules/
    total 28
    drwxrwxr-x 3 charlie charlie 4096 Apr 26 16:44 body-parser
    drwxrwxr-x 5 charlie charlie 4096 Apr 26 16:44 cookie-parser
    drwxrwxr-x 3 charlie charlie 4096 Apr 26 16:44 debug
    drwxrwxr-x 5 charlie charlie 4096 Apr 26 16:44 express
    drwxrwxr-x 5 charlie charlie 4096 Apr 26 16:44 jade
    drwxrwxr-x 3 charlie charlie 4096 Apr 26 16:44 morgan
    drwxrwxr-x 2 charlie charlie 4096 Apr 26 16:44 static-favicon

These packages get installed when we type **npm install**. This action causes **npm** to process the contents of **package.json**, and to install the packages listed there:

```
    $ cat package.json
    {
      "name": "application-name",
      "version": "0.0.1",
      "private": true,
      "scripts": {
        "start": "DEBUG=my.application node ./bin/www"
      },
      "dependencies": {
        "express": "~4.0.0",
        "static-favicon": "~1.0.0",
        "morgan": "~1.0.0",
        "cookie-parser": "~1.0.1",
        "body-parser": "~1.0.0",
        "debug": "~0.7.4",
        "jade": "~1.3.0"
      }
    }
```

Do you see that the directory listing is the same as the packages listed in **package.json**? The bottom line is that we need to think in terms of both global and local versions of our **npm** packages.

You can find all the **npm** packages here:

- [https://www.npmjs.org/](https://www.npmjs.org/)

### Error: Couldn't Read Dependencies

Sometimes you may also see this error:

    npm install
    npm ERR! install Couldn't read dependencies
    npm ERR! package.json ENOENT, open '/home/charlie/package.json'
    etc...

This errror occurs, needless to say, because a copy of **package.json** is not found. As mentioned above, there are cases when a node program does not rely on any libraries, and hence **package.json** does not exist. But the error above usually occurs because you are not in the proper directory. For instance, you are in your home directory, and the program you want to run is in **~/Git/JsObjects/JavaScript/Design/SimpleQueue**.

To return to our main point: the primary problem that developers encounter when the see this error is simply forgetting to type **npm install**.

### Error: Address in Use EADDRINUSE {#EADDRINUSE}

The EADDRINUSE (Error Address In Use) message usually means that the
port is in use by another program. For instance, you left an
instance of a program running on the port where you want to launch your
node server. Usually, fixing this is just a matter of finding the
SSH or Windows command prompt where the server is running, and pressing
Ctrl-C to stop the server:
```
C:\Git\P282\CanvasGrid>node server.js
  Listening on port :30026
^C   <== Here I press Ctrl-C
C:\Git\P282\CanvasGrid>
```

An important variation on this error can occur if you are running upstart. Details about that variant of the [EEADDRINUSE error are discussed below](#eaddrinuse-and-upstart).

## Bower

Many developers use NPM to install server side dependencies, bower to install client side dependencies. We don't have to do things this way, but it helps us neatly partition our app if we follow this policy.

**NOTE**: _The introduction of webpack and ES6 has meant that most developers are moving on from Bower when creating new projects. However, there are still many older style projects in existence, and if you want to create an ES5, rather than an ES6, application, then Bower is still a good choice._

To begin, we need to create a bower.json file. You can do this in one of two ways:

* Run **bower init**
* Copy a sample bower.json from elsewhere: **cp $ELF_TEMPLATES/bower.json .**.

If you choose the first option, you can take all the defaults for the prompts that you see, or fill in the obvious fields with sensible values. If you choose for the second option, don't forget the period at the end of the text for the copy command. It specifies where you should copy bower.json. In particular, it says: copy it here. The environment variable $ELF_TEMPLATES points at:

```
~/Git/JsObjects/Utilities/Templates
```

By default, bower installs your files not into **node_modules** but into a directory called **bower_components**. In express applications, however, we might want to install bower components into a different directory. In particular, we might choose to place them in our project's **public/bower_components** folder. To ensure that happens, copy a bower configuration file into your project:

```
cp $ELF_TEMPLATES/.bowerrc .
```

This small text file contains the following text, which tells bower to install its components into the **public/components** folder:

```
{
  "directory": "public/bower_components"
}
```

## More on Bower {#more-on-bower}

Bower is like npm. Use NPM for server side code. Use Bower for client side code. This is not absolutely necessary, but it is common. As a result, we will learn about both NPM and Bower in this class.

Install Bower:

    npm install -g bower

Create a **bower.json** file in the root of your current project:

    bower init

You will be prompted for input. Take all the defaults or use your common sense to fill in the fields as you are prompted for them.

Remember that Windows does not like to start a file with a period. As a result, we need to create **.bowerrc** like this:

    echo { } > .bowerrc

Edit **.bowerrc** in geany and add the following so that we will install bower components into the **public/components** directory:

```javascript
{
  "directory": "public/bower_components",
  "json": "bower.json"
}
```

Again, test in **jsonlint.com** to make sure it is valid.

Install jquery:

    bower install jquery --save

The **--save** parameter saves your request for jquery into the **bower.json file.**  

My **bower.json** file now looks like this:

```javascript
{
  "name": "Week02-ExpressJQuery",
  "version": "0.0.0",
  "authors": [
    "Charlie CedarIsle Calvert <charlie@elvenware.com>"
  ],
  "description": "JQuery Demo",
  "main": "bin/www",
  "keywords": [
    "JQuery"
  ],
  "license": "MIT",
  "homepage": "www.elvenware.com",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "jquery": "~2.1.3"
  }
}
```

The most important part is the **dependencies** object at the end of the file.

Modify **/views/layout.jade** to include jquery and **Control.js**

```
doctype html
html
    head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
        script(src='components/jquery/dist/jquery.js')
        etc...
```

**NOTE**: *When I type **etc...**, that can sometimes be translated as: "Filling in this part of the file is left as an exercise for the reader."*
