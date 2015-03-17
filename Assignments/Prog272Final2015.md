# Prog 272 Final 2015

There are two primary goals:

- Move the Midterm into a Cordova Application
- Add some the ability to get the users location and to make a phone call


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

Build and install the project

    cordova build android
    adb install platforms/android/ant-build/CordovaApp-debug.apk
    
Test it, make sure it works.
    
## Step Four        

Copy over files from the most advanced version of the midterm that you have. Find the verison you like the most, and copy over its files.

There is lots of information on how to convert an Express project to a Cordova project on this page:

- <http://www.ccalvert.net/development/android/CordovaPlugin.html>
- [Build Node Routes][build-node]


**HINT**: *Make sure the two projects are next to each other in your directory structure. This will make the act of copying from one project ot another as simple as possible. For instance, if your repository is called **prog272-lastname** and your best version of the Midterm is in a folder called **Source**, then you want the folders arranged like this *:

- prog272-lastname/Source
- prog272-lastname/Week12Final
    
    
When copying the files over from **Source**, I made sure to copy the following files:

- ../Source/public/js/Control.js -> www/js/Control.js
- ../Source/public/css/style.css -> www/css/style.css

Then I saved my Cordova geneated copy of **index.html** and copied over **index.js** from **Source**:

- www/index.html -> www/index.html.old
- ../Source/views/index.html -> www/index.html
- ../Source/bower.json -> www/bower.json

Now you want to install the updated version of your project and fuss with it until it starts
to work. A script for automating the process might look something like this:

```
    #! /bin/bash
    
    SOURCE_QUERY="../Source"
    
    # mv www/index.html www/index.html.old
    
    cp -v $SOURCE_QUERY/public/js/Control.js www/js/.
    cp -v $SOURCE_QUERY/views/index.html www/.
    cp -v $SOURCE_QUERY/public/css/style.css www/css/.
    cp -v $SOURCE_QUERY/bower.json www/.
    echo "Set up your .bowerrc file and run bower install"
```

Note that the line **SOURCE_QUERY="../Source"** will likely differ on your system since the folder where you keep your best vesions of the Midterm is not likely to be called **Source**.

## Step Five

Add support for detecting if you are connect to an android device and reporting location. Adding support for detecting if you are connected to a device is relatively simple, since the code is in the generated **index.js** that comes with all Cordova projects. It is the code that makes the that glows green in the default Cordova project.

You should also add support for location to your best version of the Midterm, and ensure that it looks good on a mobile device. 
         
## Extra Credit

Add support for phone calls.

Add support for iterating over multiple records instead of just viewing male and female records. You should be able to load a JSON file, then change the male and buttons to forward and back.

[build-node]: https://github.com/charliecalvert/JsObjects/blob/master/Cordova/CordovaNodeRoutes/www/BuildNodeRoutes
            