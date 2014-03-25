## Collection names01

The one thing we should have done differently is not to hard code the name of the collection multiple times:

var collection = database.collection('test_data');

Instead we should have declared an object scoped variable and reused it:

var collectionName = 'test_data';
var collection = database.collection(collectionName);

## Collection names02

The one thing we should have done differently is not to hard code the name of the collection multiple times:

var collection = database.collection('test_insert');

Instead we should have declared an object scoped variable and reused it:

var collectionName = 'test_insert';
var collection = database.collection(collectionName);