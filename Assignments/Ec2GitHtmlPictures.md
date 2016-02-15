## Overview

The purpose of the **EC2 Git Html and Pictures** assignment is to give you practice:

- Using Git
- Creating Html files with Markdown
- Working with Bitmaps
- Working with the MakeHtml program
- Working with the Apache web server

## Step One

Create a directory called:

```
~/Documents/AllTest/Assignments
```

In it create a file called **GoogleDriveGitZip.md**.

Put the two bitmaps from your GoogleDriveGitZip assignment in the **/var/www/html/images** directory.

Write the markdown to display them in your **GoogleDriveGitZip.md** file, using a variant of the syntax shown in the **LampMarkdown** assignment:

- [LampMarkDown](http://www.ccalvert.net/books/CloudNotes/Assignments/LampMarkdown.html#step-four)
- [MarkdownBasics](http://www.ccalvert.net/books/CloudNotes/Assignments/MarkdownBasics.html#creating-pictures)
- [Ec2MarkdownToHtml](http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2MarkdownToHtml.html#bitmaps)

Add additional to your markdown that:

- Shows each image inside a level 2 header (two hashmarks: ##)
- Text explaining each of the images.

## Step Two

Complete the following steps:

- Find the two screen shots you created for the **GoogleDriveGitZip** project.
- Place them in your repository in a folder called **Week07-Ec2GitHtmlPictures**.

**NOTE**: *We don't usually put bitmaps in Git, but you can do so, and in this case, I would like you to do so. Git is good at keeping track of text files and the differences between versions of text files. It can keep track of various versions of a binary file such as a bitmap, but that is not its real purpose. As a result, I usually put bitmaps and zip files someplace else, such as Google Drive or AWS S3. This assignment is an exception to that rule.*

Make two copies of one of the pictures and make one of them work with our CSS **img class="twenty-five-percent"**.

Copy the updated code in **AllTest** directory to the existing **AllTest** folder in your repository, per the instructions in the **GitDualRepos** assignment:

- [Git Dual Repos](http://www.ccalvert.net/books/CloudNotes/Assignments/GitDualRepos.html#alltest)

Add, commit and push your work.

## Step Three

Complete the following steps:

- Use SSH to attach to your EC2 instance.
- Pull the work you did on Pristine Lubuntu
- Copy the code from your repository's **AllTest** folder to your **~/Documents/AllTest** folder.
- Run the MakeHtml


## Turn it in

Navigate to your new **GoogleDriveGitZip.html** page using your EC2 Elastic IP.

Take a screen shot and attach (upload) it to your assignment. Also submit the URL of your new page, where the URL contains your elastic IP. I need to be able to see the big and little (twenty-five percent) picture in your screen shot.

**NOTE**: *All this awkward language about 'containing an elastic IP' just means I want to be able to navigate to your page from my browser. I want your page to be on the world wide web, I want to see in my browser or phone the instance of your page that you are hosting on EC2. In short, the URL you submit might look at least something like this: http://52.xx.xx.xxx/Assignments/GoogleDriveGitZip.html.*

## The Nano Editor

Some helpful links:

- [Beginners Guide How to Geek](http://www.howtogeek.com/howto/42980/the-beginners-guide-to-nano-the-linux-command-line-text-editor/)
- [Just the Basics](http://mintaka.sdsu.edu/reu/nano.html)
- [Homepage](http://www.nano-editor.org/overview.php)
- [Manual](http://www.nano-editor.org/dist/v2.2/nano.html)

A video:

- [https://youtu.be/k3XdhVwzIlk](https://youtu.be/k3XdhVwzIlk)
