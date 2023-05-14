---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-merge.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git
fileName: git-merge.md
relativePath: /git/git-merge.md
title: git-merge
directoryName: git
category : cssguide-guide
---

# Git Merge

Git has many uses. There is no single iconic, fundamental, task performed by Git. Yet few Git tasks are as important as merging.

Git allows you to merge all or some of the files from one branch with the files from another branch. This means that you cannot understand the materials in this chapter without first understanding Git branching. If you have not done so already, or if you feel you need review of branching, please go back and read that chapter first.

## Merge from Branch

Merge from a branch in your repository. For instance, you are in **master**, and you want to merge the commits that are in **working**:

  	git merge working

Suppose you have two branches, week08 and week07. Switch to week08.  You can see differences like this:

    git difftool -d week07

Switching to week08 and typing this will merge week07 into week08:

    git merge week07

It may cause conflicts that are announced like this:

    Auto-merging comments/johnson.md
    CONFLICT (add/add): Merge conflict in comments/johnson.md

These will need to be repaired individually by opening the file in the editor and following these instructions found below:

- [Merge](#merging-code)

## Git Overwrite Local Changes

If you want to refresh the entire local repository, overwriting your
changes, do this:

	git fetch
	git reset --hard

Or, you can specify the repository you want to reset from:

	git fetch
	git reset --hard origin/master

If you have a single file in the local repository that you have edited,
and you want to throw away those changes, but keep your other changes,
then do this:

	git fetch
	git checkout origin/master <MyFile>

## Merging Code

If the same line of the same file is edited in two different instances of your repository then
the two versions of your file almost always need to be merged. If different lines in the sajme are edited in each Git instance, Git can usually merge the two instances automatically. The Problems can occur, however, when the
same line is edited in two different instances of your repository.

**NOTE**: *By two instances of your repository, I mean a scenario like this: one
instance might be the your version of your repository at home, and one might be
the version of your repository at school. Also consider the case where a team is
working together, and team member A and team member B both edit the same file
more or less at the same time. If you think about it, you can see that merge
conflicts cannot occur if we commit and push our work before we start editing
it at a second location. If you push at school before you go home, and pull when
you get home, then a merge conflict cannot occur. If team member A pushes his
work before team member B pulls and starts editing the shared file, then no
conflict can occur. Finally, it is not an error to have a merge conflict.
Git is designed to let two people work on the same file at the same time.
You just need to understand merge conflicts, and how to resolve those conflicts
that Git cannot resolve automatically.*

If Git tries to merge versions of your code and cannot do so
neatly, you can end up with code that has funny symbols in it, like this:

```
<<<<<<< HEAD
>>>>>>> 89e8d1f35ea5f393b3e5830d7169e071695b1cca
```

This means that Git could not cleanly merge two files. Instead, it puts both
versions of the disputed code in your file, and leaves it to you to sort it
out. In this case you might see a message like this:

```
$ git pull
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 2), reused 3 (delta 2), pack-reused 0
Unpacking objects: 100% (3/3), done.
From github.com:charliecalvert/prog270-calvert-2016
   944f6b5..f290612  master     -> origin/master
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

When we open up **README.md** in an editor such as **Geany**, we might see this:

```
<<<<<<< HEAD
# Charlie Calvert's Programming 270 Repository
=======
# Charlie Calvert's Prog 270 Repository
>>>>>>> f2906125f41326c09715b178cfc832e0e1ae0800

Here is where I'm putting some of my files from the Prog270 Winter, 2016 class.
```

This occurs because you had two different versions of **README.html**
that you checked into two different repositories. For instance, you
made changes at school, checked them in, then pushed. Then you went home and did
not pull the latest changes. Instead, you started making changes at home,
checked those in, and tried to push or pull. Suddenly you have two different versions of
the same file. They need to be merged, and Git does the best job it can. In this
case, that was less than perfect, and you need to edit the file, and merge the
two versions yourself. The versions are separated by code that looks like this:

```
<<<<<<< HEAD
YOUR Version 1 here
=======
YOUR Version 2 here
>>>>>>> 89e8d1f35ea5f393b3e5830d7169e071695b1cca
```

**NOTE**: *The HEAD is the current version of your repository, and the long
string of numbers and letters is the commit ID of some previous version of your
repository.*

More specifically, in our case, the part of the file with a conflict looks like this:

```
<<<<<<< HEAD
# Charlie Calvert's Programming 270 Repository
=======
# Charlie Calvert's Prog 270 Repository
>>>>>>> f2906125f41326c09715b178cfc832e0e1ae0800
```

We can now merge the two instances manually, which means that we can decide
which version we want, or we can come up with some third alternative. In this
case, I'll merge the lines like this:

```
# Charlie Calvert's Prog 270 Class Repository
```

Zooming out to see the entire edited file, it now looks likes this:

```
# Charlie Calvert's Prog 270 Class Repository

Here is where I'm putting some of my files from the Prog270 Winter, 2016 class.
```

Note that during the edit I removed the HEAD and funny looking long commit
number. They are no longer needed, so I deleted them and came up with a merged
copy of the two different versions of the file held in Git.

All is now well. We can add, commit and push/pull, and life returns to normal.
It all may seem a bit complicated at first, but frankly, I think that Git chose
a simple and intuitive way to handle this whole issue.

See also:

- [Resolving Conflicts][grc]
- [Git How to Home page][ght]

## Merge Tool {#merge-tool}

Note that you can also use **mergetool** to help you with the process of merging two files.

Open up your **~/.gitconfig** in Geany:

```.code
$ geany ~/.gitconfig
```

The **email**, **name** and **push default** fields should already be filled out. Add a third item called **diff tool** and set it to **meld**. Of course, you can only use meld if you are on a GUI (non-server) instance, and if you have it installed. There are other options you can use, but you will need to research those on your own.

```.code
[user]
	email = charlie@elvenware.com
	name = Charlie on RohanElf
[push]
	default = simple
[diff]
	tool = meld
[merge]
	tool = meld
```

To insert the **merge tool** setting automatically, try:

```.code
git config --global merge.tool meld
```

Or on Windows:

```code
git config --global merge.tool "meld"
git config --global mergetool.meld.path "C:\Program Files (x86)\Meld\Meld\Meld.exe"
```

**NOTE**: _Besides meld, your options include: opendiff kdiff3 tkdiff xxdiff tortoisemerge gvimdiff diffuse diffmerge ecmerge p4merge araxis bc codecompare emerge vimdiff._

Now, when you hit a conflict, use **mergetool**:

```.code
$ git mergetool

Merging:
README.md

Normal merge conflict for 'README.md':
  {local}: modified file
  {remote}: modified file
Hit return to start merge resolution tool (meld):

```

**mergetool** will create a file with a name like this **README.md.orig** as a backup file. Feel free to delete this file if you sure the merge has completed successfully.

## Merge Code Example Two {merge-code-two}

Here is a second example of the contents of a file that needs to be manually merged:

```html
<<<<<<< HEAD
<!DOCTYPE html>
<!-- MidTerm-CanvasGrid --
< -- Prog 282       			      --
< -- Spring 2013    			      -->
<html>
	<head>
		<title>Get User</title>
	</head>
	<link href="buttons.css" rel="stylesheet" type="text/css">
<body>

<form method="get" action="/authenticate">
	<p>Login using OpenID</p>
	<img src="../Images/Openid-16x16.gif" alt="OpenId Image" >
	<input name="openid_identifier" />
	<input class="myButton"  type="submit" value="Login" />
</form>

</body>
=======
<!DOCTYPE html>
<!-- MidTerm-CanvasGrid  --
< -- Prog 282       			      --
< -- Spring 2013    			      -->
<html>
	<head>
		<title>Get User</title>
	</head>
	<link href="buttons.css" rel="stylesheet" type="text/css">
<body>

<form method="get" action="/authenticate">
	<p>Login using OpenID</p>
	<img src="../Images/Openid-16x16.gif" alt="OpenId Image" >
	<input name="openid_identifier" />
	<input class="myButton"  type="submit" value="Login" />
</form>

</body>
>>>>>>> 89e8d1f35ea5f393b3e5830d7169e071695b1cca
</html>
```

You can fix all this by editing the files and getting something like this:

```html
<!DOCTYPE html>
<!-- MidTerm-CanvasGrid  -->
< -- Prog 282       			      -->
< -- Spring 2013    			      -->
<html>
	<head>
		<title>Get User</title>
	</head>
	<link href="buttons.css" rel="stylesheet" type="text/css">
<body>

<form method="get" action="/authenticate">
	<p>Login using OpenID</p>
	<img src="../Images/Openid-16x16.gif" alt="OpenId Image" >
	<input name="openid_identifier" />
	<input class="myButton"  type="submit" value="Login" />
</form>

</body>
</html>
```

The disputed code in a file may be only one line long, as in our first example,
or it may be nearly the entirety of a file as it is here. You only need to merge
the part that is in dispute.

As a rule, if one part of a file is edited in one place, and a second part of
a file is edited in second place, then Git can successfully
merge the two versions without producing code like that shown above. However,
if the same line, or lines, are edited in two different places (usually by
two different people, or the same user in two locations) then there is disputed
code that must be merged manually.

When working on these kinds of problems you may see an error message
stating that "You may want to first integrate the remote changes before
pushing again. See the note about fast-forwards..."

You perhaps understand that the error means that you have to do
a **git pull**, then a **git push**, in this case.

	git pull
	git push

You have to do this because the code in the remote GitHub repository
is "ahead of" the code in your local repository. In other words, it
has changes that have not yet been incorporated into your local
repository.

Suppose you and a friend are working on a document called Foo. Your
friend has made changes to Foo and checked them in. Now you have
your own copy of Foo, and you want to check it in. But if you did
that would overwrite his changes. So you have to first pull his
changes into your current copy, fix any conflicts that might need to
be made after the merge, and then push your copy.

Why is it that you have to perform the merge? Why can't you push
your code into the GitHub repository and make the merge there?
Because a merge might result in errors. What is in the GitHub
repository (the origin) is the canonical version of the code. It
should always work. You can't risk creating errors there, but you
can risk errors in your local repository. So you pull his changes
down, make sure your changes and his changes (the merge) work
together, and once you have manually ensured that all is good, then
you can push to the main repository.

Copyright &copy; 2019 by Charles Calvert

[grc]: https://githowto.com/resolving_conflicts
[ght]: https://githowto.com/
