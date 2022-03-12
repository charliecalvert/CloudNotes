---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/Yeoman.md
relativePath: elvenware/development/web/JavaScript/Yeoman.md
title: Yeoman
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
subject: JavaScript
---

<!-- toc -->
<!-- tocstop -->

# Yeoman

Yeoman is a scaffolding application. As such, we can use it to create the starting files for a project. For instance, if we want to create an angular application, we can use Yeoman to create the files commonly used in an **angular** application. These files might include set up for Grunt and unit tests.

## Install

The short explanation of how to install yo is this:

	npm install -g yo
	npm install -g bower
	
Before we install it, let's run a few checks. We want to install into this folder:

	~/npm/bin/

How do we ensure that they end up there? By running this command:

	npm config set prefix ~/npm	

We can check to see if we have run that command previously, or run it correctly, by typing this command:

	npm config list

For instance, on my system, I get this:

```bash
npm config list
; cli configs
user-agent = "npm/2.5.0 node/v0.10.36 linux x64"

; userconfig /home/charlie/.npmrc
prefix = "/home/charlie/npm"

; node bin location = /usr/bin/node
; cwd = /home/charlie
; HOME = /home/charlie
; 'npm config ls -l' to show all defaults.
```

And what did we place in **.bashrc**? Code that looks like this:

	export NODE_PATH=$NODE_PATH:$HOME/npm/lib/node_modules

And what do we do after we make changes to **.bashrc**?

	source ~/.bashrc

Now you are reach to install things into the global folder. In this case, such a command would look like this:

	npm install -g yo


## Some Commonly Used Libraries {#common-lib}

```
npm install -g generator-express
npm install -g generator-angular
npm install -g generator-bootstrap
npm install -g generator-mocha
npm install -g generator-karma
```
Where do these files end up? On our systems, it should be:

	~/npm/lib/node_modules/

Why do they end up there? Because we ran:

	npm config set prefix ~/npm





## The .gitignore Exists error {#error-gitignore}

Suppose you run **yo express** and are told that **.gitignore** already exists. This particular error happens, I think, for one of three reasons.

*   You already have a copy of .gitignore in your current directory.
*   You have a copy of a file called .yo-rc.json in one of the directories closer to the root from the folder where you are currently working.

Let's discuss the first two cases first, since it is easy enough to understand them. Most of the time when we run yo express, we should be in an empty directory. In particular, we do something like this:

*   cd ~/Source
*   mkdir myapp
*   cd myapp
*   yo express

In that case, there should not, obviously, be a .**gitignore** in your current directory since it is empty. If, for some reason there is one there, and you really mean to working in that directory, then you might consider consider creating the express project in a temporary directory, and then merging the two projects with [meld](http://meldmerge.org/). (Pristine Lubuntu has meld on it). But I don't think that is what is happening in your case, though it may be.

The third case is the one that you and others may well be facing. When you were learning yo or linux or both, you may have accidentally run yo XXX in your home directory, or in your source directory, or some place else where you did not really mean to run it.&nbsp; For instance you might have done something like this, where you run yo XXX too soon:

*   cd ~/Source
*   mkdir myapp
*   yo express
*   cd myapp

Do you see that this series of commands runs **yo express** in **~/Source** before navigating to the **myapp** folder? That is not right.

If you do make this mistake, then this is what goes wrong: a hidden file called **.yo-rc.json** is created in your current folder. This file tells yo where the root of your project lies. Now, suppose you did your work in **~/Source**. So after running the erroneous commands shown above you have a copy of .yo-rc.json in your ~/Source folder. But all that happened last week, or even two weeks ago. Now you are younger, healthier, and wiser, and you correctly type the following commands:

*   cd ~/Source
*   mkdir myapp02
*   cd myapp02
*   yo express

Perfect! Right? Well yes, those are the right commands, but because there is a **.yo-rc.json** file in ~/**Source**, yo thinks that ~/**Source** is the root of your project. So it attempts to install **.gitignore** and all the other folders for your project not in **myapp02**, but in&nbsp;**~/Source.** And of course it finds the hidden **.gitignore** file from your previous, erroneous, install in **~/Source** and gives you the error you report above.&nbsp;The solution, of course, is to delete the offending file and rerun **yo ****express**:

*   cd ~/Source
*   rm .yo-rc.json
*   cd myapp
*   yo express

Now all should be fine. But what if it is isn't? What if you still get the warning about **.gitignore? **Well, that could be because you have totally messed things up and (back in the days when you were still learning Linux and Yo, you had done this, or the equivalent:

*   cd
*   yo express

This would mean that you created an express project and its **.yo-rc.json** file in your home directory. You created it -- oh most egregious of all errors! -- in **/home/bcuser**!&nbsp; Oh woe, oh the shame! The dreadful shame! At any rate, to fix that, you need to delete the offending file, and perhaps several other files, such as .gitignore, that are cluttering up your home folder:

*   cd
*   rm .yo-rc.json

Or:

*   rm ~/.yo-rc.json

Remember that cd, with no parameters, no arguments, takes you back to the home directory.

## Yeoman and Compass

To use Compass, you need to install [Ruby](https://www.ruby-lang.org/en/installation/). 

Now you are ready to build your app:

	gem install compass
	npm install -g yo
	npm install -g generator-webapp
	mkdir MyApp
	yo webapp
	bower install underscore
	grunt
	
The first three steps are one time only. After that, you only need run the
last four commands.

When you are done, CD into the dist directory and open index.html in
a browser.


