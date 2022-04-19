---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-tag.md
relativePath: elvenware/development/git/git-tag.md
title: Git-tag
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: git-tag.md
fileNameHTML: git-tag.html
image: ./course/course-javascript.jpg
subject: git
queryPath: elvenware/development/git/
---

<!-- toc -->
<!-- tocstop -->

# Git Tag

To see the tags:

	git tag

To make a tag called v0.1:

	git tag v0.1

To add a comment (annotation) to your tag when you make it:

	git tag -a v0.1 -m "This is the beginning state"

Notice the -a, which stands for annotation

You can view information about a **tag** like this:

	git show v0.1

Your **tag** is local unless you explicitly push it like this:

	git push origin v0.1

Here are two ways to list of all your tags:

	git tag -n1
	git tag -n -l

**NOTE**: _The first instance uses the number **one**, the second the letter **el**._

On GitHub, you can go to the main page for your repository, click the button that says **Branch master**, and switch to the tags page. You will see your tags.

Here are the official documents on tags:

- [Official Docs][ogtd]

[ogtd]: https://git-scm.com/book/en/v2/Git-Basics-Tagging

## Understanding Tags

A tag marks the state your repository was in at the time you tagged your files. It doesn't have anything to do with pushing files, it just marks a place in your repository.

If you **add**, **commit**, **push**, and then **tag**, that **tag** will point to the place in your repository where you pushed that last set of files.

If you **tag**, then **add**, **commit** and **push**, your **tag** will point to the place in your repository just before you **pushed**.

If you tagged a repository at 3 PM on March 5, 2017, then you can get back to the way your repository looked at that point in time by creating a **branch** on that **tag**.

By the "place in your repository", I mean the point in the time-line of your repository at which you tagged your repository. Among other things, it says: "if you want to see what my repository looked like at the time I tagged it, then create a branch based on this tag."

Copyright &copy; 2017 by Charles Calvert
