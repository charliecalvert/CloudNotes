## Overview

Learn about local storage in the browser.

- Insert 100 records with format elfXXXX
- Insert **elven-count**
- Insert **elven-store**
- Load Data from Local Storage once Component is mounted

## Video

- [Local Storage Video](https://youtu.be/8Nyph1YaPXI)
- [The merge branch step](https://youtu.be/-AICMK2GnXc)

## Elf Logger

We need to be able to turn logging on and off as needed. Save as **src/assets/elf-logger.js**

```javascript
export default (() => {
    let saveConsole = null;
    const logger = {};

    logger.on = () => {
        if (saveConsole) {
            window['console']['log'] = saveConsole;
        }
    };

    logger.off = () => {
        saveConsole = console.log;
        window['console']['log'] = () => {};
    };

    return logger;
})();
```

If you write **logger.on()** then **console.log** works, if you write **logger.off()** then **console.log** does nothing.


## Elf Local Storage {#simple-object}

Save this as **assets/elf-local-storage.js**. It's purpose is to provide a few simple utilities functions that wrap the JavaScript **localStorage** object:

```javascript
const ELF_TAG = 'elf';

const padNumber = function(numberToPad, width, padValue) {
    padValue = padValue || '0';
    numberToPad += '';
    if (numberToPad.length >= width) {
        return numberToPad;
    } else {
        return new Array(width - numberToPad.length + 1).join(padValue) + numberToPad;
    }
};

function saveByIndex(item, index) {
    if (typeof item === 'object') {
        item = JSON.stringify(item, null, 4);
    }
    const key = ELF_TAG + padNumber(index, 4, 0);
    localStorage.setItem(key, item);
}

function getByIndex(index) {
    const key = ELF_TAG + padNumber(index, 4, 0);
    return JSON.parse(localStorage.getItem(key));
}

function removeElfKeys() {
    for (var key in localStorage) {
        if (key.startsWith(ELF_TAG)) {
            localStorage.removeItem(key);
        }
    }
}

function clearLocalStorage() {
    localStorage.clear();
}

export {
  saveByIndex,
  getByIndex,
  removeElfKeys,
  clearLocalStorage
};
```

Use it like this:

```javascript
import { getByIndex } from '../assets/elf-local-storage';
```

Since the above could get out of data. I will try to maintain it here:

- [Elf Local Storage][elf-local-storage]

[elf-local-storage]: https://gist.github.com/charliecalvert/d8404b826ee22702c501368335624622


## Named Exports

Please note that we don't use **export default** in the **elf-local-storage** module. Instead, we declare a set of functions such as **saveByIndex** and **getByIndex** and we export them explicitly by name:

```javascript
export {
  saveByIndex,
  getByIndex,
  removeElfKeys,
  clearLocalStorage
};
```

We import them like this, with curly-braces:

```javascript
import { saveByIndex, getByIndex } from "./elf-local-storage";
```

In general, when we import code that uses **export default** we write this:

```javascript
import foo from './foo';
```

When import code that's exported by name, we use curly-braces, like this:

```javascript
import { foo } from './foo';
```

## Define Address LocalStorage

The previous object is generic. It works for any app that wants to support localStorage. Here is another object tailor made to work with our React-based **Address** component:

```javascript
import {saveByIndex} from "./elf-local-storage";
import logger from "./elf-logger";

logger.off();

const KEY_SET = ['elven-store', 'set', 'elven-count'];

function setLocalStorage(addresses) {
    console.log('SET LOCAL', addresses);
    localStorage.setItem(KEY_SET[0], KEY_SET[1]);
    localStorage.setItem(KEY_SET[2], addresses.length);
    addresses.forEach(function(address, index) {
        saveByIndex(address, index);
    });
    return addresses;
}

function dataLoaded() {
    const elfStore = localStorage.getItem(KEY_SET[0]);
    return (elfStore === KEY_SET[1]);
}

export {
    setLocalStorage,
    dataLoaded
};
```

We store data in local storage using **key--value** pairs:

| Key            | Value          |
| :------------- | :------------- |
| elven-store    | set            |
| elven-count    | 100            |
| elf0000        | firstName: "Tammy", etc   |
| elf0000        | firstName: "Sherrod", etc |

if **elven-store** is set to **set**, then we can assume our data has been loaded into **localStorage**. Otherwise, it needs to be loaded. **elven-count** shows how many records were loaded. The remaining data, such as elf0000, is where the actual data is stored.

Familiarize yourself with **KEY_SET**:

```javascript
const KEY_SET = ['elven-store', 'set', 'elven-count'];
```

This line sets **elven-store** equal to **set**:

```javascript
localStorage.setItem(KEY_SET[0], KEY_SET[1]);
```

This line sets **elven-count** equal to 100:

```javascript
localStorage.setItem(KEY_SET[2], addresses.length);
```

![Address Local Storage in Chrome][addls]

[addls]:https://s3.amazonaws.com/bucket01.elvenware.com/images/address-local-storage-app-view.png

**IMAGE**: _We can view **localStorage** in the Application page of the Chrome Developer tools._

## Use Local Storage

So how do we use our local storage objects?

First, we import them into **components/Address.js**:

```javascript
import { getByIndex } from "../assets/elf-local-storage";
import { dataLoaded, setLocalStorage} from "../assets/elf-address-storage";
```

Inside the **if (!canceled)** block of our '/address-list' fetch statement we do this:

```javascript
setLocalStorage(addressListFromServer);
this.setAddress(0);
```

The first statement puts our data from **CongressServer** in localStorage. The second has nothing to do with localStorage, it just assures that we are looking at the first record of our data rather than our list of **unknowns**.

We also rewrite componentDidMount to ensure we don't load from **CongressServer** if we already have the data in **localStorage**:

```javascript
componentDidMount() {
    if (dataLoaded()) {
        this.setAddress(0);
    } else {
        this.getAddressList();
    }
}
```

## Iterating over the Data

When iterating over the data in the method we call **setAddress**, we can update state like this:

```
this.setState({address: getByIndex(value)});
```

This is easier, I think, than having to index into our array of records.


## Summary

The key thing to grasp here is that once we declared our **elf-local-storage.js** and **elf-address-storage.js** files, we only needed to add three lines to our **Address** program to use **localStorage**.

One line we need is found in **componentDidMount**:

- **if (dataLoaded()) { }**

Another is in our **fetch** method:

- **setLocalStorage(addressListFromServer);**

And when iterating over data, we call **getByIndex**:

- **this.setState({address: getByIndex(value)});**

## Double Check

Do this to ensure your code is working:

- Load the Chrome Dev Tools
- Go to the **Application** page in the Dev Tools
- Select **Clear Storage**
- Select only **Local and session storage**
- Press **Clear selected**
- Look at **Local Storage | http://localhost:3000**

Then make sure that **localStorage** gets properly initialized after you refresh your home page. In other words, you should see **localStorage** filled up with at least 100 addresses when you refresh your home page.

## Links

- [IndexedDb API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [WebStorage (localStorage) API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [LocalForage is like LocalStorage but saves to IndexedDB](https://localforage.github.io/localForage/)
- [LocalForage on GitHub shows it is popular](https://github.com/localForage/localForage)
- [PouchDB is another IndexedDB front end, like CouchDb](https://pouchdb.com/)
- [PouchDb + SqlLite](https://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-your-ionic-app/)
- [Dexie is nother front end for IndexedDB](http://dexie.org/)
- [Dexie on GidHub shows modest popularity](https://github.com/dfahlander/Dexie.js)
- [ZangoDb is not very popular](https://github.com/erikolson186/zangodb)
