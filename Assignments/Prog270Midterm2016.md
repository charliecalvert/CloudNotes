## Overview

This is the Midterm for Prog 270 in 2016.

The basic goal of the midterm is for each student to:

- Pick a theme for a web site
- Develop at least seven completed web pages five of which contain pictures.
- To create the web site using our MakeHtml program. The pages of the site should therefore be based on markdown files.
- To display the web site on AWS and ensuring that it is accessible through an Elastic IP
- View the site on a real or emulated phone and make at least minimal corrections to ensure it looks good.


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

The one extra step I want you to perform this time is to create a home page. By default, the page on your site called **index.html** is your home page.

When you installed the lamp-server, your web site automatically contained a page called **index.html** that contains data about your apache server. For some, this information may be useful, so lets not lose this page. Simply rename it from **index.html** to **apache-home-page.html**.

Back in **~/Documents/AllTest**, or wherever your working markdown files are, you should create a file called **index.md**. This file will automatically be converted to HTML and copied to your website when you run **MakeHtml**.

The contents of **index.md** should contain links that point directly to pages in your root folder, or lead indirectly to the other pages on your site. For example, the **master-list.md** file fulfills this requirement. As a result, it might make sense to base your home page on our **master-list.md** file. It would be a good idea, however, to make your home page look a bit nicer than the default appearance of **master-list.html**. The **master-list** page is designed to be functional, not pretty.

**NOTE**: *At the time of this writing, there appears to be a bug that creates repetition in the **master-list** page. Hopefully I will have a fix available soon. In the meantime, you may have to spend a moment deleting some of the repetitive entries before displaying them in your home page.*

## Step Four: Display on AWS {#display-on-aws}

## Step Five: Phone {#phone}

## Turn it in

Put the markdown for your completed site in your repository in a folder called **Week07-Markdown**.

Put the HTML for your completed site in your repository in a folder called **Week07-HTML**. There are numerous ways to get the HTML from your web site to your repository. One might be to issue a command similar to this:

```
cp -r /var/www/html ~/Git/prog270-lastname-2016/Week07-HTML
```

When you turn in the assignment, go to the text page and provide a link to the home page of your running web site.

Also submit a URL leading to your website running on AWS through an elastic ip.
