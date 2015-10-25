#Callbacks

Learn about JavaScripts callbacks. We will cover this in class on Thursday, so you can wait until then to do it, if you wish.

* [Callbacks Deck](http://bit.ly/elf-callbacks)
* [Callbacks on Elvenware][elven-callbacks]

[elven-callbacks]:http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptFunctions.html#callbacks-passing-functions-as-parameters

## Step01: Create an Express Project {#create} 

Create an Express project called **Week02-Callbacks**.

```
    express Week02-Callbacks
    cd Week02-Callbacks
    npm install
```

## Step02: Bower  and jQuery {#bower}

Either Create or Copy a **bower.json** file. Here is how to copy it:

```
    cp $ELF_TEMPLATES/bower.json .    
``` 

Alternatively, here is how to create it using an interactive utility:

```
    bower init
```

And then copy in our **.bowerrc** file so the components are installed in the **public** directory:

```
cp $ELF_TEMPLATES/.bowerrc .
```

Now install jQuery:

```
bower install jquery --save
```

## Step03: Create a Custom JavaScript file {#custom-js} 

Open your project in WebStorm or your IDE/editor of choice.

* Edit **bin/www** and set the port to **30025**
* Edit **package.json** to your project uses **nodemon** instead of **node** to start your project 

Choose **File | New | JavaScript File**. Add a JavaScript file called **callbacks.js** and place it in the **public/javascripts**. 

## Step04: Link in your Custom File {#link}

In **views/layout.jade**, use a script statement to link jQuery and your custom file into your project.

```
script(src='components/jquery/dist/jquery.min.js')
script(src='javascripts/callbacks.js')
```

From the command line, run the project, load it into Chrome, open the Developer Tools with F12, confirm that both **jquery** and **callbacks.js** are loading properly.
 
## Step05: Setup Display Controls {#display-controls}

Edit **views/index.jade** to that it contains an empty list object.

```
    ul#myList
```

This jade code produces the following HTML:

```
    <ul id="myList"> </ul>
```

In **Callbacks.js** create a simple function that uses jquery to display information to the user:

```
function showMessage(message) {
    $("#myList").append("<li>" + message + "</li>");
}
```

The above code appends a list item to our HTML list.

* [jquery Append][jq-append]
* [Append on StackOverflow][so-append] 
* [Append on Google search][gs-append]

Prove that it works by appending this code to the bottom of your custom JavaScript file:

```
$(document).ready(function() {    
    showMessage("We can display messages.");
});
```

The **jquery** function called [document ready][doc-ready] will be called when your HTML page has loaded. It is similar to the built in JavaScript function called **window.onload**, but it can be called multiple times.

In Chrome/Chromium, press F5 to refresh the page. You should see our message displayed on the main page of your web app.

Alternatively, you can use a captioned **showMessage** function:

```javascript
function showCaptionMessage(caption, message) {
    $("#myList").append("<li><strong>" + caption + "</strong>: " + message + "</li>");
}
```

Use it like this:

```javascript
showCaptionMessage("Caption", "We can display messages with captions");
```

[jq-append]:http://api.jquery.com/append/
[so-append]: http://stackoverflow.com/questions/1145208/jquery-how-to-add-li-in-an-existing-ul
[gs-append]:https://www.google.com/search?q=jquery+list+append
[doc-ready]:https://learn.jquery.com/using-jquery-core/document-ready/


## Step06: Create and Exercise Callbacks {#exercise-callbacks}

create a function named **callbackHandler** that takes three parameters. The first parameter is a callback (that is, a function), the other two parameters are integers.

Now call the **callbackHandler** function three times:

1. First pass a function that adds the second and third parameters. (plus operator)
- Pass in a function that subtracts the second and third parameters. (minus operator)
- Pass in a function that returns the remainder from dividing two numbers (modulus operator)

JavaScript doesn't care whether you pass in or use a parameter. To see this in action:

- Pass in a function called **getNine** that returns the number 9 and displays it in the list.
- Pass in a function called **milesToFeet** that converts the first parameter from miles to feet and display the result in the list.

Even though the above code works, create two more callbackHandlers, one for functions that take one parameter and one for functions that take zero parameters. Call them:

* zeroParamCallbackHandler
* oneParamCallbackHandler

Pass in **getNine** to **zeroParamCallbackHandler** and **milesToFeet** to **oneParamCallbackHandler** 

To get you started, I'll show how to complete the first step shown above.

```
function callbackHandler(func, a, b) {
    return func(a, b);
}

function add(a, b) {
    return a + b;
}

$(document).ready(function() {    
    showMessage("We can display messages.");
    var addResult = callbackHandler(add, 2, 3);
    showMessage(addResult);
});
```

Note that the result of the call to the **callbackHandler** is displayed to the user by our jQuery based **showMessage** function.

## Step Seven: Debugger {#show-debug}

Step through the code in the Chrome debugger.

* In Chrome, make sure the developer tools are open. (Press F12)
* Turn to the **Sources** page.
* Select the **callbacks.js** file from the **javascripts folder**
* Put a breakpoint on the sole line in the **callBackHandler** function. To create the breakpoint, click in the gutter to the left of the line. 
* Run your code to the breakpoint as it appears when the **add** function is passed in. To simplify this process, pass in add first, as in the example above. Then the first time the breakpoint is hit the the parameter called **func** with hold the **add** function.
* Take a screenshot. It should show the values of a and b, which should be set to 2 and 3.
* Attach the screen shot to your assignment when you turn it in.

## Turn it in

Be sure you have placed your work in your git folder under the name **Week02-Callbacks**. Submit the URL of your repository, or optionally provide a link to your folder inside your Git project.

Don't forget to attach your screenshot to your assignment.

**NOTE**: *When naming your folder, small things like casing and dashes rather than underscores matter. Remember, I'm grading multiple assignments, and I want to automate the process as best I can. This means I need to know the exact name of your folder, which I specify above.*

## Hint

Here is a script to set up a project of this type from scratch:

```
express Week02-Callbacks
cd Week02-Callbacks
npm install
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
sed -i -- 's/3000/30025/g' bin/www
sed -i -- 's/node\s/nodemon /g' package.json
``` 

Here is a more complete script that allows you to pass in the name of the file you want to create:

```
#!/bin/bash

express $1
cd $1
npm install
cp $ELF_TEMPLATES/bower.json .
cp $ELF_TEMPLATES/.bowerrc .
bower install bootstrap --save
sed -i -- 's/3000/30025/g' bin/www
sed -i -- 's/node\s/nodemon /g' package.json
```

This script is maintained in **JsObjects/Utilities/DeveloperUtilities**.

