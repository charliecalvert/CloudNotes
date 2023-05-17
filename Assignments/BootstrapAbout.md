---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/BootstrapAbout.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: BootstrapAbout.md
relativePath: /BootstrapAbout.md
title: BootstrapAbout
directoryName: Assignments
category : assignments-guide
---

# In Class Bootstrap

Bootstrap allows you to create great projects with beautiful CSS that looks good on a PC, a tablet or a phone.

To get started using bootstrap, create a new express project called **Week02InClassBootstrap**.

## Step One: Install {#install}

There are two several ways to get Bootstrap. For now, I want you to use bower to install it. However, as an FYI, I will also provide a link that allows you to download bootstrap from their website. Download

### Download with Bower {#bower}

First copy our default **bower.json** and **.bowerrc** files from [JsObjects][bower-copy].

```
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
```

Remember that we define **$ELF_TEMPLATES** in our **.bash_alias** file. That file is maintained on [JsObjects][bash-alias].

[bower-copy]:https://github.com/charliecalvert/JsObjects/tree/master/Utilities/Templates
[bash-alias]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/.bash_aliases

### Download directly {#down-direct}
Now we will add in **bootstrap**.

- [Download bootstrap](http://getbootstrap.com/getting-started/#download)
- Unzip it
- Copy **bootstrap.min.css** and **bootstrap-theme.in.css** to your project's **publis/stylesheets** folder.
- Copy **bootstrap.min.js** to **public/javascripts**


## Step Two: Link to Bootstrap {#link}

There are multiple ways to link in bootstrap. The two we care about are:

* Directly in your header
* Via **requirejs**

In this exercise, I want you to link in Bootstrap directly in the header. As an FYI, I will include information about use **requirejs**.


### Link directly {#direct}

We need to link in three files:

* boostrap.css
* jquery.js
* bootstrap.js

Here is what **layout.jade** looks like when you are done:

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

### With Require {#requirejs}

Please skip this section. In **Main.js** we need to shim in bootstrap by adding it to the end of our list of shims in **require.config**:

```
paths: {
        "jquery": "javascripts/jquery-2.1.1",
        "bootstrap": "javascripts/bootstrap.min",
        // Lots omitted here
    },
    shim: {
        // Lots omitted here
        'bootstrap': {
            deps: ['jquery']
        }
    }
});
```

Since bootstrap depends on **jquery**, if we load bootstrap, then we are loading jquery. So we can change our require statement at the bottom of **Main.js**. Right now perhaps it looks something like this:

    require(['jquery', 'MarkdownExtra', etc....
    
We should edit it so it looks like this:    
    
    require(['bootstrap', 'MarkdownExtra', etc....

## Create

You need to create some files. You can just make a copy of index.jade and name it About.jade, then make a copy of index.js and name it About.js, then make a copy of layout.jade and name it BootstrapLayout.jade. You'll need to edit these files, as explained below, but making these copies gets you started.

- views/About.jade
- views/BootstrapLayout.jade
- routes/About.js

So now that you have those files you need to tell Express that it should load the About page when it is requested. To do this, you need to add the following to app.js:

    var about = require('./routes/About')
    app.use('/About', about);   


Here is the contents of **BootstrapLayout.jade**:

```
doctype html
html
  head
    title= title
    link(rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css")
    link(rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css")
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js")
    script(src="javascripts/require.js" data-main="javascripts/Main")

  body
  div.navbar.navbar-inverse.navbar-fixed-top(role='navigation')
    div.container
      div.navbar-header
        button.navbar-toggle(type='button', data-toggle='collapse', data-target='.navbar-collapse')
          span.sr-only Toggle navigation
          span.icon-bar
          span.icon-bar
          span.icon-bar
        a.navbar-brand(href='#') Prog282-Calvert
    
  block content
```

Or alternately, put this in it, which is probably a bit easier to use. It is only the last few lines that differ from above:

```
doctype html
html
  head
    title= title
    link(rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css")
    link(rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css")
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js")
    script(src="javascripts/require.js" data-main="javascripts/Main")

  body
  div.navbar.navbar-inverse.navbar-fixed-top(role='navigation')
    div.container
      div.navbar-header
        button.navbar-toggle(type='button', data-toggle='collapse', data-target='.navbar-collapse')
          span.sr-only Toggle navigation
          span.icon-bar
          span.icon-bar
          span.icon-bar
        a.navbar-brand(href='#') Prog282-Calvert
      div.collapse.navbar-collapse
        ul.nav.navbar-nav
          li.active
            a(href='/') Home
    
  block content
```

When creating Jade from HTML you find on the bootstrap site, don't forget about: http://html2jade.org/.

And here is your **About.js** file:

```
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('About', { title: 'About BridgePattern' });
});

module.exports = router;
```

Please note the changes to the line that begins **res.render**. 

And here is **About.jade**:

```
extends BootStrapLayout

block content
  h1= title
  p Welcome to #{title}
```  
  
##Reference

This is not the assignment, but you might find material in this [older assignment useful][1].

##Turn It In

Put your work in your repository in a folder called **Week11InClassBootstrap**.

> Written with [StackEdit](https://stackedit.io/).


  [1]: http://www.elvenware.com/charlie/books/CloudNotes/Assignments/LampBootstrap.html