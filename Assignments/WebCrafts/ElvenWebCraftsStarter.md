---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts/ElvenWebCraftsStarter.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts
fileName: ElvenWebCraftsStarter.md
relativePath: /WebCrafts/ElvenWebCraftsStarter.md
title: ElvenWebCraftsStarter
directoryName: WebCrafts
category : webcrafts-guide
---

## Overview

For the next several weeks, we are going to work on a project that already exists. It is a tool for building web sites. Our goal is to take a project students built several years ago and update it. We will:

- Clean up the code
- Improve and extend the tests
- Refactor the code
  - to have a cleaner architecture
  - to use React and Redux

This set of assignments is designed to mirror a scenario you are likely to encounter in the workplace. Employees are often handed a project that needs to be updated or that is not yet ready to be released. They are asked to polish and improve the code. Their job is to bring it to Version 1.0, a release build.

This is a very real world task. Many developers are handed partially broken code, or an existing project, and told to clean it up. This is particularly true for new hires.

**NOTE**: _Use your common sense, but in general, throughout this document, if you see a file name, directory, or repository that has **-lastname** in its title, you should substitute your last name for the word **lastname**. For instance, in my case, **isit-code-lastname** should become **isit-code-calvert**._

## Get Started

It might be helpful if you first [Watch the Video](https://youtu.be/cZ3DrcBS7cI) to help get a feeling for what is going on.

We will be working with these projects:

- [https://github.com/charliecalvert/isit-code][ic]
- [https://github.com/charliecalvert/isit-site-tools][ist]
- [https://github.com/charliecalvert/isit-web-crafts][iwc]

[ic]: https://github.com/charliecalvert/isit-code
[ist]: https://github.com/charliecalvert/isit-site-tools
[iwc]: https://github.com/charliecalvert/isit-web-crafts

## The Port

I have tended to run this program on port 30200. I do this because I leave it running much of the time, and want to leave ports 30025, 30026, 8080 and 3000 open for other node programs. We should, however, run the program on our familiar port 30025. Make the change in **bin/www**

```javascript
var port = normalizePort(process.env.PORT || '30025');
```

## The Main Modules

This project has been divided into a main program and two libraries. This is code left over from half completed projects worked on during previous quarters. They all need to be updated:

- **IsitWebCrafts**: A GUI front end for building websites from markdown.  
- **IsitCode**: an NPM package written by students in another of my classes  
- **IsitSiteTools**: Another NPM package that contains various utilities

Each student in this class will maintain their own copy of these projects.

## Create NPM Packages

We will fork the projects I created. Based on your fork of my original project, you will create two NPM packages. For instance, you will create Git repositories based on the code in **isit-code** and **isit-site-tools**. Append your last name to your versions of these projects:

- **isit-code-lastname**
- **isit-site-tools-lastname**

In my case, the first NPM package would be called:

- isit-code-calvert

If you get the casing, the separator (a hypen), or anything else wrong, you will get the assignment kicked back at you. The names need to be exactly right.

## The Login

When **IsitWebCrafts** is first launched, the user is asked to log in. You can log in with the username and password **foo**. The login works, but at first, we will simply want to disable the login so we don't have to both with it during development.

To know how to disable the login, you need to know something about [Express][ex] Middleware. This is one of the most important parts of the Express package. Please read at least some of this [discussion of middleware][em].

[em]: http://expressjs.com/en/guide/using-middleware.html
[ex]: http://expressjs.com/

When an HTTP request comes to an Express server, the Express library parses it. It then passes the request to whatever middleware you create. This middleware is typically found in a single method, but you can chain several methods together by calling the **next()** method passed as a parameter parameter to your middleware. In particular, see the last parameter in this code:_

```javascript
router.get('/', isAuthenticated, function(request, response, next) {})
```

Here is the code from **routes/index.js** that is called when the user asks for the home page:

```javascript
var isAuthenticated = function(request, response, next) {
    'use strict';

    // Passport added the this method to the request object.
    console.log('isAuthenticated called');
    if (request.isAuthenticated()) {
        console.log('successfully authenticated');
        return next();
    }

    console.log('in isAuthenticated, user not authenticate, send to login');
    response.redirect('/login');
};

router.get('/', isAuthenticated, function(request, response, next) {
    'use strict';
    response.render('index', {
        title: 'Elven Site Options',
        author: 'Charlie Calvert'
    });
});
```    

The **isAuthenticated()** method is middleware that is called before the user can access the home page. If the user is logged in, then **isAuthenticated** calls **next()**, and the home page loads. Otherwise, the login page is called.

Without removing the **isAuthenticated** method, rewrite it so that the user is automatically taken to the home page whether they are logged in or not. You can make whatever changes you want to **isAuthenticated**, but it must continue to be called from the home page route. I would either comment out or otherwise preserve the code in the current working code from the method so that you can replace it later on, when we want to add login again.

After completing the **isAuthenticated** code correctly, you will still get a series of benign database errors when you start **WebCrafts**. The errors don't break the app, but they are ugly to look at. To clean up that annoyance, for now you should comment the references to **connect** from the copy of **app.js** that appears in the root of your repository:

```javascript
// Connect to DB
//var connect = require('./routes/connect');
//connect.doConnection(false);
```

The second and third lines above were the ones that I commented out.

## Fork Repos

Fork the following repositories:

- charliecalvert/isit-code
- charliecalvert/isit-site-tools
- charliecalvert/isit-web-crafts

Your version of these repositories will be public. As a result, you should be sure that they contain a license. Common choices are the [MIT][mit] or [ISC][isc] license.

[mit]: https://opensource.org/licenses/MIT
[isc]: https://opensource.org/licenses/ISC

On GitHub, use the Settings (gear) icon and rename your fork of my repository to include your last name:

- isit-code-lastname
- isit-site-tools-lastname
- isit-web-crafts-lastname

## Get Repos

Create a folder in your **~/Git** directory called **webcrafts** or something similar. Clone your new repositories into your new folder.
```
mkdir webcrafts
cd webcrafts
git clone <git@github.com:username/isit-code-lastname.git>
git clone <git@github.com:username/isit-site-tools-lastname>
git clone <git@github.com:username/isit-web-crafts-lastname>
```

## Customize your New Repo

Open up the **package.json** file for each project and change the name to include your last name.

If you don't have one already, create an account on **NPM**. Log into it. Then read through this guide and apply the lessons found there to this task.

- [NPM Publishing](http://www.ccalvert.net/books/CloudNotes/Assignments/NpmPublishing.html)

In **isit-site-tools-lastname**, run the following command:

```
npm install --save isit-code-lastname
```

In **isit-web-crafts-lastname**, run the following commands:

```
npm install --save isit-code-lastname isit-site-tools-lastname
```

Change all references to my repos to your repos. You will have to replace the string **lastname** with your last name:

```
find . -iname "*.js" -not -path "**/node_modules/**" | xargs sed -i 's/isit-code-calvert/isit-code-lastname/g' *.js
```

- [More on sed][mos]

In the WebCrafts project, you are going to have to change references to **isit-code-calvert** and **isit-site-tools-calvert**.

**NOTE**: _Please don't turn in your **isit-web-crafts-lastname** project with links to my repos in your source files._

## Pull Changes from the Original Repository

Suppose I have made an update to the repository from which you forked your code. In particular, suppose I have updated this repository:

- [isit-site-tools](https://github.com/charliecalvert/isit-site-tools)

Assuming your code has not diverged too wildly from my original code, you can get my changes like this:

```
git pull git@github.com:charliecalvert/isit-site-tools.git
```

You should issue the command from within your repository. It's probably best to be at the root of your repository.

```
charlie@rohan-elf:~/Git/isit-calvert-2017/isit-site-tools-calvertbc (master)
$ git pull git@github.com:charliecalvert/isit-site-tools.git
remote: Counting objects: 3, done.
remote: Total 3 (delta 2), reused 3 (delta 2), pack-reused 0
Unpacking objects: 100% (3/3), done.
From github.com:charliecalvert/isit-site-tools
 * branch            HEAD       -> FETCH_HEAD
Updating 970b5ef..0f2a0a4
Fast-forward
 package.json | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

## The Config File

Here is the configuration file for the project. It is found in **config/ElvenConfig.json**

```
{
    "calvert": {
        "base-dir": "/home/charlie/",
        "bootswatch": "cosmo",
        "most-recent-date": "2017-08-14",
        "site-dirs": [
            "Documents/AllSite",
            "Git/CloudNotes/Isit320"
        ],
        "destination-dirs": [
            "/var/www/html/AllSite/",
            "/home/charlie/Git/charliecalvert.github.io/books/CloudNotes/Isit320/"            
        ],
        "destination-dirs-extra": [{
            "base": "/var/www/html/",
            "extra": ""
        }, {
            "base": "/var/www/html/Assignments/",
            "extra": "Assignments"
        }]
    },
    "selectedElvenImages": [
        "california1",
        "california2"
    ],
    "elvenImages": [
        {
            "name": "doc",
            "baseDir": "The base directory where the images to be processed are found",
            "cloudPath": "Base string found in markdown files",
            "createSmallImages": true
        },
        {
            "name": "california",
            "baseDir": "/var/www/html/images",
            "cloudPath": "/images",
            "createSmallImages": true
        },
        {
            "name": "california1",
            "baseDir": "/var/www/html/images",
            "cloudPath": "https://s3.amazonaws.com/s3bucket01.elvenware.com",
            "createSmallImages": true
        },
        {
            "name": "california2",
            "baseDir": "/var/www/html/images",
            "cloudPath": "/images",
            "createSmallImages": true
        }
    ]
}
```

## ElvenConfig Symbolic Links.

Put a symbolic link to **ElvenConfig.json** file in your **~/.config** directory:

```
cd ~/.config
ln -s <PATH TO ElvenConfig.json> .
```

For instance:

```
ln -s $HOME/Git/WebCrafts/isit-web-crafts-calvertbc/config/ElvenConfig.json .
```

This should also work:

```
ln -s $GIT_HOME/WebCrafts/isit-web-crafts-calvertbc/config/ElvenConfig.json .
```

Consider defining the following in **~/.my_bash_aliases**:

```
export WEBCRAFTS=$GIT_HOME/WebCrafts
```

Then you could write:

```
ln -s $WEBCRAFTS/isit-web-crafts-calvertbc/config/ElvenConfig.json .
```

And finally, define this in **~/.my_bash_aliases**:

```
alias i3w='cd $WEBCRAFTS'
alias i3wc='cd $WEBCRAFTS/isit-code-calvertbc'
alias i3ws='cd $WEBCRAFTS/isit-site-tools-calvertbc'
alias i3ww='cd $WEBCRAFTS/isit-web-crafts-calvertbc'
```

Run **source ~/.bashrc**. Now you can navigate to your repos with commands like this:

- **i3w**
- **i3wc**
- **i3ws**
- **i3ww**

Like this:

```
$ i3w
charlie@rohan-elf:~/Git/WebCrafts
$ i3wc
charlie@rohan-elf:~/Git/WebCrafts/isit-code-calvertbc (master)
$ i3ws
charlie@rohan-elf:~/Git/WebCrafts/isit-site-tools-calvertbc (master)
$ i3ww
charlie@rohan-elf:~/Git/WebCrafts/isit-web-crafts-calvertbc (Week05-React)
```

## Understanding ElvenConfig

Once you have **ElvenConfig.json** installed, the next step is to begin to understand it.

The config file has three primary sections:

- calvert:
  - Configure the code the creates HTML from Markdown
- elvenImages:
  - Configure the code that creates Markdown from a set of Images
- Selected Elven Images
  - The sections of elvenImages that the program should process when creating Markdown that displays a set of images.

Given a set of Markdown files in a directory, the program can convert them to HTML

Given a set of images in a directory, the program can create a markdown page that is able to display them all. For instance, if **foo.png** is in a directory, the program will generate Markdown similar to this:

```
![Foo](foo.png)
```

## Lamp

I assuming that LAMP is installed:

```
sudo apt-get install tasksel
sudo tasksel install lamp-server
```

And then chown /var/www/html so you can access it:

```
sudo chown -R bcuser:bcuser /var/www/html
```

Or something close to that.

## Run

Make sure you have some markdown files in a directory called **Documents/AllSite**. These are the markdown files that the program will transform into HTML. Here is a few lines of code that would create the directory and three simple markdown files:

```
mkdir -p /home/bcuser/Documents/AllSite
echo '# One' > /home/bcuser/Documents/AllSite/One.md
echo '# Two' > /home/bcuser/Documents/AllSite/Two.md
echo '# Three' > /home/bcuser/Documents/AllSite/Three.md
```
## The Packages Hint

We will be modifying our **isit-code** and **isit-site-tools** packages as we work. If we are working on main **WebCrafts** web application, and want to make changes to -- for instance -- our **isit-code** package, we have three choices:

- Do the fix in the **isit-code**, publish it, run **npm install** to get the updates in **WebCrafts**.
- Put our fix in our copy of **node_modules/isit-code**.
  - If we do this then we need to meld (merge) it back to the repository that holds our real copy.
- Create a symbolic link from our **WebCraft** application's **node_modules** directory to our **isit_code** directory.
  - If we choose this option, we should temporarily remove our references to **isit-code** from **packages.json**.
  - Before you turn in your work, restore the references.

Of these three options, the first is the easiest to understand, but the hardest to do in practice. The second option is pretty good, but can cause problems if we forget to the merge. As a result, the third is probably the most useful option, if you know what you are doing.

## Turn it in

- [Watch the Video](https://youtu.be/cZ3DrcBS7cI)

Turn in links to your three repository. Line them all up (probably in the comments area) so I can just block copy them:

- git clone git@github.com:&lt;name&gt;&lt;isit-code&gt;
- git clone git@github.com:&lt;name&gt;&lt;isit-site-tools&gt;
- git clone git@github.com:&lt;name&gt;&lt;web-crafts&gt;

**NOTE**: _You can also provide links to your code on github, but the primary things I want to see are **git clone** statements that I can simply block copy and run. Test them on your end in a temp directory to be sure they work._

I should then be able to enter your web-crafts folder, type the following and be up and running:

- **npm install && bower install && npm start**

Attach a screenshot of the program running successfully and producing the three HTML files from the markdown. What you see in the next to last "scene" in my video. The one where I run the app, but before I display the results in a browser.

[mos]:http://www.elvenware.com/charlie/os/linux/LinuxBasics.html#using-sed
