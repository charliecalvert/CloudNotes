# EC2 Web User

Here are the basics you need to know manage a web site from the command prompt in Linux. This information can guide you through working with an EC2 instance.

The Deck: [http://bit.ly/LinuxWebUser](http://bit.ly/LinuxWebUser)

# Provision your Instance

At least once a week, update your EC2 instance:

	sudo apt-get update
	sudo apt-get upgrade

Install Git:
	
	sudo apt-get install git

Install Lamp:

	sudo apt-get install tasksel
	sudo tasksel install lamp-server

# Clone a repository on EC2

Put your repo's public key in BitBucket. This is like a previous exercise or two that we have done. But this time you have to put the public key you create into BitBucket.

Create a directory called Git:

	cd
	mkdir Git
	cd Git

Now clone your repository using this syntax:

	git clone <RepoUrl>

For instance:

	git clone git@github.com:charliecalvert/JsObjects.git

# Use nano

Nano is an editor available at the Linux command prompt. It is fairly easy to use, but you must understand two commands. Don't try to save a file Ctrl-S, instead, use Ctrl-O.

* **Save**: Ctrl-0 
* **Exit**: Ctrl-X

# Use Apache 
 
You can make sure it is installed by checking for the existence of the **/var/www** folder. If this folder does not exist, then Apache is probably not installed.

You put the pages you want to display on your web site in this directory:
	
	/var/www/html

For instance, the main page of your site will be:

 	/var/www/html/index.html

When Apache is installed, a file called index.html is created automatically. You might not want to delete this file, yet you don't want it to be the main page of your site. As a result you might rename it:

	mv index.html oldIndex.html

To test that things are working, create a simple HTML page like this one:

	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>My Page</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>

	<body>
		<h1>My Page</h1>

		<p>This is my page</p>
	</body>
	</html>

# Copy Folders

You will need to copy the folder containing your web pages from your Git folder to the /var/www/html directory.
 
	* Understand permissions
	* chown -R ubuntu:ubuntu /var/www/html

# Create a Web Page

On [this page][booty] we talked about how to assemble a bootstrap aware web page. Let's learn how to assemble that page automatically.

Method01: 

In your respository on **CodeAnywhere** or **Ec2**, do the following:

- Create a directory called CreatePage. You will do you work in this folder. So use the **cd** command to navigate into that folder. 
-  Take the top part of the [bootstrap html][booty] and save it to file called  **Start.html**. 
-  Take the bottom part and save it to **End.html**. 
-  Save the HTML you create in StackEdit to **Middle.html**. 
  
Now run the following command at the command prompt to concatenate them:

	cat Start.html Middle.html End.html >> Page01.html 

Don't forget that the page won't look right unless you also include **index.css** and **bootstrap.css** in the same folder as **Page01.html**.

If you navigate into the CreatePage folder, you should see a listing like this:

```
cabox@box-codeanywhere CreatePage]$ ls -la                                                                                                                                                                                                   
total 168                                                                                                                                                                                                                                     
drwxrwxr-x 2 cabox cabox   4096 Oct 29 02:20 .                                                                                                                                                                                                
drwxrwxr-x 4 cabox cabox   4096 Oct 29 02:20 ..                                                                                                                                                                                               
-rw-rw-r-- 1 cabox cabox    177 Oct 29 02:19 **End.html**                                                                                                                                                                                         
-rw-rw-r-- 1 cabox cabox   3627 Oct 29 02:19 **Middle.html**                                                                                                                                                                                      
-rw-rw-r-- 1 cabox cabox   5063 Oct 29 02:19 **Page01.html**                                                                                                                                                                                      
-rw-rw-r-- 1 cabox cabox   1259 Oct 29 02:19 **Start.html**                                                                                                                                                                                       
-rw-rw-r-- 1 cabox cabox 132546 Oct 29 02:19 **bootstrap.css**                                                                                                                                                                                    
-rw-rw-r-- 1 cabox cabox     95 Oct 29 02:19 **index.css**                                                                                                                                                                                            
```

NOTE: *You will probably want to call the Pages your create Page01.html, Page02.html and Page03.html. You might also call them after their subjects:

- Music.html
- Books.html
- Hobbies.html

Or what have you.



[booty]: http://elvenware.com/charlie/development/web/CssGuide/Bootstrap.html




