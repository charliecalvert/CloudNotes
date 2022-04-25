---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/NodeJade.md
relativePath: javascript-guide/NodeJade.md
title: NodeJade
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: NodeJade.md
fileNameHTML: NodeJade.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

# Pug and Jade

[Pug][pug] is a template library similar to [HAML](http://haml.info/) and not totally unlike other popular template libraries such as [Handlebars](http://handlebarsjs.com/). It also is a bit like Markdown, in that it provides a shorthand syntax for composing HTML pages.

**NOTE**: _The pug library used to be called Jade._

## Overview

We will use Pug as a template engine. It allows us to:

- Use a very readable shorthand for creating HTML
- Use JavaScript declared variables in our HTML so we can make a change in one place and see it propagated everywhere
- Divide our pages up into composable, reusable modules. For instance, on all our pages we can use a header and footer that we define only once in specific place.
- Use Mixins, which are reusable chunks of HTML that can be inserted anywhere in our pages. For instance, a specific kind of customized button.
- To understand all this takes time, but it is a very useful skill to develop.

There are other templates engines. Which one you use can be a matter of taste or a matter of fitting the right tool to the right use case. We will focus mostly on Pug because it is widely used and well written and well integrated into Express.

Pug used to be called Jade. There was a copyright issue regarding the name, so we now call it pug. I didn't like the new name at first, but it has grown on me. Certainly, it is short! There may be assignments where I talk about Jade, just remind me to update the assignment, and mentally change the word Jade to Pug.

## Clean

Many developers like to use Pug instead of raw HTML for several reasons:

- It has a clean easy to read syntax
- It is more succinct than HTML
- It is also more flexible than HTML. For instance, it allows developers to declare variables and reuse code.

Here is an example of how to layout a pug template:

```text
doctype html
html
	head
		title= title
		link(rel='stylesheet', href='/stylesheets/style.css')
	body
		nav
			ul
				li
					a(href="/") page01
				li
					a(href="/page02") page02
				li
					a(href="/page03") page03
		h1 #{title}
		block content
```


When working with Pug, indentation is crucial. You should indent with either tabs or spaces, but not both. You frequently need to open your file in an editor that allows you to visualize your white space. Then you should count your spaces, and make sure it follows an exact pattern. Suppose, for instance, that you are using tabs for your indentation. In the pseudo code shown below, each hyphen (dash -) represents one tab. Example 1 is like what's shown above:

```
doctype html
html
- head
- - title
- - link
- body
- - nav
- - - ul
- - - - li
- - - - li
- - - - li
- - h1
- - block content
```

Example 2 is a common pattern in bootstrap files:

```
block content
- container
- - header
- - navbar
- - - nav
- - - - ul
- - - - - li
- - - - - li
- - - - - h3
- - - h1
- - - p
- - - h1
- - - div
- - - footer
- - - - p
```

When looking at the pseudo code above, the point is that you can explicitly count how many tabs appear before each HTML element. You want to achieve that level of specificity when working with Pug.

## Rendering Jade/Pug

Pug allows us to "pass in" variables (locals) that can be used on the page. This is known as templating.

When Pug is being translated to HTML, the renderer looks at the locals that are passed to it and substitutes these variables for markers on the page.

For instance, in this well-known chunk of code, where the locals have a property called title:

```javascript
router.get('/', routeParamMiddleware, function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'Week09-SessionBasics'
    });
});
```

We can then reference this in our Pug like this:

```text
p Welcome to #{title}
For more details on this process, see the overview here:
```

https://pugjs.org/api/getting-started.html (Links to an external site.)

Even if all this is clear, it still may not be obvious that the locals can take a complex object like user, and that we can reference the fields of that object in our Pug:

```javascript
response.render('account', {
    title: 'Google Account',
    user: request.user
});
```
And in the Pug:

```text
p DisplayName: #{user.displayName}
```

## Input Controls

Declare a text Input:

```JavaScript
input#dirToWalk(type='text', name='dirToWalk')
```

Put text in it with jQuery:

```javascript
$('#dirToWalk').val('/home/charlie/Documents/AllTest');
```

## Editors

**HINT**: *Here are some ways to turn on visual whitespace in various editors:*

- NotePad++: **View | Show Symbol | Show White Space and Tab**
- Geany: **View | Editor | Show White Space**

Most programming editors have options like these.

## Loading Pug

While reading this section, you might want to also run the accompanying example program, found in the [JadeRoutes][jade-routes] program from JsObjects.

[jade-routes]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/JadeRoutes

In the next few paragraphs I describe how Pug templates get loaded in to our web applications. Much of the code I describe is autogenerated for you when you first create the express application. However, some of the code you have to write yourself. Of course, whether the code is autogenerated, or created automatically, you should be sure that you understand all the pieces and what they do.

In our **app.js** file we link in the views directory and tell express to use Pug. Note that their other ways for express to generate or **render** HTML files. But we are asking it to render HTML from Pug templates. We do so with code like this:

```javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

Once again, this code is found in **app.js**. It is frequently, perhaps even usually, auto-generated by the **express-generator**. But you should understand what it does.

After processing the above code, express knows to look for Pug files in the **views** directory. It also knows to **render** views using the Pug engine.

Our next chore is to tell express where to send requests sent from the browser. The user typically uses HTTP to compose URLs which are sent back to our express server. Depending on the shape of the URL, the express app can handle the request in any number of ways. The following code in **app.js** tells express where to send requests with a particular type of URL. This is known as routing:

```javascript
// Link in the index.js file from the routes directory
var routes = require('./routes/index');

// Tell the program to send routes of a certain type to **routes/index.js**.
app.use('/', routes.index);
```

The above code tells express the following:

- If the user types in [http://www.example.com][wec]
	- route the request to **routes/index.js**.
- If he types in [http://www.example.com/foo][wec] the code is also routed to **routes/index.js**.

In fact, with the code shown above, most requests from the server will end up going to **routes/index.js**. However, we shall see that it is possible to tell the server to route requests of a certain type to another file. For instance, requests to [http://www.example.com/foo][wec] could be sent to **routes/foo.js**. But we need to add more code to make that happen. The code shown above sends requests of this type to the home page. We will need to set up a second route (endpoint) for handling the **foo** route.

## Render Examples

When the browser sends a request for an HTML page, express can send the request to **routes/index.js**). Routes found in that file detail how our Pug templates should be rendered.

Here is an example **routes/index.js**. Study it with care:


```javascript
var express = require('express');
var router = express.Router();

/* ONE: GET home page. */
router.get('/', function(request, response, next) {
    'use strict';
    response.render('index', {
        author: 'Charlie Calvert',
        title: 'Solar Explorer'
    });
});

/* TWO: Energy Types Pug files routed here. The Pug is in the energy-types directory. */
router.get('/energy-types/:id', function(request, response) {
    'use strict';
    response.render('energy-types/' + request.params.id, {
        title: 'Energy Types'
    });
});

/* THREE: Renewable Pug files routed here. The Pug is in the renewables directory */
router.get('/renewables/:id', function(request, response, next) {
    'use strict';
    response.render('renewables/' + request.params.id, {
        title: 'Renewable Types'
    });
});

/* FOUR: Other Pug files routed here. The Pug is in the views directory. */
router.get('/:id', function(request, response, next) {
    'use strict';
    response.render(request.params.id, {
        title: 'Random types'
    });
});

module.exports = router;
```

Once again, I ask the you study this example carefully. All the routes in this file translate Pug into HTML and send the result to the server using HTTP. I have labeled each method as ONE, TWO, THREE and FOUR.

- ONE: This is where requests for the home page go. **http://www.example.com**
- TWO: This is where requests for energy-types pages go: [http://www.example.com/energy-types/solar-page][wec]
- THREE: This is where requests for renewable pages go: [http://www.example.com/renewables/hydro-page][wec]
- FOUR: This where requests for uncategorized files go: [http://www.example.com/about-page][wec]

**NOTE**: _We don't explicitly ask for HTML even though it is HTML that will be sent back to the brower. In other words, instead of writing this: [http://example.com/about.html][wec], we write this: [http://example.com/about][wec]. It is a simple matter to teach express to respond properly to either request, but I find it simpler to dismiss with the HTML extension. But this is a matter of taste, and you should feel free to do what seems best to you._

Now let's consider the case where we want requests for anything have to do with renewables to be sent not to **routes/index.js** but to **routes/renewables.js**. We do this in large programs where we don't want to overload **index.js** with too many methods.

Suppose you create a file called **routes/renewables.js**. To set it up, do this in **app.js**:

```javascript
var renewables = require('./routes/renewables');
var routes = require('./routes/index');

// It's usually safest to insert the renewables middleware
// before the middleware found in **routes/index.js**
app.use('/renewables/', renewables);
app.use('/', routes);
```

In **routes/renewables.js**, add, for now, just one route:

```javascript
var express = require('express');
var router = express.Router();

router.get('/:id', function(request, response) {
    'use strict';
    response.render('renewables/' + request.params.id, {
        title: 'ElfComponent'
    });
});

module.exports = router;
```

Now consider where our different URLs lead:

- **http://www.example.com** => **routes/index.js**
- [http://www.example.com/energy-types/my-jade-file][wec] => **routes/index.js**
- [http://www.example.com/renewables/my-jade-file][wec] => **routes/renewables.js**
- [http://www.example.com/about][wec] => **routes/index.js**

Notice that the third request routes URLs with [http://example.com/renewables/][wec] in them to the routes found in our **routes/renewables.js** file.

The next logical step would be to create **routes/energy-types.js**. To do so, just follow the template established by the example shown above for **renewables**.

Finally, we can, of course, define other routes in these files that have nothing to do with Pug. For instance, we might define a route in **renewables.js** that loads a JSON file:

```javascript
var express = require('express');
var router = express.Router();

/* ONE */
router.get('/getRenewables', function(request, response) {
    'use strict';
    fs.readFile('data/renewables.json', 'utf8', function(err, data) {
        if (err) {
            response.status(404).send(err);
        } else {
            var jsonAsObject = JSON.parse(data);
            response.send({ renewables: jsonAsObject });
        }
    });
});

/* TWO */
router.get('/:id', function(request, response) {
    'use strict';
    response.render('renewables/' + request.params.id, {
        title: 'ElfComponent'
    });
});

module.exports = router;
```

Looking at the above code, it should be obvious that route ONE has nothing to do with Pug. It is about loading JSON. Route TWO, on the other hand, has to be about Pug, since it calls render. As explained above, we have configured our express program to render Pug as HTML and send it back to the browser via HTTP.

Some resources:

- [Home page](http://jade-lang.com/)
- [HTML to Pug](http://html2pug.com/)
- [HTML to Jade](http://html2jade.aaron-powell.com/)

## Use Unique Names

Don't define the same name for different tasks. If you have a javascript file called **/public/javascript/renewables.js**, consider avoiding creating entities such as:

- **views/renewables.jade**
- **routes/renewables.js**

Also consider avoiding creating routes in **routes/renewables.js** that look like this:

```javascript
router.post('/renewables', function(request, response) { ... })
```

It is not necessarily an error to do this, but it can cause confusion. Consider instead:

- **views/renewables-page.jade**
- **routes/renewables-routes.js**
- **router.post('/getRenewables', function(request, response) { ... })**

This may not be an idea solution, but it can help you sort out your code. If you don't like this kind of solution, then just be careful when loading javascript, Pug and calling routes.

## Pug Indent

When thinking about Pug, indentation is crucial. Suppose I write this:

```
div
p
```

That creates two separate, unrelated elements, a div and paragraph.

```
<div></div>
<p></p>
```

Suppose I write this:

```
div
   p
```

Now the paragraph is part of the div because it is indented to the right beneath it.

```
<div>
   <p></p>
</div>
```

Suppose you create a div and make it your controller:

```
div(ngController="MyController")
p {{firstName}}
```

The above code probably won't work because the paragraph is not part of the controller and hence **{{firstName}}** is out of scope. To fix it, do this:

```
div(ngController="MyController")
   p {{firstName}}
```

Now the paragraph is part of the controller.

When trying to see exactly what is going on with the spacing in a Pug file, considering opening it in geany and turning on **View | Editor | Show White Space**. Or open it in NotePad++ and choose **View | Show Symbol | Show White Space and Tab**.

In WebStorm, you can also turn on visible white space, I believe it is: **File | Settings | Editor | General | Appearance | White Space**.


[pug]: https://pugjs.org/api/getting-started.html
[wec]: http://www.example.com
