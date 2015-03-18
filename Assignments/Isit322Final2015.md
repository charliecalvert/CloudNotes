# Isit 322 Final 2015

There are two primary goals:

- Polish the Midterm inside the Cordova Application
- Add some the ability to get the users location and to make a phone call. We will discuss these features on Wednesday.
- Start your server running on AWS, and call various routes from inside your Cordova App. We will cover this step in class in Wednesday. 

There is enough information here to get you well into this project, but check up here regularly for updates. 

Sample Screenshot:

<img class="small" src="https://drive.google.com/uc?id=0B25UTAlOfPRGTzhXLWYxVnh4cFk" alt="Isit 322 Final Home Page">


**NOTE**: *Start working today, the moment you see this document. Don't wait until the night before it is due to begin! We have a hard stop on the final, you must get it in on time.*


## Step One

If you have not done so already, create your working folder for the Cordova project. The syntax for the command looks a bit like this:

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

Add support for detecting if you are connect to an android device and reporting location. Adding support for detecting if you are connected to a device is relatively simple, since the code is in the generated **index.js** that comes with all Cordova projects. It is the code that makes the that glows green in the default Cordova project.

You should also add support for location to your best version of the Midterm, and ensure that it looks good on a mobile device. 
         
## Step Six

Add support for finding your current location and for making phone calls.

A good place to start would be here:

- [ElvenGeo][elvenGeo]
- [Apache Geo](https://github.com/apache/cordova-plugin-geolocation)
## Step Seven

Add support for routes, as detailed on Wednesday. A good place to start would be with these two projects:

- [NodeRoutes03][nodeRoutes03]
- [NodeParams][nodeParams]

            
## Hints

Work through the entire **JsObjects/Cordova/CordovaFromExpress** project very carefully. Make sure you understand it. It is so very close to what you need to do in the final that you can all but use it as an exact template with illustrations of how to complete each step.

As detailed elsewhere, run the Python web server in your www folder to see if you have at least parts of the app working correctly. For instance, you can check if you are loading all the files properly. 

    python3 -m http.server 30025           

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

[build-node]: https://github.com/charliecalvert/JsObjects/blob/master/Cordova/CordovaNodeRoutes/www/BuildNodeRoutes
[nodeRoutes03]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes03
[nodeParams]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutesParams
[elvenGeo]: https://github.com/charliecalvert/JsObjects/tree/master/Cordova/ElvenGeo