---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactHooks.md
relativePath: Assignments/React/ReactHooks.md
title: ReactHooks
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactHooks.md
fileNameHTML: ReactHooks.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

[React Hooks](https://reactjs.org/docs/hooks-intro.html), at the time of this writing (2019-11), have been around for about one year.

At this stage, it is clear that Hooks are here to stay. The React team plans to build many future technologies on top of React Hooks.

## Demo

We have a demo of React Hooks in our **git-ignore-tests** repository. Clone
a copy of the repo into the **~/.Git** directory. For this exercise, we don't want
to be using a copy of the repo that is involved with our midterm or anything
else.

Go to the command prompt and checkout the hooks branch:

    git checkout hooks

Navigate into **git-tester** and run the **build** script.

![git-ignore-tests-hooks-get-branches][gh]

## Hook Functions

The first thing you might notice in the code is that all the React classes are
gone. We no longer have code like this:

```javascript
export default class GetBranches extends Component { ... }
```

Instead, we have this:

```javascript
export default function GetBranches() { ... }
```

We use the keyword **function** rather than **class**, and we don't **extend** anything
since we no longer have classes and inheritance.

**NOTE**: _Which are better: functions or classes? I think this is probably
the wrong question. Instead, we ask about the trade-offs. What is good and
bad about classes? What is good and bad about functions? What do we gain or
lose by switching between them? To learn more, try [this Google search][gs] or
one like it._

## The return Statement

Another significant change is that we use a simple **return** statement
rather than the **React.Component** render method. To illustrate this,
I'll go back to week one, and revisit the function component in our
React Basics assignment:

```javascript
import React from 'react';

export const ReactBasicsFunctionComponent = () => (
   <h1>An H1 element in a React Function Component</h1>
);
```

We could also write this like this:

```javascript
import React from 'react';

export function ReactBasicsFunctionComponent() {
  return(
     <h1>An H1 element in a React Function Component</h1>
  );
}
```

Hopefully, you see that these are two ways of doing the same thing.

At any rate, you should compare the examples above to the code in our demo
and see that they both have the same structure. The differences are in the
relative complexity of the **return** statements and the addition of the
**queryGetBranches** function.

## Hooks

With the preliminaries out of the way, the next step is to see how we handle
state.

Start by looking at the way we import React:

```javascript
import React, { useState } from 'react';
```

Here we import a new function called **useState** that is part of React Hooks.
Here is how we use it:

```javascript
const [branches, setBranches] = useState(['unknown']);
```

This statement says that we are going to:

- Create a variable called **branches**
- Create a method called **setBranches**
- Initialize **branches** to this array **['unknown']**
  - We pass in the array as the sole parameter to the
      imported **useState** function.

The key takeaway here is that we no longer initialize state in
a constructor. Instead, we create state by writing statements
like the one shown above.

So far, the trade-offs between the old class syntax and the new
hooks syntax come close to being a wash. It takes work to create
a **constructor** and declare state, but it also takes quite a bit
of code to write the new syntax, particularly if you want to declare
multiple bits of state. It's also worth noting that most developers
understand constructors and know what should happen in them, but the
hooks syntax is unique to hooks and unfamiliar to most developers.

Having said this, we can now turn to study more of the syntax employed
by React Hooks. Here we see how Hooks simplifies our code.

Instead of calling **this.setState**, we can now call **setBranches**:

```javascript
async function queryGetBranches() {
    try {
        let response = await fetch('/system-environment/getBranches');
        let result = await response.json();
        console.log(result);
        setBranches(result.branches);
    } catch (ex) {
        alert(ex);
    }
}
```

This is very intuitive to me, because I know exactly what the function does:
it sets our **branches** variable.

Here is how to use **branches** in our code down in the return statement:

```javascript
{branches.map((branch, index) => { ... })}
```

For me, this is simpler than writing:

```javascript
{this.state.branches.map((branch, index) => { ... })}
```

## Thumbsucker

React Hooks do simplify our code, but I am not so happy about losing
React Class Components because I like the class syntax.

Regardless of how resistant to change I may be, it looks as though React Hooks
are going to play an increasingly large roll in the future of React. Hooks
first showed up about a year ago (Fall, 2018). Now they are embraced heavily
both by the React team and large portions of the React community.

**NOTE**: _We can use React Hooks and React Class Components in the
same application. So we need not move over all our code at once._

Nothing is certain, but right now it certainly looks as though new
development should be based on React hooks. It is the wave of the future.

## Turn it in

Our goal for this week is to have our midterm code moved over to both React Router
DOM and to Hooks. You can leave your midterm code in the **midterm**
branch. But I want you to create a new branch called **week09** and to convert
the components in your midterm to React Hooks.

You should end up with at least four React Function components that use hooks
and that can be accessed via the React Router DOM menu:

- YouRang
- GetBranches
- GitIgnoreTests
- BadFileTests

**NOTE**: _It is up to you whether you start your conversion with React Router
DOM or React Hooks. Perhaps in some cases you might do both things in a single
step: first create a new component based on hooks, then make sure it can be
created and displayed via a React Router DOM menu._


<!--       -->
<!-- links -->
<!--       -->

[gh]:https://s3.amazonaws.com/bucket01.elvenware.com/images/git-ignore-tests-hooks-get-branches.png
[gs]: https://www.google.com/search?q=javascript+functions+vs+classes
