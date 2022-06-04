---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week04-InClass01.md
relativePath: Prog282/Week04-InClass01.md
title: Week04-InClass01
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week04-InClass01.md
fileNameHTML: Week04-InClass01.html
---


<!-- toc -->
<!-- tocstop -->

Week03-InClass02
----------------

Create a project called **Week03-InClass02** in your Prog282 
repository. The project should simulate the rolling of three 6-sided 
dice. When the user clicks a button the dice should roll. Show the 
value of each of the three dice and the total value of the three 
dice added together.

For instance, if the roll of the first die yields a 2, the second a 
3, and the third a 4, then the output should look like this:

```
	2, 3, 4
	9
```

Your program should have at least one custom HTML file and one custom
JavaScript file. It should link in jQuery and use jQuery to 
display the results in two HTML paragraph elements.

Here is JavaScript code that simulates the rolling of one 6 sided die:

	var randomNumber = Math.floor(Math.random() * 6) + 1;
	
Your JavaScript file should include a document ready method and the
rolling of the dice should be simulated within the methods of
the JavaScript module pattern.

Turn it In
----------

When you are done push your project to BitBucket and submit the link 
to your repository.

References
------------

- <http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#documentReady>
- <http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#jquery-button-and-paragraph-demo>
- <http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html>
- <http://elvenware.com/charlie/development/cloud/Git.html>
	
