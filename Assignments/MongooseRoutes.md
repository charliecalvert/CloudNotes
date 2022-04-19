---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MongooseRoutes.md
relativePath: Assignments/MongooseRoutes.md
title: MongooseRoutes
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: MongooseRoutes.md
fileNameHTML: MongooseRoutes.html
---


<!-- toc -->
<!-- tocstop -->

## Description

In this assignment we will integrate menus and sorting into a single application. The goal is provide you a blue print for doing the same thing in your final. 

## Menus


The menu starts like this:

```
nav.navbar-default.navbar-fixed-top
	.container-fluid
```

Inside the div with the class **container-fluid** we want to put two more divs. The first is the hamburger menu:


```
.navbar-header
	button(type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myTarget")
		span.sr-only Toggle navigation
			span.icon-bar
			span.icon-bar
			span.icon-bar
		a.navbar-brand(href="#/") Final
```

The hamburger menu is boilerplate. It will look the same in all code, with the exception of the last line, **navbar-brand** which is the title of your application. The **data-target** can also change, as explained below.

Then we put in our menu, giving it the same id as the **data-target** from **navbar-header**. The ID we assign to **data-target** ties this list of menu items to the hamburger menu. It is what tells **bootstrap** what to show when the user selects the hamburger menu. The point is that this is the menu that will collapse into the hamburger menu:

```
#myTarget.collapse.navbar-collapse
	ul.nav.navbar-nav
		li(ng-class="{ active: isActive('/')}")
			a(ng-href='#/') Home
		li(ng-class="{ active: isActive('/edit')}")
			a(ng-href='#/edit') Edit
		li(ng-class="{ active: isActive('/subjects')}")
			a(ng-href='#/subjects') Subjects
		li(ng-class="{ active: isActive('/comments')}")
			a(ng-href='#/comments') Comments
		li(ng-class="{ active: isActive('/about')}")
			a(ng-href='#/about') About

```

In Chrome, choose the **Toggle Device Mode** option and select your mobile device, or several mobile devices.

Don't forget to add in the meta data in **layout.jade**:

```
html
	head
		meta(charset='utf-8')
		meta(name='description', content='Final by Charlie Calvert for Prog 219 Spring 2015')
		meta(name='viewport', content='width=device-width, initial-scale=1')
		title= title
		etc...
```

The viewport is essential to make it work on a mobile device. See HTML5 Boilerplate web site for latest and details.

Also add this code to make sure we can see the whole of the jumbotron:

```
	.elf-container
		div.jumbotron
			h1= title
			p Welcome to #{title}

		#monogoData(data-ng-view="")
```

And this CSS in **JavaScripts/css/Styles.css**:

```
.elf-container {
  border: solid #004b63 thin;
  margin-top: 25px;
```

Below is my complete for my menus. It's nice to be able to just paste this in, but it is much better if you can see the two main sections:

- The Hamburger menu which is the begings with **.navbar-header**
- The menu items, which bigin with the div labeled **#myTarget.collapse.navbar-collapse**
- Notice that the id **#myTarget** ties the two sections together. If you don't match the two ids, then when you click on the hamburger menu, nothing happens.

```
extends layout
block content
	nav.navbar-default.navbar-fixed-top
		.container-fluid
			.navbar-header
				button(type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myTarget")
					span.sr-only Toggle navigation
					span.icon-bar
					span.icon-bar
					span.icon-bar
				a.navbar-brand(href="#/") Final
			#myTarget.collapse.navbar-collapse
				ul.nav.navbar-nav
					li(ng-class="{ active: isActive('/')}")
						a(ng-href='#/') Home
					li(ng-class="{ active: isActive('/edit')}")
						a(ng-href='#/edit') Edit
					li(ng-class="{ active: isActive('/subjects')}")
						a(ng-href='#/subjects') Subjects
					li(ng-class="{ active: isActive('/comments')}")
						a(ng-href='#/comments') Comments
					li(ng-class="{ active: isActive('/about')}")
						a(ng-href='#/about') About
	div.jumbotron
		h1= title
		p Welcome to #{title}

	#monogoData(data-ng-view="")
```


This is the example that I use when I get confused about how to build menus:

- <http://getbootstrap.com/examples/theme/#>

## Sorting

Arrays have a sort function. For simple arrays, you can just call sort
and JavaScript will figure out what to do. If you have an array of
object, however, it is often necessary to create a custom callback. The
callback allows you to compare two items from the array, returning:

- one if the first is larger
- Minus 1 if the second is larger
- 0 if they are equal

Lets assume we have a simple object with an id and name. We place these
objects in an array:

```javascript
	var allNames = [{id: scientist._id, name: scientist.firstName + ' ' + scientist.lastName}];
```

Here we have only one item in the array, but if we had more items we would
want to sort the array by name. We could approach that task like this:

```javascript
allDataNames.sort(function(scientistA, scientistB) {
	if (scientistA.name > scientistB.name) {
		return 1;
	}
	if (scientistA.name < scientistB.name) {
		return -1;
	}
	// a must be equal to b
	return 0;
});
```

## Routing Comments

This part of this assignment has been moved into a new, separate assignment, called [MongooseComments][moncom].

## Routing Login

This part of this assignment will not be graded. It is included in a [new document][nd] which is purely informational, it is not an assignment.

[nd]: http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseSignInComments.html

## Turn it in

Put your work in a folder called either **Week11-MongooseRoutes** or **Week11-MongooseMenuSort**, which is a better name for this project. Please specify the name of the folder that contains your work when you submit this assignment.

If your project already contains a solution for the **MongooseComments** assignment, that is, if it contains a working page that handles comments in **routes/comments.js** and **public/javascript/comment-factory.js**, then that is fine. I will give you credit for that work in the **[MongooseComments][moncom]** assignment.

[moncom]:http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseComments.html 
