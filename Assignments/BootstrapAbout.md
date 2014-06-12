#Week11 In Class Bootstrap

Bootstrap allows you to create great projects with beautiful CSS that looks good on a PC, a tablet or a phone.

To get started using bootstrap, create a new express project called **Week11InClassBootstrap**.

## Download

Now we will add in **bootstrap**.

- [Download bootstrap](http://getbootstrap.com/getting-started/#download)
- Unzip it
- Copy **bootstrap.min.css** and **bootstrap-theme.in.css** to your project's **publis/stylesheets** folder.
- Copy **bootstrap.min.js** to **public/javascripts**

Now in **Main.js** we need to shim in bootstrap by adding it to the end of our list of shims in **require.config**:

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

- views/About.jade
- views/BootstrapLayout.jade
- routes/About.js

Add to app.js:

    var about = require('./routes/About')
    app.use('/About', about);   


BootstrapLayout:

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

Or alternately, put this in it:

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

About.js:

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

About.jade:

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