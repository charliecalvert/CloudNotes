---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser/ResumeGitHubPages.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser
fileName: ResumeGitHubPages.md
relativePath: /Browser/ResumeGitHubPages.md
title: ResumeGitHubPages
directoryName: Browser
category : browser-guide
---

## Overview

Begin building a web site.

## Resume

Take the **resume.html** file from our [previous assignment][pr-resume]. Copy it into your repository if it is not there already. For now, it will probably be simplest if you use the Windows Explorer or some similar tool to do this.

**NOTE**: _If your resume file is not already in your repository, it might be in your **documents/prog109** folder or attached to your first web page assignment. It might have had a different name for one reason or another. Regardless, you should now rename the page to **resume.html** and put it in the root of your repository. When I say "put it in the root" I mean that you should not put the file in a subdirectory -- at least for now. Put it directly in the root of your **username.github.io** directory._

## Correct It

Open up the file in Visual Studio Code or your editor of choice and correct any errors in the file. Many of you can read the comments I attached to your assignment in order to learn about many of the errors in your file. Also use the [HTML Validator][hv] to clean up errors. The Validator should give your file a clean bill of health before you turn in the assignment.

**NOTE**: _If you can't get the Chrome HTML Validator to work in your browser, you can try the [W3C validator][w3cv]._

## Home Page Basics

By default, most websites will load a file called **index.html** if you do not specify the name of a specific file.

If it does not exist already, create a file called **index.html** in the root of your repository. Push your work to GitHub. Now the **index.html** file should be loaded automatically if you give the bare URL of you GitHub pages website:

```
https://example.github.io
```

**NOTE**: _There may or may not be an actual GitHub Page site called **example.github.io**. Regardless, I am using this URL only as a template, and you should type in the name of your GitHub Pages' site. (When looking at your repository, you can go the **Settings** page to find the URL of your GitHub pages site if you do not know it already.) Note that there is often a delay between the time you push your repository and the time when your changes are reflected on your GitHub Pages site. The delay is usually less than a minute, but at least subjectively, it has felt longer to me at times._

Another way to load the same file is to load **index.html** is to write a URL that looks like this:

```
https://example.github.io/index.html
```

The link shown below would load a file called **resume.html**:

```
https://example.github.io/resume.html
```

## Create Your Home Page {#create-home-page}

Open the file called **index.html** found in the root of your repository.

**NOTE**: _Your current **index.html** file should have only a one or two simple lines of content in its BODY. If you find, for some reason,that there is a lot of other content in the file, you move the existing content into a new file with a name like **Week02-Day01.html** or whatever seems appropriate. We will have an opportunity to personalize and polish this page later, but for now it is best to keep it very simple._

In **index.html** create a link to your **resume.html** file. You will use the [anchor][anchor] tag to create this link. When you click on this link, it should open up **resume.html**. This is the first time you have done something like this, so I will give you a big hint on how to proceed:

```HTML
<a href="resume.html">Resume</a>
```

Here is the home page for my **prog109-notes** site. You can use it as a guide.

- [Prog109 Home Page](https://www.elvenware.com/teach/prog109/)

At this point, you will have only one link in your page. My home page has several links, but that is not the point. The goal is to see how you can build a home page that points at the other pages on your site.

You need not get too fancy. My home page has grown over time, but yours should be very simple at this point. Let's get the basics straight first, and then we can begin to see how to create a fancier page. In particular, don't just block copy a bunch of fancy CSS from some site on the web. Instead, keep your page simple and fast loading.

**NOTE**: _I know some of you have the skills to create some very nice looking pages. I promise that I will give you plenty of chance to show your creativity. But for now, keep it simple._

## Turn it in

Finally, push your work to your GitHub Pages web site. When you turn in your assignment, provide me with a link to your home page for your GitHub pages site. From that home page, I should be able to load your corrected resume.

**NOTE:** _If you have a hard time creating the home page (index.html) and/or the link to **resume.html**, don't fret too much. Remember that if you push your **index.html** and **resume.html** to GitHub, then I can pull it down on to my computer and see how much you were able to accomplish._

The URL I'm looking for should look a little like this:

    https://github-user-name.github.io

I also want a link to your repository, but make sure the URL you give me of GitHub Pages does not contain "github.com".

Right URL for GitHub Pages:

    https://github-user-name.github.io

Wrong URL for GitHub Pages:

    https://github.com/github-user-name/github-user-name.github.io

Any link that began with a reference to your drive would also be wrong. For instance, a URL that begins like this points to your hard drive, and would be nearly useless or at least problematic on my system:

    file:///C:/Users/...

Pasting a valid URL into the address bar of a browser should lead to your **index.html** on the world wide web. You probably won't see the filename **index.html**, but the contents of that file should be what is displayed. This is because **index.html** is the default page for most websites. If you don't specify some other specific page, then that is what you shall see.

## Watching Charlie's Videos

In some cases, I may attach a video to your assignment when I grade it. To watch the video on Windows or the MAC, use the [VLC media player][vlcm]. Admittedly, the [tool I use][kazam] to create videos is not widely known, but it has worked for nearly all students in the past. The VLC Media Player is probably the best tool of its kind available. Launch it, then load the video into the VLC media player. Make sure you are using VLC and not the Windows Media Player or the default MAC video player.

![The VLC Media Player Running on Ubuntu][vlcu]

<!--       -->
<!-- links -->
<!--       -->

[anchor]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
[pr-resume]: https://elvenware.com/teach/prog109/assignments/resume.html
[hv]: http://users.skynet.be/mgueury/mozilla/download_090.html
[w3cv]: https://validator.w3.org/
[vlcm]: https://www.videolan.org/vlc/index.html
[kazam]: https://itsfoss.com/best-linux-screen-recorders/
[vlcu]: https://s3.amazonaws.com/bucket01.elvenware.com/images/vlc-about.png
