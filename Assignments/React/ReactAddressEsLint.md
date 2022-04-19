---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactAddressEsLint.md
relativePath: Assignments/React/ReactAddressEsLint.md
title: ReactAddressEsLint
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactAddressEsLint.md
fileNameHTML: ReactAddressEsLint.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Add [ESLint][esl] and [Prettier][pr] to your [AddressShow][as], [AddressNative][an] and [AddressMaterial][am] assignments.

Details for completing these tasks are in the [ESLint][esla] assignment.

See also [React Props Eslint](https://www.elvenware.com/teach/assignments/react/ReactPropsEsLint.html)

See also [React EsLint](https://www.elvenware.com/teach/assignments/react/ReactEsLint.html)

## Turn it in

I'm expecting to find the following files in your **AddressShow**, **AddressNative** and **AddressMaterial** project folders:

- .eslintrc.json (or .eslintrc)
- .eslintignore
- prettier
- .prettierrc

When I run **./prettier** I'm expecting to see that no changes happened to your files. That is, **git status** still comes back with no changes after running **prettier**.

**NOTE**: _Before you turn in an assignment, run **prettier**. Now push. Then again run **prettier** and this time follow it with **git status**. Git should report that no changes happened to your files when you ran **prettier**. Repeat as necessary until **git status** comes back clean after you push and run **prettier**._

We should also be able to run the ESLint command followed by a space and a period without errors or warnings. In particular, the command looks like this:

    $ eslint .

For instance, this is not good:

```bash
$ eslint .

/home/charlie/Git/prog272-calvert-2018/AddressMaterial/src/components/App.js
  6:25  error  'Route' is defined but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

This is what we want to see:

```bash
$ eslint .
```

The point is that we see nothing: no errors, no warnings, no output at all when we run **eslint**.

Both **AddressShow** and **AddressMaterial** should pass all these tests. You can assume that all future projects should pass these tests, especially the **ReactAddressMenu**, **AddressNative**, **Midterm** and the **Final**.

[esl]: https://eslint.org/
[esla]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactEsLint.html
[pr]: https://github.com/prettier/prettier
[as]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressShow.html
[am]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressMaterial.html
[an]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactNativeAddress.html
