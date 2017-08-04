# MapPlaces

The goal of this assignment is to help you learn how to drive Google Maps from a JavaScript based application.

This description is a bit incomplete, but should give you enough information to get started. I will come back later and fill in more specifics.

Use [this video][video] as a guide to Google Maps and My Maps:

[video]: http://youtu.be/HiP-YN3kAes

## Google Maps and My Maps

Open up Google Maps on your desktop and save and save Marymoor Park to your places. Open up **Your Places** (**Gear | Your Places**) and take a screen shot showing Marymoor Park in **Your Places**.

Open up My Maps and create a new map called **Bellevue Parks**. Add at least five parks in the Bellevue area to a lair called **The Parks**. Pick a **uniform style** for the parks and select an icon for all of the parks. That is, select a single icon, and apply it to all of the parks.

Create a new layer called "Trips." Include at least two routes between parks, where the starting point (or ending point) for at least one of the walks is a custom marker that you created at some random spot not associated with an address.

Take a screen shot of the your parks, showing the custom icons. Take a screen shot of your route between the parks. (These can be combined into a single screen shot, so long as everything is clearly visible.

## The other End

If you have an Android, install Google Maps and Google My Maps. Take a screen shot showing that your Marymoor Park marker (pin) made it into the Your Places section of Google Maps for the phone or tablet. You can reach "Your Places** from the Google Maps menu. It is the first item, right at the top.

In My Maps, open up your new **Bellevue Parks** map and create one or two screen shots showing your custom icons and at least one of your routes.

## Create a Document

Go into StackEdit and create a short document showing your screen shots. There should be at least a few words introducing each screen shot, but it need not be long.

Save your documents as markdown and HTML. Push them both into Git in a folder called **Week10_MapPlaces**.  You can use CodeAnywhere, Lubuntu on VirtualBox, or any other tool you want to get it into Git. All I care is that it is there.

Copy your document into **/var/www/html** on EC2 and provide a link to your document. Create a screen shot of it running on EC2 and push that one screen shot into Git. The other screen shots need not be in Git, so long as I can see them on your EC2 instance.

If you need to shrink any of the pictures you took, do this in your markdown:

```html
<img width=XXXpx src="SOME URL">
```

Like this:

```html
<img width=500px src="https://drive.google.com/uc?view=export&id=0B25UTAlOfPRGb1ZNWXJ2LWN1NUk">
```

## Turn it in

Submit the URL of your GIT repository and a link to your instance on EC2. The link should point directly at the document your created for this assignment.
