## Overview

The goal of this project is to help you move quickly from raw markdown files to a working Apache based web site.

A video associated with this assignment is available here:

- [Lamp Markdown Video](https://youtu.be/kz2R1EIpnis)

## Step One

You need to get the most recent code from **JsObjects**. Navigate to your JsObjects directory:

```bash
cd ~/Git/JsObjects
```

Now type **git pull**.

If you get an error, type the following and try again to pull down the updates:

```bash
git stash
```

## Step Two

It is not a good idea to do work in JsObjects. So let's copy the files that I want you to use from JsObjects into another folder. First, create a place in your home folder where you can store programs:

```bash
mkdir ~/Source
```

Now copy the program I want you to use into it:

```bash
cp -r ~/Git/JsObjects/JavaScript/NodeCode/MakeHtml/ ~/Source/.
```

Now set up the program, but don't run it yet:

```bash
cd ~/Source/MakeHtml
npm install
```

There is one last step, which involves installing a program called Jade. You can install it like this:

```bash
npm install -g jade
```
Now just leave that part of the project alone for a bit.

I also have a script called **renewMakeHtml**, which can help with the install or updating process. I keep this script in the **MakeHtml** folder. You don't, however, want to run **renewMakeHtml** from inside of the **~/Source/MakeHtml** folder. I store the file there, just because it belongs to that project, but it should, in our case, be run from **~/Source**.

It only needs to be run occasionally. For instance, run it after I have updated my **MakeHtml** program. (I perhaps should have called it **updateMakeHtml**, or **copyLatestMakeHtml**.)

There are only two reasons to run **renewMakeHtml**:

    To install **MakeHtml**
    To update **MakeHtml**


The very first time you need to use **MakeHtml** on a new system, you should copy **renewMakeHtml** from **JsObjects** to ~/**Source**:

```
cp $JSOBJECTS/JavaScript/NodeCode/MakeHtml/renewMakeHtml ~/Source/.
```

Then run the script.

But you only need to do this once on any particular system. For instance, once on Pristine Lubuntu at school, once on Pristine Lubuntu at home, and once on EC2. After that you can forget it, unless I specifically say: "Hey, I updated **MakeHtml** to fix a bug or to get a new feature such as X or Y." Then you would run it to get the latest bits from **JsObjects** by running the script.

More specifically: after installing **MakeHtml**, you can use the script to update it. Suppose I have made a change to **MakeHtml** and wanted you to get my recent changes. Then you should switch to the ~/Source folder, and run **renewMakeHtml**. That will delete your old copy of **~/Source/MakeHtml** and copy out a new one from **JsObjects**.

The major take away: don't run **renewMakeHtml** too often. When you run it, the **config** file gets overwritten, and then you need to edit it again. Only run the script to install the program the first time, or when I announce an update. In the normal course of things, updates are infrequent.

## Step Three

Create a new folder in your **Documents** directory. Name the new folder **AllTest**:

```bash
mkdir ~/Documents/AllTest/
```

Now use Remarkable to create some markdown files and place them in your new directory. You can use files that you already created, but by the time you are done, you should have at least six markdown files, and at least half of them have to be new: not ones that you used in a previous assignment.

Move at least two of the markdown files into a sub-directory of **AllTest**. You can call that directory whatever you want. For instance, **MoreFiles**:

```bash
mkdir ~/Documents/AllTest/MoreFiles
```

## Step Four

By this point in the class, you should already have LAMP installed, and have the correct permissions in your **/var/www/html** folder. But let's make sure it is set up correctly, with bcuser as the owner. Navigate to your **/var/www/** directory and issue this command:

```bash
sudo chown -R bcuser:bcuser html
```

There is one other little piece that we need to put in place to make this work correctly. On [http://www.elvenware.com](http://www.elvenware.com) there is a logo. A picture of mountains silhouetted against the sky. Go to the site, find the logo, right click on it, and save it to your **Pictures** directory of your home drive.

Now create an **images** folder for your website:

```bash
mkdir /var/www/html/images
```

Copy your file into that directory, and set the correct permissions so that a user who is not you, who browses to the site, can read it:

```bash
cp ~/Pictures/elvenwarelogo.png /var/www/html/images/.
chmod 644 /var/www/html/images/elvenwarelogo.png
```

When you write 644, you are saying the owner has read and write permissions, while everyone else has only read permissions:

```
-rw-r--r-- 1 bcuser bcuser 37309 Jan 20 10:49 /var/www/html/images/elvenwarelogo.png
```

Sadly, there is one last step. In order to get syntax highlighting after our triple backticks in our markdown, we need to include a special CSS file on our website. Here is how to copy it there. Here is what to do:

- Naviagate back to the **~/Source/MakeHtml** directory. Then issue these commands to create a folder for the CSS file, and then copy the file into that folder:

```
mkdir -p /var/www/html/css/highlight/
cp ./node_modules/highlight.js/styles/googlecode.css /var/www/html/css/highlight/.
```

If you are not in the **~/Source/MakeHtml** directory, then try this command:

```
cp ~/Source/MakeHtml/node_modules/highlight.js/styles/googlecode.css /var/www/html/css/highlight/.
```

## Step Five

It is now time to convert your markdown files into HTML and copy them out to your website.

From the **~/Source/MakeHtml** directory, issue this command twice:

```
npm start
```

Now browse to your website:

- [http://localhost/master-list.html](http://localhost/master-list.html)

There should be at least one link in the file you see. Start clicking, and you should be able to navigate all the files in your site either directly, or through the back button.

**NOTE**: *I reminded you above, but don't forget that you need to run **npm install** before the first time you run **npm start**. You usually only need to type **npm install** one time per project. Once you have issued the command, then the packages that that project relies on have been installed, and you need not issue the install command again. Type **npm install** one time. After that, you need only type **npm start** to run the project.*

Here is a bit more detail for the technically minded:

- JavaScript is a programming language like C#, Java, Perl, Python, C++ and Ruby.
- JavaScript can be run in the browser, and that is where we usually see it.
- JavaScript can also be run on the server, or just run as a utility. Most of the time, when use it this way, it is via a compiler called [NodeJs](https://nodejs.org). **MakeHtml** program uses NodeJs. It is a custom program that I wrote. More specifically, it is a utility that converts markdown files to HTML and copies the HTML files to specific directory.
- NodeJs has a system for creating and consuming libraries. This system is called [NPM](https://www.npmjs.com/), which stands for the Node Package Manager. So a library in Node is often called a Package. These libraries provide various services such as access to the file system, access to databases, access to the HTTP protocol.

When we type **npm start**, behind the scenes we are running a command that might look something like this: **node server.js**. This command tells the node compiler to compile and run **server.js**, where **server.js** is a JavaScript source file.

## Turn it in

Take at least three screen shots of your pages running in the browser.

Issue the following command and take a screen shot of the results:

```
ls /var/www/html/
```

Create a zip file called **MakeHtml-LastName** containing the contents of your **/var/www** folder and put it in our shared google drive folder:

```
zip -r MakeHtml-Calvert /var/www/html/*
```

You should, of course, use your last name and not mine.

## Example Images

Your images must be different from these, but they should have much in common with them:

The master list:

![Master][lmd01]

The summary:

![Summary][lmd02]

A random page:

![Typical Files][lmd03]

[lmd01]:https://s3.amazonaws.com/bucket01.elvenware.com/images/LampMarkdown01.png
[lmd02]:https://s3.amazonaws.com/bucket01.elvenware.com/images/LampMarkdown02.png
[lmd03]:https://s3.amazonaws.com/bucket01.elvenware.com/images/LampMarkdown03.png

## Hint

Here are some tips and thoughts about this program to help you understand it better.

- Whenever we add to or edit the markdown files in AllTest, we need to run MakeHtml (npm start) in order to have the changes we made in AllTest reflected in our web site (localhost).
- There is a bug in the MakeHtml program that results in the summary.html or master-list.html files not being properly created when we first create a new directory in AllTest. As a result, we sometimes need to run npm start twice.

Summary: The MakeHtml program converts our markdown in the AllTest folder to HTML. It copies the HTML to the **/var/www/html** folder. MakeHtml is not a service that runs continually. Therefore, each time we update files in the AllTest directory, we need to run (**npm start**) MakeHtml in order to update the files in **/var/www/html**. The conversion does not take place automatically, it only happens when we explicitly run the MakeHtml program by typing **npm start**.

NOTE: In Windows, we typically click on an executable to run it. Here, we are running a program implemented as a NodeJs script. The way to run the script is to type **npm start**.

## Hint

Check **~/Source/MakeHtml/config/ElvenConfig.json** to make sure it is compatible with your system. In particular, check the "base-dir", which assumes that your home path is **/home/bcuser**.

```
{
  "calvert": {
    "base-dir": "/home/bcuser/",
    "site-dirs": [
      "Documents/AllTest",
      "Documents/AllSite"
    ],
    "destination-dirs": [
      "/var/www/html/",
      "/home/bcuser/temp/test-site/"
    ]
  }
}
```
