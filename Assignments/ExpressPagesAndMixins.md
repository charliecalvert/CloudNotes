# Express Pages and Mixins

In class exercise

References:

-  [http://bit.ly/jade-mixins](http://bit.ly/jade-mixins)
-  [http://bit.ly/noderoutes](http://bit.ly/noderoutes)

## Steps

 - Create a new express project: **yo express**
	 - Or better, start with [JadeMixinSimple](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/JadeMixinSimple) from JsObjects.
 - Add a new page called **About**
 - Create bootstrap menus
 - Use Jade Mixins

## Create page

The details are in the slides listed above, in a slide from noderoutes called **Add About Page**. It's about the third slide in the deck. Two key lines are:

```
var about = require('./routes/About');
// Code omitted here
app.use('/about', about);
```

## BootStrap

	bower install bootstrap --save-dev

```
extends layout

block content

    body
        +nav("Prog272 Midterm", "dropdown_menu", "navbar-default navbar-fixed-top")
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

Set the active menu:

```
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

After we covered this method in class, I realized that it would throw an exception in your unit tests because it may not be able to find the menus, which at least for now, may not be part of your tests. So I have added a **try catch** statement to suppress the exception if it occurs.

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

 - **Control.js**: For the main page
 - **About.js**: For the about page

But a button on each page. 

- First button: 	
	- id: mainButton
- Second button 
	- id: aboutButton

When the user clicks on either button, place text on the appropriate page in an HTML paragraph element.

Put the button handler for the main page in **Control.js**.

Put the button handler for the about in **About.js**

Put document ready in **Control.js.** Use the module pattern for each page:

```
var = Main = (function() {
   function Main() {
	// Code to initialize button handler (click) goes here.
   }

   return Main;
})();
```

Details are on [Elvenware](http://elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html).

## The Mixins

Place the following code in **/views/mixins.jade**
```
mixin bootswatch(theme)
    link(href="//maxcdn.bootstrapcdn.com/bootswatch/3.3.0/" + theme + "/bootstrap.min.css", rel="stylesheet")

//- Navbar mixins
mixin nav(name, id, style)
    - var style = (typeof style === 'undefined') ? "navbar-default" : style
    nav( role="navigation", class=["navbar", style] )
        .container-fluid
            .navbar-header
                .navbar-header
                button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#navbar', aria-expanded='false', aria-controls='navbar')
                    span.sr-only Toggle navigation
                    span.icon-bar
                    span.icon-bar
                    span.icon-bar
                a.navbar-brand(href='#') Project name
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
- var groupType
mixin listGroup(type)
    - groupType = type
    case groupType
        when 'list'
            ul.list-group
                block
        default
            .list-group
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

## Turn it in

In Week07-InClassMixin

> Written by [Charlie Calvert](https://www.elvenware.com/charlie/).