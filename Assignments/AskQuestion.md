---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AskQuestion.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: AskQuestion.md
relativePath: /AskQuestion.md
title: AskQuestion
directoryName: Assignments
category : assignments-guide
---

## Ask a Question

This assignment is designed to encourage participation in on-line discussions. Each week, I want you to:

- Ask a question
- Answer a question
- Behave in a civil, friendly manner

Secondary goals might be to:

- Provide a useful technical tip or link
- Thank someone for providing help

Here is a quick video about how to create new questions and how to reply to existing questions.

- [https://youtu.be/60kUajiq4as](https://youtu.be/60kUajiq4as)

There is no penalty for providing a wrong answer to a question so long as you are trying to help. My goal is promote participation in the discussion area. So long as you are doing so in the proper spirit, then that is all I ask, all I want to see. There are no dumb questions, and no penalty for accidentally providing a wrong answer.

## Get it Done

The big difference between an advanced programmer and one who is still learning is that advanced programmers get things done. It doesn't matter how we get things done, only that we get things done. If we have to ask a lot of questions along the way, then that is one thing. Failing to achieve our goal is another. In professional environments in big companies, I've seen successful developers who are just brilliant at getting answers to their questions. As a result, they get things done. Nobody remembers the questions, all they know is that someone gets things done!

A manager will work hard to find a good niche for someone who gets things done. They aren't always looking for genius or for years of experience, they want competence. Hard workers with a controlled ego who get things done. If someone with a soaring IQ comes along, then that is nice, but that is not the only way to be a valued employee.

## Don't Quote Code {#no-code}

In general don't quote code in your questions or answers. The worst possible question would be:

*Here is the code for my answer to question 3. Is it correct?*

```javascript
var a = 3 * square(5);
```

A close second might be: *What is the answer to question three?*

Try to ask questions that can benefit yourself and others; don't become a platform for disseminating the answer to a question.

This means that you often have to describe code rather than quote it. For instance, a student might ask: "I'm stuck on question 3, I keep getting 15 as the answer, and I know that's not right." Then someone might answer: "Have you tried using the **square** function?" That gives a hint, but does not directly give the answer.

In general, use your best judgment. Ask yourself if you are providing a hint or advice, or if you are actually giving away the answer.

## State the Assignment Name

It is helpful if you link to, or at least say the full-name of, the assignment you are working on. I can usually figure it out from context, but it would save me and others time if everyone just started their questions by writing: **"I'm working on the XXX assignment. When I ..."**

## Inspiration

Sometimes I get the sense that students are having a hard time coming up with questions about our work. Here are some ideas that you can use rather than saying things like "thanks" or "me too", or "here is useful link: [http://www.google.com](http://www.google.com)".

Did you get an error at any point during the week? Did you understand it? If not, you could ask about that. Did you understand absolutely everything we covered in our class or that you were asked to do in an assignment? If not, ask questions about issues that were not clear to you. If you did understand everything we covered, can you answer another student's question? If that doesn't work, can you think of anything related to the material we covered that piqued your curiosity? If so, ask about it.

When a student has everything running perfectly, and there are no problems with their code, I can understand why they have trouble coming up with a question. But if your programming is not working, then usually you receive some kind of error. If nothing else, you can ask about the error you are getting. What causes this error? How can I fix it?

Or perhaps the assignment includes a chunk of code like this:

```javascript
var objectAsArray = [];
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        objectAsArray.push([key, obj[key]]);
    }
}
```

There are three pieces of syntax you might want to ask about.

1. The code that initializes the array: **var a = []**;
2. The code code for iterating over the fields of an object: **var key in obj**
3. The **hasOwnProperty** or **push** methods.

I know for certain that students who often seem unable to ask a good question don't understand bits of syntax like that. I understand you having questions, but don't understand why you don't ask them. Rather than get a middling grade on the discussion assignment, why not ask a question about one of those pieces of syntax? Then students who understand can reply, or if necessary I can step in. Most importantly, you will learn something.

There is no shame in not understanding any of the syntactical elements in the bulleted list above. Even if you think you understand one of them, for instance, the first one, I bet there are questions you might have about the statement. Maybe you know what it does, but not exactly how it works. I know I have questions about it, and could stand to do more research on the subject if encouraged by a student.

This is one example from one assignment, but there are similar section in nearly every technical assignment I give. There are probbaly 5 to 10 obvious question to ask in any assignment, and 20, 30 or even 50 in more complex assignments.

Look for instance at this description of the **viewport** meta tag:

[https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)

[http://starkravingfinkle.org/blog/2010/01/perils-of-the-viewport-meta-tag/](http://starkravingfinkle.org/blog/2010/01/perils-of-the-viewport-meta-tag/)

I think there are people who know all this without reading it, but I certainly do not. After reading a ways into these articles, I have questions.

If the question a student asks gets too tough, I may not be able to answer it or may decide that it is too much work for too little gain. However, even a very obscure question about a corner case would get you a 100 on the discussion assignment. Well, it would if it didn't happen too often.

My point is that even the basics are hard to understand in some cases. Yet the deeper our knowledge of the basics the better off we are. It's very hard to understand complicated code without first having a very thorough grounding in the basics. The best engineers I've worked with all know the basics cold.

## Show Errors

To get more help, you might consider showing us any error messages you might be getting.

For instance, suppose you wrote this in your program:

```javascript
console.write(Matha.PI * 2);
```

That is not a valid line of code. It won't work. The rules say you can't show us the actual line of code that failed. What to do? You could descrive it. But sometimes that seems hard. It also won't work if you tell us something very general, such as: "I feel like I am not putting in the correct lines of code". With only that to go on, we would have to have supernatural powers to guess what mistake you made. If, on the other hand, you simply showed us this error, then we might be able to help:

<pre>TypeError: console.write is not a function  
    at Object.<anonymous> (/home/charlie/temp/foo.js:131:9)</pre>

Without actually giving you the answer, we could say: **console.write** does not exist. However, here is a list of methods that do exist on the **console** object. Try picking the most familiar and see if it works:

- [https://www.w3schools.com/jsref/obj_console.asp](https://www.w3schools.com/jsref/obj_console.asp)

## Attitude

When asking questions in most online forums, try to be as friendly and polite as possible. Email and text is a deceptively sharp edged tool. I try to go out of my way to keep a positive attitude. As we all start to spend more time communicating online with text, we have to learn new skills. Developing the ability to join an online community, and become a positive and well liked member of that community, is an important skill. Most of us aren't born with that ability. We have to develop it. In general, when I find myself using negative words like "stupid", "dumb", "incompetent", etc, then a little red flag goes up in my brain. Sometimes they are the appropriate words, but those occasions are rare. Perhaps once or twice a year. If they come up repeatedly in my messages, then it is usually best for me to take time off to relax.

Inside, we might feel upset, but we have to learn to hide that when communicating online. And we have to learn to take care of ourselves, so we are not under too much pressure. Be gentle with others, be gentle with yourself.

## Scoring

In general, I'm looking for questions and answers. However, just proving that you looked at the discussion area will keep you from getting a failing grade. Here are some loose guidelines that I might use when grading discussions:

- Ask or Answer a question: 90-100
- Give a tip or provide a link: 80-90
- Say thank you: 70-80

Of course, if you ask a good question and say thank you, then you keep the higher of the two scores. In fact, showing a high level of participation in the discussion is generally a good thing. Saying thank you five times rather than once, however, will not likely push your grade for the week above an eighty.

## Question Guidelines

Your question must be:

- Unique. This means that you should refresh (F5) the discussion area before you ask the question, and make sure no one else has already asked the question. If two people ask the same question, whoever asks first gets credit, and the person who asked second should probably ask another question.
- Related to our class, and preferably to an assignment we are working on this week.
- Technical. Try not to ask too many open ended questions that can't be answered concisely. A preferred question would be about JavaScript, node, the libraries we use, or the tools we use. For instance, the following question is too general: "Which language is better: Python or JavaScript?" It's okay to ask questions like that on occasion, but the goal here is to ask more specific questions directly related to completing assignments.
- Reasonable. For instance, if I asked you to create a table with the time of the sunrise in Bellevue WA over the next week, you can't ask: "What is the sun? I don't understand." That is not a reasonable question. Everyone knows about the sun, and it is not plausible that you don't understand that part of the assignment.

## Why Ask Questions

Asking and answering questions in the discussion are can be helpful because it:

- Gives you the chance of getting the answer earlier. If you ask a question on a Monday, then you could get the answer the same day or the next day, rather than having to wait until class on Wednesday for the answer.
- Ensures that everyone can benefit from the question. Often questions asked in class can only be answered by me looking at the machine of the person who asked the question. Usually that means only one person can see the asnwer. If we ask questions in the discussion area the right way, then everyone can see the problem and the solution.
- Does not take up class time. This means we have more time to focus on learning new material. It also allows us to discuss issues of importance to everyone in the class, rather than issues that may be of importance to only a few people. In the discussion area all reasonable questions are equally important. In class, the best questions are those that will benefit large numbers of students.

Other benefits of asking questions in the discussion area include:

- Learning how to work inside online forums. Places like [StackOverflow](http://stackoverflow.com/), [Super User](http://superuser.com/) and [Ask Ubuntu](http://askubuntu.com/) are as important, or more important, than books in this day and age. Just learning to rely on online forums as a means of learning is beneficial
- The discussion area is a great place to practice answering questions. There is an art form to asking and answering questions online. One way to learn is to practice. The discussion area gives us a safe, protected place to practice writing and answering questions.
- To learn the value of being civil in public discussions. If you go to sites like Stack Overflow and behave in an angry or ego-driven manner, you usually won't get very far. You don't need to be Miss Manners, but you should avoid being insulting, arrogant, or dismissive of others.

## Prefer Modesty {#easy-does-it}

Avoid leading with your ego. If you come across as an expert, then you become a target.

I've had some students who said the equivalent of something like this: "I've figured our how to solve the **higgs boson** extra credit assignment. I was stumped at first, then I remembered that the sun rises in the west, and from there on, it was easy. If you have questions, just ask and I'll help you catch up with folks like me." After reading this, I am more or less compelled to tell him that he is wrong about where the sun rises, and that therefore much of the rest of his reasoning is likely built on a false premise.

The problem here is the distance the student had to fall. He was the expert, ready to give everyone the secret of the universe. It is a long way from master of the universe to the person who got mixed up about where the sun rises.

A much better approach would be to frame the question in a more modest or matter of fact manner. "I think I'm making progress on the higgs boson assignment, but I'm concerned that one of my premises may be incorrect. I believe that the sun rises in the west, and that this fact can help us solve the problem. Am I on the right track? I wanted to check with others before moving on."

Now its much easier for someone to answer, "Hey, looks like you are making good progress, but don't forget that the sun rises in the east, not in the west."

While it is not always necessary, or even helpful, to be actively modest, it is almost always a mistake to come across as the superior expert. Measure the distance that you will fall if proven wrong, and try to limit the extent of the damage. We all make mistakes. Its fair to say that most of us even make dumb mistakes. That's okay. Just don't be caught trying to play the expert when you really aren't ready to assume guru status quite yet. Just state the facts in plain, simple language. Or if, you are feeling very uncertain, prefer being modest to hiding behind a grandiose pose.

## Appropriate Questions

It would be appropriate to ask about:

 - An assignment due this week. For instance, the Patterns Assignment
 - JavaScript syntax covered in class such as Object Literals or the Modular Pattern. It's okay to ask about any syntax that we have covered in class. Syntax questions don't have to have been covered this week. You can ask about something we talked about two weeks ago, or three weeks ago, or whenever.
 - A library we are using such as Jasmine, requirejs, Jade or Express etc.
 - A technical tool we use regularly such as Node, npm, Karma, JsHint, or Grunt.
 - Git, BitBucket and SSH.
 - Linux and the Linux command line
 - VirtualBox, Eclipse, Geany or any other tool we use regularly.

These are also reasonable questions:

- *I'm working on the Queue's assignemnt and can't figure out how to get started. Is there a JsObjects example program somewhere I can use to help me bootstrap my assignment?*
- *How do I upgrade to the most recent version of Express?*
- *How do I format my code in Eclipse*
- *How to I run JsHint on my **PurpleMage.js** file.*
- *What the heck is the difference between an HTML class and an ID*?

Just be careful that you are not asking a question that has already been asked.

## Inappropriate Questions

Subjects that would not be appropriate:

- How to create a class in C#? (Wrong subject)
- How do I use Git to host a gamer development project? (We are using Git, but this is not a part of Git we are covering.)
- Who will win the 2016 Presidential election? (Not related to our class at all. Likely to foment controversy)
- My Dad gets a dreamy look in his eyes when my girlfriend comes over and I signed up for 5 graduate level courses in addition to this class. I feel like I'm drowning and this Internet stuff is just a flash in the pan anyway, so do you think I should move out of my parent's house and live on my own? I find myself watching The Terminator over and over and sweating a lot because I can't understand this assignment. Do you think its okay if I skip class week? (Too emotional and too personal.)
- Where on Elvenware are callbacks covered? This is a good question, but it needs to be rephrased: How do I find the place on Elvenware where JavaScript callbacks are covered? Answer: search on Google for [JavaScript callbacks site:elvenware.com][1].

The following questions are okay, and you will get credit for asking them, but there is a sense in which they are second class questions. I would prefer a more technical, more specific, question, but these are much better than nothing, and are sometimes appropriate:

- Why are we using Jasmine instead of QUnit? This is a reasonable question and okay to ask, but it is not technical or specific enough to satisfy the requirements of this assignment.
- What is better, C# or Python? Why are we using JavaScript instead of X? (Too general. Not technical. Just a matter of opinion.)

## Question Format

Typically your question will have three parts:

- The question itself.
- The error messages you are getting
- What you did to get the error. Steps to reproduce.
- The platform you are using

Here is a classic example:

*QUESTION: I'm trying to create my unit tests for a project. I've created an HTML file that loads requirejs. It sets data-main to **MainTest.js**. When I launch the HTML file in the browser the screen is completely blank. I have no idea what is wrong or how to go about fixing the problem. How do I get started.*

*ERROR: I'm not getting any error messages that I can see. I'm just completely stuck.*

*STEPS: Create an HTML that uses require js. Set **MainTest.js** as **data-main**. I'm basing my work on the **SimpleQueue** program from JsObjects.*

*PLATFORM: I'm using Eclipse and working in Lubuntu 13.10 running in VirtualBox. My network was down while I was working. My browser was FireFox*

The answer to the above question, of course, is that one should run the program in Chrome and press F12 to view any error messages that might be present. (One could also get the errors by pressing F12 in FireFox. Both browsers have good developer tools.)

So let's ask the same question again, but this time include an error message from the Chrome debugger. Everything from above is the same, but this time here is the error section of the question:

*ERROR: I loaded the program in Chrome, pressed F12, and saw this in the console window:*

    GET file:///C:/Src/BridgeReader/apublic/javascripts/Readers/MarkdownReader.js net::ERR_FILE_NOT_FOUND
    Uncaught Error: Script error for: MarkdownReader
    http://requirejs.org/docs/errors.html#scripterror

It is more difficult to ask questions about the syntax of the JavaScript language. The danger is that you might give away the answer to a question by describing your error. Suppose you had an assignment to print the word **Garply** to the console. To fulfill the assignment, you came up with a file called **Chub.js** with the following contents:

    // Assignment 01
    // by Vari Quigley

    function qux {
        console.log("Garply!");
    }

You got an error when you tried to run the program by typing:

    node Chub.js

You struggled and struggled trying to find out what was wrong, but couldn't solve the problem. Here is how to ask the question:

*I have question about an error message I get when I try to run my program with node.*

*Here is the error message I get:*

```
    >node Temp.js

    C:\Temp\Temp.js:4
    function qux {
                 ^
    SyntaxError: Unexpected token {
        at Module._compile (module.js:439:25)
        at Object.Module._extensions..js (module.js:474:10)
        at Module.load (module.js:356:32)
        at Function.Module._load (module.js:312:12)
        at Function.Module.runMain (module.js:497:10)
        at startup (node.js:119:16)
        at node.js:902:3
```

_Here is the command I give to create the error:_

    node Chub.js

_I'm running on Linux and using **node** version **0.10.26**._

The above is fine because you do not quote significant portions of your program. There is one line from your program seen in the error message, but it is not an important line. It is just a plain old function header.

Nevertheless, when asking questions, you must be careful not to give the answer to question. In general, this means don't publish source code. For instance, suppose you are asked to add two variables. For instance, suppose this was the assignment:  _Given the following declarations, how would you calculate the sum of a and b*_:

    var a = 3;
    var b = 12;

That is the whole question. Suppose you tried to solve the problem by writing this:

    // Assignment 01
    // by Vari Quigley

    function qux() {
        var a = 3;
        var b = 12;
        var result = a + d;
    }

    console.log(qux());

When you ran the program, you got this error:

```
    >node Temp.js

    C:\Temp\Temp.js:7
        var result = a + d;
                         ^
    ReferenceError: d is not defined
        at qux (C:\Temp\Temp.js:7:22)
        at Object.<anonymous> (C:\Temp\Temp.js:10:13)
        at Module._compile (module.js:456:26)
        at Object.Module._extensions..js (module.js:474:10)
        at Module.load (module.js:356:32)
        at Function.Module._load (module.js:312:12)
        at Function.Module.runMain (module.js:497:10)
        at startup (node.js:119:16)
        at node.js:902:3
```

To quote the line **var result = a + d;** is to give away your attempted solution to the problem. In a case like this, just show the error message. For instance:

_I'm trying to use a variable in my program, but I keep getting the following error. What does it mean_:

```
    ReferenceError: d is not defined
        at qux (C:\Temp\Temp.js:7:22)
        at Object.<anonymous> (C:\Temp\Temp.js:10:13)
        at Module._compile (module.js:456:26)
        at Object.Module._extensions..js (module.js:474:10)
        at Module.load (module.js:356:32)
        at Function.Module._load (module.js:312:12)
        at Function.Module.runMain (module.js:497:10)
        at startup (node.js:119:16)
        at node.js:902:3
```        

## General Tips

Use the classic [advice from StackOverflow][2] on how to ask good questions.

- Search carefully to see if the question has already been asked. Once you are done searching, search again.
- Be on topic. Don't ask a C#, SQL or political question in our discussion area.
- Be specific
    - [Don't ask overly general questions][3] that are just matters of opinion.
- Make it relevant to others
- Keep an open mind

We don't have a meta site, so questions about the course or the direction we are taking in the course can be asked in the discussion area, but they probably will not count as the solution for this assignment.

If English is not your native language, work doubly hard to keep your question short and specific:

Question: I can't run my program because of error.
Error: I get this error ...
Reproduce: I typed this: npm start
Platform: Linux, Geany, node v0.10.26.

## Answering Questions

No one has to answer questions, but of course it is great if you can answer someone else's question. It is not exactly that you get *extra credit* for doing so, but I notice that someone is answering questions and that can help when it comes time to calculate the **class participation** part of your score for this course.

When answering questions you must continue to avoid quoting code directly. Don't give away answers.

Typical answers might be:

- Take a look at the FactorySimple01 example from JsObjects. Look in **main.js**, you will see an example of how to solve the problem in there.
- That is covered on Elvenware here: **Provide a link**.
- That is discussed here on StackOverflow: **Provide a link**.
- The answer to that question is easily found on the Internet. Enter a serach like this on Google: **Provide a search string.**

Don't point to third party resources that provide full anwers. For instance, if I asked you to calculate a factorial, you should not provide a list of places on the Internet where others have solved that problem using JavaScript. You can, however, mention that using Google might be a good idea in a case like this.

Try to provide answers or use syntax that we use in class. For instance, we are using **express** a lot in this class. It would not be appropriate to answer: *I suggest dumping Express and using the great **RetroQuirks** library instead.* And don't say something like this: You are using the **modular** pattern, but I think it would be better if you just created one method called **main** and put all your code in there. Try to follow the coding conventions we use in class.


  [1]: https://www.google.com/search?q=JavaScript%20callbacks%20site:elvenware.com
  [2]: http://stackoverflow.com/questions/how-to-ask
  [3]: http://stackoverflow.com/help/dont-ask
