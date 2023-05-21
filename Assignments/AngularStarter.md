---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AngularStarter.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: AngularStarter.md
relativePath: /AngularStarter.md
title: AngularStarter
directoryName: Assignments
category : assignments-guide
---

## Angular Starter

Two simple angular projects.

Be sure that Python is on your path. It should be in **C:\Python34**.

## Step One

Create folder called **Week03-AngularStarter-Add**. Inside it, save the following as **index.html**:

```html
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Angular Starter Add</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
    </head>
    <body data-ng-app>
        <h1>Angular Starter Add</h1>

        <p>5 * 7 = &#123;&#123;5 * 7&#125;&#125;</p>

    </body>
</html>
```

The file shown here looks like HTML at first, but there a odd bits of syntax.  Notice, for instance, these two bits of syntax:

- data-ng-app
- &#123;&#123;5 * 7&#125;&#125;

These two bits of syntax indicate that this is not raw HTML. Instead, it is an angular **template**.

Nomenclature:

- The File shown above: an Angular **template**.
- **ng-app**: It is both an HTML **attribute** and an Angular **directive**
- &#123;&#123;5 \* 7&#125;&#125;: Those double curly braces are called Angular **expressions**.

We often write **data-ng-app** in order to conform with the rules of HTML5. Both
**ng-app** and **data-ng-app** have the same meaning and work in most browsers.
A syntax checker will choke on **ng-app**, but will approve **data-ng-app**

## Step Two

We now want to view our work in a browser. I would prefer that you launch this
file, and all files we create, from a web server rather than from the file
system. For details on the difference, see [this section on
Elvenware][serve-file].

On Cloud Nine open your file in the editor and press the green Run button. A window will open with contents similar to the following:

  Starting Apache httpd, serving <https://prog219-calvert-2016-ccalvert.c9users.io/Foo/foo.html>.
  Started apache2

Left click on the URL and choose and **open** or **open in preview**.

If you are running on Pristine Lubuntu, Windows or some other OS, then take a
slightly different approach. In the same directory as you HTML file, create a
batch file called **StartPythonWebServer.bat** or a shell script called
**StartPythonWebServer**. Place the following in your inside it:

```bash
python3 -m http.server 30025
```

