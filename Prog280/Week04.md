---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog280/Week04.md
relativePath: Prog280/Week04.md
title: Week04
queryPath: Prog280/
subject: Prog280
fileNameMarkdown: Week04.md
fileNameHTML: Week04.html
---


<!-- toc -->
<!-- tocstop -->


Primary goals for today:
-----------------------

-   Use markdown to create HTML files
-   Use StackEdit to create markdown.
-   Sync StackEdit with Google Drive and with DropBox
-   Install DropBox and Pandoc on Linux EC2 and Lubuntu.
-   Use Filezilla to transfer files
-   Set up Putty correctly with GIT_SSH environment variable

Elvenware Links
-----

-   [Install DropBox on Linux](http://www.elvenware.com/charlie/development/cloud/DropBox.html)
-   [Filezilla](http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#filezilla)

Other Links
-----------

-   [StackEdit](https://stackedit.io/)
-   [PanDoc](http://johnmacfarlane.net/pandoc/)
-   [Filezilla Client](https://filezilla-project.org/)

Pandoc on Linux
---------------

	sudo apt-get install pandoc
	
Now convert from Markdown to HTML 5:

	pandoc -t html5 -o MyFile.html MyFile.md
	
This command converts **MyFile.md** to HTML and saves it in a file
called **MyFile.html**. 

The **-t** parameter allows you to specify the type of file you want to
save, which in this case is HTML 5. The **-o** parameters allows to 
specify the **outfile**, that is, the name you want to give to the output
of the program. In this case the output is an HTML file which we have
decided to call **MyFile.html**.

Here is another example:

	pandoc -t html5 -o ~/MyFile.html MyFile.md

This takes a file called **MyFile.md** that is in the current directory,
converts it to HTML and saves in the user's home directory as **MyFile.html**

Using Putty and Git
-------------------

If you are using SSH with Git, you want to make sure that Git can
find the Putty program called **plink**. To do that, be sure that
the environment variables GIT_SSH is set to 

	C:\Program Files (x86)\PuTTY\plink.exe

[More details are here](http://www.elvenware.com/charlie/development/cloud/Git.html#running-git)

From the command line, that would look like:

	SetX GIT_SSH C:\Program Files (x86)\PuTTY\plink.exe

There is an updated **SanityCheck.bat** file that includes a check
for **GIT_SSH**.

### Links

-   The Amazon Web Services Deck: <http://bit.ly/Rzi2Da>
-   The Web Server Deck: <http://bit.ly/Q9A4Ne>
-   [The Elvenware WebServices Page](http://www.elvenware.com/charlie/development/cloud/WebServices.html#ec2)
-   Linux Basics Deck: <http://bit.ly/PDuWUB>
-   Internet Deck: <http://bit.ly/Xk4H5t>
    
    
    
