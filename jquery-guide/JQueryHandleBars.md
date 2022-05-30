## jQuery and Handlebars

You will find that you often want to insert the same HTML text or code
into multiple HTML files. Another common need is to compose HTML files
out of multiple chunks of HTML.

Templating the term used to describe this kind of operation. In general
one starts with a single HTML file that has markers in it. A templating
library is used to replace the markers in the main HTML file with
various bits of text or code.

You have probably done something like this in another programming
language. For instance, C# programmers often write code that looks
something like this:

string data = string.Format("{0} + {1} = {2}", 1, 2, 3);

The code above sets the variable data to the string "1 + 2 = 3". The
code has two parts, the placeholders ({0}) and the parameters (1, 2, 3).

An HTML templating libraries work on the same principle. You put
markers or placeholders in your HTML, and then run code that
replaces the markers with designated bits of HTML or text. For instance
you might put some HTML that looks like this in your main HTML file:

```html
 <li><a href="{{url}}">{{text}}</a></li>
```

In the code shown above, both {{url}} and {{text}} are placeholders.
You would then write code that would substitute text of HTML for the
placeholders in the above code. I will give you examples of that code
later in this document.

Consider the following code:

```javascript
var addTable = function(fileName, tableName) {
      var mainFile = readHtml(fileName);
      var table = readHtml(tableName);

      var template = handlebars.compile(mainFile);

      var result = template({
          MyTable : table
      });

      return result;
};
```

The code shown above does the following:

- It reads an html file with placeholders in it
- It reads some html fragments that can be plugged into the placeholders
- It compiles the original HTML file read in Step 1
- It inserts the fragments from step 2 into the placeholders found in the HTML document from Step 1
- It returns the completed HTML document, which is now made up of the origainl HTML document, plus the inserted fragments.

Suppose this were the original documents:

```html
<p>This is a placeholder: {{{placeholder}}}</p>
```

Suppose this were the fragment:

```html
<strong>foo</strong>
```

The completed (templated) document would look like this:

```html
<p>This is a placeholder: <strong>foo</strong></p>
```

The original document with its placeholder has been combined with the
fragment to create a complete document.

Templating is a very common technique in the world of HTML development.
There are dozens of templating libraries available. At least five or
six of them are widely used.

We will be using a library called Handlebars. You can include
Handlebars.js in your web applications, or you can use NPM to download
it as a library for inclusion in node applications.

Here is the HTML

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>jQuery and HandleBars example</title>   
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />   
        <script src='http://code.jquery.com/jquery.js'></script>
        <script src="handlebars.js"></script>
        <script src="index.js"> </script>      
    </head>
    <body>
        <script type="text/x-handlebars-template" id="list-item">
            <li><a href="{{url}}">{{text}}</a></li>
        </script>
        <ul id="myList"> </ul>   
    </body>
</html>
```

Here is the JavaScript:

```javascript
/**
 * @author Charlie Calvert
 */
/*jshint jquery:true, browser: true */
/*global Handlebars: false */
function addItem(url, text) {
    'use strict';
    var script = $("#list-item").html(),    
    template=Handlebars.compile(script);    
    var result = template({
        text: text,
        url: url
    });    
    $("#myList").append(result);
}
$(document).ready(function() {
  "use strict";
  addItem("http://www.elvenware.com", "Elvenware");
});
```
