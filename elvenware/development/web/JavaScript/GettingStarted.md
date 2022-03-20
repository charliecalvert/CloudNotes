---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/GettingStarted.md
relativePath: elvenware/development/web/JavaScript/GettingStarted.md
title: GettingStarted
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: GettingStarted.md
fileNameHTML: GettingStarted.html
subject: JavaScript
queryPath: /javascript-guide/
---

## Table of Contents 

<!-- toc -->
<!-- tocstop -->

## Overview

This chapter provides an overview of some of them many themes covered in this book. Hopefully it will help you to both:

- Understand what to expect when reading this book.
- Decide if this book takes an approach that you will find useful.

After reading this chapter, you can move on to the more practical, hands-on chapters that follow.

A primary goal of this book is to help intermediate programmers grow into expert developers. Beginners will also find much useful material, especially in the early chapters. I'm not targeting expert developers in this text, but perhaps some of them might find a few sections that are useful.

_Back to the [index](index.html)._

## Why JavaScript?

In our course, we are learning the JavaScript language because we are building web applications that run in browsers and there is only one language that works inside a browser: JavaScript. There are no other options.

So we have to use JavaScript for the core of the course. But what about server side code? Rather than teach two languages, such as JavaScript and Java, or JavaScript and Python, I decided, and most students agree, that it is easier if we use JavaScript on both the client and the server. So we have JavaScript in the browser and NodeJs, which is JavaScript, on the server. NodeJs is built on the V8 engine, which is the same engine used to implement JavaScript in the Chrome and Chromium browsers.

That is why we learn JavaScript rather than some other language. I'm not against other languages. In fact, I love languages like Python and C#. I'm also a big fan of some CMS tools, such as WordPress. I've pushed for, and used, WordPress when we needed a CMS. But this course is not about CMSs. We are building Web Applications, and in that context, JavaScript plays a central role.

## Overview

-	[Ch01 - Getting Started](GettingStarted.html)
  - This chapter
- [Ch02 - Writing Simple Code](WritingSimpleCode.html)
  -
-	[Ch03 - JavaScript Basics](JavaScriptBasics.html)
-	[Ch04 - JavaScript Objects](JavaScriptObjects.html)
-	[Ch05 - JavaScript Functions](JavaScriptFunctions.html)
-	[Ch06 - JavaScript Modules](JavaScriptModules.html)
-	[Ch07 - Data Structures](DataStructures.html)
-	[Ch08 - JavaScript Patterns](JavaScriptPatterns.html)
-	[Ch09 - JSON Basics](JsonBasics.html)
-	[Ch10 - JQuery](JQueryBasic.html)
-	[Ch11 - JQuery UI](JQueryUi.html)
-	[Ch12 - Node](NodeJs.html)
- [Ch13 - Package.json](NodePackages.html)
- [Ch14 - Jade](NodeJade.html)
- [Ch14 - Elven Utilities](ElvenUtilities.html)
-	[Ch15 - JavaScript Unit Tests](/unit-tests-guide/index.html)
- [Ch16 - JavaScript React](JavaScriptReact.html)
- [Ch16a - JavaScript React Menu](JavaScriptReactMenu.html)
-	[Ch16 - Angular and Jasmine](Angular.html)
-	[Ch17 - RequireJs](Require.html)
-	[Ch18 - HandleBars](HandleBars.html)
-	[Ch19 - Sockets](Sockets.html)
- [Ch20 - Functional](Functional.html)


## Philosophy

This text is designed to be readily comprehensible. Too many books are clever rather than clear. Any developer should be able to read this text and understand what it teaches about the art of development.

I want to show developers that there is more to programming that simply writing loops, branch statements, and calling functions. Too many developers are stuck at the intermediate level because they don't have the knowledge needed to understand expert books, strategies and algorithms. Once they understand the difference between learning the basics, and mastering proper application design, then they will be able to move forward in their careers. Even if they never become experts themselves, they will be skilled enough to work on advanced teams that develop interesting and important projects.

## Change

Engineers are resistant to change. We want to learn a technology and stick with it. But that is not what we find in the modern web development world. Change, not stasis, is the rule. We have to constantly retrain ourselves, constantly keep our finger to the wind and watch for change.

The pace of change is not going to slow down. Furthermore, web technologies are becoming more and more important, not less important.

