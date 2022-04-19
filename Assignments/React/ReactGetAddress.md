---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactGetAddress.md
relativePath: Assignments/React/ReactGetAddress.md
title: ReactGetAddress
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactGetAddress.md
fileNameHTML: ReactGetAddress.html
---


<!-- toc -->
<!-- tocstop -->

# React Get Address

We should:

- Download a set of adddress from the website govtrack.us. The address are in JSON format.
- Create a program that generates about 100 addresses based on the JSON you downloaded.
- Discover how to use the addresses in **CongressAddress**. In particular, use these addresses to update **address-list.js** and/or **address-list.json**.
- Turn in the program, with code that shows your ability to use the addresses in **CongressAddress**.

Do your work in a folder in the root of your project call **GetAddress**.

## Get the Addresses

```
curl https://www.govtrack.us/api/v2/role?current=true > govtrack-address.json
```

Study **govtrack-address.json** until it makes sense.

## Install Debug

If you have not done so already, enter the following code to install the frequently used **debug** package:

  npm install --save debug

Read about it here:

- [debug on npm](https://www.npmjs.com/package/debug)  

If you get this error: **Error: Cannot find module 'debug'** then that probably means you skipped this step and install **debug** with npm as shown above.

## Write Utility

Create a **package.json** file:

    npm init

Then just follow the prompts.    

Then in **get-address.js**:

```javascript
const fs=require("fs");
const debug = require('debug')('get-address');

debug('Testing debug');

function readFile(fileName, callback) {
    'use strict';

    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, 'utf8', function(err, fileContents) {
            if (err) {
                reject(err);
            }
            resolve({
                'result': fileContents
            });
        });
    });
}

function getAddress(value, char) {
    'use strict';
    return value.substring(0, value.lastIndexOf(char) -1);
}

function getZip(value, char) {
    'use strict';
    // YOU WRITE IT
    // ITS THE SAME SINGLE CALL AS GET ADDRESS, BUT INDEXES ARE DIFFERENT
    // UNCOMMENT NEXT LINE AND MODIFY IT
    // return value.substring(WHAT GOES HERE?, WHAT GOES HERE?);
}

function getCity(value, char, len) {
    'use strict';
    const start = value.lastIndexOf(char);
    return value.substring(start, start + len);
}

function writeIt(label, value, noComma) {
    const comma = noComma ? '"' : '",';
    console.log('\t\t' + '"' + label + '": ' + '"' + value + comma);
};

readFile('govtrack-address.json')
    .then(function(objectReturned) {
        debug('We don\'t get a string back but an: ', typeof objectReturned);
        debug('The object has a property:', Object.keys(objectReturned));
        debug('The type of the property is:', typeof objectReturned.result);

        var json = JSON.parse(objectReturned.result);
        debug('We were able to parse the JSON.');
        debug('Total records returned:', json.meta.limit);
        debug('First person found', JSON.stringify(json.objects[0].person.name));
        const jsonLength = json.objects.length;
        for (var i = 0; i < jsonLength; i++) {
            const open = (i === 0) ? '[\n\t{' : '\t{';
            console.log(open);
            writeIt('firstName', json.objects[i].person.firstname);
            writeIt('lastName', json.objects[i].person.lastname);
            writeIt('street', getAddress(json.objects[i].extra.address, 'W'));
            writeIt('city', getCity(json.objects[i].extra.address, 'W', 13));
            writeIt('state', json.objects[i].state);
            writeIt('zip', getZip(json.objects[i].extra.address, ' '));
            writeIt('phone', json.objects[i].phone);
            writeIt('website', json.objects[i].website);
            writeIt('email', '');
            writeIt('contact', json.objects[i].extra.contact_form || '', true);
            const close = i < jsonLength - 1 ? '\t},' : '\t}\n]';
            console.log(close);
        }
        debug('all done');
    })
    .catch(function(e) {
        console.log(e);
    });
```

Note that you won't see the debug unless you first execute this line at the bash prompt:

  export DEBUG='get-address'

Then you can run the program:

  node get-address

At the start of the main method I point out that we get an object rather than a string back. That is as expected, but you need to be aware of that fact. In the debug statement I'm trying to draw your attention to this issue.

The line that says "We were able to parse the JSON" is valid because **JSON.parse** would blow up if it failed, causing the catch block at the end of code to be triggered. In other words, if we could not parse the JSON, then this line would never be reached:

```javascript
debug('We were able to parse the JSON.');
```

If we did get that far, then the odds are that we could parse the JSON.

Some example output:

```javascript
{
	firstName: "Lamar",
	lastName: "Alexander",
	street: "455 Dirksen Senate Office Building",
	city: "Washington DC",
	state: "TN",
	zip: " 20510",
	phone: "202-224-4944",
	website: "https://www.alexander.senate.gov/public",
	email: "",
	contact: "http://www.alexander.senate.gov/public/index.cfm?p=Email"
},
{
	firstName: "Roger",
	lastName: "Wicker",
	street: "555 Dirksen Senate Office Building",
	city: "Washington DC",
	state: "MS",
	zip: " 20510",
	phone: "202-224-6253",
	website: "https://www.wicker.senate.gov",
	email: "",
	contact: "https://www.wicker.senate.gov/public/index.cfm/contact"
},
{
	firstName: "Timothy",
	lastName: "Kaine",
	street: "231 Russell Senate Office Building",
	city: "Washington DC",
	state: "VA",
	zip: " 20510",
	phone: "202-224-4024",
	website: "https://www.kaine.senate.gov",
	email: "",
	contact: "https://www.kaine.senate.gov/contact"
},
```

In the **LearnLocalStorage** assignment, I explain how to convert the output of this program to JSON.

- [Learn Local Storage JSON][lls-json]

[lls-json]: http://www.ccalvert.net/books/CloudNotes/Assignments/Browser/LearnLocalStorage.html#create-json

## Turn it in

Add, commit, push, then tag and/or branch.

We want to be able to either:

- The primary goal is to produce a valid JSON file called **address-list.json** containing all our addresses.
- It would also be good to produce a valid **address-list.js** file

If you can do either, that would fulfill the requirements of the assignment. If you can do both, that would be even better, but it is not required.

See also, this portion of the

## Hint Tagging

- [Git Tag][git-tag]
- [Understanding Tags][under-tag]

[git-tag]: http://www.elvenware.com/charlie/development/cloud/Git.html#git-tag
[under-tag]: http://www.elvenware.com/charlie/development/cloud/Git.html#understanding-tags

## Pad Number

```javascript
var padNumber = function(numberToPad, width, padValue) {
    padValue = padValue || '0';
    numberToPad += '';
    if (numberToPad.length >= width) {
        return numberToPad;
    } else {
        return new Array(width - numberToPad.length + 1).join(padValue) + numberToPad;
    }
};
```
