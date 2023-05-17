---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/GitBranchWeeks.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: GitBranchWeeks.md
relativePath: /GitBranchWeeks.md
title: GitBranchWeeks
directoryName: Assignments
category : assignments-guide
---

## Overview

Learning about branching.

**NOTE**: _This assignment is specific to a particular course or set of courses, but could be edited to be more generic._

## Git Branch

Create a new branch and check it out:

<pre>
git branch week05
git checkout week05
</pre>

Modify the readme:

  geany README.md &

We should add text like this:

<pre>
  ## Week 05 Branch

  - [Angular Solar Starter Assignment][solar-start]

</pre>

[solar-start]: http://www.ccalvert.net/books/CloudNotes/Assignments/AngularSolarStarter.html

Now check it in and bush it on the new branch and then push that branch to your BitBucket or GitHub repository:

<pre>
git status
git add README.md
git commit -m "Week05 Read me"
git push --set-upstream origin week05
</pre>

**NOTE**: _Your branch in the cloud is the **origin** in our case. When we talk about the origin, we are referring to our repository on BitBucket or GitHub. The origin doesn't have to be in the cloud or on those sites, but it is in our case._

Take a look at the new branch's metadata:

<pre>
git branch -a
</pre>

Now switch back to master and merge in your changes:

<pre>
git checkout master
git merge week05
</pre>

It might looks something like this as we merge the **week05** README with the **master** README:

<pre>
git merge week05
Updating d0aee52..7ae1b47
Fast-forward
README.md | 9 +++++++++
1 file changed, 9 insertions(+)
</pre>

## Week 06 Branch

Now create a week06 branch and modify the readme as we did in week05:

<pre>
git branch week06
git checkout week06
geany README.md &
</pre>

The changes might look like this:

<pre>
  ## Week 06 Branch

  - [Angular Solar Starter Tests Assignment][solar-start-test]
</pre>

Check the status:

<pre>
git status
git branch -a
</pre>

Add in your changes, commit and push your new branch to the cloud (BitBucket/GitHub):

<pre>
git add .
git commit -m "Week06 Readme"
git push --set-upstream origin week06
</pre>

## Merge Week06 into Master

Now we merge in our changes to the master branch:

<pre>
git checkout master
git merge week06
</pre>

**NOTE**: _We don't necessarily have to merge our changes back into master every day. You should merge them, however, before we go on to week 07. The point being that master ends up contains our latest while our branches show our status at the end of each week. This is not the only thing you can do with branches, nor is it even a common strategy, but it fits our goals in this class. In other words, its nice in this class to have a handy record of where we are at the end of each week. But other teams would do very different things with branches. One of our goals, of course, is simply to be sure we understand how to use git branches. The exact way we use them is not important._

Now check the status, and go back to **week06** where we will do our work this week:

<pre>
git branch -a
git checkout week06
</pre>

A call to **git branch -a** might look Like this:

<pre>
$ git branch -a
  a
  master
  week05
* week06
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
</pre>
