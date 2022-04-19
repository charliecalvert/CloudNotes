---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Isit322Final2015.md
relativePath: Assignments/Isit322Final2015.md
title: Isit322Final2015
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: Isit322Final2015.md
fileNameHTML: Isit322Final2015.html
---


<!-- toc -->
<!-- tocstop -->

# Isit 322 Final 2015

There are two primary goals:

- Polish the Midterm inside the Cordova Application
- Add some the ability to get the users location and to make a phone call. We will discuss these features on Wednesday.
- Start your server running on AWS, and call various routes from inside your Cordova App. We will cover this step in class in Wednesday.

There is enough information here to get you well into this project, but check up here regularly for updates.

Sample Screenshot:

<img class="small" src="https://drive.google.com/uc?id=0B25UTAlOfPRGTzhXLWYxVnh4cFk" alt="Isit 322 Final Home Page">


**NOTE**: *Start working today, the moment you see this document. Don't wait until the night before it is due to begin! We have a hard stop on the final, you must get it in on time.*

## Videos

- [Cordova Node Routes](https://youtu.be/ft_ih30yqIY)
- [Cordova Phone](https://youtu.be/figWUktn_2I)
- [Cordova Vibrations Camera](https://youtu.be/_BU4h-Oe3-A)

## Step One

If you have not done so already, create your working folder for the Cordova project. The syntax for the command looks a bit like this:

    $ cordova create --help
    Synopsis

        cordova create <PATH> [ID [NAME [CONFIG]]] [options] [PLATFORM...]

    Create a Cordova project

        PATH ......................... Where to create the project
        ID ........................... reverse-domain-style package name
        NAME ......................... human readable field
        CONFIG ....................... json string with key/values

For additional details, issue the **cordova create --help** command yourself in the bash shell.

Given the above, you want to navigate to your repository and type

    cordova create Week12Final com.lastname.Isit322_final Isit322FinalLastName

Be sure to use underscores and not hyphens. The command above will place your
project in a directory called **Week12Final**. The project name on your android
will be Isit322FinalLastName, where LastName is your last name.

If you need to rename a project, see the information found here:

- <http://www.ccalvert.net/development/android/CordovaPlugin.html#names>

## Step Two

Copy the custom icons over as explained here.

- <http://www.ccalvert.net/development/android/CordovaPlugin.html#custom-icons>

Now add the platform:

    cordova platform add android

## Step Three

Make sure you are connected to your phone or to an instance of Android x86.

- <http://www.ccalvert.net/development/android/CordovaPlugin.html#phone-connect>
- [Video](http://youtu.be/qmUcJ2Jxp6g)
- [Video](http://youtu.be/LNgkRhsgzIc)
- [Android Studio Slids](http://bit.ly/elven-android-studio)
- [Slides](http://bit.ly/1at2JZ2)
- [Elvenware](http://www.elvenware.com/charlie/development/android/Androidx86.shtml)
- [Week03 Overview](https://bc.instructure.com/courses/1078221/pages/week03-overview)
- [Remote Debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)

Build and install the project

    cordova build android
    adb install platforms/android/ant-build/CordovaApp-debug.apk

Test it, make sure it works.

## Step Four        

Copy over files from the most advanced version of the midterm that you have. Find the verison you like the most, and copy over its files.

There is lots of information on how to convert an Express project to a Cordova project on this page:

- <http://www.ccalvert.net/development/android/CordovaPlugin.html>
- [Build Node Routes][build-node]


**HINT**: *Make sure the two projects are next to each other in your directory structure. This will make the act of copying from one project to another as simple as possible. For instance, if your repository is called **isit322-lastname** and your best version of the Midterm is in a folder called **Source**, then you want the folders arranged like this *:

- isit322-lastname/Source
- isit322-lastname/Week12Final

A script for automating the process might look something like this, though the
details will of course differ considerably:

```
    #! /bin/bash

    SOURCE_QUERY="../Source"

    # mv www/index.html www/index.html.old

    cp -v $SOURCE_QUERY/public/js/Control.js www/js/.
    cp -v $SOURCE_QUERY/views/index.html www/.
    cp -v $SOURCE_QUERY/views/JsonAjax.html www/.
    cp -v $SOURCE_QUERY/public/css/style.css www/css/.
    cp -v $SOURCE_QUERY/bower.json www/.
    cp -v $SOURCE_QUERY/public/Presidents.json www/.
    cp -v $SOURCE_QUERY/public/Scientists.json www/.

    echo "Set up your .bowerrc file and run bower install"
```

Don't view this as written in stone. For instance, There may be additional lines you wish to add such as:

```
cp -v $SOURCE_QUERY/public/css/Custom.css www/css/.
cp -v $SOURCE_QUERY/public/css/Button.css www/css/.
```

Note that the line **SOURCE_QUERY="../Source"** will likely differ on your system since the folder where you keep your best vesions of the Midterm is not likely to be called **Source**.

Now you want to install the updated version of your project and fuss with it until it starts

**NOTE**: *If it exists, you should probably remove the live reload code from **index.html**.*

## Step Five

Work through this exercise: [Route Parameters][routeParams]

For extra credit, add support for detecting if you are connect to an android device and
reporting location. Adding support for detecting if you are connected to a device is
relatively simple, since the code is in the generated **index.js** that comes with
all Cordova projects. It is the code that makes the that glows green in the default
Cordova project.

You should also add support for location to your best version of the Midterm, and ensure that it looks good on a mobile device.

## Step Six

Work through these exercises: [Cordova Various Plugins][variousPlugins]

For extra credit add support for vibration, for finding your current location, and for making phone calls to your final.

Additional information is available here:

- [ElvenGeo][elvenGeo]
- [Apache Geo](https://github.com/apache/cordova-plugin-geolocation)

## Step Seven

Add support for routes, as detailed on Wednesday. A good place to start would be with these two projects:

- [Route Parameters][routeParams]

## Turn it in

The final you turn in should contain three sections:

- [Various Plugins][variousPlugins]
- [Route Params][routeParams]
- Your midterm running as a Cordova app as described in this document.

We have already gotten the midterm running in Cordova, so that is mostly a no-op. The new features that
are not in the midterm, that I want to see integrated into the final, are:

- Support for calling into routes on a server running on AWS or on your local machine. Preferrably AWS. It would
be nice if there was some page that acted like a single page application: Click on one button and one page of HTML
is loaded, click on the other button, another page is loaded. Use routes on the server to make this happen. Preferrably
one route with wild cards or an :id.
- Support for at least one of the extra credit plugins described in steps six or seven. Two pieces of low
hanging fruit would be vibration or location.

For extra credit, install lamp on AWS and have the web version of your application running there. You might
have slightly different versions for the web app and the mobile device. For instance, there are different
ways to make phone calls on each platform.

Use your common sense when developing the final:

- To do well on the final, you need to complete
    - Step Six: Various Plugins,
    - Step Seven: Route Parameters
    - Have your midterm running as a web app and as a Cordova app. Not perfect, but at least something. Even if it errors out, submit at least something.
- If you are one of the best students in the class, go for more features, more extra credit.
- If you are struggling, go for fewer features, just the core, not so much extra credit.
- Note that having the web app running on AWS can be a nice calling card at a job interview. Having your app on our phone would be nice too.

Since I gave you my copy of the midterm, I expect most people can get their Midterm running as a web application. Please
don't just submit my version of the midterm, integrate it into your version. If you have trouble getting the Cordova
portion working correctly, just do what you can, and submit that. That is less essential, but still important,
especially for the students who understand most of this technology.

**NOTE**: *We've all worked hard enough already this quarter. No staying up until 3 AM! Just get the low hanging
fruit: Step six and seven. Then do the best you can on the Web and Cordova versions of the midterm with possibly
one or two extra features.*

My major goal is to see that you have some understanding of the various technologies we have
covered this quarter. If you are stuck for a topic for your paper, you could write about how
we use the following technologies to create modern, connected applications:

- Web services (node routes with express)
- Cordova Applications
- Web Applications that support an MVC architecture with Angular.

## Hints

Look over the **JsObjects/Cordova/CordovaNodeRoutes** project very carefully. Make sure you understand it. The relationship between **CordovaNodeRoutes** and **NodeRouteParams** is similar to the relationship between your Cordova and Web App versions of the Final. Compare, for instance, their respective versions of **Control.js** and **style.css**.

**NOTE**: *You can use **meld** to compare two files or directories.*

At some point, you are going to find that the code in **Week12Final** is close enough to what you want that you don't want to copy the files over the **Source** folder again. And yet, you will still likely be making changes to both **Week12Final** and **Source** and you will want to be sure some of those changes end up in both projects. The tool you want is **meld**. Here is the command, as it would be issued from the root of your repository:

    meld Week12Final/www Source/public

This will allow you to compare the contents of **www** and **public**. You can see line by line differences between the files in the two projects, and you can copy individual lines from one file to the other.    

Linking to Bootstrap and JQuery. This kind of thing worked for me in one project, though the details for this project may differ considerably:

```
    <link rel="stylesheet" href="components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/Custom.css">
    <link rel="stylesheet" href="css/Buttons.css">
    <script src="components/jquery/dist/jquery.js"></script>
    <script src="components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="js/Control.js"></script>
```

Of course there has to really be a **components** folder.

## Python Web Server {#python-web}

As detailed elsewhere, run the Python web server in your www folder to see if you have at least parts of the app working correctly. For instance, you can check if you are loading all the files properly.

```
    $ python3 -m http.server 30025
    Serving HTTP on 0.0.0.0 port 30025 ...
    127.0.0.1 - - [21/Mar/2015 10:01:02] "GET / HTTP/1.1" 200 -
    127.0.0.1 - - [21/Mar/2015 10:01:04] "GET /www/ HTTP/1.1" 200 -
    etc...
```

You only need to type the first line shown above. The rest are output from the server once it starts.

### Using the Phone Code in a Browser {#phone-browser}

Go here with your phone: [http://calvert.work/phone/](http://calvert.work/phone/)

Click on the two bottom links. They should pop up the phone. If they do not, I
would imagine this means that the browser on your phone does not support
those features.

We did not cover in this class, but I did the following to get the page
running on my AWS site:

- Install lamp, as described [here][phoneBrowser]. I believe that ubuntu
now comes with tasksel installed, so you can skip that step. Remember to
pick a password for MySql that you can remember as you might want the
feature x months from now, but not today.
- Save and copy the attached index.html to your AWS instance as described below.
- Pull the latest from JsObjects, navigate to the **Cordova/CordovaPhoneCall**
directory, run **bower install**, and copy the www folder to /var/www/html:

**NOTE**:*Installing lamp puts support for the Apache Web Server, MySQL,
PHP, Python and Perl on your system. We are really only interested in
Apache. The root folder from which Apache serves up HTML is **/var/www/html**.*

Copy index.html:

```
sudo mv /var/www/html/index.html /var/www/html/apache.html
sudo cp index.html /var/www/html/index.html
```

Set up and copy Cordova Phone Call:

```
cd ~/Git/JsObjects/Cordova/CordovaPhoneCall/
bower install
sudo mkdir /var/www/html/phone
sudo cp -r www/* /var/www/html/phone/.
```

If you want to edit index.html on EC2, then

```
cd /var/www/html/
sudo nano index.html
```

We did not have time to get into in class, but the availability of individual
features can be detected in various ways, but the most common is with modernizr.
If you can't make a phone call from inside your browser, I'd like to know. Go to
the discussion area, find the appropriate thread, and tell
me what device you are running, what version of the OS, and what browser you
are using.


[build-node]: https://github.com/charliecalvert/JsObjects/blob/master/Cordova/CordovaNodeRoutes/www/BuildNodeRoutes
[nodeRoutes03]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes03
[nodeParams]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutesParams
[elvenGeo]: https://github.com/charliecalvert/JsObjects/tree/master/Cordova/ElvenGeo
[phoneBrowser]:http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux
[routeParams]:http://www.ccalvert.net/books/CloudNotes/Assignments/RouteParameters.html
[variousPlugins]:http://www.ccalvert.net/books/CloudNotes/Assignments/CordovaVariousPlugins.html
