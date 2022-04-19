---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/GitDualRepos.md
relativePath: Assignments/GitDualRepos.md
title: GitDualRepos
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: GitDualRepos.md
fileNameHTML: GitDualRepos.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Git Dual Repo gives you a chance to open two views on your repository on one machine. You can then add, commit, push and pull on one machine, but see the results on two repositories.

There are several goals to this exercise. I will try to explain a few of them in the rest of this section of the assignment.

Most of us will be working on at least two machines:

- Our school machine
- Our home machine.

By creating two versions of repository on one machine, I am, to some degree simulating the actual problem you will face:

- A repository at school
- A second copy of the that repository at home.

In this assignment, both repositories will be on a single machine, but the lessons you will learn and skills you acquire are the same as those you will need when working on your school and home machines. The point is to learn how to work with two versions of a single repository.

**NOTE**: _Again, I want to emphasize that using the same laptop at home and school is not a good strategy for this class. If you do that, you will use only a subset of Git's functions compared to those who maintain two different copies of their repository. Git, and GitHub, are so ubiquitous in today's programming community that you want to know everything you can about them. In the unlikely event that you can get hired without demonstrating an in depth knowledge of Git, you will still face challenges when you do get hired. You will, during your first few weeks, likely be required to do some relatively complex things with Git. That's not the right time to be learning how Git works. At that point, you want to establish your reputation at the company by focusing on your job, not your tools._

A second, related, reason for completing this exercise is that it will help you deal with the conflicts you encounter when you make changes to the same line in the same file in two different versions of your repository. This is a problem that occurs quite frequently. In fact, if you are working with a larger team, it is not a problem, but just a fact of life when using Git. Whether you encounter the problem through carelessness or through the course of a normal work flow, you have to know how to deal with it.

## Step One

Find your existing repositories. For now, I'm assuming you have a repository at the following location:

```.code
~/Git/prog270-lastname-2016
```

**NOTE**: _Your repository may actually be named isit320-lastname-2016 or something similar. Or perhaps even something entirely different. I'm assuming that most readers can mentally make such as adjustments as necessary. At any rate, for this example I'll use prog270-lastname-2016 as the name of the repository, and you can just substitute the actual name of your repository as necessary._

This repository was created during a previous class. Navigate to your repository and check the status of your repository:

