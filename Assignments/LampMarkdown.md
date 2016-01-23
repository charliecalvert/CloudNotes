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

Step Five

It is now time to convert your markdown files into HTML and copy them out to your website.

From the **~/Source/MakeHtml** directory, issue this command twice:

```
npm start
```

Now browse to your website:

- [http://localhost/master-list.html](http://localhost/master-list.html)

There should be at least one link in the file you see. Start clicking, and you should be able to navigate all the files in your site either directly, or through the back button.

**NOTE**: *I reminded you above, but don't forget that you need to run **npm install** before the first time you run **npm start**. You usually only need to type **npm install** one time per project. Once you have issued the command, then the packages that that project relies on have been installed, and you need not issue the install command again. Type **npm install** one time. After that, you need only type **npm start** to run the project.*

## Turn it in

Take at least three screen shots of your pages running in the browser.

Issue the following command and take a screen shot of the results:

```
ls /var/www/html/
```

Create a zip file containing the contents of your **/var/www** folder and put it in our shared google drive folder:

```
zip -r MakeHtml-Calvert /var/www/html/*
```

You should, of course, use your last name and not mine.
