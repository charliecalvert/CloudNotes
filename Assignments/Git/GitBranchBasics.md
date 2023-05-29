---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/GitBranchBasics.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: GitBranchBasics.md
relativePath: /GitBranchBasics.md
title: GitBranchBasics
directoryName: Assignments
category : assignments-guide
---

## Overview

Basic branching.

To get started, be sure that you have a copy (clone) of your repository in your **~/Git** folder and your **~/temp** folder. We can imagine that one copy is your repository at school, and the other copy is your repository at home.

At lease one video is found [here](https://www.elvenware.com/git-guide/git-branches.html#overview-video).

## Step One: Create a Branch {#create-branch}

Open a repository. Create a file called **MyTest.md** in **Week0X-BranchBasics**.:

```markdown
# My Test

This is my test document.
```

Commit your work:

```bash
$ git add MyTest.md
$ git commit -m "MyTest created"
[master 4ef3e60] MyTest created
 1 file changed, 3 insertions(+)
 create mode 100644 MyTest.md
```

View the available branches with **git branch**. Usually you see only one branch called **master**:

```bash
git branch
* master
```

Now create a new branch:

```
git branch test
```

View your branches:

```bash
$ git branch test
$ git branch
* master
  test
```

Now you can see we have two branches:

- master, which is currently selected
- test, which is not selected

## Step Two: Work on Test Branch {#work}

Switch to your test branch:

```
git checkout test
```

Edit **MyTest.md**:

```markdown
# My Test

This is my test document.

## New Test Section

This part of the document was added in the test branch
```

Now commit your work:

```bash
$ git status
On branch test
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   MyTest.md

no changes added to commit (use "git add" and/or "git commit -a")
$ git add MyTest.md
$ git commit -m "Made changes to MyTest in test branch"
[test 45fc491] Made changes to MyTest in test branch
 1 file changed, 4 insertions(+)
```

## Step Three: Merge {#merge}

Now lets switch back to **master**:

```bash
# git checkout master
Switched to branch 'master'
// MORE TEXT MAY APPEAR HERE.
```

Let's look at **MyTest.md**:

```bash
$ cat MyTest.md
## New Test Section

This is my test document
```

As you can see, it does not contain the changes we made in our test branch. Suppose, that after long consideration, we decide that we like the changes we made in the **test** branch and we want to merge into our current branch. Do it like this:

```bash
$ git merge test
Updating 4ef3e60..45fc491
Fast-forward
 MyTest.md | 4 ++++
 1 file changed, 4 insertions(+)
```

Now let's take a second look at **MyTest.md**:

```markdown
$ cat MyTest.md
## New Test Section

This is my test document

## New Test Section

This part of the document was added in the test branch
```

You can see it has incorporated the changes from our **test** branch.

## Step Four: Push {#push}

Now push your branch upstream (-u) to github:

```
git push -u origin test
Counting objects: 9, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (9/9), done.
Writing objects: 100% (9/9), 901 bytes | 0 bytes/s, done.
Total 9 (delta 3), reused 0 (delta 0)
To git@github.com:charliecalvert/deleteme02.git
 * [new branch]      test -> test
Branch test set up to track remote branch test from origin.
```

You could also do **git push all -u**, which pushes all your branches upstream.

**NOTE**: *The **-u** flag is short for **--set-upstream**. For details, type **git help push**.*

Don't do this right now, but instead of pushing your branch, you could have decided you don't like the branch at all. In that case, you can just delete. Don't do this right now, but if you do want to delete a branch, it is easy:

```
git branch -d test   # DON'T DO THIS RIGHT NOW
```

## Step Five: Pull your Branch {#pull}

Suppose you are now on your home machine and you want to view the branch you just created.

**NOTE**: _As implied earlier, you don't actually have to be on your home or school machine to see all this. Wherever you are, just clone your repository into your temp directory (if you have not done so already) and switch back and forth between the view of your repository found in the **~/temp** folder and the view in your **~/Git** directory. An alternative would be to have two machines next to each other on your desk, such as a desktop machine and a laptop machine. (We can't do this latter alternative, of course, on "no laptop Mondays"!)_

Suppose you have been doing your work in the **~/Git** version of your repository. Now switch to the version in your **~/temp** directory and do a **git pull**:

```
$ git pull
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
Unpacking objects: 100% (3/3), done.
From github.com:charliecalvert/deleteme02
 * [new branch]      test        -> origin/test
```

You can see that your new branch has been pulled. To see it, call **git branch** with the **-a** switch:

```
$ git branch -a
*  master
  test
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
  remotes/origin/test
```

Now checkout the **test** branch:

```
git checkout test
```

You can now continue working in your **test** branch on this second copy of your repository. In this assignment, we won't actually do any more work quite yet, but we are all set up to do it when the times comes.

## Step Six: New Branch Qux {#qux}

In addition to **test**, create a new branch called **qux** and switch to it:

```
git branch qux
git checkout qux
```

