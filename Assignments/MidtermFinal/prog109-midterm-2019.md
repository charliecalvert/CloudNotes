## Overview

This is the 2019 midterm for Prog 109. This should be close to the final version, but as you work on your midterm, refresh this page from time to time in your browser. It is unlikely that I will change the requirements for the midterm, but I may add clarifications or hints. You'll want to see hints.

It is okay to ask technical questions about the midterm in the discussion area, but remember not to post code that shows solutions. Please start on this assignment tonight, and work a little bit on it each day until you feel it is ready to turn in. Don't wait to the last minute.

## Goals

The goal of the midterm is for each student to:

- Pick a theme for a web site
- Develop at least seven completed web pages (HTML files).
  - At least five of the pages should contain pictures.
  - At least three of the pages should be three screen fulls in length. In other words, I want to see much more than just one or two short sentences on most pages.
- Create the pages in Visual Studio Code or your editor of choice..
- Create the web pages entirely in HTML5 and CSS3. You can optionally include JavaScript.
- Make sure each page has all of the following HTML5 elements:
  - header
  - nav (perhaps not needed on your About page.)
  - main
  - footer
- Display the web site on your GitHub Pages site.
  - This should happen automatically when you push to GitHub.
- Your GitHub Pages home page should include links to your homework assignments and a link to the index.html file for your Theme directory.
  - On your home page, provide one link to the home page of your Theme, and from there link to the individual pages you created.
  - Make sure all your homework pages pass the HTML Validator. Fix errors in them pointed out when I graded your assignments. This is an important part of the midterm: I want to see that you know how to write valid HTML and that you know how to fix errors. The theme site is the heart of the midterm, but fixing the homework assignments and linking to them is also a big part of your midterm.
- View the site on an emulated phone and if possible on a real phone. Make at least minimal corrections to ensure it looks good. We have not solved all problems related to phones yet, particularly when it comes to NAV sections. Just do the best you can given the technology we have covered so far. Don't try to fix everything by searching across the web. I'm expecting these pages to not be fully polished yet. Polishing them will be part of the final.
- On at least three pages, include at least one image that you float to the left or right.
- Include at least one **aside** that you float to the left or right.
- Include examples of paragraphs, headers (h1, h2, etc) and unordered or ordered lists on several of your pages.
- Include at lease one **About** page, one with your picture on it for the home page, and an optional second one for your theme site. The theme site home page can be similar to your regular **About** page but at least a little connection to your theme. For instance, if you write about Frogs, you can say: "Ever since I was little I have been fascinated by frogs. After it rains, I like to open the window and listen to the sound of them croaking."
- Make sure the HTML Validator is working properly on all your theme pages. Also check your homework pages. They are very important, but not as important as your theme pages. The theme pages should be as polished as you can make them in the time given.

## Creating a GitHub Pages WebSite

Here is a step by step outline of what needs to be done to move your website from your local copy of your repository to your GitHub pages.

1. Create your web pages and test each one locally before uploading it. (Choose **Go Live** to open the page in your browser using our built-in live web server).
1. Push your repository
1. Make sure it looks right on your GitHub Pages site.
  1. This usually involves browsing to a URL like this **https://mygithubname.github.io**.

