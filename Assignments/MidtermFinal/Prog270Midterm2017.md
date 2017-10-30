## Overview

This is the Midterm for Prog 270 in 2017.

Each student should:

- Pick a theme for a web site
- Develop at least seven completed web pages five of which contain pictures and at least one contains a Google Map.  
- Create the web site using our **MakeHtml** program. The pages of the site should therefore be based on markdown files.
- Display the web site on AWS and ensure that it is accessible through an Elastic IP
- View the site on an emulated phone and if possible on a real phone. Make at least minimal corrections to ensure it looks good.
- Include at least one HTML table that you define with markdown. Hints on this below.
- Include examples of paragraphs, headers and unordered lists on several of your pages.

## Details

Here is a step by step outline of what needs to be done to move your WebSite from Pristine Lubuntu to EC2. The process seems a bit complex at first, but the steps can be mastered if you approach them one at time. Here they are in English, as a counterpoint to your good command list:

1. Create your web site and test it on Pristine Lubuntu or some other platform that has good GUI editors such as Atom and Geany.
1. Copy your **~/Documents/AllTest** folder into your repository on Pristine Lubuntu. There is a script to help with this.
1. Push your repository
1. SSH to Ec2
1. Pull your repository
1. On EC2, use your script to copy **AllTest** from your repository to **~/Documents/AllTest**
1. If you have not done so already, set up **MakeHtml** with **renewMakeHtml**.
  - First, make sure **JsObjects** is up to date (**git pull**).
  - Then set up and run **MakeHtml** in the **~/Source/MakeHtml** directory. The command is **npm start**.
1. Now browse to your elastic IP and display **master-list.html.**

