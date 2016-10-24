## Overview

Create a program called **DataMaster** that will begin to work with the data we will use in the game.

## Create the Data

We will bring this portion of the game completely to fruition in a later assignment. For now you don't have to actually insert or update the data you store in CouchDb from the **DataMaster** UI. You may create it by hand, building a JSON file in a text editor. Then insert the file into the database, and view it in your app. Use Angular to handle the insert and view. This is very similar to what we were doing in class on Monday, Dec 1.ll leave integrating the code into the Listener for next quarter.

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
