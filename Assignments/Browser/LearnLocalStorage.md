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
