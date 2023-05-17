---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactAddressSanityTests.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/React
fileName: ReactAddressSanityTests.md
relativePath: /React/ReactAddressSanityTests.md
title: ReactAddressSanityTests
directoryName: React
category : react-guide
---

## Overview

Download and run some unit tests designed to see if your **week05-address-simple** project is structured correctly. It's easy for students to miss a step, and it is easy for me to leave out an important step, or to provide unclear or contradictory instructions. The goal of this assignment is to provide a single reference for the project.

Please read the [announcement](https://bc.instructure.com/courses/1745477/discussion_topics/9201251) about this assignment.

## Run the Tests

First go to JsObjects and pull the latest:

    slb
    git pull
    ./CreateSymbolicLinks

The **slb** alias navigates to the **~/Git/JsObjects/Utilities/SetupLinuxBox** directory. **CreateSymbolicLinks** is a script puts symbolic links to my scripts in your ~/bin directory.

Navigate back to the root of your AddressSimple project and install a utility library that you do not need to understand:

    npm install elven-code

Create a directory in the root of your project called **sanity-tests**. Navigate into the directory and run the get-tests command.

    $ get-tests

    =======================
    Menu
    =======================

    Tests
    a) Does Noting for Now
    b) Does Nothing for Now
    c) Address Simple File Tests
    d) Address React Tests
    e) Isit322 Midterm Project Sanity Tests
    f) Isit322 Midterm Client Tests

    x) Exit

Choose option C. This should copy a file called **Sanity.Files.test.js** into your **sanity-tests** directory. This file contains tests that you can run to help confirm that your project is set up correctly. The point being that we have built the project slowly over several classes, and we need a way to be sure that everyone has indeed built the same project.

![Sanity Tests](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-sanity-tests-ide-view.png)

Add a **sanity-tests** line to to the **scripts** property in your **package.json** file:

```json
"scripts": {
  "start": "npx webpack --watch & nodemon ./bin/www",
  "build": "npx webpack",
  "test": "jest --watch",
  "sanity-tests": "jest sanity-tests/Sanity.*.test.js --watch"
},
```

To run the tests, type **npm run sanity-tests**.

If all the tests pass, then you are good to go. If one or more of the tests fail, try to change your project to make the tests pass. **_You should not ever change the tests themselves. Leave them alone. Instead, change your project, if necessary, to make the tests pass._** If you feel I've written one of the tests incorrectly, then contact me in the discussion area or elsewhere. Otherwise, all questions to the discussion area.

## Turn it in

Push your project and submit your assignment. When you submit the assignment, include the URL for your repository and the name of the folder you want me to look at. (These last steps are probably not necessary, but please do them anyway just in case.)

## Test Run

A run of the tests look like this on my system:

```nohighlighting
$ npm run sanity-tests

PASS  sanity-tests/Sanity.Files.test.js
 Files Exists
   ✓ checks if source/control.js exists (1ms)
   ✓ checks if source/App.js exists (1ms)
   ✓ checks if source/Go.js exists
   ✓ checks if source/First.js exists
   ✓ checks if source/ElfHeader.js exists
   ✓ checks if source/tileData.js exists
   ✓ checks if source/Go.test.js exists
   ✓ checks if views/worker.pug exists (1ms)
   ✓ checks if .babelrc exists
   ✓ checks if prettier exists
   ✓ checks if .prettierignore exists
   ✓ checks if .eslintrc.json exists
   ✓ checks if .eslintignore exists
   ✓ checks if webpack.config.js exists

Test Suites: 1 passed, 1 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        0.626s, estimated 1s
Ran all test suites matching /sanity-tests\/Sanity.Files.test.js/i.

Active Filters: filename /sanity-tests/Sanity.Files.test.js/
› Press c to clear filters.

Watch Usage
› Press a to run all tests.
› Press f to run only failed tests.
› Press o to only run tests related to changed files.
› Press p to filter by a filename regex pattern.
› Press t to filter by a test name regex pattern.
› Press q to quit watch mode.
› Press Enter to trigger a test run.
```
