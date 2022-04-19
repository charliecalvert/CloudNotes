---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog272/Week02.md
relativePath: Prog272/Week02.md
title: Week02
queryPath: Prog272/
subject: Prog272
fileNameMarkdown: Week02.md
fileNameHTML: Week02.html
---


<!-- toc -->
<!-- tocstop -->

## Prog 272 Week 02, 2017

A few key facts.

## Primary Goals

- React, HTML5 and CSS3
- Git
- Pull JsObjects
- Create a GitHub Repository
- JavaScript and Node
- Unit Tests
- JavaScript Simple Types
- JavaScript Objects
- JavaScript Functions

We might also discuss, as needed:

1.  [Privacy](http://bit.ly/1ak3jVM)
2.  Before we can use it, I need to update this:
  - [In Class Exercise](/teach/assignments/Prog270-011414.html)

The list above is long, perhaps too long. To sum up, the emphasis is on JavaScript basics, unit testing, and Git. These will be our core "tools."

JavaScript basics include primitive types, objects and functions. You should be able to write unit tests that involve these key elements of the language. And finally, you should be able to check your code in and out of a git repository.

Grunt and Karma won't be used much this quarter. They are tools you can use to help ensure that you are writing valid JavaScript code. In particular, we use Grunt in conjuntion with JsHint, and Karma to automate the running of our unit tests.

JsHint is a syntax checker which we can use to confirm that our code conforms to basic rules, many of which are conventions enforced only to help you write code that is easier to maintain. We will use eslint in this course, because we are working with ES6. JsLint is for ES5.

But again, if you are overwhelmed, focus on learning JavaScript primitive types, objects and functions. That is the core of our work this first week.

## Decks

You can learn more about JavaScript, HTML and CSS by viewing these decks:

-  [Jest with create-react-app](http://bit.ly/jest-cra)
-  [HTML Basics - QwLhc8](http://bit.ly/QwLhc8)
-  [CSS - PEc6bG](http://bit.ly/PEc6bG)
-  [Media Queries - 1imauBZ](http://bit.ly/1imauBZ)
-  [JavaScript Intro](http://bit.ly/1ilT1tk)
-  [JavaScript Basics - OPDg3s](http://bit.ly/OPDg3s)
-  [Eclipse - VPK2UE](http://bit.ly/VPK2UE)

The funny letters after each name are the Bitly URLS. If you need to manually reach the first link, write:

- <http://bit.ly/QwLhc8>

And these documents:

-   [HTML](/html-guide/GettingStarted.html)
-   [JavaScript](/javascript-guide/JavaScriptBasics.html)
-   [Eclipse](/android-guide/Eclipse.shtml)

**NOTE**:* You will have to be patient with the documents you find on Elvenware.
Someday they will mature, but for now, they are a work in progress. Don't expect
anything fully polished, just take what you can get from them. One thing they do
provide, is a good sense of what I think is important. Generally material that
is assigned as homework is addressed somewhere on Elvenware.*

## NPM

You can test if global npm packages are out of date:

- **npm -g outdated**
- This might work too: **ncu**

Update all globally installed packages: **npm update -g**

## IDE

We will also talk more about our primary IDEs and text editors, which include:

-   WebStorm
-   Geany

## Sharing Files

-   Google Drive
-   Ubuntu
-   GitHub

## Links

- <http://www.jshint.com/>
- <http://www.jslint.com/>
- <http://eslint.org/>

## Git

[Git Elvenware overview][git-elf]

We are not using Git GUI anymore. I have another tool called Git Cola. I'll update this later.

- [Use the Git Gui][git-gui-basics]

[git-gui-basics]: /git-guide#git-gui-basics

Do a pull with GitGui:

- Remote | Fetch From Origin
- Merge | Local Merge

## Podcasts and Videos {#podandvid}

I have a number of videos that you should watch:

- <http://www.youtube.com/user/charliecalvert>

Douglas Crockford on JavaScript and other subjects:

- [Crockford](http://www.youtube.com/watch?v=hQVTIJBZook)
- <http://geekswithblogs.net/mbcrump/archive/2010/06/15/10-best-programming-podcast-2010-edition.aspx>
- [Minimize Video](https://bc.instructure.com/courses/795060/wiki/week02-overview?module_item_id=4861821#)


Unit Tests
----------

- [TestAjax.html](/unit-tests-guide/TestAjax.html)

```javascript
describe("An Elvenware Suite of Specs", function() {
  it("shows true = true", function() {
    expect(true).toBe(true);
  });

  it("shows 1 + 1 = 2", function() {
    expect(1+1).toBe(2);
  });

  it("shows addMe(2, 3) = 5", function() {
    expect(addMe(2, 3)).toBe(5);
  });

  it("converts 9 feet to 3 yards", function() {
  	var actual = xConvert(9, 'feet').to('yards');  	
  	expect(actual).toEqual(3);
  });

  it("converts 6 feet to 2 yards", function() {
  	var obj = xConvert(6, 'feet');
  	var actual = obj.to('yards');  	
  	expect(actual).toEqual(2);
  });

  it("converts 24 inches to 2 feet", function() {
  	var actual = xConvert(24, 'inches').to('feet');  	
  	expect(actual).toEqual(2);
  });

  it("converts 4 gallons to 15.14 liters", function() {
  	var actual = xConvert(4, 'gallons').to('liters');  	
  	expect(actual).toEqual(15.14);
  });
});
```



Week Two Day Two - jQuery
-------------------------

The goals for today are to:

-   Get running with Aptana and Eclipse
-   Learn how to create a JavaScript module
-   Learn how to create a button, click on it, and call a JavaScript method.
-   Learn jQuery basics

Tips
----

In FireFox, install FireBug:

-   Choose **Firefox | Add-ons**. Then search for and install FireBug.

IE can sometimes turn on compatibility settings, particular on Intranets, even
though our code is fully HTML 5 compliant. To stop this:

```
<!-- Turn off compatibility settings in IE --\>  
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /\>
```

## Links

- [HTML5 New Tags][html5-new-tags]
- </html-guide/GettingStarted.html#mso9>
- We are not using jQuery much, but [Elvenware jquery-basic][elf-jq-basic]

## Tips

Some additional comments are found in the sections below here.

## Add jQuery from CDN

We won't be using jQuery very much, but if we did, here is a way to link it into a client side HTML file:

```HTML
<script src="http://code.jquery.com/jquery.min.js" type="text/javascript"></script>
```


[git-elf]: /git-guide
[html5-new-tags]: http://www.techrepublic.com/blog/10things/10-new-html5-tags-you-need-to-know-about/3219?tag=content;siu-container
[elf-jq-basic]: /javascript-guide/JQueryBasic.html
