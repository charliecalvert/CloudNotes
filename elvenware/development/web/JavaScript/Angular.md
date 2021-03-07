# Angular

In this page we cover some facts about Angular and Jasmine.

- [Angular](http://www.angularjs.org/)
- [Jasmine](https://github.com/jasmine/jasmine)

## Getting Started

Conside the following simple Angular template:

```html
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">        
        <title>Angular Starter Add</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
    </head>
    <body ng-app>
        <h1>Angular Starter Add</h1>

        <p>5 * 7 = {{5 * 7}}</p>

    </body>
</html>
```

The file shown here looks like HTML at first, but there a odd bits of syntax.  Notice, for instance, these two bits of syntax:

- ng-app
- {{5 * 7}}

These two bits of syntax indicate that this is not raw HTML. Instead, it is an angular **template**.

Nomenclature:

-   The File shown above: an Angular **template**.
-   **ng-app**: It is both an HTML **attribute** and an Angular **directive**
-   {{5 * 7}}: Those double curly braces are called Angular **expressions**.

We often write **data-ng-app** in order to conform with the rules of HTML5. Both **ng-app** and **data-ng-app** work.

## Declaring Controllers

Put your controllers inside the scope of a particular module. Often, we us DOT notation:

```javascript
angular.module('myApp', []).controller('myController', function() { });
```

However, the following equivalent syntax is also common:

```javascript
var myApp = angular.module('myApp', []);
myApp.controller('myController', function() { });
```

Here is a more complete example:

```javascript
angular.module('myApp', []).controller('MileController', function($scope) {
    $scope.hint = "Enter a number of miles";

    $scope.miles = 0;

    $scope.convertMilesToInches = function() {
        return $scope.miles * 5280 * 12;  
    };    
});
```

The same code, but using **controllerAs**:

```javascript
angular.module('myApp', []).controller('MileController', function() {
    mileController = this;
    mileController.hint = "Enter a number of miles";

    mileController.miles = 0;

    mileController.convertMilesToInches = function() {
        return $scope.miles * 5280 * 12;  
    };    
});
```

When you declares controllers like this, then you want to use the
**module** call in your Jasmine unit tests:

```javascript
beforeEach(module('myApp'));

beforeEach(inject(function($rootScope, $controller) {
	mileController = $rootScope.$new();
	$controller('MileController', { $scope: mileController });
}));
```

## Loading JavaScript

Suppose you are loading two files:

```html
<script src="index.js"></script>
<script src="draw-machine.js"></script>
```

In **index.js** we create a module:

```javascript
var app = angular.module('elvenApp', []);
```

We can tell we are creating the module because we include the (empty) list of dependencies as a second parameter. These are the square brackets.

When **draw-machine.js** loads, it uses the loaded module:

    angular.module('elvenApp')

We can tell we are using, rather than creating, the module because it has no second paramter.

For obvious reasons, we have to load **index.js** first since it creates the module that is used in **draw-machine.js**. We can't use the module until we have created it, therefore we need to load the file that creates the module first. We need to create (instantiate) the module before we can use it.

## CheckList

The following items need to be completed to create a "Hello World" with
HTML and JavaScript controller.

- In HTML or Jade
    - ng-app="elvenApp"
    - ng-controller
- In JavaScript
    - Declare module, don't forget dependencies    

Those are the steps. Now lets show the code.

In HTML or Jade:

```html
 body(ng-app="elvenApp")
 #myController(ng-controller="MyController as myController")
    p {{myController.foo}}
```    

In JavaScript using ControllerAs:

```javascript
var app = angular.module('elvenApp', []);

app.controller('MyController', function($scope) {
    var myController = this;
    myController.foo = 'Bar';
});
```

## DOM Manipulation

The general rule is fairly simple:

- Let Angular manipulate the DOM
- If you must manipulate the DOM, do it in a directive
- [JsObject Directive Example](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/AngularDirective)
- [Directives](http://docs.angularjs.org/guide/directive)


## Directives

Directives allow you to enrich the HTML language. Some people are designers, and others are developers. If you are developer, you can create directives. If you are designer, you can consume or use directives.

A developer can expand the richness of HTML. By creating a new directive, you can make HTML more expressive. Simply add a new tag to your HTML template, and that page will now have a new ability. For instance, you could add a single tag to a page and thereby give it the ability to edit standard address records, or track hits on the page.

Here is a simple directive:

```
app.directive('bar', function() {
    return {
        link: function() {
            console.log('bar')
        }
    };
});
```

This directive assumes there is a variable app that references a module. In other words, it assumes that somewhere there is code that looks something like this:

    var app = angular.module('foo', []);

After linking in the above directive, you can log the word **bar** to the console by adding this to your HTML:

```
    <div bar>
    </div>
```

This would also work:

```
    <bar></bar>
```

Suppose your controller had this declaration in it:

```JavaScript
$scope.marie = {
    firstName: 'Marie',
    lastName: 'Curie',
    city: 'Paris',
    country: 'France'
};
```

You could then write code like this:

```javascript
app.directive('elfMarie', function() {
    return {
        template: 'First: {{marie.firstName}} ' +
            '<br>Last: {{marie.lastName}}' +
            '<br>City: {{marie.city}}'

    };
});
```

To consume the directive, the designer could use either of the options demonstrated here in an HTML template:

```html
<div elf-marie></div>

<div>
   <elf-marie></elf-marie>
</div>
```

The result would be output that displayed the firstName, lastName and city for Marie Curie.

Here is another way to think about this whole process. HTML is a declarative language. It states *what* you want to do, not *how* you want to do it. By putting the *how* in directives, you can minimize the complexity of your code. You are pushed toward the pit of success. You are encouraged to write declarative code that has few or no dependencies.

## Scope

The scope in Angular is a means of working with the templates in our HTML. If we were using jQuery, we might write code like this in a Controller to update and track code in an input control:

```javascript
$('#foo').val('bar');
var userInput = $('#foo').val(); // Yields string bar
```

In the simplest, most reductive possible terms, that is what scope does for you. In Angular html templates we write something that might include this code:

	<input type="text" ng-model='foo'>

In our Angular controllers, we write:

```javascript
$scope.foo = 'bar'
```

This is another way of writing the first jquery statement shown above. Here is a way to write the second:

```javascript
var userInput = $scope.foo;
```

Now lets talk about buttons and clicks.

In jQuery we write:

```javascript
$('#myButton').click(function() {});
```

In Angular we write something like this in the HTML:

```html
<button ng-click('buttonHandler()')>My Button</button>
```

And then in the controller:

```javascript
$scope.buttonHandler = function() {};
```

Calling Methods in Factories
----------------------------

Let's go back to the basic examples found here:

[Angular Modules](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/AngularThreeModules04)

Look at the code for the main module:

```javascript
angular.module('elvenApp', ['tools'])
.controller('BoatController', function($scope, boat, sailboat) { 'use strict';
	$scope.simple = "Simple Boat";
	$scope.boatType = boat.getDescription();
	$scope.sailBoat = sailboat.getDescription();
	$scope.getNine = function() {
		return sailboat.getNine();
	};
});
```

As you can see, we are calling several function that are located in our factory. For instance, we are calling getDescription and getNine.

Here are the implementations for the factories:

```javascript
angular.module('tools', [])
.factory('boat', function() {  'use strict';
	this.Boat = (function() {
		var description = "I'm a boat.";

		function Boat() {

		}

		Boat.prototype.getDescription = function() {
			return description;
		};

		return Boat;
	})();

	return new this.Boat();
})
.factory('sailboat', function() { 'use strict';
	this.SailBoat = (function() {
		var description = "I'm a sailboat";

		function SailBoat() {

		}

		SailBoat.prototype.getNine = function() {
			return 9;
		};

		SailBoat.prototype.getDescription = function() {
			return description;
		};

		return SailBoat;
	})();

	return new this.SailBoat();
});
```

All that was really needed to make this work was:

1) Factory code that compiled and was well formed.
2) Controller code that used the tools module, and that injected instances of the objects found in the tools mod:

```javascript
angular.module('elvenApp', ['tools'])
.controller('BoatController', function($scope, boat, sailboat) { 'use strict' ...});
```

Once we have included the **tools** module, then we can easily inject the two factories called **boat** and **sailboat**. Now we can call methods on those objects:

```javascript
boat.getDescription();
sailBoat.getNine();
```

## Select

Set it up like this:

```javascript
$scope.chartSelect = {
    "type": "select",
    "name": "Service",
    "value": "PieChart",
    "values": [ "PieChart", "BarChart", "ColumnChart",
         "AreaChart", "LineChart", "Table"]
};
```

The HTML should look like this:

```HTML
<select ng-model="chartSelect.value"
     ng-options="v for v in chartSelect.values" ng-change="chartTypeUpdate()">
</select>
```

## HTTP {#http}

One important part of any REST based web application is sending data from the client to the server and responding to that data. Let's consider an Angular program that uses:

- HTML, CSS, and JavaScript on the client.
- Node and Express on the server
- MongoDb in the database

In particular, we send queries:

- From the browser
- To our express program
- And from our express program
- To a database

Then a response is sent back

- From the database
- To the express program
- From the express program, back to our client side browser.

To better understand that process, let's look at code that allows user to add comments on a particular subject. In particular, we want to add a new comment to an array of comments. This array is a property of a larger object called a scientist.

- A scientist has fields such as **firstName**, **lastName** and **comments**
- The comments are an array of objects containing the text of the comment and the date when the comment was made.

 We want to look at a method called **newComment** which is part of a larger object called **mongoFactory**. We will look only at the **newComment** method and ignore the rest of the factory.

**newComment** takes two parameters, the text for a **comment**, and a **scientist** object to which the comment will be appended:

```javascript
newComment: function(scientist, text) {
    var comment = {
        commentText: text,
        date: new Date().toJSON().slice(0, 10)
    };
    if (scientist.comments === null) {
        scientist.comments = [];
    }
    var payLoad = {scientist: scientist, comment: comment};
    $http.post('/newComment', payLoad).success(function(result) {
        console.log(result.data.comments[result.data.comments.length - 1]._id);
        scientist.comments.push(result.data.comments[result.data.comments.length - 1]);
    }).error(function(err) {
        console.log(err);
    });
},
```

This method takes the **scientist** and **comment** and sends them to the server. The server combines this information into a single **scientist** object and sends it to the database for storage. A confirmation response is then relayed back to the client.

But let's stay on the client side for now.

The key lines in this client side code are found here:

```javascript
var payLoad = {scientist: scientist, comment: comment};
$http.post('/newComment', payLoad).success(function(result) { ... });
    etc...
```

Here we see how to create a single object called **payload** that contains two properties each of which are themselves objects. We want to send the **payload** object from the client to the server. We use the angular **$http.post** method to send the information.

**NOTE**: *The **$http.post** method and the jQuery **$.ajax** method are very similar. The big difference is that **$http.post** knows how to handle two way binding in angular.*

Here is a deeper look at the payload object. It has two properties:

```javascript
var payLoad = {
    scientist: scientist,       // A scientist with a firstName, lastName, etc...
    comment: comment    // A comment about the scientist with date and text
};
```

More specifically, the scientist object looks like this:

```javascript
var newScientist = new scientists({
        "firstName": scientist.firstName,
        "lastName": scientist.lastName,
        "subject": scientist.subject,
        "subjects": scientist.subjects,
        "comments": scientist.comments
});
```

The comment like this:

```javascript
var comment = {
    commentText: text,
    date: new Date().toJSON().slice(0, 10)
};
```

As you can see, we are passing a reasonable amount of data back to the server. How is this accomplished? The **$http.post** method built into angular takes two parameters:

- The uri designating the route for our code: **'/newComment'**.  
- The data we want to send to the server. In this case the **payload** object.

Here they are:

```javascript
$http.post('/newComment', payLoad).success( ... ) etc....
```

In addition, the **$http.post** method provides two callbacks, one for success, and one for failure.  They handle the results of the request. I'm not going to say anything more about those methods at this point, as the code in them should be easy enough to understand.

The call to **$http.post** causes information to be sent from the browser to the server. The call is sent using the HTTP protocol. This is the protocol that drives the web, and it is primary means of transporting information between machines in REST based programs.

Here is the node express code on the server side that receives our **payload** object sent by the call to **$http.post**:

```javascript
router.post('/newComment', function(request, response) {
    if (!connected) {
        doConnection();
    }

    console.log('newComments called. Body is next: ');
    console.log(request.body);
    var scientist = request.body.scientist;
    var comment = request.body.comment;

    scientists.findOne({"_id": scientist._id }, function(err, scientist) {
        console.log('After Find.');
        console.log(scientist);
        if (scientist.comments) {
            scientist.comments.push(comment);
            scientist.markModified('comments');
            scientist.save(function(err, data) {
                console.log('After save.');
                console.log("Error:", err);
                console.log("Data: ", data);
                response.send({result: 'Success', data: data});
            });
        } else {
            response.send({result: 'Error'});
        }
    });
});
```

First we check to be sure we are connected to our mongodb database. The next order of business is to ensure that we can parse the **payload** sent by the client. That object is found in the built-in **body** property of the express **request** object:

```javascript
console.log(request.body);
var scientist = request.body.scientist;
var comment = request.body.comment;
```

This code first sends some debug information to the console to help us confirm that all is working as expected. Then we parse out the **scientist** and **comment** objects sent from the client.

Next we find the existing record in the database to which we want to append the comment:

```javasscript
scientists.findOne({"_id": scientist._id }, function(err, scientist) {
```

**NOTE**: _It appears that we are only using the **_id** field of the scientist object, so it probably would have been possible to send that field alone, rather than the whole scientist object._

Once we have found our scientist, we add our comment to its collection:

    scientist.comments.push(comment);

Then we send the updated scientist back to the database:

```javascript
scientist.save(function(err, data) {
        response.send({result: 'Success', data: data});
});
```
The call to **response.send** relays the response from the database back to the client where it is handled by the **success** callback mentioned earlier.

To review, we send our **payload** data:

- From the client (the browser)
- To the server (our express program)
- To the database (mongodb on mongolab in our case)

Then confirmation messages are sent back

- From mongodb to the server
- From the server to the client

And so on, endlessly, across the entire web, call by call, program by program, millions of such calls are going across the internet every day, driving our economy, enhancing our social lives, communicating knowledge and information. Understanding this process is crucial to your understanding of web development. These kinds of operations are the very essence of a REST based application.

References:

- [Mongoose SubDocuments Assignment][subdoc]
- [Mongoose Comments Assignment][mongoComment]

[subdoc]: http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseSubdocuments.html
[mongoComment]: http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseComments.html

Jasmine Matchers
----------------

There are many Jasmine matchers.

You can look for an exact match like the === operator:

```javascript
it("expects 1 + 1 to equal 2", function() {
	expect(1+1).toBe(2);
});
```

For a less precise match like the == operator:

```javascript
it("expects 1 + 1 to equal 2", function() {
	expect(1+1).toEqual(2);
});
```

Or a more forigiving match for floating point numbers:

```javascript
it("1.799 is close to 1.8", function() {
	expect(1.799).toBeCloseTo(1.8);
});
```
Here are some of the more important Jasmine matchers and a hopefully
reasonable effort to define what they do:

- **toBe**: This is very precise, like using ===.
- **toBeDefined**: Is it not **undefined**
- **toBeCloseTo**: Compare two floating point numbers.
- **toBeFalsy**: Is it **false**, an empty string, null, undefined, etc
- **toBeGreaterThan**: Is one number larger than another number
- **toBeLessThan**: Is one number less than another
- **toBeNull**: Test for null
- **toBeUndefined**: Is the value "undefined".
- **toBeTruthy**: Is it **true** or something equivalent.
- **toContain**: Search an array for a value
- **toEqual**: Less precise than **toBe**, like using == rather than ===
- **toMatch**: Compare strings with regular expressions
- **toThrow**: Does an expression throw an exception?

Use toThrow Matcher
-----------

Sometimes you want to prove that trying to do some particular action
will raise an exception. Jasmine has the **toThrow** matcher to
handle these cases. When calling **toThrow** there is a bit of a gotcha.
To get over this hurdle, you have to use a an anonymous function, as
shown below.

Consider this example. We have a method called **tryToCallNew** which is
set up to always thrown an exception. To use **toThrow** we must create
an anonymous function, call **createError** and test if it returns the
error we expect:

```javascript
function createError() {
    try {
        throw new Error("Intentional error");
    } catch(e) {
        throw new Error('error');
    }
}

it("throws an exception", function() {        
    expect(function() { tryToCallNew(); }).toThrow(new Error('error'));
});
```

Even though the method created throws an error, our test passes.

Let's do the same thing, but cause the error a different way:

```javascript
var objectMethod = {
    a: 1
};

function tryToCallNew() {
    try {
        new objectMethod();
    } catch(e) {
        throw new Error('error');
    }
}

it("cannot be used with new", function() {        
    expect(function() { tryToCallNew(); }).toThrow(new Error('error'));
});
```

You can't call new on object like the one we created. So our attempt
to do so raises an error. But our test passes because it expects the
attempt to raise the error.

Here is another example of how to use **toThrow**. In this case, we
assume that calling **new objectMethod()** raises a **TypeError** because
**objectMethod** is not a function:

```javascript
it("cannot be used with new", function() {        
    expect(function() { new objectMethod(); }).toThrow(new TypeError('object is not a function'));
});
```

Unit Test Names
---------------

I'm belatedly realizing that we can establish better naming
conventions in our unit tests.

We don't seem to be using this variable:

```javascript
var pc = null;
...
pc = $controller('MileController', { $scope: npcController });
```

So we can just eliminate it:

```javascript
$controller('MileController', { $scope: npcController });
```

There is usually a better name for $mockScope:

```javascript
var $mockScope = null;
...
$mockScope = $rootScope.$new();
$controller('MileController', { $scope: $mockScope });
```

We can call it mileController in a case like this, since that is
what it ends up holding:

```javascript
var mileController = null;
...
mileController = $rootScope.$new();
$controller('MileController', { $scope: mileController });
```

Dialogs in Unit Tests
---------------------

We can handle that $dialog in a way slightly different from the one
I outlined to you. Here is what I suggested before:

```javascript
describe("mycontrollertest", function() {'use strict';
    var npcController = null;    
    var $dialog = null;

    beforeEach(inject(function($rootScope, $controller) {
        npcController = $rootScope.$new();
        pc = $controller('NPCController', { $scope: npcController, $dialog: $dialog });
    }));

    ...

})
```

Apparently we can do this:

```javascript
describe("mycontrollertest", function() {'use strict';
    var npcController = null;


    beforeEach(inject(function($rootScope, $controller) {
        npcController = $rootScope.$new();
        pc = $controller('NPCController', { $scope: npcController, $dialog: null });
    }));
});
```

In this example I declare $dialog to be null, and I don't need to declare it as global to our object.

###Some Basic Mocking {#basicMock}

Here are some tests that provide the first instance we have seen of
creating a mock object:

```javascript
beforeEach(inject(function($rootScope, $controller) {
	gameBoard = $rootScope.$new();
	gameEventService = { towerBroadcast: function() { return true; } };
	elfgameService = $rootScope.$new();
	$controller('GameBoard', {
		$scope: gameBoard,
		gameEventService: gameEventService,
		elfgameService: elfgameService
	});
}));
```

Notice this line from the code shown above:

```javascript
gameEventService = {
	towerBroadcast: function() { return true; }
};
```

This code mocks our event service by simply returning true rather than
actually send the message. This line looks as though it is retreiving
a real gameEventService object, but it just using our mock:

```javascript
$controller('GameBoard', {
	$scope: gameBoard,
	gameEventService: gameEventService,
	elfgameService: elfgameService
});
```

Now we can write tests that depend on making calls to the **towerBroadcast**
method of our **gameEventService**:

```javascript
it("Check ElfGame Width", function() {
	var actual = elfgameService.reportEvent();
	expect(actual).toEqual(true);
});
```

This code calls **reportEvent** which in turn calls **gameEventServer.towerBroadcast**.

###JSON from Server {#jsonFromServer}

Here is how to retrieve JSON from a server.

```javascript
var getDataJson = $http.get('data.json');

getDataJson.success(function(data, status, headers, config)  {
	$scope.data = data;
});

getDataJson.error(function(data, status, headers, config) {
	throw new Error('Oh no! An Error!');
});
```

- [Example](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/JsonFromServer)
- [Key File](https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/JsonFromServer/index.js)

###Validating Angular HTML

- [reference](http://stackoverflow.com/a/16184477/253576)

Angular Starter Projects
--------------------------

In JsObjects on GitHub, there are several starter project for
working with Angular, MongoDb, Karma, Jasmine and Grunt. These
projects are quite useful as they will help you get over the fussy
coding required to get all your tools in place.

- [AngularMongoBootstrap](https://github.com/charliecalvert/AngularMongoBootstrapTest)
- [AngularKaram](https://github.com/charliecalvert/AngularKarma)
- [AngularTest](https://github.com/charliecalvert/AngularTest)

If you use these projects a few times, you should soon reach the
state where you can pull one down, and start Grunt JsHint, and Karma
continual testing in less than a minute. The projects ship with
sample unit tests, but you might even be able to add your first new
unit test in that time. They provide a great jump start for people
who have a moderate knowledge of how to create and test projects using
Angular, Jasmine, Karma and Grunt with JsHint.

Elf Ruble and Angular
---------------------

There is an add on (a Ruble) for Aptana that will allow you to create
Elven Angular Projects and other things. See the ReadMe for details:

- [Elf Ruble README](https://github.com/charliecalvert/ElfRuble/blob/master/README.md)

Angular Git Starter Projects in Aptana
--------------------------

There is a second way to get the projects that are stored in the Elf
Ruble. This sections describes how to pull them directly from GitHub.

You can use the projects described above via the File | New Web Site
command in Aptana Studio. When used that way, they act as new
Project Templates that extend the power of Aptana by allowing you
automatically create projects that support Angular, Jasmine, Karam,
Grunt and JsHint.

If you have not done so already, open up the HTML bundle in Aptana.
There are two possible ways to do this. Pick the one that works on
your system.

1. Commands | HTML | Edit this Bundle
2. Commands | Other | HTML | Edit this Bundle

It may take a moment, but eventually you should see a new folder
called HTML in your workspace.

Open the **templates** directory and find the file called
**project_templates.rb**. Paste the code shown below into the bottom
of it. Please note the line feed after the final end. That is needed
or the IDE will complain.

```javascript
project_template "Elvenware Angular Unit Test Project " do |t|
  t.type = :web
  t.tags = ['Web']
  t.icon = "templates/HTML5_Logo_64.png"
  t.id = "com.elvenware.project.template.web.html5"
  t.location = "git://github.com/charliecalvert/AngularTest.git"
  t.description = "Remote template. Requires network access."
  t.replace_parameters = false
  t.tags = ['Web']  
end

project_template "Elvenware Angular Jasmine Karma Project " do |t|
  t.type = :web
  t.tags = ['Web']
  t.icon = "templates/HTML5_Logo_64.png"
  t.id = "com.elvenware.project.template.web.html5"
  t.location = "git://github.com/charliecalvert/AngularKarma.git"
  t.description = "CSC Remote template. Requires network access."
  t.replace_parameters = false
  t.tags = ['Web']  
end

project_template "Elvenware Angular Mongo Bootstrap Project " do |t|
  t.type = :web
  t.tags = ['Web']
  t.icon = "templates/HTML5_Logo_64.png"
  t.id = "com.elvenware.project.template.web.html5"
  t.location = "git://github.com/charliecalvert/AngularMongoBootstrapTest.git"
  t.description = "CSC Remote template. Requires network access."
  t.replace_parameters = false
  t.tags = ['Web']  
end

```

Restart Aptana. Select **File | New | Web Project**. Select the
project called **Elvenware Angular Unit Test Project**. Create the
project as usually, filling in the name of the project. Run the
two HTML files and confirm that they work.

Note that the template for the project is stored on GitHub, so you
have to be connected for this to work. That's a drawback, but there
are obvious benefits to pulling from a repository that I can easily
update.

Since this project was pulled from GitHub, it includes a .git
folder. You should consider removing this folder if you do not want
to use git, or if this folder is embedded inside another git
repository.

After you have restarted Aptana, you can use these Project templates
to create new projects.

If you have some basic knowledge of Grunt and Karma, then you can
use these tools with these projects. To get started, run **npm
install** in the root directory for the project:

	npm install

Next, start Karma by typing **karma start**:

	karma start

Periodically, you should go to the command line in the root directory
for this folder and run **grunt jshint**.

	grunt jshint

You should then examine the **result.xml** file to look for any problems
in your code.

Also, read the **README.md** files for these projects.

##  Instructions for the Angular Three Assignment

*With thanks to Margie Calvert for helping to assemble this information.*

This exercise creates a very simple function inside an angular
module, then hooks it up appropriately with a controller, a unit
test, and an index page. It uses Charlie's Aptana Ruble to get
started.

- [Ruble](https://github.com/charliecalvert/ElfRuble/blob/master/README.md)

Use the Elvenware Angular Jasmine Karma project. This contains the
necessary files to run Karma on the code you generate, as you
generate it.

After you install the project in Aptana, set up the following files.


### FourModule.js file


Use a new JavaScript Template (File -> New From Template -> JavaScript -> JavaScript Template)
to create a blank javascript page. Call it FourModule.js and save it
in the Source directory of your project.

Use this code in the module:

```javascript
	angular.module("fourModule", [])
	.factory('fourFactory', function() {'use strict';
		return {
			getFour : function(){
			return 4;
			}
		};
	});
```

### TestMain.js file

Now set up the Unit Test. Go to TestMain.js, and make these changes:

Locate this line of code near the the top of the file.

```javascript
	describe("Test Main", function() {'use strict'; ... });
```

Create a variable called (var fourFactory = null;). This code will be
somewhere beneath this declaration: **var MainController = null;**

Then find the following lines of code:

	(beforeEach(function() {
		module('mainModule');
		// Insert your code here.

Inset the following: **module('fourModule');**

Scroll down past this code:

```javascript
	beforeEach(inject(function($rootScope,
		$controller, $injector) {
		mainController = $rootScope.$new();
		$controller('mainController', {
		    $scope : mainController
		      // Insert your code here
    });
  }));  
```

Type this:

	fourFactory = $injector.get('fourFactory');

Go below the }));  and type this code:

```javascript
it("gets the number four", function() {
	var actual = fourFactory.getFour();
	expect(actual).toEqual(4);
});
```

### karma.conf.js

Open up karma.conf.js, which is in the Tests folder. You will see something like this
after the first little bit:

```javascript
	files: [   
		'Library/angular.js',
		'Library/angular-mocks.js',
		'Tests/TestMain.js',
		'Source/Main.js',
		'Source/NewModule.js',
		'Source/EightModule.js',
		'Source/TenModule.js',
		'Source/OneModule.js',
		'Source/ThreeModule.js',
	],
```

Add 'Source/FourModule.js' to the list. I already added a few other modules, so your list will look
different.

### Main.js

Add the module into the list in the brackets. Any time you add a module,
add the name here. The first line will look something like this before you change anything.

```javascript
	angular.module('mainModule', ['newModule',
		'eightModule', 'tenModule',
		'oneModule', 'threeModule'])
```

In my code, I already added quite a few modules, which you will not
have. Don't forget to put the name of your module in quotes and
don't forget to use a comma to separate any modules in the brackets.

So now in my code it looks like this:

```javascript
	angular.module('mainModule', ['newModule',
		'eightModule', 'tenModule', 'oneModule',
		'threeModule', 'fourModule'])
```

The second line looks something like this:

```javascript
	.controller('mainController', function($scope,
		newFactory, eightFactory, tenFactory,
		oneFactory, threeFactory) { 'use strict';  ... });
```

Add fourFactory to the list.

```javascript
	.controller('mainController', function($scope,
		newFactory, eightFactory, tenFactory, oneFactory,
		threeFactory, fourFactory) { 'use strict'; ... });
```

The next line is

	$scope.name = "mainController";

Somewhere under that, put this code:

	$scope.getFour = fourFactory.getFour();

This is also where you would write a function for the
mainController. In my code things look like this:

```javascript
$scope.add = function(a, b) {
	return a + b;
};

$scope.getNine = newFactory.getNine();
$scope.getEight = eightFactory.getEight();
$scope.getTen = tenFactory.getTen();
$scope.getOne = oneFactory.getOne();
$scope.getThree = threeFactory.getThree();
$scope.getFour = fourFactory.getFour();
```

Then way at the bottom  you will see  });

### Code in index.html

Add this code in the &lt;head&gt;&lt;/head&gt; section:

```html
	<script src = "Source/FourModule.js"> </script>
```

In the body you will see a **div id** tag:

```html
<div id="textDisplay" data-ng-controller="mainController">
```

Below that, put your display instructions:

```html
<p>Get Four:  {{getFour}}</p>
```

Now try running index.html. It should show the results of your work.

## Using Karma

Karma is a wrapper around unit testing frameworks. It helps automate
the way we run our tests. It is commonly used with AngularJs. It
once had a name so absurd that I refuse to repeat it here. The name
change is fairly recent, so you may find references to the old name
here and there.

To install Karma:

	npm install -g karma

Test from command line to see if it is installed:

	>karma --version
	Karma version: 0.10.2

In the command terminal in Aptana, navigate to the directory where you have your project.
You will be starting in your Users/myName directory. So if the project is in the isit320
directory, you might have to cd to Documents/isit320/currentprojectfolder.

run

	npm install

and then type

	karma start

###Coverage

Code coverage let's you know what code in your program is not covered
by unit tests.

First install coverage tool, which is called [Istanbul](https://github.com/gotwarlost/istanbul):

	npm install -g istanbul

In some cases, you may already have a package.json that includes
karma-coverage, so just rerun npm install. However, of other projects,
you can install coverage and save a reference for it in your **package.json**
file by typing the following:

	npm install karma-coverage --save-dev

When you are done, you can open up **package.json** and find the entry
for **karma-coverage**.

Then you need to modify three parts of **karma.conf.js**:

- preprocessors
- reporters
- plugins

In the preprocessors section of **karma.conf.js**:

```javascript
preprocessors: {
  'Source/**/*.js': ['commonjs', 'coverage'],
},
```

When defining your coverage support, remember that it is up to you
to tell coverage where the files are that are being tested. You
don't have to point to the test files, just the files that are being
tested. For most of our programs, that means doing something like
this in the preprocessors statement:

	'Source/\*\*/\*.js'

When you get it right, you should see Coverage produce an HTML file
for each JavaScript file in your Source directory.

Add on support for your reports:

```javascript
reporters: ['progress', 'coverage', 'junit'],
```

And in your plugins at the bottom of karam.conf.js and in karam-coverage:

```javascript
plugins: [      
  'karma-jasmine',
  'karma-coverage',
  'karma-chrome-launcher',
  'karma-firefox-launcher',
  'karma-junit-reporter',
  'karma-commonjs'
]
```

The results end up in a folder called **coverage** in a series of
HTML files. Open the files in your browser.

![Coverage of Simpler Controller](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Coverage01.png)


## Grunt

You can also use Grunt to run jshint.

	grunt jshint

## Mocking Objects with $httpBackend

In this section we see if our program knows how to handle the data sent from the server. We never actually call the server. Instead, we simulate, or mock, the kind of data the server would send. We then see if our program handles it correctly. Our test, therefore, is not of the server itself, rather, it is a test of how our program handles the data once it gets it.

This concept is so important, that I'm going to state it again in a slightly different way. Unit tests with [**$httpBackend**][hbend] allow us to write mock tests that confirm that a particular method properly handles the type of data that might be returned from a server. This process does not test if the server is working correctly. Instead, it tests whether our program can handle the data the server will send when it is working correctly.

It is, of course, still important to test if your server is working correctly. It is just that a unit test is not the right place to make such a confirmation. To test if the server is working correctly, you should write an *integration test* or *end to end test*, not a *unit test*. For completeness sake, you need not only create and run unit tests, but also end to end and integration tests. But as developers, we are most interested in unit tests.

Most testing frameworks provide a means of handling mock objects.  The implementation of mock objects found in **$httpBackend** is simply Jasmine's way of performing this common task. The most important thing to do is understand the concept behind these kinds of test. Once you understand that concept, then it should be relatively easy to understand any one implementation.

**NOTE**: *I would say that understanding this kind of unit test and why it is helpful took me longer to grasp than almost any other concept in programming. Part of the problem is that there traditionally has not been much good information on this subject in the JavaScript community. However, the tide is turning. Now that a few leaders have clearly explained this concept, I'm starting to see more and more reasonable explanations of why mocking data sent from a server is useful to developers. It is not that hard to understand once you get over a few preliminary hurdles. I will, add, however, that this is one of those subjects you don't want to understand too quickly. I, at any rate, found that I thought I understood it well before I actually started to understand it. There are many subtleties in this relatively arcane art, so I'm sure I will be learning more about mocking and testing data for years. That is one of the reasons the subject is so interesting, and so challenging.*

**NOTE**: *Don't forget that there is a wealth of information on unit testing in other languages available in book form. Certainly one key book is Kent Beck's Test Driven Development. Other important books include Clean Code by Uncle Bob Martin and Refactoring by Martin Fowler.*

Here is a stripped down example of using $httpBackend in a JavaScript program:

```javascript
var $httpBackend = null;

beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
}));

afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
});

it("Test load json hitPoints", function() {
    $httpBackend.expectGET('data.json').respond({
        "name": "NPC01",
        "hitPoints": 37,
        "damage": 5});
    myController.loadJson();
    $httpBackend.flush();
    expect(myController.data.hitPoints).toEqual(37);
});
```

Calls to **expectGET** or **whenGET** give you a chance to mock up the data that a real call to the server might produce.

Then we call the function that actually performs the action we want to test:

    myController.loadJson

Finally, we call **flush** in order to simulate the reply returning from the server with our requested data. At that point, we are ready to see if the data sent back is what we expected.

More examples are found on JsObjects. For instance, here are some mocking Mongo Data examples:

- [MongoLab01](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoLab01)
- [MongoLab02](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoLab02)
- [MongoLab03](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoLab03)

Here are few places where I provide additional examples of how to do this:

In [JsObjects/JavaScript/UnitTests/SimpleHttpBackend][shbe]:

- [main-spec][shms]

In [JsObjects/JavaScript/Design/JsonFromServer02][jfs]

- [TestJsonLoader][tjl]

In [JsObjects/JavaScript/Games/CharacterCreate02][cc02]

- [TestMongoTower][tmt]
- [TestConflict][tcon]

[hbend]:https://docs.angularjs.org/api/ngMock/service/$httpBackend
[shbe]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/SimpleHttpBackend
[shms]:https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/UnitTests/SimpleHttpBackend/test/spec/controllers/main-spec.js
[jfs]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/JsonFromServer02
[tjl]:https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/JsonFromServer02/Test/TestJsonLoader.js
[cc02]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/CharacterCreate02
[tmt]:https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Games/CharacterCreate02/Tests/TestMongoTower.js
[tcon]:https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Games/CharacterCreate02/Tests/TestConflict.js
