
### Primary goals for today:

-   Markdown
-   Filezilla
-   [DropBox](http://www.elvenware.com/charlie/development/cloud/DropBox.html)

-   Set up your account on Amazon Web Services (AWS)
-   Create your first virtual machine on AWS EC2

### Pandoc on Linux

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


	
### Secondary Goals

-   Learn more about Linux

-   Learn more about MediaWiki and Wordpress

### Reminder

-   There will be no class Wednesday, Jan 30.

-   Instead, there will be an online video and a regular weekly assignment

### Tutoring

-   If you are interested in tutoring on Saturday, Jan 26, I can come in if
    there is enough interest. Please respond to the announcement in the
    announcement section of this stie, or write me, or both, to let me know if
    you are interested. The session would be from 10 AM to 12 noon in N252.



WordPress

-   <http://www.elvenware.com/charlie/development/cloud/Wordpress.html>
-   <https://help.ubuntu.com/community/WordPress>

MediaWiki
---------

-   <http://www.elvenware.com/charlie/development/cloud/MediaWiki.html>
-   <https://help.ubuntu.com/community/MediaWiki>
-   <http://www.mediawiki.org/wiki/Manual:Running_MediaWiki_on_Ubuntu>

###Juju Install

- <https://juju.ubuntu.com/install/>

	sudo add-apt-repository ppa:juju/stable
	sudo apt-get update && sudo apt-get install juju-core
	juju generate-config
	
On AWS:

- Go to Security Credentials.
- export AWS_ACCESS_KEY_ID=[YOUR ACCESS KEY]
- export AWS_SECRET_ACCESS_KEY=[YOUR SECRET ACCESS KEY]

Then run **juju bootstrap** at the command line. If it works, it
just returns with no error messages and no success message. 

Now you can deploy something to your instance:

- juju deploy wordpress
- juju deploy mysql
- juju add-relation wordpress mysql
- juju expose wordpress
- juju status

Juju instances are very expensive. When you are done: 

- juju destroy-environment


### Links

-   The Amazon Web Services Deck: <http://bit.ly/Rzi2Da>

-   The Web Server Deck: <http://bit.ly/Q9A4Ne>

-   The Elvenware
    Page: <http://www.elvenware.com/charlie/development/cloud/WebServices.html#ec2>

-   Linux Basics Deck: <http://bit.ly/PDuWUB>

-   Internet Deck: <http://bit.ly/Xk4H5t>

-   MediaWiki
    Edit: <http://www.elvenware.com/charlie/development/cloud/MediaWiki.html#basicEditing>

-   WordPress
    Edit: <http://www.elvenware.com/charlie/development/cloud/Wordpress.html#edit>
    
    
    