These are obviously soft, theoretical numbers, but a geometric improvements in technology took a 10,000 years before we had writing, 1000 once we had papyrus, a hundred years once we had the printing press, and now one to two years with current technology, with the time frame shrinking.

Moore's law is the model here. Geometric improvements in technology are happening not in millennia, centuries, or even decades, but in years or sometimes even months.

## Creativity

Many developers with a strong creative bent lack the analytic skills necessary to help them write good code and bring their ideas to fruition. One of my goals is to help people like this succeed. If you have a creative bent, but are having trouble bringing your ideas to fruition in code, then you will find this text is designed to help you succeed.

Your discipline, creativity, business smarts, or ideas will never be worth anything if you can't bring your idea to fruition. My goal is to teach a manner of programming that people of "average" talent can use to help them accomplish their goals.

## General Considerations

This book does not focus JavaScript basics. Instead, it is designed to teach developers how to write testable, maintainable, robust, well-structured code. It also relies heavily on a few simple programming principles.

Most developers who complete beginning level courses can:

- declare variables
- write loops
- branch on logical statements or operators
- compose functions and pass values to them and from them.

These fundamental tasks are essential, and must be mastered before serious study of programming can commence. Though they are not the focus of this text, I do cover them in at least a cursory fashion. These materials are covered not to teach them to developers, but to provide a common vocabulary that we can use throughout the book. In other words, I assume that readers know what it means to declare a variable and write a function. I do not, however, think it is safe to assume that developers really understand the role the often complex, interrelated role that functions and objects play in the JavaScript language. Equally confusing is the subject of how the various ways of declaring variables can affect the global name space.

I believe that no one can properly test, maintain or structure their JavaScript code unless they really understand JavaScript functions, objects and variable declarations. And the only way to really understand these things is to go back to the beginning and discuss the basics. As a result, I cover the basics, but primarily so that developers have the background necessary to understand more advanced concepts.

A secondary reason for covering the basics is that my target audience is intermediate, rather than advanced, developers. All intermediate developers can, by definition, benefit by a review of the basics. In fact, I think even advanced programmers often benefit from well structured review of basics.

## Good Code

The best programmers take pride in their code. They want to write code that works, of course, but they also want to write code that is easy to understand and easy to maintain. In particular, they want to create code that is:

1. Testable
2. Maintainable
3. Reusable
4. Robust
5. Fast enough

Order here is important. Nearly every method or function we write should be, before everything else, testable. Once we can test it, then we can refactor it so as to make it more maintainable, reusable and robust. We also refactor our code to make it more readable. In most cases our code only needs to be fast enough not to annoy the user; there is rarely a need to make a fetish out of performance issues.

Good code has the following traits:

* Has carefully chosen identifiers
* Is well formatted
* Divided into short, testable functions
* Organized in well designed modules that both:
  * Perform a single task
  * Protect the global name space

Good code is designed in accordance with basic programming principles such as:

