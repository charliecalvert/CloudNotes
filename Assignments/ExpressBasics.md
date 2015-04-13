# Express Basics

This assignment is designed to introduce you to [Express Js](http://expressjs.com/).

- Express Presentation: [http://bit.ly/JavaScriptNode](http://bit.ly/JavaScriptNode)

##Goals

 - Create an express application
 - Change the title that appears in **index.jade** and on the main page of the application at run time
 - Load jquery and a custom JavaScript page
 - Use jquery to display a line of text in an HTML paragraph tag
 - Switch from using **node** to using **nodemon**
 - Set the port to 30025

## Get Started

	npm install -g express-generator

To create an express application:

	express MyProject
	cd MyProject
	npm install

Load the project in WebStorm. Open up **/bin/www** and set the port 30025. Then open up **package.json** and ensure that you are using **nodemon** rather than **node** to *start* your project when you type **npm start**.

**NOTE**: *You will need to install **nodemon** if you have not done so already. To install, issue this command **npm install -g nodemon**.*

Now start the project:

	npm start

Load the project in a browser:

	http://localhost:30025

## Change the Title

Open up **/routes/index.js**. Change the title to **Prog272-LastName**, where LastName is your last name.

## Create Custom JavaScript

Create a file called **/public/javascripts/Control.js**. It should contain the following code:

```javascript
$(document).ready(function() {
    console.log("Control.js loaded");
    $("#dynamic").html("Control.js loaded");
});
```

**NOTE**: *It is often better to use **document ready** rather than **window.onload** because jQuery will call each instance of **document ready** that you create.*

## Modify your Jade Files

First load the JavaScript in **/views/layout.jade**:

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src='//code.jquery.com/jquery-1.11.2.min.js')
    script(src="/javascripts/Control.js")
  body
    block content
```

Also, in index.jade, be sure you have created a paragraph in which to display your custom text:

```
  p#dynamic
```

#Turn it in

Place your project files in a folder of your repository called **Week01-MyProject**. In the same folder of your repository, Include a screen shot of your project running in a browser. 


![shot](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGS0lFaUNiY3RjOUE)

When you turn in the the assignment, include the URL of your repository. It should look something like this:

	git@bitbucket.com:lastname/prog219_lastname.git
