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
