---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/SmokeTests/SmokeTester01.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/SmokeTests
fileName: SmokeTester01.md
relativePath: /SmokeTests/SmokeTester01.md
title: SmokeTester01
directoryName: SmokeTests
category : smoketests-guide
---

## Overview

Normalize file naming conventions as outlined in the **Turn it in** section. After renaming the files, get the best and latest versions of your programs in the **master** branch.

I'll run a check to see if you have the right programs in master. I'll be checking for case and other details in the name. Your grade will be based on the results of that check.

## Background

Ideally, our repository should have a structure like this:

- Branch week01
  - week01-program-01
- Branch week02
  - week01-program-01
  - week02-program-01
- Branch week03
  - week01-program-01
  - week02-program-01
  - week03-program-01
  - week03-program-02

The point being that each week we create a new branch based on the previous week's branch. We add one or more programs to the new branch.

Meanwhile, the **master** branch ought to always contain working versions of all our code. For instance, it might look like this during week03, if we are still working on **week03-program-02**:

- Branch master
  - week01-program-01
  - week02-program-01
  - week03-program-01

Note that **master** contains three working programs, but omits **week03-program-02** because it is still under development.

I understand that your repository might no always be this clean. However, I want your **master** branch to be this clean.

## Merging

Assuming all the programs in branch **week03** are working, and assuming you never work in **master**, it should be very simple to merge the **week03** branch into **master**:

    git checkout master
    git merge week03

And your done.

Let's assume this goes fairly smoothly, but when you check your code in master, you find a problem. You can't resist fixing it right there. After your update **master** is ahead of **week03**. It should be simple to fix this. First commit your work in **master**, then

    git checkout week03
    git merge master

Let's assume you have completed these programs in week03:

- week01-program-01
- week02-program-01
- week03-program-01

But you have not completed **week03-program-02**. How can you merge **week03** into **master**? Well, there are any number of strategies for handling this, but one might be:

    git checkout week03
    git branch temp
    git checkout temp
    git rm -r week03-program-02
    // commit
    git checkout master
    git merge temp
    git branch -d temp # Delete branch temp

This allows you to merge all of week03 into master except **week03-program02**.

## Other things to Know

Here is how to compare two branches with some ability to copy files from one side to another:

    git checkout master
    git difftool -d week07

This compares **master** and **week07**. Do it from the root of a directory.

I know merging preserves my history, and I want to do that. But I'm desperate. The heck with merging! Can't I just copy one directory or file from one branch to another?

    git checkout week07
    git checkout week06 -- my-missing-dir

This will copy the directory called **my-missing-dir** from branch **week06** into branch **week07**.

**NOTE**: _One reason not to do this is that history can be your friend. Sometimes you turn in assignment late either because you forgot to turn it in, or because you were stuck on one bug even though everything else was working. If this happens I can check when you first started committing code for this project, or when you stopped committing or when you finished a particular file. Do I do this? Yes, I do, and it has meant some students did not lose points for lateness. But if you **checkout** rather than **merge**, then your history might get lost, and that is not good in some cases. Summary: try to merge. If it just isn't going to work for you, then try alternate strategies._

## Save a Good Copy of Your Repo

There are elegant ways to undo a merge or to fix bad merges. But here is one simple, if crude, way to handle failed merges.

Here's one cheap trick. Clone two copies of your repo, your main copy, and a backup. If you are about to try a merge that you think might fail, then update the backup. Try the merge in your main repo. If it fails utterly, you still have a backup repo that held your good work before the failed merge. Delete the working repo, copy or clone the good repo.

**NOTE**: _An alternate strategy would be to keep only one repo and push everything before you try a merge. If a merge fails, then just delete the messed up repo and reclone it. It will contain your code as it was before you had the failed merge._

## Merging week06 into week07

Suppose you are in week03. But you checkout week02. You make an update to

- week02-program-01

You commit **week02** and checkout **week03**. Should you now be afraid of merging **week02** into **week03**? In other words, would do so delete **week03-program-01**? In the normal course of thing no, it would not. Instead, it would merge only the files from **week02** that are newer than those in **week03**. In other words, it would merge in only the new code from **week02-program-01**, which would usually be exactly what you want.

## Rename a Directory

To rename a directory use **git mv**. For instance:

    git mv Week02-Foo week02-foo

You may have to do this in multiple branches or your merges won't work correctly. In other words, **git merge** thinks **Week02-Foo** is unrelated to **week02-foo**.

Use the **git difftool** described above to check that you have the names set up right.

## Turn it in

Merge into your **master** branch all the working copies you have of at least the following programs:

```
'week..-react-basics',
'week..-rest-basics/client',
'week..-rest-basics/server',
'week..-aws-setup',
'week..-rest-test',
'week..-concurrently',
'aws-provision/client',
'aws-provision/server',
'week..-ec2-copy-file',
'week..-system-check/client',
'week..-system-check/server'
```

The two periods are wild cards. I'm going to check for the existence of specific directories, but I won't get fussy about the week number. Thus I will accept **week01-react-basics** or **week02-react-basics**. At least for now. But I won't accept **Week01-React-Basics**.

If one of these programs is not working, then don't merge it. I'm looking for working code.

The same programs should appear in our latest branch, for instance **week07**, but they don't have to be working.

This assignment requires a certain amount of fussing about on details. I know that already, so you don't need to tell me about that aspect of the assignment. I care because I want to automate things, and I need some regularity to do that.
