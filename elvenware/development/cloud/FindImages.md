---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/FindImages.md
relativePath: elvenware/development/cloud/FindImages.md
title: FindImages
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: FindImages.md
fileNameHTML: FindImages.html
image: ./course/course-javascript.jpg
subject: cloud
queryPath: elvenware/development/cloud/
---

<!-- toc -->
<!-- tocstop -->

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

![Sailing][saliboat]

[sailboat]: (https://s3.amazonaws.com/bucket01.elvenware.com/images-test-01/ships-701596_640.jpg)

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
