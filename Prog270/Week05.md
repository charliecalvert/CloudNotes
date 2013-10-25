Week05
======

This is an overview of Week 05 activities. We are focused on:

- Git
- Cloud 9
- Bootstrap
- Linux

Inclass
-------

- [The Deck](http://bit.ly/1icfes6)


Online
------

There will be at least three assignments this weekend. Here are two
to get you started. 

###Assignment 01: Media Query Video

Watch the following videos. There may be quizzes presented on them
either in class or online:

- [MediaQueries](http://youtu.be/xSiSUKV-GCY)
- [Linux Basics](http://youtu.be/pHIRpHDn7WQ)

The Linux Basics video starts by demonstrating how to log on to AWS.
You can ignore that portion of the video. It is just what goes on at
the command line, beginning about 40 seconds into the video that is 
important.

- [Linux File Basics on Elvenware](http://elvenware.com/charlie/os/linux/LinuxFiles.html)
- [Filezilla](http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#filezilla)

Take the quiz.

###Assignment 02: GitIgnore


When working on Cloud9, there are some files that you probably
don't want to check in. These include any files
in the following directories:

	.c9revisions
	node_modules

If you have already checked in these files to your repository, it is
simpler to leave there than to remove them. Nevertheless, you can
ensure that your folders don't get an larger than they are now.

Create a file called .gitignore. That's GITIGNORE with a PERIOD in front
of it: .gitignore.

Create or open the file in your editor. This sounds like a simple 
thing, but on Linux, files that begin with a period are hidden. 
Right click on your folder in Cloud 9, and choose show hidden files. 
Now you can see files with names like .gitignore. 

Inside gitignore add the following two lines:

```
.c9revisions
node_modules
```

The first folder holds backup copies of files you have edited, and
the second holds libraries used by Node. Neither of these directories
needs to be stored on GitHub.

Add and check in your .gitignore file:

```
add .gitignore
commit -m "Adding GitIgnore File"
git push
```

When you are done, submit the URL of your repository.

###Assignment 03: Git Config

When you get a local copy of your GIT repository either on Windows,
VirtualBox, or Cloud Nine, there is a hidden directory called .git
that holds the actually repository, and files that configure the
repository. Read about it here:

- [Git Config on Elvenware](http://www.elvenware.com/charlie/development/cloud/Git.html#git-config-file)
- [Git Config on Git SCM](http://git-scm.com/book/en/Getting-Started-First-Time-Git-Setup)

I want you to right click on your main folder in Cloud 9. Choose "Show
hidden files." Locate your .git folder. Open it up and open up your
**config** file. Copy the entire contents of the file into the 
clipboard and submit it in the text area for the assignment.

The file I want you to submit should look, vaguely, like this:

```
[core]
	repositoryformatversion = 09090
	filemodes = hmmm?
	barefoot = socksMissing
	logallstudenterrors = please
[remote "origin"]
	url = git@github.com:someone/somerepo.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

It won't look exactly like that, but at least some of it will 
be quite similar.
