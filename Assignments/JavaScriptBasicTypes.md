## JavaScript Basic Types

Please note that there are three parts to this assignment. I list them
all below, each in its own section.

For this assignment, do your work in a folder called **Week0X-BasicTypes**. Depending on the solution you provide, you can either have a single file called **work.js** in the folder, or a complete Express program if you want to show the results in a browser.

**NOTE**: _This program usually appears in Week02 of a course, so the file name should be Week02-BasicTypes. But use common sense when naming the folder._

## Basic Types

- Read in an arbitrary JSON file containing a JavaScript object
- Use a loop to iterate over the property and report the types
- Basic: Just use node and console.log to report results
- Advanced: Use HTML, jQuery and Ajax to report results  on web page

Code to read in a JSON file can be found here:

- [Reading JSON with Node][elf-read-json-node]
- <http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#hello-express>

[elf-read-json-node]: http://elvenware.com/charlie/development/web/JavaScript/JsonBasics.html#reading-json-with-node

## Iterate

Your next step will be able to iterate over the members of that object with a for loop. You will want to discover the key-value pairs in the object and write out the type of the value. Recall that you can discover the type of an object with the **typeof** operator:

- [Elvenware on typeof][elf-type-of-operator]
- [MDN on typeof][type-of-operator]

Given a JSON object that looks like this:

```javascript
{
    "a": 25,
    "b": 12,
    "bar": "Fine",
    "Foo": false
}
```

The program should be able to use a **for in** loop to iterate over the object that you created when you read in your JSON file. With a single line in your **for in** loop you should be able to dynamically create output that looks like this:

```javascript
a : number
b : number
bar : string
Foo : boolean
```

I emphasize "single line" because it is possible to dynamically discover both the name of the property and its value. In other words, given an arbitrary JavaScript object, you should be able to discover both halves of all the key-value pairs that it contains. You can discover both the key, and its associated value.

Remember that there are two ways to access the properties of a JavaScript object:

```javascript
var x = myObject.myProperty;
var y = myObject["myProperty"];
```
For more information see this link:

- [Elvenware JavaScript Objects Property Introduction][elf-prop-info]
- [Elvenware JavaScript Objects Properties][elf-properties]

[elf-prop-intro]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#propIntro
[elf-properties]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#properties
[elf-type-of-operator]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptBasics.html#javaScriptSimpleTypes
[type-of-operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof

In this assignment, one of these two techniques will prove invaluable.

## Looping in JavaScript {#javascript-loop}

A key point to grasp is that we use **for in** loops to iterate over objects, and we use a classic **for** loop to iterate over arrays. By a "classic for loop" I mean something that looks like this:

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

## Turn it in

Make sure your program passes GruntCheck, and then turn it in the usual way by placing it in an appropriately named folder of your repository. Don't forget to submit your assignment so I know you are ready to have me go look for your code.
