## Overview

In the  Express Pages and Mixins assignment you will learn about Jade, bootstrap and mixins. I'd like you to build a single page app (SPA) that switches between showing the **main page** and the **about page**.

References:

* [http://bit.ly/jade-mixins](http://bit.ly/jade-mixins)
* [http://bit.ly/noderoutes](http://bit.ly/noderoutes)
* Bootstrap Slides: [http://bit.ly/elf-bootstrap](http://bit.ly/elf-bootstrap)

## Steps

 - Start with **CreateExpressProject**
    - See also:  [JadeMixinSimple](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/JadeMixinSimple) from 
 - Add a new page called **about**
 - Create bootstrap menus
 - Use Jade Mixins
 - Call the project **Week11-ExpressPagesAndMixins**

## Main Page

The main page might look something like this:

![The front page](https://s3.amazonaws.com/bucket01.elvenware.com/images/express-pages-and-mixins.png)

When the user clicks the **Help** button, the user is shown the text that begins "Select some controls...".

## About Page

The about page might look a bit like this:

![The front page](https://s3.amazonaws.com/bucket01.elvenware.com/images/express-pages-and-mixins-about.png)

When the user clicks the **About Charlie** button, the user is shown the text that begins with the words "This is a note...".

## Create page

The details are in the slides listed above, in a slide from noderoutes called **Add About Page**. It's about the third slide in the deck. Two key lines are:

```
var about = require('./routes/about');
// Code omitted here
app.use('/about', about);
```

## BootStrap

	bower install bootstrap --save

```
extends layout

block content

    .header
        +nav("Prog272 Midterm", "navigationbar", "navbar-default navbar-fixed-top")
            +nav_item( "/", "home", "active" ) Home
            +nav_item( "json-ajax", "json-ajax") JsonAjax
            +nav_item( "about", "about" ) About
            +nav_item_dropdown( "#" )( label="Dropdown" )
                +nav_item( "#" ) Action
                +nav_item( "#" ) Another action
                +nav_item( "#" ) Something else here
                +nav_divider
                +nav_header Nav header
                +nav_item( "#" ) Separated link
                +nav_item( "#" ) One more separated link

```                

## Bootstrap Active Selection {#active-selection}

Set the active menu with this code:

```
$('nav li').hover(function(event) {
    setActiveMenuItem(event.currentTarget.id);
});


function setActiveMenuItem() {

    $(".nav li").removeClass("active");

    // var menuItem = $('a[href=".' + this.location.pathname + '"]');
    var name = this.location.pathname;
    var name = name.slice(1, name.length).trim();
    if (name.length === 0) { name = 'home'; }
    var selector = '#' + name;
    try {
        var menuItem1 = $(selector);
        menuItem1.addClass('active');
    } catch(e) {
       // console.log('Could not find selector. This is expected when testing.', e);
    }
}
```

After we covered this method in class, I realized that it could throw an exception in a unit tests because it may not be able to find the menus, which at least for now, may not be part of your tests. So I have added a **try catch** statement to suppress the exception if it occurs.

I should add that in some cases, you may not need this code. It's purpose is to help you clear and set the highlight over a menu item when the mouse hovers over it. In some cases, Bootstrap will do that for you automatically. But if it is not doing that properly, try inserting this code. Note that the selector **nav li** may not properly select the mouse hover events in some cases, depending on how you crafted your HTML. If necessary, compose another selector.

- [jQuery docs on the all important subject of selectors](https://api.jquery.com/category/selectors/)


## Bootswatch

[Bootswatch](https://bootswatch.com/) is a tool for adding themes to bootstrap. When working with our mixins, try using it like this:

    +bootswatch('cerulean')

For instance:

```
extends menu-mixin

block append content
  h1= title
  p Welcome to #{title}

  +attribution

  +bio

  +bootswatch('cerulean')
```


Here bcerulean** is one of the bootswatch themes. Don't, as a number of you did, try using it like this, as it just throws an error:

    +bootswatch

You have to pass in the name of the theme you want to use, as described above.    

## The JavaScript

Create two files in **public/javascripts**:

 - **control.js**: For the main page
   - Appearance defined in **views/home.pug**
 - **about.js**: For the about page
   - Appearance defined in **views/about.pug**

**NOTE**: _You can use either jade or pug._

When the user clicks on the home button, the code in control.js should be in effect. When the user clicks on the about button, the code in **about.js** should be in effect.

Put a button on each page.

- First button:
  - text: Help
	- id: helpButton
- Second button
  - text: About
	- id: aboutButton

When the user clicks on a button, place text on the appropriate page in an HTML paragraph element. For instance, if the user clicks on the **About** button, then text should appear on the About page.

Put the button handler for the help button in **Control.js**.

Put the button handler for the about in **About.js**

Details are on [Elvenware](http://elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html).

If you want to put a button in a form and not have it act like a submit button, then give it a type of button:

```jade
button.btn.btn-default#help(type="button") Help
```

![About Button](https://s3.amazonaws.com/bucket01.elvenware.com/images/express-page-mixin-about.png)


## Radio Mixins

From the root of your project, copy in the radio and checkbox mixins:

```bash
cp -v $ELF_TEMPLATES/JadeMixins/mixin-radios.jade views/mixin-radios.pug
```

In the above, I still have jade as the extension in JsObjects, but I'm copying to a pug file. If you are still using jade:

```bash
cp -v $ELF_TEMPLATES/JadeMixins/mixin-radios.jade views/.
```

## Mixins {#the-mixins}

Place the following code in **/views/mixins.jade**
```
mixin bootswatch(theme)
    link(href="//maxcdn.bootstrapcdn.com/bootswatch/3.3.0/" + theme + "/bootstrap.min.css", rel="stylesheet")

//- Navbar mixins
mixin nav(name, id, style)
    - var style = (typeof style === 'undefined') ? "navbar-default" : style
    nav(class=["navbar", style], role="navigation")
        .container-fluid#navfluid
            .navbar-header
                button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#navigationbar')
                    span.sr-only Toggle navigation
                    span.icon-bar
                    span.icon-bar
                    span.icon-bar
                a.navbar-brand(href='./index.html') Project name
            .collapse.navbar-collapse( id=id )
                ul.nav.navbar-nav
                    block

mixin nav_item(href, idName, active)
    li(class=active, id=idName): a( href=href )
        block

mixin nav_item_dropdown(href, active)
    li.dropdown
        a.dropdown-toggle(href=href, data-toggle='dropdown', role='button', aria-expanded='false')
            | Dropdown
            span.caret
        ul.dropdown-menu(role='menu')
            block

mixin nav_item_dropdowna(href, active)
    li(class=["dropdown", active])
        a.dropdown-toggle( href=href, data-toggle="dropdown", role="button", aria-expanded="false" )= attributes.label
        span.caret
        ul.dropdown-menu( role="menu" )
            block

mixin nav_divider
    li.divider

mixin nav_header
    li.dropdown-header
        block
//- End navbar mixins

//- Panel mixin
mixin panel(heading, style)
    - var style = (typeof style === 'undefined') ? "default" : style
    div( class=["panel", "panel-" + style] )
        .panel-heading= heading
        .panel-body
            block

//- Button mixin
mixin button(style, href, size)
    - var style = (typeof style === 'undefined') ? "default" : style
    - var href = (typeof href === 'undefined') ? "#" : href
    case size
        when "large"
            - size = "btn-lg"
        when "small"
            - size = "btn-sm"
        when "mini"
            - size = "btn-xs"
    a( class=["btn", "btn-" + style, size], href=href )
        block

  //- List group mixins

mixin listGroup(type, id)
    - var groupType
    - groupType = type
    case groupType
        when 'list'
            ul.list-group(id=id)
                block
        default
            .list-group(id=id)
                block

mixin listItem(arg1, arg2)
    case groupType
        when 'list'
            li( class=["list-group-item", arg1] )
                block
        when 'links'
            a( href=arg1, class=["list-group-item", arg2] )
                block
        default
            .list-group-item( class=["list-group-item", arg1] )
                block

mixin listHeading
    h4.list-group-item-heading
        block

mixin listText
    .list-group-item-text
        block
```

## Load Jade/Pug {#load-pug}

When the user requests to load a Jade file, you will need a route on the server side to handle the request. Here is one simple way to set one up:

```javascript
router.get('/:id', function(request, response) {
    'use strict';
    response.render(request.params.id, {
        id: request.params.id
    });
});
```

An explanation is in the [node discussion on Elvenware][node-js-parmas].

[node-js-params]: http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#node-parameters

## Turn it in

Make sure the folder is named correctly. Push your work and submit your assignment.

## Gravatar

You can use use [gravatar](http://gravatar.com/) for the image on your home page. At the command prompt calculate the md5 hash of your [email](http://gravatar.com/emails/) for the gravatar you want to use. For instance, at the bash prompt type this:

```bash
echo -n 'charlie@elvenware.com'| md5sum
b7b972e6d8e9d877abaee3f91b74b4a8  -
bash
