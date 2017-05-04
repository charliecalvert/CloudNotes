## Overview

The goal of this assignment is to help you learn more about Merging git branches.

The assignment assumes you have **meld** installed and that your ~/.gitconfig file has a difftool section that looks like this:

```
[user]
	email = charlie@foo.bar
	name = Charlie on RohanElf
[push]
	default = simple
[diff]
	tool = meld
[merge]
	tool = meld
```

To set the difftool in the **~/.config** file automatically, type these command:

```
git config --global diff.tool meld
git config --global merge.tool meld
```

## Simple Merge

Suppose you are in master, and you want to merge the master branch with a branch called **Week05**. To do this, type the following:

```bash
git merge Week05
```

This will attempt to merge everything from Week05 into the master branch. If there are conflicts, then you will end up with files that need to merged. Often, you can solve cases like that by simply opening the file in an editor and performing the merge by hand. If you want help from a Gui, just type: **meld .**. Then the files that need merging can be opened one at time in meld. You will see three columns:

- The previous state
- A more or less empty resolved state
- The new state

Use the tools to move the code from the left or right into the center. When the center looks right, save it.

## DiffTool Merge

Another way to merge two branches is with DiffTool. This is often best when you want to get only specific files from a particular branch, rather than everything. Suppose once again that we are **master** and want to merge into **master** files from **Week05**. Start with this command
