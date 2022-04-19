---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/FirebaseFinalPrep.md
relativePath: Assignments/FirebaseFinalPrep.md
title: FirebaseFinalPrep
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: FirebaseFinalPrep.md
fileNameHTML: FirebaseFinalPrep.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Firebase prep for final. The primary goal is to introduce the presidents database into the program.

![Firebase Presidents](https://s3.amazonaws.com/bucket01.elvenware.com/images/firebase-final-prep-presidents.png)

When working on this assignment, you should just update your existing firebase database application. There is no need to start a new firebase project unless you want to do so.

## Update

Make sure you have the latest firebase tools:

  npm install -g firebase-tools

After an install on Monday, Nov 28, 2016:

```bash
firebase --version
3.2.0
```

Make sure you have the latest elven-help.js. First run **git pull** on JsObjects, then look in the Firebase directory like this:

  ls $ELF_TEMPLATES/Firebase

You might want to meld it (merge) with your file so you can preserve the configuration data at the top of the file.

**MakeHtml** has also been updated. This is a minor change to get the latest versions of Bootstrap and Bootswatch. Go here, and run **renewMakeHtml**

```bash
cd ~/Git/JsObjects/JavaScript/NodeCode/MakeHtml
./renewMakeHtml
```

I added a new theme called **readable** and corrected a type, which called the **cosmo** theme **cosmos**. Check your config file, and if you are using the **cosmos** theme, switch it to **cosmo**. Here is a list of available themes:

```javascript
var bootswatchUrls = {
    'cerulean': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cerulean/bootstrap.min.css',
    'cosmo': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cosmo/bootstrap.min.css',
    'cyborg': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cyborg/bootstrap.min.css',
    'darkly': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/darkly/bootstrap.min.css',
    'flatly': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/flatly/bootstrap.min.css',
    'journal': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/journal/bootstrap.min.css',
    'lumen': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/lumen/bootstrap.min.css',
    'sandstone': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/sandstone/bootstrap.min.css',
    'slate': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/slate/bootstrap.min.css',
    'readable': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/readable/bootstrap.min.css',
    'spacelab': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/spacelab/bootstrap.min.css',
    'superhero': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/superhero/bootstrap.min.css',
    'united': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/united/bootstrap.min.css',
    'yeti': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/yeti/bootstrap.min.css'
};
```

You only care about the key values such as **cerulean**, **cosmo**, **cyborg** and so on. The URLs are inserted automatically if you specify the theme you want **ElvenConfig.json**.

## Listing Projects

List the projects you own:

```text
firebase list
┌────────────────────┬───────────────────────┬─────────────┐
│ Name               │ Project ID / Instance │ Permissions │
├────────────────────┼───────────────────────┼─────────────┤
│ elf-nov-16         │ elf-nov-16            │ Owner       │
├────────────────────┼───────────────────────┼─────────────┤
│ prog270-calvert-01 │ prog270-calvert-01    │ Owner       │
├────────────────────┼───────────────────────┼─────────────┤
│ elf03              │ elf03-587d6           │ Owner       │
├────────────────────┼───────────────────────┼─────────────┤
│ elf04              │ elf04-af895           │ Owner       │
├────────────────────┼───────────────────────┼─────────────┤
│ elf02 (current)    │ elf02-90eea           │ Owner       │
└────────────────────┴───────────────────────┴─────────────┘
```

Take a screenshot of the output from your list command, or just block copy it as I have above, and display it on the **start** page of your Firebase web app.

Remember, by default, you must be authenticated (signed into Google) before you can access the database.

- <https://firebase.google.com/docs/database/security/quickstart>

## President User Input

We want the user to be able to enter the name of a new president. When a button is pushed, the president's first and last names should be inserted into the database. Here are the controls that allow the user to enter in the name of a president:

```html
<div class="majorBlock">
  <div>
    <label for="elfFirstName">First Name</label>
    <input type="text" id="elfFirstName" name="elfFirstFirst">
  </div>
  <div>
    <label for="elfLastName">Last Name</label>
    <input type="text" id="elfLastName" name="elfLastName">
  </div>
</div>
```

Or if you like, use the bootstrap panel, and you can avoid the **majorBlock** css issue:

```html
<div class="panel panel-default">
  <div class="panel-heading">Database Input</div>
  <div class="panel-body">
      <div>
        <label for="elfFirstName">First Name</label>
        <input type="text" id="elfFirstName" name="elfFirstFirst">
      </div>
      <div>
        <label for="elfLastName">Last Name</label>
        <input type="text" id="elfLastName" name="elfLastName">
      </div>    
  </div>
</div>
```

## css

Add this CSS to the bottom of **css/style.css**

```css
div .majorBlock {
    border: solid black thin;
    background-color: #FFFFFC;
    border-radius: 8px;
    margin: 5px;
    padding: 5px;
}
```

## President Buttons

Each button defined in this section is automatically paired with a method in **elven-help.js**.  When the user clicks a button, it should initiate the action described in the button's caption. For instance, if you enter in the first and last names for a president in the appropriate controls, then push the **Insert New President** button, a new president should be added to the database. For now, the new president will not be visible on the screen in the president's list until you press the **Get Presidents** button.

Here is the code to define the input controls where you can enter a first and last name for a president.

```html
<button id="elfPushPresident" class="btn btn-success">Insert New President</button>
<button id="elfGetPresidents" class="btn btn-success">Get Presidents</button>
```

And then under the buttons, you need a place to display the presidents:

```html
<ul id="presidentsList"></ul>
```

Here are two more buttons. The first button will insert the data from JSON into the **presidents** database. This can be a quick way to import a known set of data, which is much faster than asking the user to enter the data over and over. For now, the Update President record doesn't do anything very interesting.

```html
<button id="elfInsertFromFile" class="btn btn-danger">Insert from File</button>
<button id="elfUpdatePresident" class="btn btn-default">Update President</button>
```

Here is an example of the file that contains data that can be loaded from the **public** directory:

```json
[{
	"first": "George",
	"last": "Washington"
}, {
	"first": "John",
	"last": "Adams"
}, {
	"first": "Thomas",
	"last": "Jefferson"
}]
```

Call the file **users.json**.

Here are the buttons that allow you to have "chat" program, of sorts, between browser sessions. We worked with these earlier. The only change is that the **Get All Qux Data** button should now retrieve the entire history of the conversation. You can use it to refresh the conversation at any time.

```html
<button id="elfInput" class="btn btn-success">Post Input</button>
<button id="elfDatabaseGetAllQux" class="btn btn-success">Get All Qux Data</button>
```

## User Data

Here is a button for retrieving user data:

```html
<button id="elfGetCurrentUser" class="btn btn-success">Get User Data</button>
```

## Turn it in

Submit the URL for your deployed firebase application.
