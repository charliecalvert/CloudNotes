---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/WalkingMap.md
relativePath: Assignments/WalkingMap.md
title: WalkingMap
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: WalkingMap.md
fileNameHTML: WalkingMap.html
---


<!-- toc -->
<!-- tocstop -->

# Walking Map

Let's learn a little about maps, how to create our own maps, and how to share them with others on computers and on phones.

## Create Walks

Create a markdown document, that shows how to walk from one place to another in the Seattle area. Here, for instance, is an example walk, called **Weowna to Lake Hills GreenBelt**

### Weowna to Lake Hills GreenBelt

This is a nice little walk you can take from Sammamish Lake up to the area near the Blueberry Farm on 148th. There is a bit of an uphill climb near the start of the hike, but there is lots of nice bucolic wandering in the hike. It is wonderful to live in a town that has so much park land so near the city center.

https://goo.gl/maps/wNCEu

<iframe src="https://www.google.com/maps/embed?pb=!1m29!1m12!1m3!1d5380.671222853524!2d-122.12670515651318!3d47.600163507515184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m14!1i0!3e2!4m5!1s0x0%3A0xab5fa3ebbf6e1351!2sLake+Hills+GreenBelt+Park!3m2!1d47.598918999999995!2d-122.13367!4m5!1s0x54906dd15166e78f%3A0xcc083ee8cc7b4b09!2sWeowna+Park%2C+Bellevue%2C+WA+98008!3m2!1d47.603766!2d-122.11379199999999!5e0!3m2!1sen!2sus!4v1413328922484" width="600" height="450" frameborder="0" style="border:0"></iframe>

### Details on creating walks.

Create at least three walks, each in its own map, and place them all in a file called **WalkingMap.md**. When you are done, you should have three headings, and under each heading should be a map that outlines a walk.

Pick walks that you enjoy. If you like downtown Bellevue or Seattle best, then map your walks there. If you prefer to walk in the Issaquah Alps, then that is fine to. You could have one walk on Tiger, another along the Seattle waterfront. It's up to you.

Each walk should have:

- A brief description
- A link to the walk on Google Maps
- A map showing the walk itself

## Creating Walks

 - Click on a location on the map that you want to be the start of a walk. As a rule, it is best to pick a known place visible on the map, but you can simply right click and choose a random location in order to create a random starting point.
 - A window should open on the left. Click on the Directions icon.
 - Click on another point to make your end point.
 - Click on the walking icon to show the distance and time for walking rather than by car or public transportation
 - The addresses of both locations should appear in a window in the top left of Google Maps.

![maps](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGUWEweUM1WUVLOTA)

