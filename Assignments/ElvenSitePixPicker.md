## Overview

Elven Site Pix Picker

## Copy Midterm

```
cp -r Week08-Midterm Week10-ElvenSitePixPicker
```

Don't forget to rename the project when you open it in WebStorm.

Make sure you **~/.content/ElvenConfig.json** contains the usual code plus the following, or something like it:

```json
"elvenImages": {
  "baseDir": "/var/www/html",
  "markdownFileWithImages": "/home/bcuser/Documents/AllTest/california.md",
  "allImagesJsonFile": "all-images.json",
  "imageDir": "/images/california/",
  "notUsedDir": "/home/bcuser/temp/not-used/california"
},
```

## Two Pages

The first step will be to create two pages:

- One for creating a web site, MakeHtml style, as in the midterm
- One for creating a page based on a set of pictures from your camera or some other source

## Page One

Take everything beneath the **block content** in **index.jade** and put it in **make-html.jade**.

Replace the content you removed with the following:

```jade
div
    a.pageLink#pageOne Page One
    a.pageLink#pageTwo Page Two

div#pageLoad
```

Add some CSS to **public/css/style.css** to make the anchors a bit prettier. At minimum, do this:

```css
.pageLink {
    margin: 5px;
    padding: 3px;
    border: black solid thin;
    -webkit-border-radius: 4px;
    -moz-border-radius:4px;
    border-radius: 4px;
}
```

## Load the Pages

You will need code like this to load the pages:

```javascript
function SiteConfig() {
    $('#pageOne').click(pageOne);
    $('#pageTwo').click(pageTwo);
}

function pageOne() {
    $('#pageLoad').load('/makeHtml', function() {
        $('#loadConfig').click(loadConfig);
        elf.walking.configurePageOne();
        loadConfig();
    });
}

function pageTwo() {
    $('#pageLoad').load('/pixPicker', function() {
        // CODE OMITTED HERE
    });
}
```