* [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
  - Loose coupling  
  - Strong Cohesion
  - Dependency Injection
* The [Single Responsibility Principle](http://www.oodesign.com/single-responsibility-principle.html)
* The [Open/Closed Principle](http://www.oodesign.com/open-close-principle.html)
* The [Dependency Inversion Principle](http://www.oodesign.com/dependency-inversion-principle.html)
  - Place an interface between high level and low level classes so they don't depend directly on one another.
* TDD (Test Driven Development)

It is good if a module has strong cohesion and weak (loose) coupling.

With Dependency Injection, the main goal is loose coupling. We don't hard-coding a dependency into a module, we configure the module to use it. We load the module, rather than attach to it directly.

## PiggyBanks Three Principles

This is from [Piggybanks JavaScript Code Guide][piggy]. Code should be:

- **Consistent**: Follow the same formatting guidelines everywhere
- **Explicit**: Don't get fancy. Find the simplest possible way to express your ideas. Ensure that you code is readable.
- **Autonomous**: This is a combination of **DRY** and **The Single Responsibility Principle**. The goal is to write small, autonomous modules that have no dependencies. This also makes them easier to test. It's much easier to debug a few dozen lines of code in a small module than it is to debug a big, complex module.

I like these because they help to summarize a lot of more complex ideas outlined in the previous section.

[piggy]: https://medium.com/the-javascript-collection/piggybanks-javascript-code-guide-1150d984bbab

## Bad Smells

Throughout this text I will try to highlight the kinds of errors in judgment that signal serious, deep rooted problems in a code base. If you look at a few samples of code from a big project, and see certain mistakes repeated over and over, then it is often fair to assume that the whole project is rife with problems. Developers often call these bad smells. We will talk about them in depth later on, but common problems include:

- Repetitious code
- Large objects that take on too many tasks
- Large methods that do too much and have lots of private variables
- Multiple occurrences of the same switch statement
- Long parameter lists
- String constants, and especially the same string constant, scattered throughout a method, object or program.
- Dead code or commented out code
- Tight coupling. One class knows too much about another class

## Testing

There are no hard and fast definitions for the kinds of tests that people write. However, I generally break tests out in two types:

- Tests run from the developer's perspective
- Tests run from the user's perspective

Of course, it is usually the developer who runs all these tests. The difference between them is in what is being tested. Developer tests are testing code, while user tests are testing features. The person who hires you to do your work probably won't understand most developer tests, but they will understand a test that shows that a particular feature works. In fact, end users can often define what user tests need to be written, but they would not know how to define a developer test.

Developer tests are usually either:

- _Unit tests_ that test a single object and use mocks for dependencies
- _Integration tests_ that test the interaction between two or more objects

User tests are typically either:

- _Functional tests_ that prove that a feature works correctly
- _Acceptance tests_ that check if the program as a whole works correctly and within reasonable performance limits

It is common for acceptance tests to be used as a means of proving that a program meets the specifications set forth by the person who hired out the work. "Here are tests that prove that our program does what you asked us to do."

Again, there is some disagreement between developers as to exactly how to define the various tests outlined above. For instance, I find it hard to draw a solid line between functional testing and acceptance testing in certain cases.

 We will study all of the tests outlined above, but the primary focus will be on developer tests.

## Refactoring

Refactoring is the art of improving code without adding new features or fixing bugs. Typically we refactor our code to make it more:

- reusable
- readable (comprehensible)
- maintainable

If we can create code that is testable, then it should be possible to refactor it so that it is maintainable, reusable and robust. The art of writing robust code is the art of learning how to test our code, how to refactor our code, how to make it reusable.

Testable code should be, by definition, reusable. It is used once in your program, and once in your tests. Thus it is reusable. If it is not easily reusable in both your tests and your program, then it needs to be refactored.

We need to know what impact a bug fix will have on the rest of our program. That is one of the reasons we test our code. After we make a bug fix, we run our tests to see what impact the change had on our code.

The art of writing code that is easy to test and easy to maintain turns out to be one of the most complex and important tasks a developer must master. Except in very rare cases, it can only be achieved through repeated refactoring. Just because your code works, or appears to work, that does not mean it is finished. As mentioned early, good code should be:

1. Testable
2. Maintainable
3. Reusable
4. Robust
5. Fast enough

We achieve these goals by refactoring our code.

## Design

How do we learn to write maintainable, well designed code? Two key factors that help us achieve our goal are:

1. Adopting good programming principles
2. A deep understanding of our tools and our language.

By programming principles I'm talking about things like:

* Agile Design
* Programming guidelines such as the single responsibility principle
* Team dynamics
* Test Driven Development (TDD)
* Behavior Driven Development (BDD)

But knowing the theory is not enough. You also need a deep, intuitive, understanding of JavaScript or any other language you use. This is crucial if you want to write good code. You will constantly be forced to make implementation decisions when you write code. You will not be able to make any of those decisions unless you first have an understanding of what features are available in the language, and when and how to use them.

The bottom line is that you need to have a two pronged approach to development. On the one hand you need to understand good development principles, and on the other hand you need to dig into the details of your chosen language. Good developers can move fairly easily between computer languages, but their should be one or two languages that they choose to study in depth, and on which they focus most of their energy.

## Guidelines

So what are the programming principles mentioned in the previous section? Well, it turns out that their are many patterns and theories of development that you can study. However, in this book we will spend most of our time focused on just a few key princples:

- [Test Driven Development (TDD)][tdd]
- [Loose Coupling](http://edn.embarcadero.com/article/30372)
- [The Single Responsibility Principle][srp]
- [The Open Closed Principle][ocp]

A well designed architecture supports the [Open Closed Principle][ocp-wiki]:

- _**Modules, Classes and Functions should be open to extension but closed to modification.**_

Along with [loose coupling][lc-wiki] the [single-responsibility principle][srp-wiki] and [TDD][tdd-wiki] are core guidelines for our work. The open closed principle is one of the foundations of good software design. My classes are not really about Linux, git, Angular, jQuery, or express. They are about how to build applications using our core ideas:


Another important design principle not emphasized in this class is the [Dependency Inversion Principle][dip].

Slide decks that might be useful:

- Agile Overview: [http://bit.ly/1qf6V4t](http://bit.ly/1qf6V4t)
- Refactoring: [http://bit.ly/elfrefactor](http://bit.ly/elfrefactor)

We will also spend a small amount of time studying:

- [Behavior Driven Development (BDD)][bdd]

As a general rule, these are the rules, ideas and guiding principles that make possible agile development:

- <http://www.agilemanifesto.org/>
- <http://www.agilemanifesto.org/principles.html>

[tdd-wiki]:https://en.wikipedia.org/wiki/Test-driven_development
[lc-wiki]:https://en.wikipedia.org/wiki/Loose_coupling
[srp-wiki]:https://en.wikipedia.org/wiki/Single_responsibility_principle
[ocp-wiki]:https://en.wikipedia.org/wiki/Open/closed_principle
[ocp]:http://www.oodesign.com/open-close-principle.html
[dip]:http://www.oodesign.com/dependency-inversion-principle.html
[srp]:http://www.oodesign.com/single-responsibility-principle.html
[tdd]:http://agiledata.org/essays/tdd.html
[bdd]:https://en.wikipedia.org/wiki/Behavior-driven_development

## Performance

"Programmers waste enormous amounts of time thinking about, or worrying about, the speed of noncritical parts of their programs, and these attempts at efficiency actually have a strong negative impact when debugging and maintenance are considered." — Donald Knuth in "Structured Programming with Go To Statements"

We should not concern ourselves with performance issues unless we hit a specific problem with execution time. Even then, we should probably not worry about the problem until the latter stages of program development.

Developer time and project schedule are often more important than minor optimizations in noncritical code. Most users will not notice whether or not one infrequently called method is 5 nanoseconds slower than it could be after four or five hours of optimization. But everyone notices if a project is behind schedule. So don't focus on performance until the latter stages of development. Focus instead on writing clean, easy to maintain code. It will be much easier to optimize clean code than spaghetti code.

If you do have a performance problem, don't ever try to guess where it is, even if it seems obvious. Instead, use a profiler to measure performance and find the slow spots. Then review your architecture and see if there are ways to speed things up.

I've taught hundreds of students, and I have found that it is very rare for them to write code that is too slow. It is, however, common for them to write code that is buggy and overly complex. However, I have seen a number of student projects awash on the rocks because they tried to optimize a routine that probably never would have a significant impact on program performance. It is also common to see developers craft messy, hard to read code by adding optimizations that the compiler will do for you automatically. Or conversely, some attempts to optimize code prevent the compiler from performing much better optimizations.

Suppose a method that is called once runs in 100 milliseconds. Spending hours to get it run in 80 milliseconds is probably a waste of time. If you end up creating messy, hard to read, or repetitious code in the process, then you probably did more harm than good.

In general, however, it is not performance that causes intermediate level programmers to fail. Students fail to complete projects or quash bugs because they fail to properly craft their code.

It simply does not matter how fast your code is if it doesn't work and can't be tested. The first goal is to write clean, easy to maintain code that can form the building blocks for our tests and for a working program.

**NOTE**: _I recognize that some projects, such as the core modules of an OS or compiler code generation, are very much concerned with even small performance issues. My argument here is not that there are no cases where performance is important, but only that it is generally not a high priority for typical programming assignments._

## Part II

You have now heard some of the specific guidelines, goals and principles found in this book. There are, however, a few other more abstract themes that will crop up frequently.

Frankly, these probably have more to do with my personality than with any objective rules. Nevertheless, I believe that the art of writing good code involves a certain mind set. The best developers not only follow specific guidelines and principles, but also have a certain attitude toward their code and toward their fellow developers. Many developers succeed without having these personality traits, but I think they can help you make you a better developers. For instance, a great developer can be arrogant, but it is hard to be a well liked, effective team member if you are arrogant.

## Arrogance

Arrogance stalks through the ranks of modern programmers like the plague spreading through the streets of of medieval town. Arrogance is more than simply a boorish and unattractive trait, it causes real damage. It hampers careers and in some cases destroys lives.

There is nothing more pathetic than a poor developer who loses a job because they are too arrogant to accept even simple tips on how to write better code. It's one thing to lose a job due to lack of skill, and another to lose it because you reject the principles of good application development out of sheer arrogance. The developer who is too "intelligent" to learn is a developer who will likely have a very short, or highly underpaid, career.

Here are some of the things that I hear from arrogant developers who simply don't have the sense to see how much they still need to learn:

1. My code doesn't need to be tested. It just works.
1. I don't need to modularize or structure my code.
1. Properly formatting my code is a waste of time.
1. I have my own system for formatting code, the team guidelines don't apply to me.
1. I hate callbacks/recursion/rest calls/functional programming/tuples/promises etc because they are stupid
1. Other people can't understand my code not because its a mess, but because they are dumb.
1. Language X is stupid, my favorite language is brilliant.
1. My platform, my OS, my version of my OS, is the only great development environment, everything else is junk.
1. I don't need Git, I've backed up all my code on a thumb drive.
1. One letter identifiers make my code shorter and easier to read.
1. I don't need to refactor my code.

In short, if you think everything that is unfamiliar or hard to understand is stupid, then you probably need to examine your assumptions. If you refuse to take the time to make your code fit in with your teammates code, then you are headed for trouble.

Having said this, it is not necessarily fatal for a talented developer to be narrow minded in some particular area. A classic example of such a person would be Eric Raymond, who is guilty of the OS chauvinism listed above. Of course, Eric Raymond is so talented, so hard working, and so knowledgeable that he can afford to burden himself with a few glaring flaws. The odds that you are equally talented are vanishingly small. In Raymond's case, one could even argue that he turned his weakness into a strength. His over the top support of Unix lit the fire in his belly that helped him produce some very important books.

But some developers are narrow minded not just in a few cases, but in multiple ways. In programming, as in many areas of life, it is the people who mistakenly think they know a lot who are most dangerous. In most, but not all, cases, good developers are humble developers. Arrogance is usually a sign of ignorance. Most arrogant people lack the self-knowledge necessary to see their own flaws.

An average developer who thinks they are great is a liability. An average developer who is open minded, teachable, and hard working is usually a strong asset.

## Order and Discipline

If you don't need to be a genius in order to write good code, then what traits do you need? The short answer is that you need to be very well organized. If your tests, objects, modules, scripts and documents are well organized you don't need to be a genius to use them effectively.

It is not easy to get organized. In fact, it takes some special traits. Perhaps a list of such traits might look something like this:

- An orderly and logical mind
- An obsessive concern for detail
- A degree of patience that others consider a bit freakish
- The ability to go inward, to work alone, in silence, for hours, combined with the ability to work with others on a team

Good developers adopt or create systems for organizing their code, their tools, and their documents. Without this ability, developers tend to waste vast amounts of time, or fail altogether. The problem is that most developers don't see how important it is to work on developing good strategies for organizing code, scripts and documents. They always want to "get on with it." The think, for instance, that adding a new feature is more important than writing a test or ensuring that an object is reusable.

Much of this book is about learning what organizational techniques are best. Whether the subject is writing tests, writing methods, writing objects, writing scripts, or storing files, we will always be looking for the best techniques and most effective way to organize our work. The theory is that these organizational skills can help us succeed.

However, even if you picked a terrible technique for organizing your code, and stuck with it, you might have a chance of succeeding. Even poor organization is much better than no organization. However, most good developers have a tendency to develop relatively efficient ways to organize their code and tools.

## Be Practical

Because we live in a consumer society, many Americans have a tendency to accumulate a lot of junk that is not really needed. This is fine until it comes time to clean up the house. It can be very difficult to create an orderly, neat home if it is filled with an endless array of consumer products.

So the day comes when we have to start throwing away, giving away, or selling the things that clutter our house. For most people, this is a difficult process. It takes very little creativity to find justifications for keeping even broken things that we haven't used in years. But eventually, the light must dawn, and we start to winnow. The best winnowers learn that having a few things that work, and that can be found, is much better than having hundreds of things, only some of which work, and most of which can't be found without a long search.

I'm sure you see the analogy I'm setting up. I'm sure you can also come up with counter arguments. There are some programs that do just about everything and do it well. My suggestion, however, is that you adopt the clean house analogy to your programs: It is much better to write a small, simple program than a large complex program. If you really need additional features, consider creating a new program, or at least a completely pluggable module, that encapsulates the new functionality.

Almost all computer languages provide simple mechanisms for calling one program from another program. Most operating, systems, and especially Unix based systems, are designed to allow multiple programs to work in concert. The practical thing to do is create only small, simple programs that do only a few things.

Many times I have started writing a program, only to find myself bogged down in details that threatened to overwhelm me. To fight the chaos I began to strip layers of complexity. At times that meant I had to limit the features in my program, but frequently these features were not nearly as important as they were costly, or they could find a home in a second program. In the end, I ended up with a shorter, simpler program than the one I initially meant to write. But my program worked and my users liked it.

I was much better off with a robust program that worked, than with a flaky program that was cool but not reliable. And when users looked at my code, they rarely complained. It was simple but robust. It is hard to criticize code that works!

A lot of good developers have missed their chance to create a useful or important program because they have added too many features or focused too much on writing "clever" code that is fast and small, but which is also hard to debug, maintain and understand. Instead of focusing on speed and size, focus on the following concepts, and others that will be developed throughout this text.

Write code that:

* Is easy to read and maintain
* Contains only absolutely necessary features
* Sacrifices features that will be used by only a small percentage of users
* is aligned with best practices, especially those outlined by the Agile school
of development

## Reader Suggestions

If you think you have found a better way to do something, then please write me and let me know. I try to keep my mind open to suggestions, and certainly I have learned a great deal from developers who work at all levels. It's not always experts who have the best suggestions.

Depending on the quality of the comment, and my understanding of the subject, I generally have one of three responses to reader comments:

- Oh. That is simpler and easier than my way. Thanks for the tip.
- Well, maybe, but probably not. Take the time to consider whether the code that you propose is both maintainable and easy to understand. Are you sacrificing maintainability on the alter of speed? Saving ten clock cycles simply is not worth it if the techniques involved are overly complex.
- Gosh, I have no idea what you are talking about. Either you are working way over my head, or else you are having trouble expressing yourself clearly, or else you are totally confused.

## Part III

Here I include references to third part tools, books, or materials.

## The Right Tools {#theRightTools}

There are some wonderful tools out there for developing big applications with HTML and JavaScript. Three that I use frequently are Eclipse/Aptana, and WebStorm.

If you are writing the kind of simple program needed to follow along with this text, however, I think it is simplest to use the following tools:

- [Geany](https://www.geany.org/)
- [Chrome](https://www.google.com/chrome/browser/desktop/)
- [NodeJs](https://nodejs.org/en/)
- notepad++

## The Right Books

Good books to read on JavaScript.

- [**Maintainable JavaScript**][maintainable-js], by Nikalas Zakas, the author of **JavaScript for Web Developers**. MJ is a short book that is easier to read than JGP, but which follows much of the advice found in Crockford's book.
- [Clean Code](https://www.google.com/search?q=Clean-Code-Handbook-Software-Craftsmanship). A general purpose guide to writing good code.
- [**Secrets of the JavaScript Ninjas**][js-ninja] by jQuery's John Resig is an excellent book. A bit heavy going in places, but full of excellent advice.
- [Eloquent JavaScript][elojs]: An in depth look at the language available [on the internet][elojs].
- A difficult but valuable book is **JavaScript the Good Parts** by Douglas Crockford. It is a tough read, but it is the pivotal book about JavaScript that taught everyone how to properly use the language.
- [JavaScript, the Definitive Guide](https://www.google.com/search?q=JavaScript-Definitive-Guide-Activate-Guides) by David Flanagan. Considered *the* book on JavaScript by many, but I find Zakas easy to understand and the Ninja book to have more depth. But still an important and useful book.
- [The Principles of Object Oriented JavaScript][js-oop] by Nikalas Zakas. If you wish JavaScript were C#.... Includes numerous insights into how JavaScript is structured. I couldn't put it down.

This might also be of some help:

- <http://www.elvenware.com/charlie/development/web/JavaScript/>

Key Sources of Free ebooks:

- [Free books from O'Reilly](http://www.oreilly.com/programming/free/)
- [Free books from packtpub](https://www.packtpub.com/packt/offers/free-learning)
- [Free books from GitHub][gitbook]
- [Free books on frameworks such as Angular and React from Github][reactghbook]

And here are the a few "home pages" and tools for web development:

- [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Stack Overflow](http://stackoverflow.com/questions/tagged/javascript?sort=frequent&pageSize=15)
- [Stop Saying Coding is Easy](http://www.hanselman.com/blog/StopSayingLearningToCodeIsEasy.aspx)

[gitbook]: https://github.com/vhf/free-programming-books/blob/master/free-programming-books.md#javascript

## Further Notes on Books

There are excellent questions, Michael.

I feel guilty at times talking about things like NPM and React when I know that we all (myself very much included) need to work more on JavaScript itself. I wonder sometimes if we shouldn't just drop everything and go back to basics. Certainly few things are more difficult than getting the basics right in any language, and in JavaScript in particular.

This is not a specific recommendation, but more an anecdote that might be helpful to you. This weekend Margie and I went away for a couple days. I brought along a book I picked up in the library called You Don't Know JS: ES6 and Beyond. [Buy it](https://www.google.com/search?q=You+Dont+Know+JS+Beyond) or either:

**Clone the Book**:

```bash
git clone git@github.com:getify/You-Dont-Know-JS.git
```

Link to book on GitHub:    

*   [You Don't Know JS - ES6 and Beyond](https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20%26%20beyond)

I don't think it is the best book on ES6, but it is a good book in terms of diffing into the language in general. The author Kyle Simpson is like a dog with a bone. He won't leave well enough alone. By the time he is done with a subject you will get a chance to learn a lot about how both ES6 and ES5 work, and what problems in ES5 the new code in ES6 is designed to fix. You'll learn more than you want or need to know, but along the way you will learn much that is useful.

In general, I think both [Nikolas Zakas][nz] and [Uncle Bob][ub] are very readable authors. They don't present the meaty technical challenges that John Resig (Ninja) and Kyle Simpson (You Don't Know JS) hand their readers, but their texts are clear and easy to understand. If any of us N252 knew even a quarter as much about programming as Uncle Bob or Zakas, we would be flying very high indeed.

When you get tired of me, or if you feel I'm not challenging you, or if you just want to up your game, then sit down with any of those books and absorb as much as you can. Reading for only ten minutes is good. Reading for a few hours is even better.

## Books on 24X7 {#books247}

- [Zakas: Understanding ECMAScript6][zakas-E6]
- [Zakas: Principles of Object Oriented JS][zakas-poojs]
- [Zakas: Pro JavaScript by Zakas][zakas-projs]

## Understanding JavaScript

I believe JavaScript is much more complicated than many suppose. As we gain proficiency, I believe that striving to understand the following would be helpful:

- The JavaScript object model and the difference between object literals, function objects, and function constructors.
Callbacks and promises
- ES6 features such as classes, the spread operator, and arrow functions.
- The various ways to loop over arrays and the properties of an object, such as for loops, while loops, for ... in, for ... of and forEach statements

And just a general understanding of JavaScript basics. Though we won't use it that much, knowing jQuery is useful because it is still everywhere.

If you want to push further, learn about the fetch command and REST calls to NodeJs Express servers.

## Other resources

Online courses:

- [BC students have free access to Lynda](https://www.lynda.com/)
- [Use Hacker IO to find free courses and tutorials](https://hackr.io/)
- [Codecademy Learn JavaScript](https://www.codecademy.com/learn/learn-javascript)
- [Udemy](https://www.google.com/search?q=udemy)

Sign in to Lynda.com with your BC email. If you are a library user, it also available through KCLS.

More Free Books:

- [JavaScript Design Patterns][javascript-design-patterns]
- [Understanding JavaScript 6][understanding-javascript-6]
- [Speaking JavaScript](http://speakingjs.com/es5/index.html)
- [Programming JavaScript Applications][prog-javascripts-apts]
- [JavaScript Spessore][javascript-spesore]
- [JavaScript Garden][javascript-garden]


I also want to read **JavaScript Patterns** by Stoyan Stefanov and I am currently reading **Functional JavaScript**. The latter book is very good, but perhaps too advanced for most of us.

- [Google IO](https://developers.google.com/events/io/)
- [Scott Hanselman](http://hanselminutes.com/)
- [JavaScript Blogs](https://www.google.com/search?q=top+rated+javascript+blogs)
- [33 Developers to follow](http://net.tutsplus.com/articles/web-roundups/30-developers-you-must-subscribe-to-as-a-javascript-junkie/)

## Tne Right Blogs {#blog-links}

- [Medium JavaScript](https://medium.com/the-javascript-collection)
- [JavaScript Playground](https://javascriptplayground.com/)
- [Tyler Mcginnis](https://tylermcginnis.com/)
- [Super Hero JS](http://superherojs.com/)
- [Dave Ceddia](https://daveceddia.com/)
- [David Walsh](https://davidwalsh.name/)
- [Axel Rauschmayor](http://2ality.com/)
- [Smashing Magazine](https://www.smashingmagazine.com/tag/javascript/)
- [DevChat and JsJabber](https://devchat.tv/js-jabber)
- [Reginald Braithwaite](http://raganwald.com/)
- <http://www.google.com/search?q=javascript+blogs>
- [Brendan Eich](https://brendaneich.com/)
- <http://www.google.com/search?q=web+app+development+blogs>

## The Right YouTube Channels

- [Google Developers Channel](https://www.youtube.com/feed/subscriptions/UC_x5XG1OV2P6uZZ5FSM9Ttw)
- [Facebook Developers Channel](https://www.youtube.com/feed/subscriptions/UCP_lo1MFyx5IXDeD9s_6nUw)
- [Paul Irish](https://www.youtube.com/feed/subscriptions/UCf7pOCNs6qmbSsBz2xQBI4g)
- [Amazon Web Services](https://www.youtube.com/feed/subscriptions/UCd6MoB9NC6uYN2grvUNT-Zg)
- [The Google Chrome Developers Channel](https://www.youtube.com/feed/subscriptions/UCnUYZLuoy1rq1aVMwx4aTzw)

## Some Links

Consider using a JavaScript style guide:

- <https://google.github.io/styleguide/jsguide.html>
- <http://contribute.jquery.org/style-guide/js/>
- <https://github.com/rwldrn/idiomatic.js/>

## News Links

- <http://www.google.com/search?q=javascript+news>
- <http://www.google.com/search?q=web+app+development+news>
- <http://www.google.com/search?q=node+js+news>


## Microsoft

Also, if you end up in the Microsoft world, read and listen to everything that these two people say:

Anders:

- <https://twitter.com/ahejlsberg>
- <https://channel9.msdn.com/events/speakers/Anders-Hejlsberg>

Mads:

- <https://twitter.com/madstorgersen>
- <https://channel9.msdn.com/Events/Speakers/Mads-Torgersen>

<!--       -->
<!-- Links -->
<!--       -->

[ub]: https://www.google.com/search?q=Robert+C.+Martin
[nz]: https://www.google.com/search?q=Nicholas+C.+Zakas
[speaking-javascript]: http://speakingjs.com/es5/index.html
[javascript-design-patterns]: https://addyosmani.com/resources/essentialjsdesignpatterns/book/
[prog-javascripts-apts]: http://chimera.labs.oreilly.com/books/1234000000262/index.html
[understanding-javascript-6]: https://leanpub.com/understandinges6/read
[javascript-garden]: http://bonsaiden.github.io/JavaScript-Garden/
[javascript-spesore]: https://leanpub.com/javascript-spessore/read
[elojs]:http://eloquentjavascript.net/
[maintainable-js]: https://www.google.com/search?q=Maintainable-JavaScript-Nicholas-C-Zakas
[js-ninja]: https://www.google.com/search?q=Secrets-JavaScript-Ninja-John-Resig/dp/1617292850
[js-oop]: https://www.google.com/search?q=Principles-Object-Oriented-JavaScript-Nicholas-Zakas
[reactghbook]: https://github.com/vhf/free-programming-books/blob/master/javascript-frameworks-resources.md

[zakas-E6]: https://library-books24x7-com.ezproxy.bellevuecollege.edu/toc.aspx?bookid=119827
[zakas-poojs]: https://library-books24x7-com.ezproxy.bellevuecollege.edu/toc.aspx?bookid=69057
[zakas-projs]: https://library-books24x7-com.ezproxy.bellevuecollege.edu/toc.aspx?site=NDDP3&bookid=44953
