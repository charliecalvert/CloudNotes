---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-fork.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git
fileName: git-fork.md
relativePath: /git/git-fork.md
title: git-fork
directoryName: git
category : cssguide-guide
---

# Forking

Frequently we do not own a repository, yet we want to work with the
code in the repository. We could clone the repository, but then when
it is updated, the only way to get the changes is to risk over
writing or losing our own changes. We could make a separate copy of
the repository, but then we would never be able to get updates.
There is, however, a third solution: fork the repository. Now you
own a copy of the repository. You can update it all you want. At the
same time, there is still a link (upstream) back to the original
repository. You can make your changes, and still merge in any changes
from the original. You can't contribute to the original, but you
merge in changes from the original. If you ever wanted to merge your
changes to the original repository, then there is a way to do that.
In other words, this is how many open source projects accept changes. You fork
their project, develop new code, then tell the owners of the original
repository to look at your fork, and if they like it they can accept
the changes.

```
Upstream Repo    --->     My Fork
          \                <
           \              /
            \            /
             >          >
			My Local Copy
```

In the diagram above, the UpStream Repo is the Original Project that
we want to fork. When we fork the repository, then we end up with
a copy of the repository on GitHub. That is what I label as **My Fork**.
We can then make a local copy of **My Fork**.

The path between **My Fork** and **My Local Fork** is two way: we
can pull and push. The path between **UpStream** and **My Local
Copy** is one way: you can only pull. That is, you can only pull
unless the Upstream repo decides to accept your commits, which is a
special case.

Most of the time, we don't want to merge our commits with the
original repo, we just want to modify our version of the project
without losing the link to the original. So we are usually only
concerned with pulling from the UpStream Repo. Therefore, I do not
show on this diagram that it is possible to get our changes back
into the upstream repository. That is a special case, and not shown
in this diagram.

The commands you give are as follows, though you only give the
first command once, the first time you try to update your local
copy from the upstream remote.

	git remote add upstream [GIT URL OF SOURCE REPO]
	git fetch upstream
	git rebase upstream/master

For instance, if you are trying to get updates from Angular-Seed, the
first command would look like this:

	git remote add upstream https://github.com/angular/angular-seed.git

And a first session might look like this:

	>git remote add upstream https://github.com/angular/angular-seed.git
	>git fetch upstream
	From https://github.com/angular/angular-seed
	 * [new branch]      master     -> upstream/master
	 * [new branch]      v0.10.x    -> upstream/v0.10.x
	>git rebase upstream/master
	Current branch master is up to date.

After you added the remote, you can skip that step, so the session
might look more like this:

	>git fetch upstream
	>git rebase upstream/master
	Current branch master is up to date.

Exactly what you see will depend on what changes have occurred to
upstream remote repository. In the examples I have shown, the upstream
repository and the local repository were identical, so the output
is not very interesting, but hopefully it helps you see what you
need to do.

[VonC](http://stackoverflow.com/users/6309/vonc) has a number of
good explanations on StackOverflow:

- [Why Fork](http://stackoverflow.com/questions/6286571/git-fork-is-git-clone/6286877#6286877)
- [Pull from Original](http://stackoverflow.com/questions/3903817/pull-new-updates-from-original-github-repository-into-forked-github-repository/3903835#3903835)
- [Fork vs Branch](http://stackoverflow.com/questions/3611256/forking-vs-branching-in-github)

## Fix Broken Fork

Stackoverflow: How to update git forked repository

git fetch upstream
git checkout -f -B master upstream/master

Copyright &copy; 2017 by Charles Calvert
