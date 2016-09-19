## JavaScript Basic Types

Please note that there are three parts to this assignment. I list them
all below, each in its own section.

## Basic Types

- Read in an arbitrary JSON file containing a JavaScript object
- Use a loop to iterate over the property and report the types
- Basic: Just use node and console.log to report results
- Advanced: Use HTML, jQuery and Ajax to report results  on web page

Code to read in a JSON file can be found here:

- <http://elvenware.com/charlie/development/web/JavaScript/JsonBasics.html>

Your next step will be able to iterate over the members of that
object with a for loop.  

Given a JSON object that looks like this:

```javascript
{
    "a": 25,
    "b": 12,
    "bar": "Fine",
    "Foo": false
}
```

The program should be able to use a **for in** loop to iterate over
the object that you created when you read in your JSON file. With a
single line in your **for in** loop you should be able to dynamically
create output that looks like this:

```javascript
a : number
b : number
bar : string
Foo : boolean
```

I emphasize "single line" because it is possible to dynimacally
discover both the name of the property and its value. Remember that
there are two ways to access the properties of a JavaScript object:

```javascript
myObject.myProperty
myObject["myProperty"]
```

For more information see this link:

- [Elvenware on name/value paris](http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#object-details)

In this assignment, one of these two techniques will prove invaluable.

A key point to grasp is that we use **for in** loops to iterate over
objects, and we use a classic **for** loop to iterate over arrays. By
a "classic for loop" I mean something that looks like this:

```javascript
for (var i = 0; i < 2; i++) {
}
```

A **for in** loop looks like this:

```javascript
for (aProperty in someObject) {
}
```

Use the first technique with arrays, the second with objects.

This secondary source of information might also be of interest:

- <http://elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#getJSON>

When you read in the JSON file using the fs library, you will end
up with a string. You need to convert the string into an JavaScript object
using JSON.parse:

```javascript
var myObjectAsAString = fs.readFileSync('MyFile.json');
var myJavaScriptObject = JSON.parse(myObjectAsAString);
```
