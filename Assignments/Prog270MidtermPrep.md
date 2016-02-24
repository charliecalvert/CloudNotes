## Overview

The Prog 270 Midterm Prep helps you work on the Prisitine Lubuntu side of your midterm.
A summary of this assignment might read like this: *Do the midterm except for the parts on EC2.*
In particular:

- Create one or more partial or complete midterm pages in **~/Documents/AllTest**
- Create or save your images in **/var/www/html/images**
- Run MakeHtml
- Run on LocalHost and confirm that your site looks right.
- Copy your latest **AllTest** files to your repository and push.

![MakeHtmlWorkFlow](https://s3.amazonaws.com/bucket01.elvenware.com/images/make-html-work-flow.png)

Include three screen shots

- Your Home Page running on Local Host.
- Two select pages with bitmaps running on Local Host.

## Copy CSS, Js and Images

Put this script in the root folder of your repository. Run it to back back up
your css, js, and image files to a folder in your  repository called
**ApacheHelpers**.

```bash
#! /bin/bash

# Declare destination dir for AllTest in
# one place so it is easy to modify
REPO=$GIT_HOME/prog270-calvert-2016

# Declare destination for CSS, JavaScript and Images
CSS_JS_IMAGE=$REPO/ApacheHelpers

# Copy AllTest
cp -r ~/Documents/AllTest $REPO/

# Ensure destination dir exists for CSS, JS and Images
mkdir -p $CSS_JS_IMAGE
# Copy CSS, JavaScript and Images
cp -r /var/www/html/css $CSS_JS_IMAGE/css
cp -r /var/www/html/images $CSS_JS_IMAGE/images
cp -r /var/www/html/js $CSS_JS_IMAGE/js
cp /var/www/html/clean $CSS_JS_IMAGE/.
```

## Clean

When testing your code, you want to make sure you are not relying on any
files already sitting in **/var/www/html**. This script deletes all the
HTML files and folders from /var/www/html. It also creates a zip folder
containing the most recent contents of your **js**, **css** and **images**
folders. Save the code as **/var/www/html/clean**. Make it executable with
**chmod +x clean**, then run the script as needed.

**NOTE**: *Where I write <LIST ANY OTHER FILES/FOLDERS> you should do exactly
that, and of course you have to then remove the text in angle brackets.*

```bash
#! /bin/bash

rm *.html <LIST ANY OTHER FILES>
rm -r MoreFiles Assignments <LIST ANY OTHER FOLDERS>
rm apache-helpers.zip
zip -r apache-helpers css/ js/ images/
```

## Turn it in

Push your repository. Attach the three bitmaps you created to the assignment.

## Big Picture

![Create Site Activies](https://s3.amazonaws.com/bucket01.elvenware.com/images/create-web-site-activities.png)
