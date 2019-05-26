## Overview

Sometimes we need to wait for an asynchronous call to return. Traditionally, JavaScript has handled this with callbacks. However, modern JavaScript uses [Promises][pmdn] (and also async await) to handle this.

A **Promise** takes a function with two parameters:

- resolve: Function to use to return a value on success
- reject: A function to use to return a value on failure


## Get Started

Be sure you first pull from JsObjects.

Create a folder called **week08-promises** and copy the code from this directory into it:

    ~/Git/JsObjects/JavaScript/EcmaScript6/PromiseSimple

## Simplest

Consider this code which outputs the value 3:

```javascript
const myPromise = new Promise((resolve, reject) => {
    resolve(3);
});

myPromise
  .then((result) => console.log(result));
```

This is the simplest possible promise that I can come up with. It differs from most promises in that it does not contain an asynchronous call. Note that:

- We create a promise with **new**
- It is passed by the runtime two functions called **resolve** and **reject**. In this case we don't use **reject** but we do use **resolve** to return a value.
- We call the promise and use the runtime **then** function to print out the result sent by our promise.
  - Again, **then** is built into the JavaScript implementation of Promises. We don't have to define it any more than we have to define or pass **resolve** and **reject** in the implmentation of our Promise.
  - Note that the value we resolve is passed as a parameter to **then**.


## Moderate Difficulty

Consider this code which again contains no asynchronous call but which uses both **resolve** and **reject**:

```JavaScript
const addNumbers = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a && b) {
            resolve(a + b);
        } else {
            reject('Parameter missing');
        }
    });
};

addNumbers(2, 3)
    .then(result => console.log(result));

addNumbers(2)
    .then(result => console.log(result))
    .catch(error => console.log(error));
```

Here we:

- Define a function called **addNumbers** that takes two parameters that are to be added together.
- The function returns a Promise declared as in the previous example with **resolve** and **reject**.
- If the user passes in both parameters, we add them together and return them with **resolve**.
- Otherwise, we reject the call presumably because there are too few parameters. (I don't cover the case where the user passes in something other than numbers.)

There are two calls to **addNumbers**.

- In the first we show what happens when we pass in valid input. The two parameters and added together and 5 is printed to the console.
- In the second we proide a catch function to handle errors. In this case it will print "Parameter missing" because we passed in only one parameter.

## Write File

Here is a case where we use the NodeJs fs (File System) API to write the word **foo** to a file called **foo.txt**:

```javascript
const fs = require('fs');

const elfWriteFile = (fileName, contents) => {
    return new Promise(function(resolve, reject) {
        fs.writeFile(fileName, contents, 'utf8', (err) => {
            if (err) {
                reject(err);
            }
            resolve({
                result: 'success'
            });
        });
    });
};

elfWriteFile('foo.txt', 'foo')
    .then(result => console.log(result));
```

Here we:

- Create a method called **elfWriteFile** that returns a promise
- **elfWriteFile** takes two parameters:
  - The name of a file
  - The contents to be written into the file
- Inside our promise we call the Node Js builtin **fs.writeFile** function.
  - When making the call we use both parameters passed to **elfWriteFile**
  - Note that we also specify the file type (utf8). We also do this when reading a file.
  - Note that the fourth parameter to **writeFile**, the one that begins with (err) is a callback function.
- If the JavaScript run time is unable to write the file to disk it returns an error and we reject the Promise.
- If the file is successfully written to disk we return a small object literal with a single key value pair set to result and success.

We call **elfWriteFile** with a file name and a small bit of text to be written to the file. You can, of course, pass in large strings in the second parameter.

## Turn it in

Add a fourth Promise example. Wrap the Promise in a function called **elfReadFile**. It should use the asynchronous **fs.readFile** function to read the contents of **foo.txt** and it should then print it out. Don't forget the **utf8** parameter!

The docs for the Node Js **fs** module are [here](https://nodejs.org/api/fs.html).

## Convert String to Object

When you call **js.readFile**, the thing you get back is a string. But you want to use an object. In other words, because address-list.json contains JSON, we are tempted to expected the JSON in the file to be returned as an object, not a string. But that is not what you get. Regardless of the contents of the file, by default **js.readFile** returns a string. So you need to translate the string you get from **js.readFile** into a JavaScript object. Do it like this:

<pre>JSON.parse(resultFromCallingReadfile);</pre>

Here we call **JSON.parse** on the string returned by our call to **fs.readFile**.

**NOTE**: _It is probably best that the thing resolved from **readfile** just be the string itself rather than object literal. Don't do this: **resolve({result: data})**. Instead, do this **resolve(data)**. Here data is the string passed to you in the callback of your Promise._

It is perhaps best to call **JSON.parse** just before, or while, you are calling **response.send**.

Here is a reference:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

[pmdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
