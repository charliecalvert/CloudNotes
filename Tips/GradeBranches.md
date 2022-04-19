---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Tips/GradeBranches.md
relativePath: Tips/GradeBranches.md
title: GradeBranches
queryPath: Tips/
subject: Tips
fileNameMarkdown: GradeBranches.md
fileNameHTML: GradeBranches.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

I want to give you good feedback, but doing so often takes me a very long time. I've come up with a system that should help your move forward quickly with detailed feedback, and yet not be too difficult for me to create.

In particular, for some, but by no means all, assignments, I may create a branch in your repository and push my work.

```bash
git branch charlie-04-22-2017
git checkout charlie-04-22-2017
# CHARLIE UPDATES YOUR CODE
# THEN HE PUSHES HIS CHANGES
git status
git commit -m "From Charlie"
git push --set-upstream origin charlie-04-22-2017
```

To see what I have pushed, you need to pull and then check to see if I have created a branch. The branch will usually the date on which it was created in it's name:

```bash
git pull
git branch -a
```

That might return the following

```bash
charlie-04-22-2017
* master
remotes/origin/HEAD -> origin/master
remotes/origin/charlie-04-22-2017
remotes/origin/master
```

You can see I have created a branch called charlie-04-22-2017. Checkout my branch:

```bash
git checkout charlie-04-22-2017
```

Now open or look at my code in Webstorm. View the TODO Window:

- [TODO Tool Window](https://www.jetbrains.com/help/webstorm/2017.1/todo-tool-window.html)
- Access from: **View | Tool Windows | TODO**
- Shortcut: **Alt-6**

![TODO in Webstorm][tdiw]

As a general rule, whenever you see a TODO, that means it contains code that I fixed for you. That doesn't mean that I fixed all the problems in the file, or that the fix I implemented is complete and ready to be turned in. But generally, it means that my fix got you unstuck, got you to a point where you can do more work.

Of course, you also have the program I created, which should be working, at least in part, or I would not have given it to you. In some cases, either through forgetfulness or laziness, I may leave out a TODO item, particularly when it comes to deleting or moving files. Just do the best you can.

## Fixing Your Code

After looking over my fixes, switch back to your code:

```todo
git checkout master
```

Now start implementing the changes that I have detailed for you.

## Comparing Branches:

If you have a hard time implementing the fixes, you may want to compare branches. To see the difference between your current branch and the branch I created, run a command that uses the **git difftool**.

The git difftool should be set automatically to **Meld**. To ensure that is the case, make sure it is listed in the **diff** section of the file called **~/.gitconfig**:

```code
cat ~/.gitconfig
[user]
	email = charlie@foo.com
	name = Charlie on forestpath
[push]
	default = simple
[diff]              <=========== HERE
    tool = meld     <=========== HERE
```

You can edit **.gitconfig** in a text editor such as geany. Now run the **git difftool** command from your branch (probably master), against my branch. You usually don't need to list your current branch, as it is assumed. Just list my branch:

```bash
git difftool -d charlie-04-22-2017
```

The result should show you the difference between the way your files look and the way I think they should look, with my files on the right.

![Git Diff Branch][gdb]

[gdb]: https://s3.amazonaws.com/bucket01.elvenware.com/images/grade-branch-git-diff.png
[tdiw]: https://s3.amazonaws.com/bucket01.elvenware.com/images/grade-branches-todo-view.png

## Summary

When I do use this technique to grade your work, I will tell you so explicitly in the comments for the assignment in question. If you don't see a specific reference to this document and this technique, then assume I did not think it necessary to create a branch in order to get you the feedback you needed. In fact, that is what will happen in most cases. But there will be times when I will elect to use this system. In those cases, I will make that fact explicit and probably also link to this document.

Note that I'm only making changes in the branch I create. I'm not making any changes to your code. You also should not make any changes to the code I put in the branch I create. Leave it alone. Make changes in your branch, which will usually be the master branch.

This is a potentially powerful way for me to grade your work. I'm giving you detailed feedback on how to fix errors that might be causing you problems. It does, however, require some work on your side as you learn the tools. However, if you take the time to see how the tools work, this technique can save both you and me many hours of generally fruitless work.

With this system, you now have the answers. This means that I don't expect to see the same error on your next assignment. As a result, I may sometimes simply kickback assignments (grade 5) that contain errors that I have already told you how to fix. In those cases, you will need to fix the problematic code by exploring the branch I sent you in more detail, and then resubmit the assignment.
