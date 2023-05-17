---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Json/ConvertJsonToFieldDefinitions.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Json
fileName: ConvertJsonToFieldDefinitions.md
relativePath: /Json/ConvertJsonToFieldDefinitions.md
title: ConvertJsonToFieldDefinitions
directoryName: Json
category : json-guide
---

# Convert JSON to Field Definitions

This program can, and probably should, be written in ES5. Put in a directory called **git-convert** that is part of the **GitExplorer** project. In short, you will have three directories in the root of the project:

- client
- git-convert
- server

The goal is to convert the **git-user.json** file that we get from GitHub into one of our **field-definitions**.

## Get Copy of JSON

First, get the JSON:

```bash
curl https://api.github.com/users/charliecalvert > git-user.json
```

The file 'git-user.json' contains the JSON you will be working with. You will need to load this with **fs.readFile**, as described below.

## Debug Logger

If at all possible, use the [debug][debug-npm] package for logging. You will run **npm init** to create **package.json** and then add the **debug** module to it:

```bash
npm install debug --save
```

And in your code:

```javascript
var debug = require('debug')('git-convert');
debug('this is a test');
```

At the command line, say that you want to see debug messages for **git-convert**. To do so, type the following into the bash shell where you are currently working:

```bash
export DEBUG='git-convert'
```

Now run your program and you should see: **git-convert this is a test +Xms**

Now at the command line turn logging off:

```bash
export DEBUG=
```

The command shown above sets DEBUG to an empty string, which makes our logging statements go away. You can achieve the same effect by setting DEBUG to anything but **git-convert**.

Except at the very end, to output your final result, don't use **console.log**. Instead, use the debug module in at least 3 places.

You can read more here, but for now you need go no further than example shown above. You need not turn on any special features.:

- [DEBUG on NPM][debug-npm]

I'll accept your assignment with **console.log** instead of **debug**, but it will cost 3 points.

[debug-npm]: https://www.npmjs.com/package/debug

## Promises

If at all possible, use a [promise][pr] when reading the JSON file you created with your call to **curl**:

```javascript
var fs=require("fs");

function readFile(fileName) {
    return new Promise(function(resolve, reject) {
        fs.readFile( /*YOUR CODE HERE*/ );
    });
}

readFile('git-user.json').then(function(text) {
    // CODE OMITTED. This is where you solve the core of the assignment.
});       
```

**NOTE**: _You can learn about promises [here](https://youtu.be/nWV4Ed2gckk), [here][pr] and [here][prc]._

I'll accept it without the promise, but it will cost 3 points. In other words, if you just call **fs.readFile** with a callback instead of **.then** chained method, that will be okay, sort of.


## Create output

You will need to iterate over the contents of the GitHub JSON file you load from disk. Remember that you are reading a text file, and JSON is an object, not a string. So you will have to do some conversion.

Then you will need to iterate over your JSON. In ES5, this is an appropriate way to get started:

```javascript
for (var property in json) {
    if (json.hasOwnProperty(property)) {
      // YOUR WORK HERE
    }
}
console.log( /* LOG YOUR ARRAY OF OBJECTS */)
```

You'll need an array. I call mine gitUser:

```javascript
const gitUser = [];
```

I then iterate over the JSON returned from GitHub using [for..in][es6fi]. In the process, I
create some objects, each shaped like one entry in our **field-definitions** file, an example of which is shown below. As we create each object, we **push** the object into the array.

Print the output to the console:

```javascript
console.log('export default ' + JSON.stringify(gitUser, null, 4));
```

Sample output might look something like this. Make sure it is valid JavaScript:

```javascript
export default [
    {
        "id": "login",
        "label": "login-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "id",
        "label": "id-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    {
        "id": "avatar_url",
        "label": "avatar_url-name",
        "type": "paragraph",
        "sample": "login-unknown"
    },
    // ETC ...
]
```

## Why output text

Why do I have the program output text? Because this is the Linux way of doing things.

```bash
node git-convert > 'field-definitions.js'
```

All I really care about at this time is that you create the proper set of fields, as shown above.

## Turn it in

The minimum is to create a valid field definitions file.

## Extra Credit

For extra credit, I want to be able to pull your project, navigate to the **GitExplorer** folder, and then run the following command:

```bash
./create-field-definitions
```

I will expect to see the **field-definitions.js** copied into the **src** or **src/assets** directory of your **client**.

Also, allow me to run the script via NPM:

```bash
npm run create-field-definitions
```

For instance, a run might look a little like this:

```bash
$ npm run create-field-definitions

> lookup-server@0.0.1 create-field-definitions /home/charlie/Git/isit322-calvert-2017/GitExplorer
> ./create-field-definitions

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1457  100  1457    0     0   5377      0 --:--:-- --:--:-- --:--:--  5396
field-definitions.js 30ms
git-convert.js 26ms
---=======================================---
	Created field-definitions.js
---=======================================---
'git-convert/field-definitions.js' -> 'client/src/assets/./field-definitions.js'
```

Here is some of the **scripts** section from **package.json**:

```javascript
"scripts": {
    // CODE OMITTED HERE
    "lint": "eslint .",
    "create-field-definitions": "./create-field-definitions"
  },
```

This is the line that allows me to run the **create-field-definitions** script with NPM:

```javascript
"create-field-definitions": "./create-field-definitions"
```
## Scripts

Here is the **git-convert/run-all** script:

```bash
#!/usr/bin/env bash

function drawLine() {
    echo -e "---=======================================---"
}

if [ ! -f "$HOME/npm/bin/jsonlint" ]; then
    drawLine
    echo -e "Please install jsonlint: npm install -g jsonlint"
    drawLine
    exit
fi

curl https://api.github.com/users/charliecalvert > git-user.json
node git-convert.js > field-definitions.js
./prettier

drawLine
echo -e "\tCreated field-definitions.js"
drawLine
```

The **prettier** script is described in the [eslint][eslp] assignment.

Here is the **create-field-definitions** script:

```bash
#!/usr/bin/env bash

GIT_CONVERT=git-convert

cd $GIT_CONVERT
./run-all
cd ..
cp -v $GIT_CONVERT/field-definitions.js client/src/assets/.
```


[es6fi]: https://docs.google.com/presentation/d/1G9plS2DRlSmulapF57vimdXYaTzvbfFAra4sSv42q9s/edit#slide=id.g38903caa5f_0_32

[eslp]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactEsLint.html#prettier

[prc]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[pr]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
