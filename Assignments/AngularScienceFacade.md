## Description

Our goal is to implement tests and methods for a two classes:

- ScienceFacade
- SimpleScienceData

In particular, we will move the state shown in image one to the state shown in image two.

Begin with the project found in [this zip file](https://drive.google.com/file/d/0B25UTAlOfPRGTzhOcVk5RTRveFU/view?usp=sharing).

## Step One

![StepOne](https://drive.google.com/uc?id=0B25UTAlOfPRGTkZIeEhlZjFQWjA)

## Step Two

And here is the second state:

![Step Two](https://drive.google.com/uc?id=0B25UTAlOfPRGeGlWS21ZdnhJWFU)

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

