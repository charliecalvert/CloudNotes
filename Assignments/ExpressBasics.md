---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ExpressBasics.md
relativePath: Assignments/ExpressBasics.md
title: ExpressBasics
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: ExpressBasics.md
fileNameHTML: ExpressBasics.html
---


<!-- toc -->
<!-- tocstop -->

# Express Basics

This assignment is designed to introduce you to [Express JS](http://expressjs.com/). Express is the library most often used by NodeJs developers when creating web applications. It is not the only way to create a Node JS application, but it is by far the most common.

- Express Presentation: [http://bit.ly/JavaScriptNode][epres]

## Before You Begin

Here are several notes that are worth considering before you start working with Node.

**NOTE**: _Express is often combined with other client side libraries. In many cases, other libraries such as jQuery, Angular or React will also be used._

**NOTE**: _You can combine React and Express, but most React applications are created with a special tool call [create-express-app][cra-home]. If your primary goal is to create a React based application, then consider using Create Express App as explained [here][elf-cra]. Alternatively, look [here][elf-react] to learn how to craft a React app from scratch._

**NOTE**: _The default Express template library used to be called Jade, but for legal reasons it is now called Pug. At this stage, at least, the two tools are essentially identical. If you find places where I reference Jade, you can simply mentally translate that to Pug, or vice-versa, depending on your needs._

## Goals

- Create an express application.
- Change the title that appears in **index.pug** and on the main page of the application at run time
- Load [jQuery][uery-home] and a custom JavaScript page
- Use raw JavaScript or jQuery to display a line of text in an HTML paragraph tag
- Switch from using **node** to using **nodemon**
- Set the port to 30025

## Get Started

Once we get rolling we will use my custom **elf-express** fork of **express generator** to create express apps. But in this one assignment, we will start with express generator and manually make a series of changes that we will later automate with **elf-express**.

The [express-generator][express-gen] automatically generates a default express application. It is installed by default in Pristine Lubuntu. If you find it is not available, you can install it automatically by the following scripts from JsObjects, which are described in the [JsObjects README][elf-js-objects]:

- [InstallNodePackages][inpack]
- [UbuntuAndCloudNineSetup][ubuntu-setup]

**NOTE**: _When reading this section, it is perhaps helpful to understand that Pristine Lubuntu comes with **nodemon**, **express-generator** and **elf-express** installed in **~/npm/bin**. I used the JsObjects scripts mentioned above to perform the install. Everything in JsObjects is open source. That repository has been available for at least a decade, and should remain available for the foreseeable future._

If you find that **elf-express** or **express-generator** are missing, or want to update them without using JsObjects, you can run these commands:

```bash
npm install -g express-generator
npm install -g elf-express-generator
```

## Create

To use the **express-generator**, simply type the word **express** followed by the name of the project you want to create. The generator will create a folder for your project and place the project inside it. Here then, are the three basic steps you may perform to create an express application:

```bash
express --view=pug Week03-ExpressBasics
cd Week03-ExpressBasics
npm install
```

The last command, **npm install**, is extremely important. It processes the libraries that are specified in the **dependencies** and **devdependencies** sections of **package.json** and puts the compiled output in a folder called **node_modules**. There will be more on this subject [in other sections of this course](/javascript-guide/NodeJs.html#npm-install-notes).

Load the project in WebStorm. Open up **/bin/www** and set the port 30025:

```javascript
const port = normalizePort(process.env.PORT || '30025');
```

In the same file, modify **server.listen** so that it echos out the port you are using when you start the app:

```javascript
server.listen(port, () => console.log('listening on', port));
```

Then open up **package.json** and ensure that you are using **nodemon** rather than **node** to _start_ your project when you type **npm start**. I'm intentionally being a big vague here as I want you to study **package.json** in at least enough depth to discover the **start** property and see how to replace the word **node** with **nodemon**. If you find that process baffling then you need to spend time reviewing JavaScript basics. (JSON is a subset of JavaScript.)

**NOTE**: _The npm **nodemon** package should be installed by default in Pristine Lubuntu. To test if it is installed, run this command: **nodemon --version**. If it does not return an error, then it is likely properly installed. If you need to install it for some reason, or if you need to update it, issue this command: **npm install -g nodemon**._

Now start the newly created express project:

```bash
npm start
```

Load the project in a browser by navigating to this address:

- [http://localhost:30025](http://localhost:30025)

You may get an error that looks a bit like this:

```code
Error: Cannot find module 'http-errors'
```

If that happens, try typing **npm install** or this shorter version of the same command: **npm i**.

## Change the Title

Open up **/routes/index.js**. In the route for opening your page, change the title to **Prog272-LastName**, where LastName is your last name. Here is the place where you should make the change:

```javascript
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
```

Change the word **Express** to **Prog262-LastName**, where LastName is your last name.

**NOTE**: _I'll ask you to do similar permutations in variables or words that include strings like **LastName** many times in this course. Please, use your common sense, don't try to be too clever by literally turning in the phrase **Prog272-LastName**. Instead, put in your last name. For instance, **Prog272-Calvert**._

Your default Pug code in **views/index.pug** should look like this:

    block content
      h1= title
      p Welcome to #{title}

The Pug compiler will use interpolation to swap out the word **title** and replace it with the **title** you defined in **routes/index.js**. We see two different ways to tell Pug to make the substitution. In one case we write:

    h1= title

Here the syntax **= title** is swapped for the word **Express** found in **routes/index.js**.

Here is a second way to do the same thing:

    p Welcome to #{title}

Now **#{title}** is swapped out and **Express** put in its place. This is called **interpolation**. This kind of functionality is found in most template engines. Pug is a popular template engine, but it is by no means the only such engine.

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

Again, notice that Pug has a short hand for nearly all HTML statements. After you get your program running view the generated HTML so you can confirm that all is working as expected. Notice also that we are loading jQuery from a CDN. A CDN is an Internet site that stores commonly used files.

## Understanding Layout.pug {#layout-pug}

In Pug, we have two main files: 

*   layout.pug
*   index.pug

To oversimplify a bit: by convention, in **layout.pug** we define the HTML **HEAD** element for our HTML pages. In **index.pug,** we define the **BODY** element. There is no technical reason why this must be so, it is just a habit we form, a convention, that helps us organize our code.</span>

The idea is this: we might have 1, 5, 10, 100, 1000 or more HTML files in our project. In most cases, every HTML file will have different content in the BODY, and most of these pages will have the same content in the HEAD. 

In Pug, we can create one **layout.pug** file that contains our shared HEAD element. Then we create one or more additional Pug files that contain the BODY elements for each page. Like this:

*   layout.pug
*   index.pug
*   about.pug
*   contacts.pug

Our index, about and contacts pages will all use the same **HEAD** element defined in **layout.pug**.

We define the bottom of **layout.pug** like this:

    body
      block content

We define the top of **index.pug** like this:

    extends layout

    block content

The **extends layout** part tells Pug to link in **layout.pug**. The **block content** part tells Pug to override the **block content** from **layout.pug**. In that override we define the content for our **BODY** element for the **index.html** page.

Let's dig into this a bit deeper. We declare a **BODY** tag in **layout.pug** and define an empty **block content** section inside it. Since we did not actually define any content such as an H1 or P tag, we have, in effect, declared an empty **BODY** tag. But Pug knows that the empty **BODY** tag has an empty **block** in it. In **index.pug** we override that **block** and use that space to define the contents of the **BODY** tag. In particular, we use the **block** keyword to override the empty **content** block from **layout.pug** with our own content to be used in the **BODY** element. Perhaps you can see that this system can be used to combine several Pug pages to achieve various effects. For more information, see the [Pug documentation](https://pugjs.org/language/inheritance.html).

If this seems a bit much, rest assured that a day will come when this will make complete sense to you, but for now, if it seems a bit complicated, then just think about putting the HEAD element in **layout.pug** and the implementation for your **BODY** element in **index.pug**, **about.pug**, and etc...

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

**NOTE**: _It is sometimes better to use **document ready** rather than **window.onload** because jQuery will call each instance of **document ready** that you create._


## Turn it in

Place your project files in the folder of your repository specified above. In the root of same folder of your repository, or attached to your assignment, include a screen shot of your project running in a browser.

![shot](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGS0lFaUNiY3RjOUE)

When you turn in the the assignment, include the URL of your repository. It should look something like this:

```
git@github.com:user-name/prog272-lastname-2019.git
```

## Package Missing

Our projects usually have a file called **package.json**.

In that file is a list of dependencies that our project relies on.

```javascript
"dependencies": {
  "cookie-parser": "~1.4.4",
  "debug": "~4.1.1",
  "express": "~4.16.4",
  "http-errors": "~1.7.2",
  "morgan": "~1.9.1",
  "pug": "2.0.3"
}
```

**NOTE**: _The version numbers on your packages may differ, but this should not matter so long as Express is at least at version 4.0.0._

These are the libraries that our project uses. As you can see, **http-errors** is one of those libraries.

In order to install these libraries, we type **npm install**. (Or some of you may want to use yarn instead: **yarn install**, but in this class we will standardize on npm. If you use **yarn**, you are on your own.) Note that **npm install** is run automatically by a script I will introduce later called **CreateExpressProject.**

Running **npm install** causes our **package.json** file to be processed and the libraries listed there to be downloaded from the cloud and placed in a directory called **node_modules.**

All good and well. But in our **.gitignore** file, we tell Git to ignore -- to not check in -- our **node_modules** directory. We do this because that directory is huge and makes our repository unwieldy. There are other problems as well as its size, but let's just stick with that one issue for now.

Again, all good well. But when we pull our repository or our project onto a new machine, then **package.json** comes with it but **node_modules** does not. This means we have to run **npm install** to recreate our **node_modules**.

In general, when you see the error "Cannot find module XXX," the first thing to do is try running **npm install** from the root of your project.

## Webpack

In the code shown above we are using a CDN to load jQuery. Using CDNs is a good practice. However, they will not work if you do not have access to the Internet. If you want to solve the problem, you can make jQuery or other libraries a part of your project and load them with [Webpack](https://webpack.js.org/). If you want, you can even use Webpack to transpile your ES6 to ES5 so it can be used on older browsers. Here is how to proceed.

Just to be clear: we don't have to use [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) but these are very commonly used tools. Webpack bundles multiple files together, and Babel transpiles ES6 code to ES5.

The first step would be to remove our code that loads jQuery from a CDN. Open up **views/layout.pug** and remove these lines:

```pug
script(src='//code.jquery.com/jquery-1.11.2.min.js')
script(src="/javascripts/control.js")
```

Add this line at the bottom of **views/index.pug**:

```pug
script(src="javascripts/bundle.js")
```

Install the packages we need:

```code
npm i @babel/core @babel/preset-env babel-loader webpack webpack-cli
npm i jquery
```

Here we load babel and webpack and then jQuery. I put them on separate lines not because they need to be installed with separate commands, but in order to lump webpack and babel together, and set jQuery off by itself. The point is that Webpack and Babel work together very closely in this example, and in many other programs. jQuery is something else altogether.

**NOTE**: _I feel compelled to add that jQuery, which is probably still the most popular JavaScript library, is on its way out. It was vital when the web was younger, and the differences between browsers more pronounced. Now our updated browsers, better JavaScript implementations, and Webpack make it less appealing._

Create **webpack.config.js**:

```javascript
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './public/javascripts/control.js',
    output: {
        path: __dirname + '/public/javascripts',
        filename: 'bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
```

In this file:

- We specify that we are in **development** rather than **production** mode. We are still developing the app.
- We want to compile the code in control.js and in any files that it imports. (We are not importing anything in this case.)
  - With Webpack we are usually put files like **control.js** in a directory off the root of the project called **Source** or **src**. I'm not doing that in this case in order to keep the code the same whether we use webpack or not.
- In the **module** section we create a **rule** saying that all JavaScript files linked from the **entry** property should be run through Babel so they can transformed from ES6 to ES5 and also combined into one file. Thus, at run time our program does not have to load **jQuery** and **control.js**; we can just load **bundle.js**. In **production** mode we can do further processing to compress and semi-obfuscate the files, but that is not important to us at this stage.
- In **output** we specify that webpack should create a file called **bundle.js** that contains our source code.
- **devtool** tells webpack to create a file called, in this case, **bundle.map.js** that will help map code in the debugger from **bundle.js** to your original source files. Thus you don't have to look at the lengthy and complex source in **bundle.js**, instead you can just see the source in your original source files. We have only one original source file called **control.js**. (We can ignore jQuery since we don't need to debug it.)
- Finally, in the **plugins** property we define an array that allows us to include jQuery in **bundle.js**

Instead of the options in **module** rule, we could put the presets in a file called **.babelrc**. We create **.babelrc** in the root of the project with the following contents:

```javascript
{
    "presets": ["@babel/preset-env"]
}
```

But we don't need this file in this project because the information is included in our webpack. The .babelrc file would be useful if we wanted to run babel without webpack. Also, I show it to you because it is commonly included in many projects.

## Bower

We do not have to load jquery from a CDN or from webpack as we do above. Instead, we can install it locally with bower. This option used to be the default, but now it is on the way out. I include it only for the sake of completeness. It is more emphatically on the way out than jQuery, but like jQuery, it is still widely used.

Later in the course, we will may show how to automatically set up our **bower** files with **elf-express** or **CreateExpressProject** or some similar tool. But in this assignment, we can, if we want, generate them by hand, by following the guidelines outline in this section of the assignment. (On the other hand, I may strip bower from my scripts, and start relying on Webpack instead.)

There are two of files you need to create in the root of your project. The first is **.bowerrc**:

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
    "jquery": "^3.4.0",
    "bootstrap": "^4.3.1"
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

Note that you can also put your settings in the app.js file:

```
process.env['DEBUG'] = 'server:mainapp,routes:dev-web,routes:index,setup-marked';
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
