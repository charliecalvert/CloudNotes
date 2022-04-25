---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/WritingSimpleCode.md
relativePath: javascript-guide/WritingSimpleCode.md
title: WritingSimpleCode
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: WritingSimpleCode.md
fileNameHTML: WritingSimpleCode.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

# Getting Started Part II

To help you get a feel for the language, let's install node and start writing some simple code.

When in doubt, go back to the [index](index.html).

## Introduction to JavaScript

Large parts of the web are driven by three related technologies: HTML, CSS and JavaScript. The differences between these technologies can blur at times, but the following assertions may help you understand the primary purpose of each component:

- **HTML** files contain content such as text, bitmaps or videos
- **CSS** let's you define how the content should appear
- **JavaScript** allows you to perform actions that animate that content

It is possible to completely scramble these rolls. You can put content in JavaScript files and use HTML to define the appearance of your content. It is not, however, good practice to do these things. I prefer to take a relatively hard line, and to insist that:

- Content, and content alone be placed in HTML files,
- That appearance (font, bold, spacing, margins, etc) be specified only in CSS files
- And that JavaScript be used only to perform actions.

You will, on occasionl see me break the third rule, but the first two I adhere to except in cases where I want to prove a point, or illustrate a concept, rather than show how to write good code.

## Install NodeJs on Linux

I maintain a script for [installing node][node-install].

You can check your node version like this:

```bash
$ node --version
v6.7.0
```

After you install Node, you can generally upgrade it this way:

```bash
sudo apt-get update
sudo apt-get upgrade
```

Here is a list of various ES6 functions and their support in NodeJs:

<http://node.green/>

## Hello World at the Command Prompt

