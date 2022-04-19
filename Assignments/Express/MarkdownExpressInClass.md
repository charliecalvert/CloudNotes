---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Express/MarkdownExpressInClass.md
relativePath: Assignments/Express/MarkdownExpressInClass.md
title: MarkdownExpressInClass
queryPath: Assignments/Express/
subject: Express
fileNameMarkdown: MarkdownExpressInClass.md
fileNameHTML: MarkdownExpressInClass.html
---


<!-- toc -->
<!-- tocstop -->

# Markdown Express in Class

Project Name: **Week09-InClassMarkdownExpress**

Make sure you have the generator-express installed:

    npm install -g generator-express
    npm install -g generator-mocha

Then do this:

    yo express

And chose these options:

    BASIC
    JADE
    NONE
    GRUNT

And then install mocha:

    yo mocha

And also:

    npm install marked --save

## Fix NPM

    npm install -g npm

Make sure that **~/npm/bin/npm --version** gives what you want.

## Remove bad npm:

    sudo rm /usr/bin/npm

Replace with the good npm:

    sudo ln -s /home/bcuser/npm/bin/npm /usr/bin/npm

## Is Everything up to date

    npm outdated -g --depth=0
    npm update -g
    npm list -g

## Mixin

Create mixin.jade

Paste in this:

```code
extends layout

include mixins

block content
  h1= title
  p Welcome to #{title}

  +attribution

  include:md index.md
```

And about:

```javascript
/**
 * Created by charlie on 3/4/15.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.render('about', { title: 'About In Class Markdown Express' });
});

module.exports = router;
```

Like this in app.js:

```javascript
var routes = require('./routes/index');
var users = require('./routes/user');
var about = require('./routes/about');
```

And like this:

```javascript
app.use('/', routes);
app.use('/users', users);
app.use('/about', about);
```

Create a link to the about page:

```html
a(href="about") About
```

Create a new JavaScript file called **Control.js** and put it in **public/js**. And install jquery:

```bash
bower install jquery --save
```

And then your layout.jade:

```code
doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width')
    title= title
    block css
      link(rel='stylesheet', href='/css/style.css')
    block js
      script(src="components/jquery/dist/jquery.js")  
      script(src="js/Control.js")
      script(src='http://localhost:35729/livereload.js')
  body
    block content
```

The load statement:

```javascript
$("#displayArea").load("/about/garply");
```

Then respond in a route found in **routes/about.js**:

```javascript
router.get('/garply', function(request, response) {
   response.render('garply', {title: 'Garply'});
}
```    
