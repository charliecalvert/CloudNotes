---
layout: page
date: 2023-05-11 08:25:53 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/EclipseSetup.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android
fileName: EclipseSetup.md
relativePath: /android/EclipseSetup.md
title: EclipseSetup
directoryName: android
category: android-guide
---

## Eclipse Aptana Overview

This page is very outdated and needs to be rewritten. For now it is probably best ignored because Android development is no longer commonly done with Aptana or Eclipse. Instead, developers use Android Studio, which is a variation on the WebStorm IDE that we use in my classes at BC.


<p>On this page you can find information about Eclipse and Aptana. You
			can use these IDEs for many things, including creating Android or Web based projects.</p>
				<div id="cse" style="width: 100%;">Loading</div>

<h2>Index</h2>
<ul>
	<li><a href="#install">Installing</a></li>
	<li><a href="#usingEclipse">Using Eclipse</a></li>
	<li><a href="#shortcuts">Shortcuts</a></li>
	<li><a href="#workbench">Workbench</a></li>
	<li><a href="#perspectives">Perspectives</a></li>
	<li><a href="#xmlEditor">XML Editor</a></li>
	<li><a href="#installHtml">Install the HTML Editor</a></li>
	<li><a href="#aptana">Aptana</a></li>
	<li><a href="#aptanaEclipse">Aptana Plugin for Eclipse</a></li>
	<li><a href="#aptanaProject">Aptana Import Web Site</a></li>
        <li><a href="#createProject">Create a Web Project</a></li>
	<li><a href="#remove">Remove a Plugin</a></li>
        <li><a href="#import">Import a Project or Folder</a></li>
	<li><a href="#snippets">HTML Snippets in Aptana</a></li>
	<li><a href="#jsHint">Eclipse and JSHint</a></li>
        <li><a href="#jsHintExternal">Run JSHint as an External Tool</a></li>
	<li><a href="#links">Links</a></li>
	<li><a href="#next">What's Next?</a></li>
</ul>

