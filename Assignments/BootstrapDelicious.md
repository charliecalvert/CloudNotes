# Bootstrap Delicious File

The main goal of the assignment is to retrieve information from the Delicious web site based on the user's input. We are learning how to call a [REST][rest] like [web service][ws]. In this case, it is the web service provided by Delicious.

- The Delicious API: [https://github.com/SciDevs/delicious-api](https://github.com/SciDevs/delicious-api)

There are various controls on the main page of the app we are creating in this assignments. We form queries to send to the Delicious site based on the information the user enters as she clicks on, or enters text into, these controls. Here are two sample queries that we might create based on the user's input:

* <http://feeds.delicious.com/v2/json/charliecalvert/javascript>
* <http://feeds.delicious.com/v2/json/charliecalvert/nodejs>

In addition, we will learn about Bootstrap. Bootstrap allows you to create projects with CSS that looks good on a PC, a tablet or a phone.

[ws]: https://en.wikipedia.org/wiki/Web_service
[rest]: https://en.wikipedia.org/wiki/Representational_state_transfer

## Step One: Install {#install}

To get started using bootstrap, navigate to your repository and create a new express project called **Week03-BootstrapDelicious**.

```bash
express Week03_BootstrapBasics
cd Week03_BootstrapBasics
npm install
```

First copy our default **bower.json** and **.bowerrc** files from [JsObjects][bower-copy].

```bash
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
```

Remember that we define **$ELF_TEMPLATES** in our **.bash_alias** file. That file is maintained on [JsObjects][bash-alias].

[bower-copy]:https://github.com/charliecalvert/JsObjects/tree/master/Utilities/Templates
[bash-alias]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/.bash_aliases

Now set the port to **bin/www** to 30025. You can do it manually in WebStorm, or use this command to do it from the command line:

```bash
sed -i -- 's/3000/30025/g' bin/www
```

Replace **node** with **nodemon** in **package.json**:

```bash
sed -i -- 's/node\s/nodemon /g' package.json
```

Get the **favicon**:

```bash
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
```

Change the title:

```bash
sed -i -- 's/Express/BootstrapDelicious/g' routes/index.js
```

Create control.js and use add strict:

```bash
echo -e "\$(document).ready(function() { 'use strict'; \n});" >> public/javascripts/control.js
sed -i "s/{$/{ 'use strict';/" routes/index.js
sed -i "s/{$/{ 'use strict';/" routes/users.js
sed -i "s/next) {/next) { 'use strict';/" app.js
```

This part of your work is done now, but as an fyi, this is how it looks if you put it all together:

```bash
express Week03-BootstrapDelicious
cd Week03-BootstrapDelicious
npm install
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
sed -i -- 's/3000/30025/g' bin/www
sed -i -- 's/node\s/nodemon /g' package.json
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
sed -i -- 's/Express/BootstrapDelicious/g' routes/index.js
echo -e "\$(document).ready(function() {\n});" >> public/javascripts/control.js
sed -i "s/{$/{ 'use strict';/" routes/index.js
sed -i "s/{$/{ 'use strict';/" routes/users.js
sed -i "s/next) {/next) { 'use strict';/" app.js
```

Remember that you can save code like that shown above into **bash** script, and then run it as needed:

* First create the file with an editor such as geany or nano
* Save the file as **CreateBootstrapDelicous**
* Make it executable: chmod +x CreateBootstrapDelicious
* Run it like this: ./CreateBootstrapDelicious

If you want to pass in a parameter, you can pick it off with $1, $2, etc. For instance if you pass in BootstrapDelicious as a parameter when you run your script:

```bash
#! /bin/bash

express $1
cd $1
npm install
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
sed -i -- 's/3000/30025/g' bin/www
sed -i -- 's/node\s/nodemon /g' package.json
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
sed -i -- 's/Express/'$1'/g' routes/index.js
echo -e "\$(document).ready(function() { 'use strict'; \n});" >> public/javascripts/control.js
sed -i "s/{$/{ 'use strict';/" routes/index.js
sed -i "s/{$/{ 'use strict';/" routes/users.js
sed -i "s/next) {/next) { 'use strict';/" app.js
```

Now you can use this script to create a project with an random name. For instance, you could:

* Save the new script as CreateExpressProject and put it in your ~/bin directory
* chmod +x ~/bin/CreateExpressProject
* Invoke it like this: CreateExpressProject Week03-Test-LastName

## Step Two: Link to Bootstrap {#link}

We need to link in three files:

* boostrap.css
* jquery.js
* bootstrap.js

Here is what **layout.jade** looks like when you are done:

```jade
doctype html
html
  head
  	meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width')
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
  body
    block content
```

## Step Three: Simple Controls {#simple-controls}

Get started defining the HTML for your app by creating a single button and input control. This code belongs in **index.jade**:

```jade
button(onclick="deliciousEventHandler()") Query Delicious

div.panel.panel-default
    div.panel-heading Text Input
    div.panel-body
        div
            label(for='subject') Subject
            input#subject.form-control(type='text', placeholder="subject")
        br
        	button.btn.btn-primary(type="button", onclick="delicious()") Search Delicious
	div
		pre#viewer
````

## Step Four: Query Delicious {#query-delicious}

Make sure a file called **control.js** is in the **public/javascripts** directory. It should have been created by our **CreateExpressProject** script back in Step One.

We will, however, have to use the **script** tag to link **control.js** into our app from **layout.jade**.

Place the following code inside **control.js**:


```javascript
function callDelicious(subject) { 'use strict';
    var feedUrl = 'http://feeds.delicious.com/v2/json/charliecalvert/' + subject;
    $.ajax(
        {
            url: feedUrl,
            dataType: 'jsonp',
            success: function(data) {
                $('#viewer').html(JSON.stringify(data, null, 4));
            }
    });
}

function deliciousEventHandler(event) { 'use strict';
    var subject = $("#subject").val();
    callDelicious(subject);
}
```

You can query for either JSON or RSS:

* http://feeds.delicious.com/v2/json/charliecalvert/
* http://feeds.delicious.com/v2/rss/charliecalvert/

We, however, will prefer JSON. We like JSON because it is subset of JavaScript, and is therefore easily made compatible with our existing JavaScript codebase.

Read more about the URL for RSS and JSON feeds here: 

* [Delicious RSS and JSON](https://delicious.com/rss)
* [Delicious oauth](https://github.com/SciDevs/delicious-api/blob/master/api/oauth.md)

The code in the delicious and callDelicious methods do the following:

* Retrieve the query the user wants to run. For instance, the user might enter **javascript**
* Pass the user's request to a method that can query the Delicious web site.
* Append the user's request to our default query URL.
* Use ajax to run the assembled query
* Display the results

## Step Five: Create Additional Controls and Response Methods {#more-controls}

For what follows, refer to your **Week03-BootstrapBasics** for help setting up radio buttons and check boxes.

Provide three radio buttons:

* javascript
* node
* bootstrap

When the user selects one of them, write code in **control.js** to ensure they see the delicious options for links to those items.

In particular, change the URL in the **delicious** call to one of these:

```javascript
url: 'http://feeds.delicious.com/v2/json/charliecalvert/javascript'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/nodejs'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/bootstrap'
```

If you want to see the links that have two different tags associated with them, then compose a URL like one of these:

```javascript
url: 'http://feeds.delicious.com/v2/json/charliecalvert/javascript+nodejs'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/nodejs+bootstrap'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/bootstrap+javascript+nodejs'
```

This shows the intersection between two or more tags. The last option returns an empty set.

Provide three checkboxes with the same labels.

If the user selects one or more of them, they see delicious links for multiple items for instance, both **javascript** and **nodejs**. For instance, if they select **javascript** and **node**, ensure they see all the links that use both javascript and node from the Delicious site. This is the interesction, not the combined scripts.

Below is an example interface. The three buttons labelled JavaScript, Bootstrap and Node can be replaced with ordinary radio buttons. The large gray area near the bottom is a a PRE tag inside a DIV:

```jade
div
	pre#viewer
```

The id for my text input control is **#subject** and for the radiobuttons its **chJavaScript**, **chBootstrap** and **chNodeJs**:

```
input#chJavaScript(type='checkbox', name='check', value='JavaScript')
```

Here is an approximation of something you can create:

![Delicious][boot-del]

[boot-del]: https://s3.amazonaws.com/bucket01.elvenware.com/images/BootstrapDelicious.png

## Step Six: Handle Check Box and Radio Button Clicks {#control-clicks}

The trickiest parts are the jQuery css selectors in **document ready**. Recall that we already covered this subject in **Bootstrap Basics**.

This time round, however, we should set up some default actions, perhaps by calling the code that displays the check box selection:

$(document).ready(function() {

    // Handle button clicks
    // INCLUDE CODE FROM BOOTSTRAP BASICS

    // Initialize controls
    // CALL CODE THAT HANDLES CHECK BOX SELECTION
});

## Step 6.5: Compose URL {#compose-url}

The **displayCheckBoxSelection** must build up a query reflecting the options selected by the user. You might want to declare some local variables with names like **tag**, **query** and **options** to help us with this task.

Recall that if you want to see the links that have two or more different tags associated with them, then compose a URL like one of these:

```javascript
url: 'http://feeds.delicious.com/v2/json/charliecalvert/javascript+nodejs'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/nodejs+bootstrap'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/bootstrap+javascript+nodejs'
```

Each of the **if statements** in **displayCheckboxSelection** creates or adds to the **query** string. For instance, if the user selects only **bootstrap**, then this is our **subject** parameter for the query string:

- boostrap

If they selection **bootstrap** and **javascript**, then we end up with this:

- boostrap+javascript

And so on. Your job is to build up that query string and then pass it on to the ajax call when you are done:

```javascript
callDelicious(query)
```

**HINT**: *You don't always want to create a prepend your strings with a **+** operator. Here is code that could be used to help you compose a string that includes a **+** operator only if **query** is not an emtpy string:

```javascript
tag = query === '' ?  '' : '+';
```

## Step 6.7: Create Embedded Anchor Links {#anchor-links}

Here is some of my code for making the remote call to the Delicious web service:

```javascript
var deliciousLinks;

function appendUrl(index, deliciousLink) {
	// COMPOSE A HTML LI ELEMENT WITH AN ANCHOR LEADING TO A URL
    // SOMETHING LIKE: <li><a href="...">...</a></li>
}

function callDelicious(subject) {
    var feedUrl = 'http://feeds.delicious.com/v2/json/charliecalvert/' + subject;
    $.ajax(
        {
            url: feedUrl,

            dataType: 'jsonp',

            success: function(data) {
            	// USE JQUERY EACH METHOD TO ITERATE OVER 
                // OUR DELICIOUS LINK RECORDS
                // PASS EACH DELICIOUS RECORD TO appendUrl
            }
        });
}
```

The code first create a url called **feedUrl** that might look like this:

```xml
http://feeds.delicious.com/v2/json/charliecalvert/bootstrap+javascript
```

If the **$.ajax** call that uses this URL succeeds, then we iterate over the **data** array returned from Delicious. For each item in the array, we call **appendUrl**, which is designed to create a list item (LI) that contains one (or optionally two) hyperlinks.

- The first hyperlink opens a tab showing the Delicious link.
- The second hyperlink shows the details of the object we got from delicious that details the link related information. For instance, the details might look like this:

```json
{
    "a": "charliecalvert",
    "d": "Twitter Bootstrap Github twbs/bootstrap",
    "n": "",
    "u": "https://github.com/twbs/bootstrap",
    "t": [
        "bootstrap",
        "html",
        "css",
        "javascript"
    ],
    "dt": "2015-10-04T03:12:48Z"
}
```

You do not have to create the second hyperlink. In fact, I would do it only if you want a little extra credit. Don't, however, make your pursuit of the second hyperlink spoil your chances of just completing the assignment correctly.

## Step Seven: Create Your own Delicious Links {#delicious-account}

Ceate our own delicious account and query them. Provide radiobuttons for switching between your account and my account.

##Turn It In

Be sure your work is in your repository in a folder called **Week03-BootstrapDelicious**. Include the URL of your repository when you submit the assignment. You might also make a note of the folder in which your project resides. This might help you remember to put it in exactly the right folder.

## Hint

To get you started, I'll show you a halfway step that displays just a single url in the viewer. But remember, I want you to show not in the viewer, but in an unordered list. We've done that before.

```javascript
success: function(data) {
    $.each(data, function(index, deliciousLink) {
        var url = deliciousLink.u + '<br />';
        $('#viewer').append(url);
    })
    $('#viewer').html(JSON.stringify(data, null, 4));
}
```

### Deugger Hints

**NOTE**: *Inspired by Brian*

* Open the Developer Tools with F12. Go to the source tab
* On the left, expand the doo-hickey and click on **javascripts/control.js**
* Click in the gutter on the left to set a breakpoint in the body of the **success** method found in the call to **$.ajax**. It might look like this:

```javascript
$('#viewer').html(JSON.stringify(data, null, 4));
```

On the right side, select the **watch **section and add the following watch expression

*   data[0].u
*   This selects the u (url) property of the first element in the data array.

Now let's trigger the breakpoint. Use the program's interface:

* To enter **javascript** in the input box
* Select the **Delicious** button
* Your watch express **data[0].u** should now be set to the URL of the first object in the array returned from the server.

Take the time to explore the other features of the debugger such as the **locals** where you can open up the **data** array and explore its contents.

## Suppress Form Submit

It is unlikely you will need this in our code since we do not have a form. Nevertheless, it is perhaps worth mentioning that if you have a form, and want to suppress or customize the default handling of the said form, then do something like this in **document ready**:

```javascript
$("#target").submit(function(event) {
    event.preventDefault();
    var userFormData = $(this).serialize();
    $('#formResults').html(userFormData);
});
```

For now, however, we are ensuring that even if we had a form, our button does not trigger form submit by setting the button **type** to **button**:

```jade
button.btn.btn-primary(type="button", onclick="delicious()") Search Delicious
```
