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

![Port Forwarding](/charlie/development/cloud/images/PortForward01.png)

Click for [full size image](/charlie/development/cloud/images/PortForward01.png)


Online
------

###Assignment01

This week we will focus on two things:

- VirtualBox and Lubuntu
- Adding JavaScript animations to our bootstrap code

Here is code that you can use as a starting point:

- [Week06Animation.zip](https://bc.instructure.com/courses/834458/files/31015248/download?verifier=f80EZR8clAcE9KAa9rgE3eDKjZUWq0ZshHX94RhO)

Open up **index.html** and add in your HTML as you have done before. 
Also include two animated bitmaps driven by the included JavaScript 
code found in **index.js**. Do not use animated GIFs or any other 
technique to animate your page other than the one in the sample code.

Here are the bitmaps:

![Shapes01.png](../Images/Shapes01.png)

The second is very much like the first, but the colors are different:

![Shapes02.png](../Images/Shapes02.png)

When you look at these bitmaps, think of them as three rows of images.
The first and second rows each have four images. The program 
creates an animation by quickly flipping through the four images on
the top row, and the first image on the second row.

There are two key lines in **index.html**:

	<div id='drawHere01' class='draw-target'></div>
	<div id='drawHere02' class='draw-target'></div>

These are where the animations are drawn.

There are also four key lines in index.js:

	var target01 = $('#drawHere01');
	var target02 = $('#drawHere02');
	animate(target01, 'Shapes01.png', true);
	animate(target02, 'Shapes02.png', false);	

The first two lines define where the bitmap animations will be 
drawn. To understand how it works compare these two lines:

	<div id='drawHere01' class='draw-target'></div>
	var target01 = $('#drawHere01');

Notice that both lines of code reference **drawHere01**. The code 
helps us specify that the animation should be drawn in the DIV in 
**index.html** that has an ID of **drawHere01**.

Now look at the last two lines of code:

	animate(target01, 'Shapes01.png', true);
	animate(target02, 'Shapes02.png', false);
	
This code calls a custom method called **animate** that takes three
parameters. The first is the location in which to draw, as explained
above. The second is the bitmap that contains the image to draw. The
last states whether or not there are any more images that you want
to have animated. You could have more than just these two lines
if you wanted to see more than two animations. Just be sure that only
the last of these lines passes in **false** in the third parameter.

And finally there is one line in **index.html** that links 
in **index.js**:

	<script src="index.js"></script>

I have modified **server.js** to know how to server up JavaScript 
pages such as **index.js**. 

Right now you will find the animations only on the **index** page. 
You need to make the appear on both the **contacts** page and on the 
**about** page. This means you need to move the DIVs onto those 
pages, and you also need to link in the JavaScript file called 
**index.js** on those pages.

Here is a list of things to do:

- Make the animations appear on all three pages
- Add your own HTML from your markdown pages to index.html, about.html
and contacts.html. This should be some version of the HTML you have 
submitted for previous assignments. Typically, it will include at
least three links to bitmaps on **index.html**, and a link to your
avatar on the **about** and **contacts** page.
- Open up **Shapes01.png** and **Shapes02.png** and modify the first 
five images so your animations look different from the defaults. (Row 1, 
images 1 through 4, Row 2, Image 1.) A simple minimal modification 
would be to change the color of the gears. You can usually do that 
in a single click by using the fill tool, which typically looks like
a bucket. For instance, notice that the two images shown above use
different colors for the gears. You should, at minimum, change the 
colors to different shades than those included in the pre-packaged
solution.
- Check your code into your repository in a folder called 
**Week06-Animate**
- Include screenshots of your code running in both Cloud9 and 
in VirtualBox with Lubuntu

When taking your screenshot of Lubuntu, it is probably easiest to do 
it from Windows. Also, if you take the screenshot that way, I can 
clearly see that you are using VirtualBox. You may not want to focus 
the Lubuntu window while you take the screenshot as it will absorb 
the hot keys many of you use for triggering the screenshot 
(Alt-PrintScrn).

Submit the URL of your repository. The [starting code](https://bc.instructure.com/courses/834458/files/31015248/download?verifier=f80EZR8clAcE9KAa9rgE3eDKjZUWq0ZshHX94RhO)
is linked from the assignment in Cloud 9.

Remember to come back and check for updates to this assignment and 
look for additional assignments of hints.
