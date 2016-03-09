## Overview

In this exercise you will learn how to add new themes to your bootstrap pages.

## Custom CSS

As a rule, it is not a good idea to try to add your own custom CSS to Bootstrap pages. Just go along with the look and feel they create.

You can add small touches, but when you try to define how the page looks, making major design decisions, you are just going to get in trouble.

Frankly, only a very few people have both:

- A good design sense
- The technical chops to create create CSS that handles both desktop and mobile devices

It is possible to get to the point where you can do that kind of thing, but it is difficult, or at least not easy. For most developers, using a tool like bootstrap is the best solution.


## Get Started

Two steps:

- Pull the latest from JsObjects.
- Go to your **~/Source** directory and run **renewMakeHtml**

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

## Styling

There are now various styled HTML elements that we can add to our pages. In most cases, it is simplest just to insert HTML directly into your markdown when creating these elements.

```html
  <button type="button" class="btn btn-lg btn-default">Default</button>
  <div class="alert alert-success" role="alert">
    <strong>Well done!</strong> You successfully read this important alert message.
  </div>
  <span class="label label-default">Default</span>
```

And so on.

When you see **alert-success** or **btn-default** try these options:

- alert-default
- alert-primary
- alert-success
- alert-info
- alert-warning
- alert-danger

## Turn it in

Create examples of the following, showing examples of the **default**, **primary**, **success**, etc styles when possible.

- 6 buttons (style)
- 6 alerts (style)
- 6 labels (style)
- List panels (style)
- List group with 3 items
- Carousel

More information is found:

- <http://getbootstrap.com/components/>
- <http://getbootstrap.com/getting-started/>
- <http://getbootstrap.com/examples/theme/>
