
Week02
======

Primary Goals
-------------

- HTML5, CSS3
- Karma
- Grunt and JsHint
- Git
- Pull JsObjects
- Pull ElfRuble
- Create a GitHub Repository
- JavaScript and Node
- Unit Tests, Karma, Jasmine and QUnit
- JavaScript Simple Types
- JavaScript Objects
- JavaScript Functions
- xConvert 

We might also discuss, as needed:

1.  [Privacy](http://bit.ly/1ak3jVM)
2.  [InClass](../Assignments/Prog270-011414.html)

Decks
-----

You can learn more about JavaScript, HTML and CSS by viewing these decks:

-  [HTML Basics - QwLhc8](http://bit.ly/QwLhc8)
-  [CSS - PEc6bG](http://bit.ly/PEc6bG)
-  [Media Queries - 1imauBZ](http://bit.ly/1imauBZ)
-  [JavaScript Intro](http://bit.ly/1ilT1tk)
-  [JavaScript Basics - OPDg3s](http://bit.ly/OPDg3s)
-  [Eclipse - VPK2UE](http://bit.ly/VPK2UE)

The funny letters after each name are the Bitly URLS. If you need
to manually reach the first link, write:

- <http://bit.ly/QwLhc8>

And these documents:

-   [HTML](http://www.elvenware.com/charlie/development/web/HtmlGuide/GettingStarted.html)
-   [JavaScript](http://www.elvenware.com/charlie/development/web/JavaScript/Basics.html)
-   [Eclipse](http://www.elvenware.com/charlie/development/android/Eclipse.shtml)

**NOTE**:* You will have to be patient with the documents you find on Elvenware.
Someday they will mature, but for now, they are a work in progress. Don't expect
anything fully polished, just take what you can get from them. One thing they do
provide, is a good sense of what I think is important. Generally material that
is assigned as homework is addressed somewhere on Elvenware.*

IDE
---

We will also introduce our primary IDEs, which include:

-   [Aptana and Eclipse](http://www.elvenware.com/charlie/development/android/Eclipse.shtml)
-   Visual Studio
-   NotePad++

Sharing Files
-------------

-   SkyDrive
-   Google Drive
-   DropBox
-   Ubuntu
-   GitHub
-   Mercurial

Links
-----

-   <http://www.jshint.com/>
-   <http://www.jslint.com/>
-   <http://www.nczonline.net/blog/2012/10/16/does-javascript-need-classes/>

Git
---

- [Use the Git Gui](http://www.elvenware.com/charlie/development/cloud/Git.html#git-gui-basics)

Update all globally install packages: **npm update -g**

Do a pull with GitGui:

- Remote | Fetch From Origin
- Merge | Local Merge

Podcasts and Videos
-------------------

I have a number of videos that you should watch:

- <http://www.youtube.com/user/charliecalvert>

Douglas Crockford on JavaScript and other subjects:

- [Crockford](http://www.youtube.com/watch?v=hQVTIJBZook)
- <http://geekswithblogs.net/mbcrump/archive/2010/06/15/10-best-programming-podcast-2010-edition.aspx>
- [Minimize Video](https://bc.instructure.com/courses/795060/wiki/week02-overview?module_item_id=4861821#)


Unit Tests
----------

- [TestAjax.html](\charlie\development\web\UnitTests\TestAjax.html)

```
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

Links
-----

-   <http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html>
-   <http://www.techrepublic.com/blog/10things/10-new-html5-tags-you-need-to-know-about/3219?tag=content;siu-container>
-   <http://www.elvenware.com/charlie/development/web/HtmlGuide/GettingStarted.html#mso9>

Tips
----

### Add jQuery from CDN

~~~~
<script src="http://code.jquery.com/jquery.min.js" type="text/javascript"></script>
~~~~


> Written with [StackEdit](https://stackedit.io/).
