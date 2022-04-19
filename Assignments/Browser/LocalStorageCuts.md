---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser/LocalStorageCuts.md
relativePath: Assignments/Browser/LocalStorageCuts.md
title: LocalStorageCuts
queryPath: Assignments/Browser/
subject: Browser
fileNameMarkdown: LocalStorageCuts.md
fileNameHTML: LocalStorageCuts.html
---


<!-- toc -->
<!-- tocstop -->

## Elf Logger

 One way to do it is to set it by module. If we set a particular environment variable to the name of a module, then the debug statements for that module will be visible.

The docs for **ElfLogger** are here: [http://bit.ly/elven-utils](http://bit.ly/elven-utils)

The source for **ElfLogger** is available as a gist: [http://bit.ly/elf-logger](http://bit.ly/elf-logger)

The source for **ElfDebugEnzyme** as a gist: [http://bit.ly/elf-debug-enzyme](http://bit.ly/elf-debug-enzyme)

## Create JSON File {#create-json}

We want to create a valid JSON file containing an array of address objects that we can use in our program. One approach would to copy your array of addresses from **address-list.js** to **public/address-list.json**. The code you put in the their should pass [json-lint](https://jsonlint.com/).

A better way to handle this problem would to modify your [getAddress.js][ga-code] code slightly so that it produces valid JSON. You need to modify the code inside your **for loop**.

- Begin by outputting not just a curly brace, but an open square brance and then an open curley brace.
- Ensure you have double quotes around the property names, as this is part of the JSON spec.
- At the end of the file, insert a close curly brace and a close square bracket.

Some sample code to put in your version of **get-address** is shown here:

```javascript
// console.log('{');  <=== COMMENT IT OUT AND REPLACE IT WITH THESE TWO LINES
const open = (i === 0) ? '[\n\t{' : '\t{';
console.log(open);

// PUT DOUBLE QUOTES AROUND YOUR PROPERTY NAMES
writeIt('"firstName":', json.objects[i].person.firstname);

// AND SO ON

// console.log('},'); <=== COMMENT IT OUT AND REPLACE IT WITH THESE TWO LINES
const close = i < jsonLength - 1 ? '\t},' : '\t}\n]';
console.log(close);
```

The open lines start the array and the closing lines close the array. Note that **firstName** is written to be surrounded in double quotes, which satisfies the JSON spec. See the three samples below to better understand the use of double quotes for the property name (key) in a JSON file:

```javascript
// Valid JSON
{
  "foo": "bar"
}

// Invalid JSON because there are no quotes around key
{
  foo: "bar"
}

// Invalid JSON because of single quotes around key and value
{
  'foo': 'bar'
}
```

[ga-code]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactGetAddress.html

## Load JSON {#load-json}

We can use a method called **fetch** to retrieve data from the server. In particular, we want to load our addresses in JSON format.

**NOTE**: _Why are we doing this? What's wrong with the method we have been using to load the addresses? There is nothing serious wrong with it, but we want to take a half-step toward the time when we load our addresses from a server side databases. The code we will use to load the addresses from a JSON file stored on the server is similar to the code we will use to load JSON from a database. Also, we currently always have the addresses in memory from the moment we launch. We want to have the option of loading the addresses from the server or reading them from local storage. Again, this will only really make sense once we have the option of loading the data from a database._

Someday **fetch** will be probably be part of standard JavaScript. For now, we use an NPM package:

```
npm install --save whatwg-fetch
```

Then at the top of **Address.js**:

```javascript
import 'whatwg-fetch';
```

Now we are ready to load our JavaScript with fetch and promises:

```javascript
fetch('./addresses.json').then(function(data) {
   const addresses = data.json();
   console.log(addresses);
   return addresses;
}).then(function (data) {
   console.log(JSON.stringify(data, null, 4));
   that.addresses = data;
   that.setLocalStorage();
}).catch(function (err) {
   logger.log(err);
})
```

For example:

```javascript
/**
 * Created by Charlie Calvert on 5/10/17.
 *
 * Use it like this:
 *
 *   import DataLoader from '../assets/DataLoader';
 *   const dataLoader = new DataLoader();
 */

import Logger from './ElfLogger';
const logger = new Logger('data-loader', 'yellow', 'green', '18px');
import { saveByIndex } from '../assets/elf-local-storage';

export default class DataLoader {

    constructor() {
        this.STORE_SET = ['elven-store', 'set', 'elven-count'];
        this.loadAddresses = this.loadAddresses.bind(this);
    }

    dataLoaded() {
        const elfStore = localStorage.getItem(this.STORE_SET[0]);
        return (elfStore === this.STORE_SET[1]);
    }

    setLocalStorage(addresses) {
        console.log('SET LOCAL', addresses);
        localStorage.setItem(this.STORE_SET[0], this.STORE_SET[1]);
        localStorage.setItem(this.STORE_SET[2], addresses.length);
        addresses.forEach(function(address, index) {
            saveByIndex(address, index);
        });
        return addresses;
    }

    loadAddresses(callback) {
        const that = this;
        if (this.dataLoaded()) {
            logger.log('Using data from localstore');
            callback(localStorage.getItem(this.STORE_SET[2]));
        } else {
            logger.log('Loading data');
            fetch('./address-list.json').then(function(data) {
                //const addresses = data.json();
                //console.log(addresses);
                return data.json(); //addresses;
            }).then(function(data) {
                logger.log(JSON.stringify(data, null, 4));
                //console.log(that);
                that.setLocalStorage(data);
                callback(data.length);
            }).catch(function (err) {
                logger.log(err);
            });
        }
    }

}
```

Since the above code could get out of data, I will try to maintain it here:

- [DataLoader][data-loader]

[data-loader]:https://gist.github.com/charliecalvert/d9fc57f29e16de8970b88a3c89b9b410

## Load After Mounting

We can't really load properly in the constructor because we have a callback and need to setState after we are done. So do it in **componentDidMount**:

```javascript
componentDidMount() {
    logger.log('DID MOUNT');
    const that = this;
    dataLoader.loadAddresses(function(addressCount) {
        if (!addressCount) {
            throw new Error('Cannot get address count in address.js');
        }
        that.addressCount = addressCount;
        logger.log('LOADED ADDRESS');
        const address = getByIndex(that.addressIndex);
        that.setState({
            address: address
        });
    });
}
```
