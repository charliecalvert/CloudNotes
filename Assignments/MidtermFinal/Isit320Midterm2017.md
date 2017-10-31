## Overview

There are two steps:

- Convert all the controls in the WebCrafts application to ES6.
- Write tests for all your ES6 components

Do your work in a branch called **Midterm**

## Extra Credit

In a branch called **ExtraCredit**. Move all your ES6 code, that is, the entire client side of the application, to run on a **create-react-app** framework stored in a directory called **WebCrafts**.

The server should be moved into a separate program called **WebCraftsServer** running on port 30026. This is the same architecture we have used for other programs.

When you turn in your code, I'll be expecting to find to projects in the **ExtraCredit** branch of your **isit-webcrafts-lastname** repository. One would be called **WebCrafts** and the other **WebCraftsServer**. The WebCrafts app should have a proxy property in its **package.json** file that points at the server running **30026**.

Your **master** branch should be identical to the **Midterm** branch and should still contain the Express based ES5 framework for your code. It should not have two projects, but only one. All the interface components should be in React, but the architecture should still be for a Express application, not a **create-react-app** application.

## Format ES6 Code

The code for the midterm must be propertly formatted. A tool called [prettier][pr] can help us format our ES6 code:

```
npm install --save-dev --save-exact prettier
```

Here is a config file that you should save in the root of your repository as ".prettierrc":

```javascript
{
	"tab-width": 4,
	"single-quote": false
}
```

And here is a script to run it:

```bash
#!/bin/bash

find source -iname "*.js" -exec "./prettier" --write {} \;
```

This script finds all the JavaScript files in your  **source** directory. After finding the files, it runs **prettier** on them. The end result is that the code in your files should be properly formated.

[pr]: https://github.com/prettier/prettier

## Format ES5 Code

The code in your MidTerm must be properly formatted. I'm expecting that all your ES6 code will be in a directory called **source** or one of its subdirectories. The **source** directory should be in the root of your repository.

The [js-beautify][jsb] utility to help you format your ES5 code. It will not properly format ES6 code with JSX in it at the time of this writing.

Here is how to install it:

```nohighlighting
npm -g install js-beautify
```

Here is a script to run it:

```nohighlighting
#!/bin/bash

find . -type f -name "*.js" \
 -not -path "**/bower_components/**" \
 -not -path "**/node_modules/**" \
 -not -path "**/source/**" \
 -exec js-beautify -r {} \;
```

This script finds all the JavaScript files in your project except those in the **bower_components**, **node_modules** and **source** directories. After finding the files, it runs **js-beautify** on them.

[jsb]: https://github.com/beautify-web/js-beautify

## ES Lint

Make sure you code passes the ESLint configuration file found here:

- [ESLint Assignment][esl]

We may have to iterate on this file a few times to be sure we have something that works for us, so check the file (refresh it) to look for updates.

[esl]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactEsLint.html#rc-file



## Testing Guidance

For years I have written too many tests. Recently I have been trying something more like this:

- One test to prove I can cleanly load the component or object in a module. This is about loose coupling and ensuring that each module contains only one object.

- One test to prove the component or object does what it says it does. This is primarily about the Single Responsibility Principle. If I need six tests to prove an object works, then the object might be doing too much and might need to be refactored.

Other tests can be added if bugs appear, but just two tests per object can help us keep things light. Of course, if I have a module full of utility functions, then that is a different matter. But I think that limiting the amount of code in my tests and the overall number of tests is valuable.

Tests should, in most cases, be short. They should execute very quickly, and be very easy to understand. Otherwise they might be more trouble than they are worth.

## Checklist

Be sure your **Midterm** project:

- Automactically compiles your ES6 code with WebBack watch.
- Creates maps to your ES6 objects visible in the Chrome Developer Tools Debugger
- Contains at least two tests for all your React components.
- Uses your **isit-code** and **isit-site-tools** packages.
- Uses Tiny Pub Sub

## Turn it in

Merge **Midterm** into **master**. Push your code. Specify:

- Repository
- Branch
- Any folders your think I should know about

You must provide the three bullet points listed above. You will get a 5 if you simply pass in a link to your repository.

I may be willing, at least at times, to allow you to resubmit the midterm (the 5 option). However, this will cost more than it does on a homework assignment. In general, you will loose a half grade (5 points) each time you turn it in.

## Grading

I'm aware that some students will find it difficult to complete the entire midterm. It is much, much better to turn in something, rather than nothing. Those how are really strong students will have to meet a higher bar than less experienced students.

If you can get, for instance, the entire **MakeHtml** page to work with React, but not the **MakeImages** page, then that is much better than getting nothing done.

Focus on accomplishing what you can accomplish, and leave the grading to me. Don't think about your grade, think about writing a program that works.
