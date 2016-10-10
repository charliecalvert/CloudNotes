# Click Route

Information on routes and Express is available here:

- [http://bit.ly/noderoutes](http://bit.ly/noderoutes)

I have created a project named **Week09-ClickRoute** and made it available for from the **Prog272-Assignments** repository:

    http://github.com/charliecalvert/Prog272-Assignments.git

**NOTE**: This project was created with **express ClickRoute** rather than **yo express**. As a result, you should start it with **npm start** or **node bin/www** or, better, **nodemon bin/www**.


## RequireJs

This project uses [RequireJs](http://requirejs.org). We have not used this technology yet, but most large applications use it, or some similar system. I have a description of it here:

- [Requirejs on Elvenware][reqjs]

The basic steps are:



## Step01 - Copy the project to your repository {#step01}

Clone or pull the repository. Find the **Week09-ClickRoute** project. Copy it to your repository and rename it to reflect our current week. For instance, **Week04-ClickRoute**.

**NOTE**: *Remember you can copy files from the bash shell with a command similar to this:*

    cp -r Week09-ClickRoute ~/Git/prog272-lastName/.

Let's include **$(document).ready(callback)** or [DomReady][domReady] in **Main.js**:

```
require(['jquery', 'ClickEvents'], function(jquery, ClickEvents) {
    'use strict';

    console.log('Main called');
    $(document).ready(function() {
        var clickEvents = new ClickEvents();
    });
});
```

And if we want to use jquery in ClickRoutes.js, then be sure to include it:

```
define(["jquery"], function(jquery) {'use strict';
```

If you skip this latter step, then the program will still run without error, but jquery
events may not be fired until you press refresh.

[domReady]: http://requirejs.org/docs/api.html#pageload
[reqjs]: http://www.elvenware.com/charlie/development/web/JavaScript/Require.html

## Step02 - Server Side {#step02}

Define three routes in **routes/index.js**. The routes are as follows:

- /Item01
- /Item02
- /Item03

Here for instance, is a route for Item01 as found in **routes/index.js**:

    router.get('/Item01', function(request, response) {
        var result = { "result": "Success" };
        response.send(result);
    });

Create similar routes in the same file for Item02 and Item03. For now, that means you should repeat the code shown above, but with slight variations. (There are other ways to handle this sort of thing, but this will do for now.

Change the **result** object literal so that it has three properties:

- result
- route
- message

The object you return should now have three properties:

- Set the **result** property to **Success** as shown above.
- Set a new property called **route** to the name of the route, such as **/Item01**.
- Set a new property called **message** to the string **The server sent me.**

Again, this means your declaration for this result object will change. To give a very broad hint, consider the following bit of pseudo-code:

        var result = { "result": "Success" WHAT GOES HERE? };

The tricky part, I suppose, will be properly parsing these three properties and displaying them exactly as you define in them. In other words the value of the properties you define in **routes/index.js** should appear verbatim on your HTML page at run time. When you click on Item 1, we should see all three properties for Item 1, when you click on Item 2, we should see all three properties of Item 2, etc.

**Remember**: *Put your routes in /routes/index.js*

## Step03 - Client Side {#step03}

Open up ClickEvent.js and look for the listClick method:

    var listClick = function(event) {
        var clickText = event.target.innerHTML; // was innerText
    };

This method is called whenever the user clicks on one of the list items in the unordered list found on the site's web page.

From inside this one method, I want you to call [getJSON][getJson]. As you remember, getJSON looks a bit like this:

    $.getJSON('/SOME_ROUTE, function(DATA_FROM_SERVER) {
        // Do something such as: $(SOME_SELECTOR).html(DATA_FROM_SERVER);
    });

I want you to dynamically change **/SOME_ROUTE** depending on what list item the user clicked. If they clicked on **Item01**, then set the route to **/Item01**. This should call the appropriate route that you set up on the server in the previous step. There are multiple ways to solve this problem, but it would be nice if you only had to call getJSON once. In other words, set the string to pass as the route, then pass that string in the first parameter to getJSON:

    var someString = // Define the route based on the information you already have
    $.getJSON(someString, function ...

## Step04 - Parse the data {#step04}

When you called **response.send** back on the server, you sent an object from the client to the server. On the client side, this object is passed to the **getJSON** callback:

    $.getJSON('/SOME_ROUTE, function(DATA_FROM_SERVER) {

Parse the data sent from the server and display it to the user in three paragraph tags that appear on your HTML page. In Jade, that will look like this:

    p#result
    p#route
    p#message

Inside the call to **getJSON**, use jQuery to set each of these paragraphs to one of the properties from the object sent by your server.

**Hint**: *Compare the ID's shown above to the properties of the object you set up in [Step02](#step02)*.

When you are done, the app should respond to clicks on the list items as follows:

- Call getJSON to invoke a route on the server
- On the server, respond by sending back a custom object with three properties
- On the client receive the data, and display each of the three properties to the user. Each property should appear in a separate paragraph tag that was configured with Jade.

[getJson]: http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#getJSON

## Sample Interface

It can look as you please, but here is an example interface.

![Click Route](http://www.elvenware.com/charlie/books/CloudNotes/Images/ClickEvents05.png)

## Step05: Turn it In {#step05}

Check it into your repository in a folder called **Week09-ClickRoute**.

## Hints

You may see this message or one like it:

```
Not Found

404

Error: Not Found
    at app.use.res.render.message (/home/charlie/Downloads/ClickRoute/server.js:37:15)
    at Layer.handle [as handle_request] (/home/charlie/Downloads/ClickRoute/node_modules/express/lib/router/layer.js:82:5)
    at trim_prefix (/home/charlie/Downloads/ClickRoute/node_modules/express/lib/router/index.js:302:13)
    at /home/charlie/Downloads/ClickRoute/node_modules/express/lib/router/index.js:270:7
    at Function.proto.process_params (/home/charlie/Downloads/ClickRoute/node_modules/express/lib/router/index.js:321:12)
    at next (/home/charlie/Downloads/ClickRoute/node_modules/express/lib/router/index.js:261:10)
    at /home/charlie/Downloads/ClickRoute/node_modules/express/lib/router/index.js:603:15
    at next (/home/charlie/Downloads/ClickRoute/node_modules/express/lib/router/index.js:246:14)
    at Function.proto.handle (/home/charlie/Downloads/ClickRoute/node_modules/express/lib/router/index.js:166:3)
    at router (/home/charlie/Downloads/ClickRoute/node_modules/express/lib/router/index.js:35:12)
```    

This can mean that you have not properly defined a route for your event handler. Go back and re-read the section on Server Side code in this document.

This information is a bit outdated, in that you should use router.get rather than app.get, but nevertheless, there is information here you might find useful:

- [Node on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#using-express)
