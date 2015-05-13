## Description

Our goals are two fold:

- Create an application that can either use:
    -  a mock **SimpleScienceData** object 
    -  the Mongo based  **ScienceResource** object.
- Show how to use ExpressRoutes to retrieve HTML
    - And dynamically insert the results into our documents
- Appending methods dynamically to an existing object.
    - We add new methods to the objects in our array of data
- Show how to use ControllerAs in a **directive**
- Learn more about querying with the **$resource** object and its custom URLs.
- Mostly for fun, but also because it can be useful during development, lets have some of our tests be part of the our running program.


## Step One

Download the starter project.

Note that it is similar to the project we used on Monday but we have renamed some methods in ScienceFacade to bring them in line with the Angular $resource object that uses MongoDb. In the list below, the original method name is on the left and the new name on the right: 

- getAll -> query
- delete -> remove
- update -> updateDocument

We have also added a method called **assignMethods**. Its purpose is to ensure that each list we create has certain methods available on it. Again, we do this to maintain compatibility with Angular resource. 

A few additional changes were made.

## Step Two 

Routing

When we send a request from the client back to the server, it is routed to the appropriate method using the **express Router**. See, for instance, **routes/index.js**. Place the following in **index.js**:

```
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  res.render('ScienceInfo/' + req.params.id, { title: req.params.id });
});

``` 

Create a new folder called: **views/ScienceInfo**. Place three files in it:

astronomy.jade:

```
h1 Astronomy

p Astronomy is a subject
```

physics.jade:

```
h1 Physics

p Physics is a subject
```

radioactivity.jade:

```
h1 Radioactivity

p Radioactivity is a subject
```

We can see the result of our new route by entering the following URL in our browser:

    localhost:30025/astronomy
    localhost:30025/physics
    localhost:30025/radioactivity 

In order to invoke those routes from our program, we place the following method in our controller:

```
        myController.loadDocument = function() {
            $http.get('/' + myController.subject.toLowerCase())
                .success(function(document, status, headers, config) {
                    myController.document = $sce.trustAsHtml(document);
                })
                .error(function(data, status, headers, config) {
                    alert("Somethings wrong")
                });
        }
```

The above code uses the angular **$http.get** method to send the request to the server. This is known as **ajax**. The method has parallel in **jquery** called **$.ajax**.

In our controller, you should call **loadDocument** at the end of the callback found in **loadScientists** and at the end of **indexChange**. In other words, when those two functions are called, they should ensure that loadDocument is called. This way we can see the document associate with each of our scientists.

## Step Three

The **directive**.

Appended at the bottom of **Control.js**: 

```
    app.directive('elfMarie', function(scientists) {
        return {
            controller: 'MyController',
            controllerAs: 'myController',
            template:
            'First: {{myController.marie.firstName}} ' +
            '<br>Last: {{myController.marie.lastName}}' +
            '<br>City: {{myController.marie.subject}}'
        };
    });
 ```

## Step Four

The latest version of MongoDb Angular Resource. Put it in the **public/javascripts** folder and name it **ScienceResource.js**. (In MongoCrud, we called it **resource.js**. We have refactored the name, and modified it slightly. In particular we added the **getTopic** method.)

```
angular.module('Science', ['ngResource'])

    .constant('CONFIG', {
        DB_NAME: 'elvenlab01',
        COLLECTION: 'scientists',
        API_KEY: 'qfSxFoUGHBA1EuUlqhux_op2fy6oF_wy'
    })

    .factory('scientists', function ($resource, CONFIG) {
        console.log('Scientists factory called');

        var scientists = $resource(
            'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
            '/collections/' + CONFIG.COLLECTION + '/:id', {
                apiKey: CONFIG.API_KEY
            },
            {
                update: {method: 'PUT'}
            });

        scientists.prototype.getTopic = function(firstNameToFind, callback) {
            bar = $resource(
                'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
                '/collections/' + CONFIG.COLLECTION, {
                    apiKey: CONFIG.API_KEY,
                    q: {"firstName": firstNameToFind }
                });
            return bar.query({}, callback);
        };

        scientists.prototype.getFirstName = function () {
            return this.firstName;
        };

        scientists.prototype.getLastName = function () {
            return this.lastName;
        };

        scientists.prototype.getSubject = function () {
            return this.subject;
        };


        scientists.prototype.add = function(newData, callback) {
            var scientistResource = new scientists(newData);
            scientistResource.$save(callback);
        };

        scientists.prototype.updateDocument = function (successCallback, errorCallback) {
            console.log("update called");
            var idObject = {id: this._id.$oid};
            var updateData = angular.extend({}, this, {_id:undefined});
            scientists.update(
                idObject,
                updateData,
                successCallback,
                errorCallback);
        };

        scientists.prototype.remove = function (successCallback, errorCallback) {
            scientists.remove({id:this._id.$oid}, successCallback, errorCallback);
        };

        return scientists;
    });
```

## Step Five

Now lets test dependency injection. In **layout.js**, swap out

## Turn it in

Check your final working program into your repository in a folder called **Week06-TestLive02**. Press the submit button for the assignment and add a comment or two as appropriate.


## Discussion

Notice the call to getTopic:

```
   scientists.prototype.getTopic = function(firstNameToFind, callback) {
       bar = $resource(
            'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
            '/collections/' + CONFIG.COLLECTION, {
                 apiKey: CONFIG.API_KEY,
                 q: {"firstName": firstNameToFind }
             }
     );
     return bar.query({}, callback);
```

Go to the Network page in the Chrome Developer tools and see the URL this creates. Run the URL in the address bar of your browser.  