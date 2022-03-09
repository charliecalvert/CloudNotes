---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/Bootstrap.md
relativePath: elvenware/development/web/CssGuide/Bootstrap.md
title: Bootstrap
debug: aec has both but checking ELF code
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

## Description

[Bootstrap](http://getbootstrap.com/) is a popular CSS library that can help you create elegant web pages. Here are some [examples](http://getbootstrap.com/getting-started/#examples) of what you can do with bootstrap.

Most of the examples on this page use assume you are using node and express with jade.

## Install

Add in bootstrap.

    bower install jquery --save
    bower install bootstrap --save

## Link

Add bootstrap to **layout.jade**. First the CSS:

    link(rel="stylesheet", href="components/bootstrap/dist/css/bootstrap.css")
    link(rel="stylesheet", href="components/bootstrap/dist/css/bootstrap-theme.css")

Then the JavaScript:

    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")

## Bootstrap.css

You can download Bootstrap from here:

- [Bootstrap Download Page](https://getbootstrap.com/)

## Put it all together

To create your page, put your HTML file, index.css and bootstrap.css in a single directory. Open up your HTML file in a browser and you should be able to see your nicely formatted bootstrap project.

Here, just for clarity's sake, is the complete HTML file:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Prog280 Template</title>
    <meta name="description" content="Prog280 Starter Template">
    <meta name="author" content="Lastname">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="bootstrap.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="index.css" rel="stylesheet">
  </head>
  <body>

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Prog280-Lastname</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>           
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container">

	<h1>My Title</h1>
	<p>My first paragraph</p>
	<ul>
	   <li>First item</li>
	   <li>Second item</li>
	</ul>

    </div> <!-- End Container -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://code.jquery.com/jquery.js"></script>
  </body>
</html>
```

To create your file, you need only replace the code shown in the **container**.

## index.css

Here is the CSS that goes in index.css:

```
body {
  padding-top: 50px;
}
.starter-template {
  padding: 40px 15px;
  text-align: center;
}
```

The most important line in this file is the first one. It ensures that the top of your HTML is not hidden under the nav bar.

## Demo

A demo of many of the Bootstrap controls described below can be found here:

* [Bootstrap JsObjects][bootDemo]

[bootDemo]: https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/BootstrapBasics

## Text Input

Use simple Text input controls to get keyboard input from your user. The example below assigns the bootstrap **panel**  and **form-group** classes to **div** elements to create a reasonably elegant effect.

```html
<div class="panel panel-default">
    <div class="panel-heading">Text Input</div>
    <div class="panel-body">
        <div class="form-group">
            <label for="i1">Env Variable</label>
            <input id="i1" type="text" name="envVariable" placeholder="EnvVar" class="form-control">
        </div>
        <div class="form-group">
            <label for="i2">Folder</label>
            <input id="i2" type="text" name="folder" placeholder="Folder" class="form-control">
        </div>
    </div>
</div>
```

The same code with Jade:

```jade
div.panel.panel-default
	div.panel-heading Text Input
	div.panel-body
		div.form-group
			label(for='i1') Env Variable
			input#i1.form-control(type='text', name='envVariable', placeholder="Env Variable")
		div.form-group
			label(for='i2') Folder
			input#i2.form-control(type='text', name='folder', placeholder="Folder")

```

The panel is not a necessity. You can also write:

```jade
div.form-group
	label(for='i1') Env Variable
	input#i1.form-control(type='text', name='envVariable', placeholder="Env Variable" aria-describedby="EnvVar")
div.form-group
	label(for='i2') Folder
	input#i2.form-control(type='text', name='folder', placeholder="Folder")
```

When displayed on your page, the code above looks like this:

<div class="panel panel-default">
    <div class="panel-heading">Text Input</div>
    <div class="panel-body">
        <div class="form-group">
            <label for="i1">Env Variable</label>
            <input id="i1" type="text" name="envVariable" placeholder="EnvVar" class="form-control">
        </div>
        <div class="form-group">
            <label for="i2">Folder</label>
            <input id="i2" type="text" name="folder" placeholder="Folder" class="form-control">
        </div>
    </div>
</div>


## Radio Buttons

To create nice looking Bootstrap radio buttons, use the bootstrap **btn group** class on a div and the classes **btn** and **btn-default** on the button element. This looks a bit like you are creating buttons rather than radio buttons, but bootstrap ends up giving you want you want.

```html
<div class="panel panel-default">
	<div class="panel-heading">Radios</div>
	<div class="panel-body">
		<div role="group" aria-label="..." class="btn-group">
			<button type="button" class="btn btn-default">radio01</button>
			<button type="button" class="btn btn-default">radio02</button>
			<button type="button" class="btn btn-default">radio03</button>
		</div>
	</div>
</div>
```

Or with Jade:

```jade
div.panel.panel-default
    div.panel-heading Radios
    div.panel-body
    	div.btn-group(role="group" aria-label="...")
    		button.btn.btn-default(type="button") radio01
    		button.btn.btn-default(type="button") radio02
    		button.btn.btn-default(type="button") radio03
```

You don't have to put your radio buttons in a panel:

```jade
div.btn-group(role="group" aria-label="...")
	button.btn.btn-default(type="button") radio01
	button.btn.btn-default(type="button") radio02
	button.btn.btn-default(type="button") radio03
```

When displayed on your page, the code above looks like this:

<div class="panel panel-default">
	<div class="panel-heading">Radios</div>
	<div class="panel-body">
		<div role="group" aria-label="..." class="btn-group">
			<button type="button" class="btn btn-default">radio01</button>
			<button type="button" class="btn btn-default">radio02</button>
			<button type="button" class="btn btn-default">radio03</button>
		</div>
	</div>
</div>

## CheckBoxes

Here are the checkboxes:

```html
<div class="panel panel-default">
	<div class="panel-heading">CheckBoxes</div>
	<div class="panel-body">
		<div><input id="ch1" type="checkbox" name="check" value="check1" aria-label="..."><label for="ch1">check1</label>
		</div>
		<div><input id="ch2" type="checkbox" name="check" value="check2" checked="checked"
					aria-label="..."><label for="ch2">check2</label></div>
	</div>
</div>
```

The same code with Jade:

```jade
div.panel.panel-default
	div.panel-heading CheckBoxes
	div.panel-body
		div
			input#ch1(type='checkbox', name='check', value='check1' aria-label="...")
			label(for='ch1') check1
		div
			input#ch2(type='checkbox', name='check', value='check2', checked='checked' aria-label="...")
			label(for='ch2') check2
```

Here is the same code without the panels:

```jade
div
	input#ch1(type='checkbox', name='check', value='check1' aria-label="...")
	label(for='ch1') check1
div
	input#ch2(type='checkbox', name='check', value='check2', checked='checked' aria-label="...")
	label(for='ch2') check2

```

When displayed on your page, the code above looks like this:

<div class="panel panel-default">
	<div class="panel-heading">CheckBoxes</div>
	<div class="panel-body">
		<div><input id="ch1" type="checkbox" name="check" value="check1" aria-label="..."><label for="ch1">check1</label>
		</div>
		<div><input id="ch2" type="checkbox" name="check" value="check2" checked="checked"
					aria-label="..."><label for="ch2">check2</label></div>
	</div>
</div>

## Jumbotron

Put your title inside a bootstrap Jumbotron:

```html
<div class="jumbotron">
	<h1>Walker Demos</h1>
	<p>Welcome to Walker Demos</p>
</div>
```

The same code as Jade:

    div.jumbotron
        h1= title
        p Welcome to #{title}

When displayed on your page, the code above looks like this:

<div class="jumbotron">
	<h1>Walker Demos</h1>
	<p>Welcome to Walker Demos</p>
</div>

## Buttons {#bootstrap-buttons}

Turn your buttons into Bootstrap buttons. Before we added bootstrap, our buttons looked like this:

    button(ng-click='myController.loadScientists()') Load Scientists

To convert to bootstrap, add the **btn** and **btn-default** classes to your buttons:

    button(class="btn btn-default" ng-click='myController.loadScientists()') Load Scientists

Or, to be more in the spirit of Jade, write this:

    button.btn.btn-default(ng-click='myController.loadScientists()') Load Scientists

The two buttons might look like this:

<button>No Bootstrap</button>
<button class="btn btn-default">Bootstrap Default</button>

If you don't like the default look, you can try **btn-primary** instead:

    button.btn.btn-primary Bootstrap Primary

Like this:

<button class="btn btn-primary">Bootstrap Primary</button>

Other variations include **btn-success**, **btn-warning**, **btn-info**, and **btn-danger**:

<button class="btn btn-success">Bootstrap Success</button>
<button class="btn btn-warning">Bootstrap Warning</button>
<button class="btn btn-info">Bootstrap Info</button>
<button class="btn btn-danger">Bootstrap Danger</button>

Or, if you want to go hog-wild, you can make your buttons big with **btn-lg** and use a glyph icon:

    button.btn.btn-primary.btn-lg(ng-click='myController.loadScientists()')
      span.glyphicon.glyphicon-asterisk(aria-hidden='true')
      |  Load Scientists

Like this:

<button class="btn btn-primary btn-lg"><span aria-hidden="true" class="glyphicon glyphicon-asterisk"></span> Load Scientists</button>

**NOTE**: *When in doubt about how to translate HTML to jade, go to [html2jade.org][hj] and paste in the HTML that you want to use in your Jade code.*

## Menus

Here is how to create a basic bootstrap document. You need to begin with:

- An HTML tag
- A head element
- The body tag
- A nav section

Here is what it looks like in practice. This is the section that belong at the top of your document, the one that adds your HTML tag, head element, body tag and nav section:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Prog280 Template</title>
    <meta name="description" content="Prog280 Starter Template">
    <meta name="author" content="Lastname">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="bootstrap.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="index.css" rel="stylesheet">
  </head>
  <body>

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Prog280-Lastname</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>           
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>


    <div class="container">
```

As you can see, the last line of the HTML starts a DIV element. We set the class for the DIV element to container. Put the body of your HTML here, inside the container. Don't include a &lt;body&gt; tag, just put the HTML you want to display. Something like this:

```
<h1>My Title</h1>
<p>My first paragraph</p>
<ul>
   <li>First item</li>
   <li>Second item</li>
</ul>
```

After your HTML, complete the document with this:

```
  </div> <!-- End Container -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://code.jquery.com/jquery.js"></script>
  </body>
</html>
```

Notice that the end section begins by closing the container. The point is that the text you want to display fits inside the container, like this:

```
// CODE OMITTED HERE
<div class="container">

	<h1>My Title</h1>
	<p>My first paragraph</p>
	<ul>
	   <li>First item</li>
	   <li>Second item</li>
	</ul>

</div> <!-- End Container -->
// CODE OMITTED HERE
```

Once you have created one HTML document that begins and ends the right way, then you can always create a new document by making of copy of your original file, and then replacing the text in the container.

## Containers

We have two choices:

- container: responsive, fixed width
- container-fluid: full width of viewport

Reference: [Containers](http://getbootstrap.com/css/)

## Aria

Aria is designed to provide support for screen readers used by people with disabilities. Aria stands for Accessible Rich Internet Format.

If you want to learn more, MDN has several good resources:

* [MDN on Aria](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)



## Bootswatch

Bootswatch provides **bootstrap themes**. The community creates the themes, you use them, your site looks relatively unique, and fancy.

To get **bootswatch** thems. Start at the command line, in the root of your project:

    bower install bootswatch --save

And in layout.jade, something like:

    link(rel='stylesheet', href='/components/bootswatch/darkly/bootstrap.min.css')

Or in index.html, if you are not using jade:

    <link rel="stylesheet" href="/components/bootswatch/darkly/bootstrap.min.css">

You can see the themes in your downloaded bower folder. The possible themes can be found here:

- <http://bootswatch.com/>

Look under the themes menu. They have names like Cosmo, Cyborg, Darkly, etc. For instance:

```jade
link(rel='stylesheet', href='/components/bootswatch/darkly/bootstrap.min.css')
link(rel='stylesheet', href='/components/bootswatch/cosmo/bootstrap.min.css')
link(rel='stylesheet', href='/components/bootswatch/cyborg/bootstrap.min.css')
```

Or

```html
<link rel="stylesheet" href="/components/bootswatch/darkly/bootstrap.min.css">
<link rel="stylesheet" href="/components/bootswatch/cosmo/bootstrap.min.css">
<link rel="stylesheet" href="/components/bootswatch/cyborg/bootstrap.min.css">
```

An alternative, with its own advantages, is found here:

- <https://github.com/dbtek/bootswatch-dist>

This one allows you to install a particular theme:

    bower install bootswatch-dist#yeti
