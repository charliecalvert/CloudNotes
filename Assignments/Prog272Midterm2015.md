# Prog 272 Midterm 2015

Our main goals are to understand and demonstrate knowledge:

- jQuery
- Bootstrap
- Jade Mixins
- Express
- Unit Testing
- HTML and CSS
- JavaScript
- Grunt 

## Example Program and other Resources {#resources}

This example program from JsObjects should help you get started:

- [JsObjects/JavaScript/Design/UnitTests/MochaIntegrationTest][mochint]

A few of the slides near the beginning of this deck might prove useful:

- <http://bit.ly/ajaxjq>

[mochint]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/MochaIntegrationTest

And don't forget the elvenware [jQuery page](http://elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html).


## Details

- Add address field
- Call getFirstName getName
- Add getAll button
- Refactor button click calls so that method is separate 
- Add styling to buttons


## New Pages

- Move Json and Ajax code to a new page.
- Create an about page

I don't care much how the page looks, but mine looks like this:

![About Page](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGS21ZNUhrS1JtVzg)

I use [gravatar](https://en.gravatar.com/) to manage my picture.

## Bootstrap with Mixins {#bootstrap-mixin}

You should use mixins for all, or nearly all, the elements that use bootstrap. For instance, you should use mixins for these bootstrap elements:

-  jumbotron
- menus (nav, nav-item)
- button
- listgroup (Use these for the ul that holds the items you pull from the JSON file. This is the Isaac, Albert etc list in the **Create a New Page** screenshot.)
	- Do it like this: **+listGroup('list', 'jsonDisplay')**

When you add items to the list-group, do it like this:

	$("#jsonDisplay").append('<li class="list-group-item">' + etc...


![Bootstrap Mixin](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGSi15ZVZ2MjlvVmc)

The version of Bootstrap that you use is important. My bower file looks like this:

```
{
  "name": "seltest",
  "version": "0.0.1",
  "ignore": [
    "**/.*",
    "node_modules",
    "components"
  ],
  "dependencies": {
    "bootstrap": "~3.3.2"
  }
}
```

You can see that I'm using 3.3.2 bootstrap. That brought with it, automatically, jquery. It is version 2.1.3. Here is the header for that version of **jquery.js**:

```
/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */
``` 

It is not necessarily important that you have those exact versions, but you should have versions that work well together. If you screen looks like the image shown below, then something is wrong, and one likely candidate is the versions of bootstrap that you are loading. In particular, the image below is what things look like if no CSS has been applied to the web page.

![Bad Bootstrap CSS](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGcmo3eDk0UkgweEU)

You are looking at plain, default HTML with no CSS. Below you can see what the menu should look like.

![Good CSS Menu](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGRkVvaFlwa1VWWnc)

## IDs for Controls {#ids}

Here are the IDs for a number of the controls used in the program.

### DIVs

- mainArea
- jsonArea
- displayArea

### Buttons

- insertMale
- insertFemale
- clear
- getFirstName
- getAge
- getCityStateZip
- getJson
- getAjax

### Input Controls

- inputLastName
- inputFirstName
- inputAddress
- inputCity
- inputState
- inputZip

### Paragraphs or Spans in Paragraphs {#paragraphs}

- firstName
- lastName
- city
- state
- zip
- age

### RadioButtons

- radioResult
- maleFemaleGroup
- femaleboot
- maleboot

##Menus on Each Page {#menus}

Each page should have a copy of the menu. For instance, there will be three jade files involved in composing each page. They are named like this

```
layout.jade : headers
The menu in: menu-mix-in.jade
The new page in index.jade, or in about.jade, etc.
```

And of course at least the last two pages will both have **mixins.jade** in it. I gave you a new copy of **mixins.jade** in the [JadeMixinsComplete][mixins] project.

There is a hierarchy in the three files used to compose each page:

- **menu-mix-in.jade** extends **layout.jade**
- **about.jade** and **index.jade** extends **menu-mix-in.jade**

For instance, top of **menu-mix-in.jade**, might look like this:

```
extends layout

include mixins
```

The top of **index.jade** and your **JsonAjax** page might look like this:

```
extends menu-mix-in

block append content
```

**NOTE**: *If you decide to use **mixins** in **layout.jade** then you should move the **include** statement back to the top of **layout.jade**.*

I gave you the actual menu to use during the in-class assignment on Thursday. You also saw the code for high-lighting the menus.

[mixins]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/JadeMixinComplete/views/mixins.jade

## Create a new Page

You need to create a new page for displaying a list of the loaded JSON. It should look like this:

![JSON](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGd0VpVHFOM3R6bm8)

Here we are using a **bootstrap** [list-group](http://getbootstrap.com/components/#list-group) to display the scientists names. We have a **mixin** for this as described above.

## Unit Tests

One of the trickier parts of unit tests, perhaps, is handling [ajax][ajax-elf] calls. Please see these resources.

- [Integration Tests](http://bit.ly/integration-tests)
- [ajax on elvenware][ajax-elf]
- [getJSON on elvenware][getjson-elf]
- [ajax success handlers on elvenware][success-elf]
- [ajax errors on elvenware][failure-elf]

In your tests, you may optionally continue to use the HTML for **MainCode.html** generated for the jQuery assignment. The underlying structure of the program has not really changed structure very much, so it is semi-acceptable to do that. Even though we have split the program into two pages, we can, at least for now, continue to pretend in our tests that it is all one page. Please check back here for possible updates on this issue.

[getjson-elf]:http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#getJSON
[ajax-elf]: http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#jquery-ajax-with-json
[success-elf]: http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#the-ajax-success-function
[failure-elf]: http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#the-ajax-error-handler

## Tests and MainCode.html {#test-maincode}

I originally taught you to put code to load **Control.js** and other files at the top **MainCode.html**. I knew that was strange from the start, but it has taken me a long time to see the problem. Here is what you should do.

 - Select and cut all the code from inside **\$(document.ready)**. Place it above **\$(document).ready** in a method called **initialize**. Leave the public methods outside of **initialize**.
 - Call **initialize** from inside **$(document).ready**.

Here is what it looks like, minus a few details such as the **getAjax** method:

```
function errorHandler(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    $('#debug').html("Request Failed: " + err);
}

function getJson(callback) {
    var result = $.getJSON('./Presidents.json', callback);
    result.fail(errorHandler);
}

function initialize() {
   // place all the code from document ready here.
   // This is mostly the jquery onClick handlers that begin $("#... 
}

$(document).ready(function() {
    initialize();
});
```

At the top of the tests I gave you, add a call to **initialize** after **MainCode.html** has been loaded:

```
beforeEach(function (done) {
	$('#mainArea').load('./MainCode.html', function() {
		initialize();  // << Add this call
		$("#insertMale").trigger('click');
		$("#getFirstName").trigger("click");
		$("#getAge").trigger("click");
		$("#getCityStateZip").trigger("click");
		done();
	});
});
```

Now you can load jquery and your css in **index.html**:

```
    <div id="mainArea"></div>

    <!-- include source files here... -->
    <link href="../public/css/style.css" rel="stylesheet" type="text/css">
    <script src="../public/components/jquery/dist/jquery.js"></script>
    <script src="../public/js/Control.js"></script>
```

The point is that we have to initialize the onclick methods after we have loaded the HTML. JQuery does not know how to connect your on click methods to your HTML unless the HTML is already loaded. So first we load MainCode.html, then we ask jquery to connect you onclick events to the HTML by writing code like this:

```
 $('#getJson').click(function() {
        getJson(display);
});
```	

Its these types of methods that need to be in **initialize**. You should have a good number of them.

Once you are done, you no longer need to paste any script or link tags at the top of **MainCode.html**

For more guidance, see the [MochaIntegrationTests][mochaIntegrate] from JsObjects.

[mochaIntegrate]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/MochaIntegrationTest

## Starting your App with Grunt {#GruntStart}

To start the application, type: **grunt**. This does two things:

 - Runs your application with **grunt-develop**
 - Ensures that **live-reload** is running so that the app will **grunt-contrib-watch** your files and restart when you make changes to your code.

See these parts of **Gruntfiles.js**:

```
grunt.registerTask('delayed-livereload', 'Reload after server start.', function () {
   etc...

grunt.registerTask('default', [
    'develop',
    'watch'
  ]);
```

And in **package.json** we load **watch** and **grunt-develop**:

```
"devDependencies": {
    "grunt": "~0.4.5",
    "grunt-develop": "~0.4.0",
    "grunt-contrib-watch": "~0.6.1",
    etc...
  }
```

The point here is that you can configure Grunt to do all kinds of background tasks during development.

##Turn it in

Place your work in a folder called **Week08-Midterm**. Include screenshots of the main pages of your application. This time I would prefer for you to attach the screenshots to the assignment when you submit. Put the project in your repository, and attach the screen shots to your assignment.

Screenshots:

- Main page
- About page
- JsonAjax page
- Test page

Summary (Thanks to Mr. Yee):

- Use bootstrap to make the page appear look nice and to prepare for use on mobile devices.
- The only thing in the **$(document).ready()** jQuery statement should be a call to **initialize()**. The **initialize()** method should contain, at minimum, the jQuery **click** event handlers.  
- Use the tests from **Week06_JQueryMocha**, but edit them so that a call to **initialize()** is at the top of the **beforeEach** calls in the test.js tests)


