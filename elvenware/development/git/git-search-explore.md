---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-search-explore.md
relativePath: elvenware/development/git/git-search-explore.md
title: Git-search-explore
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: git-search-explore.md
fileNameHTML: git-search-explore.html
image: ./course/course-javascript.jpg
subject: git
queryPath: elvenware/development/git/
---

<!-- toc -->
<!-- tocstop -->

# Search and Explore

Finding your files in your repository.

## Git Help Command

To learn about a git command, type **git help <COMMAND>**. For instance:

```
git help status
git help commit
git help add
```

In some cases the results will be displayed at the command line. In others, you will be taken to a web page.


## The Git Status Command

Suppose you have a file called **users.html** that you have edited. Here is how to confirm that you have edited the file, and to see if there are other files you may have edited, added, or deleted from or to the repository:

	git status

I issue the **git status** command frequently. It lets me know the state of my repository. Here for instance, is what you will see if you issue the **git status** command after first creating **users.html**:

```
echo foo > users.html
git status
# On branch master
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       users.html
nothing added to commit but untracked files present (use "git add" to track)
```

When we typed **git status**, Git replied by telling us the status of the files in your directory. In particular, Git is telling us that we have a new file in our repository called **users.html**. When Git sees a new file or directory in a repository, then the status message is usually "Untracked files." This is Git's way of saying "I see this new file or directory in your repository, and I'm not currently tracking it." Then it adds a hint: "(use "git add <file>..." to include in what will be committed)." It is telling you that you can use the command **git add users.html** to start tracking the folder that is currently not being tracked. There are several variants on the **git add** command that you can run. For instance, typing **git add .** (that's **git** plus **add** plus a period) will usually add any untracked or modified files to the repository without you having to spell them out.

## Git Log

You can just type **git log**, but I find **git log --pretty=oneline** more useful. For instance:

```
git log --pretty=oneline
7ff2d4b4d3dcea2d938a2a7e0ed42e1000cb32a2 Readme has Elvenware patterns document
e16107b10dce32d7abba9f973549222e5db7adf0 Clean up names for code readability
8739b8e3deee016ad5025f6764ef36ab571ff71c Add functional Programming examples
```

Now clone a particular commit:

	git branch functional 8739b8e3d

With that one command you have created a Git branch named "functional" and have told Git that the **functional** branch should be set to the state of your repository when you did that commit. Now you can switch to the **functional** branch and see your files at the time of that commit:

	git checkout functional

If you are tired of looking at that branch, you can switch back to the master branch and then permanently remove your **functional** branch:

	git checkout master
	git branch -d functional

## Show History of a File {#git-show}

First type **git log <MyFile>** to see the times when you modified a file.
For instance, this shows the history of **.gitignore** in a repository:

```
$ git log --oneline .gitignore
83925f1 updated .gitignore from a same-name file
08e7f2b Adding Object Basics and SplitSlice
bd54f9f adding gitignore
```

Now show the contents of a particular version of the file with **git show**:

```
$ git show 08e7f2:.gitignore
node_modules
.metadata
.idea
Thumbs.db
.c9
```

What we have done is type:

- git: Invoke Git
- show: Invoke the show command
- 08e7f2: Reference a particular commit by giving enough of its ID to
uniquely identify it. Six characters is usually enough, sometimes less.
- :.gitignore: Then type a colon and the file name.

Another example, this time using the README file:

```
$ git log --oneline README.md
01f3de2 Bar
2b593a3 asdf
f182b3c readme changed
ce4e0f2 README update
66f33ac initial Commit
```

Then view a particular version:

```
$ git show f182b3c:README.md
My Readme File
This is an update
New change after support for ssh
```

## Repository Name

You can see the URL and name for your repository with any of the following commands:

```
cat .git/config   // From the root of your repo
git config --get remote.origin.url
git remote show origin
```

For instance, here is a way to use the **git config** command:

```
$ git config --get remote.origin.url
git@github.com:charliecalvert/JsObjects.git
```