Check to be sure you are on the **qux** branch by typing **git branch**. Switch to the Branch Basics folder we created earlier. In that folder, create a text file called **qux.txt** with some arbitrary text in it. Don't merge **qux** with any other branches. Simply commit your work in the new branch. Now the **qux** branch has **qux.txt** but no one else does. Switch between branches with **checkout** in order to confirm this.

Push everything (git push --all).

## Step Seven: Merge Conflicts {#conflict}

Let's deliberately create a conflict between two files that Git can't resolve (merge) on its own.

Checkout test: **git checkout test**. Edit the first line **MyTest.md**:

```
## New Test Insurrection
```

Commit your work.

Checkout master but don't yet merge it with **test**: **git checkout master**.

Now in the **master** branch let's edit the first line of **MyTest.md**. We are making changes to the same place in the same line. Git will not know how to merge the changes automatically. In particular, open **MyTest.md** and change the first line to read like this:

```
## New Test Inspection
```

Commit your work. Now the first line of **MyTest.md** in **master** is in conflict with the first line of **MyTest.md** in **test**.

Let's try to merge **master** with our **test** branch:

```
$ git merge test
Auto-merging MyTest.md
CONFLICT (content): Merge conflict in MyTest.md
Automatic merge failed; fix conflicts and then commit the result.
```

If the date is 01-01-2017 or later, take a screen shot of this step. Show that you got a message like the one I display above.

Open up **MyTest.md** in your editor. You will easily be able to find the place where git could not merge the files. In particular, git shows both versions of the text, one from **master** called **HEAD** and the previous commit, which is from **test**:

```text
<<<<<<< HEAD
## New Test Insurrection
=======
## New Test Inspection
>>>>>>> test

This is my test document

## New Test Section

This part of the document was added in the test branch
```

Let's fix the problem, choosing one of the two options, or selecting a new option:

```
## New Test Infection

This is my test document.

## New Test Section

This part of the document was added in the test branch
```

Notice that the first line **MyTest.md** in **master** is now slightly different from the first line of **MyTest.md** in **test**. Now check the status and commit your work:

```text
$ git status
On branch master
Your branch is ahead of 'origin/master' by 3 commits.
  (use "git push" to publish your local commits)
You have unmerged paths.
  (fix conflicts and run "git commit")

Unmerged paths:
  (use "git add <file>..." to mark resolution)

	both modified:   MyTest.md

no changes added to commit (use "git add" and/or "git commit -a")

$ git add MyTest.md

$ git commit -m "Fixed conflict in MyTest.md"
[master 0b4dc08] Fixed conflict in MyTest.md
```

Notice that line that says **both modified**. That tells us that both **master** and **test** have modified this file. But all should be well now, as we have fixed everything.

Just to prove to ourselves that all is well, push your work:

```bash
$ git push
Counting objects: 10, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (10/10), done.
Writing objects: 100% (10/10), 929 bytes | 0 bytes/s, done.
Total 10 (delta 8), reused 0 (delta 0)
To git@github.com:charliecalvert/deleteme02.git
   45fc491..0b4dc08  master -> master
```

## Go Back in Time

Run git log:

```
commit fa4090fc069adacac6ac60a73d4f0c56a9f8a95f
Author: gabe at school <w3dev@yahoo.com>
Date: Mon May 7 11:29:35 2018 -0700
```

And then do this:

```
2046 git log
2047 git branch may7-last-commit fa4090fc06
2048 git checkout may7-last-commit
2049 ll
2050 git log
2051 git checkout master
```

## Safe Merge

You can merge without committing the result:

    git merge --no-commit --no-ff <YOUR BRANCH>
    git difftool -d --cached

If you don't want to use a **difftool**:

    git diff --cached

After looking things over, if you don't like what you see, you can roll back the merge with this command:

```
$ git merge --abort
```

Otherwise, commit your work.

## Turn it in

Push everything (git push --all). Go up on github or bitbucket as appropriate. Switch between views of the different branches. Make sure it all makes sense:

- You should see three branches: **master**, **test**, **qux**.
- **qux** should have a file called **qux.txt** that the other two branches do not have
- **test** and **master** should look pretty much alike, but there should be differences in the first line of **MyTest.md**.

If the date is 01-01-2017 or later, attach your screen shot of the merge conflict.

Submit the assignment. I'll mostly be checking to see if the branches and files mentioned in this assignment exist.

## Hints

When performing a merge between branches, use the Git difftool:

```
git difftool -d --tool=meld master <SomeBranch>
```

Or, if you don't want to pass the **--tool** parameter each time, set it globally:

```
git config --global diff.tool meld
```

Then you get git automaticgit difftool -d master ElvenSite01ally when you do something like this:

```
git difftool -d master <SOME BRANCH>
```

For instance,

```
git difftool -d master qux
```

## The Prompt

Add git branch if its present to PS1 in **.bashrc**:

```bash
parse_git_branch() {
 git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}
```

Add this chunk to the PS1 line:

```bash
\[\033[01;31m\]$(parse_git_branch)
```
