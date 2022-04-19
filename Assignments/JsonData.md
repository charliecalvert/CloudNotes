---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/JsonData.md
relativePath: Assignments/JsonData.md
title: JsonData
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: JsonData.md
fileNameHTML: JsonData.html
---


<!-- toc -->
<!-- tocstop -->

# JsonData

Here is the program to get running on EC2: [JsonData.zip](http://www.elvenware.com/charlie/downloads/JsonData.zip)

- Check it into CodeAnywhere
- Push to git Git
- Use secure shell to sign into EC2
- Pull from Git
- Copy it to /var/www/html
- See if it works by browsing to our page
 
 ## Useful Commands

Install unzip: 

	sudo apt-get install unzip

Go to your repository and pull the data: 
	
	git pull

Unzip the file:

	unzip JsonData.zip

After you unzip the data, but before you copy it to your /var/www/html folder, you should rename **JsonData/index/html** to **JsonData/JsonData.html**:

	mv JsonData/index.html JsonData/JsonData.html

You should still be in your git repository when you issue the command.

 Now navigate to the Apache page: 
	
	cd /var/www/html

Copy the **JsonData** files from your repository to your **/var/www/html** directory:

	cp -r ~/Git/prog270_calvert/JsonData/* .

Copy **JsonData.html** into **/var/www/html/**. Now use your browser to browse to YOUR_ELASTIC_IP/JsonData.html

## Turn it in

Push your unzipped files into your repository. You can just leave them in the JsonData folder where they were created. You can also remove the zip file if you want:

	git - rm JsonData.zip

As text or as a comment turn in the URL of you code running on EC2. Something like this:

	http://54.165.24.216/JsonData.html#/

Take a screen shot of your **/var/www/html** folder. Put it in your Git JsonData folder, and push it.

