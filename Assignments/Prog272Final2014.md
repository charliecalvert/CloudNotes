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

> Written with [StackEdit](https://stackedit.io/).