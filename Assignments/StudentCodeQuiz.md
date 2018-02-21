# Overview

Can you, answer the questions below and then send me your SID, that is, send me your college ID?

I'm expecting to see [Node][node] based code that will run at the command line, but if you don't know about Node, then create code that would work in a browser. Do the best you can, you don't necessarily have to get everything right to get in the course, but I want to see what you can do.

## Question One:

Create an example function called **boatFromMastCount** that takes a parameter called **numberOfMasts** and returns the word **schooner** if **numberOfMasts** is set to **2** and **sloop** if **numberOfMasts** is set to **1**. Write the function twice, once with  **if-else** statements and once with a **switch** statement.

When complete, we should be able to call it like this:

```javascript
var result = boatFromMastCount(2);

console.log(result);
```

That code should produce this output:

```
schooner
```

## Question Two

There are two ways to create JavaScript objects. One uses curly braces:

```javascript
var qux = {};
```

The other uses function syntax:

```javascript
function() {}
```

Create a [JavaScript object][jo] with two properties called **kind** and **model**. Provide two examples of the object, one using JavaScript Object syntax and one using JavaScript Function (constructor) syntax.

## Question Two Part I

First create the object using JavaScript object syntax **{ ... }**.

The declaration should have two properties called **kind** and **model** initialized to empty strings. After declaring the object, add the following code that uses the object:

```javascript
ship.kind = 'sailboat';
ship.model = 'schooner';

console.log(ship);
```

The code should produce this output:

```javascript
{ kind: 'sailboat', model: 'schooner' }
```

I'm looking for a declaration of **ship** using object (curly brace) syntax that supports the code shown above. How should **ship** be declared so that the above code will compile and run as shown?

## Question Two Part II

Now create a second instance of the object called **Boat**, but this time use function constructor syntax. If we use the function object like this:

```javascript
var boat = new Boat('sailboat', 'schooner');

console.log(boat);
```

Then it should produce this output:

```javascript
Boat { kind: 'sailboat', model: 'schooner' }
```

What I'm looking for is the declaration of **Boat** that would create the behavior described above. How should **Boat** be declared?

## Question Three

What do the following commands do:

```
mkdir ~/Git/writings/Tech/StudentCodeQuiz
mv foo.js ~/Git/writings/Tech/StudentCodeQuiz/.
cd ~/Git/writings/Tech/StudentCodeQuiz/
git add .
git commit -m "Initial commit of student quiz code"
[master 7cb6818] Initial commit of student quiz code
 1 file changed, 38 insertions(+)
 create mode 100644 Tech/StudentCodeQuiz/foo.js
charlie@rohan-mintc ~/Git/writings/Tech/StudentCodeQuiz (master)
git push
Counting objects: 5, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (5/5), 694 bytes | 0 bytes/s, done.
Total 5 (delta 2), reused 0 (delta 0)
To git@bitbucket.com:ccalvert/writings.git
```

Again, you don't have to know the answer, but at least take a guess.

[jo]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[node]: https://nodejs.org/en/
