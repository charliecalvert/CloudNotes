## Overview

Elven Images

## Step One

Pull JsObjects

Copy the ElvenImage Program

```bash
cp -r ~/Git/JsObjects/JavaScript/NodeCode/ElvenImages/ ~/Source/.
```

Navigate to the ElvenImage folder and run **npm install**.

```bash
cd ~/Source/ElvenImages
npm install
```

## Step Two

Get the canada images zip file from my Google Drive:

- [http://bit.ly/canada-images](http://bit.ly/canada-images)

Unzip into /var/www/html/images/canada:

```bash
cp canada.zip ~/var/www/html/images
unzip canada.zip
```

## Step Three

Run the ElvenImages program to create **~/Source/ElvenImages/images.md**

```
cd ~/Source/ElvenImages
npm start
```

Copy **images.md** to **~/Documents/AllTest/canada.md** and open **canada.md** in Remarkable. Edit as necessary.

Run the **MakeHtml** program. Open **localhost/canada.html** in the browser. If you are satisfied, take a screenshot.

Repeat this step or some variation of this step as often as necessary until you have deleted all unwanted images. Add captions and explanations to the remaining images.

Your goal is to create a **canada.html** file that focuses on 5 to 10 images.

**NOTE**: *Unfortunately, at this stage, you will need to do a search an replace to remove all references to **/var/www/html** from your markdown. Do this in Geany, not in Remarkable. The completed links should look like this:*

- /images/canada/2016-02-27_11.41.35-small.jpg



## Step Four

After you have picked the images you want to keep:

- Remove all the HTML and text from **canada.html** that do not refer to your chosen images.
- Delete all but the five to ten files you want to keep from **/var/www/html/images/canada**.

## Step Five

Copy your completed html and images to your repository.

Push. Pull on EC2. Copy files as necessary and then run **MakeHtml**. Take a screenshot of your finished **canada.html** file running in your browser on your elastic ip.

## Turn it in

Turn in the three screen shots:

- canada.html on local host
- canada.html on elastic ip
- A screen capture showing you running MakeHtml on ubuntu and showing that you processed a file called **canada.html**
