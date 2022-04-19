---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/MediaQueryMock.md
relativePath: javascript-guide/MediaQueryMock.md
title: MediaQueryMock
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: MediaQueryMock.md
fileNameHTML: MediaQueryMock.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

Using JQuery rather than @Media Queries
---------------------------------------

I’ve removed the native HTML 5 article and nav tags, and started using
ids, because IE 8 seems to prefer that approach. This at least gets me
started having things work in IE 7 and 8. (I’m using Expression Web
Superpreview to view these browsers, as I don’t have them installed
anywhere right now, though I think I can get IE 8 going after a bit.) At
any rate, using the id’s, I can get the colors to change in IE8
SuperPreview:

```html
<div id="header">
    Header
</div>
```

Then in my CSS, I changed all the tags to IDs:

```css
#nav
{
    background-color:green;
    float:left;
    width:25%;
}

#articles
{
    background-color:red;
    float:left;
    width:75%;
}
```

Notice that I changed article to articles. This is much the same as just
deleting it from the file. I want to do this because I want to get
control over that tag through JQuery and JavaScript. I ran the program
now to see how it worked, and it looked fine, except the article div was
white, as expected, since I was deliberately applying no markup to it.
Then I wrote this JavaScript file:

```javascript
window.onresize = WriteScreen;

function WriteScreen()
{
    var width = window.innerWidth;
    document.getElementById("ScreenDataX").value = width;
    document.getElementById("ScreenDataY").value = window.innerHeight;
    if (width < 375)
    {
        $("#article").removeClass("red");   
        $("#article").removeClass("blue");
        $("#article").addClass("green");
    }
    else if (width < 800)
    {
        $("#article").removeClass("red");
        $("#article").removeClass("green");
        $("#article").addClass("blue");
    }
    else
    {
        $("#article").removeClass("blue");
        $("#article").removeClass("green");
        $("#article").addClass("red");
    }
}
```

The first line captures onresize events. It ensures that WriteScreen
gets called every time the browser is resized. Then inside the
WriteScreen method, I change the background color for the article div at
the same spatial points that I make changes in the CSS file using media
queries. As a result, the colors change at the same time. On my system,
it all looks seamless, and there is no way that I can tell from just
looking which code is being changed by @media queries in the CSS and
which is being changed by this JavaScript code shown above. Using
SuperPreview I can’t tell whether this code will work with older
browsers. As I say, I’ll pursue this more tomorrow, and see what I can
learn if I get IE 8 up on a Virtual Machine. But what I have here is at
least a start. I’ll put this write up on the site for others to view,
and I’ll attach my code so you can play with it.

I should probably add that this is just something I've hacked together.
It is not a recommended solution at this point.
