## Overview

We are going to work on a project that already exists. It is a tool for building web sites. Our goal is to take a project students built several years ago and update it to use React. We will:

- Clean up the code
- Improve and extend the tests
- Refactor the code
  - to have a cleaner architecture
  - to use React and Redux

Think of it this way. You have been handed a project that kind of works, but is not quite yet ready to be released. Your job is to bring it to Version 1.0, a release build. This is a very real world task. Many developers are handed partially broken code, or an existing project, and told to clean it up. This is particularly true for new hires.

**NOTE**: _Use your common sense, but in general, throughout this document, if you see a file name, directory, or repository that has **-lastname** in its title, you should substitute your last name for the word **lastname**. For instance, in my case, **isit-code-lastname** should become **isit-code-calvert**._

## Get Started

For these projects:

- [https://github.com/charliecalvert/isit-web-crafts](https://github.com/charliecalvert/isit-web-crafts)
- [https://github.com/charliecalvert/isit-code](https://github.com/charliecalvert/isit-code)

## The Main Modules

There will be three main parts of this application:

- **IsitWebCrafts**: A GUI front end for building websites from markdown.
  - It is based on code written in another of my classes that needs to be updated.
- **IsitCode**: an NPM package written by students in another of my classes.
  - Also needs updating
- **IsitSiteTools**: Code I wrote that needs to be improved

Each student will maintain their own copy of these projects.

## Create Your Packages

Create two NPM packages based on the code in **isit-code** and **isit-site-tools**. Append your last name to these projects:

- isit-code-lastname
- isit-site-tools-lastname

For instance, in my case, the first NPM package would be called:

- isit-code-calvert

If you get the casing, the separator (a hypen), or anything else wrong, you will get the assignment kicked back at you. The names need to be exactly right.

## The Login

The login works, but at at first, we will simply want to disable login so we don't have to both with it during development. Here is the code from **routes/index.js** that is called when the user asks for the home page:

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

Without removing the **isAuthenticated** method, rewrite this bit of middleware so that the user is automatically taken to the home page whether they are logged in or not. You can make whatever changes you want to **isAuthenticated**, but it must continue to be called from the home page route. I would either comment out or otherwise preserve the code in the current working code from the method so that you can replace it later on, when we want to add login again.

## Fork Repos

Fork the following repositories:

- charliecalvert/isit-code
- charliecalvert/isit-site-tools
- charliecalvert/isit-web-crafts


Make them private.

On GitHub, use the Settings (gear) icon and rename them to include your last name:

- isit-code-lastname
- isit-site-tools-lastname
- isit-web-crafts-lastname

## Get Repos

```
mkdir isit-lastname-2017
cd isit-lastname-2017
git clone <git@github.com:username/isit-code-lastname.git>
git clone <git@github.com:username/isit-site-tools-lastname>
git clone <git@github.com:username/isit-web-crafts-lastname>
```

Open up the **package.json** file for each project and change the name to include your last name.

Now you will need to create an NPM repository based on your versions of the **isit-code** and **isit-site-tools** repositories. Begin by logging into or creating your account on **NPM**. Then read through this guide and apply the lessons found there to this task.

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

**NOTE**: _If you turn in your **isit-web-crafts-lastname** project with links to my repos in your source files, you will get it kicked back with a score of 5._

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
            "/home/charlie/Git/charliecalvert.github.io/books/CloudNotes/Isit320/",
            "/var/www/html/"
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

Put a symbolic link to this file in your ~/.config directory:

```
cd ~/.config
ln -s <PATH TO ElvenConfig.json> .
```

The file has three primary sections:

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



## The Packages



## Turn it in
