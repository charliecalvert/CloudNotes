---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser/LearnLocalStorage.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser
fileName: LearnLocalStorage.md
relativePath: /Browser/LearnLocalStorage.md
title: LearnLocalStorage
directoryName: Browser
category : browser-guide
---

## Overview

[Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is a bit like a simple database in your browser that persists between sessions. You can store information in Local Storage in key value pairs. If the user shuts down their machine, then returns a day later, information stored in the browser will still be available when the user returns to your website. Local Storage also works offline, which means the user can access the information even if they have no access to the Internet. (Of course the user has to first visit your site at least once while online, but after that, they can access the data offline at any time.)

Our goal will be to:

- Insert records with the key formatted like this: elfXXXX
  - For instance, the first record will be elf0000, the second elf0001, etc.
- Insert an **elven-count** key set to the number of records in storage.
- Insert an **elven-store** key that we can use to check if data has been inserted.
  - If the key is not set, then there is no data for us in Local Storage.
- Load Data from Local Storage once a Component such as **AddressShow** is mounted

## Get Started {#get-started}

Do your work in your current version of the Address Program. This might be:

- week05-address-simple
- AddressMaven
- Other

Your goal will be to insert the data into **Local Storage** in **control.js**. Then use one of your components to display the address data to the user. In most cases, this will mean creating a React called **AddressShow** if you have not done so already. Add two buttons named **Next** and **Prev** to it which increment and decrement a state variable called index. When the user clicks either buttons, reach into **localStorage**, find the record at that particular index, and display it to the user.

## AddressShow Key Features {#address-show-key-features}

You probably won't be able to implement all of this quite yet. Nevertheless, here is a list of key features of **AddressShow** that you will want to implement over time:

- Use **withStyles** and **PropTypes**
- Ultimately you will want this component to follow the **material-ui** guidelines that will be laid out in other assignments such as [MaterialEverywhere][me]. In other words, it should have the same look and feel as the other React components. Use **CssBaseline**, **Grids** and **Paper** to achieve this goal.
- import **elf-styles**
- Maintain state for at least the single value **index**. We are working with data stored in **localStorage** and will be able to access each record in local storage by index. "Get me the first record, get me the fifth record, etc." We use **this.state.index** to locate records in localStorage.
- Include two buttons that can be used to increment and decrement the **index**.
- Use our **getByIndex** function from **elf-local-storage** to retrieve a record at a particular **index** from local storage.

Use this list as a guide to help you properly implement **AddressShow** in this and future assignments.

## Video

Parts of these videos no longer match this assignment precisely. So don't try to follow them too closely. However, I think they still contain material that you will find useful.

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

## Test Data

Here is some test data we can use in this assignment:

```json
const addressList = [
	{
		"firstName": "Lamar",
		"lastName": "Alexander",
		"street": "455 Dirksen Senate Office Building",
		"city": "Washington DC",
		"state": "TN",
		"zip": "20510",
		"phone": "202-224-4944",
		"website": "https://www.alexander.senate.gov/public",
		"email": "",
		"contact": "http://www.alexander.senate.gov/public/index.cfm?p=Email"
	},
	{
		"firstName": "Susan",
		"lastName": "Collins",
		"street": "413 Dirksen Senate Office Building",
		"city": "Washington DC",
		"state": "ME",
		"zip": "20510",
		"phone": "202-224-2523",
		"website": "https://www.collins.senate.gov",
		"email": "",
		"contact": "http://www.collins.senate.gov/contact"
	},
]
```

Put this near the top of **control.js**.

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

function getCount () {
    return localStorage.getItem('elven-count');
}

export {
  saveByIndex,
  getByIndex,
  removeElfKeys,
  clearLocalStorage,
  getCount
};
```

Use it like this:

```javascript
import { getByIndex } from '../assets/elf-local-storage';
```

Since the above could get out of date, I will try to maintain it here:

- [Elf Local Storage][elf-local-storage]

## Named Exports

Please note that we don't use **export default** in the **elf-local-storage** module. Instead, we declare a set of functions such as **saveByIndex** and **getByIndex** and we export them explicitly by name:

```javascript
export {
  saveByIndex,
  getByIndex,
  removeElfKeys,
  clearLocalStorage,
  getCount
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

The previous object is generic. It works for any app that wants to support **localStorage**. Here is an object tailor made to work with our **Address** records. Call it **assets/address-local-storage.js**:

```javascript
import {saveByIndex} from "./elf-local-storage";

const debug = process.env.REACT_APP_ELF_LOGGER === 'sanity-learn-local' ? console.log : () => {};

const KEY_SET = ['elven-store', 'elven-count'];

function setLocalStorage(addresses) {
    debug('SET LOCAL', addresses);
    localStorage.setItem(KEY_SET[0], '1');
    localStorage.setItem(KEY_SET[1], addresses.length);
    addresses.forEach(function(address, index) {
        saveByIndex(address, index);
    });
    return addresses;
}

function dataLoaded() {
    const elvenStore = localStorage.getItem(KEY_SET[0]);
    return (elvenStore === '1');
}

export {
    setLocalStorage,
    dataLoaded
};
```

We store data in local storage using **key--value** pairs:

| Key         | Value                                  |
|:------------|:---------------------------------------|
| elven-store | 0 or 1                                 |
| elven-count | The number of records in Local Storage |
| elf0000     | firstName: "Tammy", etc                |
| elf0001     | firstName: "Sherrod", etc              |

If the key **elven-store** has a value of **1**, then we can assume our data has been loaded into **localStorage**. Otherwise, it needs to be loaded. **elven-count** shows how many records were loaded. The remaining data, such as **elf0000**, is where the actual data is stored.

Familiarize yourself with **KEY_SET**:

```javascript
const KEY_SET = ['elven-store', 'elven-count'];
```

This line sets **elven-store** equal to **1**:

```javascript
localStorage.setItem(KEY_SET[0], 1);
```

This line sets **elven-count** equal to 5:

```javascript
localStorage.setItem(KEY_SET[1], addresses.length);
```

![Address Local Storage in Chrome][addls]

[addls]:https://s3.amazonaws.com/bucket01.elvenware.com/images/address-local-storage-app-view.png

**IMAGE**: _We can view **Local Storage** in the Application page of the Chrome Developer tools._

## Use Local Storage

So how do we use our local storage objects?

First, we import them into **source/control.js**:

```javascript
import { dataLoaded, setLocalStorage} from "./assets/address-local-storage";
```

At the start of the window.onload function, do this:

```javascript
setLocalStorage(addressList);
```

The statement puts our data in localStorage.

You should also wrap the call to **setLocalStorage** in an **if** clause that uses the **boolean** **dataLoaded** function. That way, we first check if the data has already been loaded into **localStorage**. If it has been, then we do nothing, otherwise we call **setLocalStorage**. I'll let you write that very small bit of code.

## View Data {#summary}

Review the instructions in the [Get Started](#get-started) section on displaying data to the user.  In a display component such as **AddressShow**, we call **getByIndex** to retrieve a single record. For instance, assuming you are tracking the record we want to display to the user by maintaining an index, we might write code like this:

```JavaScript
import { getByIndex, getCount } from './elf-local-storage';

const singleAddress = getByIndex(index);
```

Use buttons labeled **Next** and **Prev** to increment and decrement our **index** variable.

Please see [this example][dls] of how to display items in local storage.

## Looking Ahead

You don't need to do this for this assignment. However, in the midterm you will want to get the data from the server rather than just hard code the data into **control.js**. That will involve a call to fetch followed by a call to **setLocalStorage**.

The key thing to grasp here is that once we declared our **elf-local-storage.js** and **elf-address-storage.js** files, we only needed to add three lines to our **AddressMaven** program to load our data into **localStorage**.

Inside our **fetch** method we will write something like this:

- **setLocalStorage(addressListFromServer);**


## Double Check

Do this to ensure your code is working:

- Load the Chrome Dev Tools
- Go to the **Application** page in the Dev Tools
- Select **Clear Storage**
- Select only **Local and session storage**
- Press **Clear selected**
- Look at **Local Storage | http://localhost:3000**

Then make sure that **localStorage** gets properly initialized after you refresh your home page. In other words, you should see **localStorage** filled up with at least 5 addresses when you refresh your home page.

## Turn it in

Tag your work when you are done.

Tell me the:

- Folder Name
- Branch (Especially if other than **master**)
- Tag

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

[dls]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/EcmaScript6/SimpleLocalStorage
[me]: https://www.elvenware.com/teach/assignments/react/MaterialEverywhere.html
[elf-local-storage]: https://gist.github.com/charliecalvert/d8404b826ee22702c501368335624622
