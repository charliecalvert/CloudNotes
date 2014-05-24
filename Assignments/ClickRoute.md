 #Click Route

In class on Wednesday we developed an express application that we called, I believe, **Temp02**. I have renamed that project and made it available for download as [ClickRoute.zip][ClickRoute]. Download that project. Copy it into your repo and unzip it:

    unzip ClickReader.zip
    
[ClickRoute]: http://elvenware.com/charlie/downloads/ClickRoute.zip

- Put your routes in /routes/index.js
- Be sure you include documentready or DomReady in require
    
##Step01 - Rename the Eclipse Project File {#step01}

Open up the **.project** file and change the string in the name field from **ClickRoute** to **ClickRoute-LastName**, where LastName is your last name.

##Step02 - Server Side {#step02}

Define three routes in app.js (or server.js). The routes are as follows:

- /Item01
- /Item02
- /Item03

Here for instance, is a route for Item01:

    app.get('/Item01', function(request, response) {
        var result = { "result": "Success" };
        response.send(result);
    });

Create similar routes for Item02 and Item03. Change the **result** object literal so that it has three properties:

- result
- route
- message

Set the **result** property to **Success** as shown above. Set **route** to the name of the route, such as **/Item01**. Set the **message** to the string **The server sent me.**

##Step03 - Client Side {#step03}

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
    
##Step04 - Parse the data {#step04}

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

##Sample Interface

It can look as you please, but here is an example interface.

![Click Route](http://www.elvenware.com/charlie/books/CloudNotes/Images/ClickEvents05.png)

##Step05: Turn it In {#step05}

Check it into your repository in a folder called **Week06ClickReader**. 
