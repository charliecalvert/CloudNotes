---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-introduction.md
relativePath: elvenware/development/git/git-introduction.md
title: Git-introduction
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: git-introduction.md
fileNameHTML: git-introduction.html
---

<!-- toc -->
<!-- tocstop -->


# Introduction

Git is a free, open source, distributed, version control system. It allows individuals or teams to check in and track text based documents of all kinds to a central repository available over the web.

Git is capable of working with binary files, but it is best at storing text based documents such as source files, markdown, HTML, JSON, XML, or standard ASCII documents.

With Git, you can run the clock backwards, finding old versions of your code, and you can compare one version with another version.

Git is a sophisticated tool, and it is not always easy to learn. It is however, the dominant tool of its kind, and with good reason. It is powerful, flexible, and robust. Ultimately, Git is worth mastering. In fact, much of the basic functionality of Git is relatively easy to master once you get over a few low hurdles.

## Outline

- **Introduction**
	- Learn what Git is and what it can do for you.
	- Why should I use Git?
- **Install**
	- Install on Ubuntu and Windows
	- Cloning
- **The _.gitignore_ File**
	- Learn the simple steps to take to avoid sabotaging your repository right at the start.
- **Configure**
	- Configuring Git is easy, but their are a few steps you need to take.
- **Git Basics**
	- At long last we can begin to check in files and push them to a remote repository
- **Deleting and Moving Files**
	- One of the first challenges many developers face is learning how to rename, move and delete files.
- **Tagging**
- **Branches**
	- Branches are one of the most powerful tools Git has to offer. There are many uses for branches.
	- Create a branch for Version 1.0 of your product. Another branch for Version 2.0 and so on.
	- Create branches when you want to experiment. If you are not sure something will work but want to test it.
	- Create branches for different team members to use.
	- And so on.
- **Search and Explore**
	- Many tasks in Git are surprisingly simple. It can, however, be a bit tricky to learn how to find files.
	- Search across branches
- **Merge**
	- Merging is the heart of Git.
	- Once you understand how to create branches, and merge them with other branches, you are fully ready to benefit from the power of this remarkable tool.
- **Fork**
  - Let other users independently explore and modify a copy of your repository without giving them permission to change your working code
  - If you like their changes, then you can merge them into your own code.
- **Rebase**
  - An advanced tool that allows you to maintain a clean, simplified history of actions performed in your repository.
- **Gui**
  - Overview of a few options that don't involve the Command Line
- **Git Miscellany**
  - Appendices, notes, anything that doesn't quite fit in the above.

## When to use Git

As mentioned earlier, Git is designed to, and best for, working with text documents. This means it is probably not the best way to track Word Documents, zip files, or graphics files. It can be used for that purpose, but there are probably better tools for those kinds of tasks.

You don't need to be deeply technical to use Git or to read this book, but you must be willing to learn. Technology has some surprising twists and turns to it.

There is little doubt that heavyweight tools such as Word are the best way to create text when you first start using computers. But if you want to take one step further into the technology, it is much, much simpler if you step away from complex formats such as Word offers and start working with simple text documents. As you learn how to use them, you will find that they offer most of the capabilities of a tool like Word, but provide much more flexibility.

## Centers of Activity {#centers}

Version control has been around a long time. What makes Git different is the way it handles repositories. Git has a distributed model that allows you to clone repositories onto your local machine. In the past, there was only one version of the repository, typically somewhere on your local network. Git is quite different, in that you can have multiple versions of your repository. This means  you can have a version of the repository on your local network or even your local machine. You can check in and check out from there before deciding that you want to push to the main repository in the cloud. One advantage of this system is that it allows you to share your work with a restricted group of people before pushing it up to a more public location.

In a common scenario, members of a team might each have copies of the repository on their local machine. They can check their work into repository on the local network that all team members can access. Once the code passes tests, and everyone on the team feels it is ready to go public, it can be pushed up to repository on the Internet that can be accessed by the general public.

There are many Git servers in the cloud. Here are two that everyone should know about:

- GitHub: [https://github.com](<https://github.com/>)
- Bitbucket: [https://bitbucket.org/](<https://bitbucket.org/>)

You probably want to have accounts on both GitHub and Bitbucket. Everyone uses GitHub, and Bitbucket competes by allowing you to have free private accounts.

## Git Website

Below you find links to the main site for Git. You will also find their download page and related links:

- [http://git-scm.com/](<http://git-scm.com/>)
- [http://git-scm.com/downloads](<http://git-scm.com/downloads>)

## GIT Guides found on the Web

I've put together various resources including a [video][git-video]. I've also put together [a walk through/assignment][git-new-repo] that can help you get started with Git on Linux. Also, I have a [slide deck on Git][git-deck].

* [Video][git-video]
* [Assignment][git-new-repo]
* [Git Deck][git-deck]

There is an excellent free online book:

- [Pro Git](http://git-scm.com/book)

More useful links:

- [Atlassian Bitbucket 101](https://guides.co/g/bitbucket-101/11146)
- [GitHub help pages](https://help.github.com/)
- [Git Docs](http://git-scm.com/documentation)
- [Wikipedia](http://en.wikipedia.org/wiki/Git)
- [Robinson 2 MinuteGuide](http://www.garyrobinson.net/2014/10/git-in-two-minutes-for-a-solo-developer.html)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Training Tools](https://github.com/github/training-kit)
- [GitHub for Developers](https://developer.github.com/)


[git-new-repo]: http://www.ccalvert.net/books/CloudNotes/Assignments/GitNewRepo.html
[git-deck]: http://bit.ly/git-basics
[git-video]: http://youtu.be/p1obmWF6Nks

## Is Git Reliable? {#reliable}

Topics like "is Git reliable?", "is it me, or is it Git?" come up from time to time. My concern is that students will spin their wheels unnecessarily, focusing on imaginary problems with Git, rather than trying to problem solve.

The following stats were assembled in Feb, 2016:

- Git is used by 42.9 percent of all software developers
- In the UK, nearly one quarter (23.5 percent) of developer job postings cite Git. The details:

	- 23.5% Git
	- 16.3% Subversion
	- 11.58% Microsoft Team Software Foundation
	- 1.62% Mercurial (like Git, but easier to use)
	- 1.13% Visual Source Safe

As of August, 2017, GitHub has about 23 million users and 64 million repositories. Those numbers are growing quickly. That's just GitHub, not total Git users. You can use Git and not use any cloud repository, or use Git and use a different cloud repository such as BitBucket.

Related links which probably contain updates to total GitHub users:

- <https://github.com/about>
- <https://github.com/explore>

GitHub and BitBucket are websites, and websites are sometimes down due to operational errors or denial of service attacks. But GitHub's record is usually good:

- [GitHub Status](https://status.github.com/graphs/past_month)
- [Bitbucket Status](http://status.bitbucket.org/)

Though the odds that it will happen are very low, it is always possible that one of us will hit a bug in Git. Note, however, that that the odds that we hit a Git bug when performing basic operations is very, very low.

Git is not perfect. No piece of software is perfect. Yet Git is, in my opinion, one of the most reliable, tested, and proven software programs in the world.

**NOTE**: _By far the most common problem my students have with Git occurs because the student does not shut down their VM properly. Don't close the lid of your laptop with your VM running. Don't close a VM by clicking the X for cancel icon at the top right or left of the VM window. Instead, properly shutdown your copy of your VM. The best way to do this is by chosing the **shutdown** button at the right of the interface, the Start button (bottom left of Lubuntu interface), or typing **sudo shutdown -h now** in the bash shell._

_Let me pull on your coat for a moment longer regarding this subject. I occasionally have a student for multiple quarters, as many as four in a row. I have found that some of these students persist in shutting down their VM improperly despite the fact that they damage their repositories repeatedly with their bad habits. It is as if there is nothing I can say that will inspire these students to take the extra few seconds required to shutdown properly, thereby saving themselves much time and trouble in the long run._

## Git vs DropBox {#git-versus}

There are some tools such as DropBox, Google Drive and OneDrive that will automatically propagate changes to any machine that subscribes to updates. Git, on the other hand, is designed to let developers, or authors, work on a set of documents and then share them when and as needed. The advantages to the second scenario (Git), for a certain type of activity, are twofold:

- No changes are seen until the author is ready to share them. We can work on a rough draft, or on an algorithm, until it is polished, and then share it. If code were propagated automatically as we made changes, we would likely "break the build" for other developers. Our half-finished code would appear on others' machines as we worked on it. Results of sharing half-finished code could be errors in the compilation process (npm start fails to work), or unexpected bugs in working code. A related scenario, perhaps a bit closer to home, would be a student who does not want to share work with a teacher until it is complete. Or conversely, wants to share it before it is complete in order to ask a question, but does not want to share just any version, but rather a particular version. If changes were propagated automatically, the student could not work on the code until the teacher had reviewed it.

- From the other side, a developer might not want to see another person's changes until they are ready for them. Even if the code that was automatically propagated to their machine did work correctly, it can be disconcerting to have to program against services, objects and APIs that change without warning.

I think all that goes at least some of the way to explaining why Git works the way it does.

Sharing documents is a good and common use of a tool like Git. When working with documents rather than code, the consequences of automatically pushing updates is less severe, but still real. Suppose I'm putting together a list of steps that must be followed. If I accidentally leave out a few steps in my first draft, then people who are following my changes live are likely to be miffed that my guide does not work. Or perhaps I begin working on a description of a seven step process. I get to step 5, then get called to dinner, or head off to bed. People reading the document would then begin following my steps, only to find that the description is incomplete.

There are, of course, strong arguments for exactly the opposite kind of functionality. If I'm taking notes on a lecture in Evernote, at the end of class I want them to be propagated automatically and immediately so I can access them as needed from home. There is no advantage in that scenario to any other system. Leaving a copy of my notes at school without being able to access them from home would have no advantages. I want to see all changes immediately on all machines when I log into Evernote.

The bottom line is that there are many different ways to share information in the cloud. The only way to learn which one is best for which task is to learn the tools, and begin experimenting with them. Everyone is working these things out for themselves just now. Unfortunately, students in the future will probably be told to use tool X for purpose Y, and tool W for Z. Neat and clean, but not nearly as fun as exploring this world on your own. We live in interesting times.

Copyright &copy; 2017 by Charles Calvert