I use <a href="https://www.google.com/search?q=webstorm" target="\_blank">WebStorm</a> as my Primary tool for Android development. Many use a variation of WebStorm called [Android Studio](https://www.google.com/search?q=Android+Studio). It is an IDE and you can use it not just, or	even primarily, for Android development, but for a wide range of activities such as Java, JavaScript, Python, C++, Ruby, HTML or Scheme development.</p>

Be sure to <a href="https://developer.android.com/studio/index.html">install Android Studio</a>. The ADT Eclipse Plugin is no longer supported.


<table style="width: 100%">
<tr>
<td style="width: 196px; height: 23px">Release </td>
<td style="height: 23px">Date </td>
				<td style="height: 23px">Platform version </td>
<td style="height: 23px">Projects</td>
</tr>
<tr>
	<td style="width: 196px; height: 23px">Indigo </td>
	<td style="height: 23px"> June 2011 </td>
	<td style="height: 23px">3.7 </td>
	<td style="height: 23px">Indigo projects</td>
</tr>
<tr>
	<td style="width: 196px">Helios </td>
	<td> 23 June 2010 </td>
	<td>3.6 </td>

<td>Helios projects</td>
</tr>
<tr>
	<td style="width: 196px">Galileo </td>
	<td>24 June 2009 </td>
	<td>3.5 </td>

	<td>Galileo projects</td>
</tr>
<tr>
	<td style="width: 196px">Ganymede </td>
	<td>25 June 2008 </td>
	<td>3.4 </td>

	<td>Ganymede projects</td>
</tr>
<tr>
	<td style="width: 196px">Europa </td>
	<td> 29 June 2007 </td>
	<td>3.3 </td>

	<td>Europa projects</td>
</tr>
<tr>
	<td style="width: 196px">Callisto </td>
	<td>30 June 2006 </td>
	<td>3.2 </td>
	<td>Callisto projects</td>
</tr>
<tr>
	<td style="width: 196px">Eclipse 3.1 </td>
	<td>28 June 2005 </td>
	<td>3.1</td>
</tr>
<tr>
	<td style="width: 196px">Eclipse 3.0</td>
	<td>28 June 2004</td>
	<td>3.0</td>
</tr>
</table>

<h2 id="usingEclipse">Using Eclipse</h2>
<p>There is extensive <a href="http://help.eclipse.org/indigo/index.jsp" target="\_blank">
Eclipse documentation</a>, including many
<a href="https://wiki.eclipse.org/Eclipse_Articles,_Tutorials,_Demos,_Books,_and_More">
tutorials</a>.</p>

<p>When you first start Eclipse, or when you select<strong> Help |
Welcome</strong> from the menu, you see the Welcome screen.</p>

<p><a href="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/EclipseWelcome.png" target="\_blank"><img class="leaveAlone" alt="Eclipse Welcome Screen" src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/EclipseWelcomeSmall.png" /></a></p>

<p>Notice that there are a number of useful links in the Welcome. Browse
them and become familiar with their contents. When you are ready, notice
that in the upper right hand corner of the Welcome screen there is a
link to the Workbench. </p>

<h3 id="shortcuts">Shortcuts</h3>

<p>You can always see all the available shortcuts in any particular context
	by pressing Ctrl-Shift-L.</p>

<h3 id="workbench">Workbench</h3>

<p>The workbench is the Eclipse name for the IDE desktop. The workbench
contains a series of windows, called editors or views, and they can be
arranged in various patterns, which are called perspectives. If you can
edit the content in a window, then it is called a Editor, and if you
can't edit the content, then it is called a View. Typically, a
perspective has one editor and multiple views.</p>
<ul>
	<li>Workbench: The entire IDE</li>
	<li>Perspective: A particular arrangement of windows</li>
	<li>Views: An individual window, or segment, of the desktop with
	content that can't be edited.</li>
	<li>Editors: An individual window, or segement, of the desktop with
	content that can be edited.</li>
</ul>

<p>
	 <a href="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/EclipseWorkbench01.png"  target="\_blank">
	 <img class="leaveAlone" alt="Eclipse Workbench" src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/EclipseWorkbench01Small.png" /></a></p>

<p><strong>Figure 01: The Eclipse workbench with an Editor in the middle
(ListViewActivity3.ja) surrounded by a series of Views (Task List,
Outline, Package Explorer, Problems, Javadoc, Declaration).</strong></p>
<h2 id="perspectives"><strong>Changing Perspectives</strong></h2>
<p>Eclipse allows you to switch perspectives, or modes, depending on
your current task. </p>

<h2 id="xmlEditor">XML Files and WYSIWIG Editor</h2>

<p>There are many different XML files involved in Android development, so they
have some fancy XML editors, but that is not the same thing as an advanced. When
using the visual tools to edit an XML file, you want to expose the Palette, the
editor, the Outline View and the Properties view. Notice that the palette has
categories, such as <strong>Text Fields</strong>. Notice that you want to set
the input type for the Text Field. Notice also the Custom and Library view to
find some custom views that you created yourself or got from a library.</p>

<p>
<a href="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/WysiwigLayout.png">
<img class="leaveAlone" alt="WYSIWIG XML file Editor" src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/WysiwigLayoutSmall.png" /></a></p>

<p>Figure 01: The Palette, the Wysiwig editor, the outline view and the
properties view.</p>

<p>There is an Layout ActionBar at the top of the Wysiwig editor that gives you
some fancy options.</p>

<p>You can switch between different screen sizes, such as phone and tablet, or
between portrait and landscape.</p>

<p>Run Configurations</p>

<p>Suppose you want to run a PhoneGap project out of the IDE. </p>

<ul>
	<li>Choose <strong>Run | Run Configurations</strong>, or right click
	on your project and choose <strong>Run As | Run Configurations</strong>.
	</li>
	<li>On the left select <strong>Android Application</strong>, if it
	is not selected already. </li>
	<li>On the right select the <strong>Android</strong> page if it is
	not already selected, then select your Cordova project, or click the
	browse button and locat it. Select the <strong>Target</strong> page.
	</li>
	<li>Choose <strong>Always prompt to select device</strong>. This
	will give you a chance to pick any running Android device attached
	to the system, be it a VirtualBox Android VM, an AVD, or physical
	Android device.</li>
</ul>
<p>After completing the above steps, sive you <strong>Run Configuration</strong>
a name, hit the <strong>Apply</strong> button, and then select <strong>
Run</strong>. The first time you run like this it may take 5 to 10
seconds for the dialog allowing you to pick a device to pop up. The next
time, however, the dialog should appear in a second or two. The dialog
will allow you to select the device in which you want to run your
application.</p>
<h2 id="installHtml">Install the HTML Editor</h2>
<p>Go to <strong>Help | Install New Software. </strong>Set the <strong>
Work With</strong> list to:</p>
<pre class="code">Indigo - <a href="http://download.eclipse.org/releases/indigo">http://download.eclipse.org/releases/indigo</a></pre>

<p>Open up or expand the option labelled <strong>Web, XML and Java EE
Development, </strong>but check only the <strong>Web Page Editor.</strong>
Just that one item. There is a long list of items to install, but you
only need the Web editor. </p>

<p>Also see the section on Aptana, as it shows how to install the Aptana
plugin for Eclipse</p>
<h2 id="aptana">Aptana</h2>
<p>Aptana is an IDE based on the Eclipse core. It is Eclipse, but it
contains several custom tools designed for web developers interested
primarily HTML, CSS, JavaScript, PHP and Python developers.</p>
<p>At this time, Aptana is based on Eclipse 3.6 (Helios) and not Eclipse
3.7 (Indigo). You can, however, install the Andtroid Development Tools
(ADT) into Aptana. </p>
<ul>
	<li>Select <strong>Help | New Software</strong>, from the menu.</li>
	<li>Click on <strong>Available Software Sites</strong></li>
	<li>Select <strong>Eclipse Helios Update Site </strong>and click Ok.</li>
	<li>Use the Add button to install the ADT site:
	https://dl-ssl.google.com/android/eclipse/</li>
</ul>

<p>After completing the above steps you will be able to do Android and
Web development in the same IDE. This is particularly nice if you are
interested in PhoneGap.</p>

<h3 id="aptanaEclipse">Aptana Plugin for Eclipse</h3>

<p>Alternatively, you can install the Aptana Plugin into Eclipse. </p>

<p>Go to <strong>Help | Install New Software. </strong>Set the Work With
list to:</p>
<ul>
	<li>
	<a href="http://download.aptana.com/studio3/plugin/install" rel="nofollow" style="TEXT-ALIGN: left; PADDING-BOTTOM: 0px; BORDER-RIGHT-WIDTH: 0px; WIDOWS: 2; TEXT-TRANSFORM: none; BACKGROUND-COLOR: rgb(255,255,255); TEXT-INDENT: 0px; MARGIN: 0px; PADDING-LEFT: 0px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; FONT: 14px/18px Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif; WHITE-SPACE: normal; ORPHANS: 2; BORDER-TOP-WIDTH: 0px; BORDER-BOTTOM-WIDTH: 0px; COLOR: rgb(74,107,130); VERTICAL-ALIGN: baseline; BORDER-LEFT-WIDTH: 0px; CURSOR: pointer; WORD-SPACING: 0px; TEXT-DECORATION: none; PADDING-TOP: 0px; border-image: initial; background-origin: initial; background-clip: initial; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px">
	http://download.aptana.com/studio3/plugin/install</a></li>
</ul>

<p>If you currently have PyDev installed, you may have to remove it
before you can install the Aptana Plugin. </p>

<h2 id="createProject">Create a Web Project </h2>
<ol>
    <li>Menu:&nbsp;<strong>Window | Open Perspective | (Other) Web</strong>&nbsp;</li>
    <li>Menu:&nbsp;<strong>File | New | Web Project | Default Project</strong>&nbsp;</li>
    <li>In the&nbsp;Project Explorer&nbsp;right click on your new project and choose&nbsp;<strong>New from Template | JavaScript | JavaScript Template</strong></li>
    <li>Alternatively, in the&nbsp;App Explorer,&nbsp;you can right in the main panel and choose&nbsp;<strong>New from Template | JavaScript | JavaScript Template</strong></li>
</ol>


<h2 id="aptanaProject">Aptana: Import Existing Web Site</h2>
<div>
<p>If you have a big website that you want to start editing in Aptana,
	then you probably don't want to use the Aptana mechanism for
	import it because it requires that you move files from one
	location to another. In other words, you probably have the files
	in the place where you want them, so why move them just to start
	using Aptana? There is, however,
	a simple way to create an Aptana project for your site</p>
<p>If possible create a workspace just one step closer to the root of
	of the file system than the project you want to import. This is not
	necessary, but may be useful, especially if you have several big
	web sites that you want to import in the same way described here. If
	you can't or don't want to take this step, then just open a workspace
	somewhere on your system.</p>
<p>Switch to Project Explorer. At the top, it says Local File System. Use this
	view to navigate to your project. Right click on the root directory for your
	site. Choose <strong>Promote to Project</strong>.</p>
</div>
<h2 id="remove">Remove a Plugin</h2>
<p>Choose <strong>Help | Install Softare.</strong> Click on the <strong>
What's Already Installed?</strong> link. Select the item you want to
uninstall, and press the uninstall button. (There is some chance this
button is not available in earlier versions of Eclipse. In that case, I
believe the correct thing to do is disable the feature that you want to
remove from the IDE.)</p>

## Import a Project {#import}

<p>If you have a project on disk that is not visible inside of Eclipse, then you need to <strong><em>import</em></strong> it. When you import the project, you add it to the IDE, so that you can see it in the Project Explorer or similar tools. </p>
<p>There are (slightly) different techniques for importing projects into Eclipse depending on the type of project you wish to add to the IDE. If the project is a Cordova project, then choose:</p>

<ul>
<li><span style="font-size: 13.333333015441895px; line-height: 1.5;">Import | <strong>Android</strong> | Existing Code into Workspace</span></li>
</ul>
<p><span style="font-size: 13.333333015441895px; line-height: 1.5;">If it is a Web Project, then choose:</span></p>
<ul>
<li><span style="font-size: 13.333333015441895px; line-height: 1.5;">Import | <strong>General</strong> | Existing Projects into Workspace</span></li>
</ul>
<p>There are other ways to import other types of projects into Eclipse, but the two examples shown above should give you enough of a sense of how things work so that you can figure out how to import a Java project, Python project, or some other type of project.</p>
<p>Eclipse uses a file called .project to track the configuration for the projects that it maintains. This file must exist before you can import a project using the type of techniques shown above. If you just have a folder with some files in it, and there is no <strong>.project</strong> file in the folder, then choose:</p>
<ul>
<li>Import | General | <strong>Existing Folder</strong> into Project</li>
</ul>

<p>This will create a default .project file and allow you to begin working with the project inside the IDE. In some cases, it may be better to first create a project in Eclipse, then copy your files into the folders that Eclipse created. But for simple Web Projects, then the import existing folder option should work just fine.</p>

## HTML Snippets in Aptana or Aptana Plugin {#snippets}

<p>You can create snippets in Eclipse. These snippets can be easily
triggered and insert into your code at any random point. I like to set
the trigger and name for each of them to begin with my initials so I can
easily find my templates. Below is a screen shot showing them visible when
I trigger code expansion (crtl-space) in Eclipse.</p>
<p>In Eclipse, from the menu:&nbsp;<strong>Commands | HTML | Edit this Bundle. &nbsp;</strong>This should create a project called
<strong>HTML</strong> and open it in Eclipse.</p>
<p>In the <strong>Project Explorer</strong>, open the project called <strong>HTML.</strong> Open the <strong>templates</strong> folder and edit the file called <strong>templates.rb</strong>. Insert your
snippets into the file and restart the IDE.</p>
<p>Here are example snippets, where trigger is what you type to trigger the
snippets in the IDE after you type <strong>ctrl + space. </strong>The <strong>
expansion</strong> is the code that you want to have pasted into the IDE when
you choose the snippet:</p>

```code
snippet "csc jQuery CDN" do |snip|
  snip.trigger = "cscJQueryCDN"
  snip.expansion = "&lt;script src='http://code.jquery.com/jquery.js'&gt;&lt;/script&gt;"
end

snippet "csc jQueryMin CDN" do |snip|
  snip.trigger = "cscJQueryMinCDN"
  snip.expansion = "&lt;script src='http://code.jquery.com/jquery.min.js'&gt;&lt;/script&gt;"
end

snippet "csc Paragraph ID" do |snip|
  snip.trigger = "cscParagraphID"
  snip.expansion = "&lt;p id=''&gt; &lt;/p&gt;"
end
```

<p>Here is an example of multiline snippet. Notice that I escape the jQuery
dollar sign symbol with a backslash: \$. This is necessary because the $ symbol
has special meaning inside snippets:</p>

```code
snippet "csc jQuery Document Ready" do |snip|
  snip.trigger = "cscJqDocReady"
  snip.expansion = '\$(document).ready(function() {
    "use strict";
});'
end
```

<p>Below is a screen shot showing what it looks like when you edit the snippets in <strong>templates.rb</strong>. Note the  you should have snippets that begin with your initials, not with mine. For instance, if your name is John Paul Jones, then your snippets could have names like <strong>jpjJQueryCDN</strong>.</p>

<p><img src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/Templates01.png" alt="Templates01.png" /></p>

<p>Besides the<strong> templates.db </strong>file, notice also the
snippets folder in the HTML project and the <strong>snippets.rb</strong>. (By the way, rb files
are Ruby scripts.)</p>
<p>The ruble specification appears to be something that is being
developed by the Aptana team. It first appeared in Studio 3, and the
source is being maintained on Github. More information on the project
can be found here:</p>
<ul>
	<li>
	<a href="https://wiki.appcelerator.org/display/tis/Ruble+Specification">
	https://wiki.appcelerator.org/display/tis/Ruble+Specification</a></li>
	<li>
	<a href="https://wiki.appcelerator.org/display/tis/Modifying+an+existing+Ruble">
	https://wiki.appcelerator.org/display/tis/Modifying+an+existing+Ruble</a></li>
	<li>
	<a href="https://wiki.appcelerator.org/display/tis/Creating+a+new+snippet">
	https://wiki.appcelerator.org/display/tis/Creating+a+new+snippet</a>s</li>
</ul>
<h2 id="jsHint">Eclipse and JSHint</h2>
<p>You can integrate JSHint into Eclipse. To install JS Hint integration into Eclipse, choose <strong>Help | Install | Add</strong>&nbsp;from the Eclipse menu and enter a name (ie JSHint) and this URL:</p>
<ul>
	<li><a href="http://github.eclipsesource.com/jshint-eclipse/updates/">http://github.eclipsesource.com/jshint-eclipse/updates/</a></li>
</ul>
<p>Here is what it looks like:</p>

<p><img src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/JsHint02.png" alt="JsHint02.png" /></p>

<p>After you have installed JSHint, you can turn it on project by project.
Bring up the context menu for your project by right clicking on the project.
Select Properties and expand the JSHint node. You can turn JSHint on for all the
JavaScript files in the project, or for some subset of the JavaScript files in the project. After installation is completed, I find that JSHint often does not show its hints until I save the file that I am editing.
The hints usually show up as yellow flags on the left hand side of the editor.&nbsp;</p>
<p><img src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/JsHint01.png" alt="JsHint01.png" /></p>

<p>For instance, create a web project called JSHint-LastName where LastName is your last name.
A sceen shot showing the project name in the JSHint dialog is visiable
above. To find the dialog, right click on your project to bring up the context menu, and then choosing&nbsp;<strong>Properties.&nbsp;</strong>Expand the JSHint options, and set up a rule to turn on JSHint for the file
<strong>index</strong>.<strong>js</strong> in the root folder for your
project. An example screen shot is shown above.&nbsp;</p>
<p>If you are using jQuery, in the options dialog, perhaps you need to add the following: "jquery: true".</p>

<p>Suppose you have the following line in your code:</p>
<pre>$("#time2").html("Also jQuery name: " + device.name);</pre>
<p>If you are using JSHint integration in Eclipse, you will get two warnings on this page, one for the $ from jQuery, and one for <strong>device</strong> from Cordova. Of course, both $ and device are defined elsewhere, and should be part of our code. They are not an error or a mistake. So how do we get rid of them? One way to eliminate these warnings is to place the following at the top of JavaScript file:</p>

```javascript
/*global $:false, device:false */
```

<p>It turns out that jQuery is so commonly used that there is a general way to tell JSHint to ignore everything having to do with jQuery:</p>

```javascript
/*jshint jquery:true */
```

<p>Notice that here we use <strong>jshint</strong> rather than <strong>global</strong>, and we set <strong>jquery</strong> to <strong>true</strong>, rather than setting <strong>$</strong> to <strong>false</strong>. Regardless of the specifics, the comment ends up calming JSHints fears without affecting our code at run time. In particular, because the message to JSHint takes the form of a comment, it is ignored by the JavaScript run time engine.</p>
<p>Another approach is to put the following in the top option window in the JSHint dialog you get to from the <strong>properties</strong> context menu for the project. More specifically: right click on the project in the&nbsp;<strong>Project Explorer</strong>, then select &nbsp;<strong>Properties | JSHint | Options</strong> and set the following value, exactly as shown, in the <strong>Predefined globals</strong> window:</p>
<pre>device:false</pre>
<p><span>Now add the following to the&nbsp;</span><strong>JSHint Options</strong><span>&nbsp;window (that's the lower of the two windows):</span></p>
<pre><span>jquery: true</span></pre>
<p>This still leaves problems with things console.log, alert, and window object. To eliminate these warnings, once again bring up the JSHint Options dialog and place all of the following in the <strong>JSHint Options</strong> window:</p>
<pre>browser:true, devel:true, jquery:true</pre>
<p>Here is what it looks like on my system:</p>

<p><img src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/JsHint04.png" alt="JsHint04.png" /></p>

<p>&nbsp;Another option you should consider is <strong>strict:true.</strong></p>

## Run JSHint as an External Tool {#jsHintExternal}

<p>From inside of Eclipse you can run JSHint against the file you are currently editing. To make this work, you first need to<a href="https://github.com/jshint/jshint/tags"> download the source</a> to JSHint from the JSHint github site. The download is a zip file. You should unzip the contents of the file and place it in a well known location on your hard drive, such as the <strong>C:\Dev</strong> folder.</p>
<ul>
    <li>Choose <strong>Run | External Tools | External Tool Configuration</strong></li>
    <li>Select <strong>Program</strong> and click the <strong>New</strong> button</li>
    <li>Set <strong>Name = JSHint</strong></li>
    <li>Set Location=C:\Windows\System32\cscript.exe</li>
    <li>Set two arguments</li>
    <li>Argument1 = C:\Development\jshint-r12\env\wsh.js</li>
    <li>Arbument2 = ${resource_loc}</li>
</ul>

<p><img alt="JSHint run as an External tool" class="auto-style1" src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/android/JsHint05.png" /></p>

<p class="figure">
    Figure 01: Press the Run button to run JSHint against the current JavaScript file open in your Eclipse Editor. The results appear in the console window at the bottom of your screen.</p>
<p>Here is a bit more explanation of the various fields you should fill out in the External Tools Configuration dialog.</p>
<ul>
    <li>The <strong>Location</strong> is set to cscript.exe, which is a JavaScript compiler that ships with Windows. </li>
    <li>The first of the two <strong>arguments</strong> is the path to my downloaded copy of JSHint, and in particular, to the wsh.js file, which is designed to work with the Windows JavaScript engine.</li>
    <li>The second of the two arguments is a macro that resolves to the name of the file currently open in the editor. More details on the available macros are found in the Eclipse help on the <a href="http://help.eclipse.org/juno/index.jsp?topic=%2Forg.eclipse.platform.doc.user%2Fconcepts%2Fconcepts-exttools.htm">external tools</a> page.</li>
</ul>
<p>To run this command from the IDE, choose the smaller of the two green Run buttons found on the toolbar, or just press the run button from inside the External Tools Configurations. You can see this button at the bottom right of the screen shot shown above. If by some chance you can&#39;t find the <strong>Console</strong> window, you can access it from <strong>Window | Show View | Console </strong>(Alt + Shift + Q, C).</p>
<p>If you wanted to run a similar command from the command prompt, you might type something like this:</p>
<pre class="code">cscript C:\Development\jshint-r12\env\wsh.js <a>c:\Temp\CordovaAndroid\assets\www\js\index.js</a></pre>
<p>The command shown above has three parts:</p>
<ol>
    <li>We call cscript, which is stored in <a style="font-weight: 700">c:\windows\system32</a> directory, which means that it should always be on our path.</li>
    <li>The firstargument points to the location where we unzipped our JSHint download. More specifically, it points to that location, and then to a particular file called wsh.js stored in the env folder. This file implements JSHint for the Windows Script engine (cscript.exe).</li>
    <li>The third argument points to the file that we want to check. The outpoint will show up on the command line.</li>
</ol>
<p>If you are running JSHint from the command line, or as an external tool, you can specify options by placing a comment like this at the top of your JavaScript source file:</p>

```javascript
/*jshint jquery:true, browser:true, devel:true, strict:true */
```				

<p>You can also ask JSHInt to ignore a global variable. For instance, the following ignores a global identifier called <strong>device</strong>:</p>

```javascript
/*global device: false */</pre>
```

<!-- p><img src="images/JsHint03.png" alt="JsHint03.png" /></p -->

## Links {#links}

<ul>
	<li><a href="http://tools.android.com" target="\_blank">http://tools.android.com</a></li>
	<li><a href="http://source.android.com" target="\_blank">http://source.android.com</a></li>
	<li><a href="http://www.shortcutworld.com/en/win/Eclipse.html#link_4">Eclipse Keyboard Shortcuts</a>(ShortcutWorld)</li>
</ul>

## What's Next {#hext}

<p>Now you should go on to the section about the
<a href="AndroidSdk.html">Android SDK</a>.</p>

<p>&nbsp;</p>
<!--#include file="timers.inc" -->


<!-- #EndEditable -->
</article>
<!--#include virtual="/charlie/footer.inc" -->
</div>
