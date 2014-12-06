# Walking Map

Let's learn a little about maps, how to create our own maps, and how to share them with others on computers and on phones.

##Create Walks

Create a markdown document, that shows how to walk from one place to another in the Seattle area. Here, for instance, is an example walk, called **Weowna to Lake Hills GreenBelt**

###Weowna to Lake Hills GreenBelt

This is a nice little walk you can take from Sammish Lake up to the area near the Blueberry Farm on 148th. There is a bit of an uphill climb near the start of the hike, but there is lots of nice buculoc wandering in the hike. It is wonderful to live in a town that has so much park land so near the city center.

https://goo.gl/maps/wNCEu

<iframe src="https://www.google.com/maps/embed?pb=!1m29!1m12!1m3!1d5380.671222853524!2d-122.12670515651318!3d47.600163507515184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m14!1i0!3e2!4m5!1s0x0%3A0xab5fa3ebbf6e1351!2sLake+Hills+GreenBelt+Park!3m2!1d47.598918999999995!2d-122.13367!4m5!1s0x54906dd15166e78f%3A0xcc083ee8cc7b4b09!2sWeowna+Park%2C+Bellevue%2C+WA+98008!3m2!1d47.603766!2d-122.11379199999999!5e0!3m2!1sen!2sus!4v1413328922484" width="600" height="450" frameborder="0" style="border:0"></iframe>

### Details on creating walks.

Create at least three walks. Pick walks that you enjoy. If you like downtown Bellevue or Seattle best, then map your walks there. If you prefer to walk in the Issaquah Alps, then that is fine to. You could have one walk on Tiger, another along the Seattle waterfront. It's up to you.

Each walk should have:

- A brief description
- A link to the walk on Google Maps
- A map showing the walk itself

##Creating Walks

 - Click on a location on the map that you want to be the start of a walk. As a rule, it is best to pick a known place visible on the map, but you can simply right click and choose a random location in order to create a random starting point.
 - Click on another point to make your end point.
 - Click on the walking icon to show the distance and time for walking rather than by car or public transportation
 - The addresses of both locations should appear in a window in the top left of Google Maps.

![maps](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGUWEweUM1WUVLOTA)

Once you have your map planned out, click on the gear icon on the bottom right of the map. In the screen shot shown above it is very near the tiny window that says **23min - 1.2 miles**. A window will open. Choose **Share and embed map**. 

 - For the share link choose **Short URL**. Create a [hyperlink](https://goo.gl/maps/89Whj) to it in your markdown document. The link should include square brackets and parenthesis. But there is a globe icon at the top of StackEdit that will create the link for you automatically.
 - For the embed link, copy the whole iframe code shown you on Google sites, Paste it in unchanged in your markdown document. (You can mix markdown and HTML all you want in a markdown document. In this case, you are embedding an HTML iframe tag directly in your markdown.
 
Here you can see how to find the **Share and Embed map** menu item:
 
![maps](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGVzRIZlB5RS00Z2s)

This screenshot shows how to create the short URL that you will turn into a hyperlink in your markdown document:

![maps](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGTW91MHp0WTN2dlE)

Here you can see the beginning of the iframe element that you want to copy and paste into your markdown document. This is the one that creates the image of the walk that you planned. It looks like a screen shot, but it is more than that, in that you can interact with it. The element is not huge, but it is fairly large. It is mass of incomprehensible gibberish. Block copy from the opening &lt;iframe&gt; tag to the closing &lt;/iframe&gt; tag.

![maps](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGQXdaQVBWU0lQRGM)

When you are done, your code should look much like the  **Weowna to Lake Hills GreenBelt** section shown above in this document. The primary difference, of course, is that your map will show your walk, not mine.

## Create and Upload your Bootstrap HTML files

To complete the exercise, do the following:

- Download the markdown and HTML for your document from stackedit. Name the markdown file **WalkingMap&#95;LastName.md**. Name the HTML file **WalkingMap&#95;LastName.html**. In all cases LastName is your last name. 
- Wrap your HTML in a bootstrap document, as we did in the CodeAnywhereS3 assignment.
- Paste your HTML into a Google Sites 
- Upload your files to S3
- Upload your files to CodeAnywhere and place them in a folder in your repository. The name of the folder should be **Week04_WalkingMap**. 
- Take screenshot of your files in CodeAnywhere. Put the screenshot in your **Week04_WalkingMap** folder.
- Check your files into your BitBucket repository

## Google Sites Detailed

Here is one way to set up your Google Site.

- In StackEdit, save your markdown as HTML. (# menu | Export to Disk | As markdown). 
- Open the HTML in a text editor such as Geany, NotePad++, CodeAnywhere, nano or Visual Studio. (Wordpad might also work.)
- Block Copy the HTML to the clipboard (Ctrl-C).
- Open Your Google Site page. Go into edit mode. 
- Click the little HTML symbol on the top of the page at the right. 
- Delete any and all HTML shown in the HTML editor. 
- Paste in your HTML that you exported from StackEdit (Ctrl-V). 
- Save your work.

##Turn it in

Submit the following:

 - A zip file containing your files
 - In the comment area put the URLs of your walking map pages on S3 and Google Sites.
 - In the comment area put the URL of your git repository. It should look something like this:

```
git@bitbucket.org:Prog270_Lastname/prog270_Lastname.git
```