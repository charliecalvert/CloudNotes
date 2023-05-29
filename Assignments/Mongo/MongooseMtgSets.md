---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MongooseMtgSets.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: MongooseMtgSets.md
relativePath: /MongooseMtgSets.md
title: MongooseMtgSets
directoryName: Assignments
category : assignments-guide
---

## Description

Mongoose and MTG sets takes a slightly different tack than the two other applications we have seen in this serious. The other two apps can be described like this:

- **ParseMagic**: Read **AllSets.json** and use Mongoose to load the meta-data about each  set into a MongoDb collection called **magic-sets**.
- **WriteCards**: Read **AllSets.json** and use Mongoose to load the information about each card in a set into a collection. That program just loads the cards from one set called **LEA**.

The goal of this app is to:

- Read the data from **AllSets.json** and use Mongoose to load the each set and its accompanying cards into a single collection called **all-magic-sets**. The user can then retrieve each of the 178 sets from the collection with a single call. After retrieving one of the sets, the data returned from MongoDb will contain both the meta-data for the set and all the cards for that one set. 

Again, just to make clear what is happening:

- We read and parse **AllSets.json**
- We find the set and all its cards and place it as a single document in the **all-magic.sets** MongoDb collection.
- We then find the next set and push it and all its cards into a single document in **all-magic-sets**.
- By the time we are done, there will be 178 documents in **all-magic-sets**. Each document will contain, as a series of sub-documents, all the cards in that particular set. Sometimes there may be only a few cards, at other times there may be over a hundred. Regardless of how many cards are in the set, each set is treated as a single document with a series of sub-documents.

## Overview

The code:

- First ensures that the MongoDb **all-magic-sets** collection, if it exists, is empty
    - It is not an error to try to empty a collection that does not exist.
- Then it opens **AllSets.json**
- In **writeSetToFile** it writes each set to disk as a JSON file
- In **insertSet** it inserts each set into **all-magic-sets**.
    - The cards are shown as sub-documents of the set
- Then in **Search** it retrieves one set and displays one card.

Each call is made in the callback to the previous call

- The code to empty the set, when complete, kicks of the process of reading **AllSets.json**.
- The code that inserts the sets, after it has inserted **all** the sets, calls the code to **Search** for a set.

For instance, here is how the code to empty the collection, once it is finished, calls the code to insertData:

```javascript
MagicSet.remove({}, function(err) {
	if (err) throw(err);
	insertData()
});
```

Here is how the code to insert a set, when it has finished inserting all the sets, calls **Search**: 


```javascript
set.save(function(err) {
	console.log('saved: ', set.name);
	totalSetsSaved++;
	if (totalSetsSaved === setNames.length) {
		console.log(setNames.length);
		search();
	}
});
```

## Turn It In

Run the **ParseSets.js** file. Take the following screenshots:

- Your mongolab main database page before you insert **all-magic-sets**.
- Your mongolab main database page after you insert **all-magic-sets**.
- A view of the data from **all-magic-sets** on MongoLab. Show the default view of the collection when you view it on MongoLab.
- A screen shot of the command line on your system after you finish running this command:
    - **node ParseSets.js** 


## Thoughts

NOSQL databases are not for everyone. However, if one were to make an argument for NOSQL databases that did not involve big data and vast numbers of irregularly shaped documents, then the kind of data found in MTG would seem to be a good example of a task better suited to NOSQL database than to a SQL database. I find it easier to think of cards as sub-documents rather than as a table bound to another table through a foreign key. It's not that relational databases can't handle this kind of data, but only that there is an awful lot of machinery required to abstractly handle concepts that make obvious, concrete sense when placed in a NOSQL database.

NOSQL databases can handle rapid transactional requests with reasonable accuracy. However, it is arguable that in some cases the years of experience behind databases like MySQL or PostgreSql make them better choices for some databases that have to handle thousands of users simultaneously pounding on a database with multiple CRUD operations. The MTG, database, is not that kind of database. We need to insert the data once, and after that we simply query it. Why introduce a lot of machinery designed to ensure save transactions when they are not going to be any transactions? 

SQL databases are highly optimized. It is hard to believe, however, that any degree of optimization is going to make a SQL database that must perform a join between two tables called **sets** and **cards** faster than a NOSQL database that simply retrieves a single document from a btree file. Again, why introduce all the overhead and complexity of a SQL database in order to perform a relatively simple task like retrieve one of 178 documents from single file?

SQL databases are built around mathematical principles. They are faster, elegant, cleanly designed. But not everyone thinks in purely mathematical terms. For many people, it will always be easier to think about documents than about tables, sets and keys. It is not that one is better than the other, it is that they serve different tasks.

Summary:

- Clearly defined tables, lots of complex relations between the tables, lots of simultaneous transactions? Consider SQL databases
- Data more amorphous, simple relations between documents, few simultaneous transactions? Consider NOSQL.
- Stuffing millions of documents with varying structures into a database in a short period of time? Consider NOSQL.

       