And here is how to **show** the **remote origin**:

```
$ git remote show origin
* remote origin
  Fetch URL: git@github.com:charliecalvert/JsObjects.git
  Push  URL: git@github.com:charliecalvert/JsObjects.git
  HEAD branch: master
  Remote branches:
    MakeHtmlConvert tracked
    master          tracked
  Local branches configured for 'git pull':
    MakeHtmlConvert merges with remote MakeHtmlConvert
    master          merges with remote master
  Local refs configured for 'git push':
    MakeHtmlConvert pushes to MakeHtmlConvert (up to date)
    master          pushes to master          (up to date)
```

## Find Old Version of Code {#oldversion}

The subject of checking out a specific branch is so important, that it might be worth discussing in more depth. When you do good work, check it in. Then later, if you find that you wish you could go back to the working version of your code, there are several things you can do. Here is one.

One way to get access to the older version of your code is to check it out in a branch. To do this, you need to know the commit number of the good code. Often the best way to find this number is to browse on GitHub or Bitbucket. But you can also find the commit number with the **git log** command:

    git log

Or

    git log <FileName>

Sample output:

```
>git log Control.js
commit bbe914c7347c51237b21a4b9a68be29fac3fccf4
Author: Charlie CedarIsle Calvert <charlie@elvenware.com>
Date:   Tue May 26 22:07:44 2015 -0700

    Week08 Initial checkin

commit 16763f8a3327b074d56f7cb563900ae2d34729a6
Author: Charlie CedarIsle Calvert <charlie@elvenware.com>
Date:   Mon May 25 16:20:49 2015 -0700

    Midterm updated getScientists method with support for Jade files
```

When reading the results of this log, you will begin to understand why it is so important to type in something useful when you commit your code. A useful comment can help you find a particular older version of your code.

 Now create the branch based on the commit you did after we worked together. Here I call **git branch** and give a name for the branch and the full commit number as seen above in the log statement:

    git branch initial bbe914c7347c51237b21a4b9a68be29fac3fccf4

Now checkout the branch:

    git checkout initial

Now you have a copy of the code from the past that you wanted to see. You might save the portions you need into another directory. Don't just open it in an editor, copy it someplace else outside your repository. Then (AND IMPORTANTLY), go back to the master branch:

    git checkout master

You need to go back to the master because you probably don't want to do your work in the older branch as it does not contain all your recent work. You just wanted to look at your older files, save the parts you wanted, and then go back to your new work.

Again, there are other ways to solve this problem. This one, however, can be useful as it:

- Gives you a good chance to look over all the files in your project as it was at a specific point in time.
- Creates a branch that **memorializes** that point in time in case you want to switch back to it again. To get back to it, just type **git checkout initial**. But don't forget to switch back to master when you are done: **git checkout master**.

## Find big files that you don't Need

Run **git gc** as explained above.

Now find any huge files:

	git rev-list --objects --all > bar.txt

Look for entries about your big file:

	git log --pretty=oneline -- /Tech/Monkey.png

Remove the big file like this:

	C:\Git\repo>git log --pretty=oneline -- Tech/Graphics/HtmlSwitch/Monkey.JPG
	3c6a55fa8d507e31864e5651ca1fec3a9eb2b5d1 delete big files
	69d6f1ed3de5198b9595d2edae818bb00ef4444d Adding switch examples

	git filter-branch --index-filter "git rm --cached --ignore-unmatch Tech/Graphics/HtmlSwitch/Monkey.JPG" -- 69d6f1^

Or:

	git filter-branch --index-filter "git rm --cached --ignore-unmatch Tech/Graphics/HtmlSwitch/Monkey.JPG" -- 69d6f1^

Or:

	git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch Tech/Graphics/HtmlSwitch/Monkey.JPG" HEAD

At this point you ought to be able to push your changes.

Linux or Mac users, See this GIST:

- <https://gist.github.com/shennyg/1047737>

Copyright &copy; 2017 by Charles Calvert
