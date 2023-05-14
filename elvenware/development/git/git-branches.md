---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-branches.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git
fileName: git-branches.md
relativePath: /git/git-branches.md
title: git-branches
directoryName: git
category : cssguide-guide
---

# Git Branches

I can testify from personal experience that there many useful tasks you can perform with Git without ever creating a single branch other than the default master branch. And yet, I think it was only when I began creating branches that I first began to understand the true power of Git.

Before Git, I had used other version control systems. Perhaps it was ignorance on my part, but I found them to be useful, but boring, tools.

There is nothing boring about working with branches on Git. It has an "oh wow!" factor that still sets me back on my heels even after working with it for years. Once I really began to understand branching, I found myself, and still find myself, thinking: "Oh my gosh, I can't believe I can do something this cool with so little effort."

I believe, however, that one cannot really learn to love Git branching until it becomes second nature. Newcomers to the subject frequently find it a bit mysterious and incomprehensible at first. It is only when it begins to become second nature that you can really feel excited about it. The point is that it can so easily do such powerful things. But you won't see that until you can in fact easily work with Git branches. That takes some time, but less time than you might think. It is not so much that one needs to learn something complex as that one has to have several ah-ha moments about how Git branching works and what it can do.

So lets get started working with Git branches.

## Overview Video

Perhaps you will find [this video](https://youtu.be/gk6MDBxQnqU) on branching and rolling back your data helpful:

<iframe width="560" height="315" src="https://www.youtube.com/embed/gk6MDBxQnqU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Or this one on undoing your work before you push a commit:

<iframe width="560" height="315" src="https://www.youtube.com/embed/WNU4eSf9bHU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Understanding Branches

Git Branches can, among other things, allow you to have two versions of one code base checked into your repository at the same time. The classic example is testing out an idea. Suppose you are confronted with a problem, and think you might have an idea of how to solve it, but you are not certain it will work. You can then create a Git branch. Now you have two identical ways to view your code.

- The master branch, which holds the code for your current program
- The test branch, on which you want to try an experiment

You can make changes on your test branch without changing the code on your master branch. If the code in your test branch works, then you can "merge" it back into the master branch. If it does not work, you can abandon it, delete it, or leave it in an unfinished state in case you one day get an inspiration about how to solve your problem.

A second example might be the need to create version 2.0 of your program. You might already have created version 1.0, 1.1. and 1.2, and now be ready to move on to version 2.0. To get started, you can create a new branch. Now you may have two branches:

- The master branch, which contains version 1.2
- The version2 branch, which contains version 2.0

As you work in the Version2 branch, your changes do not affect the Version 1.2 branch. If users of version 1.2 need a bug fix, then you can create a Version 1.3 without giving them new features, possibly incomplete, features from your Version 2.0 branch. If you need to merge the fix from Version 1.3 into Version 2.0, then you can do that as well.

Once you understand what you can do with branches, you can begin to imagine many more scenarios in which they might be useful. For instance, you could have a Version 1.3 tailored for use on Windows, and in another branch create one tailored for use on Linux or the Mac. The possibilities are endless.

## Clarifications

Saying even these few introductory thoughts on branching can raise questions. For instance, won't creating all these branches consume a great deal of disk space? Doesn't this mean that each branch effectively doubles the amount of space your code takes up? Fortunately, this is not the case. Git tracks only the differences between branches. If you have two branches, and you change one character in the second branch, then Git keeps only one copy of your code, plus a record of the single character different between them. To oversimplify the matter a bit, if your code has 20,000 characters in it, and branch 2 differs from branch 1 by 1 character, then Git needs not to consume not 20,000 + 20,000 total characters, but 20,000 + the 1 additional character representing the difference between the two branches. Of course, the reality is a bit more complex than that, but perhaps a great deal less than you might suppose.

Later, you will learn about **diff** files that can define the difference between to versions of a single file or a set of files. When studying these files, I found that that they were much simpler than I initially supposed them to be. In short, the science of tracking differences between files is both much simpler, and much terser than I had initially supposed.

Once we are over the hurdle, the second big issue that presents itself to someone who is new to branches is the whole subject of merging the code from one branch into another branch. Consider the first scenario outlined above, where one wants to merge the code from a test branch back into the main branch. Exactly how is that done?

It turns out that there are very sophisticated tools that allow us to compare branches. These tools are augmented by a set of simple commands that allow us to visually compare one branch with another branch.


## Working with Branches

Branches allow you to work with variations of your code. You can have
two versions of one code base checked into your repository at the
same time. Perhaps one version is intended for one audience, the other
for another audience. Perhaps one version has code from Person A in it
and the other branch has a second version of the same code, but with
suggestions made by Person B.

List available branches:

	git branch

For instance:

	C:\GitHub\Simple02>git branch
	* master
	test

The listing above shows two branches, one called master, the other called test. The asterisk before the **master** branch means that it is the current branch.

Create a branch named **myBranch**:

	git branch myBranch

For example:

```
C:\GitHub\Simple02>git branch myBranch

C:\GitHub\Simple02>git branch
* master
  myBranch
  test
```

As you can see, there is now a new branch called **myBranch**.

Now we can switch to our new branch:

	git checkout myBranch

Now type **git branch** again and you will see both branches listed, but
your current branch will be highlighted. In other words, **myBranch**
will appear in highlighted text and with a star before it:

	C:\GitHub\Simple02>git checkout myBranch
	Switched to branch 'myBranch'

	C:\GitHub\Simple02>git branch
	  master
	* myBranch
	  test

Now lets show that you can edit and add files to your current branch
without affecting the other branch. First edit a file and check your
changes in to your branch:

	git add MyFile
	git commit -m "Committing changes to MyFile"

If you have cloned a repository with multiple branches, you can see
those branches one of three or four ways:

- git branch
- git branch -a
- git branch --list
- git branch -r
- Go to the online version, and you should see the branches listed in,
for instance, Bitbucket or GitHub. In other words, the web interface
to your repository should list the branches in some fairly obvious
way.

Git branch **-a** shows all the branches, both local and remote.
The command **git branch --list** shows the local branches and **git branch -r** shows the
remote branches.

	C:\GitHub\Simple02>git branch -a
	  master
	* myBranch
	  test

	  remotes/origin/HEAD -> origin/master
	  remotes/origin/master
	  remotes/origin/test

In the listing shown above, you can see that master and test are on
both the local and remote versions of the repository. But myBranch
is only on the local version. In the next section you will learn
how to push it to the remote repository.

If you want to push this branch, and only this branch, to the origin (to the remote repository), then do this:

```
$ git push --set-upstream origin BridgeReader04
```

where BridgeReader04 is the name of the branch.


## A Test Branch

Suppose that you have a project which includes a section called **Router**. You want to move it to another location in your program. Other files, called **index.js** and **DataMaven.js** will need to be altered to reflect the new location of **Router**.

Moving the Router probably won't cause problems. But if you want to test it first, do this:

- add, push and commit everything
- git branch my-router-test
- git checkout my-router-test

Make the changes in **index.js** and **DataMaven.js** and see if it works. If it does:

- add, commit, push
- git checkout master (Or whatever branch you were on before you made the my-router-test branch
- git merge my-router-test

Here is the whole thing in action, where instead of changing **index.js** or **DataMaven.js**, I only add text to my README.md file. I'm trying to focus your attention on the process of creating a test branch, and skipping over the code changes so as to keep the example simple:

```
charlie@rohan-elf:~/Git/prog272-calvert-2017 (week08-charlie)
$ **git branch my-router-test**
charlie@rohan-elf:~/Git/prog272-calvert-2017 (week08-charlie)
$ **git checkout my-router-test**
Switched to branch 'my-router-test'
charlie@rohan-elf:~/Git/prog272-calvert-2017 (my-router-test)
$ **echo 'foo changes' >> README.md**
charlie@rohan-elf:~/Git/prog272-calvert-2017 (my-router-test)
$ git status
On branch my-router-test
Changes not staged for commit:
 (use "git add <file>..." to update what will be committed)
 (use "git checkout -- <file>..." to discard changes in working directory)

 modified: README.md

no changes added to commit (use "git add" and/or "git commit -a")
charlie@rohan-elf:~/Git/prog272-calvert-2017 (my-router-test)
$ **git add .**
charlie@rohan-elf:~/Git/prog272-calvert-2017 (my-router-test)
$ git status
On branch my-router-test
Changes to be committed:
 (use "git reset HEAD <file>..." to unstage)

 modified: README.md

charlie@rohan-elf:~/Git/prog272-calvert-2017 (my-router-test)
$ **git commit -m "ReadMe"**
[my-router-test b250e6f] ReadMe
 1 file changed, 1 insertion(+)
charlie@rohan-elf:~/Git/prog272-calvert-2017 (my-router-test)
$ **git checkout week08-charlie**
Switched to branch 'week08-charlie'
Your branch is up-to-date with 'origin/week08-charlie'.
charlie@rohan-elf:~/Git/prog272-calvert-2017 (week08-charlie)
$ **git merge my-router-test**
Updating d7774e9..b250e6f
Fast-forward
 README.md | 1 +
 1 file changed, 1 insertion(+)
charlie@rohan-elf:~/Git/prog272-calvert-2017 (week08-charlie)
$ **cat README.md**

This is a readme file
**foo changes**
```

I've put asterisks around key commands. Most of the rest is just the response to the command, and not important. At the very end, I show the change I made to the README.md file by highlighting it in bold.

## Branch Differences

Show the names of files that differ between two branches:

<pre>
git diff --name-only branch01 branch02
</pre>

For instance:

<pre>
$ git diff --name-only week06-charlie week06
Week05-SolarExplorer/karma.conf.js
Week05-SolarExplorer/public/javascripts/app.js
Week05-SolarExplorer/spec/fixtures/renewable.html
Week05-SolarExplorer/views/main.jade
Week05-SolarExplorer/views/renewable.jade
</pre>

Show the differences found in a specific file between two branches:

<pre>
git diff week06 week06-charlie -- Week05-SolarExplorer/views/renewable.jade
</pre>

For instance, suppose you were comparing the **spec/test-basic.js** file between the week07 and week07-charlie branch:

<pre>
$ git diff week07 week07-charlie -- Week07-SolarExplorer/spec/test-basic.js
diff --git a/Week07-SolarExplorer/spec/test-basic.js b/Week07-SolarExplorer/spec/test-basic.js
index 929db3c..3207834 100644
--- a/Week07-SolarExplorer/spec/test-basic.js
+++ b/Week07-SolarExplorer/spec/test-basic.js
@@ -20,14 +20,14 @@ describe('Elvenware Simple Plain Suite', function() {
         scope = _$rootScope_.$new();
         $compile = _$compile_;
         $templateCache = _$templateCache_;
-        //        mainController = _$controller_('MainController', {
-        //            $scope: scope
-        //        });
+                _$controller_('MainController', {
+                    $scope: scope
+                });
     }));

     beforeEach(function() {
         jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
-        loadFixtures('marie.html');
+        loadFixtures('marie.html', 'renewable.html');
     });
</pre>

In the above code, the **week07** branch has the part with the minus before it:

<pre>
-        //        mainController = _$controller_('MainController', {
-        //            $scope: scope
-        //        });
</pre>

My **week07-charlie** branch has the code shown below with a plus before it:

<pre>
+                _$controller_('MainController', {
+                    $scope: scope
+                });
</pre>

Let's assume for a moment, that week07 has broken code, and week07-charlie has fixes for the broken code. In that case, we can conclude that **week07** was wrong to have commented out the controller code, and wrong to have tried to use **mainController** as a variable in this location. We can see this by comparing the code with the minus before it to the code with the plus before it.

Then a bit further down, the week07 branch has this code which is preceded by a minus sign:

<pre>
-        loadFixtures('marie.html');
</pre>

The code from **week07-charlie** looks like this:

<pre>
+        loadFixtures('marie.html', 'renewable.html');
</pre>

Assuming that **week07-charlie** has good code in it, then the fix to the code in **week07** is shown with a plus sign.

Suppose you have two different branches where you have renamed a directory. How do you compare the same file between two different branches if the directory where the file resides has been renamed? State the branch, then a colon, then the path to the file. Like this:

<pre>
git diff week06:Week05-SolarExplorer/spec/test-mocks.js week07:Week07-SolarExplorer/spec/test-mocks.js
</pre>

You might also use **git diff** to compare two different versions of a single file found in two different commits. This asks what did file X look like in commit Y and in commit Z? You issue the command like this:

	git diff e78fe3 a7e46a README.md

This compares the difference for a specific file between two commits. If you want to see the changes between all files in the two commits, just leave off the file name in the above command.

## Update File from Branch {#update-branch}

First checkout the branch where you want to update a file:

<pre>
git checkout week10
</pre>

Then patch a specific file from another branch:

<pre>
git checkout --patch week09-charlie views/about.jade
</pre>

This applies the difference from **week09-charlie:views/about** to **week10**. It "merges" the contents of the file in week10 with the contents of the file in **week09-charlie**.

Suppose **week09-charlie:views/about.jade** looked like this:

<pre>
h1 FooBar

p qux.
</pre>

Suppose **week10:views/about.jade** looked like this:

<pre>
h1 FooBar
</pre>

After the command was issued, week10:views/about.jade would look like this:

<pre>
h1 FooBar

p qux.
</pre>

We call this patching rather than merging because the changes are not automatically added and committed. It is as if you made the changes your self with the editor, and you must manually add and commit if you want to keep them.

## Comparing Two Branches

If you want to compare the files from BranchA and BranchB, you might
do something like this:

    git diff --name-status branchA..branchB

For instance:

    git diff --name-status master..charlie01


Here are the various kinds of status letters you see for the output of the above:

-	A: File added
- C: File has been copied. A number should show percent of similarity to original.
- D: Deleted
- M: Modified
- R: Renamed
- T: Type changed
- U: Unmerged file needs to be fixed (merged manually)
- X: An error of some kind has occurred, possibly in Git itself.


## Push All Branches

The commands **git push --all** and **git pull -all** should pull and push everything on all branches.

Here is a push with --all when I had changes on two branches:

<pre>$ git push --all
Counting objects: 8, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 754 bytes | 0 bytes/s, done.
Total 8 (delta 4), reused 0 (delta 0)
To git@bitbucket.org:ccalvert/prog219-calvert-2016.git
   9586409..1d7c4b2  week06 -> week06
   0f7f54a..b7fc171  week05 -> week05
</pre>

Here is a push with git push when I had changes on both branches

<pre>$ git push
Counting objects: 4, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 385 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
remote:
remote: Create pull request for week06:
remote:   https://bitbucket.org/ccalvert/prog219-calvert-2016/pull-requests/new?source=week06&t=1
remote:
To git@bitbucket.org:ccalvert/prog219-calvert-2016.git
   d98ac56..9586409  week06 -> week06
</pre>

Notice that in first case both week05 and week06 got pushed, while in the second only week06 got pushed.

To be sure, check on Bitbucket/GitHub, or on a separate machine, or just on a separate copy of your repository on the same machine.

[https://git-scm.com/docs/git-push](https://git-scm.com/docs/git-push)

## Merge Branches


If you have been doing work in a branch called **charlie** and you want to
merge it with **master**, then first checkout the master branch, then
merge them:

	git checkout master
	git merge charlie

When performing a merge between branches, use the Git difftool:

```
git difftool -d --tool=meld master <SomeBranch>
```

Or, if you don't want to pass the **--tool** parameter each time, set it globally:

```
git config --global diff.tool meld
```

Then you get Meld automatically when you do something like this:

```
git difftool -d master <SOME BRANCH>
```

For instance,

```
git difftool -d master charlie
```

## Push Local Branch to Remote

If you want to create a copy of your branch in the original remote repository:

	git push <remote> <local>

For example:

	git push origin myBranch

This would, for example, push the local branch called myBranch to the remote repository, which might be a place like GitHub or Bitbucket. If *myBranch* does not exist in the remote repository, then it will be created.

The next time you push, you can use the same command, or you can set things up so *git push* will push only the current branch:

	git config push.default current

You can also:

    git push --set-upstream origin BridgeReader04

Suppose you and another person are working on the same repository
and the other person adds a branch and pushes it to the origin. When
you run **git pull**, that will pull down the new branch. You can
see it by typing **git branch -a**. To switch it to it, just type
git branch <NewBranch>, where NewBranch is the name of the new
branch the other person added.

	git pull
	git branch -a
	git checkout myBranch

## Clone a Specific Branch

To clone a specific branch, go to a directory that does not
contain a repository with the same name as the repository you want
to clone. Then enter the following command:

```
git clone -b <branch> <url>
```

For example:

	git clone -b mybranch git@github.com:username/myrepo.git

More specifically:

	git clone -b test git@bitbucket.org:charlie/myrepo.git

Here is another example, working with local files:

    BRANCH=chasyte
    REPOSITORY=file:////home/charlie/git/myrepo
    mkdir
    cd $BRANCH
    git init
    git remote add -t $BRANCH -f origin $REPOSITORY
    git checkout $BRANCH


## Git Checkout a Specific Branch

Sometimes you want to just look at the state of your repository at
some point in the past. You don't necessarily want to switch to that
state, but just view it. You can do that by checking out the repository
from the state it was in after a particular commit.

Let's assume you have just done a pull, and have the whole up-to-date
repository on your machine. Now you want to check out the repository
and examine a branch that mirrors the way your project looked at some
point in the past.

Every time you do a commit, there is a funny number associated with
that commit. You can easily find these numbers, often called SHAs, on
the Git web sites. Typing **git log** can also help you find these numbers.

Now just do a checkout, passing in that number:

	git checkout -b charlie01 a608f0e

In this example we created a new branch called charlie01 that mirrors
the state of the repository as it looked after the commit identified
by the SHA a608f0e.

## Revert to Tag

Suppose you have a repository called "deleteme10". You have tagged the most recent commit as v0.0.1:

<pre>git log --oneline
1a456c6 (tag: v0.0.1, origin/master, origin/HEAD) ncu
be70869 deleteme10
24e2af3 three layer
a2a668a Delete me package security
aafcafe Code from bootcamp day 2
b321a7f Updating Readme
9be2856 Commiting Readme
1c621de Readme
2a88a62 Initial commit
</pre>

As you can see, the repo has about nine commits, and the most recent is tagged as v.0.0.1.

Now you make a few more commits. We will simulate that be running this script which makes some changes to our repo, and commits each of them:

<pre>touch elf_file  
git add elf_file  
git commit -am "adding empty elf file"  
echo "new content" >> elf_file  
git commit -am "add new content to elf file"  
echo "This is yet more content" >> elf_file  
git commit -am "Add and commit yet more commit"</pre>

Now let's look at our log:

<pre>$ git log --oneline  
24fd3f8 (HEAD -> master) Add and commit yet more commit  
9d2fd42 add new content to elf file  
1861d81 adding empty elf file  
1a456c6 (tag: v0.0.1, origin/master, origin/HEAD) ncu  
be70869 deleteme10  
24e2af3 three layer  
a2a668a Delete me package security  
aafcafe Code from bootcamp day 2  
b321a7f Updating Readme  
9be2856 Commiting Readme  
1c621de Readme  
2a88a62 Initial commit</pre>

But, whoops, we don't like these recent commits and want to revert to the tagged commit. Pick the commit where we first started to go wrong and revert it:

<pre>
$ git revert 1861d81  
error: could not revert 1861d81... adding empty elf file  
hint: after resolving the conflicts, mark the corrected paths  
hint: with 'git add <paths>' or 'git rm <paths>'  
hint: and commit the result with 'git commit'  
charlie@elf-path:~/Git/deleteme10$ (master)  
$ git status  
On branch master  
Your branch is ahead of 'origin/master' by 3 commits.  
(use "git push" to publish your local commits)

You are currently reverting commit 1861d81.  
(fix conflicts and run "git revert --continue")  
(use "git revert --abort" to cancel the revert operation)

Unmerged paths:  
(use "git reset HEAD <file>..." to unstage)  
(use "git add/rm <file>..." as appropriate to mark resolution)

deleted by them: elf_file

no changes added to commit (use "git add" and/or "git commit -a")
</pre>

We are reverted back to our tag, but there is some clean up:

<pre>git rm elf_file   
git commit -m "revert back to tag v0.0.1"</pre>

Now look at our logs:

<pre>f02f0cd (HEAD -> master) revert back to tag v0.0.1  
24fd3f8 Add and commit yet more commit  
9d2fd42 add new content to elf file  
1861d81 adding empty elf file  
1a456c6 (tag: v0.0.1, origin/master, origin/HEAD) ncu  
be70869 deleteme10  
24e2af3 three layer  
a2a668a Delete me package security  
aafcafe Code from bootcamp day 2  
b321a7f Updating Readme  
9be2856 Commiting Readme  
1c621de Readme  
2a88a62 Initial commit</pre>

We have reverted back to tag v.0.0.1 but we have also preserved our history. If we decide later that some of the changes we removed are worth a second look, we can still get back to them. But now our master branch (HEAD) is equivalent to tag v0.0.1.

I believe this is easier in practice than it is to explain. For more detail, see this:

- [https://www.atlassian.com/git/tutorials/undoing-changes/git-revert](https://www.atlassian.com/git/tutorials/undoing-changes/git-revert)
- [https://github.blog/2015-06-08-how-to-undo-almost-anything-with-git/](https://github.blog/2015-06-08-how-to-undo-almost-anything-with-git/)


## Delete Branch

Having a branch in your code is not nearly as expensive as it might seem at first. If, however, you want to delete it, first switch to master, and then:

    git branch -d initial

where "initial"	is the name of your local branch.

## Replace Master with Old Commit

Sometimes you will find that the current master branch is no longer what you want. You want to go back to some earlier commit, some earlier state. The first thing to do is find the commit number of that old branch as described above. Suppose that number is** f631de7**. Here is how to replace the current master branch with that older commit. You may or may not want to start with a **git fetch** to pull down the most recent code (current master branch) from your repository. At any rate, once you are ready to begin, you should do this, where the first line creates a branch called **yesterday** based on specific commit:

```
git branch yesterday f631de7
git checkout yesterday
git merge -s ours master
git checkout master
git merge yesterday
```

The -s stands for strategy: **git merge --strategy ours master**. It says that if there are conflicts during the merge, always prefer our current branch over the master branch.

When looking at the above code, it should be clear that you can use this same strategy to replace the current master with any random branch. Suppose you want to replace the current master with a branch called **goodbranch**:

```
git checkout goodbranch
git merge -s ours master
git checkout master
git merge goodbranch
```

Copyright &copy; 2017 by Charles Calvert
