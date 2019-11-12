## Overview

React Hooks, at the time of this writing (2019-11), have been around for about one year.

At this stage, it is clear that Hooks are here to stay. Many future React technologies will be built on top of React Hooks.

## Demo

We have a demo of you to use React Hooks in or **git-ignore-tests** repository. Clone
a copy of the repo into the **Git** directory. For this exercise, we don't want
to be using a copy of the repo that is involved with our midterm or anything
else.

Go to the command prompt and checkout the hooks branch:

    git checkout hooks

Navigate into **git-tester** and run **build**.

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
the wrong question. Instead, we ask about the trade offs. What is good and
bad about classes? What is good and bad about functions? What do we gain or
lose by switching between them? To learn more, try [this Google search][gs] or
one like it._

## The return Statement

Another big change is that we use a simple return statement rather than
the **React.Component** render method. To illustrate this, I'll go all the
way back to week one, and revisit the function component in our React Basics
assignment:

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

Hopefully you see that these are two ways of doing the same thing.

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

So far, the tradeoffs between the old class syntax and the new
hooks syntax come close to being a wash. It takes work to create
a **constructor** and declare state, but it also takes quite a bit
of code to write the new syntax, particularly if you want to declare
multiple bits of state. It's also worth noting that most developers
understand constructors and know what should happen in them, but the
hooks syntax is unique to hooks and unfamiliar to most developers.

Having said this, we can now turn to see how React Hooks are used in our
program. Here we see how 



## Understand useState



<!--       -->
<!-- links -->
<!--       -->

[gh]:https://s3.amazonaws.com/bucket01.elvenware.com/images/git-ignore-tests-hooks-get-branches.png
[gs]: https://www.google.com/search?q=javascript+functions+vs+classes
