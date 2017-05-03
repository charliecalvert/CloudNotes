## Overview

Create a program that generates about 500 addresses that you can use in CongressAddress. Turn in the program, use the addresses in **CongressAddress**.

Do your work in a folder in the root of your project call **GetAddress**.

## Get the Addresses

```
curl https://www.govtrack.us/api/v2/role?current=true > address.json
```

Study **address.json** until it makes sense.

## Write Utility

Then in get-address.js:

```javascript
var fs=require("fs");
var debug = require('debug')('get-address');

debug('Testing debug');

function readFile(fileName, callback) {
    'use strict';
    if (!callback) {
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
    } else {
        fs.readFile(fileName, 'utf8', function(err, fileContents) {
            if (err) {
                throw (err);
            }
            callback({
                'result': fileContents
            });
        });
    }
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
    var start = value.lastIndexOf(char);
    return value.substring(start, start + len);
}

function writeIt(label, value, noComma) {
    var comma = noComma ? '"' : '",';
    console.log('\t' + label, '"'+ value + comma)
};

readFile('address.json').then(function(text) {
    debug(text);
    var json = JSON.parse(text.result);
    debug('\n\nSTRINGIFY\n\n', JSON.stringify(json));
    var gitUser = [];
    const unknown = 'unknown';
    for (var i = 0; i < json.objects.length; i++) {
        console.log('{');
        writeIt('firstName:', json.objects[i].person.firstname);
        // GET LAST NAME
        writeIt('street:', getAddress(json.objects[i].extra.address, 'W'));
        // CITY STATE ZIP PHONE WEBSITE
        writeIt('email:', '');
        writeIt('contact:', json.objects[i].extra.contact_form || '', true);
        console.log('},');
    }
    //console.log('\n\nSTRINGIFY\n\n', JSON.stringify(gitUser, null, 4));
    debug('all done');
});

```

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

## Turn it in

Add, commit, push, tag and/or branch.
