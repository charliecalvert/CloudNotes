---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/PictureCaption.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: PictureCaption.md
relativePath: /PictureCaption.md
title: PictureCaption
directoryName: Assignments
category : assignments-guide
---

#PictureCaption


##Step 01: Design Document Description

We need to designed a Description Document that will contain the information that we want to display

```
{
    "type": "pictureCaption",
    "content": [
        {
            "title": "Deception01",
            "url": "images/Deception01.jpg",
            "caption": "Deception Falls near Stevens Pass"
        },
        {
            "title": "Deception02",
            "url": "images/Deception02.jpg",
            "caption": "Deception Falls on Highway 2"
        },
        {
            "title": "Deception03",
            "url": "images/Deception03.jpg",
            "caption": "Deception Falls runs high in the spring rains."
        }
    ]
}
```

##Step 02: Design the Display Object

We need to be able to display our new document type:

```
/**
 * DisplayPictureCaption
 */

define(function(require) {
	'use strict';

	var DisplayPictureCaption = (function() {

		function DisplayPictureCaption() {

		}

		DisplayPictureCaption.prototype.display = function(fileList) {
		    // TODO: Define code for displaying the document here
		}

		return DisplayPictureCaption;
	}());

	return DisplayPictureCaption;

});
```

##Step 03 Create the DisplayObject

Create a new case statement in **DisplayFactory**:

```
case "pictureCaption":
	this.product = new DisplayPictureCaption();
	break;
```
You will also need to update the parameters passed to the require **define** statement at the top of the file.

##Step 04: Configure Require and FileList

Do whatever you need to do to get your new format loading correctly.

Modify **FileList.json** so that it contains a link to your new document:

    "Pictures01.json": "/home/charlie/Documents/Data/Pictures01.json",
    
## Step 05 Configure Resources

If your document depends on other resources, such as the **Deception01.jpg** bitmap, then make sure those resources are created and placed in the proper directory. Other Description Documents that we have created have relied on other resources, such as **Presidents01.json", etc...


##Step 06: Test

Start running tests to see if your can get your object to work.

- grunt jshint  // It must come back clean
- grunt pretty  // Exclude node_modules, Jasmine, Require and jQuery
- /RunKarma.sh

In general, it is time to start cleaning up your code, and making things look pretty. There is still more to do, such as adding in support for **bootstrap**, so don't focus too much on your CSS, but still get things cleaned up, focusing on your tests and code.

##Step 07: Turn it in

If you haven't done so already, create a **Week12Final** folder and copy your best code into it. This code might be in the Week09BridgeReader04 folder, or the Week10InClassMarkdown folder, or some place else. The point is to establish the code that will be part of your final. This is not, of course, your final, but we will likely build our final on top of this project.

Create a **documentData** display:

```
{
    "type": "documentData",
    "content": [
        {
            "title": "Deception01",
            "level": 1,
            "content": "Deception Falls near Stevens Pass."
        },
        {
            "title": "Deception02",
            "level": 2,
            "content": "Deception Falls on Highway 2"
        },
        {
            "title": "Deception03",
            "level": 1,
            "content": "Deception Falls runs high in the spring rains."
        }
    ]
}
```

It should display both the **document** and the **title**, and you should be able to filter on the **level**. For instance:

for (doc in documentData) {
    if (level < 2) {
        // Display the document, thus ignoring those with level 2.
    }
}

If you need something else to think about, think about MongoDb. It's likely to figure into next weeks discussions, and into the final.