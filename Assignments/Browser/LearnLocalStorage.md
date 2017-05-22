# Learn Local Storage

Learn about local storage in the browser.

## Elf Logger

We need to be able to turn logging on and off as needed. One way to do it is to set it by module. If we set a particular environment variable to the name of a module, then the debug statements for that module will be visible.

The docs for **ElfLogger** are here: [http://bit.ly/elven-utils](http://bit.ly/elven-utils)

The source for **ElfLogger** is available as a gist: [http://bit.ly/elf-logger](http://bit.ly/elf-logger)

The source for **ElfDebugEnzyme** as a gist: [http://bit.ly/elf-debug-enzyme](http://bit.ly/elf-debug-enzyme)

## Simple Object

```javascript
/**
 * Created by Charlie on 5/8/17.
 */

function saveToLocalStorageByName(key, item) {
    if (!key) {
        const storageIndex = localStorage.length + 1;
        key = 'key' + storageIndex;
    }

    localStorage.setItem(key, item);
}

function saveToLocalStorage(item) {
    if (typeof item === 'object') {
        item = JSON.stringify(item, null, 4);
    }
    const storageIndex = localStorage.length + 1;
    const key = 'key' + storageIndex;
    localStorage.setItem(key, item);
}

function getLocalStorage() {
    let storage = '';
    let key = '';
    let storageItem;
    for (let i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        storageItem = localStorage.getItem(key);
        if (typeof storageItem === 'object') {
            storageItem = JSON.stringify(storageItem, null, 4);
        }
        if (i === 0) {
            storage = storageItem;
        } else {
            storage = storage + '\n' + storageItem;
        }
    }
    return storage;
}

function clearLocalStorage() {
    localStorage.clear();
}

export {saveToLocalStorage, saveToLocalStorageByName,
  getLocalStorage, clearLocalStorage};
```

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

## Links

- [IndexedDb API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [WebStorage (localStorage) API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [LocalForage is like LocalStorage but saves to IndexedDB](https://localforage.github.io/localForage/)
- [LocalForage on GitHub shows it is popular](https://github.com/localForage/localForage)
- [PouchDB is another IndexedDB front end, like CouchDb](https://pouchdb.com/)
- [PouchDb + SqlLite](https://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-your-ionic-app/)
- [Dexie is nother front end for IndexedDB](http://dexie.org/)
- [Dexie on GidHub shows modest popularity](https://github.com/dfahlander/Dexie.js)
-
- [ZangoDb is not very popular](https://github.com/erikolson186/zangodb)
