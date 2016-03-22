# Isit 322 Final 2015

Hopefully there is enough information here to get you well into this project, but check up here regularly for updates. This document is not complete, nor completely fact checked.

There are several primary goals:

- Start your ElvenImagePicker or equivalent server running on AWS with UpStart.
- Make sure that the web front end for it works smoothly.
- Port the ElvenImagePicker or equivalent to a new Cordova Application and make sure it can call into the ElvenImagePicker server
- Use elf-log from your bower and npm packages on both the client and server sides.

Do your work in a branch with the name **final** in it. Specify the branch name when you turn in the assignment.

Sample Screenshot coming soon:

## Step One

We created a **CordovaFinalPrep** Cordova app. Create new app called **Week12Final**.

Here is how to create your working folder for the final Cordova project. The syntax for the command looks a bit like this:

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

    cordova create Week12Final com.lastname.isit322_final Isit322FinalLastName

Be sure to use underscores and not hyphens. The command above will place your project in a directory called **Week12Final**. The project name on your android will be **Isit322FinalLastName**, where LastName is your last name.

Copy the **install** script over from the FinalPrep project and alter the uninstall command so that it uses **com.lastname.isit322_final**.

If you need to rename a project, see the information found here:

- <http://www.ccalvert.net/development/android/CordovaPlugin.html#names>

## Step Two

Optionally copy custom icons over as explained here.

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

Connect to your device:

  adb connect <IP-ADDRESS>

Build and install the project

    cordova build android
    adb install <PATH TO APK>

Test it, make sure it works.

## Step Four: Source Code: {#source-code}

Copy over files from the **CordovaFinalPrep** project. Use meld to add any necessary updates from your **ElvenImagePicker** or equivalent project. Find the version you like the most, and copy over its files.

There is information on how to convert an Express project to a Cordova project on this page:

- <http://www.ccalvert.net/development/android/CordovaPlugin.html>
- [Build Node Routes][build-node]

**HINT**: _Make sure the two projects are next to each other in your directory structure. This will make the act of copying from one project to another as simple as possible. For instance, if your repository is called **isit322-lastname-2016** and your best version of the Midterm is in a folder called **Week10-ElvenImagePicker**, then you want the folders arranged like this_:

- isit322-lastname-2016/Week10-ElvenImagePicker
- isit322-lastname-2016/Week12Final

A script for automating the process might look something like this, though the details will of course differ considerably:

```
    #! /bin/bash

    SOURCE_QUERY="../Week12-ElvenImagePicker"

    # mv www/index.html www/index.html.old

    cp -v $SOURCE_QUERY/public/javascripts/Control.js www/js/.
    cp -v $SOURCE_QUERY/views/index.html www/.
    cp -v $SOURCE_QUERY/public/css/style.css www/css/.
    cp -v $SOURCE_QUERY/.bowerrc .
    cp -v $SOURCE_QUERY/bower.json .
    etc
```

Don't view this as written in stone. For instance, There may be additional lines you wish to add such as:

```
cp -v $SOURCE_QUERY/public/css/Custom.css www/css/.
```

Now you want to build and install the updated version of your android project and fuss with it until it starts

## Elf Log

Include both your bower **lastname-tools** and your npm **isit322-lastname** packages in the project. I don't care how much you use elf-log, but give me at least one example of it actually printing something (set log level to details) so that I can see it working. In particular, use it:

- Once at the top of **control.js**.
- Once at the top of **routes/index.js**.

I pick these two locations just because they should be easy for me to find.

## Turn it in

Specify the branch name when you turn in the assignment.

The final you turn in should contain two pieces:

- Your Web App running on EC2 under UpStart
- The source code for your Cordova Project.

Use your common sense when developing the final:

- To do well on the final, you need to:
    - Have your midterm running as a web app and as a Cordova app. Not perfect, but at least something. Even if it errors out, submit at least something.
- If you are one of the best students in the class, go for more features, more extra credit.
- If you are struggling, go for fewer features, just the core, not so much extra credit.
- Note that having the web app running on AWS can be a nice calling card at a job interview. Having your app on our phone would be nice too.

My major goal is to see that you have some understanding of the various technologies we have
covered this quarter.

The following list is both a reminder of what to include  and a checklist to go through before submitting:

