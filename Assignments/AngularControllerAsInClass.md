---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AngularControllerAsInClass.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: AngularControllerAsInClass.md
relativePath: /AngularControllerAsInClass.md
title: AngularControllerAsInClass
directoryName: Assignments
category : assignments-guide
---

#Angular ControllerAs InClass

## Step01

Navigate to your repository and:

```
mkdir Week10-ControllerAs
cd Week10-ControllerAs
yo angular
yo mocha
```

## Step02

Create Unit Tests 

In **test/spec/controllers/** Rename:

- about.js => AboutSpec.js
- main.js => MainSpec.js

Add two test suites to **test/spec/controllers**:

- Marie.js
- Pierre.js

Create four failing tests:

- In'shows that we can get the description from main'
- 'shows that we can get the description from about'
- 'shows that we can get the description from Marie'
- 'shows that we can get the description from Pierre'

### Chai and Spec are Optional

At the top of your tests:

    var expect = chai.expect;

In the files section of karma.conf.js:

    'bower_components/chai/chai.js',    
    
Then:

    npm install karma-spec-reporter --save-dev
    
And: 

```
exclude: [],

reporters: ['spec'],
```

In karm.conf.js: 

```
plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-spec-reporter'
    ],

```

In Gruntfile.js: **singleRun: false;** about line 387.


### Optional mocha

Don't do this in class.

Install karma-mocha: **npm install karma-mocha --save-dev**

In karma.conf.js: frameworks: ['mocha'],

In karm.conf.js: 

```
plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-spec-reporter'
    ],
```


## Step03

Create four ControllerAs entries in **app.js**, adding new objects as necessary:

- mainController
- aboutController
- marieController
- pierreController

Instantiate controllerAs in **about.js** and **main.js** and other files:

    var mainController = this;
    mainController.description = "This is the main etc...';
    
Keep working until all your tests pass. 

Make sure the app itself works on port 30025. Don't forget to check for routes in **app.js** and for loading the new controller files (marie, pierre, CurieFactory) in **index.html**.

## Step04

Create a **CurieFactory.js** file. Create a function object in the Factory. Set it up just like the modular pattern, but without the outer and closing parens: ()(). A bit like this, perhaps:

```
function CurieFactory() {
}

CurieFactory.prototype.getMarie = function() {
   return {
        description: 'Marie Curie created the...',
        born: 1867,
        etc...
        
}

etc....

return new CurieFactory();
```

In your **Marie Controller** 

## Step05

Include a mixin that contains a menu that includes dropdowns.

    