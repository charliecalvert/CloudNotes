There are two sections to this document. One informative, the second a project for you to complete.

# IndexedDb

This database is built into most modern browsers. We can access it from Git.

## Open the Database

If the browser supports it, and modern browsers do, then **indexedDB** will be a property of the global **window** object.

    var request = window.indexedDB.open(dbName, versionNumber);

*   set up these events:
    *   onerror
    *   onsuccess
    *   onupgradeneeded

## Sample Program

*   <a href="">FilePicks</a>

Much to be done, but a starter on it:

```javascript
elf.IndexDbWrapper = (function() {

    var db;
    var request;
    var dbName;
    var dataStoreName = "customers";

    function IndexDbWrapper(dbNameInit, reportInit) {
        dbName = dbNameInit;
        report = reportInit || report;
    }

    function report(success, title, message) {
        console.log(title, message);
    }

    var onerror = function(event) {
        console.log(JSON.stringify(event, null, 4));
        report(false, "Database Failure", event.target.errorCode);
    };

    /**
     * Delete all data in a data store
     * @param callback
     */
    IndexDbWrapper.prototype.clearDataStore = function(callback) {
        var transaction = db.transaction([dataStoreName], 'readwrite');
        var customerStore = transaction.objectStore(dataStoreName);

        // onsuccess doesn't means its done. oncomplete means its done.
        transaction.oncomplete = function(event) {
            console.log("object store cleared, operation finished.");
            callback();
        };

        customerStore.clear().onsuccess = function(event) {
            console.log("object store cleared but operation not finished");
        };
    };

    IndexDbWrapper.prototype.close = function() {
        if (db) {
            db.close();
        }
    };

    IndexDbWrapper.prototype.deleteDatabase = function(callback) {
        if (db) {
            db.close();
        }
        var deleteDbRequest = window.indexedDB.deleteDatabase(dbName);
        deleteDbRequest.onsuccess = function (event) {
            callback(event);
        };
        deleteDbRequest.onerror = function (e) {
            console.log("Database error: " + e.target.errorCode);
        };
    };

    IndexDbWrapper.prototype.getAllItemsFromDataStore = function(callback, closeOnDone) {
        console.log("getAllItemsFromDataStore called");
        var transaction = db.transaction([dataStoreName]);
        var customerStore = transaction.objectStore(dataStoreName);

        var items = [];
        var cursorRequest = customerStore.openCursor();

        transaction.oncomplete = function(evt) {
            callback(items);
            if (closeOnDone) {
                db.close();
            }
        };

        cursorRequest.onerror = function(event) {
            report(false, "Database Failure", event.target.errorCode);
        };

        cursorRequest.onsuccess = function(event) {
            console.log("cursor request on success called");

            report(true, "Success", "DataStore for SSN 444-44-4444 is " + event.target.source.name);

            var cursor = event.target.result;
            if (cursor) {
                console.log("found Item: ", cursor.value);
                items.push(cursor.value);
                cursor.continue(); // I think this causes onsuccess to be called again
            }

            console.log("Number of items found", items.length);
        };
    };

    IndexDbWrapper.prototype.getDbName = function() {
        return db.name;
    };

    var onOpenDbSuccess = function(event) {
        db = event.target.result;
        console.log("OnGetDbSuccess called");
        report(true, "OnGetDbSuccess",  "Report: Opened Database");
    };

    IndexDbWrapper.prototype.openDb = function(versionNumber, successFunc) {
        try {
            request = window.indexedDB.open(dbName, versionNumber);
            request.onerror = onerror;
            request.onupgradeneeded = onupgradeneeded;
            request.onsuccess = successFunc || onOpenDbSuccess;
            return request;
        } catch(e) {
           throw e.message;
        }
    };

    IndexDbWrapper.prototype.openAndGetData = function(versionNumber, callback) {
        var that = this;
        that.openDb(versionNumber, function(event) {
            db = event.target.result;
            that.getAllItemsFromDataStore(callback);
        });
    };

    IndexDbWrapper.prototype.insertArray = function(dataArray, callback) {
        var transaction = db.transaction([dataStoreName], "readwrite");

        // Do something when all the data is added to the database.
        transaction.oncomplete = function(event) {
            // $("#alerts").bootstrap_alert('alert-success', "Success", "Added Data.");
            if (typeof callback !== 'undefined') {
                callback()
            }
        };

        transaction.onerror = onerror;

        var objectStore = transaction.objectStore(dataStoreName);
        for (var i in dataArray) {
            var request = objectStore.add(dataArray[i]);
            request.onsuccess = function(event) {
                console.log(event);
                // event.target.result == customerData[i].ssn;
            };
        }
    };

    // This event is only implemented in recent browsers
    var onupgradeneeded = function(event) {
        // TODO: Pass this in
        const customerData = [
            {ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com"},
            {ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org"},
            {ssn: "666-66-6666", name: "Lisa", age: 52, email: "lisa@home.org"}
        ];
        console.log('onUpGradeNeeded called');
        var db = event.target.result;
        report(true, "OnUpGradeNeeded database.");

        // Create an objectStore to hold information about our customers. We're
        // going to use "ssn" as our key path because it's guaranteed to be
        // unique - or at least that's what I was told during the kickoff meeting.
        var objectStore = db.createObjectStore(dataStoreName, { keyPath: "ssn" });

        // Create an index to search customers by name. We may have duplicates
        // so we can't use a unique index.
        objectStore.createIndex("name", "name", { unique: false });

        // Create an index to search customers by email. We want to ensure that
        // no two customers have the same email, so use a unique index.
        objectStore.createIndex("email", "email", { unique: true });

        // Use transaction oncomplete to make sure the objectStore creation is
        // finished before adding data into it.
        objectStore.transaction.oncomplete = function(event) {
            // Store values in the newly created objectStore.
            var customerTransaction = db.transaction(dataStoreName, "readwrite");
            var customerObjectStore = customerTransaction.objectStore(dataStoreName);

            customerTransaction.oncomplete = function(event) {
                console.log("On upgrade complete");
            };

            for (var i in customerData) {
                customerObjectStore.add(customerData[i]);
            }
        }
    };

    return IndexDbWrapper;

})();
```