Once you have your map planned out, click on the hamburger menu at the top of the window that opened on the left. Choose **Share and embed map**.

 - For the share link choose **Short URL**. Create a [hyperlink](https://goo.gl/maps/89Whj) to it in your markdown document. The link should include square brackets and parenthesis. But there is a globe icon at the top of StackEdit that will create the link for you automatically.
 - For the embed link, copy the whole iframe code shown you on Google sites, Paste it in unchanged in your markdown document. (You can mix markdown and HTML all you want in a markdown document. In this case, you are embedding an HTML iframe tag directly in your markdown.

Here you can see how to find the **Share and Embed map** menu item:

![maps](https://s3.amazonaws.com/bucket01.elvenware.com/images/WalkingMapShareEmbed.png)

This screenshot shows how to create the short URL that you will turn into a hyperlink in your markdown document:

![maps](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGTW91MHp0WTN2dlE)

Here you can see the beginning of the iframe element that you want to copy and paste into your markdown document. This is the one that creates the image of the walk that you planned. It looks like a screen shot, but it is more than that, in that you can interact with it. The element is not huge, but it is fairly large. It is mass of incomprehensible gibberish. Block copy from the opening &lt;iframe&gt; tag to the closing &lt;/iframe&gt; tag.

![maps](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGQXdaQVBWU0lQRGM)

When you are done, your code should look much like the  **Weowna to Lake Hills GreenBelt** section shown above in this document. The primary difference, of course, is that your map will show your walk, not mine.

## Waypoints

Sometimes you need to select more than two points in order to properly define your walk. In the image shown below, I added links to the walk by pressing the + symbol shown on the far left about 2/3s of the way from the top. I believe that Google calls this the "Destinations" button, but I'll go on using the word **waypoint** since it more exactly describes what we are discussing in this context.

If I want to divide a route up into thirds, or specify more exactly how to pass through a certain part of the walk, then I can use waypoints. Use it to break a walk up into sections. Instead of going directly from A to C, you can go first from A to B, then press the plus button, then go from B to C. That is what I have done in the image shown below. Notice that there are now three "waypoints" (destinations) on the walk. You can see them at the top left of the screenshot. Note also that you can drag and drop the three waypoints to reorder them. You may have to drag them back and forth for a bit until the line you want appears on the map. In other words, the order of the waypoints is important. The point labeled **Elliot Bay Trail** above is not a known spot, it was just an unnamed spot on the map that I clicked on.

![Google Map Chain](https://s3.amazonaws.com/bucket01.elvenware.com/images/google-map-chain01.png)

Here is a link to the map if you want to study it in more depth:

https://goo.gl/maps/tcTaXV8PAq32

<iframe src="https://www.google.com/maps/embed?pb=!1m32!1m12!1m3!1d10756.33578089456!2d-122.37922945325799!3d47.624499466972466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m17!3e2!4m5!1s0x5490157db04eaf1d%3A0x256d44cf114863be!2sSmith+Cove+Park%2C+23rd+Ave+W%2C+Seattle%2C+WA+98199!3m2!1d47.632605!2d-122.387577!4m3!3m2!1d47.626886299999995!2d-122.3777563!4m5!1s0x0%3A0x7bfcfe1bfbd29f99!2sOlympic+Sculpture+Park!3m2!1d47.6165126!2d-122.3555086!5e0!3m2!1sen!2sus!4v1477761227379" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>

Just to be clear, each walk that you create must contain a starting point and end point, and from 0 to n waypoints. For this assignment, you might create maps that contain only starting and ending points. But one or more of your three maps might also contain multiple waypoints.

## Create and Upload your Bootstrap HTML files

To complete the exercise, do the following:

- Name the markdown file **WalkingMapLastName.md** where **LastName** is your last name.
- Place your code in your **~/Documents/AllTest** folder.
- Run your MakeHtml program to refresh the code on your Apache server.
- Copy the files from **AllDrive** to your repository, using our script.
- Push your repository. (It should now contain **AllTest/WalkingMap.md** or something similar.)
- Pull it on EC2.
- Copy it out to AllTest with our script.
- Run MakeHTML on EC2.

To copy the updated code in **AllTest** directory to the existing **AllTest** folder in your repository, use the instructions in the **ApacheHtml** assignment:

- [Apache HTML](http://www.ccalvert.net/books/CloudNotes/Assignments/ApacheHtml.html#apache-helpers)

## Turn it in

Take a screen shot of your page running on your local Apache Server. (localhost/WalkingMapLastName.html). Attach (upload) the image when you submit the assignment in Canvas. Provide a link to your page running on EC2.

Push your repository. By now I should be able to find it, but if you have any doubts, add your github url as a comment.

Check list:

- **WalkingMap.md** in **AllTest** folder in your repository?
- Three walks included in **WalkingMap.md**?
- Image showing your **WalkingMap** displayed in your browser attached to assignment? Try to show that at least two walks are visible on your page.
- URL for EC2 instance of your page.


## Hint

Check **~/Source/MakeHtml/config/ElvenConfig.json** to make sure it is compatible with your system. In particular, check the "base-dir", which assumes that your home path is **/home/bcuser**.

```
{
 "calvert": {
   "base-dir": "/home/bcuser/",
   "site-dirs": [
     "Documents/AllTest",
     "Documents/AllSite"
   ],
   "destination-dirs": [
     "/var/www/html/",
     "/home/bcuser/temp/test-site/"
   ]
 }
}
```

## Responsive Maps

In your CSS:

```css
.google-maps {
	position: relative;
	padding-bottom: 75%; // This is the aspect ratio
	height: 0;
	overflow: hidden;
}
.google-maps iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100% !important;
	height: 100% !important;
}
```

In your Markdown wrap the code you got from Goggle in a DIV with the **google-maps** class:

```html
<div class="google-maps">
  <iframe src="https://www.google.com/maps/embed?pb=! ETC... ></iframe>
</div>
```
