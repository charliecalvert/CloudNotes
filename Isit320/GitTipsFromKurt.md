---
creationLocalTime: 3/26/2022, 10:23:54 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Isit320/GitTipsFromKurt.md
relativePath: Isit320/GitTipsFromKurt.md
title: GitTipsFromKurt
queryPath: Isit320/
subject: Isit320
fileNameMarkdown: GitTipsFromKurt.md
fileNameHTML: GitTipsFromKurt.html
---


<!-- toc -->
<!-- tocstop -->

GitTips from Kurt
=================

Here are some hints from Kurt Friedrich on how to set up GIT. They
compliment the information on our [Elvenware Git Page](http://elvenware.com/charlie/development/cloud/Git.html)

SETTING IT UP
-------------
 
Go to github.com, create a repository, check the create readme file 
option so that there is a test file to pull down.
 
At github, click on the repository to use (such as the one you just 
created) , copy the https or git@ url  from lower right window.   
Should look https://github.com/username/ISIT320.git or 
git@github.com:username/ISIT320.git The former will require you to 
type in your user name and PW, the later won't if you set up the ssh 
keys correctly.
 
Using Windows File Explorer, go to a  SPECIFIC LOCAL  FOLDER which 
will hold the repository of files/folders to be sync'd with the 
cloud github respository (BUT this folder will not itself be part of 
the repository)
 
Type cmd in the upper address window to open a dos window at that folder. 
In the DOS window, do a clone using that URL

```
> git clone  https://github.com/username/ISIT320.git
```

This will create a new directory in the current folder, and 
initialize it as a local copy of the repository from the github one, 
so if you

```
> cd ISIT320
> dir
```

You will see you now have a copy of your readme.txt file in it. 
You will also see the file .git created, as the git clone command also 
does a git init on that local folder, so you do not have to.
 
PUSHING LOCAL FILES UP TO GITHUB
--------------------------------
 
Now you can add files and directories as you like, which will be under source control.
As you make changes to any files in and under this local ISIT320 directory, the local git program
tracks these changes.
 
At any point in the ISIT320 local directory, you can type

```
> git status
```

This will show which files you have changed, 
and you may want to "push" them back up to the cloud (github)
 
To sync these changed local files, for each file type

```
> git add filename 
```

and then

``` 
> git commit -m "any comment you want to be stored with this sycn"
> git push https://github.com/username/ISIT320.git --all
```

That is the windows version, not the ssh, so it will ask you to 
enter your username and PW.
 
PULLING FILES DOWN FROM GITHUB
-------------------------------
 
From a DOS window at the ISIT320 directory:

``` 
> git pull https://github.com/username/ISIT320
```
 
This will pull down any files you don't have, as well as newer 
versions if they exist up on github.
 