```
cd ~/Git/prog270-lastname-2016
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

```.code
git add .
git commit -m "Updating readme"
git push
```

The example shown below is done in my CloudNotes repository, but I'm sure you can see how the same process would look in your own repository:

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

- **File | New Tab** (Ctrl-Shift-Tab)

Now navigate to your **~/temp** folder.

```
cd ~/temp
```

If this folder does not exist, then create it:

```.code
cd
mkdir temp
```

Now it is time to clone your repository. When you have completed this step, you will have two copies of your repository on your local machine, one in each of the following directories:

```
~/Git/prog270-lastname-2016
~/temp/prog270-lastname-2016
```

**NOTE**: _Git is a distributed version control system. When I say that you have two copies of your repository, it is important to understand that no one copy is innately more powerful than another. Each copy of your repository is fully functional, and has the same abilities as the other copies of your repository. Even the copy of your repository on GitHub has the same functionality as the copy you have on your local machine. Thus you can have identical or similar copies of your repository "distributed" over several machines and/or locations. Each copy has the potential to be identical to a second copy, but it will not be so until you push or pull your work to sync them up._

In order to clone your repository you need to know its URI. You probably already have the URI for your repository in several places, but you can get it from GitHub itself. Just sign in to your account, go to your repository, and it should be fairly obvious where the URI is displayed. Take the URI and prepend the words **git clone** in front of it. It will look something like this, but the details will differ on your system:

```
git clone git@github.com:username/prog270-lastname-2016.git
```

Run the above command from the temp folder. Now navigate into your repository and view the log:

```
cd prog270-lastname-2016
git log
```

If necessary, press **q** to escape from the log view.

## Step Three: Edit and Push {#edit-push}

Modify your **README.md** file. Open it in an editor such as **geany** and make some changes to it. For instance, type in the word "Here are some changes."

**NOTE**: _It is best to open geany first from the start menu or desktop (OS + D). Then issue the command to load your **README** file: **geany README.md**. Alternatively, open it like this: **geany READMEmd &**. Note the & symbol at the end. In either case, you will end up still being able to use the command the prompt after issuing the command. Otherwise, the command prompt will be "taken over" by geany until you close that application._

Now add, commit and push your work:

```
git add README.md
git commit -m "Modified README in dual repo test."
git push
```

You actually have some choice here. If you want, you can type **git add .** instead of **git add README.md**. (That's git add and a period.) When you use the period instead of a specific file name, then all changes to all files from your current directory on down get added. That probably does not make sense at this point, but often you will find that you edit five, six or more files in a single session, and want to check them all in at once. In that case it is easier to use the period (wild card) than to specify the files one at a time.

**NOTE**: _By "current directory on down" I mean your current directory plus all directories further away from the root than your current location. So if you are in **/foo/bar**, then files in **/foo/bar/baz** would get checked in, but not files in **/foo**._

## Step Four: Pull {#pull}

Now switch over to your other tab, the one that gives you a view of your **~/Git/prog270-lastname-2016**. In that tab, pull down your changes and view your **README.md** file:

```
git pull
cat README.md
```

This is the basic rhythm that you will use when working with Git:

- Modify the file in one copy of your repository. Push it to GitHub.
- Pull the file in second version of your repository.

Now you have the same version in both copies of your repository. You have synced the contents of your projects across two repositories. In this exercise, both copies of the repository are on one machine. However, if you have one copy of your repository on the school machine, and one on your home machine, then you have just synced up your content between the two machines.

**Note**: _When working with text files, such as source code, this is really the only reliable way to sync the content of two machines. It ensures that all versions of your work are accessible to you at all times. It also has the benefit of backing up your work. If you try to use alternative methods, such as toting the file back and forth with a thumb drive, sooner or later you going to lose or corrupt your work. You also won't be able to roll back to a particular version of your work. If you try to do all your work on a single laptop, then you will not be regularly backing up work, and sooner or later you will run into trouble. Either you will lose some of your work, or you will lose the ability to go back to a particular version of your work._

Now open that version of the **README.md** file in geany, and make some changes to it. Add, commit and push them.

Switch back to the other tab and pull. Open your file in geany and edit the file and then Add, commit etc...

Repeat this process at least five times. I'm going to look at your log for your repository, and I want to see that you have edited your README.md file at least five times. The point is that I want you to learn how to push and pull your work between copies of your repository.

## Conflicts.

Now I want you to learn about Git conflicts.

1. Edit a single line your README.md file in copy of your repository.
1. Commit your work.
1. Switch to the other copy of your repository.
1. Open your README.md file and make different changes to same line you edited earlier.
1. Commit your work.
1. Go back to the first version of your repository. Pull.

At this stage you will be in an "error" state. You will have a conflict. Resolve the conflict as described here:

- [Git Merge Conflicts][git-conflicts]
- [Git Merge Tool][git-merge-tool]

[git-conflicts]: http://www.elvenware.com/charlie/development/git/git-merge.html#merging-code
[git-merge-tool]: http://www.elvenware.com/charlie/development/git/git-merge.html#merge-tool

## Step Seven: Share Repository

I'm not sure I told you to make me a member of your repository. If you have not done so already:

- Go to GitHub.
- Open your repository
- Select **Settings**
- Select **Collaborators**
- Add charliecalvert as a collaborator and give me permissions to edit your repository.

Doing this gives me read and write acccess to this repository, but not to any other repositories that you create. If you have something you don't want me to be able to edit, then put it in another repository.

## Turn it in

Check to make sure all your work is pushed. When turning in the assignment, submit the URL of your repository. Submit both the URL used to clone your repository, and the URL to find your repository on the web.

At minimum, I will look for a **.gitignore** file and an updated **README.md** file with something in it. I want to see some sensible text in your **README.md** file. When I run   **git log** I expect it to show that you committed your work multiple times. Perhaps 5 times at minimum. I can also look at the dates in the log, and see if it appears you actually were following along in class.

Checklist:

- README.md file present with reasonable content
- .gitignore present with reasonable content
- At least six commits in the log
  - I'm expecting to see some of the commits to have a comment on them about the conflict

I think it is probably nicest to use the Text page of the Canvas submit process to do this kind of thing. Then if you enter a URL, it will be clickable. If you submit the URL as a comment, then I have to block copy and paste it in to the browser address bar. That seems a small thing, but in a worst case scenario, it's gets old if I have to do it 25 times for two or three different assignments (50, 60 or more times total). So please use the the text page if possible.

## Evidence of a Conflict

I can spelunk through your commits to be sure you set up a conflict. At minimum, I want to see some commit comments that mention conflicts. I can see the comments on your commits by running **git log --pretty=oneline**:

```
$ git log --pretty=oneline
152b4d8f5dafb97e2c5c9ae3864e849e3feb5480 cloneall
fb4763e421120d6acdae01401b50191335fca7b8 Fixed conflict
c6d2dbdd24dc1bc6619faa8fab5aa718dcc10e84 Readme conflict
20181c7f8186573166d0ca6f12d12ad65a6f9a59 Setting up a conflict
f3374986b1c0b8c20b8e3b6f2d02634b4f875691 Updating readme with markdown
7a7d22cd5f5c62e0f3c3dc9383e2089b6d19545d updating my readme
e1f55e0018328150797ee7c5454844e427e283fd CloneAll updated
9f25b79d5573049e31254ef328a55bd9f18fdad7 Scripts directory added
f8e9fc5c7ad65af8567f43dc72aeec9d056c06bd First commit edit
2fca9860fd4668d69e9e94bf2884e57f248ef826 Initial commit
```

## Git Ignore

If it does not already exist, create the file:

```
geany .gitignore
```

And if they are not already present, add these items

```
node_modules
components
bower_components
.idea
*.zip
.metadata
Thumbs.db
npm-debug.log
```