Very rarely there can be technical problems with GitHub pages, but they have been resolved.
If you suspect problems are recurring, go to the [GitHub Status page](https://status.github.com/messages).

The rest of this assignments outline some of the details of what I'm looking for in the midterm.

## Develop a Theme {#theme}

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

The theme pages on your GitHub pages site should be stored inside a folder called **theme**. In total, your site contain at least three theme-related directories: the root folder and at least two sub-directories. For instance, if your theme was **West Coast States**, you might have these subdirectories:

- theme
  - california
  - oregon
  - washington

Put at least one page in each sub-directory of your theme and link to it from your theme home page.

Five of the seven pages your create for your theme should have images on them. The images should be ones that you took yourself, or ones that are clearly marked as released under the Creative Commons license. Do not include any proprietary images belonging to someone other than yourself.

- You should display at least 10 images on your theme pages. Any particular page may have zero or only one image. However, across all seven pages there should be at least 10 different images displayed.
- At least two of the images must be served from your **images** directory.
- At least one picture should be floated left or right.
- At least five of your pictures should be in a **figure** element and have a **figcaption** describing the picture.
- At least one picture should be served from the WikiMedia Commons. I'm looking for images released under Creative Commons license.
  - This picture should be in a **figure** element and feature a **figcaption**. Where appropriate, the caption should include a link to the page on the WikiMedia site where the image is hosted.

- [Learn to use WikiMedia Images](http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2MarkdownToHtml.html#bitmaps)
- [Understanding Copyright Issues](http://www.makeuseof.com/tag/concerned-copyright-guide-legally-using-images-web/)

## Step Three: Create Site {#create-site}

Create a home page for both your theme and for your entire site. By default, the page in the root of your repository called **index.html** is your home page. The *&**index.html** page in the root of your **theme** directory is the home page for your theme.

The contents of site-wide home page should contain links that point directly to your theme and to each of your homework assignments. For instance, it should link to the **index.html** file in your **theme**, **list-button** in assignments, and other sub-directories that contain code you have created. On your site Home Page, I want to see links to not only your theme folder, but to all the assignments we have created so far in this course.

Since a web server such as the one on GitHub Pages will automatically load **index.html** as a default page, your links can simple point to the **theme** or **assignments** directory. You don't have to point them to **theme/index.html**. Remember, this will work properly on GitHub Pages, but it probably won't work when your load page directly into your browser with **Ctrl + O**.

    <a href="/theme">Theme</a>

You don't have to do this, though it is not wrong:    

    <a href="/theme/index.html">Theme</a>

**NOTE**: _One of the facts of life with cloud services is that they sometimes go down, and sometimes don't work exactly as advertised. Yet ultimately, all of the tools we are using (Windows, the Mac, Linux, Git, GitHub, GitHub Pages, and Visual Studio Code) will work. It's not enough just to tell me that some service or tool is broken. You have to learn to trouble shoot or workaround a problem. At one point during a previous quarter, GitHub Pages went down for about 24 hours. This was an extreme case, as outages on major sites are rare and usually last much less time. Nevertheless, the problem occurred, and the only solution was to wait for Microsoft to fix the problem. Given that this is a possibility, you should not wait until the last minute to create your midterm. Get things close to your final state well ahead of the deadline, and then an outage will not completely block you. Yes, I would make an allowance for a last minute outage of that type in terms of our schedule, but still the point is valid: build in some time into your schedule for unexpected outages or other developments. Consider, for instance, the case where you planned to do all your work on the day the midterm was due. Unfortunately, a key service was down that day and it prevented your from doing most of your work. I give you an extra day to work on the midterm as a result, but on that extra day you only have an hour free time. That will be trouble._

## Step Four: Display on GitHub Pages {#display-on-ghp}

Provide links to your site Home Page and them Home Page.  When you submit the assignment, I'll want to see:

- A link to your Home Page for your site
- A link to your Home page for your theme.
- Links to key features on your site such as the floated images and the aside.

## CSS and JS Files

I'm expecting to see a least one CSS file linked from your home page, from each of your theme pages, and from at least some of your homework pages. I'm expecting to find a directory in the root of your site called **styles**. There should be a stylesheet in that directory which is linked to by most of your pages.

You should create a separate style sheet for your theme. Create a directory called <b>css</b> inside your <b>theme</b> directory and put a CSS file called <b>styles.css</b> with at least a <b>background-color</b> for the <b>body</b> tag in it. You can just copy the <b>styles.css</b> from the <b>styles</b> directory into your <b>css</b> directory if you wish.

## Turn it in

Make sure the HTML files for your completed site are in your repository. Since your GitHub pages site is based on your repository, this is a given, but still I mention it just to be complete.

When you turn in the assignment:

1. Provide a link to the home page of your GitHub pages website. I'm looking for a URL leading to your website running on GitHub pages.
2. Provide a link to your theme directory. This should bring up the default page for your theme.
3. Provide a link to at least one page where you float an image to the right or left.
4. Provide a link to at least one page where you have an aside floated to the left or right.

Since you need to turn in multiple links, the simplest approach will probably be to use the Text page of Canvas when submitting the assignment.

Don't forget to check the HTML Validator, especially for your home page, and for your theme pages. Also, check the console page in the Developer tools, and make sure it is not showing errors. Places to check for errors in the developer tools:

- HTML Validator
- Console page
- Network page

## Which CSS Properties and HTML Elements

I'm good with almost all HTML elements except:

- BR

Here are the CSS Properties we are using:

- background-color
- border (border-left etc)
- border-collapse
- border-radius
- float
- font-family
- font-size
- font-style
- font-weight
- clear
- color
- display
- height
- list-style-type
- margin (margin-left etc)
- max-width
- overflow-x
- padding (padding-left etc)
- text-align
- transform
- width

If there is some property I'm missing you feel should be on this list, let me know.

CSS Properties to avoid

- center (obsolete)

## Phone Emulation {#phone}

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

More details are provided on the [Google Device Mode pages][gdmp].

[gdmp]: https://developers.google.com/web/tools/chrome-devtools/device-mode/

## Network Page

You should turn frequently to the console and network pages in the Chrome and Firefox developer tools. Access them with F12 or Ctrl-Shift-I. Press F5 if necessary to refresh the display.

The images below are not from this course, but they show that files called **first-style.css**, **style.css**, **googlecode.css**, **elven-help.js** and the elvenware logo have all been loaded. If you see red on this page, you probably have a problem. (We have not yet worked with favicons, so I will give you a pass on that file.) Once again, the screen shots shown here are from a different course, and so your output will not look the same. For instance, you won't see files called **googlecode.css**. The point is to scan the output and look for files highlighted in red. If they are red, then that probably means there is an error. More specifically, it could mean that one of your **link**, **script**, or [anchor](https://www.w3schools.com/tags/tag_a.asp) tags is not working correctly.

### Network Page Chrome

![Developer Tools Network Page Chrome][network-chrome]

### Network Page Firefox

![Developer Tools Network Page Firefox][network-firefox]

[network-chrome]: https://s3.amazonaws.com/bucket01.elvenware.com/images/network-chrome.png
[network-firefox]: https://s3.amazonaws.com/bucket01.elvenware.com/images/network-firefox.png
[c9-d]: https://s3.amazonaws.com/bucket01.elvenware.com/images/prog109-midterm-c91.gif
