---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Prog272Final2014.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: Prog272Final2014.md
relativePath: /Prog272Final2014.md
title: Prog272Final2014
directoryName: Assignments
category : assignments-guide
---

# Prog 272 Final 2014

This document defines the final for Prog 272. It is a work in progress. Please check back frequently.

## Config Files

This part should be completed already.

- Store the config files the database
- Provide a means to edit them in AwsBasicS3.

If you have extra time, think about strategies for performing the following task:

## StackEdit

Create thirty-five markdown documents, one for each of the first thirty-five of Shakespeare's poems. 

- Call the documents **Sonnet01.md**, **Sonnet02.md**, etc.
- Link the documents to both **Google Drive** and **Dropbox**.

Deliverables for this part of the assignment:

- A zip file containing all 35 markdown documents. 
- A screen shot of at least seven of the files in the Chrome Browser housed on the Dropbox web site.

Place both of the above in your **Google Drive** folder called **Finals**.

## AwsBasic

Publish your 35 markdown documents to S3. In your bucket you should create the following folder structure:

- my.bucket.com
    - Prog280Final
        - Sonnets01
        - Sonnets02
        - Sonnets03
        - Sonnets04
        - Sonnets05
        - Styles
        - Scripts
        - Images

The folder called **Sonnets01** should contains **Sonnet01.html**, **Sonnet02.html** and so on up to **Sonnet07.html**. The next folder, **Sonnets02**, should contains **Sonnet08.html**, **Sonnet09.html** and so on up to **Sonnet14.html**. The next folder should repeat pattern.

The folders called **Styles**, **Scripts**, and **Images** may contain the same files as in previous assignments, or similar files of your choice. The big difference here is that we need to use slightly different headers in our HTML files in order to find the **Styles**, **Scripts** and **Images** folders in their new location. These files are available in the **JsObjects/Utilities/Templates** directory. To access them, you need only change line 22 in **MarkdownTransform.py**. That line currently reads: 

    markdown.runner(files, ['StartLinux.html', 'NavLinux.html', 'footer.html', 'end.html']);
    
Change it to read:

    markdown.runner(files, ['StartBackOne.html', 'NavBackOne.html', 'footer.html', 'end.html']);
        
Notice that **StartLinux.html** has been changed to **StartBackOne.html**. The string **NavLinux.html** has been changed to **NavBackOne.html**.

This new arrangements of files is not hard to achieve. This is the way your **/var/www/bc** folder probably looks right now:

- /var/www/bc
    - index.html
    - Sonnet01.html
    - Sonnet02.html
    - Sonnet03.html
    - Sonnet04.html
    - Sonnet05.html
    - Styles
    - Scripts
    - Images

Just use the Linux file manager other tool change the structure so that it looks like this:

- /var/www/bc
    - Sonnets01
        - index.html
        - Sonnet01.html
        - Sonnet02.html
        - Sonnet03.html
        - Sonnet04.html
        - Sonnet05.html
    - Sonnects02
        - Sonnet01.html
        - Sonnet02.html
        - etc...
    - Styles
    - Scripts
    - Images

Deliverables:

- A screen shot showing your **/var/www/bc** folder, or whichever staging folder is most informative.
- Your **Options.json** and **MarkdownTransformConfig.json**
- A link to your folder or folders on S3
- A screen shot of AwsBasicS3 running in your browser.
- A screen shot of what it looks like at the command line when you copy to S3. In the browser, issue the command to copy to S3, then give me a screen shot of what the command line where you ran **node app.js** looks like. It should have a list of the files being copied up, or something similar.

## Import into MongoDb

Write code that will import each of the files from your 7 folders into MongoDb

Copy all the files your create in StackEdit and save to DropBox or Google Drive to the database.
The last step is still assuming scenario 1. Suppose your saving Poems. In StackEdit you have create created two folders: Shakespeare, Shelley. Your program copy any files found either of those folders to your database. Use one of our existing programs such as MongoTalk to display the files.

Each file in the database should have at least four fields besides the built in MongoDb ID:

- ItemName
- FolderName
- FileName
- Keywords (This is an array)
- Content (The poem itself)

## Convert to Markdown from HTML

    pandoc -t markdown -o FILENAME.md FileName.html
    
## Transform and Copy not Working

There is a challenge in this code that is a bit harder to solve than I wanted it to be. In AwsBasicS3,
in **app.js**, there is a **buildAll** route:

    app.get('/buildAll', function(request, response) { 'use strict';
    	console.log("buildAll called");	
    	var options = JSON.parse(request.query.options);
    	buildAll(response, options, request.query.index);
    });

This works fine with my current code. The call to buildAll launches my Python code:

    var command = config[index].pathToPython + " MarkdownTransform.py -i " + index;	
	try {
		exec(command, function callback(error, stdout, stderr) {

This is all very nice, but unfortunately **MarkdownTransform.py** directly reads in **MarkdownTransformConfig.json**. The job of your final, and of **CopyToS3Part02**, was to stop working with **MarkdownTransformConfig.json**, and to start working with code that reads and writes from the database. All that is good well, but if you are updating the database, as I asked, then you are probably not also updating **MarkdownTransformConfig.json**. This means that the **Transform and Copy** button on your updated copy of **AwsBasicS3** will no longer work out of the box.

I *could* argue that you need to see what is wrong, and fix the problem yourself. But that's going a bit too far. So I'll show you some code that should fix the problem:

    app.get('/buildAll', function(request, response) { 'use strict';
    	console.log("buildAll called");	
    	var options = request.query.options;
    	fs.writeFile("MarkdownTransformConfig.json", options, function(err, data) {
    		var options = JSON.parse(request.query.options);
    		buildAll(response, options, request.query.index);
    	});
    });

Here you can see that the **buildAll** route handler now creates a new **MarkdownTransformConfig.json** based on code sent to it from the client. Some of you will be able to take the code shown here and use it directly. Others, will find they have to think about what code they actually end up writing to **MarkdownTransformConfig.json**. That is, what code is in **request.query.options**. Do the best you can. I will focus more on whether your code updates the config files in the database, and copies the sonnets to folders. But getting this bit right would be very nice, and with the above code it should not be hard. Do not worry too much if your new copy of **MarkdownTransformConfig.json** looks exactly right. Just see if it works.


> Written with [StackEdit](https://stackedit.io/).