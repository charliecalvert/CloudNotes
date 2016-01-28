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

```
cd ~/Git
```

Now it is time to clone your repository. When you have completed this step, you will have two copies of your repository on your local machine:

```
~/Git/prog270-lastname-2016
~/temp/qux
```

You probably already have the URI for your repository in several places, but you can get it from GitHub itself. Just sign in to your account, go to your repository, and it should be fairly obvious where the URI is displayed. Take the URI and prepend the words **git clone** in front of it. It will look something like this, but the details will differ on your system:

```
git clone git@github.com:username/prog270-lastname-2016.git
```

Now navigate into your repository and view the log:

```
cd prog270-lastname-2016
git log
```

If necessary, press **q** to escape from the log view.

## Step Three: Edit and Push {#edit-push}

Modify your **README.md** file. Open it in an editor such as **geany** and make some changes to it.

**NOTE**: *It is best to open geany first from the start menu or desktop (OS + D). Then issue the command to load your **README** file: **geany README.md**.*

Now add, commit and push your work:

```
git add README.md
git commit -m "Modified README in dual repo test."
git push
```

You actually have some choice here. If you want, you can type **git add .** instead of **git add README.md**. (That's git add and a period.) When you use the period instead of a specific file name, then all changes to all files from your current directory on down get added. That probably does not make sense at this point, but often you will find that you edit five, six or more files in a single session, and want to check them all in at once. In that case it is easier to use the period (wild card) than to specify the files one at a time.

**NOTE**: *By "current directory on down" I mean your current directory plus all directories further away from the root than your current location. So if you are in **/foo/bar**, then files in **/foo/bar/baz** would get checked in, but not files in **/foo**.*

## Step Four: Pull {#pull}

Now switch over to your other tab, the one that gives you a view of your **~/temp/qux**. In that tab, pull down your changes and view your **README.md** file:

```
git pull
cat README.md
```

Now open that version of the **README.md** file in geany, and make some changes. Add, commit and push them. Switch back to the other tab and pull. Switch back to geany and edit the file and the Add, commit etc...

Repeat this process at least five times. I'm going to look at your log for your repository, and I want to see that you have edited your README.md file at least five times.

## Step Five: Put AllTest in Repository {#alltest}

Now we want to copy your AllTest directory into your repository. Make sure you are in the root of your repository. Issue this command:

```
cp -r ~/Documents/AllTest .
```

That command says to copy the contents of the **AllTest** directory into your current folder. When you are done, you should have a folder in your repository that contains all the files from your **AllTest** directory.

Add. Commit. Push.

## Step Six: Pull AllTest

Switch over to your other local copy of your repository. Pull down **AllTest**:

```
git pull
```

Check to make sure AllTest is there. Go to GitHub, check to make sure AllTest is visible on GitHub

## Step Seven: Share Repository

I'm not sure I told you to make me a member of your repository. If you have not done so already:

- Go to GitHub.
- Open your repository
- Select **Settings**
- Select **Collaborators**
- Add charliecalvert as a collaborator and give me permissions to edit your repository.

Doing this gives me read and write acccess to this repository, but not to any other repositories that you create. If you have something you don't want me to be able to edit, then put it in another repository.

## Turn it in

Check to make sure all your work is pushed. When turning in the assignment, submit the URI and URL of your repository.

I think it is probably nicest to use the Text page of the Canvas submit process to do this kind of thing. Then if you enter a URL, it will be clickable. If you submit the URL as a comment, then I have to block copy and paste it in to the browser address bar. That seems a small thing, but in a worst case scenario, it's gets old if I have to do it 25 times for two or three different assignments (50, 60 or more times total). So please use the the text page if possible.

## Git Ignore

Create the file:

```
geany .gitignore
```

Add these items

```
node_modules
components
bower_components
.idea
*.zip
.metadata
```
