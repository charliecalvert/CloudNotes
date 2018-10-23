## Overview

This is the Midterm for Prog 109 in 2018.

The goal of the midterm is for each student to:

- Pick a theme for a web site
- Develop at least seven completed web pages at least five of which contain pictures.  
- Create the web pages using Visual Studio Code or your editor of choices. The pages of the site should use HTML5 code.
- Display the web site on your GitHub Pages site.
- Ensure that your theme pages are linked from your GitHub Pages home page.
  - Link to the home page of your Theme, and from there link to the individual pages your created.
- View the site on an emulated phone and if possible on a real phone. Make at least minimal corrections to ensure it looks good. We have not solved all problems related to phones yet, particularly when it comes to NAV sections. Just do the best you can.
- Include at least one image that you float to the left or right on at least three pages.
- Include examples of paragraphs, headers and unordered lists on several of your pages.
- Include an **About** page with your picture on it.

Here is a step by step outline of what needs to be done to move your WebSite from Pristine Lubuntu to EC2. The process seems a bit complex at first, but the steps can be mastered if you approach them one at time. Here they are in English, as a counterpoint to your good command list:

1. Create your web pages and test each one locally before uploading it. (Choose Ctrl + O to open the page in your browser).
1. Push your repository
1. Make sure it looks right on your GitHub Pages site.
  1. Sunday and Monday there were technical problems with GitHub pages, but they have been resolved.
  2. If you suspect problems are recurring, go to the [GitHub Status page](https://status.github.com/messages).

## Step One: Theme {#theme}

Pick a subject that you want for your web site. I don't care what subject you pick. It could be any of the following:

- A technical interest such as JavaScript, web development, linux, Windows, etc.
- A resume and expanded BIO.
- Favorite Music
- Favorite Books
- Favorite Movies
- Hobbies
- Outdoor interests such as hiking or sports.
- Other Interests

The most important thing is that it holds your interest. It should be something that you are passionate about, or sincerely attracts your interest.

## Step Two: Pages {#pages}

The theme pages on your GitHub pages site should contain at least three directories: the root folder and at least two sub-directories. For instance, if your theme was **West Coast States**, you might have three subdirectories:

- California
- Oregon
- Washington

Five of the pages should have bitmaps on them. The images should be ones that you took yourself, or ones that are clearly marked as released under the Creative Commons license. Do not include an proprietary images belonging to someone other than yourself.

- You should display at least 10 images one your theme pages. Any particular page may have zero or only one image. However, across all seven pages there should be at least 10 different images displayed.
- At least two of the bitmaps must be served from your **images** directory.
- At least one picture should be served from the WikiMedia site and be from a public domain source (Creative Commons) source.

- [Learn to use WikiMedia Images](http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2MarkdownToHtml.html#bitmaps)
- [Understanding Copyright Issues](http://www.makeuseof.com/tag/concerned-copyright-guide-legally-using-images-web/)

## Step Three: Create Site {#create-site}

By now, you all should be familiar with the process of pushing your pages to GitHub and viewing them on the GitHub Pages site. So that should not be an issue.

Be sure, however, to create a home page for both your theme and for your entire site. By default, the page in the root of your repository called **index.html** is your home page. The page in the root of your **theme** directory is the home page for your theme.

The contents of **index.html** should contain links that point directly to pages in your root folder and to the index.html file in your **theme**, **ListButton** and other subdirectories that contain code you have created.

Since a web server such as the one on GitHub Pages will automatically load **index.html** as a default page, your links can simple point to the **theme** or **ListButton** directory. You don't have to point them to **theme/index.html**. Remember, this will work properly on GitHub Pages, but it probably won't work when your load page directly into your browser with **Ctrl + O**.

    &lt;a href="/theme"&gt;Theme&lt;/a&gt;

    <a href="/theme">Theme</a>

You don't have to do this, though it is not wrong:

    &lt;a href="/theme/index.html"&gt;Theme&lt;/a>

    <a href="/theme/index.html">Theme</a>

## Repository Check

We have spent time working with both Cloud9 and AWS Educate. I want to be sure you are able to use these resources.

1. Pull your GitHub Pages repository on Cloud9 (c9.io)
2. Open up the **theme/index.html** file in the editor.
3. On the left, display a the workspace tab and select **theme/index.html**

![c9 Display][c9-d]

In this image we see the workspace on the left and index.html from the theme directory in the editor. In bash shell (command line) view at the bottom we have navigated to the theme directory.

Take a similar screenshot for your AWS Educate version of Cloud 9.

On your GitHub pages site, place both images in your images directory. Create a file called **cloud9-images.html** in the root of your repository. Display both images in it, much I display one of the images in this document. Link to the page from the home page for your site, using **Cloud9 Images** as the content of your anchor tag.

Hopefully these instructions are clear. It might help you understand the instructions if you remember that the point of this section of the midterm is to show me that you are on both Cloud9 and AWS Educate and that you are able to clone and pull from Git Hub pages repository to those environments. I also want to check that you understand Cloud9 well enough to open up a specific file in the editor, and to display a particular portion of your workspace in the navigation pane on the left.

**NOTE**: _If you are unable to get onto Cloud9 or AWS Educate for some reason, just tell me so when you submit the midterm. However, if you could not succeed, it will not completely ruin your midterm grade. It is, however, a part of this course to help you understand how to set up cloud services. We have dedicated significant class time to this subject, and given plenty of time for you to set things up with AWS Educate and Cloud9. It is almost impossible for anyone to function in the modern web development world without using cloud services. Proving that you can sign up for them, and get them to work, is a significant part of this course and likely a significant part of your ability to function in the job market._

**NOTE**: _One of the facts of life with cloud services is that they sometimes go down, and sometimes don't work exactly as advertised. Yet ultimately, all of the tools we are using (Windows, the Mac, Linux, Git, GitHub, GitHub Pages, C9, Visual Studio Code and AWS) will work. It's not enough just to tell me that some service or tool is broken. You have to learn to trouble shoot or workaround a problem. At one point during the quarter, GitHub Pages went down for about 24 hours. This was an extreme case, as most outages last much less time. Nevertheless, the problem occurred, and the only solution was to wait for Microsoft to fix the problem. Given that this is a possibility, you should not wait until the last minute to create your midterm. Get things close to your final state well ahead of the deadline, and then an outage will not completely block you. Yes, I would make an allowance for a last minute outage of that type in terms of our schedule, but still the point is valid: build in some time into your schedule for unexpected outages or other developments._

## Step Four: Display on AWS {#display-on-aws}

Make sure you have connected an elastic IP to your running instance. Go to your elastic IP. If you have set up index.html correctly, then this should be the main page of your web site. If not, navigate to your main page. When you submit the assignment, I'll want to see:

- A link to your main page (Normally your elastic IP.)
- A screen shot of your main page.

![Connect to EC2 activity diagram](https://s3.amazonaws.com/bucket01.elvenware.com/images/ssh-key-for-ec2.png)

The following diagram shows the workflow on EC2:

![Workflow on EC2](https://s3.amazonaws.com/bucket01.elvenware.com/images/update-site-on-ec2.png)

## Step Five: Phone {#phone}

I'll want to see a screen shot of:

- Your web site running in the Chrome emulator for phones. This process is described below.  
- And, if possible, your web site running on your phone (Any phone will do. Does not need to be Android.)

To emulate your phone on Chrome:

- Open Chrome
- Bring up the Developer tools by
  - Selecting either **F12** or **Ctrl-Shift+I**
  - Or opening the Hamburger menu at top right (**Alt+F**) then **More Tools | Developer Tools**

In the developer choose toggle the Device Mode doohickey at the top left (**Ctrl-Shift + M**).

In the **device** drop down at the top left, you can optionally pick a particular device, such as **Samsung Galaxy S4** or **Apple IPhone 6** or something similar.

In the screen shot below, the doohickey and the **device** drop down are circled in red:

![Device Mode Chrome](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-midterm-2016-02.png)

**Note**: *I selected **Samsung Galaxy S4** in the **device** drop down. You can select any device, I just mention my selection so you can more easily find and identify the control I'm talking about.*

More details here: <https://developers.google.com/web/tools/chrome-devtools/device-mode/&gt;

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

When you turn in the assignment, provide a link to the home page of your running website. I'm looking for a URL leading to your website running on AWS through an Elastic IP. I don't care how you provide the link, but in most cases using the Canvas comment area should be a good enough.

Include any screen shots mentioned above. Also, include a screen shot of MakeHtml running on your Ubuntu EC2 instance. It should show, in part, code like this:

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
[c9-d]: https://s3.amazonaws.com/bucket01.elvenware.com/images/prog109-midterm-c91.gif
