---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Prog280Final2014.md
relativePath: Assignments/Prog280Final2014.md
title: Prog280Final2014
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: Prog280Final2014.md
fileNameHTML: Prog280Final2014.html
---


<!-- toc -->
<!-- tocstop -->

# Prog 280 Final 2014

This exam tests your understanding of the following technologies. It will perhaps try your patience at times, but I want to be sure that you have mastery of the following technologies:

- Google Drive
- One Drive (SkyDrive)
- DropBox
- EverNote
- StackEdit and Markdown
- AWS S3
- AwsBasicS3
- Apache (/var/www)
- Google Sites

This assignments assumes that you now feel completely comfortable with all the pieces of the [Online Presence](https://bc.instructure.com/courses/913550/assignments/3293030) assignment.

## Overview

Most of the exam will focus on the following:

- Create 7 folders in a particular media
- Place 5 Shakespeare sonnets in each folder

I am aware that in some cases this assignment will involve cutting and pasting the same text into multiple locations. I am also aware that there are certain shortcuts you can take to simplify the process. I don't care how you get the job, I just care that you get it done. 

The bottom line: I want students who complete this course to be able to use core cloud technologies such as Google Drive with such ease that their operation becomes second nature. 

## Google Drive 

Go to the Google Drive folder your shared with me during the **Online Presence** assignment.

- Create a folder called **Final**
- Inside the **Final** folder create seven folders called **Sonnets01**, **Sonnets02**, etc.
- Inside each of the **SonnetsXX** folders place seven sonnets in Google Document format, each in its own document. In the folder alled **Sonnets01** place sonnets 1-5, in **Sonnets02** place sonnets 6-10, etc. When you are done, there should be at least five sonnets in seven separate files in each of the **SonnetsXX** folders:

Example:

- Prog280-LastName
    - Final
        - Sonnets01
            - Sonnet01
            - Sonnet02
            - Sonnet03
            - Sonnet04
            - Sonnet05
        - Sonnets02
            - Sonnet06
            - Sonnet07
            - etc...

Look on the Elvenware for the sonnets.
                    
## One Drive

Note that SkyDrive has been replaced by One Drive. The service has not changed, but Microsoft changed the name for legal reasons. Find the folder you shared with during the **Online Presence** assignment. 

- Create a folder called **Final**
- Etc, as above, in the Google Drive portion of this assignemnt.

## EverNote 

Find the **2014-Prog280-LastName** folder you shared with me during the **Online Presence** assignment. 

- Go to the **2014-Prog280-LastName** folder you shared with me.
- Repeat but a bit differently than above. I want you to create 35 Sonnets, each in its own note. Tag the first five with **Sonnets01**, the second five with **Sonnets02**. So sonnects 1-5 would have the tag **Sonnets01**, and sonnets 6-10 would have the tag **Sonnets02**, etc. Each sonnet must be in its own note, you can't just place all thirty-five poems in a single file.

I know this is tedious, but I am determined that everyone who takes this class and gets a passing grade can demonstrate a full understanding of how to use these tools.

## StackEdit

Create thirty-five markdown documents, one for each of the first thirty-five of Shakespeare's poems. 

- Call the documents **Sonnet01.md**, **Sonnet02.md**, etc.
- Link the documents to both **Google Drive** and **Dropbox**.

You can save your markdown files into the same folder as your Google Drive documents, but give them an extension of **.md**. So you will have **Sonnet01** which is a Google Drive document, and then next to it, you could have **Sonnet01.md"" which is a markdown document.

Deliverables for this part of the assignment:

- A zip file containing all 35 markdown documents. 
- A screen shot of at least seven of the files in the Chrome Browser housed on the Dropbox web site.

Place both of the above in your **Google Drive** folder called **Finals**.

## Fixing the Images and Scripts Folders.

Open up **MarkdownTransform.py** and look for this line:

    markdown.runner(files, ['StartLinux.html', 'NavLinux.html', 'footer.html', 'end.html']);
    
And change it, so that it looks like this:

    markdown.runner(files, ['StartBackOne.html', 'NavBackOne.html', 'footer.html', 'end.html']);

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
    
## Google Sites

Place five sonnets, each on its own page, on your Google site. Provide a link to your Google Site. If you can make it easy for me to navigate to each of the five poems, that would be great.
    
    > Written with [StackEdit](https://stackedit.io/).