---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/SignIn.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript
fileName: SignIn.md
relativePath: /web/JavaScript/SignIn.md
title: SignIn
directoryName: JavaScript
category: JavaScript-guide
---

## Description

Let's talk about using the common **username** and **password** strategy for signing in to a website.

We are going to use passport to handle this process.

- <http://passportjs.org/docs/username-password>

## Menu

In **index.jade** we need to to add a **login** menu item:

```
ul.nav.nav-pills
	li(ng-class="{ active: isActive('/')}")
		a(ng-href='#/') Home
	li(ng-class="{ active: isActive('/about')}")
		a(ng-href='#/about') About
	li(ng-class="{ active: isActive('/login')}")
		a(ng-href='#/login') Log In
```

## Routes

In the client side **app.js** we need to add a **login** route:

```
myModule.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl : "main",
        controller : "MyController",
        controllerAs: "myController"
    }).when('/about', {
        templateUrl : "about",
        controller : "AboutController",
        controllerAs: 'aboutController'
    }).when('/login', {
        templateUrl : "login",
        controller : "LoginController",
        controllerAs: 'loginController'
    }).otherwise({
        redirectTo : '/'
    });
});

```