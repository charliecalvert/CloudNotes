---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/PhoneGap-End.md
relativePath: elvenware/development/android/PhoneGap-End.md
title: PhoneGap-End
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: PhoneGap-End.md
fileNameHTML: PhoneGap-End.html
---

<!-- toc -->
<!-- tocstop -->


Create a PhoneGap/Cordova Project {#createPhoneGap}
---------------------------------

If you have everything set up right, then you should be able to go to
the command prompt and run **create**.

As you know, in my system **create** is in:

``` {.code}
C:\Development\phonegap-2.3.0\lib\android\bin
```

On computers where you don't have rights to the root of the C drive, you
might try something like this:

``` {.code}
C:\Users\UserName\Dev\phonegap-2.3.0\lib\android\bin
```

But regardless of where you put the program, you should be able to run
it from any directory since it is now on your path.

Here is how to run the create program:

``` {.code}
create C:\Temp\Cordova03 com.elvenware.cordova03 Cordova03
```

This command tells create to build a Cordova project and put in a folder
called **C:\\Temp\\Cordova03**. The program will create the folder for
you. It will set up your program to run in the
**com.elvenware.cordova03** namespace. The name of the project it
creates will be **Cordova03**. This command creates a fully functional,
ready to use instance of a Cordova project.

Notice that I am putting the project in a temp directory. Assuming that
you are using Eclipse, the next step will be to copy it into our Eclipse
workspace. If you are not using Eclipse, then you can the project from
the temp directory or move it to someplace more useful.

To import the project in to Eclipse, choose **File | Import | Android |
Existing Android Code into Workspace**

**Browse** to your project. Select the **Copy Projects into
workspace**option. Click OK. Now you should see your project in the
Eclipse **Project Manager**. You can run it by right clicking, and
choosing **Run As | Android Application**.

Because you will be giving the command to create a project so often, it
helps to automate the process. Here is a batch file for running create.
To run it, you will need to be sure you have your
[PHONEGAP]\\lib\\android\\bin directory on your path, as described
above. Here is the batch file:

    set Project=Cordova03
    set ProjectSmall=cordova03
    create C:\Temp\%Project% com.elvenware.%ProjectSmall% %Project%

Please see this text on running batch files from NotePad++:

-   [http://www.elvenware.com/charlie/os/windows/faq.html\#runBatch](http://www.elvenware.com/charlie/os/windows/faq.html#runBatch)

NOTE: It seems like Mac users should be able to create your project in
your workspace, and then just import it without the Copy Projects into
workspace option. This does not, however, seem to work on a PC, which is
why we create the project in a temp directory, and then import it.

Running an PhoneGap/Cordova Project from Eclipse {#runProject}
------------------------------------------------

Once you have created the project, you need to import it by
selecting **File | Import**. Now use the **Android | Existing
Android Code into Workspace** option to browse for the root directory
of your new PhoneGap project. After importing the
project it should be visible in the **Project Explorer**. If the
**Project Explorer** is not visible, choose **Window | Show View |
Project Explorer** from the menu.

Plug in your Android device, start an Android X86 instance in VirtualBox,
or start the Emulator. You have to have the developer options turned on
for your device before you can use it for development. There are multiple
ways to set up the developer options on an Android device, so I'll ask
that you perform an Internet search to find the technique used for your
device. There are other, lengthy, sections of this Elvenware site that
describe how to set up Android x86 in VirtualBox.

- [Android x86 and VirtualBox](http://www.elvenware.com/charlie/development/android/Androidx86.shtml)

The emulator tends to be monumentally slow, but it is probably the
easiest option to setup. To start the emulator:

-   From the Eclipse menu, choose **Window | Android Virtual Device
    Manager**.
-   Choose the emulated Android device you want to run, and press
    the **Start...** button.
-   If there is no device available to run choose **New**.
-   Fill in the **AVD name** with a name of your choice, ie: **MyAvd.**
-   Pick a device. For instance, **7.0" WSVGA (Tablet) (1024X600:
    mdpi)**.
-   Click **OK.** The device will take a long time to load, but it
    should indeed come up in 1 to 5 minutes. Once you have it open,
    don't close it until you are done, as the launch time is the longest
    step in the process.

To Run the project:

-   Make sure you have plugged in a device or started the Emulator
-   Go back to the main window of the IDE. Select the top node for your
    project in the **Project Manager** or similar tool. The top node for
    your project is the node where you can see your project name. At
    this early stage, your project will probably have a name
    like **CordovaExample,** **Cordova** or **Cordova01.**
-   Right click and choose **Run as | Android Application**. If all is
    working right, your project should appear in the emulator after
    about a 1 minute delay.

Customize the Cordova Create Script {#customize}
-----------------------------------

Go to your **[dev]/[PhoneGap]/lib/android/bin/templates/project**
directory.

For instance, here is the path on my system:

    C:\Development\phonegap-2.3.0\lib\android\bin\templates\project

Back up the Assets directory. Make sure you have all your environment
variables set up as described above, and then run either of the batch
files found in the root of this zip file:

[/Charlie/downloads/Android/ElfCordova-V2.3-Templates-V1.0.zip](/charlie/downloads/Android/ElfCordova-V2.3-Templates-V1.0.zip)

(If you are on the Mac, or Linux, for now you can just delete the
existing Assets folder, and copy one of the new ones into the place
where you made the deletion.

If you open up the zip file you will find that I am simply replacing the
index.html, index.js, and index.css files with custom files set up the
way I prefer to see them. You will, I'm sure, want to implement changes
of your own. Once you see how the system works, you will probably find
it easy to modify these to create the effects you prefer. Notice that I
delete a number of the files that come with the default package. That is
why I suggest that you back up the original content before you delete
it. You can, of course, download a new copy of the original PhoneGap
templates at any time from the PhoneGap site.

PhoneGap Build
--------------

This cloud based service will take your HTML, CSS and JavaScript wrapped
up in a zip file and return verisons for Apple iOS, Android, Palm,
Symbian, and Blackberry. It is all done in the cloud. Right now the
service is free, but it will cost more when they get out of beta.

[https://build.phonegap.com/](https://build.phonegap.com/)

The Key Steps in Setting up Your Project
----------------------------------------

### Overview

1.  Set up Eclipse as you would for normal Android developmen: Eclipse
    Classic, Androids SDK, ADT
2.  Create a standard Android Project
3.  Ceate libs, xml and /assets/www folders and add
    1.  **assets/www/phonegap.js,**
    2.  **lib/phonegap.jar,**
    3.  **res/xml/plugins.xml and res/xml/phonegap.xml**

4.  **Edit manifest and**
5.  **Create assets/www/index.html**

Python Scripts to Automate Android to PhoneGap Conversion
---------------------------------------------------------

There are several solutions to this problem, but I have written some
scripts that help me convert Android applications to PhoneGap. To get
started, first be sure that you have installed Python. You might also
want to install [PyDev](../web/Python/pydev.html), which is a Python
development environment in the form of an add on to
[Eclipse](/android-guide/EclipseSetup.html). An alternative would be to install
[Aptana](http://aptana.com/), which is a version of Eclipse that comes
with PyDev built-in.

After installing Python, you should download the two zip files shown
below. The first contains the scripts that convert the project, the
second contains the core parts of the PhoneGap tools that need to be
included in your PhoneGap projects. The scripts should work on Windows,
Linux and the Mac.

-   Unzip both projects into your current Eclipse workspace where you
    want to work on PhoneGap projects.
-   From the Eclipse menu, choose **File | Import | General | Existing
    Projects into Workspace.**Click **Next.**
-   Click the **Browse** button and select the **PythonPhoneGap**folder.
    This will import my scripts into Eclipse.
-   Open AndroidToPhoneGap and edit the **destDir** and **srcDir**
    fields to match the paths on your system.

When you are done, the destDir and srcDir fields might look like this,
assuming your workspace is in [J:\\src\\PhoneGap](file:///J:/src)/. Note
that the \# sign is a comment in Python, and that we use forward slashes
rather than back slashes, and that we include a trailing slash at the
end of each line:

``` {.code}
# Here is an Android project to be converted
destDir = "J:/src/PhoneGap/PhoneGap03/"
# Here is where the files from PhoneGap live
srcDir="J:/Src/PhoneGap/PhoneGapBase/"
```

### Links

-   [Download Charlie's Python scripts for automating Android to
    PhoneGap](../../downloads/Android/PythonPhoneGap.zip)
-   [PhoneGapBase](../../downloads/Android/PhonegapBase.zip) (The core
    files from PhoneGap 1.4.1)

HTML 5 vs Android
-----------------

### HTML 5 Advantages

There are many platforms out there, and targeting HTML 5 gets you to all
platforms at once. The idea is to have one platform to target all these
devices. Most of the modern phones use WebKit, which fully supports HTML
5.

-   HTML 5 is available for mobile
-   HTML 5 is able to build powerful applications
-   HTML 5 is open and cross platform

You can embed web apps inside native apps. People don't want to have to
open a browser to open a web app.

HTML 5 is really HTML 5, CSS and JavaScript. It doesn't all work on all
platforms, but it works in a wide variety of locations. Graceful
degradation helps you work with this problem, in particular because
things that are not supported are just ignored.

HTML5 is fluid. It stretches and morphs on different screens even if you
don't write platform specific code.

HTML 5 is compelling because it supports:

-    Geolocation, such as getCurrentPosition.
    (navigator.geolocation.getCurrentPosition.
-   Multitouch
-   Device orientation
-   Speech recognition is available on Chrome and access to device API's
    like the camera.
-   Canvas and WebGL
-   Video and audio is possible
-   Ajax and XMLHttpRequest allows us to access the web and share
    resources
-   Offline application cache and offline storage with application
    cache.
-   And of course it is open, cross platform, and everyone knows it.
-   It has great libraries and tools, JQuiery MootTOols, YUI, Closure.
    Chrome Developer TOols, Firebug, Page Speed.

### Native Android Apps

Can be built with Dalvik and Java, or C++, or RenderScript for graphics
code. You also have access to Python. These are all Android specific
tools.

Native apps are good:

-   Richer look and feel
-   Better integration with the hardware and OS, and hardware keeps
    changing faster than HTML5 can keep up.
-   You have more speed, power, control and integration
-   Devices are naturally, small, resource constrained, and
    underpowered, so you want to get every advantage possible.
-   Standards like HTML5 have to trail the hardware. New sensors, new
    hardware, show up in native apps.
-   Each app is part of the ecosystem, you can replace any part of the
    OS, including hte home screen, with a native app. It hooks right
    into to system messages and requests. You can run in the background,
    getting updates when they come in, or going quiet when not needed,
    and being woken up when needed. There is very full offline support.
-   You have features like Widgets, Live Allpapers, rich notifications,
    lots of things that you can't do with HTML.

The point here is that there are great features in HTML 5, and great
features in native applications. Perhaps you should build a web app for
everyone, and then build a native app for successful platorms.

With WebViews you can get a bit of both worlds, have a native app that
leverages your HTML5 code.

Some powerful tools, Sproutcore, Sencha touch, jquery mobile, jo, iUI,
Modernizr, Polyfills

-   **HTML5 calls native**: WebView.addJavaScriptInterface(new
    BarameterReader(), "barometer")
-   **Native calls HTML5**: loadURL("javascript:
    updateScore("+score+");");
-   Chrome has the idea of background apps. So you can run an HTML5 in
    the background, but it uses a lot of battery, but they can sleep and
    wait to be worken up.

Using the jQuery ajax Command in PhoneGap
-----------------------------------------

If you use jQuery **ajax,**or related calls in a PhoneGap application,
if you try to use **LocalHost** in your URL, you are asking to reach the
web server of the Android operating system that your application is
hosted on. In most cases, there will be no web server on that Phone/OS,
and so you will just get an error. If there were a WebServer on the
device, it would still likely fail, because your database, data and
scripts are probably not on the phone, but back on your web server.

The important thing to grasp here is that an Android emulator or
VirtualBox running Android x86 is, for all intents and purposes the same
thing as a phone. It is a separate operating system, a separate device
from the copy of Windows, Mac, or Linux that is hosting it. That's what
we mean by a virtual machine: it is a virtual computer/phone/device
hosted by your main OS. It thinks its running on its own device, and so
does your web server.

To make things work, you need to create a URL that can be reached from
your virtual device, from a real phone. The first thing to test is
whether the URL can be reached from the Browser on your computer. As a
rule, if the URL does not work on your browser, then it won't work in
the virtual device or in a real phone. Remember that you can simulate
passing parameters in a URL when testing in the browser:

[http://localhost:8000/cgi-bin/AddingDataXml.py?operanda=1&operandb=2&answer=3](http://localhost:8000/cgi-bin/AddingDataXml.py?operanda=1&operandb=2&answer=3)

You don't use the part after the question mark in your PhoneGap program,
but you do in your test URL that you run in the browser.

Of course the URL above won't work in the phone, because it references
localhost. You need to use the Windows command line utility **ipconfig**
to get the actual IP address of your machine. In my case, it is
192.168.0.100:

[http://192.168.0.100:8000/cgi-bin/AddingDataXml.py?operanda=1&operandb=2&answer=3](http://192.168.0.100:8000/cgi-bin/AddingDataXml.py?operanda=1&operandb=2&answer=3)

An address like that should work in an emulator, in VirtualBox or on
your phone. If it does not, that means you don't have your FireWall set
up correctly as explained here:

[http://www.elvenware.com/charlie/development/web/Server/SetupAWebSite.html](http://www.elvenware.com/charlie/development/web/Server/SetupAWebSite.html)

Ant
---

Download Apache Ant:

[http://ant.apache.org/bindownload.cgi](http://ant.apache.org/bindownload.cgi)

Read how to install it:

[http://wiki.apache.org/ant/AntOnWindows](http://wiki.apache.org/ant/AntOnWindows)

Additional:

[http://simonmacdonald.blogspot.ca/2012/11/getting-create-command-to-work-on.html](http://simonmacdonald.blogspot.ca/2012/11/getting-create-command-to-work-on.html)

Check the following. Go to the command prompt and confirm that you can
run:

-   **ant** from \\ant\\bin. Is **JAVA\_HOME** setup? is **ANT\_HOME**
    set up? Is**%ANT\_HOME%\\bin** on your path?
-   **adb**from \\androidsdk\\platform-tools
-   **create** from \\phonegap\\lib\\android\\bin

You should be able to type **java -version** and get reasonable output.
Make sure that **javac.exe** is on your path. This usually means putting
**\\jdk\\bin** on your path.
