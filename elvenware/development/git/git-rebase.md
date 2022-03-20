---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-rebase.md
relativePath: elvenware/development/git/git-rebase.md
title: Git-rebase
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: git-rebase.md
fileNameHTML: git-rebase.html
---

<!-- toc -->
<!-- tocstop -->

# Rebase

I use rebasing when I have two branches, and sometimes want to update
a particular branch with changes from the other branch. For instance,
I use rebase in this scenario:

- I've checked out a student's repository
- I need to make changes to it, but only I want to keep the changes. I'm
not going to check in my changes to the student's repository.
- I want to keep my changes, but also get the most recent changes from the student.

Here is what I do. I create two branchs:

- The **master** branch has the students code
- The **mycopy** branch has the student's code plus my changes.

Here is how it works:

- Create a branch called mycopy: **git branch mycopy**
- Checkout that branch: **git checkout mycopy**
- Make my changes and commit them. I never push them.
- Then I can switch back to master: git checkout master.
- I can pull the most recent changes: **git pull**

Now I have the most recent copy of the student's repository in the
**master** branch. If I want to update mycopy with the most
recent changes from the student's repository, I:

- Switch to mycopy: **git checkout mycopy**
- Get the changes from master: **git rebase master**

There may well be conflicts at this point, but Git talks you through
the process of fixing them. Just edit the files that need to be fixed
up. See the section in this document on merging code if you need help
on this. Then continue the rebase:

- Continue the rebase: **git rebase --continue**

The end result is that I have two copies of the students code:

- In **master** I have the student's copy of the code, as he sees it.
- In **mycopy** I have all the student's code, plus my changes to it.

I think it is obvious from the above, but it is probably worth saying
anyway. When I work on a student's code, I only use **mycopy**. So I
spend 90 percent of my time in **mycopy**. I only switch back to master
in order to pull the most recent version of the student's code. When
I want to update my copy based on the most recent version of the student's
code, I switch to the **mycopy** branch, and then **rebase**.

Copyright &copy; 2017 by Charles Calvert
