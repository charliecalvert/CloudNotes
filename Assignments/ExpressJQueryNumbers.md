---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ExpressJQueryNumbers.md
relativePath: Assignments/ExpressJQueryNumbers.md
title: ExpressJQueryNumbers
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: ExpressJQueryNumbers.md
fileNameHTML: ExpressJQueryNumbers.html
---


<!-- toc -->
<!-- tocstop -->

# Express jQuery Numbers

The goal of this assignment is to practice the skills you learned in the Express jQuery Assignment.

## Step One 

The following steps closely parallel the code in **ExpressjQuery**:

- Create an express project called **Week02-ExpressjQueryNumbers**. 
- Use [bower](http://bower.io/ "Bower") to provide support for jQuery. 
- Create a file called **Control.js** and put it in the **public/javascripts** folder.
- Add a jQuery **document** **ready** method and an object called **MyObject** that follows the modular pattern. This time omit the public method named **readyCalled**
- Modify **layout.jade** as necessary. Be sure to load jQuery before you load **Control.js**.


```
var MyObject = (function() {

    function MyObject() {
    }
    
    return MyObject;
}());
``` 

Test you work, making sure you can see that both **Control.js** and **jquery.js** in the network page of the Chrome Developer tools. Recall that you press F12 to bring up the developer tools, and that they are delivered in a series of pages with names like **Elements**, **Network**, **Sources**, etc... 

## Step Two

Create a JavaScript object called **kipling** with four properties:

- Artist: Rudyard Kipling
- Poem: If
- FirstLine: If you can keep your head when all about you are losing theirs and blaming it on you
- Url: http://www.poetryfoundation.org/poem/175772

Just arrange these lines a simple JavaScript object like the Marie object in the previous assignment. Make sure your JavaScript is also valid JSON by checking it on [jsonlint.com](http://jsonlint.com/).


## Step Three

Create a **button** with an id of **getKipling**.  The caption for the button should read "Get Kipling". Create an unordered list (ul) with the id **myList**. When the user clicks the button use a loop, similar to the one in **ExpressjQuery**, to display the properties of the **kipling** object.

## Step Four

Add another button with the id **getNumbers** and the caption **Get Numbers**. Write a loop that displays, in **myList** the squares of the numbers between 5 and 15. Include the squares of both 5 and 15 in your answer. So one might start with 25, etc....

## Step Five

Here is a how to clear items from a list:

    $('#someId').empty();

Reference:

- [StackOverflow](http://stackoverflow.com/a/7004081/253576)
- [Official Docs](https://api.jquery.com/empty/)

Add a button to your project:

- id: clearList
- caption: Clear List

When the user clicks the button, the list should be cleared.

## Turn it in

Check your project into your repository. When you make the submission remind me of the URL of your repository and specify the folder in your repository where the project resides. 

When I open the folder that contains your project, I should see the code for your project, not another folder that contains the code. 

Good: 

    .../Git/prog219-lastname/Week02-ExpressjQueryNumbers/package.json

Not so good:

    .../Git/prog219-lastname/Week02-ExpressjQueryNumbers/MyProject/package.json

##Optional

If you want more:

- Use the modulus operator to display only the squares of odd numbers. 
- Have **myList** first be cleared of content when the user clicks the **getKipling** and **getNumbers** buttons. Then add the relevant content. That way you don't ever see two copies of the kipling information, or the kipling information and the numeric information at the same time. The clear list button would then be less useful, but would still work. The best solution would not involve writing the **empty()** method three times. Instead, put that call in a method called something **clearMyList**, and call it as needed.  The point here is that we should not have redundant code. DRY: Don't repeat yourself.