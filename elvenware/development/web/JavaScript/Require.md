---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/Require.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript
fileName: Require.md
relativePath: /web/JavaScript/Require.md
title: Require
directoryName: JavaScript
category: JavaScript-guide
---

#Require

**Require JS** provides several benefits:

- It relieves us of needing to define **SCRIPT** tags in our HTML files and worrying about the order in which they are loaded. If you have a relatively small project, and you wrote or know all the modules in it, then it is fairly easy to define the order in which to list **SCRIPT** tags in your HTML file. In large projects, or in cases where you don't know the JavaScript files used in a project, there is often no easy way to discover what dependencies exist in your project. Does ModuleA depend on ModuleB? Or is it that ModuleB depends on ModuleA? What about modules C, D, E and F? A primary goal of require is to relieve you of all these issues.
- **require** allows us to decide which modules will be loaded when. In large applications, we don't want to load all our files at one time, as some might not be needed at all, and some might not be needed when the app first loads. For instance, if users can optionally load movies using a complex and heavy weight set of JavaScript files, then it would make sense to load those heavy files only when the user requested them, and not before.
- A third benefit is that **require**, like the modular pattern, helps you protect the global namespace. In fact, require has a version of the modular pattern written in to it. This allows you to use the modular pattern without the peculiar syntax that some find intimidating. Furthermore, there is no need to specify a global that points at objects defined in the modular pattern.

## Strategy

When should you use **require**? The main use case is for large projects that loads lots of files where either or both of the following is true:

- Files depend on one another
- Some files are not needed at load time but could be loaded later

In small projects that use only one or two JavaScript files, require is usually not needed. However, I think it is good idea to use require as often as possible, just so that you can become familiar with it's syntax.

## Bootstrap

The first step is to load require and **data-main**, which is generally a file called **Main.js**.

	<script data-main="javascripts/Main" src="javascripts/require.js"></script>

The real work, discussed in the next section, occurs in **Main.js**.

## Simple Case

Here is a relatively simple example set of files. The first is called **Main.js**:

```
require.config({
    baseUrl: '.',
    paths: {
        "jquery": 'jquery-2.1.1',
        "Control": 'Control'
    }
});


require(['jquery', 'Control'],
    function(jq, Control) {
        'use strict';

        $(document).ready(function() {
            var control = new Control();
        });
});
```

The **require.config** section defines the location of the files that require will load. The **baseUrl** specifies the default place that require will look for files. The **path** section defines the location for files or directories that are not directly under **baseUrl**.

The require section seen after **require.config** helps bootstrap your application.

### Dependencies

For the files that are going to be loaded with requirejs, you should use a method called **define** that is part of **require.**  The function takes a list of dependencies in square brackets, and then a callback the defines the methods or objects that you want to host in this module.

So Control might look like this:

```
define([], function(require) {

    var Control = (function() {

        return Control;
    }());

    return Control;
});
```

