---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AngularSolarRefactor.md
relativePath: Assignments/AngularSolarRefactor.md
title: AngularSolarRefactor
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: AngularSolarRefactor.md
fileNameHTML: AngularSolarRefactor.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

This assignment stands on its own, but it is closely tied to the midterm. Here is one way to think about it:

- The midterm consists of two parts
  - The refactoring of the renewables pages, described in this document
  - The addition of the energy pages
- We will work through the renewables section in class and in this assignment
- The energy pages will be touched on in class, but not covered in such depth

## Refactor Client Folders

As our program grows in complexity, we need to create folders that can group related features. For instance, we should put all our renewables related files in one place.

Move all our renewables related files into a folder called **renewables**:

<pre>
cd public/javascripts
mkdir renewables
git mv renewable-by-year.js renewables-utils.js renewables/.
git mv simple-format-page.js renewables/.
</pre>

We also want to rename **public/javascripts/main.js** to **public/javascripts/renewables/renewables-page.js**:

<pre>
git mv main.js renewables/renewables-page.js
</pre>

This accomplishes two things:

- It gives the page a meaningful name. After all, what did the name **main.js** tell us about the contents of the file? A name like **renewables-page.js**, while perhaps not ideal, is much more descriptive.
- It moves this last piece of our renewables logic into the **renewables** folder where other files of this type live. The point is to use folders to group related files.

Now make the obvious related changes in **layout.jade**.

Less obvious are the changes we need to make in **karma.conf.js**. As we move toward multiple folders, change the way we load files in the **files** section at the top of **karma.conf.js**:

```javascript
'public/javascripts/**/*.js',
```

Note the glob syntax (\*\*). This says that we want karma to load any javascript files (*.js) in **public/javascripts** or any of its sub-folders: (\*\*). Understanding glob syntax is an essential skill. Here are more details on glob syntax:

- <http://karma-runner.github.io/0.13/intro/configuration.html>
- <https://en.wikipedia.org/wiki/Glob_%28programming%29>
- <http://man7.org/linux/man-pages/man7/glob.7.html>
- <http://gruntjs.com/configuring-tasks#globbing-patterns>

These changes effect your tests. You should change the path you use when putting things in the template cache. Here, for instance, is what we had in some tests for **Simple Format Http Backend Suite**

```javascript
$templateCache.put('simple-format', el);
```

It should now look like this so as to take into account our new **renewables** folder:

```javascript
$templateCache.put('renewables/simple-format', el);
```

You will have to make similar changes in other tests. The details are left as an exercise.

## Refactor Server Folders

Move all the **renewable** related jade files into a folder called **views/renewables**.

When you are done, you might see something like this in **views/renewables**:

<pre>
$ ls -la
total 28
drwxrwxr-x 2 charlie charlie 4096 May 23 09:14 .
drwxrwxr-x 4 charlie charlie 4096 May 23 09:14 ..
-rw-rw-r-- 1 charlie charlie  863 May 21 19:54 renewable-by-year.jade
-rw-rw-r-- 1 charlie charlie  791 May 21 19:54 renewable-by-year-page.jade
-rw-rw-r-- 1 charlie charlie  643 May 21 19:54 renewable.jade
-rw-rw-r-- 1 charlie charlie  189 May 21 19:54 simple-format.jade
-rw-rw-r-- 1 charlie charlie  225 May 21 19:54 simple-format-page.jade
charlie@rohan-elf:~/Git/prog219-calvert-2016/SolarExplorer/views/renewables
</pre>

Don't forget to rename **views/main.jade**:

<pre>
cd views
git mv main.jade renewables/renewables-page.jade
</pre>

This means you need to add a new handler to **routes/index.js** that handles requests for files in the new renewables folder:

```javascript
router.get('/renewables/:id', function(request, response, next) {
    'use strict';
    response.render('renewables/' + request.params.id, {
        title: ' Angular Directive Calvert'
    });
});
```

Compare this route with the default route we use when asking for jade files other than the home page:

```javascript
router.get('/:id', function(request, response, next) {
    'use strict';
    response.render(request.params.id, {
        title: ' Angular Directive Calvert'
    });
});
```

Notice that we have made two changes:

- The route itself has changed from **/:id** to **/renewables/:id**
- The path that response.render uses to find the Jade file has been changed

**NOTE**: _We will make additional changes to the system after the midterm is complete. In particular, it is possible create a javascript file in the routes directory dedicated to the renewables routes. But lets move towards that goal at a slow, stately pace. This is enough for now._

Finally, you will need to modify the **elfRenewable** directive to point at this new route:

```javascript
templateUrl: 'renewables/renewable'
```

Make similar changes in **public/javascripts/apps.js**:

```javascript
.when('/simple-format', {
    templateUrl: 'renewables/simple-format-page',
    controller: 'SimpleFormatController'
})
```

You will have to make several such changes which I will leave as an exercise. Don't forget that you have renamed **main.jade**!

## Handling HTTP Errors {#http-errors}

Add error handler to our calls to $http.get. Suppose, for instance, that you wanted to load the JSON file in the data directory that is called EnergyTypes.json. In other words, you wanted to load this file: **data/EnergyTypes.json**. Sometimes we make mistakes simple in specifying the file name, writing **EnergTypes.json** instead of **EnergyTypes.json**. The missing y doesn't mean much to us, but it baffles the computer. So we need to handle not only the case when the file loads successfully, but also the case where the file fails to load, perhaps because of a typo like that shown above.

Look at the example below. What we have added to our previous implementations of this method is the **errorCallback**. It gets called if an error occurs:

```javascript
$http.get('data/EnergyTypes.json')
        .then(function(res) {
            $scope.energyTypes = res.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error:', response.status, response.statusText);
        });
```

So if we did type in the name of a file that did not exists, the console.log statement near the end of the method would print out our error. You might want to have better ways of calling out the error, but at least this is a start. If you look at our calls to $.gitJSON and $.load, you will see that they also have error handling similar to this.

You can think about the call a bit like this:

```javascript
$http.get('data/EnergyTypes.json')
        .then(function(res) {
             // HANDLE SUCCESS
        }, function errorCallback(response) {
            // HANDLE ERROR
        });
```

## Remove Marie

It's finally time to clean up some messiness. Let's use git to remove:

- **public/javascripts/control.js**
- **views/marie.jade**

Run your tests and your app and make sure that this didn't break anything. It shouldn't, but if you had any lingering references to these files, this is the time to clean them up.

## Turn it in

The usual
