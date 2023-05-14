---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-delete-move.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git
fileName: git-delete-move.md
relativePath: /git/git-delete-move.md
title: git-delete-move
directoryName: git
category : cssguide-guide
---

# Delete and Move

Delete and move files in a Git repository.

## Restructure Your Repository

If you want to restructure a Git repository, you can usually do what you want with the following command:

	git mv X Y

Where X and Y could be either the name of a folder or a file. Examples:

```
	git mv MyFile.txt MyFolder/.

	mkdir MyNewFolder
	git mv *.txt MyNewFolder/.
	git mv MyFolder MyNewFolder/.
```

Just as on Linux, you can rename a file with the mv command:

	git mv MyFile01.txt MyFile02.txt

This renames MyFile01.txt to MyFile02.txt.

If you want to delete an entire directory and its subdirectories, try this:

	git rm -r MyFolder

To delete a folder from the repository, but keep it on your local
machine, do this:

	git rm -r --cached folderName

For instance, suppose you have accidentally committed something like
a **node_modules** folder to the repo that you want to keep on your
local drive, but remove from the repo. Do this:

	git rm -r --cached node_modules

And so on...

The point being that you don't have to start a new repository if you want to
change the way you have set up your directories. Just use **git mv** or **git
rm** to delete files.

![git rm][git-rm]

[git-rm]:https://s3.amazonaws.com/bucket01.elvenware.com/images/git-rm.png

## Permanent Delete

In the following explanation I focus on permanently removing a folder called node_modules from your repository. However, this explanation applies to removing any folder or repository.

**NOTE**: *There are two ways to permanently remove files or folders. Below you can find a discussion of how to do the delete using a tool called BFG.*

What if you did not include node\_modules in your .gitignore file? As a result of your mistake, your repository has a lot of deeply nested files in the directory called Week02-GetNumbers/node_modules. Your repository is many times bigger than it needs to be. 

You should **immediately** update your .gitignore file in the root of your repository so that it includes node_modules.

The next step is to permanently remove the node\_modules folders. This is an odd thing to do, because the whole purpose of Git is to keep track, for all time, of all changes that you make to a project. So even if you delete a file from a repository with git rm file\_name or git rm -r node_modules, it should still be in the repository, but not in your working copy of the files. In other words, Git keeps track of the files so that you can recall them if you need them.

It is, however, possible to permanently remove a file or folder from a repository. Doing so is a rather drastic step. Here is the command you should run from the root of your repository:

	git filter-branch --tree-filter 'rm -rf Week02-GetNumbers/node_modules' HEAD

More in-depth explanations can be found at these sites:

- [git perm][gitperm]
- [dalibornasevic][perm]

[gitperm]: https://help.github.com/articles/remove-sensitive-data/
[perm]: http://dalibornasevic.com/posts/2-permanently-remove-files-and-folders-from-git-repo

After you do this, you should push your repository like this:

	git push origin master --force

Use that syntax just the one time. After you have pushed it once, you can resume pushing the repository with a simple **git push** command.

This drastic step breaks all other copies of the repository. On your end, you should therefore delete any copies of the repository from all your machines, and then re-clone it. (I think you can keep the one on which you issued this command and the push, but all other copies should be deleted.) Don't try to run the command on all copies. That won't work. Instead, delete them, and then re-clone them with this command:

	git clone git@bitbucket.org:lastname/prog272_lastname.git

It is difficult to emphasize too often how very important it is to put **node_modules** in your **.gitignore** file. Please look on GitHub, Bitbucket or wherever your repository is hosted when you are through with this process and make sure that **node_modules** is now included in the **.gitignore** file.

**NOTES**: *I've heard it said, but not tested that you can remove multiple copies of nested folders like this:*

	git filter-branch --tree-filter 'git rm -rf --ignore-unmatch */foo/* ' HEAD

## Git mv vs Bash mv {#git-mv}

There is usually not a lot of difference between **git mv** and **mv**. Nevertheless, I suggest you use **git mv** and **git rm** when renaming or deleting folders that are already under Git control.

Though it is not always a problem, there are cases when using **git mv** rather than just **mv** is better able to preserve your history. Every time you commit, Git saves the state of your file. So it remembers what a file looked like the first time you committed it, and each subsequent time. If you use **mv** instead of **git mv**, then Git can think that you simply deleted one file and created a new file. Then your history won't be attached to the new file, and you won't be able to see what it looked like in the past. If you use **git mv** then your history for a file will be preserved.

Usually, however, Git can be smart about what happens when you use **mv** instead of **git mv**. In other words, it seems to me, and I am not certain about this, that it can usually figure out that a deleted file and a new file are so exactly similar that you must have done a rename, and so it preserves the file history. But I don't think it is good idea to count on this. Instead use **git mv** to be safe.

At first, you won't care much about the history of files since you won't really understand how to go back in time to previous versions. But over time, you will learn how to do this. Then you may find occasions when you are glad you preserved the whole history of a file. But frankly, this topic is complicated, and you should take what I say here with a grain of salt. All I can really assert is just that it is safer and easier to use **git mv** rather than **mv**.

