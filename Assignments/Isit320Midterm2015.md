# Isit320 Midterm 2015

This document is not complete, but there is enough here to get you started.

Polish the **BitlyRefine** and **TwitterRefine** programs.

Extend these programs to support viewing images stored in the cloud. The program should integrate Delicious, Bitly and Twitter. In particular, you should be able to view a *gallery* of images created from Bitly or Delicious links and Twitter posts.

Store links in:

- Bitly
- Delicious
- Twitter

## What to Build {#overview}

Create a new project or copy your **Bitly Refine** or **Twitter Refine** application into a new folder labeled: **Week08-Midterm**. If you copied a project, make all the appropriate changes regarding the name of the application. When changing the title in **/routes/index.js** make sure to include your name. For instance: **midterm-lastname**.

Your modified app should have the following.

Three radio buttons in a panel labeled **Image Source**:

- Bitly
- Delicious
- Twitter

When the buttons are selected, search Bitly, Delicious or Twitter for your images. These means you need to create groups or hash tags in Bitly, Delicious and Twitter that will return the results you expect. For instance here is a possible twitter tag for my images:

- **#isit320-calvert-images**

Make sure the dashes work. I tried this on Bitly: **elf-image**. It did not work. But **image** did. I assume the trouble was the tag.

The query on bitly:

	https://api-ssl.bitly.com/v3/user/link_history?access_token=<TOKEN>&query=image

Display the images in a clickable list. When the user clicks on an item, display the image.