1. The complete URL, including elastic ip, for your web app running on EC2
- Screen shot of your android app running on your mobile device or on AndroidX86.
- **lastname-tools** set to latest version in your **bower.json**
- **isit322-lastname** set to latest version in your **package.json**
- Test your work to make sure that both **package.json** and **bower.json** are complete. For you web app I should be able to run **npm install** and **bower install** and then have everything just work.
- A working install script for your android application.
- A link to the Apache web site your created with your web application.
- User can pick bootstrap them (cerulian, darkly, cosmos, etc)
- Links for web app and android app after you run walk lead to your apache site on EC2.
- Your **elven-site.conf** file for upstart. Put it in the root of your final project.
- Don't forget to tell me the name of the folder and branch that contains your final project.


THIS SECTION IS NOT YET COMPLETE.

## Extra Credit

I've updated **ElvenSitePixPicker**:

- [Elven Site Pix Picker](http://www.ccalvert.net/books/CloudNotes/Assignments/ElvenSitePixPicker.html)

See if you can get it running in the final.

## Hints

Look over the **JsObjects/Cordova/** projects. Make sure you understand them. The relationship between **CordovaNodeRoutes** and **NodeRouteParams** is similar to the relationship between your Cordova and Web App versions of the Final. Compare, for instance, their respective versions of **Control.js** and **style.css**.

  meld CordovaNodeRoutes/www ../JavaScript/NodeCode/NodeRoutesParams/public/

Compare the two versions of **control.js**.

You are also going to want to compare the code in **Week12Final** and **Week10-ElvenImagePicker**. The tool you want is **meld**. Here is the command, as it would be issued from the root of your repository:

    meld Week12Final/www Week10-ElvenImagePicker/public

This will allow you to compare the contents of **www** and **public**. You can see line by line differences between the files in the two projects, and you can copy individual lines from one file to the other.    

## Python Web Server {#python-web}

Python has a small web server built into it. You can start the server running in your www directory:

    $ python3 -m http.server 30025

 Then go to [http://localhost:30025](http://localhost:30025).

 You can then debug some parts of your application. By no means will everything work. In particular, you can't call into your server this way, since it is not running, or at least it was not loaded by the Python web server. This means that the SELECT controls won't fill in. But you can check if the pages are loading properly, if css and bootstrap are set up, etc.

Run the Python web server in your **www** folder to see if you have at least parts of the app working correctly. For instance, you can check if you are loading all the files properly.

```
    $ python3 -m http.server 30025
    Serving HTTP on 0.0.0.0 port 30025 ...
    127.0.0.1 - - [21/Mar/2015 10:01:02] "GET / HTTP/1.1" 200 -
    127.0.0.1 - - [21/Mar/2015 10:01:04] "GET /www/ HTTP/1.1" 200 -
    etc...
```

You only need to type the first line shown above. The rest are output from the server once it starts.


## Videos

- [Cordova Node Routes](https://youtu.be/ft_ih30yqIY)
- [Cordova Phone](https://youtu.be/figWUktn_2I)
- [Cordova Vibrations Camera](https://youtu.be/_BU4h-Oe3-A)

## Grading

In Canvas, the final and midterm are assigned 100 points, indicating that I am grading them on a scale of 0 to 100. But each of these assignments are worth 1/3 of your grade, and combined, they are worth nearly 2/3 of your grade. Details in the [Syllabus][syllabus].

For instance, if we had had only two assignments this quarter, then a student might have received these scores:

- Assignment One: 100
- Assignment Two: 98
- Midterm: 80
- Final: 80

I average out the assignments, then find the average of the assignments average plus the midterm and final. Then a score might be calculated something like this:

```
Assignments average: 99
Midterm: 80
Final: 80

Final Score: 86
```

Conversely, if the average for the assignments was 80, then a good score on the Final and Midterm can help turn that work into an A:

```
Assignments average: 80
Midterm: 98
Final: 100

Final Score: 93
```

I then have a little fudge factor to help someone with a 91 average to get a 92, if their class participation, enthusiasm, and overall effort indicated that they deserved that reward.

[syllabus]: https://docs.google.com/document/d/1Y2s1iPO_8caytpsr99k-scZlQQGxNvXK6HM2VtBI30k/edit?usp=sharing
[build-node]: https://github.com/charliecalvert/JsObjects/blob/master/Cordova/CordovaNodeRoutes/www/BuildNodeRoutes
[nodeRoutes03]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes03
[nodeParams]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutesParams
[elvenGeo]: https://github.com/charliecalvert/JsObjects/tree/master/Cordova/ElvenGeo
[phoneBrowser]:http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux
[routeParams]:http://www.ccalvert.net/books/CloudNotes/Assignments/RouteParameters.html
[variousPlugins]:http://www.ccalvert.net/books/CloudNotes/Assignments/CordovaVariousPlugins.html
