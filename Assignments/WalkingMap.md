# Walking Map

Let's learn a little about maps, how to create our own maps, and how to share them with others on computers and on phones.

## Create Walks

Create a markdown document, that shows how to walk from one place to another in the Seattle area. Here, for instance, is an example walk, called **Weowna to Lake Hills GreenBelt**

### Weowna to Lake Hills GreenBelt

This is a nice little walk you can take from Sammish Lake up to the area near the Blueberry Farm on 148th. There is a bit of an uphill climb near the start of the hike, but there is lots of nice buculoc wandering in the hike. It is wonderful to live in a town that has so much park land so near the city center.

https://goo.gl/maps/wNCEu

<iframe src="https://www.google.com/maps/embed?pb=!1m29!1m12!1m3!1d5380.671222853524!2d-122.12670515651318!3d47.600163507515184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m14!1i0!3e2!4m5!1s0x0%3A0xab5fa3ebbf6e1351!2sLake+Hills+GreenBelt+Park!3m2!1d47.598918999999995!2d-122.13367!4m5!1s0x54906dd15166e78f%3A0xcc083ee8cc7b4b09!2sWeowna+Park%2C+Bellevue%2C+WA+98008!3m2!1d47.603766!2d-122.11379199999999!5e0!3m2!1sen!2sus!4v1413328922484" width="600" height="450" frameborder="0" style="border:0"></iframe>

### Details on creating walks.

Create at least three walks and place them all in a file called **WalkingMap.md**. Pick walks that you enjoy. If you like downtown Bellevue or Seattle best, then map your walks there. If you prefer to walk in the Issaquah Alps, then that is fine to. You could have one walk on Tiger, another along the Seattle waterfront. It's up to you.

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
