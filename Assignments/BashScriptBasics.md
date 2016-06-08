Here are assignments from a previous class that might shed light on this subject:

- <http://www.ccalvert.net/books/CloudNotes/Assignments/BashExpressScript.html>
- <http://www.ccalvert.net/books/CloudNotes/Assignments/CreateSymbolicLinksToScripts.html>

I know there are some downsides to these scripts but they also can provide an insight into how to work in the Linux environment, and how to customize your own Linux environment to your tastes.

A good place to begin is with CreateExpressProject:

[https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/CreateExpressProject](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/CreateExpressProject)

Take this section of it:

<pre># Create an express app and run npm install  
express $1  
cd $1  
# npm install</pre>

This code uses the express generator project that we installed into ~/npm/bin/express.

[http://expressjs.com/en/starter/generator.html](http://expressjs.com/en/starter/generator.html)

[https://www.npmjs.com/package/express-generator](https://www.npmjs.com/package/express-generator)

[https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/NpmHelper](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/NpmHelper)

It is on our path because we added this to our ~/.bashrc:

<pre>export PATH="$PATH:$HOME/npm/bin"</pre>

The express generator creates the basic structure of our express project.

After creating the project, the CreateExpressProject navigates into the folder for our new project. Right now I comment out the call to **npm install.** We could restore that. The $1 is the parameter passed to the script. For instance, if we type **CreateExpressProject Week01-Foo**, then $1 is **Week01-Foo**.

The rest of my CreateExpressProject script tweaks the express project to suit our needs or preferences. We:

*   Copy in bower files from JsObjects
*   Set up the port and project name
*   Add some **use strict** statements

If you look at CreateAllExpress, you can see that it calls TestReady:

[https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/TestReady](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/TestReady)

This file is mostly responsible for setting up karma, grunt and jscs. It does this mostly by copying in files from JsObjects. For instance, it copies in default **karma.conf.js** and **Gruntfile.js** files.

You can look at these script in several ways:

*   They help us save time in class. Think how much time we spend in class making sure everyone is up to speed on basic configuration issues. Think how much more time we would spend if we had to go through each of these steps during each class. It just gets to be too much. So these scripts helps us focus on the most important issues.
*   I probably should spend more time discussing the scripts and what they do. On the other hand, _**the scripts provide documentation on every step involved in creating a project**_. They also tend to stay up to date, which is not always the case for other kinds of documentation.

It never quite surfaces as a front line theme in the course, but a secondary theme running through everything we do is that idea that Linux can be configured to do anything we want by creating relatively simple scripts. For instance, the script we are using to set up Cloud Nine performs a lot of work very quickly, and serves as documentation describing, step by step, how to configure the Linux environment to do the things we want it to do.

[https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/CloudNineSetup](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/CloudNineSetup)

After this course is over, or even during the course, you can modify my scripts, or create your own scripts. I truly believe that these kinds of scripts are the best way to get some kinds of work done in the Linux OS. I also believe that they provide a system as good, and in some ways better (because more transparent) than common commands in Windows such as **File | New Project**.
