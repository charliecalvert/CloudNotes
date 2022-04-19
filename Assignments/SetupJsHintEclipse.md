---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/SetupJsHintEclipse.md
relativePath: Assignments/SetupJsHintEclipse.md
title: SetupJsHintEclipse
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: SetupJsHintEclipse.md
fileNameHTML: SetupJsHintEclipse.html
---


<!-- toc -->
<!-- tocstop -->

#Setup JsHint in Eclipse

## Install

First make sure it is installed:

- Help | Installation Details
- Alternative: **Help | About | Installation Details**
- Look for **JsHint Eclipse Integration** 
- If not installed, drag icon from the [marketplace][1]

## Configure

Now we need to make sure JsHint is properly configured for our project. 

- Right click on your project in the **Project Explorer**
- Choose Properties
- Choose the JsHint page
- Add in files you want to cover: ***.js**
- Exclude directories or files you want to omit: jasmine, jquery, node_modules

Let's start by saying that we want JsHint to examine all the JavaScript files in our project:

![JsHint Eclipse][3]

As you can see, we did nothing with the folders, but included \*.js. That statement implicitly excludes all files that are not JavaScript files. We might want to also check **JSON** files.

Here we show how to configure JsHint so it ignores **node_modules**:

![JsHint Eclipse][2]

Notice that we want to work with all JavaScript files (\*.js). And then we narrow the range of affected files by saying we want to ignore only those JavaScript files that in the **node_modules** folder.

And here we see the results after we have ignored several other sets of files that are not important to us:

![JsHint Eclipse][1]

## What we Gain

At the bottom of the Eclipse IDE you see a **Problems** folder. If you don't see it:

- Window | Views | Problems
- Or: **Alt-Shift-Q, X**

This problems window can get filled with JsHint errors seen in jQuery and other files over which you have no control. By excluding those files, we can start to make use of the **Problems** view once again. Now it shows only problems with our code, and not problems with libraries that support our code.

**NOTE**: Remember that many libraries that we use a intentionally condensed and stripped of all unnecessary syntax at the time they are published. They may or may not have passed JsHint during development, but we can't be sure since we are looking at the puiblished files, not the development files.

## Turn It In

Make sure you have excluded all the jsamine, node_modules, jquery and require files from your final project. In the .settings folder for your project you will find a filed with a name like:

    com.eclipsesource.jshint.ui.prefs

Open the file in a text editor, block copy the contents, submit this assignment, and use the **Text** tool to paste in the content of that file.

  [1]: http://elvenware.com/charlie/images/development/JsHintEclipse01.png
  [2]: http://elvenware.com/charlie/images/development/JsHintEclipse02.png
  [3]: http://elvenware.com/charlie/images/development/JsHintEclipse03.png