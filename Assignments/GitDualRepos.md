## Overview

Git Dual Repo gives you a chance to open two views on your repository on one machine. You can then add, commit, push and pull on one machine, but see the results on two repositories.

## Step One

Find your existing repositories. For now, I'm assuming you have a repository at the following location:

~/temp/qux

This repository was created during our last class. Navigate to your repository and check the status of your repository:

```
cd ~/temp/qux
git status
```

You should get back a report that your repository is up to date:

```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```

You may see see something different, perhaps something a bit like this:

```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	README.md

nothing added to commit but untracked files present (use "git add" to track)
```

If this is the case, then you should add, commit and push your work:

```
bcuser@bcuser-winter-01:~/Git/CloudNotes/Assignments
$ git add .
bcuser@bcuser-winter-01:~/Git/CloudNotes/Assignments
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   GitDualRepos.md

bcuser@bcuser-winter-01:~/Git/CloudNotes/Assignments
$ git commit -m "GitDualRepos initial commit"
[master d44313a] GitDualRepos initial commit
 1 file changed, 3 insertions(+)
 create mode 100644 Assignments/GitDualRepos.md
```

If you get an error when you try to push, then you probably have not loaded your SSH key yet today. To fix this, type: **sshadd**. If your machine is set up correctly, then you should get a message stating "Identity added". Now you should be able to push.

## Step Two: Clone {#clone}

Now let's give you a second view of your repository. This will mimic what happens when you set up a second view of your repository on your home machine.

Start by opening a second tab in your bash shell:

- File | New Tab (Ctrl-Shift-Tab)

Now navigate to your **~/Git** folder.