![Midterm Overview](https://s3.amazonaws.com/bucket01.elvenware.com/images/isit320-midterm-2015.png)

## Showing Images

To show an image dynamically, you can start with an image tag in your HTML:

```jade
+elfPanel("Image Display").elfDiv
    img#image
```

Then its nice to have a little code that will fill in the **src** field of the image tag when the user selects an image:

```javascript
hyperlinkUrl: function(index, text, url) {
    var anchor = '<a href="' + url + '" target="_blank">' + text + '</a>';
    var details = '<a onclick="elfDisplay.displayImage(' + index + ')">Details</a>';
    return { title: anchor, keyword: details };
},

displayImage: function(index) {
    var link = elfBitly.getLinkHistoryItem(index);
    $('#image').attr('src', link.keyword_link);
},
```

You have seen a variation of the first method before under the name **appendUrl**. It is used to wrap a bit of text in an anchor. This makes it clickable; it turns it into a hyperlink.

Here is what you **img** tag looks like before the **displayImage** method is called:

```xml
<img id="image">
```

After the **displayImage** method is called, the HTML that you create looks like this:

```xml
<img id="image" src="http://bit.ly/bootstrap-basics-01">
```

The second line of code in the method sets the **src** attribute of the **img** element. This is all that needs to be done to load the image. If you are at all unclear on how the [img tag][img-tag] and its **src** attribute work, please take a moment to do some research on the web. You have to understand those subjects to understand this code, or to continue doing any kind of serious work on the web.

**NOTE**: *In my implementation, both the **hyperlinkUrl** method, which you have seen before, and the **displayImage** method, are part of the **elfDisplay** object.*

[img-tag]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img

## Create Modules

I might well need more before I'm done, but I'm working hard to create small, easy to manage objects:

```bash
[charlie@rohan-gate ~/Git/isit320-calvert-2015/Week08-Midterm]
$ ls -l public/javascripts/
total 16
-rw-rw-r-- 1 charlie charlie 2467 Nov  7 15:19 control.js
-rw-rw-r-- 1 charlie charlie 2357 Nov  7 15:47 display.js
-rw-rw-r-- 1 charlie charlie 1143 Nov  7 15:26 downloads.js
-rw-rw-r-- 1 charlie charlie  475 Nov  7 14:51 movement.js
```

Of course, you will have to load this code in **layout.jade:**

```jade
doctype html
html
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width')
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
    script(src="javascripts/control.js")
    script(src="javascripts/downloads.js")
	etc...
```

## Finding Images

There are two ways that I know about for storing images in the cloud:

- Free services
- Pay services

Both Google Photos (with Picassa Web) and Imagur provide at least a limited ability to create galleries and show them on your web site. However, these services have real limitations, and they feel, to me at least, a bit tentative, as if they may not be available for very long.

As a result, I want you to use a combination of:

- Free Creative Commons Images
- Images from S3 for which you must pay

## Creative Common's Images

The images under the creative commons license are usually free for you to use in your own program. Sometimes you need to provide attribution, and some images can be edited and others can't, but overall, this is a great source of free images. Here are two simple ways to find creative commons images:

- Google search
- Creative commons search

### Google Search

- Go to Google. Search on subject, for instance: [cpu](http://www.google.com/search?q=cpu)
- Click on Images: [CPU Image Search](http://www.google.com/search?q=cpu&source=lnms&tbm=isch)
- Click on Search Tools
- Set the license option to: [labeled for reuse with modification](http://www.google.com/search?q=cpu&source=lnms&tbm=isch&tbs=sur:fmc)

You are looking at images that you are free to reuse. Right click and choose **Copy image url**.

**NOTE**: *By clicking on some of these images, you can sometimes drill down to the site on which they are hosted. In those cases, you can often get more information, such as licensing, links to images of various sizes, etc.*

Here is a freely reusable image found on Google search:

![cpu](https://s3.amazonaws.com/bucket01.elvenware.com/images-test-01/cpu-564772_640.jpg)

Below is a thumbnail which you can click to get the full size image.

[![arch](https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/80486DX2_arch.svg/500px-80486DX2_arch.svg.png)][big-link]

[big-link]: https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/80486DX2_arch.svg/2000px-80486DX2_arch.svg.png

### Creative Commons Search

Go to the creative commons search site:

- [https://search.creativecommons.org/](https://search.creativecommons.org/).

Enter a search string such as **sailing**. Select one of the boxes under the **Search using** tag:

- Flickr Images
- Google Images
- Pixabay

Muck around until you get the URL for your image.

![Sailing](https://s3.amazonaws.com/bucket01.elvenware.com/images-test-01/ships-701596_640.jpg)

**NOTE**: *Apparently pixabay images can't loaded directly from their site. You will therefore have to download them, and then host them on another site, such as S3.

## AWS S3

When all is said and done, I think the simplest way to store images in the cloud that you want to view on your web site is to pay for it. To make a long story short, Amazon Web Services S3 option allows you store images in the cloud for pennies a month. For instance, most of the images that you see on our Isit320 web sites are stored on S3, and I paid three cents last months for the privilege.

It simply makes no sense to go through the hastle of trying to get around the limitations of the Google and Imagur services when Amazon provides such an inexpensive solution.

One pay service that I use frequently is Amazon Web Services S3. Anyone can create an AWS account and use it (within reason) for one year for free. After that, you need to start paying.

First sign up for [the free tier][free-tier] or sign into your existing account. Then start to [use S3][use-s3].

**NOTE**: *AWS offers one year of free usage for reasonable requests. Be sure to sign up for the free tier. If you have any doubts, please wait until Tuesday before creating your account. However, it is not really that complicated.*

- Use the free tier
- Have a credit card and a phone ready.
- Follow [my instructions][use-s3] to start uploading images to your S3 account.

[free-tier](http://www.elvenware.com/charlie/development/cloud/WebServices.html#aws)
[use-s3]:http://www.elvenware.com/charlie/development/cloud/WebServices.html#s3


- <http://calculator.s3.amazonaws.com/index.html>


## Fav-Icon Missing - 404 {#icon-missing}

Sometimes, on startup, you get an error about your favorite icon missing. I believe the **CreateExpressProject** script will put a 32 X 32 image file called called **favicon.png** in your **public** directory. To display the icon, you need to open **app.js**. Around line 17 you will find this code:

```javascript
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
```

Uncomment the second line and change **favicon.ico** to **favicon.png**.

```javascript
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
```

Now the error should go away. You can use any image editor you want to modify the **favicon.png** file. On Linux, the tool of choice is called **gimp**, but simpler tools will probably a do simple job like this just as well.
