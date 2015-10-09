# Bootstrap Delicious File

We'll work on this assignment in class on Tuesday, Oct 6, 2015.

Bootstrap allows you to create projects with CSS that looks good on a PC, a tablet or a phone.

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

```
sed -i -- 's/3000/30025/g' bin/www
```

Replace **node** with **nodemon** in **package.json**:

```
sed -i -- 's/node\s/nodemon /g' package.json
```

Get the **favicon**:

```
cp ~/Git/JsObjects/Data/MongoLab03/favicon.png public/.
```

Change the title:

```
sed -i -- 's/Express/BootstrapDelicious/g' routes/index.js
```

Create control.js and use add strict:

```
echo -e "\$(document).ready(function() { 'use strict'; \n});" >> public/javascripts/control.js
sed -i "s/{$/{ 'use strict';/" routes/index.js
sed -i "s/{$/{ 'use strict';/" routes/users.js
sed -i "s/next) {/next) { 'use strict';/" app.js
```

This part of your work is done now, but as an fyi, this is how it looks if you put it all together:

```
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

```
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

```
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

```
button(onclick="delicious()") Delicous

div.panel.panel-default
    div.panel-heading Text Input
    div.panel-body
        div.form-group
            label(for='subject') Subject
            input#subject.form-control(type='text', placeholder="subject")
	div
		pre#viewer
````

## Step Four: Query Delicious {#query-delicious}

Make sure a file called **control.js** is in the **public/javascripts** directory. It should have been created by our **CreateExpressProject** script back in Step One.

We will, however, have to use the **script** tag to link **control.js** into our app from **layout.jade**.

Place the following code inside **control.js**:


```
function callDelicious(subject) { 'use strict';
    var delicious = 'http://feeds.delicious.com/v2/json/charliecalvert/' + subject;
    $.ajax(
        {
            url: delicious,
            dataType: 'jsonp',
            success: function(data) {
                $('#viewer').html(JSON.stringify(data, null, 4));
            }
    });
}

function delicious() { 'use strict';
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

```
url: 'http://feeds.delicious.com/v2/json/charliecalvert/javascript'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/nodejs'
url: 'http://feeds.delicious.com/v2/json/charliecalvert/bootstrap'
```

Provide three checkboxes with the same labels.

If the user selects one or more of them, they see delicious links for multiple items for instance, both **javascript** and **nodejs**. For instance, if they select **javascript** and **node**, ensure they see all the links that use both javascript and node from the Delicious site. This is the interesction, not the combined scripts.

Below is an example interface. The three buttons labelled JavaScript, Bootstrap and Node can be replaced with ordinary radio buttons. The large gray area near the bottom is a a PRE tag inside a DIV:

```
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

## Step Six: Create Your own Delicious Links {#delicious-account}

Ceate our own delicious account and query them. Provide radiobuttons for switching between your account and my account.

##Turn It In

Be sure your work is in your repository in a folder called **Week03-BootstrapDelicious**. Include the URL of your repository when you submit the assignment. You might also make a note of the folder in which your project resides. This might help you remember to put it in exactly the right folder.

## Hint

To get you started, I'll show you a halfway step that displays just a single url in the viewer. But remember, I want you to show not in the viewer, but in an unordered list. We've done that before.

```javascript
success: function(data) {
    $.each(data, function(index, obj) {
        var url = obj.u + '<br />';
        $('#viewer').append(url);
    })
    // $('#viewer').html(JSON.stringify(data, null, 4));
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
