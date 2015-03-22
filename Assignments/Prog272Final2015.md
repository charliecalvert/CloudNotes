# Prog 272 Final 2015

There are two primary goals:

- Move the Midterm into a Cordova Application
- Add some the ability to get the users location and to make a phone call. We will discuss these features on Thursday.
- Start your server running on AWS, and call a route from inside your Cordova App. We will cover this step in class in Thursday. 

There is enough information here to get you well into this project, but check up here regularly for updates. 

Sample Screenshot:

<img class="small" src="https://drive.google.com/uc?id=0B25UTAlOfPRGb0xXVlV6RkR2aGc" alt="Prog272Final">

**NOTE**: *Start working today, the moment you see this document. Don't wait until the night before it is due to begin! We have a hard stop on the final, you must get it in on time.*

## Videos

- [Cordova Node Routes](https://youtu.be/ft_ih30yqIY)
- [Cordova Phone](https://youtu.be/figWUktn_2I)
- [Cordova Vibrations Camera](https://youtu.be/_BU4h-Oe3-A)

## Step One

Create your working folder. The syntax for the command looks a bit like this:

```
$ cordova create --help
Synopsis

    cordova create <PATH> [ID [NAME [CONFIG]]] [options] [PLATFORM...]

Create a Cordova project

    PATH ......................... Where to create the project
    ID ........................... reverse-domain-style package name
    NAME ......................... human readable field
    CONFIG ....................... json string with key/values
```                                    

For additional details, issue the **cordova create --help** command yourself. 

Given the above, you want to navigate to your repository and type

    cordova create Week12Final com.lastname.prog272_final Prog272FinalLastName
    
Be sure to use underscores and not hyphens. The command above will place your
project in a directory called Week12Final. The project name on your android
will be Prog272FinalLastName, where LastName is your last name.

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
- [Remote Debugging](https://developer.chrome.com/devtools/docs/remote-debugging)

Build and install the project

    cordova build android
    adb install platforms/android/ant-build/CordovaApp-debug.apk
    
Test it, make sure it works.
    
## Step Four        

Copy over files from the most advanced version of the midterm that you have. Find the verison you like the most, and copy over its files.

There is lots of information on how to convert an Express project to a Cordova project on this page:

- <http://www.ccalvert.net/development/android/CordovaPlugin.html>
- [Build Node Routes][build-node]


**HINT**: *Make sure the two projects are next to each other in your directory structure. This will make the act of copying from one project to another as simple as possible. For instance, if your repository is called **prog272-lastname** and your best version of the Midterm is in a folder called **Source**, then you want the folders arranged like this *:

- prog272-lastname/Source
- prog272-lastname/Week12Final
    
    
When copying the files over from **Source**, I made sure to copy the following files:

- ../Source/public/js/Control.js -> www/js/Control.js
- ../Source/public/css/style.css -> www/css/style.css
- ../Source/public/Presidents.json -> www/Presidents.json
- ../Source/public/Scientists.json -> www/Scientists.json

Then I saved my Cordova geneated copy of **index.html** and copied over **index.js** from **Source**:

- www/index.html -> www/index.html.old
- ../Source/views/index.html -> www/index.html
- ../Source/views/JsonAjax.html -> www/JsonAjax.html
- ../Source/bower.json -> www/bower.json

**NOTE**: *Be sure you have used our **JadeToHtml** to convert **JsonAjax.jade** to **JsonAjax.html**, etc....*

A script for automating the process might look something like this:

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
to work. For instance, you will have to make the menus work when requestion HTML files rather than rendered Jade. This will mean making changes to your HTML. Line 1 is the original call to load json-ajax as rendered Jade, while line 2 shows how it should look in your Cordova project:

```
    <li id="json-ajax"><a href="json-ajax">JsonAjax</a></li>
    <li id="json-ajax"><a href="JsonAjax.html">JsonAjax</a></li>
```

**NOTE**: *You should probably remove the live reload code from **index.html**.*

## Step Five: Location

Add support for detecting if you are connect to an android device and reporting location. Adding support for detecting if you are connected to a device is relatively simple, since the code is in the generated **index.js** that comes with all Cordova projects. It is the code that makes the that glows green in the default Cordova project.

You should also add support for location to your best version of the Midterm, and ensure that it looks good on a mobile device. 

## Step Six: Route Parameters

Complete the Route Parameters assigment. This is an in class exercise, but it will also count as part of the final. Make sure you complete it.

- [Route Parameters](http://www.ccalvert.net/books/CloudNotes/Assignments/RouteParameters.html)

## Step Seven: Cordova Plugins

- [Cordova Various Plugins](http://www.ccalvert.net/books/CloudNotes/Assignments/CordovaVariousPlugins.html)

Includes:

- ElvenGeo
- Elven Various
- Elven Phone
         
## Extra Credit

Add support for phone calls, vibration, and location (Elven Geo) to your Final.

Add a markdown loader page. One page in your final, two buttons. Button one loads
a Jade/Markdown page. Button two loads an additional Jade/Markdown page.

If you have what can only be described as too much time on your hands, or perhaps it
could be called a craven need to write code, add support for iterating over multiple 
records instead of just viewing male and female records. You should be able to load 
a JSON file, then change the male and buttons to forward and back. See
The **PresidentsJson** project for a somewhat outdated guide:

- [Presidents Json](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/PresidentsJson)

            
## Hints

Work through the entire **JsObjects/Cordova/CordovaFromExpress** project very carefully. Make sure you understand it. It is so very close to what you need to do in the final that you can all but use it as an exact template with illustrations of how to complete each step.

At some point, you are going to find that the code in **Week12Final** is close enough to what you want that you don't want to copy the files over the **Source** folder again. And yet, you will still likely be making changes to both **Week12Final** and **Source** and you will want to be sure some of those changes end up in both projects. The tool you want is **meld**. Here is the command, as it would be issued from the root of your repository:

    meld Week12Final/www Source/public
    
This will allow you to compare the contents of **www** and **public**. You can see line by line differences between the files in the two projects, and you can copy individual lines from one file to the other.    

Linking to Bootstrap and JQuery. This worked for me:

```
    <link rel="stylesheet" href="components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/Custom.css">
    <link rel="stylesheet" href="css/Buttons.css">
    <script src="components/jquery/dist/jquery.js"></script>
    <script src="components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="js/Control.js"></script>
```

Of course there has to really be a **components** folder. For instance, there should not be a **public/components** folder.   

## Python Web Server {#python-web}

As detailed elsewhere, run the Python web server in your www folder to see if you have at least parts of the app working correctly. For instance, you can check if you are loading all the files properly.

```
    $ python3 -m http.server 30025
    Serving HTTP on 0.0.0.0 port 30025 ...
    127.0.0.1 - - [21/Mar/2015 10:01:02] "GET / HTTP/1.1" 200 -
    127.0.0.1 - - [21/Mar/2015 10:01:04] "GET /www/ HTTP/1.1" 200 -
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