![MakeHtmlWorkFlow](https://s3.amazonaws.com/bucket01.elvenware.com/images/make-html-work-flow.png)

## Step One: Theme {#theme}

Pick a subject that you want for your web site. I don't care what subject you pick. It could be any of the following:

- A technical interest such as JavaScript, web development, linux, Windows, etc.
- A resume and expanded BIO.
- Favorite musician or band.
- Favorite Books
- Favorite Movies
- Hobbies
- Outdoor interests such as hiking or sports.
- Other Interests

The most important thing is that it holds your interest. It should be something that you are passionate about, or sincerely attracts your interest. Consider two things:

- This site is public. Random people could find and view it.
- This can be something you show off in your resume.

Try to figure out a way to integrate a Google Map and your images. For instance, if you are writing about sports show the route from BC to a sports stadium. Or if you are writing about art, show the route to the various Seattle art museums. If music, show how to get to music venues. For movies, show the route to various movie theaters. For hiking, the route to your favorite trailheads or show the entire hike. For tech interests, you could show how to get to Google or Microsoft or to the labs here on campus. And so on. If worst comes to worst, just include a page with a map on it even if it doesn't fit into your theme. But usually there is some way to work in a map.

## Step Two: Pages {#pages}

The site should contain at least three directories: the root folder and two subdirectories. For instance, if your theme was **West Coast States**, you might have three subdirectories:

- California
- Oregon
- Washington

Five of the pages should have bitmaps on them.

- At least one of the bitmaps must be served from the **/var/www/html/images** directory.
- At least one picture should be served from S3 on AWS
- At least one should be from a public domain source (Creative Commons) source.

Since your site will be visible to the public, you should make an effort not to use copyrighted images. This means you should create the images yourself with a camera or drawing program, find the images in the creative commons, or take some other step to demonstrate respect for yourself and others.

- [Learn to use WikiMedia Images](http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2MarkdownToHtml.html#bitmaps)
- [Understanding Copyright Issues](http://www.makeuseof.com/tag/concerned-copyright-guide-legally-using-images-web/)

## Step Three: Create Site {#create-site}

By now, you all should be familiar with the **MakeHtml** program and how to use it to convert your markdown files to HTML files that are stored in the **/var/www/html** directory.

![Create Site Activies](https://s3.amazonaws.com/bucket01.elvenware.com/images/create-web-site-activities.png)

The one extra step I want you to perform this time is to create a home page. By default, the page on your site called **index.html** is your home page.

When you installed the lamp-server, your web site automatically contained a page called **index.html** that contains data about your apache server. For some, this information may be useful, so lets not lose this page. If you haven't done so already, simply rename it from **index.html** to **apache.html** or some similar name.

Back in the root of **~/Documents/AllTest**, or wherever your working markdown files are, you should create a file called **index.md**. This file will automatically be converted to HTML and copied to your website when you run **MakeHtml**.

The contents of **index.md** should contain links that point directly to pages in your root folder, or lead indirectly to the other pages on your site. For example, the **master-list.md** file fulfills this requirement. As a result, it might make sense to base your home page on our **master-list.md** and **Summary.md** file. It would be a good idea, however, to make your home page look a bit nicer than the default appearance of **master-list.html**. The **master-list** page is designed to be functional, not pretty. You might also make use of the contents of the **Summary.md** files when composing your home page.

## Step Four: Display on AWS {#display-on-aws}

Make sure you have connected an elastic IP to your running instance. Go to your elastic IP. If you have set up **index.html** correctly, then this should be the main page of your web site. When you submit the assignment, I'll want to see:

- A link to your main page (Normally your elastic IP.)
- A screen shot of your main page.

I'm expecting to see both of the above items. Occasionally a student will turn in a link that does not work even though they completed most of the assignment. By supplying a screenshot, I can see that your site was up and running at least at some point in time. Remember:

- Attach your screenshot in PNG or JPG format directly to your assignment when you turn it in.
- Do not use BMP format for your images.
- Do not use a Word file or a Zip file

Here is an overview of the workflow for this assignment.

![Connect to EC2 activity diagram](https://s3.amazonaws.com/bucket01.elvenware.com/images/ssh-key-for-ec2.png)

The following diagram shows the workflow on EC2:

![Workflow on EC2](https://s3.amazonaws.com/bucket01.elvenware.com/images/update-site-on-ec2.png)

## Step Five: Phone {#phone}

I'll want to see a screenshot of:

- Your web site running in the Chrome emulator for phones. This process is described below.  
- And, if possible, your web site running on your phone (Any phone will do. Does not need to be Android.)

To emulate your phone on Chrome:

- Open Chrome
- Bring up the [Chrome Developer Tools][cdt] by
  - Selecting either **F12** or **Ctrl-Shift+I**
  - Or opening the Hamburger/Gear menu at top right (**Alt+F**) then **More Tools | Developer Tools**

In the Developer Tools choose toggle the Device Mode doohickey at the top left (**Ctrl-Shift + M**).

In the **device** drop down at the top left, you can optionally pick a particular device, such as **Samsung Galaxy S4** or **Apple IPhone 6** or something similar.

In the screen shot below, the doohickey and the **device** drop down are circled in red:

![Device Mode Chrome](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-midterm-2016-02.png)

**Note**: *I selected **Samsung Galaxy S4** in the **device** drop down. You can select any device, I just mention my selection so you can more easily find and identify the control I'm talking about.*

More details here: <https://developers.google.com/web/tools/chrome-devtools/device-mode/>

## CSS and JS Files

If you haven't done so already, create three files:

```
/var/www/html/js/elven-help.js
/var/www/html/css/style.css
/var/www/html/css/first-style.css
```

I have given you the code to place in some of these files. In some cases, these files can be empty. The user will probably never know, but errors will occur if these files do not exist. My code attempts to load these files and if they are not available, an error will occur. I will look for those errors.

- **elven-help.js**: Custom JavaScript which I will give you. (There is some example code in **Tables** section below.)
- **style.css**: Put most of your css in here. Loaded after bootstrap is loaded.
- **first-style.css**: This file is loaded before the bootstrap styles, so things in here may be over ridden by bootstrap. This file is usually not used.

Also make sure **googlecode.css** is in place.

## Turn it in

Make sure the markdown for your completed site is in your repository in the folder called **AllTest**.

Put the HTML for your completed site in your repository in a folder created in the root of your repository called **Midterm-HTML**. There are numerous ways to get the HTML from your web site to your repository. One might be to issue a command similar to this:

```
cp -r /var/www/html ~/Git/prog270-lastname-2016/Midterm-HTML/.
```

When you turn in the assignment, provide a link to the home page of your website running on EC2. I'm looking for a URL leading to your website running on AWS through an Elastic IP. I don't care how you provide the link, but in most cases using the Canvas comment area should be a good enough.

Include the screen shots mentioned above. Also, include a screenshot of **MakeHtml** running on your Ubuntu EC2 instance. It should show, in part, code like this:

```javascript
result: 'success',
destinationDir: '/var/www/html/',
directories: [ '/home/ubuntu/Documents/AllTest' ],
masterListOfNames: [ '* [Summary.html](Summary.html)' ],

```

It would be best if your screenshot showed it running on EC2 rather than on Lubuntu or our Ubuntu Server. However, it would be better to show it running anywhere rather than to not show it running at all.

## Tables

You can always use HTML code in a markdown file. However, there is code for [creating tables](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables) in markdown. It looks like this:

<pre>| Name | Age  | Place  
|------|:-----|:-------  
| Sue  | 35   | Houston  
| Paul | 42   | Detroit  
| Lisa | 28   | Tangier</pre>

Then add the following to a text file called **/var/www/html/js/elven-help.js**

<pre>$(document).ready(function() {  
    $('table').addClass('table table-striped table-hover');  
});
</pre>

Get the most recent code from JsObjects:

<pre>jo
git pull</pre>

Copy it in to the **~/Source** folder, using the technique outlined in the Lamp Markdown assignment or whatever method you prefer:

[http://www.ccalvert.net/books/CloudNotes/Assignments/LampMarkdown.html#step-two][lmd]

The result should look like this:

![Table CSS ](https://s3.amazonaws.com/bucket01.elvenware.com/images/table-css.png)

[lmd]:http://www.ccalvert.net/books/CloudNotes/Assignments/LampMarkdown.html#step-two

## Turn off Directory Browsing {#dir-browse-off}

This is not part of the assignment. You don't have to do this, at least not for the midterm.

The goal is to turn off directory browsing so hackers can't learn your file structure. This is not a big risk for us, but it is reasonable to want to do this sort of thing.

Open up the apache configuration file:

<pre>sudo nano /etc/apache2/apache2.conf </pre>

Look for this text:

<pre><Directory /var/www/>  
 Options Indexes FollowSymLinks  
 AllowOverride None  
 Require all granted  
</Directory></pre>

Change it to look like this:

<pre><Directory /var/www/>  
# Options Indexes FollowSymLinks  
 Options FollowSymLinks  
 AllowOverride None  
 Require all granted  
</Directory></pre>

The hash mark (#) is the comment character, like // in a curly brace language such as JavaScript. The most important change was to remove the word **Indexes**. Save by pressing (Ctrl+O) then (Enter). And now exit: (Ctrl+X).

Restart the server:

<pre>sudo service apache2 restart</pre>

If you are curious, another approach, and more information, is found on the rather ancient [Elvenware Apache page][elf-apache].

[elf-apache]: http://www.elvenware.com/charlie/development/web/Server/Apache.html#configuring-htaccess

## Directory Structure

![Dirs](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-midterm-2016-03.png)

## Copy to Ubuntu

```
scp <SOME_FILE> ubuntu@59.33.188.136:/home/ubuntu/.ssh/.
```

## Network Page

You should turn frequently to the the network pages in the Chrome and Firefox developer tools. Access them with F12 or Ctrl-Shift-I. Press F5 if necessary to refresh the display.

The images below show that **first-style.css**, **style.css**, **googlecode.css**, **elven-help.js** and the elvenware logo have all been loaded.

### Network Page Chrome

![Developer Tools Network Page Chrome][network-chrome]

### Network Page Firefox

![Developer Tools Network Page Firefox][network-firefox]

[network-chrome]: https://s3.amazonaws.com/bucket01.elvenware.com/images/network-chrome.png
[network-firefox]: https://s3.amazonaws.com/bucket01.elvenware.com/images/network-firefox.png
[cdt]: https://developer.chrome.com/devtools
