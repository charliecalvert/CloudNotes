#Callbacks

Create an Express project called **Week10-Callbacks**. Add a JavaScript file called **Callbacks.js** and place it in the **public/javascripts**. Link that file into your project.

In **Callbacks.js** create a function named **callbackHandler** that takes three parameters. The first parameter is
a callback (that is, a function), the other two parameters are integers.

Now call the **callbackHandler** function three times:

- First pass a function that adds the second and third parameters.
- Pass a function that returns the remainder from dividing two numbers (modulus operator)
- Pass a function that converts the second parameter from miles to feet

To install jQuery:

    bower install jquery --save
    
Make sure you load them:

```
doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width')
    title= title
    block css
      link(rel='stylesheet', href='/css/style.css')
    block js
      script(src='components/jquery/dist/jquery.js')
      script(src='js/Callbacks.js')
      script(src='http://localhost:35729/livereload.js')
  body
    block content
```    

Show Message: 

```
function showMessage(message) {
    $("#myList").append("<li>" + message + "</li>");
}
```

Get JSON:

```
function callRoute() {
    showMessage('callRoute was called');
    $.getJSON('/getNine', function(json) {
       showMessage(JSON.stringify(json));
        showMessage(json.result);
    });
}
```

Callback:

```
function callbackHandler(func, a, b) {
    return func(a, b);
}
```

The **callbackHandler** function that you create should use jQuery to display the results of your function calls. Use
a list to display the result:

The HTML:

    <ul id="myList"> </ul>

In Jade, that would be:

    ul#myList

The JavaScript to display the result of your function calls:

    $("#myList").append("<li>" + result + "</li>");

## Turn it in

Place it in your git folder under the name Week10-Callbacks. Provide a link to your folder.

## Links

The following links should help you complete this assignment.

- [JsObjects Callback Demos](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Functions)
- [JsObjects Function This](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Functions)
- [Week02 Notes](http://elvenware.com/charlie/books/CloudNotes/Prog282/Week02.html)
- [http://bit.ly/FunctionalJavascript](http://bit.ly/FunctionalJavascript)


