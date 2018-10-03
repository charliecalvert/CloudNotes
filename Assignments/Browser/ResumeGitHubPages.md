## Overview

Begin building a web site.

## Resume

Take the **resume.html** file from our [previous assignment][pr-resume]. Copy it into your repository. For now, it will probably be simplest if you use the Windows Explorer or some similar tool to do this.

The file might be in your **documents/prog109** folder or attached to your first web page assignment. It might have had a different name when you turned in the First Web Page assignment. Regardless, you should now rename the page to **resume.html** and put it in the root of your repository. When I say "put it in the root" I mean that you should not put the file in a subdirectory -- at least for now. Put it directly in the root of your **prog109-lastname-2018** directory.

## Correct It

Open up the file in Visual Studio Code or your editor of choice and correct any errors in the file. Many of you can watch the video I attached to your assignment in order to learn about many of the errors in your file. Also use the [HTML Validator][hv] to clean up errors. The Validator should give your file a clean bill of health before you turn in the assignment.

**NOTE**: _If you can't get the Chrome HTML Validator to work in your browser, you can try the [W3C validator][w3cv]._

**NOTE**: _We have to try to get to the bottom of why some students are having trouble using the [VLC media player][vlcm]. Admittedly, the [tool I use][kazam] to create videos is not widely known, but it has worked for nearly all students in the past. The VLC Media Player is probably the best tool of its kind available. Launch it, then load the video into the VLC media player. Make sure you are using VLC and not the Windows Media Player or the default MAC video player._

![The VLC Media Player Running on Ubuntu][vlcu]

## Home Page Basics

By default, most websites will load a file called **index.html** if you do not specify the name of a specific file.

If it does not exist already, create a file called **index.html** in the root of your repository. Push your work to GitHub. Now the **index.html** file should be loaded automatically if you give the bare URL of you GitHub pages website:

```
https://example.github.io
```

**NOTE**: _There may or may not be an actual GitHub Page site called **example.github.com**. Regardless, I am using this URL only as a template, and you should type in the name of your GitHub Pages site. (When looking at your repository, you can go the **Settings** page to find the URL of your GitHub pages site if you do not know it already.) Remember that there is often a delay between the time you push your repository and the time when your changes are reflected on your GitHub Pages site. The delay is usually less than a minute, but at least subjectively, it has felt longer to me at times._

Another way to load the same file is to load **index.html** is to write a URL that looks like this:

```
https://example.github.io/index.html
```

This link would load a file called **resume.html**:

```
https://example.github.io/resume.html
```

## Create Home Page`

Create a file called **index.html** in the root of your repository. If you already have a file of that name, you can edit it in any way you choose. You can keep the existing content, or move the existing content into a new file with a name like **Week02-Day01.html** or whatever seems appropriate.

In **index.html** create a link to your **resume.html** file. You will use the anchor tag to create this link. When you click on this link, it should open up **resume.html**. This is the first time you have done something like this, so I will give you a big hint on how to proceed:

```HTML
<a href="resume.html">Resume</a>
```

Here is the home page for my **prog109-notes** site. You can use it as a guide.

- [Prog109 Home Page](https://www.elvenware.com/teach/prog109/)

At this point, you will have only one link in your page. My home page has several links, but that is not the point. The goal is to see how you can build a home page that points at the other pages on your site.

You need not get too fancy. My home page, and yours, is very simple at this point. Let's get the basics straight first, and then we can begin to see how to create a fancier page. In particular, don't just block copy a bunch of fancy CSS from some site on the web. Instead, keep your page simple and fast loading.

**NOTE**: _I know some of you have the skills to create some very nice looking pages. I promise that I will give you plenty of chance to show your creativity. But for now, keep it simple._

## Turn it in

Finally, push your work to your GitHub Pages web site. When you turn in your assignment, provide me with a link to your home page for your GitHub pages site. From that home page, I should be able to load your corrected resume.

**NOTE:** _If you have a hard time creating the home page (index.html) and/or the link to **resume.html**, don't fret too much. Remember that if you push your **index.html** and **resume.html** to GitHub, then I can pull it down on to my computer and see how much you were able to accomplish._

[pr-resume]: https://www.elvenware.com/teach/prog109/resume.html
[hv]: http://users.skynet.be/mgueury/mozilla/download_090.html
[w3cv]: https://validator.w3.org/
[vlcm]: https://www.videolan.org/vlc/index.html
[kazam]: https://itsfoss.com/best-linux-screen-recorders/
[vlcu]: https://s3.amazonaws.com/bucket01.elvenware.com/images/vlc-about.png
