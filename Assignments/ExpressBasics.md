# Express Basics

This assignment is designed to introduce you to [Express Js](http://expressjs.com/). Express is the library most often used by NodeJs developers when creating web applications. It is not the only way to create an application, but it is by far the most common.

- Express Presentation: [http://bit.ly/JavaScriptNode][epres]

## Before You Begin

Here are several notes that are worth considering before you start working with Node.

**NOTE**: _Express is often combined with other client side libraries. In many cases, other libraries such as jQuery, Angular or React will also be used._

**NOTE**: _You can combine React and Express, but most React applications are created with a special tool call [Create Express App][cra-home]. If your primary goal is to create a React based application, then consider using Create Express App as explained [here][elf-cra]. Alternatively, look [here][elf-react] to learn how to craft a React app from scratch._

**NOTE**: _The default Express template library used to be called Jade, but for legal reasons it is now called Pug. At this stage, at least, the two tools are essentially identical. If you find places where I reference Jade, you can simply mentally translate that to Pug, or vice-versa, depending on your needs._

## Goals

- Create an express application
- Change the title that appears in **index.pug** and on the main page of the application at run time
- Load [jQuery][jquery-home] and a custom JavaScript page
- Use raw JavaScript or jQuery to display a line of text in an HTML paragraph tag
- Switch from using **node** to using **nodemon**
- Set the port to 30025

## Get Started

The [express-generator][express-gen] automatically generates a default express application. It is installed automatically by the following scripts from JsObjects, which are described in the [JsObjects README][elf-js-objects]:

- [InstallNodePackages][inpack]
- [UbuntuAndCloudNineSetup][ubuntu-setup]

**NOTE**: _When reading this section, it is perhaps helpful to understand that Pristine Lubuntu comes with both **nodemon** and the **express generator** installed in **~/npm/bin**. I used the JsObjects scripts mentioned above to perform the install. Everything in JsObjects is open source. That repository has been available for at least a decade, and should remain available for the foreseeable future._

If you find the **experss-generator** is missing, or want to update it without using JsObjects, you can run this command:

```bash
npm install -g express-generator
```

To use the **express-generator**, simply type the word **express** followed by the name of the project you want to create. The generator will create a folder for your project and place the project inside it. Here then, are the three basic steps you may perform to create an express application:

```bash
express --pug Week03-ExpressBasics
cd Week03-ExpressBasics
npm install
```

The last command, **npm install**, is extremely important. It processes the libraries that are specified in the **dependencies** and **devdependencies** sections of **package.json** and puts the compiled output in a folder called **node_modules**. There will be more on this subject [in other sections of this course](https://www.elvenware.com/javascript-guide/NodeJs.html#npm-install-notes).

Load the project in WebStorm. Open up **/bin/www** and set the port 30025\. Then open up **package.json** and ensure that you are using **nodemon** rather than **node** to _start_ your project when you type **npm start**. I'k intentionally being a big vague here as I want you to study **package.json** in at least enough depth to discover the **start** property and see how to replace the word **node** with **nodemon**. If you find that process baffling then you need to spend time reviewing JavaScript basics. (JSON is a subset of JavaScript.)

**NOTE**: _You will also need to install **nodemon** if it has not been installed already. To install it, issue this command **npm install -g nodemon** To test if it is installed, run this command: **nodemon --version**. If it does not return an error, then it is likely properly installed._

Now start the newly created express project:

```bash
npm start
```

Load the project in a browser by navigating to this address:

- [http://localhost:30025](http://localhost:30025)

## Change the Title

Open up **/routes/index.js**. Change the title to **Prog272-LastName**, where LastName is your last name.

## Create Custom JavaScript

Create a file called **/public/javascripts/control.js**. It should contain the following code:

```javascript
window.onload = function() {
    console.log("control.js loaded");
    const dynamic = document.getElementById('dynamic');
    dynamic.textContent = 'control is loaded';  
};
```

Or do it with jQuery:

```javascript
$(document).ready(function() {
    console.log("control.js loaded");
    $("#dynamic").html("control.js loaded");
});
```

**NOTE**: _It is often better to use **document ready** rather than **window.onload** because jQuery will call each instance of **document ready** that you create._

## Modify your Pug Files

In **index.pug**, create a paragraph in which to display your custom text:

```
p#dynamic
```

This is [Pug syntax](https://pugjs.org/language/tags.html) to create an HTML paragraph element with an ID of "dynamic".

Note that Pug cares about white space. Your paragraph should be indented on the same level as the **Welcome** paragraph. If you are in doubt, open your Pug file in Geany and select **View | Show WhiteSpace**. In WebStorm it's **View | Active Editor | Show WhiteSpace**, but my eyes aren't good enough to see the subtle symbols they use to display WhiteSpace.

**NOTE**: _I think I prefer to use spaces rather than tabs, but the most important thing is to be consistent. Choose one or the other and stick with it in all your files. I reserve the right to change my mind as to my preference._

Use the **script** tag to load the **control.js** JavaScript file in **/views/layout.pug**:

```pug
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

Again, notice that Pug has a short hand for nearly all HTML statements. After you get your program running view the generated HTML so you can confirm that all is working as expected.

## Turn it in

Place your project files in the folder of your repository specified above. In the root of same folder of your repository, or attached to your assignment, include a screen shot of your project running in a browser.

![shot](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGS0lFaUNiY3RjOUE)

When you turn in the the assignment, include the URL of your repository. It should look something like this:

```
git@bitbucket.com:lastname/prog219_lastname.git
```

## Package Missing

Our projects usually have a file called:

package.json

In that file is a list of dependencies that our project relies on.

"dependencies": {  
    "cookie-parser": "~1.4.3",  
    "debug": "~2.6.9",  
    "express": "~4.16.0",  
    "http-errors": "~1.6.2",  
    "morgan": "~1.9.0",  
    "pug": "2.0.0-beta11"  
  }

These are the libraries that our project uses. As you can see, **http-errors** is one of those libraries.

In order to install these libraries, we type **npm install**. (Or if you want to be cutting edge: **yarn install**, but don't worry about that for now.) Note that **npm install** is run automatically by **CreateExpressProject.**

Running **npm install** causes our **package.json **file to be processed and the libraries listed there to be downloaded from the cloud and placed in a directory called **node_modules.**

All good and well. But in our **.gitignore** file, we tell Git to ignore -- to not check in -- our **node_modules** directory. We do this because that directory is huge and makes our repository unwieldy.

Again, all good well. But when we pull our repository or our project onto a new machine, then **package.json** comes with it but **node_modules** does not. This means we have to run **npm** **install** to recreate our **node_modules**.

In general, when you see the error "Cannot find module XXX," the first thing to do is try running **npm install** from the root of your project.

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

## Understanding package.json


Many projects have dependencies on libraries such as Express or Jade. When you
place it in GitHub, or share with others, it is usually convenient to store your
project with the libraries it uses because the libraries tend to be big and
bulky. The ideal situation would be to ship your source code, and then leave a
reference to the libraries it needs. The user can then install the libraries as
needed, rather than downloading them with the source. Fortunately, there is an
automated way to separate your source from their libraries. In particular you
can include a file called **package.json** with your project. In that file you
can define the dependencies for your project. The Node Package Manager (npm) can
read this file and automatically download the needed libraries.

You can use the JSON shown in this file to define the dependencies for your
project. Here is a typical example:

```
{
    "name": "expressSend",
    "description": "Work with express and sending information",
    "version": "0.0.1",
    "private": true,
    "dependencies": {
        "express": "3.1"
    }
}
```

A file like this should usually be called **package.json**. To use the file,
just type the following:

```
npm install
```

In the case of the file shown above, this command will install express version
3.1.

**Note**: *You can learn the version of number of the most recent release of
express by typing the following*:

```
npm info express version
```

## Debug in Browser

- [One minute video][dib]

[elf-js-objects]: https://github.com/charliecalvert/JsObjects/blob/master/README.md
[express-gen]: https://expressjs.com/en/starter/generator.html

[dib]: https://youtu.be/VUeA1NfwY_o

[inpack]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/InstallNodePackages.sh
[jquery-home]: https://jquery.com/
[ubuntu-setup]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/UbuntuAndCloudNineSetup
[epres]: http://bit.ly/JavaScriptNode
[cra-home]: https://github.com/facebookincubator/create-react-app
[elf-cra]: http://bit.ly/jest-cra
[elf-react]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactBasics.html
