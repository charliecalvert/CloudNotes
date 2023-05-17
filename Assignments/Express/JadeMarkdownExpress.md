---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Express/JadeMarkdownExpress.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Express
fileName: JadeMarkdownExpress.md
relativePath: /Express/JadeMarkdownExpress.md
title: JadeMarkdownExpress
directoryName: Express
category : express-guide
---

Goals:

*   We often need to create text that will be reused in multiple locations.
*   When we make a change to that file in one place, we want the changes to appear everywhere.
*   We want to be able to combine this text with other text in a simple way, and to do so often as we want.
*   We want to use markdown to compose text, but have the full power of HTML when we render that text.

The ElfSite example express example.

Integration with Bootstrap.

Here is a simple example of using both the **extends** and **include** syntax:

```code
    extends ../index.jade
    block append content
        .container
            +logo
            h1= title
            p Welcomes to #{title}
            include:md JadeMarkdownExpress.md
            include:md JadeMarkdownExpress-Project.md
```

Notice also the **mixin**: +logo.

And the use of **block append**.

## Jade

Jade and Mixins: [http://bit.ly/jade-mixins](http://bit.ly/jade-mixins)

Install Jade globally:

*   npm install -g jade

Here is most or perhaps all of a **Render.js** script to process a jade file and copy it to your github.io folder:

```javascript
    var jade = require('jade');
    var fs = require('fs');

    options = {
        "filename": "Render.js",
        "title": "My Title",
        "basedir": "/home/charlie"
    };

    var files = [
        {
            "in": "views/css/ElvenSass.jade",
            "out": "/development/web/CssGuide/ElvenSass.html"
        }, {
            "in": "views/web/index.jade",
            "out": "/development/web/index.html"
        }
    ]

    function writeFile(fileToProcess) {
        var html = jade.renderFile(fileToProcess.in, options);
        fs.writeFile(process.env.GIT_HUB_IO + fileToProcess.out, html, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('wrote file');
            }
        });
    }

    for (var i = 0; i < files.length; i++) {
        writeFile(files[i]);
    }
```

Set up the **GIT_HUB_IO** environment variable in **.bash_aliases** so that it always present:

    export GIT_HUB_IO=$GIT_HOME/charliecalvert.github.io
    alias gitio="cd $GIT_HUB_IO"

The second one is just for convienance, so you can navigate to your folder quickly.

I am pushing to **github.io** frequently, so I have this **go** script in the root of that folder:

```bash
    #! /bin/bash

    git add .
    git commit -m "These are auto changes. Use dollar sign 1 to pass parameter."
    git push
```

I think this would allow you customize the commit message:

    git commit -m 'My Changes: "$1".'

Here is a fancier version called **PushMe.sh** that includes a date:

```bash
    #!/bin/sh

    NOW=$(date +"%m-%d-%Y")
    PARAM="$1 $NOW"

    git add .
    git commit -m "$PARAM"
    git push
```

And here is one that could tie them both together so you can do everything with one command:

```bash
    #! /bin/bash

    node Render.js 'ElvenSass.html'
    cd $GIT_HUB_IO
    ./PushMe.sh "$1"
```

## Setup Your Environment

Use aliases and scripts to automate the process.

Setup involves:

*   github.io
*   .bash_alias aliases
*   npm install marked --save
*   npm install -g jade

The **Render.js** script. The **Render** script.

## Tools

Use [retext](http://sourceforge.net/projects/retext/) to edit markdown. This can be installed from the Software Center on Lubuntu.

# Jade Markdown Express Project

Create a project that uses:

*   Yeoman
*   Express
*   Jade
*   Mocha
*   marked (for markdown)

Like this:

    npm install -g jade
    mkdir Week09-JadeMarkdownExpress
    cd Week09-JadeMarkdownExpress
    yo express
    yo mocha
    npm install marked --save

Create or edit four Jade pages:

*   index.jade
*   CensusApi.jade
    *   CensusApi.md
*   MixinMadness.jade
    *   MixinMadness.md
*   mixins.jade

Use **mixins.jade** to create, at minimum, Bootstrap menus for **index.jade**. Extend **CensusApi.jade** and **MixinMadness.jade** with the menus from index.jade.

**Include** the appropriate markdown in each page. For instance, put **CensusApi.md** in **CensusApi.jade**.

Include some links and some text about Mixins and the CensusApi on the appropriate pages.

Type **grunt**, run the project, and show the pages you created. Take a screenshot.

Create script that converts the Jade and Markdown to HTML, then places the resulting file in your **lastname.github.io** repository. Push the pages.

## Set up the routes

Suppose you asked for these routes:

*   [http://localhost:30025/DemoPages/CensusApi.html](http://localhost:30025/DemoPages/CensusApi.html)
*   [http://localhost:30025/DemoPages/MixinMadness.html](http://localhost:30025/DemoPages/MixinMadness.html)

It gets boring to keep writing the same code over and over in your **routes/index.js** file:

```javascript
    router.get('/DemoPages/CensusApi.html', function(req, res) {
        res.render('DemoPages/CensusApi', { title: 'Cordova PhoneGap' });
    });

    router.get('/DemoPages/MixinMadness.html', function(req, res) {
        res.render('DemoPages/MixinMadess', { title: 'Prog272' });
    });

    etc, into eternity
```

So do this instead:

```javascript
    function getExtension(fileName) {
        fileName = fileName.trim();
        var array = fileName.split(".");
        if( array.length === 1 || ( array[0] === "" && array.length === 2 ) ) {
            return "";
        }
        return array.pop().toLowerCase();
    }

    function swapExtension(fileName, ext) {
        return fileName.substr(0, fileName.lastIndexOf('.')) + ext;
    }

    router.get('/DemoPages/:pageRequested', function(request, response) {

        var fileRequested = request.params.pageRequested;
        if (getExtension(fileRequested) === 'html') {
            response.render('DemoPages/' + swapExtension(fileRequested, '.jade'), {title: 'Linux FAQ'});
        } else {
            response.send({
                route: '/DemoPages:pageRequested',
                result: 'success',
                request: request.query,
                params: request.params,
                id: request.params.pageRequested,
                fileRequested: fileRequested
            });
        }
       // res.render('Os/Linux/LinuxFAQ', { title: 'Linux FAQ' });
    });
```

Now any files you pass in that has an HTML extension and has a corresponding Jade file will get served up automatically. For instance, this request should cause **CensusApi.jade** to be automatically rendered:

*   [http://localhost:30025/DemoPages/CensusApi.html](http://localhost:30025/DemoPages/CensusApi.html)

If you pass in requested page that does not have an HTML extension, then a relatively detailed response is sent back explaining what was passed to the route. For instance, this request would elicit the detailed response because it ends with HTM rather than HTML:

*   [http://localhost:30025/DemoPages/CensusApi.htm](http://localhost:30025/DemoPages/CensusApi.htm)

The response might look something like this:

```json
    {
        "route":"/DemoPages:pageRequested",
        "result":"success",
        "request":{},
        "params":{"pageRequested":"CensusApi.htm"},
        "id":"CensusApi.htm",
        "fileRequested":"CensusApi.htm"
    }
```

You will probably want to play with this function to get it to do exactly what you want. Also, you can read up on express request parameters here:

*   [http://expressjs.com/api.html#request](http://expressjs.com/api.html#request)

## The Census Page

Here are some optional guidelines for creating the census page.

Here is one of the pages from my application:

![StateGraphs](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGY1B5MzFZdTJKVzQ)

And then maybe show some code samples describing how the page is rendered.

## The Mixin Page

Here are some optional guidelines for creating the mixin page.

Here is one of my mixin pages:

![mixin](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGS21ZNUhrS1JtVzg)

Then include some code showing how you created the page:

## Turn it in

Include:

*   Your Week09-* folder
*   Attach your screenshots to the assignment when you turn it in
*   Provide the URL to your pages on lastname.github.io.