Run the batch file and browse to [http://localhost:30025](http://localhost:30025).

[serve-file]: http://elvenware.com/charlie/development/web/HtmlGuide/GettingStarted.html#serve-file

## Step Three

Make the application interactive by allowing user input.

Here is how to create an input control:

```html
<input type="number" data-ng-model="operandA"  min="1" max="100" placeholder="0">
```

Here is how to use the **ng-model** declared in the input control:

```html
<p>5 * 7 = &#123;&#123;operandA * 7&#125;&#125;</p>
```

The model declared in the input control now appears automatically in the

Fiddle with it until entering 2 and 5 in the input controls yields this output:

```math
2 * 5 = 10
```

Reference:

- <https://docs.angularjs.org/api/ng/input/input%5Bnumber%5D>

## Step Four

Create a folder called **Week02-AngularStarter-Lists**

If necessary, inside the folder put your **StartPythonWebServer** file. Also add the following as **index.html**:

```html
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Angular Starter Lists</title>
        <script src="bower_components/angular/angular.js"></script>
    </head>
    <body ng-app="main">
        <h1>Angular Starter Lists</h1>

        <p>Enter a name and I will add it to our list.</p>
        <input type="text" ng-model="listItem"  placeholder="Enter list item name">

        <p>You entered: &#123;&#123;listItem&#125;&#125;</p>

    </body>
</html>
```

## Step Five

Type **bower init** to create a **bower.json** file. Fill in the fields
according to your common sense. You can accept the defaults for all questions,
or fill in a few with useful values. There is no need to create a **.bowerrc**
file.

Add **angular** to your bower file:

```bash
bower install angular --save
```

## Step Six

Create a file called **index.js** in the root of your **AngularStarter-Lists** project. Place the following code in it:

```javascript
(function() {

    var app = angular.module('main', []);

    app.controller('ListControl', function($scope) {

        'use strict';

        var listData = [
            { text : 'Attend class at BC', done : false },
            { text : 'Complete JavaScript programs', done : false }
        ];

        $scope.todoList = listData;
    });
})();
```

Be sure to load **index.js** in your HTML template:

```html
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Angular Starter Lists</title>
    <script src="bower_components/angular/angular.js"></script>
    <script src="index.js"></script>
</head>
```

Take all of the code in the body of index.html and wrap it in a DIV:

```html
<div ng-controller="ListControl as list">
    // PUT THE CODE FROM THE BODY HERE
</div>
```

You will end up with an H1 tag, two P tags, and an INPUT tag inside your DIV. Note that the DIV is an Angular Controller. Though this program uses $Scope most of the time, note that this Controller at least supports **ControllerAs** syntax.

And in the angular HTML template, just below the **&#123;&#123;listItem&#125;&#125;** expression:

```html
 <ul class="unstyled">
  <li ng-repeat="todo in todoList">
   <input type="checkbox" ng-model="todo.done">
   <span class="done-&#123;&#123;todo.done&#125;&#125;">&#123;&#123;todo.text&#125;&#125;</span>
  </li>
 </ul>
```

## Step Seven

Add the following code to your **index.js** file just beneath the **todo** list:

```javascript
 $scope.listItem = "New Item";
 $scope.itemCount = getItemCount();
```

Since the above code uses **$scope** it has to be inside your **Controller**.

Still working inside the controller, add the following methods:

```javascript
$scope.addTodo = function() {
    $scope.todoList.push({
        text : $scope.listItem,
        done : false
    });
    $scope.listItem = '';
    $scope.itemCount = getItemCount();
};

function getItemCount() {
    var count = 0;
    angular.forEach($scope.todoList, function(todo) {
        count += todo.done ? 0 : 1;
    });
    return count;
};
```

Now switch to the HTML and add a FORM with an INPUT control and a BUTTON. It goes under the text that asks for user input:

```html
<form ng-submit="addTodo()">
    <input type="text" ng-model="listItem"  placeholder="Enter list item name">
    <input class="btn-primary" type="submit" value="add">
</form>

<p>Items in list: &#123;&#123;itemCount&#125;&#125;</p>
```

When done, the Controller in my HTML has the following HTML tags, shown in the order in which they appear:

- H1
- P
- FORM (INPUT and BUTTON inside it)
- P (With angular expression)
- UL (with INPUT and more angular expressions in it, as shown above)
- P (Witn angular express for the count)

The result looks like this:

![Angular Starter List](https://s3.amazonaws.com/bucket01.elvenware.com/images/angular-starter-lists-02.png)

## Turn it in

Push both your folders to your git repository. When you submit the assignment, provide the URL of your repository. If you have not used the exact names for the folders that I specify here, also submit your folder names.

## Hints

Do not submit nested folders of this type:

```bash
/Git/Week03-MyProject/MyProject
```

In the bad scenario, the **/Git/Week02-MyProject** folder is empty except for the sub-directory. Don't do that. Instead, copy of the contents of **MyProject** into **Week02-MyProject** and then delete the empty **MyProject** folder.

**NOTE**: _In the "bad scenario" outlined above, the exact name of your folders may differ. The point is not to submit your project inside a nested set of folders. It is, of course, legitimate to have folders with names like **views** or **routes**. They are just parts of the project._

## Errors

Suppose you get an error like this:

```bash
angular.js:68 Uncaught Error: [$injector:modulerr]
Failed to instantiate module main due to:
Error: [$injector:nomod] Module 'main' is not available!
You either misspelled the module name or forgot to load it.
If registering a module ensure that you specify the dependencies as the second argument.
```

- Did you load **index.js** with a script tag?
- Did you define a module called **main** in JavaScript. The code to define an
  angular module named **main** would look like this:

```javascript
var app = angular.module('main', []);
```
