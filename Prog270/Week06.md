Week06
======

- [The Deck](http://bit.ly/1ci0rKP)
- [CloudNotes Index](../CloudNotes.html)

Suppose you have accidentally committed something to the repo that
you want to keep on your local drive, but remove from the repo. Do
this:

	git rm -r --cached folderName

[Remove from repo](http://stackoverflow.com/questions/1143796/git-remove-a-file-from-the-repository-without-deleting-it-from-the-local-filesy/1143800#1143800)

Virtual Box 
-----------

Links
-----

- [Elvenware Linux and VBox](http://www.elvenware.com/charlie/os/linux/VirtualBox.html)
- [Elvenware Virtualization](http://www.elvenware.com/charlie/development/cloud/virtualization.html)
- [Elvenware AndroidX86 and VBox](http://www.elvenware.com/charlie/development/android/Androidx86.shtml)
- [Install Latest NodeJS](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#node)
- [VBox HowTos](https://www.virtualbox.org/wiki/User_HOWTOS)

NodeJs
------

Here you will find the commands to install node on Linux:

- [Install Latest NodeJS](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#node)

SSH
---

	sudo apt-get install ssh

Port Forwarding
---------------

You can use it with Nat in VirtualBox. Read about it here:

- [Port Forwarding](http://www.elvenware.com/charlie/os/linux/VirtualBox.html#forward)

![Port Forwarding](../Images/PortForwarding01.png)

Online
------

###Assignment01

This assignment is not complete, but it should give you enough 
information to get you started. This week we will focus on two things:

- VirtualBox and Lubuntu
- Adding JavaScript animations to our bootstrap code

I will give you a program to get you started. Add in your HTML as
you have done before. Also include two animated bitmaps driven 
by the included JavaScript code found in index.js. Do not use 
animated GIFs or any other technique to animate your page other
than the one in the sample code.

There are two key lines in **index.html**:

	<div id='drawHere01' class='draw-target'></div>
	<div id='drawHere02' class='draw-target'></div>

These are where the animations are drawn.

There are also four key lines in index.js:

	var target01 = $('#drawHere01');
	var target02 = $('#drawHere02');
	animate(target01, 'Shapes01.png', true);
	animate(target02, 'Shapes02.png', false);	

And finally there is one line in index.html that links in index.js:

	<script src="index.js"></script>

Right now you will find the animations only on the index page. 
You need to make the appear on both the contacts page and on the
about page. This means you need to move the DIVs onto those pages,
and you also need to link in the JavaScript on those pages.

- Make the animations appear on all three pages
- Add your own HTML from your markdown pages to index.html, about.html
and contacts.html.
- Open up Shapes01.png and Shapes02.png and modify the first five images 
so your animations look different from the defaults. (Row 1, images
1 through 4, Row 2, Image 1.) A simple minimal modification would be to 
change the color of the gears.
- Check your code into your repository in a folder called Week06-Anim
- Include screenshots of your code running in both Cloud9 and 
in VirtualBox with Lubuntu

When taking your screenshot of Lubuntu, it is probably easiest to do 
it from Windows. Also, if you take the screenshot that way, I can 
clearly see that you are using VirtualBox. You may not want to focus 
the Lubuntu window while you take the screenshot as it will absorb 
the hot keys you use for triggering the screenshot (Alt-PrintScrn).

Submit the URL of your repository. The starting code is linked
from the assignment in Cloud 9.

Remember to come back and check for updates to this assignment and 
look for additional assignments.

