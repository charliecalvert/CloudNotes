---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-ignore.md
relativePath: elvenware/development/git/git-ignore.md
title: Git-ignore
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: git-ignore.md
fileNameHTML: git-ignore.html
image: ./course/course-javascript.jpg
subject: git
queryPath: elvenware/development/git/
---

<!-- toc -->
<!-- tocstop -->

# The .gitignore File

If you set up Git correctly, and use it intelligently, it is a simple mechanism for performing remarkably powerful tasks. If, however, you make one of several easy to avoid errors, you can end up creating a great deal of trouble for yourself. Use it right, and Git is your friend. Misuse it, and it can be a remarkably subtle foe.

It is easy to avoid serious errors if you just proceed with caution. Hurry too quickly into the fray, and you can sustain unnecessary injuries that are easy to avoid. It is much the same as learning to drive a car: hop into the driver's seat with no instruction and turn directly onto the Interstate, and you can end up in serious trouble. Take a short period of time to learn the rules, and ramp up at an appropriate pace, and your vehicle can be a useful, even pleasant addition to your life.

With that introduction, you can perhaps appreciate why I have decided to dedicate an entire chapter to the subject of configuring Git so it ignores certain files. Years of experience watching students learn Git has taught me that many of them create trouble for themselves right at the start by checking the wrong files into their repository. Once the mistake is made, students need at least an intermediate level of understanding to get their repository back into good working order.

Let me drill down a little deeper on what I see when students fail to exclude certain files and directories from their repository. This is a mistake most commonly made by my least experienced students. They end up checking in files that should not be in their repository. An example would be a directory full of XML configuration files for an IDE. Files of this type are constantly changing in subtle, and in the grander scheme of things, unimportant, ways. They are useful on the current local machine, but usually only a source of confusion if downloaded on another machine.

After checking in the IDE configuration files, they start pushing and pulling their source files. In the process they make minor mistakes commonly made by inexperienced users. To fix these problems is not difficult in most cases, but their task is greatly complicated by the fact that their IDE configuration files keep changing in subtle and hard to understand ways. They try to fix the problem, and end up breaking their IDE configuration files. They can usually get the IDE up and running again, but now they are afraid to use Git.

One might think the story ends there. But it does not. Now weeks go by, and they are not using Git, or only using it the minimal way possible, and usually with help from other students. As each week goes by, they fall further and further behind in their understanding of Git relative to their peers. Other students are busy using and learning about Git. Meanwhile, they are bogged down in complex problems that started out as a small issue. Their initial mistake grows into a big knotty mess that even experienced Git users find difficult to resolve. The irony is that students least prepared to deal with a complex problem are learning little and facing much complexity. Meanwhile, more experienced students are learning a lot, and facing few, if any problems.

The best solution for those stuck in such a bog is to start over. And it is relatively easy to start over if a repository is young. But these students are afraid to do that, too, since they have come to the conclusion that Git is hopelessly complex. "You mean I have to go back to the beginning? No way, you don't know how much work I have put into this repository!" Either correctly or incorrectly, they believe their repository is precariously balanced on the edge of disaster. One wrong move might cause a collapse that crushes them and ruins their grade for the quarter.

People who are not teachers will perhaps think I'm exaggerating, but I am not. Students can get themselves into terrible messes, and in this case it is all over a misunderstanding of a relatively simple concept. As a result, I have decided to dedicate a significant amount of time to helping you correctly configure one of the essential parts of your repository: the aptly named **.gitignore** file.

## Creation

If you are a developer, you probably don't want to check in every file you or your tools create.

You can create a file** .gitignore** that tells Git to ignore certain files.  That's GITIGNORE, but in all lowercase, with a PERIOD in front of it: **.gitignore**. Remember that in Linux files that have a period in front of them are hidden. At the command prompt, you can view them by typing **ls -la**.

You might create a file called **.gitignore** with this content:

	Thumbs.db

This tells Git to ignore all the files in your repository that are called **Thumbs.db**.

You could then tell it to ignore the contents of the **temp** directory, the **.metadata** directory and the **node_modules** directory:

	Thumbs.db
	temp/*
	.metadata
	node_modules

Here is how to ignore everything but the source directory:

	*
	!Source/

And here is a complex example that includes a comment:

```
# Ignore everything in the "charlie" directory, except certain directories

charlie/*
charlie/development/*
charlie/development/web/*
charlie/development/web/JavaScript/images/
charlie/development/web/HtmlGuide/images/
charlie/development/web/CssGuide/images/
!charlie/development/
!charlie/development/web/
!charlie/development/web/CssGuide/
!charlie/development/web/JavaScript/
!charlie/development/web/HtmlGuide/
```

Add and check in your .gitignore file:

```
git add .gitignore
git commit -m "Adding GitIgnore File"
git push
```

Copyright &copy; 2017 by Charles Calvert
