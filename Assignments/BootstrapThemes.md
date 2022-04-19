---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/BootstrapThemes.md
relativePath: Assignments/BootstrapThemes.md
title: BootstrapThemes
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: BootstrapThemes.md
fileNameHTML: BootstrapThemes.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

In this exercise you will learn how to add new themes to your bootstrap pages. In particular we will:

- Apply various themes to change the look and feel of the pages we create when we run **MakeHtml**
- Learn about various HTML snippets that we can place in our markdown files in order to create flashy components. The components themselves might be unique to bootstrap, or just be oridinary HTML elements such as a button. The key point is that the often complex CSS in bootstrap can turn even ordinary HTML elements into what many users find to be _bright shining objects_. This is your chance to make your pages shine, to give them a modern, fancy look. Or at any rate, I and many other users find these controls attractive. If you don't like the bootstrap look and feel, there are other, similar libraries out there:

- <http://responsive.vermilion.com/compare.php>
- [CodeMentor bootrap vs foundation][bsvsf]

**NOTE**: _When moving to Ec2, if you get unexpected errors, see the hint found near the end of this assignments._

[bsvsf]: https://www.codementor.io/css/tutorial/bootstrap-3-vs-foundation-5-front-end-framework-comparison

## Custom CSS

As a rule, it is not a good idea to try to add your own custom CSS to Bootstrap pages. Just go along with the look and feel they create.

You can add small touches, but when you try to define how the page looks, making major design decisions, you are just going to get in trouble.

Frankly, only a very few people have both:

- A good design sense
- The technical chops to create create CSS that handles both desktop and mobile devices

It is possible to get to the point where you can do that kind of thing, but it is difficult, or at least not easy. For most developers, using a tool like bootstrap is the best solution.

## Hint

Here is an overview of what you will do in this assignment:

1. Run renewMakeHtml one time. This ensures that MakeHtml is at the latest version.
2. Change and play with the bootswatch property in the config file. Do this as often as you want.
3. Create markdown files that use bootstrap related components. Change the the boostwatch theme to see how the bootstrap components look under different themes.

## Get Started

Two steps:

- Pull the latest from JsObjects.
- Go to your **~/Source** directory and run **renewMakeHtml** one time. This will ensure you have the latest version of **MakeHtml.** There are recent changes, so you want to be sure you have the latest version. After you get the latest version, there is no need to run **renewMakeHtml** again until I update the source code for **MakeHtml**. It is usually days, and potentially weeks, months, or even years between releases. So it is unlikely that you would need to run **renewMakeHtml** twice on the same day unless we are sitting down together and working interactively.

Now you are ready to begin trying the new theme feature in the program. You are also ready to create markdown pages that take advantage of features found in these themes. All this is explained below.

## Configure

