## Overview

This is the Midterm for Prog 270 in 2016.

The basic goal of the midterm is for each student to:

- Pick a theme for a web site
- Develop at least seven completed web pages five of which contain pictures.
- To create the web site using our MakeHtml program. The pages of the site should therefore be based on markdown files.
- To display the web site on AWS and ensuring that it is accessible through an Elastic IP
- View the site on an emulated phone and if possible on a real phone. Make at least minimal corrections to ensure it looks good.

Here is a step by step outline of what needs to be done to move your WebSite from Pristine Lubuntu to EC2. The process seems a bit complex at first, but the steps can be mastered if you approach them one at time. Here they are in English, as a counterpoint to your good command list:

1.  Copy your **~/Documents/AllTest** folder into your repository on Pristine Lubuntu
2.  Push your repository
3.  SSH to Ec2
4.  Pull your repository
5.  Copy **AllTest** form your repository to **~/Documents/AllTest**
6.  Make sure **JsObjects** is up to date (**git pull**) and then set up and run **MakeHtml** in the **~/Source/MakeHtml** directory.
7.  Now browse to your elastic IP and display **master-list.html.**

![MakeHtmlWorkFlow](https://s3.amazonaws.com/bucket01.elvenware.com/images/make-html-work-flow.png)

## Step One: Theme {#theme}

Pick a subject that you want for your web site. I don't care what subject you pick. It could be any of the following:

- A technical interest such as javascript, web development, linux, Windows, etc.
- A resume
- Favorite Music
- Favorite Books
- Favorite Movies
- Hobbies
- Other Interests

The most important thing is that it holds your interest. It should be something that you are passionate about, or sincerely attracts your interest.

## Step Two: Pages {#pages}

The site should contain at least three directories: the root folder and two subdirectories.

Five of the pages should have bitmaps on them. At least two of the bitmaps must be stored in the **/var/www/html/images** directory.

Since your site will be visible to the public, you should make an effort not to use copyrighted images. This means you should create the images yourself with a camera or drawing program, find the images in the creative commons, or take some other step to show that you are a law abiding citizens and not some crazed web cowboy without regard for the very humanity of which you yourself are a part. In short, you demonstrate respect for yourself and others.

- [Learn to use WikiMedia Images](http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2MarkdownToHtml.html#bitmaps)

## Step Three: Create Site {#create-site}

By now, you all should be familiar with the **MakeHtml** program and how to use it to convert your markdown files to HTML files that are stored in the **/var/www/html** directory.

![Create Site Activies](https://s3.amazonaws.com/bucket01.elvenware.com/images/create-web-site-activities.png)

The one extra step I want you to perform this time is to create a home page. By default, the page on your site called **index.html** is your home page.

When you installed the lamp-server, your web site automatically contained a page called **index.html** that contains data about your apache server. For some, this information may be useful, so lets not lose this page. Simply rename it from **index.html** to **apache-home-page.html**.

Back in **~/Documents/AllTest**, or wherever your working markdown files are, you should create a file called **index.md**. This file will automatically be converted to HTML and copied to your website when you run **MakeHtml**.

The contents of **index.md** should contain links that point directly to pages in your root folder, or lead indirectly to the other pages on your site. For example, the **master-list.md** file fulfills this requirement. As a result, it might make sense to base your home page on our **master-list.md** file. It would be a good idea, however, to make your home page look a bit nicer than the default appearance of **master-list.html**. The **master-list** page is designed to be functional, not pretty.

**NOTE**: *At the time of this writing, there appears to be a bug that creates repetition in the **master-list** page. Hopefully I will have a fix available soon. In the meantime, you may have to spend a moment deleting some of the repetitive entries before displaying them in your home page.*

## Step Four: Display on AWS {#display-on-aws}

Make sure you have connected an elastic IP to your running instance. Go to your elastic IP. If you have set up index.html correctly, then this should be the main page of your web site. If not, navigate to your main page. I'll want to see:

- A link to your main page (Normally your elastic IP.)
- A screen shot of your main page.

![Connect to EC2 activity diagram](https://s3.amazonaws.com/bucket01.elvenware.com/images/ssh-key-for-ec2.png)

The following diagram shows the workflow on EC2:

![Workflow on EC2](https://s3.amazonaws.com/bucket01.elvenware.com/images/update-site-on-ec2.png)

## Step Five: Phone {#phone}

I'll want to see a screen shot of:

- Your web site running in the Chrome emulator for phones.
- And, if possible, your web site running on your phone (Any phone will do. Does not need to be Android.)

To emulate your phone on Chrome:

- Open Chrome
- Bring up the Developer tools by
  - Selecting either **F12** or **Ctrl-Shift+I**
  - Or opening the Hamburger menu at top right (**Alt+F**) then **More Tools | Developer Tools**

In the developer choose toggle the Device Mode doohickey at the top left (**Ctrl-Shift + M**).

In the **device** drop down at the top left, you can optionally pick a particular device, such as **Samsung Galaxy S4** or **Apple IPhone 6**.

In the screen shot below, the doohickey and the **device** drop down are circled in red:

![Device Mode Chrome](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-midterm-2016-02.png)

**Note**: *I selected **Samsung Galaxy S4** in the **device** drop down. You can select any device, I just mention my selection so you can more easily find and identify the control I'm talking about.*

## CSS and JS Files

Create three files:

```
/var/www/html/js/elven-help.js
/var/www/html/css/style.css
/var/www/html/css/first-style.css
```

The files can be empty. The user will probably never know, but errors will occur if these files do not exist. My code attempts to load these files and if they are not available, an error will occur. I will look for those errors.

- **elven-help.js**: Custom JavaScript which I will give you. (There is some example code in **Tables** section below.)
- **style.css**: Put most of your css in here. Loaded after bootstrap is loaded.
- **first-style.css**: This file is loaded before the bootstrap styles, so things in here may be over ridden by bootstrap.

Also make sure **googlecode.css** is in place.

## Turn it in

Make sure the markdown for your completed site in your repository in the folder called **AllTest**.

Put the HTML for your completed site in your repository in a folder called **Week07-HTML**. There are numerous ways to get the HTML from your web site to your repository. One might be to issue a command similar to this:

```
cp -r /var/www/html ~/Git/prog270-lastname-2016/Week07-HTML
```

When you turn in the assignment, go to the text page and provide a link to the home page of your running web site. What I'm looking for is a clickable URL leading to your website running on AWS through an elastic ip.

Include any screen shots mentioned above.

## Tables

You can always use HTML code in a markdown file. However, is code for [creating tables](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables) in markdown. It looks like this:

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

Go to about line 166 with this command **Ctrl+Shift+_** plus the line number, which is 166 in our case.

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

## Directory Structure

![Dirs](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-midterm-2016-03.png)
