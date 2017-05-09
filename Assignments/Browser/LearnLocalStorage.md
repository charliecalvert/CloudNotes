# Learn Local Storage

Learn about local storage in the browser.

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
