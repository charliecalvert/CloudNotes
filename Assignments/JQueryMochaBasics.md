#JQueryMochaBasics

This assignment is not yet complete. However, there should be enough information here to allow you to get well over the 50% complete mark.

What's missing is not so much the description of what to do, but hints as to how to do it.

**NOTE**: *It would be madness to wait until the night this assignment is due to complete it. There is quite a bit of work here, and you will need to put in an hour or two a night on it to get it completed on time. This is not the midterm, but it is the march to the midterm, so expect it to be a bit demanding. In other words, you will probably need to complete this assignment first before knowing enough to complete the midterm. Or, to put it another way, some of this same material will be on the midterm in more or less this form. If you complete this project you are completing at least part of the midterm.*

This project involves:

- Express
- jQuery
- Jade
- Mocha
- Yeoman

The Yeoman deck: [http://bit.ly/angular-yeoman](http://bit.ly/angular-yeoman)

## Video

Here is a video showing the interface for the JQuery Mocha Basics program. Its just the interface, not much technical depth. But here you can see what it is I want you to build.

- [http://youtu.be/3zzHSSzFKyo](http://youtu.be/3zzHSSzFKyo)

## Goal

The goal is to get a set of Mocha tests to pass. You do this primarily by creating or completing three files:

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
	// code omitted here
        done();
});
```

This code first loads **MainCode.html** from the server, and then inserts it into **test/index.html**.

**NOTE**: *In an earlier version of this assignment, I had written **load('MainCode.html')** instead of **load('./MainCode.html')**. That worked in Windows, but not in Linux. Please use the second option, that begins with dot slash. My Apologies.*

I give you this code in the test, and you don't have to change it. All you have to do is create **MainCode.html** by running the Jade command shown above. Run the command, open up **views/index.html**, pull out almost everything between the **body** tags, and paste it into **MainCode.html**. Add code to load **Control.js** and **style.css**. The screenshot of the IDE shown above reveals the place to put **MainCode.html** in your project. 

My copy of **MainCode.html** begins like this:

```
<script src="../public/js/Control.js"></script>
<link href="../public/css/style.css" rel="stylesheet" type="text/css">
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

I'll talk you through this later.

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

> by [Charlie Calvert](http://elvenware.com/charlie).