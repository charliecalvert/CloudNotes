---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/Eclipse.md
relativePath: elvenware/development/android/Eclipse.md
title: Eclipse
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: Eclipse.md
fileNameHTML: Eclipse.html
---

<!-- toc -->
<!-- tocstop -->

Eclipse Aptana Overview
=======================

On this page you can find information about Eclipse and Aptana. You can use these IDEs for many things, including creating Android or Web based projects.

![Eclipse Logo](images/eclipse_neg_logo_fc_sm.jpg)

I use [Eclipse](http://en.wikipedia.org/wiki/Eclipse_(software)) as my Primary tool for Android development. It is an IDE, written primarily in Java, which can be extended through a series of plugins. Hence you can use it not just, or even primarily, for Android development, but for a wide range of activities such as Java, JavaScript, Python, C++, Ruby, HTML or Scheme development.

Installing {#install}
----------

The simplest way to install Eclipse to work with Android is to do download the bundle from the following site:

-   [http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html)

Once you have the bundle, you should be able to simple unzip it and then run it.

The bundle does not come with an HTML editor. To get one, choose Help | Install Software

If the bundle does not work for you, or if you want to go through the process manually, then follow these steps:

-   Be sure that [Java is installed.][jdown]. The [JRE][jre]   will not work in all cases, so you should [get the JDK][jdk], which includes source code for the Java classes. To install the Oracle JDK on Ubuntu, use [webupd8.org][webupd8].
-   You will need to [download Eclipse
    Classic](http://www.eclipse.org/downloads/). The current version is
    called Indigo, which is version 3.7.1. Older versions are called
    Helios, Galileo and Ganymede. In June, 2012, which should see a new
    version called Juno. After installation, you should see the Java
    Development Tools (JDT) when you choose**Help | About | Installation
    Details** from the Eclipse IDE.
-   Be sure to [install the
    ADT](http://developer.android.com/sdk/eclipse-adt.html), Android
    Development Tools. The AVD and SDK manager are integrated into the
    Eclipse IDE.

Eclipse is Java based and does not use the Windows registry. This means you can place it wherever you want, and can simply zip it up and move it around. Java, however, is a bit more complicated, so you should first
ensure that the JDK is installed and then unzip your copy of Eclipse. I unzipped my copy into my [c:\\users\\charlie](file:///c:/users/charlie) directory. I then made a link from the start menu to Eclipse.exe.

You'll want the most recent version of Eclipse. A new release is shipped in June of each year.

  ------------- -------------- ------------------ -------------------
  Release       Date           Platform version   Projects
  Indigo        June 2011      3.7                Indigo projects
  Helios        23 June 2010   3.6                Helios projects
  Galileo       24 June 2009   3.5                Galileo projects
  Ganymede      25 June 2008   3.4                Ganymede projects
  Europa        29 June 2007   3.3                Europa projects
  Callisto      30 June 2006   3.2                Callisto projects
  Eclipse 3.1   28 June 2005   3.1
  Eclipse 3.0   28 June 2004   3.0
  ------------- -------------- ------------------ -------------------

[jdown]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[jre]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[jdk]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[webupd8]: http://www.webupd8.org/2012/09/install-oracle-java-8-in-ubuntu-via-ppa.html


##Using Eclipse {#usingEclipse}


There is extensive [Eclipse
documentation](http://help.eclipse.org/indigo/index.jsp), including many
[tutorials](http://www.eclipse.org/resources/?category=Getting%20Started).

When you first start Eclipse, or when you select**Help | Welcome** from the menu, you see the Welcome screen:

[![Eclipse Welcome
Screen](images/EclipseWelcomeSmall.png)](images/EclipseWelcome.png)

Notice that there are a number of useful links in the Welcome. Browse
them and become familiar with their contents. When you are ready, notice
that in the upper right hand corner of the Welcome screen there is a
link to the Workbench.

### Shortcuts

You can always see all the available shortcuts in any particular context
by pressing Ctrl-Shift-L.

### Workbench

The workbench is the Eclipse name for the IDE desktop. The workbench
contains a series of windows, called editors or views, and they can be
arranged in various patterns, which are called perspectives. If you can
edit the content in a window, then it is called a Editor, and if you
can't edit the content, then it is called a View. Typically, a
perspective has one editor and multiple views.

-   Workbench: The entire IDE
-   Perspective: A particular arrangement of windows
-   Views: An individual window, or segment, of the desktop with content
    that can't be edited.
-   Editors: An individual window, or segement, of the desktop with
    content that can be edited.

[![Eclipse
Workbench](images/EclipseWorkbench01Small.png)](images/EclipseWorkbench01.png)

**Figure 01: The Eclipse workbench with an Editor in the middle
(ListViewActivity3.ja) surrounded by a series of Views (Task List,
Outline, Package Explorer, Problems, Javadoc, Declaration).**

Changing Perspectives {#perspectives}
-------------------------

Eclipse allows you to switch perspectives, or modes, depending on your
current task.

XML Files and WYSIWIG Editor {#xmlEditor}
----------------------------

There are many different XML files involved in Android development, so
they have some fancy XML editors, but that is not the same thing as an
advanced. When using the visual tools to edit an XML file, you want to
expose the Palette, the editor, the Outline View and the Properties
view. Notice that the palette has categories, such as **Text Fields**.
Notice that you want to set the input type for the Text Field. Notice
also the Custom and Library view to find some custom views that you
created yourself or got from a library.

[![WYSIWIG XML file
Editor](images/WysiwigLayoutSmall.png)](images/WysiwigLayout.png)

Figure 01: The Palette, the Wysiwig editor, the outline view and the
properties view.

There is an Layout ActionBar at the top of the Wysiwig editor that gives
you some fancy options.

You can switch between different screen sizes, such as phone and tablet,
or between portrait and landscape.

[http://j.mp/androidassetstudio](http://j.mp/androidassetstudio)

Run Configurations

Suppose you want to run a PhoneGap project out of the IDE.

-   Choose **Run | Run Configurations**, or right click on your project
    and choose **Run As | Run Configurations**.
-   On the left select **Android Application**, if it is not selected
    already.
-   On the right select the **Android** page if it is not already
    selected, then select your Cordova project, or click the browse
    button and locat it. Select the **Target** page.
-   Choose **Always prompt to select device**. This will give you a
    chance to pick any running Android device attached to the system, be
    it a VirtualBox Android VM, an AVD, or physical Android device.

After completing the above steps, sive you **Run Configuration** a name,
hit the **Apply** button, and then select **Run**. The first time you
run like this it may take 5 to 10 seconds for the dialog allowing you to
pick a device to pop up. The next time, however, the dialog should
appear in a second or two. The dialog will allow you to select the
device in which you want to run your application.

Install the HTML Editor {#installHtml}
-----------------------

Go to **Help | Install New Software.**Set the **Work With** list to:

``` {.code}
Indigo - http://download.eclipse.org/releases/indigo
```

Open up or expand the option labelled **Web, XML and Java EE
Development,**but check only the **Web Page Editor.** Just that one
item. There is a long list of items to install, but you only need the
Web editor.

Also see the section on Aptana, as it shows how to install the Aptana
plugin for Eclipse

Aptana
------

Aptana is an IDE based on the Eclipse core. It is Eclipse, but it
contains several custom tools designed for web developers interested
primarily HTML, CSS, JavaScript, PHP and Python developers.

At this time, Aptana is based on Eclipse 3.6 (Helios) and not Eclipse
3.7 (Indigo). You can, however, install the Andtroid Development Tools
(ADT) into Aptana.

-   Select **Help | New Software**, from the menu.
-   Click on **Available Software Sites**
-   Select **Eclipse Helios Update Site**and click Ok.
-   Use the Add button to install the ADT site:
    https://dl-ssl.google.com/android/eclipse/

After completing the above steps you will be able to do Android and Web
development in the same IDE. This is particularly nice if you are
interested in PhoneGap.

### Aptana Plugin for Eclipse {#aptanaEclipse}

Alternatively, you can install the Aptana Plugin into Eclipse.

Go to **Help | Install New Software.**Set the Work With list to:

-   [http://download.aptana.com/studio3/plugin/install](http://download.aptana.com/studio3/plugin/install)

If you currently have PyDev installed, you may have to remove it before
you can install the Aptana Plugin.

Create a Web Project {#createProject}
--------------------

1.  Menu: **Window | Open Perspective | (Other) Web** 
2.  Menu: **File | New | Web Project | Default Project** 
3.  In the Project Explorer right click on your new project and
    choose **New from Template | JavaScript | JavaScript Template**
4.  Alternatively, in the App Explorer, you can right in the main panel
    and choose **New from Template | JavaScript | JavaScript Template**
    
It is frequently a good idea to examine the **.project** file created when you
build a web project. Because these files begin with a period, they will be 
treated as "hidden" files on most operating systems. As a result, you may
need to tweak your file explorer to allow you to view hidden files.

These **.project** files are short text files, and they are not difficult
to understand, at least in part. Here for instance, is a simple **.project** file
for a web project:

```
<?xml version="1.0" encoding="UTF-8"?>
<projectDescription>
	<name>MakeDirectory</name>
	<comment></comment>
	<projects>
	</projects>
	<buildSpec>
		<buildCommand>
			<name>com.aptana.ide.core.unifiedBuilder</name>
			<arguments>
			</arguments>
		</buildCommand>
	</buildSpec>
	<natures>
		<nature>com.aptana.projects.webnature</nature>
	</natures>
</projectDescription>
```

Notice the **name** of the project:

	<name>MakeDirectory</name>
	
If you import this project into Eclipse, then this name will be displayed in 
the project manager. 

I usually create web projects in Eclipse. However, there is nothing to prevent
you from copying the files from one directory into a second directory. This 
allows you to quickly create a new project based on the work of an existing
project. This system works fine, but in such cases you have to be careful to
give the new project a name that differs from the name of the original project.

You cannot import two projects with the same name into the same Eclipse 
workspace. This means that you have to take care in certain cases:

* If you copy a .project file from one project to another. In this case you can
easily end up with two .project files with the same name. The solution is simple,
open one of the **.project** files in an editor, and change the name.
* If you are student in a class turning in an assignment. In such cases, you will
usually want to include your name in the project, to distinguish your work from
others in your class:

	<name>MakeDirectory-Calvert</name>

In general, **.project** files for web projects seem mysterious and 
confusing at first. However, they are not really very complicated and you 
can easily learn to work with them.

Aptana: Import Existing Web Site {#aptanaProject}
--------------------------------

If you have a big website that you want to start editing in Aptana, then
you probably don't want to use the Aptana mechanism for import it
because it requires that you move files from one location to another. In
other words, you probably have the files in the place where you want
them, so why move them just to start using Aptana? There is, however, a
simple way to create an Aptana project for your site

If possible create a workspace just one step closer to the root of of
the file system than the project you want to import. This is not
necessary, but may be useful, especially if you have several big web
sites that you want to import in the same way described here. If you
can't or don't want to take this step, then just open a workspace
somewhere on your system.

Switch to Project Explorer. At the top, it says Local File System. Use
this view to navigate to your project. Right click on the root directory
for your site. Choose **Promote to Project**.

Remove a Plugin {#remove}
---------------

Choose **Help | Install Softare.** Click on the **What's Already
Installed?** link. Select the item you want to uninstall, and press the
uninstall button. (There is some chance this button is not available in
earlier versions of Eclipse. In that case, I believe the correct thing
to do is disable the feature that you want to remove from the IDE.)

Import a Project {#import}
----------------

If you have a project on disk that is not visible inside of Eclipse,
then you need to ***import*** it. When you import the project, you add
it to the IDE, so that you can see it in the Project Explorer or similar
tools.

There are (slightly) different techniques for importing projects into
Eclipse depending on the type of project you wish to add to the IDE. If
the project is a Cordova project, then choose:

-   Import | **Android** | Existing Code into Workspace

If it is a Web Project, then choose:

-   Import | **General** | Existing Projects into Workspace

There are other ways to import other types of projects into Eclipse, but
the two examples shown above should give you enough of a sense of how
things work so that you can figure out how to import a Java project,
Python project, or some other type of project.

Eclipse uses a file called .project to track the configuration for the
projects that it maintains. This file must exist before you can import a
project using the type of techniques shown above. If you just have a
folder with some files in it, and there is no **.project** file in the
folder, then choose:

-   Import | General | **Existing Folder** into Project

This will create a default .project file and allow you to begin working
with the project inside the IDE. In some cases, it may be better to
first create a project in Eclipse, then copy your files into the folders
that Eclipse created. But for simple Web Projects, then the import
existing folder option should work just fine.

HTML Snippets in Aptana or Aptana Plugin {#snippets}
----------------------------------------

You can create snippets in Eclipse. These snippets can be easily
triggered and insert into your code at any random point. I like to set
the trigger and name for each of them to begin with my initials so I can
easily find my templates. Below is a screen shot showing them visible
when I trigger code expansion (crtl-space) in Eclipse.

In Eclipse, from the menu: **Commands | HTML | Edit this Bundle.  **This
should create a project called **HTML** and open it in Eclipse.

In the **Project Explorer**, open the project called **HTML.** Open the
**templates** folder and edit the file called **templates.rb**. Insert
your snippets into the file and restart the IDE.

Here are example snippets, where trigger is what you type to trigger the
snippets in the IDE after you type **ctrl + space.**The **expansion** is
the code that you want to have pasted into the IDE when you choose the
snippet:

``` {.code}
snippet "csc jQuery CDN" do |snip|
  snip.trigger = "cscJQueryCDN"
  snip.expansion = "<script src='http://code.jquery.com/jquery.js'></script>"
end

snippet "csc jQueryMin CDN" do |snip|
  snip.trigger = "cscJQueryMinCDN"
  snip.expansion = "<script src='http://code.jquery.com/jquery.min.js'></script>"
end

snippet "csc Paragraph ID" do |snip|
  snip.trigger = "cscParagraphID"
  snip.expansion = "<p id=''> </p>"
end
```

Here is an example of multiline snippet. Notice that I escape the jQuery
dollar sign symbol with a backslash: \\\$. This is necessary because the
\$ symbol has special meaning inside snippets:

``` {.code}
snippet "csc jQuery Document Ready" do |snip|
  snip.trigger = "cscJqDocReady"
  snip.expansion = '\$(document).ready(function() {
    "use strict";
});'
end
```

Below is a screen shot showing what it looks like when you edit the
snippets in **templates.rb**. Note the you should have snippets that
begin with your initials, not with mine. For instance, if your name is
John Paul Jones, then your snippets could have names like
**jpjJQueryCDN**.

![Templates01.png](images/Templates01.png)

Besides the**templates.db**file, notice also the snippets folder in the
HTML project and the **snippets.rb**. (By the way, rb files are Ruby
scripts.)

The ruble specification appears to be something that is being developed
by the Aptana team. It first appeared in Studio 3, and the source is
being maintained on Github. More information on the project can be found
here:

-   [https://wiki.appcelerator.org/display/tis/Ruble+Specification](https://wiki.appcelerator.org/display/tis/Ruble+Specification)
-   [https://wiki.appcelerator.org/display/tis/Modifying+an+existing+Ruble](https://wiki.appcelerator.org/display/tis/Modifying+an+existing+Ruble)
-   [https://wiki.appcelerator.org/display/tis/Creating+a+new+snippet](https://wiki.appcelerator.org/display/tis/Creating+a+new+snippet)s

Eclipse and JSHint {#jsHint}
------------------

You can integrate JSHint into Eclipse. To install JS Hint integration
into Eclipse, choose **Help | Install | Add** from the Eclipse menu and
enter a name (ie JSHint) and this URL:

-   [http://github.eclipsesource.com/jshint-eclipse/updates/](http://github.eclipsesource.com/jshint-eclipse/updates/)

Here is what it looks like:

![JsHint02.png](images/JsHint02.png)

After you have installed JSHint, you can turn it on project by project.
Bring up the context menu for your project by right clicking on the
project. Select Properties and expand the JSHint node. You can turn
JSHint on for all the JavaScript files in the project, or for some
subset of the JavaScript files in the project. After installation is
completed, I find that JSHint often does not show its hints until I save
the file that I am editing. The hints usually show up as yellow flags on
the left hand side of the editor. 

![JsHint01.png](images/JsHint01.png)

For instance, create a web project called JSHint-LastName where LastName
is your last name. A sceen shot showing the project name in the JSHint
dialog is visiable above. To find the dialog, right click on your
project to bring up the context menu, and then
choosing **Properties. **Expand the JSHint options, and set up a rule to
turn on JSHint for the file **index**.**js** in the root folder for your
project. An example screen shot is shown above. 

If you are using jQuery, in the options dialog, perhaps you need to add
the following: "jquery: true".

Suppose you have the following line in your code:

    $("#time2").html("Also jQuery name: " + device.name);

If you are using JSHint integration in Eclipse, you will get two
warnings on this page, one for the \$ from jQuery, and one for
**device** from Cordova. Of course, both \$ and device are defined
elsewhere, and should be part of our code. They are not an error or a
mistake. So how do we get rid of them? One way to eliminate these
warnings is to place the following at the top of JavaScript file:

/\*global \$:false, device:false \*/

It turns out that jQuery is so commonly used that there is a general way
to tell JSHint to ignore everything having to do with jQuery:

    /*jshint jquery:true */

Notice that here we use **jshint** rather than **global**, and we set
**jquery** to **true**, rather than setting **\$** to **false**.
Regardless of the specifics, the comment ends up calming JSHints fears
without affecting our code at run time. In particular, because the
message to JSHint takes the form of a comment, it is ignored by the
JavaScript run time engine.

Another approach is to put the following in the top option window in the
JSHint dialog you get to from the **properties** context menu for the
project. More specifically: right click on the project in the **Project
Explorer**, then select  **Properties | JSHint | Options** and set the
following value, exactly as shown, in the **Predefined globals** window:

    device:false

Now add the following to the **JSHint Options** window (that's the lower
of the two windows):

    jquery: true

This still leaves problems with things console.log, alert, and window
object. To eliminate these warnings, once again bring up the JSHint
Options dialog and place all of the following in the **JSHint Options**
window:

    browser:true, devel:true, jquery:true

Here is what it looks like on my system:

![JsHint04.png](images/JsHint04.png)

 Another option you should consider is **strict:true.**

Run JSHint as an External Tool {#jsHintExternal}
------------------------------

From inside of Eclipse you can run JSHint against the file you are
currently editing. To make this work, you first need to[download the
source](https://github.com/jshint/jshint/tags) to JSHint from the JSHint
github site. The download is a zip file. You should unzip the contents
of the file and place it in a well known location on your hard drive,
such as the **C:\\Dev** folder.

-   Choose **Run | External Tools | External Tool Configuration**
-   Select **Program** and click the **New** button
-   Set **Name = JSHint**
-   Set Location=C:\\Windows\\System32\\cscript.exe
-   Set two arguments
-   Argument1 = C:\\Development\\jshint-r12\\env\\wsh.js
-   Arbument2 = \${resource\_loc}

![JSHint run as an External tool](images/JsHint05.png)

Figure 01: Press the Run button to run JSHint against the current
JavaScript file open in your Eclipse Editor. The results appear in the
console window at the bottom of your screen.

Here is a bit more explanation of the various fields you should fill out
in the External Tools Configuration dialog.

-   The **Location** is set to cscript.exe, which is a JavaScript
    compiler that ships with Windows.
-   The first of the two **arguments** is the path to my downloaded copy
    of JSHint, and in particular, to the wsh.js file, which is designed
    to work with the Windows JavaScript engine.
-   The second of the two arguments is a macro that resolves to the name
    of the file currently open in the editor. More details on the
    available macros are found in the Eclipse help on the [external
    tools](http://help.eclipse.org/juno/index.jsp?topic=%2Forg.eclipse.platform.doc.user%2Fconcepts%2Fconcepts-exttools.htm)
    page.

To run this command from the IDE, choose the smaller of the two green
Run buttons found on the toolbar, or just press the run button from
inside the External Tools Configurations. You can see this button at the
bottom right of the screen shot shown above. If by some chance you can't
find the **Console** window, you can access it from **Window | Show View
| Console**(Alt + Shift + Q, C).

If you wanted to run a similar command from the command prompt, you
might type something like this:

``` {.code}
cscript C:\Development\jshint-r12\env\wsh.js c:\Temp\CordovaAndroid\assets\www\js\index.js
```

The command shown above has three parts:

1.  We call cscript, which is stored in c:\\windows\\system32 directory,
    which means that it should always be on our path.
2.  The firstargument points to the location where we unzipped our
    JSHint download. More specifically, it points to that location, and
    then to a particular file called wsh.js stored in the env folder.
    This file implements JSHint for the Windows Script engine
    (cscript.exe).
3.  The third argument points to the file that we want to check. The
    outpoint will show up on the command line.

If you are running JSHint from the command line, or as an external tool,
you can specify options by placing a comment like this at the top of
your JavaScript source file:

``` {.code}
/*jshint jquery:true, browser:true, devel:true, strict:true */
```

You can also ask JSHInt to ignore a global variable. For instance, the
following ignores a global identifier called **device**:

``` {.code}
/*global device: false */
```

## Wrapping Operators

- **JavaScript | Code Style | Formatter**

Then **Edit | Expressions | Binary Expressions**

Then turn off **Wrap before operator**.

Links
-----

-   [http://tools.android.com](http://tools.android.com)
-   [http://source.android.com](http://source.android.com)
-   [Eclipse Keyboard
    Shortcuts](http://www.shortcutworld.com/en/win/Eclipse.html#link_4)
    (ShortcutWorld)
-   [Essential Eclipse
    Shortcuts](http://www.rossenstoyanchev.org/write/prog/eclipse/eclipse3.html)

What's Next {#next}
-----------

Now you should go on to the section about the [Android
SDK](AndroidSdk.html).

 
