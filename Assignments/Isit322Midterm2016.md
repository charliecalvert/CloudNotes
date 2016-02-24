## Overview

This is the Isit322 Midterm for 2016. Your program should be in a directory called **Week08-Midterm**.

The main goal of the midterm is to bring the ElvenSite program further along the road to completion.

The following diagram is for use with the command line version of this program, which is called **MakeHtml**. However, the **MakeHtml** program does the same thing as **ElvenSite**. Just substitute the word **ElvenSite** (your midterm) every place you see **MakeHtml**

![MakeHtmlWorkFlow](https://s3.amazonaws.com/bucket01.elvenware.com/images/make-html-work-flow.png)

Your midterm should include the following features:

1. Branches. Do your work in a branch called **midterm**. When you turn in the midterm, there should be no **Week08-Midterm** folder in the **master** branch.
- I should be able to run **npm install && bower install && npm start** and have the program launch smoothly.
  - This is the midterm, and you have time to get **package.json** set up correctly. Don't do this in class, but some other time before you turn it in.
- Provide support for ElfLog. When you turn it in, set the error level to Info.
- Provide support for allowing the user to use radio buttons to pick one of three run states:
  - User picks a single source and destination folder. This should work.
  - Program runs through pairs of source and destination folders. This should work.
  - Program users custom pairs of folders. This does not work yet. It is just a button.
- Edit configuration file. This does not work yet. Just a button with extra credit available.
- Include a screen shot of the Chrome Developer Tools, turned to Console page, after you have pressed that Walk button. I understand that you may not be able to clean up all errors that appear in this page, but I want to be sure that you have at least seen the errors. It is better to provide a screen shot showing errors than to provide a screen shot showing no errors when I am seeing errors on my end. I'm not looking for perfection, I just want to know that you know when things aren't running perfectly.
- **grunt check** comes back clean.
- **grunt test** works, even if you don't have much in the way of tests.

Other things to check:

- No favicon errors
- Minimize errors on console screen even after picking every possible option available to the user in all possible orders.

![Midterm Overview Pic][mt-pic-01]

[mt-pic-01]: https://s3.amazonaws.com/bucket01.elvenware.com/images/isit322-midterm-2016-01.png

## Step One: Set up a Midterm Branch {#midterm-branch}

Create a branch called **midterm**. Do your work in this branch. Do not merge the content of this branch with master.

Create a branch called **midterm-test**. Do merge your work into this branch.

Be sure to push both branches, and indeed all your branches, to your origin on BitBucket (or Github). Go up on BitBucket and confirm that the branch is there and that it looks right.

## Step Two: NPM and Bower {#npm-bower}

I will be testing to make sure your program runs correctly and that NPM and bower work correctly. To make this possible, you must turn your program in with the proper folder name, as defined at the top of this document. If the name is wrong, I will either not accept the midterm, or automatically take 5 points off your score. Please, put your work in the proper folder!

## Step Three: ElfLog {#elflog}

Include *ElfLog* in your program. Remove all **console.log** and replace them with **ElfLog** statements.

Your program should include the following log types:

- 1 **logLevelInfo** statement.
- 5 **logLevelDetail** statements
- At least 1 **logLevelError** statement, but preferrably more.
- Support for **logLevelSilent**

## Step Four: Walk Type {#walk-type}

```javascript
div.elf-radio
    .btn-group#walktype(data-toggle='buttons')
        label.btn.btn-default.active
            input#qSingle(type='radio', name='walktype', checked='checked', value='Single')
            |  Single
        label.btn.btn-default
            input#qPaired(type='radio', name='walktype', value='Paired')
            |  Paired
        label.btn.btn-default
            input#qCustom(type='radio', name='walktype', value='Custom')
            |  Custom
```


Then in your **constructor** for your main object (**SiteConfig**), set up onclick event to record what is happening when the user clicks an item:

```javascript
var radioWalkType;

function SiteConfig() {
  // Code omitted here
  $("#walktype").change(function() {
      radioWalkType = $("input[name=walktype]:checked").attr('id');
  });
}
```

And when the user clicks the walk button:

```javascript
  // Code omitted here.
  var requestQuery = {
       directoryToWalk: directory,
       destinationDir: destinationDir,
       highlight: highlight,
       radioWalkType: radioWalkType
   };

   $.getJSON('/walk', requestQuery, function(result) {
       etc...  
   });
```

## Step Five

Don't work hard on this, but create some markdown/HTML that you might, over time, develop into something you can show to others. Include these in two folders:

- Week08-MidtermMarkdown
- Week08-MidtermHtml

Don't forget, in **layout.jade**:

```
meta(charset='UTF-8')
meta(name='viewport', content='width=device-width')
title= title
```

## Turn it in

Check your code in the appropriate directory in the appropriate branch.

Provide four screen shots which should be attached (uploaded) directly to the assignment in Canvas:

- One of your program running after you pressed the **Walk** button.
- One of your the command line after you pressed the **Walk** button. Have elfLog set to details.
- The console screen after you have pressed the walk button and taken other measures to try to find bugs that throw exceptions
- Your screen after you run **grunt check**. The screen should show that your run came back completely clean. It should, for instance, include these two sentence fragments, exactly as shown:
  - 'changed 0 files', 'No problems'

**NOTE**: *There is an understandable tendency, if you cannot get your program to work correctly, to work as long as you can, and then finally give up and turn it in as is without running **grunt check**. I understand how that would happen. However, you should, while working on your program, occasionally run **grunt check** to make sure that it returns clean. That is just one of the steps you should take to make sure that failures are not due to one of the errors that JsHint can catch, or that occur because our code is improperly formatted and therefore hard to read. It is better to have a program that does not work correctly but that passes the **grunt clean** checks than it is to have a program that does not work correctly and returns multiple errors when I run **grunt check**. In part this is because a clean **grunt check** helps me determine that problems arose even though you tried hard to do everything right.*

Quick Check

1. Program in proper branch? Even if not, tell me what branch to view.
-  Npm and bower work?
-  Elf log set to info?
-  Single source destination works?
-  Paired source and destination works?
-  Options for picture, single source, paired source and custom?
-  Button for Edit Config?
-  Grunt check comes back clean?
-  Four screen shots included

**NOTE**: *I'm also going to need your most recent config file. Make sure that your
**config/ElvenConfig.json** file contains your most recent configuration data.*

## Display Class

I end up creating a number of methods whose sole purpose is to display data. It is frequently considered a good idea to separate this kind of code from the rest of your code.
