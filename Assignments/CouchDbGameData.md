---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CouchDbGameData.md
relativePath: Assignments/CouchDbGameData.md
title: CouchDbGameData
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: CouchDbGameData.md
fileNameHTML: CouchDbGameData.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Create a program based on [**JsObjects/Data/CouchView02**][couch-view-02] and call it **Week0X-DataMaster**. We will use the CouchView02 program as the basis for the program that works with the data we will use in the game.

[couch-view-02]: https://github.com/charliecalvert/JsObjects/tree/master/Data/CouchView02

## Create the Data

We will bring this portion of the game completely to fruition in a later assignment. For now you don't have to actually insert or update individual rows of data that you store in CouchDb from the **DataMaster** UI. In particular, most database programs allow the user to insert and delete individual rows of data with the UI. You do not have to do that with this program at this time. Just create the data inside a JSON file that you build by hand. Then use the existing Angular based UI to insert it all in one fell swoop. In other words, use the existing UI to insert all the records at one time either as a single document or a set of individual documents, one for each row.

To create the data that will be inserted, edit a JSON file in a text editor. Save the file to disk as **Npcs.json**. Place it near the existing **States.json** file. Then ensure you program can insert your new JSON file into the database, and that you can view it in your app. Use the existing Angular UI to handle the insert and view, but add new methods for handling the views of your new data. It should be fairly clear how to create these views from looking at the existing views for the States data. These views can be found in **routes/CouchDesignDocs.js** and **routes/CouchViews.js**.

Again, the user does not have to be able to edit or insert individual rows of data. They just need to be able to view the data you insert from your JSON file.

Be sure to review all the code in the routes directory, especially those files that begin with the word Couch. Since you have existing code in the sample program that calls most of these methods.

## Data

Insert your data into a CouchDb database called **game_data_lastname**, where **lastname** is your last name in lowercase letters. The structure of the data you insert into CouchDb should have the following features:

- An **npc_id**, which will corresponding to the numbers for designating NPCs in your NPC grid.
- A name for the character
- A description of the character
- A points value for the character
- A boolean (true/false) question
- An answer: true or false.

For instance, here are the first two **NpcObjects** in an array of NPCs:

```
{
    "_id": "npcObjects",
    "docs": [
        {
            "id": "XXXXX",
            "npc_id": 1,
            "npc_name": "Suzie",
            "description": "A tall red head with freckles",
            "color": "#00FFFF",
            "value": 15,
            "question": "Is 2 + 2 equal to 4?",
            "answer": true
        },
        {
            "id": "YYYYY",
            "npc_id": 2,
            "npc_name": "Tom",
            "description": "A strong bald man with green eyes",
            "color": "#0000FF",
            "value": 15,
            "question": "Is 2 + 2 equal to 5?",
            "answer": true
        }
    ]
};
```

Add a few more records and save them as **npcs.json**. The file should be near your **states.json** on disk. Remember, though: Your version of this program should read in **npcs.json** not **states.json**

You can then either insert this data in bulk, or insert it as a single document:

```
	nanoDb.insert(npcs, docName, function(err, body) {
		if (!err) {
			console.log(body);
		} else {
			console.log(err);
		}
	});
```

## Create DataMaster

I have created a program in **JsObjects** called **CouchView02**. Copy it to **Week05-DataMaster**. The program demonstrates all your options:

- Insert a single document
	- Retrieve the JSON for whole document
	- Retrieve the JSON for a view of the document
- Insert a bulk document
	- Use a view to retreive the JSON for an array of the all the bulk documents
	- Use handlebars to get a templated HTML file that formats the array of bulk documents

You can also retrieve an HTML view of the single document, or retrieve an array of all the fields of the bulk documents.

To help you understand better, I created a video: [http://youtu.be/Hy8XkmoEReU](http://youtu.be/Hy8XkmoEReU_)

Store the data in a database, and include at least two views which you will define in **routes/CouchDesignDocs.js**: one to retrieve the **npc_id**, **npc_name** and **value**. Another should retrieve the **npc_id**, **npc_name**, **question** and **answer**.

In other words, stop getting states data, start getting game data, and write the views for retrieving the game data. Don't delete the states views or **starts.json** as we might need them.

You might also want to modify the if statement at the top of **Control.js** that begins **if(result.ok)**. In particular, you can add another if statement for handling a proper display of the rows of data sent back from the server. It's the code in the Module Controller.

You program should include working menu items of links that allow you to:

- Create the database
- Delete the database
- Insert data into the database
- View:
	- All the NPC data
	- View each of the two views described above

**FOR LATER**: Use **handlebars** to create HTML *templates* that show the various views of your data. This is all in the GameListener or in Helper App.

## Turn it in

Push your program to GitHub/BitBucket and submit the assignment in Canvas.
