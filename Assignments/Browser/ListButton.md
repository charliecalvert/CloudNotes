## Overview

Create four HTML elements:

- An Input Element that allows the user to enter text.
- A button with an id of **set-text** and content that reads **Set Text**.
- A UL element
- A button with an id of **add-to-list**, and content that reads **Add to List**.

Link a JavaScript file into an HTML page. In the JavaScript page you will add code that:

- Locates elements you place on your page.
- Responds to clicks on the **set-text** button by inserting text into the **input** control.
- Responds to clicks on the **add-to-list** button by adding text from the input control to the UL.

You will also learn how to use a very small JavaScript library.

## Get Started

Create directory called **ListButton** in your repository.

Create **index.js** in the **ListButton** directory.

In **index.js** use the Emmet **! + tab** command to create the basic HTML.

You may need to format the generated HTML. To do so, press these keys: **Ctrl + Shift + P**. Then type **Format Code**. [Reference][fc]

## Add Input Control

Create an HTML **input** control. At runtime, in the browser, the user who is viewing the webpage can type text into this HTML control. To create it, try all three of these Emmet commands so you can understand what they do:

- Emmet: input:text
- Emmet: input:text#list-data
- Emmet: input:text#list-data[name=list-data]

Be sure your controls sets both the **name** and the **id** attributes to **list-data**:

```html
name="list-data" id="list-data"
```

Watch the Video:

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/Yg5JSZ2pGKU?ecver=2" width="640" height="360" frameborder="0" allow="autoplay; encrypted-media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Create the set-text Button

Create a button that has an id of **set-text** and a **type** of **button**.

- Emmet: button#set-text[type=button]

## Create a JavaScript File

Create a file called **index.js**.

Put this content in it:

```javascript
window.onload = () => {
}
```

The code begins with the **window.onload** event. We do this to ensure our code is called only after our page is fully loaded into the browser. Don't worry if this doesn't quite make sense yet. Just be sure you begin with this code:

Now add code that locates our input control and button:

```javascript
window.onload = () => {
  const userInput = document.getElementById('list-data');    
  const setTextButton = document.getElementById('set-text');
}
```

Finally, define what happens when the button is clicked:

```javascript
window.onload = () => {
    const userInput = document.getElementById('list-data');    
    const setTextButton = document.getElementById('set-text');

    setTextButton.onclick = () => {
       userInput.value = 'The first item for my list';
    }
}
```

## Link the JavaScript into our HTML File

Finally, let's link the code into our HTML. At the end of the **head** element in **index.html** add this code:

```html
<script src="index.js"></script>
```

Like this:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Learn about JavaScript</title>
    <script src="index.js"></script>
</head>
```

Now load you page in the browser (Ctrl + O) and see if it works. When you click on the button the text "The first item for my list" should appear in the input control.

## Add Library

Here is a very short library. You do not need to understand the code in it. When we use a library, often the whole point is that we don't need to understand how it works. We simply use the library and gain benefit from it. But we don't need to understand it to use it anymore than we need to understand how to build a jet plane in order to take a flight to Hawaii. It is a service we use.

Here is the library, which you should save as **elf-code.js**:

```javascript
const elfCode = {
    appendToList: (list, value) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(value));
        list.appendChild(li);
    }
}
```

This code will allow us to dynamically add a list item (li) to an unordered list (ul) when a button is selected.

After saving the code, you should add a second **script** tag to the **head** element in your HTML file. The **script** element should load **elf-code.js** and should be place just above the script element that loads **index.js**. The two script elements will be identical in every way except for the value of their **src** attributes.

## A Second Button and a UL Element

Add a second button with an **id** set to **add-to-list**. It's content (label) should be **Add to list**:

- button#add-to-list[type=button]

Beneath it add an empty UL element with the **id** set to **my-list**. When the **add-to-list** button is selected, the text from the **input** control will be added to the list.

## Clicks on Add to List Button

Here is the code for adding the text from the **input** control to the list. First we get a handle to the button:

```javascript
const listButton = document.getElementById('add-to-list');    
```

Put this code at the top of the onload method, just next to the code for getting the **setTextButton**, **userInput** and **listButton**:

```javascript
const setTextButton = document.getElementById('set-text');
const userInput = document.getElementById('list-data');
const listButton = document.getElementById('add-to-list');
```

At the bottom of the **onload** method, add code for responding to clicks on the button:

```javascript
listButton.onclick = () => {
    const myList = document.getElementById('my-list');
    elfCode.appendToList(myList, userInput.value);
}
```

Our **onload** method now has three parts to it. Each part has its own task:

- Part One: Use **getElementById** to retrieve the three controls we are using.
- Part Two: Handle clicks on the **setTextButton**
- Part Three: Handle clicks on the **listButton**

Like this:

```javascript
window.onload = () => {
    // Part I here
    // Part II here
    // Part III here
}
```

That's not the code I want you to write, but it shows the structure of the method. Put the code for retrieving the the **setTextButton**, **userInput** and **listButton** in Part I. Put the code for the **setTextButton.onclick** method in Part II. Put the code of the **listButton.onclick** method in Part III.

The code that begins with two forward slashes is a comment. The JavaScript runtime will ignore comments. As a result, you can leave them in place if you like, and paste in the appropriate code beneath each comment:

```javascript
// Part I here
const setTextButton = document.getElementById('set-text');
etc...
```

## Turn it In

Test your code and make sure it works. Do the best you can, and then push your code to GitHub. When you turn in the assignment, paste in the URL of your repository and the name of the folder that holds your code.

- Folder: ListButton
- Repository: git@github.com:username/username.github.io

You should, of course, paste in the URL for your repository, not the example URL shown above.

Watch the video:

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/YfqBixQtQ2E?ecver=2" width="640" height="360" frameborder="0" allow="autoplay; encrypted-media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

[fc]: https://stackoverflow.com/a/29973358/253576
