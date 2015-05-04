# Angular MongoDb CRUD

This assignment is not yet complete, but I'm publishing what I have so you can get started on it. I will announce when it is updated, but still, I would press refresh from time to time in your browser to make sure you have the latest version.

The goal of this assignment is to add basic CRUD functionality to our AngularMongoDbStarter project. CRUD stands for Create, Read, Update, Delete. We already have read, so we want to add the capacity to:

- Create new records
- Update existing records
- Delete records

This video gives an overview of what I want:

- [http://youtu.be/-i2IFE2r5Ls](http://youtu.be/-i2IFE2r5Ls)

As with last weeks assignments, I recommend getting as far as possible with this assignment before class starts. Then we can answer questions during class and turn in the final version shortly thereafter.


## Preliminaries

Before you begin, please note the following. Here is how records on MongoLab look:

```
{
    "_id": {
        "$oid": "5541b5fbe4b01e004ed25b86"
    },
    "firstName": "Marie",
    "lastName": "Curie",
    "city": "Paris",
    "country": "France",
    "subject": "Radiations"
}
```

Note the peculiar structure where **_id** is not just a simple value, but an object with a property called **$0id** that contains the simple **id** value we expect to find. Sad, but true.

You are also going to need to make minor updates to **views/index.jade** in order to accommodate my last minute switch from presidents to scientists. I'll leave that as an "exercise for the reader."

**NOTE**: *Please do ensure the code runs correctly, but do not refactor this code, even if it seems tempting. We will do that next week in class after we add some unit tests.*


## Step One

Our first step will be to make a copy of our existing project. You can do this any way you want, but I prefer to use the built in Windows RoboCopy utility.

- Navigate to the root of your repository.
- Use this [robocopy][robo] command, or one of the variations shown in the next section, to make a copy of your project:

```
robocopy Week04-AngularMongoStart Week05-AngularMongoCrud /MIR
```

The exact command you issue may differ in small ways depending on the original name of your starter project, but that is the general pattern to follow.

When you are done you should have a new folder called **Week05-AngularMongoDbCrud** that contains an exact copy (a MIRror) of your **Week04-AngularMongoDbStarter** project.

[robo]:https://technet.microsoft.com/en-us/library/cc733145.aspx

## Step Two

Open the project in Webstorm. 

This next part of this step is cosmetic, and not essential, but I mention it for the sake of completeness. You might notice that the title of your project, shown in the upper right of the IDE, is still set to AngularMongoStart. To fix this, right click on the top node in the project window and choose refactor. Opt to change not the folder name, but the project name. Rename the project to AngularMongoCrud or some other name that appeals to you.

**NOTE**: *We could avoid having to rename the project by not copying the **idea** folder with robocopy. You can specify to exclude a folder with the /XD switch, which takes an absolute path to the folder you want to exclude. The command on your system would surely differ, but might look like this:*

    robocopy Week04-AngularMongoStart Week05-Foo /XD D:\Git\Prog219-calvert\Week04-AngularMongoStart\.idea /MIR 

If that is too long and unwieldy, you can do this:

    set SKIP=D:\Git\Prog219-calvert\Week04-AngularMongoStart\.idea
    robocopy Week04-AngularMongoStart Week05-Foo /XD %SKIP% /MIR

## Step Three 

Add new records:

Remember that our controller gets passed a **scientists** object which is an instance of the **$resource** object we create in **resources.js**:
 
```
    angular.module('elvenApp', ['pres'])
        .controller('MyController', function($scope, $http, scientists) {
```

Now we have a **scientists object **. We use it in the method designed to add a new record:

```javascript
$scope.newScientist = function() {
    var scientistResource = new scientists({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        subject: $scope.subject
    });
    scientistResource.$save(function(scientist) {
        $scope.scientists.push(scientist);
        $scope.scientistsLength = $scope.scientists.length;
    });
};
```

Let's take a moment to break this down. Notice that we first invoke the constructor object from **scientists** service to create a new Angular scientist resource:

```javascript
    var scientistResource = new scientists({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        subject: $scope.subject
    });
```
The Angular **$resouce** service has a number of utility functions on it. One of them is called **$save**. We use it like this to save our new record back to the database:

```
scientistResource.$save(function(scientist) {
    $scope.scientists.push(scientist);
    $scope.scientistsLength = $scope.scientists.length;
});
```

As you can see, if the insertion is successful, we also add the new record to our local copy of the data. An alternative would be to call refresh on the whole database.

## Step Four

Responds to clicks in the numeric input control by iterating through any records we may have the database. Begin by creating an index that tracks our current record. We do this by adding **$scope.currentItem** into the **loadScientists** method found at the top of **control.js**  

```javascript
          $scope.loadScientists = function() {
                $scope.scientists = scientists.query({}, function(scientists) {
                    $scope.scientistsLength = scientists.length;
                    $scope.firstName = scientists[0].firstName;
                    $scope.lastName = scientists[0].lastName;
                    $scope.subject = scientists[0].subject;                    
                    console.log(scientists[0].firstName);
                    console.log(scientists[0].lastName);
                    console.log(scientists[0].getFirstName());
                    $scope.currentItem = 0;   // HERE IS THE NEW ITEM
                });
            };
```

Now add a method that performs our task:

```javascript
    $scope.indexChange = function() {
        $scope.firstName = $scope.scientists[$scope.currentItem].firstName;
        $scope.lastName = $scope.scientists[$scope.currentItem].lastName;
        $scope.subject = $scope.scientists[$scope.currentItem].subject;
    };
```

To make this process of iterating over the records you create work, there may be an additional change you will need to make somewhere else in your code.

## Step Five

We will want to add **update** and **delete** methods  to **resources.js**. We will use a REST protocol  wrapped by Angular in their [$resource][ang-res] service found in the **ngResouce** module. (See below for more on REST.)

In the starter assignment, we learned that we can get hold of the Angular **$resource** service with a command like this:

    var url = 'https://api.mongolab.com/api/1/databases/myDatabase/collections/mycollection/:id';
    var scientists = $resource(url, { apiKey: 41abc3d322332gaserfadswf});

Our particular version of this method is somewhat different:

    var url = 'https://api.mongolab.com/api/1/databases/myDatabase/collections/mycollection/:id';
    var scientists = $resource(url, { apiKey: 41abc3d322332gaserfadswf}, {update: {method: 'PUT'});

 We use this syntax to extend the **$resource** service with a method called **update** that uses the HTTP **PUT** command. This is necessary because MongoLab uses HTTP **PUT** commands to update documents while $resource does not. See [Step Seven](#step-seven) for more details.

## Step Six

Delete a document from our collection.

Here is a method to delete an item from the database:

        scientists.prototype.remove = function (successCallback, errorCallback) {
            return scientists.remove({id:this._id.$oid}, successCallback, errorCallback);
        };

This item ought to be added to our **scientists** factory. The method relies on the **$resource** service created as shown earlier in this section. As you can surmise, this service has a built in **remove** method that takes an ID and two callbacks. 

We invoke this remove method in **control.js**. In particular, here is how to provide the two callbacks in our invocation of this method:

```
    $scope.deleteRow = function() {
        var currentItem = $scope.currentItem;
        $scope.scientists[currentItem].remove(
            function(deletedObject, headers) {
                $scope.scientists.splice(currentItem, 1);
                $scope.scientistsLength = $scope.scientists.length;
            }, function(err) {
                console.log("error: " + err.data.message);
        });
    }; 
```

The basic call looks looks like this:

    $scope.scientists[currentItem].remove(successCallback, errorCallback);

In our success callback we use the JavaScript **splice** function to remove the item from our local copy of the data. We also track the current number (length) of documents held on the client side.
        
[ang-res]:https://docs.angularjs.org/api/ngResource/service/$resource

## Step Seven {#step-seven}

Here is how to update the document.

From **control.js**:

```javascript
$scope.updateRow = function() {
    var indexOfItemToUpdate = $scope.currentItem;
    $scope.scientists[indexOfItemToUpdate].firstName = $scope.firstName;
    // You write the code to handle lastName and subject.
    $scope.scientists[indexOfItemToUpdate].updateDocument(function(data) {
        console.log("success: " + data);
    }, function(err) {
        console.log("Error Status: " + err.status + ' ' + err.data.message);
    });
};
```

On success, the method shown above writes out something like this to the console:

    success: [object Object]

Change the code so that it writes out the first and last names of updated scientist, along with his subject.

From **resources.js**:

```javascript
scientists.prototype.updateDocument = function (successCallback, errorCallback) {
    console.log("update called");
    var idObject = {id:this._id.$oid};
    var updateData = angular.extend({}, this, {_id:undefined});
    scientists.update( <PASS IN THE APPROPRIATE PARAMETERS> );
};
```

The call to **scientists.update** takes four parameters:

- An object specifying the ID of the document to update
- An object specifying the new values for the document
- A success callback
- An error callback

Remove the text in angle brackets and pass in the four parameters instead. 

Notice the call to **angular.extend**.   We are using an angular utility called 
**extend** to combine the second and third parameters without changing either of them.

**NOTE**: *My description of **angular.extend** is a rare case of me actually 
writing a comment on my code. The problem here is that **angular.extend**
is so poorly named that there is no way to tell what it does, even when looking at
in use.*

## Turn it in

Push your working program to your repository and submit it in the usual manner. Please include two screen shots, one where your program displays one row of data and one in which it displays three rows of data.


## Additional Information


REST (Representational State Transfer) is a protocol for making stateless client-server requests over HTTP. Let's break that down:

- Stateless: There is no memory of a request after it is made. The server should not go into a particular state when you make a request. It should simply perform the action then return to a default state. For instance, we could delete a record. After the deletion, the record is gone, but no other changes are made to the state of the server. For instance, it is does not "remember" what record was deleted, or even that there was a delete request. 
- Client Server: Requests are made from our client to our server. Specifically, in our case, they are made from our HTML/CSS/JavaScript app running in our web browser to our nodejs express server.
- HTTP: We use the same protocol used to request pages in the browser. Explaining HTTP is beyond the scope of this assignment, but it is perhaps helpful to understand that it is a text based protocol built on top of TCP/IP. For instance, when we browse to **http://www.google.com** we are making an HTTP request. In particular, this means that REST requests are made in the form of URIs. For instance, a request to delete a document with an **id** of 3 might look like this: **localhost:30025/delete?id=3**. 