See this discussion:

http://stackoverflow.com/a/1094392/253576 (Links to an external site.)

Notice that the guy says they are the same, but the top comment on his reply is that **git mv** has a few safeties built in. The discussion goes on from there, but I don't want to try to recap it. It gets pretty technical pretty quickly.

## Incremental: One Step at a Time {#incremental}

I see students get in trouble by renaming a lot of files, and especially entire folders, then not immediately committing their work. Sometimes they even delete or rename a whole project folder, and then recreate a new one with the same name:

<pre>
rm -r Week0X-SomeProject
mkdir Week0X-SomeProject
</pre>

This formula can lead to chaos. If you want to do something like this, I would do it like this:

<pre>
git rm -r Week0X-SomeProject
git add
git commit -m "Deleting hopeless messed up folder.
</pre>

And, depending on circumstances, sometimes try a **git push** and **git pull** after the above to make sure all is still okay.

Then: **mkdir Week0X-SomeProject** or the equivalent, which might be a copy operation or a run of **CreateAllExpress** etc.

The point being that one should work one step at a time. Don't make dozens of changes at once without seeing if you can successfully commit and possibly also push and pull.

The same is true in your code, don't make dozens of changes at once without checking to see if your tests still pass and your program runs. If you must make those changes very quickly because you are following along in class and have to move to the next step, then when you are done for the day, comment out nearly all the steps, leaving only the first one visible. Get it to work, then un-comment a bit more of your work, get it set up correctly, etc. Always one step at a time!

### Permenant Delete with BFG

A tool called BFG can make permanently deleting files from a repository fairly easy. Do this if you accidentally committed something with a password in it, or some huge files or directories (node_modules, .metadata) that you don't want.

Download the bfg jar file from here:

- <http://rtyley.github.io/bfg-repo-cleaner/>

Now create a mirror of your repository in a new directory:

	git clone --mirror git@github.com:charliecalvert/Test.git

Run BFG on the mirror of your repository to, for instance, remove all node_modules folders:

	cd Test.git
	java -jar c:\src\bfg-1.11.1.jar --delete-folders node_modules

Get rid of unneeded files:

	git reflog expire --expire=now --all
	git gc --prune=now --aggressive

To confirm that your work succeeded, clone the mirror:

	cd \temp
	mkdir myclone
	cd myclone
	git clone C:\temp\Test.git

Now you will have a regular repository and can explore it.

When you are convinced that all is good then go back to the mirrored repo and push it:

	git push

Your old repositories are now out of date and need to be cloned again. Don't just update your repository, clone it a second time:

	ren Test Test.old
	git clone git@github.com:charliecalvert/Test.git


## Git Deletions and Workflow

In general, I find one of the gotchas with using Git is that deletion and renaming of files is best done with Git. So most of the time I'm working happily in an IDE, making lots of edits and creating new files. I do all this work in Eclipse, Webstorm or whatever IDE I am using without any problem. Life is good. Then I decide I want to rename a file, move it into a new directory, or delete it. At that point, I tend to switch to the command line, and give these commands with Git:

	git rm MyFile.js

	git mv MyFile.js MyNewName.js

The first command deletes a file, the second renames it. Here is removing (entirely deleting) a directory and its contents (obviously a dangerous command):

	git rm -r MyDirectory

Then I choose Alt-Tab to go back to my IDE, and generally it has found my changes already. If not, I focus the Project Manager and press F5 to refresh the view. As I say, this is perhaps less than ideal, but it is my general workflow when in a Git Repository.

The point is that Git will track the changes we make that way, so if we need to restore a deleted file, etc., we can do so later on. Just trust Git to keep all your changes.

## Undo an Add in Git

Sometimes you do an add by mistake:

	git add MyFile.txt
	git add YourFile.txt

Suppose that you meant to do one of the adds, but not the other. You can fix it like this:

	git reset HEAD MyFile.txt

And this resets everything to before the add:

	git reset HEAD --

## Undelete Something {#undelete-something}

You can use **git checkout** to undelete things. For instance,

    	git checkout Week07-TwitterInteractive

This should undelete a directory or file if you have not yet done a commit. If you have done the commit, then run **git log** so you can get the id of the commit you want to restore. Then try something like this:

    	git checkout <COMMIT_ID> README.md

Here are a few lines from a session that uses the git log command:

```bash
$ git log --pretty=oneline
747a7b0ab64cf3b9a3fddbcc9cd8343aef3f7219 Finished TwitterInteractive
09c0818092c7e4c25852a44ab9ff81efafe31214 finished bitlyRefine
9e613644dd3ce268d0f763810d90e8941bd81474 ran grunt clean
```


And here's how to get a file back to the third commit shown above:

    	git checkout 9e613644dd3ce268d0f76 README.md

References:

  [Git Basics - Undoing Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things/)


Copyright &copy; 2017 by Charles Calvert