These two tests should give you at least some idea of how to use it.

```javascript
it("shows we can open a db", function(done) {
    var index =  new elf.IndexDbWrapper(dbName);
    var request = index.openDb(1, function(event) {
        var db = event.target.result;
        expect(db).to.be.ok;
        expect(db.name).to.equal(dbName);
        db.close();
        done();
    });
});

it("shows we can get data (broken in Chromium only?)", function(done) {
    var index =  new elf.IndexDbWrapper(dbName);
    var request = index.openAndGetData(1, function(items) {
        expect(items.length).to.equal(3);
        expect(items[0].name).to.equal('Bill');
        expect(items[1].name).to.equal('Donna');
        expect(items[2].name).to.equal('Lisa');
        done();
    });
});
```

Remember, this code is likely to change!

## References

*   [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
*   [IBM](http://www.ibm.com/developerworks/library/wa-indexeddb)
*   [IDBobjectStore](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore)
*   [Dexie Simple Wrapper](href="http://www.dexie.org)

## IndexedDb Project

This project is designed to help you learn about **indexedDB**.

##Goals

We want to:

*   Enhance our midterm project to support offline mode
    *   Be sure the project works correctly on a phone or tablet.
    *   If **indexedDb** is not supported on device, continue on without it, but support it if present.
    *   Support web apps this week, Cordova next week
*   Read in the data from the census bureau one time, store it in the local store, called **indexedDB**.
*   Now when the user goes offline, then can still access the data, run queries, and display graphs.
*   Provide rudimentary support for an Express server.

Use my **IndexedDbWrapper.js** file to store and load the data from your browser's datastore.

*   DatabaseName: census
*   DataStoreOne: state-census
*   DataStoreTwo: zip-census

## Express Support

*   Create a rudimentary Express server.
*   Create two pages with Jade and Markdown.
*   On the **about** page for your program, place two buttons.
    *   Click button one, display **PageOne.jade** in the **about** page.
    *   Click button two, display **PageTwo.jade** in the **about** page.
*   Include the scripts that tie your code together, and your copy of **.bash_alias**.

## Turn it in

You can one of two things:

*   Integrate the code described above into your midterm. The ideal scenario would be to have at least some of the queries work in offline mode when a device or PC is not connected.
*   Alternatively, a stand alone application with these features would be good.

Put your final code in a folder call Week09-IndexDb.

In terms of your final grade, you will get many kudos and some points if the IndexDb feature is available in your final project, but your the score of your Final will not be negatively affected if this this feature is absent.
