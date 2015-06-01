## Description

Our goal is to implement tests and methods for a two classes:

- ScienceFacade
- SimpleScienceData

In particular, we will move the state shown in image one to the state shown in image two. The **MongoScienceData** and **JsonScienceData** objects will be implemented later. For now you can skip them entirely, or sketch them out as simple factories that return an empty object: {}. 

Begin with the project found in [this zip file](https://drive.google.com/file/d/0B25UTAlOfPRGTzhOcVk5RTRveFU/view?usp=sharing).

## Step One

![StepOne](https://drive.google.com/uc?id=0B25UTAlOfPRGTkZIeEhlZjFQWjA)

## Step Two

And here is the second state:

![Step Two](https://drive.google.com/uc?id=0B25UTAlOfPRGeGlWS21ZdnhJWFU)

## Goals

Your overall goal is to create the set of tests outlined in the **TestScienceFacade** object shown in  the Step Two UML diagram. More specifically, you need to create a set of Jasmine tests that look something like this:

```
 it('should prove we loaded jasmine', function () {
     // Your test here.
 });

 it('should get a hint', function () {
     // Your test here.
 });

 it('should show that ScienceFacade.hint is equal to the string ScienceFacade', function () {
     // Your test here.
 });

 it('should show that we can call getAll() and get an array', function () {
    // Your test here.
 });

 it('should show that we can call getAll() and get an array with three items', function () {
    // Your test here.
 });

 it('should show that we can call getTopic() and get an array', function () {
    // Your test here.
 });

 it('should show that we can call getSubtopicsFromTopic() and get an array', function () {
    // Your test here.
 });

 it('should show that we can call delete() and get a number', function () {
    // Your test here.
 });

 it('should show that we can call add() and get a number', function () {
    // Your test here.
 });

 it('should show that we can call update() and get a boolean', function () {
    // Your test here.
 });
```

Your job is to implement these tests, and also make a few small changes to **ScienceFacade** it actually passes the tests.

One test stands out from the others:

```
it('should show that we can call getAll() and get an array with three items', function () {
    // Your test here.
 });
```

To get this test to pass, you need to implement the **SimpleScienceData** object and link it into your tests. Give it the ability to return a set of records itentical or similar to the records stored in MongoLab **scientists** collection. Don't hit the database, just hard code the data into your new object. The **ScienceFacade** object should reference this new object as a dependency:

```
angular.module('elvenApp').factory('ScienceFacade', function(SimpleScienceData) {
```

The **ScienceFacade.getAll()** method should now return the array of data hardcoded into the **SimpleScienceData** object.

## Hints

```
function isArray(itemToCheck) {
	return Object.prototype.toString.call(itemToCheck) === '[object Array]';
}
```

Create SimpleScienceData.js and add this to test/index.html:

```
<script src="../public/javascripts/SimpleScienceData.js"></script>
```

Here is the SimpleScienceData.js:

```
/**
 * Created by charles.calvert on 5/11/2015.
 */

angular.module('elvenApp')
    .factory('SimpleScienceData', function () {
        return {
            getScienceData: function () {
                return [{
                    "_id": {"$oid": "5543bd3be4b000be4aa7b108"},
                    "firstName": "Marie",
                    "lastName": "Curie",
                    "subject": "Radioactivity"
                }, {
                    "_id": {"$oid": "5543cf1de4b0c2a1ea77f3a5"},
                    "firstName": "Albert",
                    "lastName": "Einstein",
                    "subject": "Physics"
                }, {
                    "_id": {"$oid": "5543d02ae4b0c2a1ea77f4ca"},
                    "firstName": "Isaac",
                    "lastName": "Newton",
                    "subject": "Science"
                }];
            }
        }
    });

```

And here is a test: 

```
 it('should show that we can call getAll() and get an array with three items', function () {
    var result = scienceFacade.getAll();
    expect(result.length).toEqual(3);
 });
```

## Turn it in

When you are done, check in your code in a folder called Week06-TestLive.

![AngularTestLive](https://s3.amazonaws.com/bucket01.elvenware.com/images/AngularTestLive.png)

