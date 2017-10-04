## Overview

We are going to work on a project that already exists. It is a tool for building web sites. Our goal is to take a project students built several years ago and update it to use React. We will:

- Clean up the code
- Improve and extend the tests
- Refactor the code
  - to have a cleaner architecture
  - to use React and Redux

Think of it this way. You have been handed a project that kind of works, but is not quite yet ready to be released. Your job is to bring it to Version 1.0, a release build. This is a very real world task. Many developers are handed partially broken code, or an existing project, and told to clean it up. This is particularly true for new hires.

## Get Started

For these projects:

- [https://github.com/charliecalvert/isit-web-crafts](https://github.com/charliecalvert/isit-web-crafts)
- [https://github.com/charliecalvert/isit-code](https://github.com/charliecalvert/isit-code)

## The Main Modules

There will be three main parts of this application:

- **ElvenWebCrafts**: A GUI front end for building websites from markdown.
  - It is based on code written in another of my classes that needs to be updated.
- **ElvenCode**: an NPM package written by students in another of my classes.
  - Also needs updating
- **ElvenSiteTools**: Code I wrote that needs to be improved

Each student will maintain their own copy of these projects.

## Create Your Packages

Create two NPM packages based on the code in **ElvenCode** and **ElvenSiteTools**. Append your name to these projects:

- elven-code-lastname
- elven-site-tools-lastname

For instance, in my case, the first NPM package would be called:

- elven-code-calvert

If you get the casing, the separater (a hypen), or anything else wrong, you will get the assignment kicked back at you. The names need to be exactly right.

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

## Ubuntu Server 16.04 with MongoDb

Here is a copy of Ubuntu Server with MongoDb pre-installed. It's about 2 GB, so have patience with the download.

- [Ubuntu Server OVA](http://www.ccalvert.net/books/CloudNotes/Assignments/Mongo/UbuntuServerOva.html)

When the download is complete load it in VirtualBox.

**NOTE**: _The server is relatively small. It can run on machines with limited resources. You can lower the amount of RAM allocated to it and it should still work._

The login:

- UserName: bcuser
- Password: bcuser

The code first loads your key. Then copies the matching public key to the **authorized_keys** file on the server. Then it logs into the server.

## Example Database Records for Login

The data model is defined in **models/user.js**. Here is a simplified example MongoDb record:

```json
{
    "lastName": "bar",
    "firstName": "bar",
    "email": "bar@foo.com",
    "password": "abc",
    "username": "bar",
}
```

Actual records will look more like this.

```json
{
    "_id": {
        "$oid": "557f238c77e80f000a9e4100"
    },
    "lastName": "bar",
    "firstName": "bar",
    "email": "bar@foo.com",
    "password": "abc",
    "username": "bar",
    "__v": 0
}
```

## MLab Database for Login

In routes/connect.js you will need to file in these fields if you want to connect to the database :

```
var userName = 'YOUR-USER-NAME';
var password = 'YOUR-PASSWORD';
var siteAndPort = 'YOUR-MONGODB-SITE-AND-PORT';
var databaseName = 'YOUR-DATABASE-NAME';
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
