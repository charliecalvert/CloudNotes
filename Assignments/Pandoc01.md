---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Pandoc01.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: Pandoc01.md
relativePath: /Pandoc01.md
title: Pandoc01
directoryName: Assignments
category : assignments-guide
---

Pandoc Assignment 01
====================

I want you to install Pandoc on your Linux machine:

	sudo apt-get install pandoc

Then create a markdown file using StackEdit or some similar tool. 
Call it pandoc.md. Put the following content in it:


	Pandoc
	======

	The pandoc application runs on both Linux and Windows. You can find a link to John Macfarlane's pandoc site here:

	<!-- For our Prog28X or Prog27X class, you need to find the 
	appropriate URLs for the links shown below and fill them in. They 
	are	all top level links from the main page of John Macfarlane's 
	pandoc site. You should replace the text that <YOU FILL IN THE LINK> 
	with your own code. For instance (www.google.com) -->

	- [John Macfarane Pandoc](<YOU FILL IN THE LINK>)
	- [Getting Started](<YOU FILL IN THE LINK>)
	- [Try it Online](<YOU FILL IN THE LINK>)
	- [Users Guide](<YOU FILL IN THE LINK>)
	- [Examples](<YOU FILL IN THE LINK>)

	You can use this command to convert a **markdown** file to HTML5:

		pandoc -t html5 -o Pandoc.html Pandoc.md
		
	Here is an explanation of the code shown above:

	- The -t defines the type of file you want to create, which in this case is HTML5
	- The -o designates for the name of the output file you want to create, which in this case is **Pandoc.html**
	- Finally, you just pass in the name of the file you want to process, which in this case is **Pandoc.md**.

Save your file as Pandoc.md. Convert it to HTML5. Submit both your 
original **markdown** with the fixed up links, and the HTML5 that
you created.
