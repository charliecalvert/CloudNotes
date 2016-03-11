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
- 'cosmos'
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
    'cerulean': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cerulean/bootstrap.min.css',
    'cosmos': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css',
    'cyborg': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cyborg/bootstrap.min.css',
    'darkly': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/darkly/bootstrap.min.css',
    'flatly': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/flatly/bootstrap.min.css',
    'journal': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/journal/bootstrap.min.css',
    'lumen': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/lumen/bootstrap.min.css',
    'sandstone': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/sandstone/bootstrap.min.css',
    'slate': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/slate/bootstrap.min.css',
    'spacelab': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/spacelab/bootstrap.min.css',
    'superhero': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/superhero/bootstrap.min.css',
    'united': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/united/bootstrap.min.css',
    'yeti': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/yeti/bootstrap.min.css'
}
```

For instance, if you choose **cosmos**, then it puts this line in the HEAD:

```html
<link href='https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css', rel='stylesheet'>
```

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

## Carousel

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
      <img data-src="holder.js/1140x500/auto/#777:#555/text:First slide" alt="First slide">
    </div>
    <div class="item">
      <img data-src="holder.js/1140x500/auto/#666:#444/text:Second slide" alt="Second slide">
    </div>
    <div class="item">
      <img data-src="holder.js/1140x500/auto/#555:#333/text:Third slide" alt="Third slide">
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

## Turn it in

Create examples of the following, showing examples of the **default**, **primary**, **success**, etc styles when possible.

- 6 buttons (style with default, primary, info etc)
- 4 alerts (style with info, warning, danger, success etc)
- 6 labels (style with default, primary, info etc)
- List panels (style  with default, primary, info etc)
- List group with three items. I think at least some verison of this can be styled with four variations: (success, warning, info, danger.)
- Carousel (with images from california or canada or your choice of images)

More information is found:

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
