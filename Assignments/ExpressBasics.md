# Express Basics

This assignment is designed to introduce you to [Express Js](http://expressjs.com/). Express is the library most often used by NodeJs developers when creating web applications. It is not the only way to create an application, but it is by far the most common.

- Express Presentation: [http://bit.ly/JavaScriptNode][epres]

## Before You Begin

Here are several notes that are worth considering before you start working with Node.

**NOTE**: _Express is rarely used on its own. It is simply the foundation on which more complex applications are built. In most cases, other libraries such as jQuery, Angular or React will also be used._

**NOTE**: _You can combine React and Express, but most React applications are created with a special tool call [Create Express App][cra-home]. If your primary goal is to create a React based application, then consider using Create Express App as explained [here][elf-cra]. Alternatively, look [here][elf-react] to learn how to craft a React app from scratch._

**NOTE**: _The default Express template library used to be called Jade, but is now called Pug. At this stage, at least, the two tools are essentially identical. If you find places where I reference Jade, you can simply mentally translate that to Pug, or vice-versa, depending on your needs._

## Goals

- Create an express application
- Change the title that appears in **index.pug** and on the main page of the application at run time
- Load [jQuery][jquery-home] and a custom JavaScript page
- Use jQuery to display a line of text in an HTML paragraph tag
- Switch from using **node** to using **nodemon**
- Set the port to 30025

## Get Started

The [express-generator][express-gen] automatically generates a default express application. It is installed automatically by the following scripts, which are described in the [JsObjects README][elf-js-objects]:

- [InstallNodePackages][inpack]
- [UbuntuAndCloudNineSetup][ubuntu-setup]

However, if you find it is missing, or need to update it, this is the install command:

```bash
npm install -g express-generator
```

To use the **express-generator**, simply type the word **express** followed by the name of the project you want to create. The generator will create a folder for your project and place the project inside it. Here then, are the three basic steps you may perform to create an express application:

```
express --pug Week03-ExpressBasics
cd Week03-ExpressBasics
npm install
```

Load the project in WebStorm. Open up **/bin/www** and set the port 30025\. Then open up **package.json** and ensure that you are using **nodemon** rather than **node** to _start_ your project when you type **npm start**.

**NOTE**: _You will need to install **nodemon** if you have not done so already. To install, issue this command **npm install -g nodemon**._

Now start the project:

```
npm start
```

Load the project in a browser:

```
http://localhost:30025
```

## Change the Title

Open up **/routes/index.js**. Change the title to **Prog272-LastName**, where LastName is your last name.

## Create Custom JavaScript

Create a file called **/public/javascripts/control.js**. It should contain the following code:

```javascript
$(document).ready(function() {
    console.log("control.js loaded");
    $("#dynamic").html("control.js loaded");
});
```

**NOTE**: _It is often better to use **document ready** rather than **window.onload** because jQuery will call each instance of **document ready** that you create._

## Modify your Pug Files

First load the JavaScript in **/views/layout.pug**:

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src='//code.jquery.com/jquery-1.11.2.min.js')
    script(src="/javascripts/control.js")
  body
    block content
```

Also, in **index.pug**, be sure you have created a paragraph in which to display your custom text:

```
p#dynamic
```

## Turn it in

Place your project files in the folder of your repository specified above. In the root of same folder of your repository, or attached to your assignment, include a screen shot of your project running in a browser.

![shot](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGS0lFaUNiY3RjOUE)

When you turn in the the assignment, include the URL of your repository. It should look something like this:

```
git@bitbucket.com:lastname/prog219_lastname.git
```

## Bower

Your bower files should be set up for you automatically by CreateExpressProject. If you want to confirm that they are correct, or generate them by hand, then follow these guidelines.

There are two of them. The first is **.bowerrc**:

```javascript
{
  "directory": "public/bower_components"
}
```

The second is **bower.json**:

```javascript
{
  "name": "elven-project",
  "version": "0.0.0",
  "authors": [
    "Charlie Calvert"
  ],
  "description": "Angular Unit Tests",
  "keywords": [],
  "license": "MIT",
  "homepage": "http://www.elvenware.com",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "bootstrap": "^4.1.0",
    "jquery": "^3.3.1"
  }
}
```

They belong in the root of your project. To process the files, type:

    bower install

## Debug

It is possible to create debug output that is only displayed if the environment variable called **DEBUG** is set to a certain value. Look in **bin/www**. Find a line like this:

```javascript
var debug = require('debug')('Week03-ExpressBasics:server');
```

This statement says that debug output will be shown if the environment variable **DEBUG** is set to **Week03-ExpressBasics:server**.

To set it, go to the bash shell and set the DEBUG environment variable like this:

```
export DEBUG=Week03-ExpressBasics:server
```

When you run your program you should now see additional output in the shell:

```bash
$ npm start

> Week03-ExpressBasics@0.0.0 start /home/charlie/Git/prog272-calvert-2016/Week03-ExpressBasics
> nodemon ./bin/www

[nodemon] 1.9.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www`
  Week03-ExpressBasics:server Listening on port 30025 +0ms
```

You are getting extra debug output, such as the last line showing what port you are running on. In particular, see if you can find code like this near the bottom of **bin/www**

```javascript
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);  <==== THE DEBUG STATEMENT
}
```

[elf-js-objects]: https://github.com/charliecalvert/JsObjects/blob/master/README.md
[express-gen]: https://expressjs.com/en/starter/generator.html
[inpack]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/InstallNodePackages.sh
[jquery-home]: https://jquery.com/
[ubuntu-setup]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/UbuntuAndCloudNineSetup
[epres]: http://bit.ly/JavaScriptNode
[cra-home]: https://github.com/facebookincubator/create-react-app
[elf-cra]: http://bit.ly/jest-cra
[elf-react]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactBasics.html