One of the most important lines is **return Control**. This specifies that the code in module **Control** can be accessed through constructor called **Control**. To fully understand the power of this syntax, you need to understand closures. In this case, **closures** ensure that any other code in the **Control** module that the constructor can access will be accessible from outside the module via the constructor. (I apologize if that sounds confusing, this just isn't the place to get into closures.)

## Require Boat

Take a look at [Require Boat](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/RequireBoat).

This is a very simple example showing how to get up to
speed with require.

In **index.html** we link in **Main** and **require.js**:

	<script data-main="Source/Main" src="Source/require.js"> </script>

**Main** then configures **jquery**:

	require.config({
	  paths: {
	    "jquery": "http://code.jquery.com/jquery-1.11.0.min",     
	  }
	});

Then we create a simple module called **Boat** which is
found in **Boat.js**:

	define(['jquery'], function() { 'use strict';

		function describe() {  
			$("#list").append("<li>I'm a boat.</li>");
		};

		return {describe: describe};
	});

This code says that our **Boat** module requires **jquery**. It
then defines a simple function which adds an item to a list. Finally
we return a link to the function:

	return {describe: describe};

Back in **Main**, we can now link in **Boat** and call **Boat.describe:**

	require(["Boat"], function(boat) {
		boat.describe();
	});

The first **Boat**, the one in the array, links in the **Boat.js**
module. For this we get a reference to a **boat** which is passed
as a parameter to our anonymous function. Finally, we use the
reference to call the describe method:

	boat.describe();

##Configure Require Paths

Consider this code:

```
require.config({
    paths : {
        "jquery" : "jquery-1.11.1.min",
        "Markdown" : "Markdown/Converter",
        "Editor" : "Markdown/Editor"
    }
});

require(['jquery', "MarkShow"],function(jq, MarkShow){
    var markShow= new MarkShow();
});
```

Compare it to this:

```
require.config({
    paths : {
        "jquery" :"jquery-1.11.1.min",
        "MarkShow" : "MarkShow",
        "Markdown" : "Markdown/Converter",
        "Editor" : "Markdown/Editor"
    }

});

require(['jquery', "MarkShow"], function(jq, MarkShow){
    var markShow = new MarkShow();
});
```

The first puts **MarkShow** only in the call to require, while the second puts it in both the **require.config** statement and the call to **require**. What is the difference?

I don't believe there is any difference at all. We use the **paths** property in **require.config** to help us work with complex paths or complex names. It's easier to write **jquery** than **jquery-1-11.1.min** so we *configure* require so that it understands that when we say **jquery**, we really mean **jquery-1-11-1.min**. The main purpose of **paths**, of course, is just to let us define the paths to modules that are not in the current directory:

    "Markdown" : "Markdown/Converter",

In our example, **MarkShow** is in the current directory, so there is no reason to configure it. We can already reference it just by writing **require["MarkShow"], function(MarkShow)**. As a result, there is no point in putting it in the **paths** property of **require.config**.

It is worth noting that you can do other things with require.config besides just setting up a path. In particular, you can use the **shim** section to help load files that are not set up to use **requirejs**.

## More

In answer to the first question, it is okay to create only one factory if you wish. The goal is to write code that you think is cleanest and easiest to use. These are judgement calls, so try using one factory, and let's see what happens. I'm honestly not sure which is best. I see arguments on both sides.

I don't know a good shortcut to defining the paths to your files when they appear in multiple directories. There might be one, but I don't know it. For now I think it is best to define the paths to all your files in main.js, and not in other files. That way you will not have to search among your files looking for the place where you defined the path to be used when it comes time to load them.

Having said this, we might in the future want to place a file in each directory that is responsible for loading the files in that directory. That way we create a "package" as it were. Here is a directory called Readers, and in it is a file like Main.js, that knows how to load all the files in that directory. That way we can load Readers/Main.js and it will load the files in that "package" or "name space." But frankly, I'm a little fuzzy on how all that might work. I'll figure it out, just not today.

I would ask that for the midterm, you define the paths to all your files in require.config for Main (public/javascripts), MainTest (Tests), and TestMain (the karma require file). That way I will know where to look if there is trouble loading files for your project. I feel like we have to move beyond this state of affairs, and soon, but for now, I think this is best.

If anyone is reading this, and is confused. I'll give an example. In public/javascripts/Main.js, there is a section like this:

    require.config({
        paths : {
            "jquery" : "jquery-2.1.1",
            "DefaultReader" : "./Readers/DefaultReader",
            "JsonReader" : "./Readers/JsonReader",
            "MarkdownReader" : "./Readers/MarkdownReader"
        }
    });



I want you to define the paths to all the files in your project in the paths object shown above. The only exception would be for files that are already in public/javascript. They don't need to be called out explicitly since they can just be referenced by name.

One you have defined the path for a file, then anywhere in your project that you need the file, you can just point to it by the name you defined in the paths  object shown above. You point to it like this:

    require(["jquery", "DefaultReader", "JsonReader", "MarkdownReader"],
        function(jq, DefaultReader, JsonReader, MarkdownReader) {'use strict';

Note that we don't have to specify the path to DefaultReader. Just say its name, and behind the scenes require uses the path from the require.config in Main.js.

In the require array above, use the same case as you used when defining the variable in the path object. That should usually be the same case as you used for the file name. For instance, BridgeReader.js would be 'BridgeReader' and test.js would be 'test'. In the function callback that follows, capitalize objects that need to be called with new, and use camel case for those that do not. For instance, consider this:

    require(["jquery", "Foo", "Gorp", "Gar"],
        function(jq, foo, gorp, Gar) {'use strict';

The assumption here is that you do not need to call new on foo or gorp but you do on Gar. (These are just used for illustrations, you probably want to use the modular pattern for most of the objects in your project, so you probably usually want to capitalize the names in the parameter list to the function callback in a require statement. At this stage, you don't have to use the modular pattern, however.)

## RequireJs Second Example {#require-second}

RequireJs provides:

- More control over the loading of JavaScript files. Load scripts on demand
- Support for JavaScript modules that stand alone and do not pollute the global name space
- An asynchronous alternative to the synchronous commonjs require calls used on the server
- A form of dependency injection similar to what we have in angular

To install **requirejs**:

<pre>
bower install requirejs --save
</pre>

**NOTE**: _When using **requirejs** you no longer need the jQuery **document.ready** method. You can, and should, remove it._

In **layout.jade** we load **requirejs** and specify a file, usually called **main.js**, where we configure **require** and load the core files for our application:

<pre>
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(data-main="javascripts/main.js" src="components/requirejs/require.js")
  body
    block content
</pre>

In **public/javascripts/main.js** we configure require and bootstrap our application:

**NOTE**: _By bootstrap I mean "load the core files of our application". I'm not referring to the CSS library._

```javascript
requirejs.config({
    baseUrl: '.',
    paths: {
        jquery: 'components/jquery/dist/jquery',
        bootstrap: 'components/bootstrap/dist/js/bootstrap',
        control: 'javascripts/control'
    }
});

requirejs(['jquery'], function($) {

    requirejs(['bootstrap', 'control'], function(bootstrap, control) {
        control.init();  // <= BOOTSTRAP APPLICATION
    });
});
```

We configure requirejs in a call to **requirejs.config**. The key tasks are:

- State the [baseUrl][base-url], which in this case is the **public** folder of our application.
- We then define maps that tell require JS how to find modules that not stored directly in the baseUrl. After making defining these paths, we can refer to individual moduels by these names, rather than having to spell out the whole path. For instance, we can write **control** rather than **javascripts/control**.

[base-url]: http://requirejs.org/docs/api.html#config-baseUrl

## Require JS Modules

Require JS modules are defined in specific way, usually through calls to function named **define**. For instance, in **public/javascripts/control.js** we define our first require js module:

```javascript
define(['jquery'], function($) {
    //Do setup work here

    function showBar() {
        //console.log('Show Bar Clicks called now');
        $('#display2').html('bar');
    }

    var control = {
        color: "black",
        size: "unisize",
        setup: function() {
            $(document).on('click', '#showClick', showBar);
            $('#display2').html(control.color + ' - ' + control.size);
        },
        init: function() {
            //console.log(this.color);
            that = this;
            work.init();            
        }
    };

    return control;
});
```

We begin by calling the require js **define** function:

```javascript
define(['jquery'], function($) {
  // DEFINE THE OBJECT STORED IN THIS MODULE AND RETURN IT
});
```

Inside the define function we define the object stored in our module, and return it. You need do nothing special when writing your object. Just define it using standard JavaScript code and it is ready to use. It automatically inherits the features of a require module because it is declared this way. It is as if you declared it using the module pattern, but it is perhaps simpler to understand, and easier to use as part of a larger application architecture.

Require uses dependency injection. This means that one module can state that it is dependent on another module. In the example shown above, we are stating that the module depends on jQuery. Remember that in **main.js** we set up jquery. We do this by putting the dependency in square brackets and then declaring a variable in the parameter for the anonymous function. The variable is actual instance of the dependency that we can use in our module:

```javascript
define(['jquery'],         <= Square bracket to state dependency from main.js
	function($) {            <= jQuery instance variable declared here
	  $('#foo').html('bar'); <= Example use of the dependency
})
```


Many of the major libraries that are commonly used automatically implement the requirejs define function or do something similar. In other words, jQuery, and many other libraries, are requirejs modules. Or maybe it would be more correct to say that the meet the requirements of a requirejs module. This is the case because requirejs is so popular, and so commonly used. Some libraries do not support requirejs, and we will have to take special steps to load them.

## Testing Require

I've created a [sample project][jas-req] to help you see how to test and use requirejs. It is called **JasmineRequireJs** and is hosted on JsObjects.

Looking at that project, see this part of [**karma.conf.js**][karma-req]:

```javascript
frameworks: ['jasmine', 'requirejs'],

files: [
    'public/components/jquery/dist/jquery.min.js',
    'node_modules/jasmine-jquery/lib/*.js', {
        pattern: 'spec/test-*.js',
        included: false
    }, {
        pattern: 'public/javascripts/**/*.js',
        included: false
    },
    'spec/main-test.js'
],

// list of files to exclude
exclude: ['public/javascripts/main.js'],
```

You are going to have to port this code directly into your **SolarVoyager** folder. Just replace the similar lines of code in your **karma.conf.js** with the lines shown above. Note:

- The exclusion of **public/javascripts/main.js**
- and inclusion of **spec/main-test.js**

Note also that there are no frameworks loaded at the very bottom of the file. (You can't see the bottom of the file in the code excerpt shown above, but you can inside the sample project.)

There may be other subtle tweaks required, but the above gives you most of what you need.

Looking at the updated **files** section above, we see that karma will allow, for instance, the loading of the the JavaScript files in **public/javascripts**. It will not, however, actually load them. That fact is designated by the the **included** property: **included:false**. We are saying: "We want karma to make the files available, but not to actually load them. We will instead let requirejs actually load them." We use a file called **spec/main-test.js** to tell require what to load.

I'll repeat the point again to make sure it is clear. **requirejs** can't load anything unless we have the **pattern** and **included** properties in the **file** section as shown above. You have to have the **pattern** and **included** properties, and you also have to have **main-test.js**, as explained below.

**NOTE** _I use **test-XXX.js** as the naming convention for require based tests, and **spec-XXX.js** for jasmine server side tests._

Look at [this sample][main-test-req] **main-test.js** file from the **spec** directory:

```javascript
function loadTestsIntoArray() {
    'use strict';
    var tests = [];
    for (var file in window.__karma__.files) {
        if (/test-/.test(file)) {
            console.log('Loaded test:', file);
            tests.push(file);
        }
    }
    return tests;
}

require.config({
    baseUrl: '/base',

    paths: {
        home: 'public/javascripts/home'
    },
    deps: loadTestsIntoArray(),
    callback: window.__karma__.start
});
```

You will need to save this file into your **SolarVoyager** project. You are going to have to add a good deal to the **paths** section of **require.config**. You can use **/public/javascripts/main** as a guide as to what is needed. The files are very similar, but note that in **spec/main-tests.js** we write **public/javascripts/home** while in **public/javascripts/main.js** we write **javascripts/home**. This is necessary because the tests don't assume that your code lives in the **public** folder.

Finally, look at the way we [wrap our test suites][test-sample-req] in a require **define** function:

```javascript
define(['home'], function(home) {
    'use strict';

    describe('Elvenware Simple Plain Suite', function() {

        it('expects true to be true', function() {
            expect(true).toBe(true);
        });

        it('expects home.color to be red', function() {
            expect(home.color).toBe('red');
        });

    });

});
```

You can save this test into **SolarVoyager** as **spec/test-basic.js**. Then type **karma start**. If your tests pass, then you have things set up correctly and you can begin writing requirejs tests in earnest.

The results might look something like this:

<pre>
PhantomJS 2.1.1 (Linux 0.0.0) LOG LOG: 'Loaded test:', '/base/spec/test-basic.js'

  Elvenware Simple Plain Suite
    ✓ expects true to be true
    ✓ expects color to be red

PhantomJS 2.1.1 (Linux 0.0.0): Executed 2 of 2 SUCCESS (0 secs / 0.001 secs)
TOTAL: 2 SUCCESS
</pre>

[jas-req]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/JasmineRequireJs
[karma-req]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/UnitTests/JasmineRequireJs/karma.conf.js
[main-test-req]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/UnitTests/JasmineRequireJs/spec/main-test.js
[test-sample-req]:https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/UnitTests/JasmineRequireJs/spec/test-basic.js
