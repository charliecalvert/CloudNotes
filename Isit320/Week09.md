Week09
======

Long Builds in Aptana
---------------------

If you are experiencing long Builds in Aptana, try right clicking on
**node-modules** in the Project window and choosing:

	Build | Exclude from Build

The Project we Built in Class
-----------------------------

- [Can be found here](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/AngularModularKarma)

Working with Bitmaps
--------------------

Animate changes to a sprite when it's state changes.

Project
-------

Add the following to the HTML Ruble project. If you need help
remembering how to access this project, see Week04 Assignment 
One. 

- [Week04](Week04.html)

In **templates | project_templates.rb** add all of the following,
or the last two of the following if you already have the first
one installed. Remember to restart Aptance **File | Restart**.

```
project_template "Elvenware Angular Unit Test Project " do |t|
  t.type = :web
  t.tags = ['Web']
  t.icon = "templates/HTML5_Logo_64.png"
  t.id = "com.elvenware.project.template.web.html5"
  t.location = "git://github.com/charliecalvert/AngularTest.git"
  t.description = "CSC Remote template. Requires network access."
  t.replace_parameters = false
  t.tags = ['Web']  
end

project_template "Elvenware Angular Jasmine Karma Project " do |t|
  t.type = :web
  t.tags = ['Web']
  t.icon = "templates/HTML5_Logo_64.png"
  t.id = "com.elvenware.project.template.web.html5"
  t.location = "git://github.com/charliecalvert/AngularKarma.git"
  t.description = "CSC Remote template. Requires network access."
  t.replace_parameters = false
  t.tags = ['Web']  
end

project_template "Elvenware Angular Mongo Bootstrap Project " do |t|
  t.type = :web
  t.tags = ['Web']
  t.icon = "templates/HTML5_Logo_64.png"
  t.id = "com.elvenware.project.template.web.html5"
  t.location = "git://github.com/charliecalvert/AngularMongoBootstrapTest.git"
  t.description = "CSC Remote template. Requires network access."
  t.replace_parameters = false
  t.tags = ['Web']  
end
```

After you have restarted Aptana, you can use this Project templates
to create new projects. When using these projects:

To get started, run **npm install** in the root directory for this
project:

	npm install

Next, start Karma by typing **karma start**:

	karma start

Since this project was pulled from GitHub, it includes a .git folder. You should
consider removing this folder if you do not want to use git, or if this folder
is embedded inside another git repository.

Periodically, you should go to the command line in the root directory
for this folder and run **grunt jshint**.

	grunt jshint
	
You should then examine the **result.xml** file to look for any problems
in your code.

Also, read the **README.md** files for these projects.

- [Basic Karma](https://github.com/charliecalvert/AngularKarma/blob/master/README.md)
- [Mongo](https://github.com/charliecalvert/AngularMongoBootstrapTest/blob/master/README.md)

Karma
-----

If you have karma running in one command window, you can run a test in another 
command window that will return immediately  by typing:

	karma run

Working Examples:

- [CreateCharacters02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/CharacterCreate02)
- [Crafty06](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/Crafty06)
- [Crafty03](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/Crafty03)

Working with Mongo Data
-----------------------

We need to understand updating and deleting records in the database.

A general review of mongo DB.

Look at PeopleManager in CreateCharactor02

- Mongo is in factory
- People Manager is a factory
- Can be consumed by Controller or Jasmine Test

pkozlowski-opensource on github.

Mocking Objects with $httpBackend
---------------

Read the README.md file for JsonFromServer:

- [JsonFromServer on GitHub](https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/JsonFromServer/README.md)

The example demonstrates how to proceed.

Mocking Mongo Data:

- [MongoLab01](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoLab01)
- [MongoLab02](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoLab02)
- [MongoLab03](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoLab03)
- [CreateCharacters02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/CharacterCreate02)

See TestMongoTower.js.

NPM
---

Make sure all your global copies of NPM packages are at the latest
version:

	npm update -g 