There is a new option in the configuration file called [bootswatch](https://bootswatch.com/). It enables you to create new [bootstrap themes](https://getbootstrap.com/examples/theme/).

```javascript
{
  "calvert": {
    "base-dir": "/home/bcuser/",
    "bootswatch": "flatly",
    "site-dirs": [
      "Documents/AllTest",
      "Documents/AllSite"
    ],
    "destination-dirs": [
      "/var/www/html/",
      "/home/bcuser/temp/test-site/"
    ]
  }
}
```

For now, you have the following choices for this property in the configuration file:

- 'cerulean'
- 'cosmo'
- 'cyborg'
- 'darkly'
- 'flatly'
- 'journal'
- 'lumen'
- 'sandstone'
- 'slate'
- 'spacelab'
- 'superhero'
- 'united'
- 'yeti'

In particular, behind the scenes, **MakeHtml** inserts one of these lines into your HTML HEAD element:

```javascript
var bootswatchUrls = {
    'cerulean': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cerulean/bootstrap.min.css',
    'cosmo': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cosmo/bootstrap.min.css',
    'cyborg': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cyborg/bootstrap.min.css',
    'darkly': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/darkly/bootstrap.min.css',
    'flatly': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/flatly/bootstrap.min.css',
    'journal': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/journal/bootstrap.min.css',
    'lumen': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/lumen/bootstrap.min.css',
    'sandstone': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/sandstone/bootstrap.min.css',
    'slate': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/slate/bootstrap.min.css',
    'readable': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/readable/bootstrap.min.css',
    'spacelab': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/spacelab/bootstrap.min.css',
    'superhero': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/superhero/bootstrap.min.css',
    'united': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/united/bootstrap.min.css',
    'yeti': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/yeti/bootstrap.min.css'
};}
```

For instance, if you choose **cosmos**, then it puts this line in the HEAD:

```html
<link href='https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css', rel='stylesheet'>
```

Sun Mi Kim came up with this list:

1. cerulean - dark blue with white background
2. cosmos - blue with white background
3. cyborg - black or dark background
4. darkly - green navigation and dark background
5. flatly - green navigation
6. journal - dark orange & bigger text style
7. lumen - white (no color difference in panel)
8. sandstone - green navigation
9. slate - dark gray navigation
10. spacelab - white navigation
11. superhero - blue navigation & small text style
12. united - purple navigation with white background
13. yeti - blue navigation with white background


## CSS

Put this in **/var/www/html/css/style.css**:

```css
body {
    padding-top: 70px;
    padding-bottom: 30px;
}
```

## Styling

There are now various styled HTML elements that we can add to our pages. In this assignment, we will be inserting HTML directly into our markdown pages. This will allow us to create various HTML elements with a special look and feel associated with bootstrap, and which many users find appealing.

```html
  <button type="button" class="btn btn-lg btn-default">Default</button>
  <div class="alert alert-success" role="alert">
    <strong>Well done!</strong> You successfully read this important alert message.
  </div>
  <span class="label label-default">Default</span>
```

And so on. Just insert this code directly into your markdown pages.

When you see **alert-success** or **btn-default** try these options:

- alert-default
- alert-primary
- alert-success
- alert-info
- alert-warning
- alert-danger

## Bootstrap Button Examples

```html
<p>
  <button type="button" class="btn btn-lg btn-default">Default</button>
  <button type="button" class="btn btn-lg btn-primary">Primary</button>
  <button type="button" class="btn btn-lg btn-success">Success</button>
  <button type="button" class="btn btn-lg btn-info">Info</button>
  <button type="button" class="btn btn-lg btn-warning">Warning</button>
  <button type="button" class="btn btn-lg btn-danger">Danger</button>
  <button type="button" class="btn btn-lg btn-link">Link</button>
</p>
<p>
  <button type="button" class="btn btn-default">Default</button>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-link">Link</button>
</p>
<p>
  <button type="button" class="btn btn-sm btn-default">Default</button>
  <button type="button" class="btn btn-sm btn-primary">Primary</button>
  <button type="button" class="btn btn-sm btn-success">Success</button>
  <button type="button" class="btn btn-sm btn-info">Info</button>
  <button type="button" class="btn btn-sm btn-warning">Warning</button>
  <button type="button" class="btn btn-sm btn-danger">Danger</button>
  <button type="button" class="btn btn-sm btn-link">Link</button>
</p>
<p>
  <button type="button" class="btn btn-xs btn-default">Default</button>
  <button type="button" class="btn btn-xs btn-primary">Primary</button>
  <button type="button" class="btn btn-xs btn-success">Success</button>
  <button type="button" class="btn btn-xs btn-info">Info</button>
  <button type="button" class="btn btn-xs btn-warning">Warning</button>
  <button type="button" class="btn btn-xs btn-danger">Danger</button>
  <button type="button" class="btn btn-xs btn-link">Link</button>
</p>
```

## Alerts

```html

<div class="alert alert-success" role="alert">
  <strong>Well done!</strong> You successfully read this important alert message.
</div>

<div class="alert alert-info" role="alert">
  <strong>Well done!</strong> You successfully read this important alert message.
</div>

<div class="alert alert-warning" role="alert">
  <strong>Well done!</strong> You successfully read this important alert message.
</div>

<div class="alert alert-danger" role="alert">
  <strong>Well done!</strong> You successfully read this important alert message.
</div>

## Labels

<h1>
  <span class="label label-default">Default</span>
  <span class="label label-primary">Primary</span>
  <span class="label label-success">Success</span>
  <span class="label label-info">Info</span>
  <span class="label label-warning">Warning</span>
  <span class="label label-danger">Danger</span>
</h1>
```

## List Group

```html
<div class="list-group">
  <a href="#" class="list-group-item">
    <h4 class="list-group-item-heading">List group item heading</h4>
    <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
  </a>
  <a href="#" class="list-group-item">
    <h4 class="list-group-item-heading">List group item heading</h4>
    <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
  </a>
  <a href="#" class="list-group-item">
    <h4 class="list-group-item-heading">List group item heading</h4>
    <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
  </a>
</div>
```
## List Panels

```html
<div class="row">
  <div class="col-sm-4">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Panel title</h3>
      </div>
      <div class="panel-body">
        Panel content
      </div>
    </div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">Panel title</h3>
      </div>
      <div class="panel-body">
        Panel content
      </div>
    </div>
  </div><!-- /.col-sm-4 -->
  <div class="col-sm-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">Panel title</h3>
      </div>
      <div class="panel-body">
        Panel content
      </div>
    </div>
    <div class="panel panel-info">
      <div class="panel-heading">
        <h3 class="panel-title">Panel title</h3>
      </div>
      <div class="panel-body">
        Panel content
      </div>
    </div>
  </div><!-- /.col-sm-4 -->
  <div class="col-sm-4">
    <div class="panel panel-warning">
      <div class="panel-heading">
        <h3 class="panel-title">Panel title</h3>
      </div>
      <div class="panel-body">
        Panel content
      </div>
    </div>
    <div class="panel panel-danger">
      <div class="panel-heading">
        <h3 class="panel-title">Panel title</h3>
      </div>
      <div class="panel-body">
        Panel content
      </div>
    </div>
  </div><!-- /.col-sm-4 -->
</div>
```

## Carousel

The carousel lets you see a rotating array of images. The key is setting up the **carousel-inner** section with the proper **src** for the **img** control.

```html
<div class="page-header">
  <h1>Carousel</h1>
</div>
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" role="listbox">
    <div class="item active">
      <img src="/images/canada/2016-02-27_10.09.03.jpg" alt="First slide">
    </div>
    <div class="item">
      <img src="/images/canada/2016-02-27_10.30.58.jpg" alt="Second slide">
    </div>
    <div class="item">
      <img src="/images/canada/2016-02-27_09.08.04.jpg" alt="Third slide">
    </div>
  </div>
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
```

When we embed HTML in markdown, then we are writing inline HTML. There are specific rules for writing inline HTML. The HTML we want to render should start flush left.  In particular, we cannot indent the beginning or end of a block of HTML. That's clear enough.

The rub comes if we put empty lines in the HTML we want to display. A markdown parser will treat each block of text as a new syntactical element, as a new block. If that block of text is indented, then all is lost. So the fix is to either not indent any blocks, or to eliminate empty lines. In the code above, I opted for the latter solution, but I tested the former, and it also worked.

**NOTE**: _Each markdown parser has its own qwirks, so we may also encounter something in the specific behavior of the tool we are using to translate markdown to HTML. Such is life._

When the markdown parser hits an empty line, it thinks it has come to the end of the inline HTML. Then another rule kicks in. Markdown treats indented text as PRE code, as pre=formated text. So it starts trying to render the HTML as text, rather than leaving it as HTML to be viewed in a browser. You can see the rendered HTML text at the end of your screenshot. The primary problem, of course, is not that the text is visible, but that it is not being treated as HTML code.

Here is a more technical explanation of the rules for writing inline HTML:

- <https://daringfireball.net/projects/markdown/syntax#html>

In particular, the line that is relevant here is this one: "and the start and end tags of the block should not be indented with tabs or spaces." By removing empty lines, I'm limiting the start and end tags for our blocks to the beginning and end of the entire chunk (block) of in-line HTML. If we leave the spaces in, then some of the blocks start with indents, and then chaos results.

## Turn it in

Create a file called **classwork/bootstrap-themes.md** in your **Documents/AllTest** directory. In that file, include examples of the following, showing the **default**, **primary**, **success**, etc styles when possible.

- 6 buttons (style with default, primary, info etc)
- 4 alerts (style with info, warning, danger, success etc)
- 6 labels (style with default, primary, info etc)
- List panels (style  with default, primary, info etc)
- List group with three items. I think at least some verison of this can be styled with four variations: (success, warning, info, danger.)
- Carousel (with images from california or canada or your choice of images)

The way to create this code is shown above, and more information is found:

- <http://getbootstrap.com/components/>
- <http://getbootstrap.com/css/>
- <http://getbootstrap.com/getting-started/>
- <http://getbootstrap.com/examples/theme/>

Give me a link to the page running EC2.

## Hint Moving to EC2

See the [ApacheHtml][ap-html] Assignment and the ApacheHelp section called Sava CSS etc.

Also, if you get an error working on EC2 about lwip, try this:

```
sudo apt-get install build-essential
```

Just give it the okay to install what it wants to install.

[ap-html]: http://www.ccalvert.net/books/CloudNotes/Assignments/ApacheHtml.html#apache-helpers

## Hint on Inspect

One fun thing you can do with list groups is shown on this page:

http://getbootstrap.com/examples/theme/ (Links to an external site.)

Go to this page:

- <http://getbootstrap.com/examples/theme/>

Scroll down to the list groups, then right click on an example that interests you. Choose **Inspect Element** (Firefox) or Inspect (Chrome). The developer tools will open and the code for the element you clicked on will be displayed. To get the code for creating the element, choose **Edit as Html** or **Copy Outer Html**. Then you can see exactly how to create some interesting list groups.
