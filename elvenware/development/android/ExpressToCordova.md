---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/ExpressToCordova.md
relativePath: elvenware/development/android/ExpressToCordova.md
title: ExpressToCordova
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

# Express to Cordova

It is relatively simple copy an Express application into a
Cordova project. The key points to grasp are:

* the files from the **public** directory of an Express project belong in the **www** directory of a Cordova project. 
* You need to bring along your bower components or similar files that are needed to make the project run.

## Media Queries

- <https://css-tricks.com/snippets/css/media-queries-for-standard-devices/>

```
body {
  padding: 25px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}


/* Smartphones (portrait) ----------- */
@media only screen and (max-width : 360px) {
  /* padding-top , right, bottom, left */
  body {
    padding: 5px 0px 5px 5px;
  }
}

/* Landscape layout (with min-width) */
@media screen and (min-aspect-ratio: 1/1) and (min-width:400px) {
  body {
    /* padding-top , right, bottom, left */
    padding:5px 0px 5px 15px;
  }
}
```

When you copy over bower, be aware of the public directory. It does not exist
on Cordova. So you probably want to modify bowerrc. Simpler, perhaps, to just
copy over **jquery.js** and put it in same directory as **Control.js**. But
then you will need to modify the script tag in the HTML file.

You can run your program, to some degree, using the python web server:

python3 -m http.server 30025

The paths to your scripts and css in your HTML should begin with ./:

```
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title></title>
    <link rel="stylesheet" href="./css/style.css">
    <script src="./components/jquery/dist/jquery.js"></script>
    <script src="./javascripts/Control.js"></script>
  </head>
```

## Server URL

In a standard Express app, we just write this to call a route on the server:

```
$.getJSON('/someRoute', function(response) {
```

That won't work in a Cordova app because the server is not running from the
same place as our Cordova application. In fact, the server is not on the phone
at all. So instead we write this:

```
$.getJSON('http://192.168.2.12:30025/someRoute', function(response) {
```

Here 192.168.2.12 is the address where my server is running. It will probably be,
for most of you, your Elastic IP.

<img class="small" src="https://drive.google.com/uc?id=0B25UTAlOfPRGcElESW1La1RzUEU" alt="ElvenGeo">


## TroubleShoot

Two things likely to go wrong:

- You did not put Control.js or other JavaScript files where they can be found
- You did not put jquery where it can be found.

Don't forget to look at the command prompt where your server is running. There
can be messages there that are helpful.

And of course, don't forget to start your server.



