#Callbacks

Learn about JavaScripts callbacks.

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

Here is how to create it:

```
    bower init
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
script(src='javascripts/callbacks.js)
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

[jq-append]:http://api.jquery.com/append/
[so-append]: http://stackoverflow.com/questions/1145208/jquery-how-to-add-li-in-an-existing-ul
[gs-append]:https://www.google.com/search?q=jquery+list+append
[doc-ready]:https://learn.jquery.com/using-jquery-core/document-ready/


## Step06: Create and Exercise Callbacks {#exercise-callbacks}

create a function named **callbackHandler** that takes three parameters. The first parameter is a callback (that is, a function), the other two parameters are integers.

Now call the **callbackHandler** function three times:

1. First pass a function that adds the second and third parameters. (plus operator)
- Pass in a function that subtracts the second and third parameters. (minus operator)
- Pass a function that returns the remainder from dividing two numbers (modulus operator)

JavaScript doesn't care whether you pass in or use a parameter. To see this in action:

- Pass in a function that returns the number 9
- Pass a function that converts the second parameter from miles to feet

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

## Turn it in

Be sure you have placed your work in your git folder under the name **Week02-Callbacks**. Submit the URL of your repository, or optionally provide a link to your folder inside your Git project.

**NOTE**: *When naming your folder, small things like casing and dashes rather than underscores matter. Remember, I'm grading multiple assignments, and I want to automate the process as best I can. This means I need to know the exact name of your folder, which I specify above.*



