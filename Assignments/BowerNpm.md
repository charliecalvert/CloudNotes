# NPM and Bower

The goal of this exercise is to make sure you know how to use our front end and server side package managers.

## References

There are two decks that should prove helpful:

* [NPM](http://bit.ly/elf-npm)
* [Bower](http://bit.ly/elf-bower)

And this rough text from Elvenware:

* [Node Packages](http://bit.ly/node-packages)

Also potentially useful:

* [Angular and Yeoman](http://bit.ly/angular-yeoman)

NPM on Elvenware

* [NPM on Elvenware][elven-npm]

[elven-npm]: http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#npm-global-packages

## Step 01: Install {#install}

Confirm that NPM and node are installed and on relatively recent versions:

```
$ npm --version
3.3.4
$ node --version
v4.1.1
```
If your version of node is older than 4.0.0, or your version of NPM is older than 3.0.0 then you should read this document on Elvenware:

- [Node Install](http://bit.ly/elven-node-install)

In particular, check the sections on updating node and updating packages.

I have decided that the node version manager (nvm) is more trouble than it is worth. These two lines of code can be used to turn off the node version manager, or at least to ensure that we use the primary version of node installed on a system:

    nvm use system
    nvm alias default system

You may need to restart your bash shell after issuing these commands.

## Step02: Create Application {#create}

In the bash shell, navigate to your Git folder. Create a nodejs express project called Week02-NpmBower:

```
express Week02-NpmBower
cd Week02-NpmBower
npm install
```

The first steps creates our projects. In the second step we navigate into the project folder. In the third step we install the packages on which our default express project relies. The packages get installed into a folder called **node_modules**.

In general, you only need to run **npm install** once per project. The main exceptions to this rule are as follows:

* You may need to run **npm install** if you update the packages on which your project relies.
* Run it again if you pull from git begin development on a new machine or in a new directory. We   

To better understand the third step, beging by opening your project in WebStorm. Open **package.json** and inspect the dependencies:

```
"dependencies": {
    "body-parser": "~1.13.2",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "express": "~4.13.1",
    "jade": "~1.11.0",
    "morgan": "~1.6.1",
    "serve-favicon": "~2.3.0"
  }
```

This is the standard set of packages installed for an express project. For now you need only concern yourself with two of these libraries:

* express: Use this to set up your web server and handle requests from the client.
* jade: Use this to generate the HTML for your application

Among our goals over the next weeks will be to understand these libraries. You don't, however, need to understand them yet. Perhaps the take-away at this point is simply: "Whenever I hear anything about express or jade I ought to pay strict attention, as these are subjects I'm expected to understand."

## Step03: Bower

The **CreateExpressProject** script automates the setup of Bower. To read more about exactly what it does, see this section from the Elvenware site:

- [Bower on Elvenware][elf-bower]

[elf-bower]: http://www.elvenware.com/charlie/development/web/JavaScript/NodePackages.html#bower

## Step04: Install Packages {#install-packages}

Use NPM to install grunt:

```
npm install grunt --save
```

We'll learn about grunt later. For now, just install it.

Use bower to install jquery and boostrap:

```
bower install bootstrap --save
```

This single command will install both jquery and bootstrap. If you wanted to install jquery without installing bootstrap, then issue this command:

```
bower install jquery --save
```

## Step05: Load Bootstrap and jQuery {#load}

In WebStorm, open up **views/layout.jade**. Jade is sensitive to indentation. As a result, you should be very careful not to disturb the indentation in your file.

Modify the jade code to load both jQuery and Bootstrap:

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
  body
    block content
```

## Step06: Run Your Project {#run}

Modify **bin/www** so that your project runs on port 30025:

```
var port = normalizePort(process.env.PORT || '30025');
```

Modify **package.json** to start your project with **nodemon** instead of **node**:

```
"scripts": {
    "start": "nodemon ./bin/www"
},
```

**nodemon** will automatically restart your project whenever your modify a JavaScript file that is part of your project. This saves you from having to constantly restart your project when you want to see your updates.

To run your project, type the following in the root of your project

```
npm start
```

Now you need to confirm that your work in **layout.jade** did in fact create code that loads **jquery** and **bootstrap**. Open up Chromium or Chrome. Press F12 to load the developer tools. Turn to the **network** page. Make sure that you can see that both **jquery** and **bootstrap** loaded.

There should be no red text on the page. Red text is usually reserved for errors. If you see errors, modify your **layout.jade** file to correct them.

You should also change the title in **routes/index.js**:

```javascript
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PUT YOUR TITLE HERE'' });
});
```

## Turn it in

Check your project into Git. Push it to BitBucket or GitHub. When you submit the project in Canvas, include the URL of your Git repository.

## Suggestion One

Read this section from Elvenware:

* [Module Missing][mod-miss]

[mod-miss]: http://www.elvenware.com/charlie/development/web/JavaScript/NodePackages.html#module-missing

## Suggestion Two

Perhaps the following is written with tongue in cheek, but sometimes the truth is said in jest.

Once you have completed the project successfully, move to your **Source** directory or to a **temp** directory.

Redo the whole assignment.

Multiple times.

Keep redoing it until you have it memorized. You should be able to do everything in this assignment in your sleep. We will do it over and over again in this class, so it is best to become completely familiar with these steps as soon as possible.

Even if it is hard to take that request seriously, you should nonetheless strive to become familiar with the basics of NPM and Bower. These tools are an essential part of node development as practiced in this class. Indeed, most node developers use NPM, and many of them use Bower. Understanding how to work with **bower.json** and **package.json** files, and how to install packages with NPM and Bower are very useful and important skills.  

## Get the Most Recent Copy of .bash_aliases {#new-bash-aliases}

The first step is to get the most recent copy of JsObjects. Navigate to the JsObjects folder and pull down the most recent content:

```
cd ~/Git/JsObjects/
git pull
```

Now navigate to the Utilities folder and copy my updated version of **.bash_aliases** to the root of your home folder:

```
cp ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases ~/.bash_aliases
source ~/.bash_aliases
```

The last command shown above loads the updated **.bash_aliases** file into memory. You could do the same thing by restarting the bash shell.