If you want to learn JavaScript, it can be helpful to start with a command line utility. To get started, install [NodeJs](http://nodejs.org/),
and run scripts from the command prompt:

- [Node on Elvenware](/charlie/development/web/JavaScript/NodeJs.html)

Other options include:

- Java: rhino
- Windows: cscript and perhaps there is some kind of chakra command line tool.
- Mac: JavaScriptCore

Frankly, I know little of these alternative JavaScript or JavaScript-like engine. Nevertheless, I suggest that you stick with NodeJs unless you have specific reason to do otherwise. Obviously I'm in no position to discuss their relative merits, but I am confident that NodeJs is both a very popular and well regarded solution. For instance, if you are interested in participating in the job market, circa 2016, NodeJs would be the obvious choice for server side or command line based JavaScript.

After installing node, create a simple source file like this one:

```javascript
function gettingStarted(count) {
    for (var i = 0; i < count; i++) {
        console.log("I'm getting started");
    }
}

gettingStarted(5);
```

Save the file as **getting-started.js**. To run the program, type the following at the command prompt:

  node getting-started.js

for instance

```shell
$ node getting-started.js
I'm getting started
I'm getting started
I'm getting started
I'm getting started
I'm getting started
```

That's all you need to node to start creating simple command line script that help you learn JavaScript. We will write many such programs, and expand considerably on these basics. I suggest you create such programs whenever you have feel the need to experiment with basic JavaScript syntax. Meanwhile, I'm going to switch the focus to the browser, as that is still the primary platform for the JavaScript language. I just wanted to show you how to create simple JavaScript command line scripts because they are so useful when you are learning the language.

## Hello World in the Browser

JavaScript is, of course, most frequently seen running along with HTML and CSS in a browser.

In Listing 01 you can see a very simple "Hello World" HTML file that uses JavaScript. You can save this file as **very-simple.html**.

**NOTE**: _There are many different ways to write the code shown here. I have chosen this technique because it does not rely on any libraries or frameworks and does not require that you use ES6. Often, tools such as React or jQuery are exactly what you want but I think it is still appropriate to start by writing raw JavaScript code. Later, you will learn how to use libraries or ES6 and frameworks to accomplish the same task described here._

I stated earlier, that I do not like the practice of embedding JavaScript directly in an HTML file. Nevertheless, I'm going to show you how it is done, if for no other purpose than to make clear exactly what I don't think you should do.

**Listing 01: Hello world in JavaScript.**

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">     
  <title>Very Simple</title>
  <meta name="description" content="JavaScript intro">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

  <p id="simple"></p>

  <script type="text/javascript">
    document.getElementById("simple").innerHTML = "A very simple JavaScript Hello-World program.";    
  </script>

</body>
</html>
```

Just to be clear, the offending lines are the following:

```html
<script type="text/javascript">
  document.getElementById("simple").innerHTML = "A very simple JavaScript Hello-World program.";    
</script>
```

The call to **getElementById** and the reference to the **innerHTML** property are clear invocations of the JavaScript engine and thus should not be found in an HTML file. It may be a common practice, and there may even be occasions when this kind of syntax makes sense, but nevertheless, I'm going to be quite dogmatic here and say that one should not embed JavaScript in an HTML file. Even if you see a great and highly respected writer or developer doing such a thing, you should simply cluck your tongue, shake your head, and murmur, perhaps not quite loud enough for anyone to hear: "The shame. Oh, the shame." If you have trouble with this rule, consider it this way: You have, I'm sure, been taught never to use **goto** statements. There are, in fact, occasions when it makes to use **goto** statements, but we nevertheless don't use them because we don't trust ourselves to use them correctly. In short, they form part of a slippery slope leading directly to the dark places never discussed in polite company. The same is true of embedding JavaScript in HTML. Yes, I too can see cases when it makes to do it, but I don't because "_The road to hell is paved with goto statements and embedded JavaScript!_"

After creating the saving the file shown above, navigate to it with a file explorer or some similar tool. Double click on it, or right click and choose **Open with...**. Because the file has an HTML extension, it should open automatically in a web browser or allow you to choose the browser in which you want to run it. Some browsers will also let you choose **File | Open** from the menu and browse for the file you want to open. If you are using Chrome, press **Ctrl + O** to open a file.

From the command prompt, navigate to the directory where you saved the file:

- One Windows try **start very-simple.html**
- On Linux try **firefox very-simple.html** or **chromium-browser very-simple.html**

![Very Simple JavaScript file][vsjs]

**Figure 01: The very-simple.html file running in Chrome.**

You can see the path to the file in the address bar. This is a normal Windows path with slashes rather than back-slashes. Notice also that it is prefaced with the code **file:///.**. Later you can learn how to set up a web server to publish your code, but for now, it is fine to just browse for the file on your hard drive.

## Separating HTML and JavaScript

By now you understand that embedding JavaScript in an HTML file is a dangerous practice, like experimenting with crack or opiates. So how can we separate our HTML and JavaScript? The solution is simple.

### Listing 03: The very-simple-02.html file

```javascript
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">     
  <title>Very Simple</title>
  <meta name="description" content="JavaScript intro">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <script src="very-simple.js"></script>
</head>

<body>    
  <p id="simple"></p>
</body>
</html>
```

**Listing 04: The JavaScript file: very-simple.js.**

```javascript
window.onload = function() {
 document.getElementById("simple").innerHTML = "A very simple JavaScript Hello-World program.";
}
```

**Note: You can download this sample from [here](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/downloads/VerySimple.zip).**

When running the code in Listings 03 and 04, you should be sure to put both files in the same directory. For instance, you may have a folder called **C:\\Source** or **~/Source** where you store your source files. Put both files in that directory:

```bash
    Source/very-simple-02.html
    Source/very-simple.js
```

Run this program just as you did the first example. Alternatively, you can see it in action here:

- [http://bit.ly/very-simple](http://bit.ly/very-simple)

The key line of code is the HTML file is this one:

```html
<script src="very-simple.js"></script>
```

This instructs the browser to load the **very-simple.js** file into memory where it can be executed by the browser's JavaScript engine. For instance, in Chrome it will be executed by the V8 engine, in Firefox by the SpiderMonkey engine, and in Edge or IE by the chakra engine.

This bit of JavaScript code scans through the HTML file and returns a handle to the paragraph element that his the ID **simple**:

```javascript
 document.getElementById("simple")
```

To this we add the following, which inserts some text into the paragraph:

```javascript
.innerHTML = "A very simple JavaScript Hello-World program.";
```

We could have also written the following:

```javascript
window.onload = function() {
    var simpleParagraph = document.getElementById("simple");
    simpleParagraph.innerHTML = "A very simple JavaScript Hello-World program.";
}
```

Both code sample do the same thing, only one is a bit shorter.

Note that we also make a call to **onload**. We do this to be sure that the HTML that contains our **simple** paragraph element is loaded before the HTML is executed.

## Best Practices

It is a good practice to always separate your HTML code into three files:

- Put your content in HTML files with an HTML extension: MyFile.html
- Put your presentation code in CSS files with a CSS extension: MyFile.css
- Put your JavaScript in JavaScript files with JS extension: MyFile.js

If you need to use the same CSS or JavaScript in multiple HTML files,
then it is obvious that it is best to put that CSS or JavaScript in a
separate file. Otherwise, you would be forced to endlessly repeat the
same code in multiple HTML files. Then, if you wanted to fix a bug in
your JavaScript or CSS, you would need to fix it in each HTML file that
included the code. In a large web site, that might mean you would need
to edit thousands of HTML files just to make one simple fix.

But suppose you CSS or JavaScript that you only wanted to use in one
file? Why should you split them up into three files? Wouldn't it mean
that:

- Your code ran faster because there would be one download instead of
    3?
- It would be easier to make sure that code that belonged together
    never got separated?

The answer to both these questions is yes. And still, despite these
arguments, I think you should always separate your code out into three
files. I believe this for the following reasons:

- It promotes good habits
- More often than you think, there will come a time when you will want
    to use the CSS or JavaScript in a second HTML file. If it is not
    already split out into multiple files, then you will get lazy and
    copy it from one file to another, ending up with duplicate code.
- Ultimately, it is easier to write good clean, easy to read, and easy
    to maintain code if you don't mix different types of source in a
    single file
- And finally, there are tools that can be run over HTML files before
    you release them that will automatically consolidate them into a
    single file.

- NOTE: This last point is not really as good an argument as it sounds.
Ultimately, I believe you are better off with a maintainable code base
that runs a bit slow, than you are with a fast code base that is
impossible to understand, maintain or improve. Furthermore, most
developers who try to optimize their code end up spending hours, days,
or even months fussing with code in order to save milliseconds that the
user never notices. The rule you want to follow is simple: unless you
can see obvious, and certain, proof that you have a performance problem,
you should not waste time trying to optimize your code. Instead, focus
on writing clean code that is easy to maintain. One thing we know for
certain: users always prefer code that works and has the right features
to code that does not work and lacks key features. If you write messy,
hard to maintain code, you will nearly always find it harder to add
features to that code base than it is to add features to well written
programs.*

## The Case of File Names

I should say a word about the case of the file names I create. There are
six different ways to name files, three of which are wrong, and three of
which are right:

1. file01.html
2. vrysmpl.html
3. verysimple.html
4. very\_simple.html
5. very-simple.html
6. VerySimple.html

The first example is wrong because the name has no meaning: it tells you
nothing about the contents of the file. The second name is wrong because
it contains abbreviations. Twenty years ago developers used
abbreviations to save space on machines where memory or hard drive space
was scarce, or where operating systems did not support names with more
than 8 characters. This is no longer necessary for a variety of reasons,
and now abbreviations are merely a sign that developers are too lazy to
type out the whole word. (To every rule, there are exceptions, and there
are occasions when the code in very short methods is easier to read when
it makes use of abbreviations. But those are the exceptions to a good
rule, and there is rarely a case where any good is accomplished by
showing newcomers such shortcuts.) The third example is wrong because it
provides no means of helping the reader to separate out the face that
**verysimple** is a name consisting of two words.

The fourth example is correct, but is now considered a bit old
fashioned. Most people prefer using a dash, rather than an underscore,
because they believe it is easier to type. In either case, the basic
strategy is good, because there are no abbreviations, and the words are
cleanly separated. The whole issue of case is moot in this strategy,
since all letters are rendered in lower case. The last example is the
one I prefer, because it is most familiar to me, and I find it easier to
read a long list of names rendered in this format. It uses Pascal
casing, where multiword names are run together into one name, and each
word in the name begins with a capital letter.

NOTE: One good argument from the folks who prefer using dashes to using
Pascal casing runs as follows. Suppose you have a common acronym such as
IBM. Perhaps you have method from IBM that performs fast addition. You
would want to call this method **IBMFastAddition**. This name runs the
words IBM and Fast together into one name and thereby breaks an
important rule about clearly delineating the words in a name. I
therefore would name this method **IbmFastAddition;** now we can clearly
see that Ibm is meant to be treated as a discreet unit. In fact, I
always treat acronyms this way: I capitalize the first letter and put
the other letters in lower case. This system works, but some find it
less than optimal. If you used dashes, you could write something like
this instead: **ibm-fast-addition**. This is arguably easier to read
than the Pascal casing example. But I don't find so terribly much
difference, and sometimes I think Pascal casing is easier to read. For
instance, I think **SimpleHtmlToElvenwareConverter** is easier to read
than **simple-html-to-elvenware-converter**. But gosh, it is a silly
thing to get upset about. I distrust anyone who gets overly excited
about such issues. I think even great programmers, such as Douglas
Crockford, do little more than display their rare blind spots when they
get overly exercised over issues that so clearly are more matters of
taste than of science. In fact, I have seen people foolishly ignore
Crockford's many strengths because he is so obviously overly zealous in
this one area. He's doing more harm to himself than good by being so
narrow minded.

Ultimately, the choice you make between the last three "correct"
examples is a matter of personal taste. There are only two primary
caveats you need to keep in mind:

- Whatever strategy you pick: stick with it! Once you have decided on
    a strategy then you, and everyone who works with you, must stick to
    that strategy in all the code you produce.
- If you go to work for a shop that has already adopted a strategy,
    then you must happily conform with it. A good manager will work with
    you, and have patience while you come to see the error of your ways.
    Bad managers will simply make your life miserable until you either
    come to your senses or move on. In either case, there is no question
    that it is irrational and counter productive to create code that
    uses a style that does conform to the needs of the others in your
    group.

The case of a file name is one thing, but the case of formatting code in
a source file is a different matter. Almost all languages have an agreed
upon style of casing, indentation, etc. You should make a real effort to
discover the strategy for the language you are using, and to follow it
as best you can. In this document, I attempt to follow the standards for
formatting JavaScript code. With a few minor exceptions, if you see me
vary from what you consider to be the best strategy for formatting
JavaScript, then please send me email and let me know. My goal is to
conform to the standards set by the JavaScript community. If I want to
assert my individuality, I wrote prose or poetry; when I write code, I
try to conform to standards. The only case for individuality in code is
the case for writing the cleanest, easiest to understand code of any
developer on your team. There is no place for a quirky style of
capitalization or indentation.

## Client Side, Server Side

JavaScript has one set of rules when run in a browser, and another set when run outside a browser. There are, therefore, two distinct flavors of JavaScript discussed in this text.

- Client side JavaScript implemented by the various browser makers:
  - In Chrome and Chromium: We use the Chrome V8 Javascript Engine
  - In Firefox we use the SpiderMonkey JavaScript engine
  - Safari uses JavaScriptCore, aka as Nitro, SquirrelFish and SquirrelFish Extreme
  - Chakra is the JavaScript engine in IE and Edge
- Server Side
  - Most server side JavaScript code is written with NodeJs, which uses the Chrome V8 Engine.

The big gap here is between client side and server side code. Even though the V8 engine is used in both Chrome and NodeJs, the code you write on the server side is often quite different from the code used in a browser. It is not that JavaScript syntax changes, but rather than the available libraries are so different, and the techniques for loading JavaScript code are so different, that one needs a different mind set when writing NodeJs code and writing client side code.

As a rule, you need no longer concern yourself too much with the difference between the various browsers. Client side code needs to be tested in all browsers, but you should be able to craft code that works in all browsers so long as you approach the matter carefully and methodically. In particular, judicious use of libraries such as jQuery can help you write client side code that works in all browsers.

**NOTE**: _I should probably qualify what I say above. The basic syntax of the language does not change when you switch from a browser to the server. The only exception, of course, is when a browser has a buggy implementation of JavaScript, and that still happens, though less frequently than it did several years ago.) But even when everything works correctly, certain key features of the language, such as the **this** keyword, have a different significance inside a browser and outside a browser. Also, key elements of the client side API, such as the **alert** function, are not typically available by default on the server. In general, I think it is easier to move from the browser to **nodejs**, than it is to move from **nodejs** to the quirky world of browsers._

The code you saw in the previous section provides a
good framework for beginning and intermediate level JavaScript
programmers who want to learn more about the language. Start out by
opening up code similar to what you see in Listing 3 and 4. As a matter
of fact, you can simply reuse VerySimple.html over and over again. As we
explore the JavaScript language, all you need do is change the name of
the JavaScript file that you are linking in. For instance, linking
VerySimple01.js for one program, then VerySimple02.js for the next
program. Better yet, follow best practices and rename each JavaScript
file to reflect its contents. For instance, ExploringLoops.js would be a
good name for a JavaScript file that you created when you wanted to
learn about how loops are written in JavaScript.

Before leaving the subject of how to structure your code, there is one
last subject to cover. A key tool developers use when debugging their
code, and when they are exploring JavaScript, is a call to
**console.log**:

```javascript
console.log("This is a a debug message");
```

## Console.Log

You can use console.log to log debug information.

 console.log('This line of code executed');

If you run your JavaScript in a browser, then use the Browser's debugger to
view the results. For instance, in Chrome, press F12 to bring up the
Developer Tools. Then turn to the **Console** page. If you are using a
command line tool like **node**, then you can see the results at the command
line itself.

Suppose you are a beginning level JavaScript programmer who wants to
learn how to write a function that adds numbers. Now it is a good and
admirable thing to want to design an HTML file that will allow the user
to enter numbers, push a button, and display the result of an operation
on those numbers. However, in this life there is a time for everything,
and lets suppose that right now you don't want to focus on inputting or
displaying numbers: you just want to write a method called **add**and
see if it works. Here is how you can use console.log to help you
reach your goal.

Begin your the same basic HTML file described above:

### Listing 05: The HTML File

```html
<!DOCTYPE html>
<html>

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>Very Simple</title>  
    <script src="calculator.js" type="text/javascript"></script>
</head>

<body>    
</body>
</html>
```

As you can see, the code shown in Listing 5 is similar to the code found
in Listing 3. The only difference is that the source file linked in is
called **Calculator.js** rather than **VerySimple.js**. Here is the code
for **Calculator.js**:

Listing 06: Code that uses console.log.

```javascript
    function add(a, b) {
        return a + b;
    }

    window.onload = function() {  
      var sum = add(2, 3);
      console.log(sum);
    };
```

Launch your HTML file in Chrome. Press F12 or Ctrl-Shift+I to open the
Developer Tools and turn to the console page. You should see the output from
any of your console.log statements in the console window. Note also that the
console window allows you to add arbitrary statements that will be run
against the JavaScript on your page.

[![Console Window][con01s]][con01]

**Figure 0X**: The Chrome JavaScript Console window.

In the screen shot, you can see the output of the call to **console.log**.
I have also used the Chrome console window to explicitly type in some
code:

 add(6,12)

After typing this code, my JavaScript method is called, and the result of the
call to the **add** method is shown. This technique can be used to help you
debug your JavaScript code without having to create an interface for your program.

Note: You can also use
[qUnit](http://elvenware.com/charlie/development/web/UnitTests/) to write
unit tests that can help you debug your code. I typically use both
**console.log** and **qUnit**. However, if I were forced to choose between the two
techniques, then I would choose **qUnit** or some other unit test framework. I
am not forced to make that decision, so I use console.log and qUnit. But if
I were forced to choose, I would choose unit testing over logging.
Ultimately, unit testing is a more robust solution. In particular, it is
easy to automate unit tests, while there is no simple way to automate
checking the results of calls to **console.log**. You can visually confirm the
results, but that is not that same as getting an automated error report such
as you get from **qUnit**.

## Learn More

Here is a rendering of the hidden code that prints the first two lines
found on this page:

```html
<div>
<script type="text/javascript">
 document.writeln("<p>Hello world!</p>");
 document.writeln("<p>These lines written using JavaScript.</p>");
</script>
</div>
```

This code changes the page you are viewing by inserting two lines of
text when the document loads. Because the change occurs as the document
is first loaded, you are not aware that an action is being performed.
Nevertheless, this is a dynamic event, and not a static rendering of
text as you see in standard HTML. For a more dynamic example of how
JavaScript can change the appearance of a page, see the next section,
called Insert Adjacent HTML.

The code shown above is embedded in this document directly below the
caption that reads **JavaScript Basics**. Right click this document and
choose **View Source** to see it.

**NOTE**: _It is important to understand that the text you see above is not
the actual code that gets executed. The real code is inside this HTML
page, but hidden from view. Whenever you include an angle bracket: \<\>
in your HTML, then the words inside those brackets are called a tag, and
they become hidden from view when the page is rendered in a browser. In
this case, all the words between the opening \<script\> and closing
\</script\> tags are considered part of the script tag, and are hidden
from view. To show an angle bracket to the reader of an HTML page, you
write the following code: **\<** or **\>**. The first bit of code is an
open angle bracket, and the second a close angle bracket. HTML is pretty
simple and straight forward most of the time, but this is one of those
places where it can be a bit hard to understand what is going on if you
are a newcomer. Nothing will better help you grasp these concepts than
actually getting your hands dirty and writing some code. Sometimes you
can learn best by doing._

Install the JavaScript ChromeTools Debugger in Eclipse:

- [Archived Old HowToInstall](https://code.google.com/archive/p/chromedevtools/wikis/HowToInstall.wiki)

<!--       -->
<!-- Links -->
<!--       -->

[vsjs]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/javascript/VerySimpleJavaScript.png
[con01]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/javascript/Console01.png
[con01s]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/javascript/Console01Small.png
[node-install]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/NodeInstall.sh
