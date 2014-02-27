## Prog 280 Midterm 2014

This document describes the Prog 280 midterm. Please check it regularly
for updates.

## Create Markdown Documents

Create 5 markdown documents based on Shakespeare's sonnets:

	Sonnet 1

	From fairest creatures we desire increase,
	That thereby beauty's rose might never die,
	But as the riper should by time decease,
	His tender heir might bear his memory:
	But thou contracted to thine own bright eyes,
	Feed'st thy light's flame with self-substantial fuel,
	Making a famine where abundance lies,
	Thy self thy foe, to thy sweet self too cruel:
	Thou that art now the world's fresh ornament,
	And only herald to the gaudy spring,
	Within thine own bud buriest thy content,
	And tender churl mak'st waste in niggarding:
	Pity the world, or else this glutton be,
	To eat the world's due, by the grave and thee.

	Sonnet 2

	When forty winters shall besiege thy brow,
	And dig deep trenches in thy beauty's field,
	Thy youth's proud livery so gazed on now,
	Will be a tatter'd weed of small worth held:
	Then being asked, where all thy beauty lies,
	Where all the treasure of thy lusty days;
	To say, within thine own deep sunken eyes,
	Were an all-eating shame, and thriftless praise.
	How much more praise deserv'd thy beauty's use,
	If thou couldst answer 'This fair child of mine
	Shall sum my count, and make my old excuse,'
	Proving his beauty by succession thine!
	This were to be new made when thou art old,
	And see thy blood warm when thou feel'st it cold.

	Sonnet 3

	Look in thy glass and tell the face thou viewest
	Now is the time that face should form another;
	Whose fresh repair if now thou not renewest,
	Thou dost beguile the world, unbless some mother.
	For where is she so fair whose unear'd womb
	Disdains the tillage of thy husbandry?
	Or who is he so fond will be the tomb,
	Of his self-love to stop posterity?
	Thou art thy mother's glass and she in thee
	Calls back the lovely April of her prime;
	So thou through windows of thine age shalt see,
	Despite of wrinkles this thy golden time.
	But if thou live, remember'd not to be,
	Die single and thine image dies with thee.

	Sonnet 4

	Unthrifty loveliness, why dost thou spend
	Upon thy self thy beauty's legacy?
	Nature's bequest gives nothing, but doth lend,
	And being frank she lends to those are free:
	Then, beauteous niggard, why dost thou abuse
	The bounteous largess given thee to give?
	Profitless usurer, why dost thou use
	So great a sum of sums, yet canst not live?
	For having traffic with thy self alone,
	Thou of thy self thy sweet self dost deceive:
	Then how when nature calls thee to be gone,
	What acceptable audit canst thou leave?
	Thy unused beauty must be tombed with thee,
	Which, used, lives th' executor to be.

	Sonnet 5

	Those hours, that with gentle work did frame
	The lovely gaze where every eye doth dwell,
	Will play the tyrants to the very same
	And that unfair which fairly doth excel;
	For never-resting time leads summer on
	To hideous winter, and confounds him there;
	Sap checked with frost, and lusty leaves quite gone,
	Beauty o'er-snowed and bareness every where:
	Then were not summer's distillation left,
	A liquid prisoner pent in walls of glass,
	Beauty's effect with beauty were bereft,
	Nor it, nor no remembrance what it was:
	But flowers distill'd, though they with winter meet,
	Leese but their show; their substance still lives sweet.

Find the Google Drive folder you shared during the Online Presence 
assignment. 

- Create a new folder in it called **Poems**. 
- Save all five documents to that folder as **Sonnet01.md**, **Sonnet02.md** etc.
- Also save them also to your DropBox folder.

## Create a BuildAll Script

Configure the **BuildAll** script that I give you to convert all five
files to HTML and copy them out to your **/var/www/bc** folder. Include
or create a **/var/www/bc/index.html** that will allow you to click on
link and display each file: **Sonnet01.html**, **Sonnet02.html** etc.

The sample BuildAll script is found in:

	JsObjects/Python/Utils
	
It is run with Python 3.3:

	python3.3 BuildAll.py
	
You should also be able to run it like this:

	./BuildAll.py

## Display it on S3

Once you have everything working, copy the contents of your **index.html**
files and your five sonnets to S3.


## Turn It In

In your Google Drive folder, in a directory called Week07-Midterm, turn 
in screen shots of:

-  Your BuildAll script running in Linux. 
-  You editing your files in **StackEdit**. Be sure to show that 
your document is linked to both Google Drive and DropBox.

When you submit the document, include a link to your files running
on S3. 

Share a document in your existing Evernote **2014-Prog280-LastName**
folder that contains a link to your code running on S3. 

## Hints

Here is the syntax for links in markdown:

	- [DropBox](DropBox.html)
	- [MongoMark](MongoMark.html)
 
Remember to put it in a file called **index.md**.

Here is what my bucket on AWS looks like:

![View on AWS](../Images/AwsS301.png)

Notice that I have three HTML files. Yours will be called Sonnet01.html,
Sonnet02.html, etc. Notice also the three folders that I copied from 
our bc folder in the Linux box. Notice also the URL that I created for
my S3 box:

	bucket02.elvenware.com.

You should create one like that. Use all lower case.

## Bug Fix in BuildAll.py

I realized, rather belatedly, that there was a bug in the **start.html**
file from this directory:

  /JsObjects/Utilities/Templates

This meant that some of the CSS for our files in **/var/www/bc** did 
not resolve correctly. Your files would still show up, but they might
look a bit odd with an image missing, some of the text not in the right
place.

I have created two new files called **StartLinux.html** and 
**NavLinux.html** and put them in **Templates** folder. If you pull the 
latest from Git you will get them.

I also updated line 23 in **BuildAll.py** to make sure they get linked in:

	markdown.runner(files, ['StartLinux.html', 'NavLinux.html', 'footer.html', 'end.html']);

If you pull down the latest from **JsObjects** you will also get 
that change. If your HTML files does not look exactly right because 
of the broken CSS, I will understand, but if you can make this 
change all should be well with your code.

The only thing you need to do is pull down the latest from Git:

	cd /Git/JsObjects
	git pull

Then rerun the updated **BuildAll.py**. You want to make sure to 
preserve your list of files to transfer to the /var/www/bc directory:

	def prog280(markdown):
		files = ["DropBox", "MongoMark", "index"]; // Keep this list in sync with the files that you want to copy. ie (Sonnet01, Sonnet02, etc)
		makeItSo(markdown, "", files);

The mistake in my **start.html** file caused three lines to have 
the wrong path in them. They should read:

	<link rel="shortcut icon" href="Images/favicon.png">
	<script src="Scripts/elvenware.js" type="text/javascript"></script>
	<link href="Styles/BootstrapIndex.css" rel="stylesheet" type="text/css" />

If, instead, you see the word **charlie** in those bits of text from 
the top of your HTML file, then that is the bug, and you need to pull
the latest code and rerun **BuildAll.py**, being sure not to lose the
list of files that you want it to copy.
