#JQueryMochaBasics

here should be enough information here to allow you to complete this assignment. There are two parts to this project:

- **Part I**: Create a program that demonstrates an understanding of how to use jQuery to manipular DOM elements such as buttons, input controls, paragraph elements, and lists.
- **Part II**: Write integration tests, including two async tests, that show that your program works correctly.

**NOTE**:  It would be madness to wait until the night this assignment is due to complete it. There is quite a bit of work here, and you will need to put in an hour or two a night on it to get it completed on time. This is not the midterm, but it is the march to the midterm, so expect it to be a bit demanding. In other words, you will probably need to complete this assignment first before knowing enough to complete the midterm. Or, to put it another way, some of this same material will be on the midterm in more or less this form. If you complete this project you are completing at least part of the midterm.*

This project involves:

- Express
- jQuery
- Jade
- Mocha
- Yeoman

The Yeoman deck [http://bit.ly/angular-yeoman](http://bit.ly/angular-yeoman) contains hints on how to get started, but stay focused on Express, not on Angular.

Check back regularly for hints as to how to complete this assignment.

## Example Program and Video {#video}

This example program from JsObjects should help you get started:

- [JsObjects/JavaScript/Design/UnitTests/MochaIntegrationTest][mochint]

Here is a video showing the interface for the JQuery Mocha Basics program. Its just the interface, not much technical depth and some of it may be outdated. But here you can see what it is I want you to build.

- [http://youtu.be/3zzHSSzFKyo](http://youtu.be/3zzHSSzFKyo)

The Elvenware [jQuery page](http://elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html).

Some of these slides, especially near the beginning, may be useful:

- Ajax and jQuery: [http://bit.ly/ajaxjq](http://bit.ly/ajaxjq)

## Goal

The goal is to create a working program and to get a set of Mocha tests to pass. The working program will serve as the foundation for a more complex program that we will create over the coming weeks. This is one step on the way to a bigger program, but it is an important step. In particular, this is the stage in which we set up a framework for our tests. Our tests will help guide us through the development of the rest of the application.

Your focus should be primarily on creating or completing three files:

- **public/js/Control.js**
- **views/layout.jade**
- **views/index.jade**

For now I'll put the tests that need to pass on [PasteBin](http://pastebin.com/RzNuEFCB).

- Tests: [http://pastebin.com/RzNuEFCB](http://pastebin.com/RzNuEFCB)

Initial Steps

- Install the [generator-express](https://github.com/petecoop/generator-express) if you have not done so already
- Install the [generator-mocha](https://github.com/yeoman/generator-mocha) if you have not done so already.

Run:

- npm install -g generator-express
- npm install -g generator-mocha

Create a folder called **Week06_JQueryMocha**. From the root of your project:

- yo express
- yo mocha

Copy the code from pastbin into the tests.js file generated when you ran **yo mocha**.

When you are done the structure of your project should look something like this inside WebStorm:

![WebStorm Project](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGTzFkb2ZScEJuSDA)

Note that you can see where to JadeToHtml, Presidents.json and Scientists.json. All these files are described below.

## The View

You should be able to at least get started creating the interface without too much input from me.

Here is the female view and the getAjax button press.

![Views](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGcEEwRDRSdHZ4Tkk)

Here is the male view and the getJSON button press:

![Male View](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGckVNN2xPU2lrT0U)

## Binding Event Handlers to Button Clicks {#bind-click}

When you click a button you frequently want a method to be called. The method typically defines the action associated with the button. 

To bind an event handler to a button click you need to use the [jQuery click](http://api.jquery.com/click/) method. For instance, here is how to use jQuery to bind an on-click event handler called **getAddress()** to a button click:

```
function getAddress() {
	var address = $('#inputAddress').val();
	$('#address').html(address);
}

$('#getAddress').click(getAddress);
```

This is how to write the same code with an anonymous function for the callback:

```

$('#getAddress').click(function() {
	var address = $('#inputAddress').val();
	$('#address').html(address);
});

```

This latter technique is what you see most often, but both examples get the job done.



## No On-Click Initialization in DocumentReady {#init-on-click}

Even though I may have shown it in the video, do not put any jQuery onclick initialization in the **document.ready**. In fact, you need only one call in **document.ready**. Here is how to proceed:

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

We ask jquery to connect you onclick events to the HTML by writing code like this:

```
 $('#getJson').click(function() {
        getJson(display);
});
```	

Its these types of methods that need to be in **initialize**. You should have a good number of them.

For more guidance on this and the next section, see the [MochaIntegrationTests][mochaIntegrate] from JsObjects.

[mochaIntegrate]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/MochaIntegrationTest

## Jade To Html

To convert the Jade in your Views folder into HTML, run this command from the root of your project:

	./node_modules/.bin/jade --pretty views/index.jade

**NOTE**: *This command runs the copy of jade in your local node_modules folder. You must have run **node install** for this to work. I save the above command in a bash script file called **JadeToHtml** because it is something I needed to run over and over.* 

You will need to insert the HTML produced above into a file called **MainCode.html**. The test HTML file (**/test/index.html**), minus the part where you insert your HTML, looks like this:

```
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Mocha Spec Runner</title>
    <link rel="stylesheet" href="bower_components/mocha/mocha.css">
</head>
<body>
    <div id="mocha"></div>
    <script src="bower_components/mocha/mocha.js"></script>
    <script>mocha.setup('bdd')</script>
    <script src="bower_components/chai/chai.js"></script>
    <script>
        var assert = chai.assert;
        var expect = chai.expect;
        var should = chai.should();
    </script>

    <!-- The HTML to test goes here -->
    <div id="mainArea"></div>

    <!-- include source files here... -->
    <script src="../public/components/jquery/dist/jquery.js"></script>
    <script src="../public/js/Control.js"></script>

    <!-- include spec files here... -->
    <script src="spec/test.js"></script>

    <script>mocha.run()</script>
</body>
</html>
```

When your test is run, it will programmatically and automagically load your HTML into the section of **test/index.html** that reads: "The HTML to test goes here." Near the top of **tests.js** the mocha tests I gave you load and inserts your **MainCode.html** file like this:

```
$('#mainArea').load('./MainCode.html', function() {
	initialize();
	// code omitted here
        done();
});
```

This code first loads **MainCode.html** from the server, and then inserts it into **test/index.html**.

The point is that we have to initialize the onclick methods after we have loaded the HTML. JQuery does not know how to connect your on click methods to your HTML unless the HTML is already loaded. So first we load MainCode.html, then we call the initialize method found in **Control.js*.*

I give you this code in the test, and you don't have to change it. All you have to do is create **MainCode.html** by running the Jade command shown above. Run the command, open up **views/index.html**, pull out almost everything between the **body** tags, and paste it into **MainCode.html**.  The screenshot of the IDE shown above reveals the place to put **MainCode.html** in your project. 

My copy of **MainCode.html** begins like this:

```
<div class="jsonArea">
    <h2>HTML fields</h2>
    <div class="displayArea">
        <button id="insertMale">Insert Male</button>
        <button id="insertFemale">Insert Female</button>
        <button id="clear">Clear</button>
    </div>
    <hr>
    <div class="displayArea">
```

Now you can load jquery, **Control.js** and your css in **index.html**:

```
    <div id="mainArea"></div>

    <!-- include source files here... -->
    <link href="../public/css/style.css" rel="stylesheet" type="text/css">
    <script src="../public/components/jquery/dist/jquery.js"></script>
    <script src="../public/js/Control.js"></script>
```

Here is what my test looks like when I run it:

![TestRun](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGRWNvNHFHb1BOM0U)

The point here is that these tests actually interact with the HTML. As such, there are really integration tests, rather than pure unit tests. Nevertheless this is a fairly robust to test your code. 

The key point, of course, is that each time you update your jade, you need to convert it to HTML and paste that HTML into **MainCode.html**.

##Bower

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
    "jquery": "~2.1.3"
  }
}
```

##The JSON

Presidents.json: 

```
[
    {
        "firstName": "George",
        "lastName": "Washington",
        "address": "101 June Street",
        "city": "Bellevue",
        "state": "WA"
    },
    {
        "firstName": "John",
        "lastName": "Adams",
        "address": "101 June Street",
        "city": "Bellevue",
        "state": "WA"
    },
    {
        "firstName": "Thomas",
        "lastName": "Jefferson",
        "address": "101 June Street",
        "city": "Bellevue",
        "state": "WA"
    },
    {
        "firstName": "James",
        "lastName": "Madison",
        "address": "101 June Street",
        "city": "Bellevue",
        "state": "WA"
    }
]
```

Scientists.json:

```
[
    {
        "firstName": "Isaac",
        "lastName": "Newton",
        "address": "101 June Street",
        "city": "New York",
        "state": "NY"
    },
    {
        "firstName": "Albert",
        "lastName": "Einstein",
        "address": "101 June Street",
        "city": "Bellevue",
        "state": "WA"
    },
    {
        "firstName": "Neils",
        "lastName": "Bohr",
        "address": "101 June Street",
        "city": "Bellevue",
        "state": "WA"
    },
    {
        "firstName": "Charles",
        "lastName": "Darwin",
        "address": "101 June Street",
        "city": "Bellevue",
        "state": "WA"
    }
]
```


## getJSON and Ajax calls

There is some information here you might find useful:

- <http://www.elvenware.com/charlie/development/web/UnitTests/Jasmine.html#async>
- <http://www.elvenware.com/charlie/development/web/UnitTests/Jasmine.html#async-done>


## The CSS

Here is the CSS I use. It goes in **public/css/style.css**, replacing the auto-generated content:

```
body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    background-color: #c2ccd1;
}

a {
  color: #00B7FF;
}

hr {
    width: 15%;
    min-width: 250px;
    height: 12px;
    box-shadow: inset 0 12px 12px -12px rgba(0,0,0,0.5);
    margin-left: 0;
    background-color:#00A000;
    color:#00d6b2;
    border: 0 none;
}

hr.clear {
    clear: both;
}

.displayArea {
    background-color: #00d6b2;
    border: solid thin #00A000;
    border-radius: 6px;
    width: 15%;
    min-width: 250px;
}

button {
    margin: 5px;
    border-radius: 6px;
}

input {
    margin: 5px;
}

div.jsonArea {
    float: left;
    padding: 20px;
}

div.radio {
    clear: both;
    margin-bottom: 2px;
    margin-left: 5px;
    padding-bottom: 10px;
    width: 250px;
}

label {
    width: 200px;
    border-radius: 3px;
    border: 1px solid #D1D3D4
}


/* hide input */
input.radio:empty {
    margin-left: -999px;
}

/* style label */
input.radio:empty ~ label {
    position: relative;
    float: left;
    line-height: 1.5em;
    text-indent: 3.25em;
    margin-top: 0.5em;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

input.radio:empty ~ label:before {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    content: '';
    width: 2.5em;
    background: #D1D3D4;
    border-radius: 3px 0 0 3px;
}

/* toggle hover */
input.radio:hover:not(:checked) ~ label:before {
    content:'\2714';
    text-indent: .9em;
    color: #C2C2C2;
}

input.radio:hover:not(:checked) ~ label {
    color: #888;
}

/* toggle on */
input.radio:checked ~ label:before {
    content:'\2714';
    text-indent: .9em;
    color: #9CE2AE;
    background-color: green;
}

input.radio:checked ~ label {
    color: #777;
}

/* radio focus */
input.radio:focus ~ label:before {
    box-shadow: 0 0 0 3px #999;
}
```

## Turn it in

Make sure you put **bower_components** and **components** in your **.gitignore** file.

Place your project in your repository and submit your repository URL, which should look something like this:

	git@bitbucket.org:lastname/lastname.git

[mochint]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/MochaIntegrationTest

> by [Charlie Calvert](http://elvenware.com/charlie).