# Git Basics

In this chapter you will learn to use Git from the command line.

There are many GUI interfaces to Git. Why not use one of them? There are several reasons:

- There is no single GUI interface that is always available on all platforms in all circumstances.
- Each GUI interface is unique in its own way, but the command line interface is always the same. Once you know how to use it in one place, then, with very minor variations, you know how to use it everywhere.
- If you know how to use the command line interface, then most experienced computer users can quickly learn how to use most GUI interfaces.
- The command line interface is more flexible than most GUI interfaces
- And finally, the command line interface is not difficult to use for anyone who has a basic familiarity with the command line or shell for their platform.

Assumed:

- That you have a working repository. If you don't, then read

  - [Installing Git](git-install.html)

## Working with Files in a Repository {#git-files}

Suppose you have a file called **users.html** that you have either recently created or recently edited. You now need to tell Git to check in your changes; this means that you want to add your new or updated file to the repository. Whether the file is new or updated, here is how to check in the **users.html** file:

```
git add users.html
git commit -m "This is my message about the way I updated users.html"
```

Now you have everything checked into your local copy of the Git repository. To
push these changes to your GitHub, Bitbucket or other remote copy of the
repository, issue this command:

	git push

Now, lets add a folder named temp and a file named foo.txt to the repository:

    mkdir temp
    cd temp
    echo foo > foo.txt
    cd ..

The above commands create a new folder called **temp**. The second line
shows how to navigate into the folder. The third line creates a new file
called **foo.txt** with the contents being the single world *foo*. Finally
we navigate back to the original directory where we were before we created
the **temp** directory.

Now add the changes and commit the work to the repository:

    git add temp
    git commit -m "adding temp"

After issuing the last command, you will see several lines of feedback from Git.
Now it is time to push your changes up to GitHub (or to wherever your
repository is stored).

    git push

If you do not have an SSH key and repository set up, you will now be asked for
your username and password.

Sometimes you will have conflicts between what is on the server and what
you have on your machine. In that case, do a merge. This will create a
local copy of your files with both sets of text in it. Open your file in a
text editor, find the places where the conflicts exist, fix them manually,
and then go through another add/commit/push cycle.

## A Typical Git Session {#typical}

Suppose you run git status and get this result:

    >git status
    # On branch master
    # Changes to be committed:
    #   (use "git reset HEAD <file>..." to unstage)
    #
    #       modified:   Cordova/CordovaInput/assets/www/index.html
    #
    # Untracked files:
    #   (use "git add <file>..." to include in what will be committed)
    #
    #       foobar.txt

Here you can see that one file, **index.html**, has been modified. Another file, called **foobar.txt**, has been created. To commit them both, do this:

    git add .

That's **git add** followed by a period. The period is a wild card saying: "Add everything that has been changed." Now check your status:

    >git status
    # On branch master
    # Changes to be committed:
    #   (use "git reset HEAD <file>..." to unstage)
    #
    #       modified:   Cordova/CordovaInput/assets/www/index.html
    #       new file:   foobar.txt
    #

As you can see, there are now two files waiting to be committed. You can commit them like this:

    >git commit -m "Update index.html to support tiger attacks, add foobar.txt to ward off pollen smears."
    [master c91d5fc] Update index.html to support tiger attacks, add foobar.txt to ward off pollen smears.
     2 files changed, 2 insertions(+), 1 deletion(-)
     create mode 100644 foobar.txt

Now push them to the repository:

    >git push
    Counting objects: 14, done.
    Delta compression using up to 8 threads.
    Compressing objects: 100% (6/6), done.
    Writing objects: 100% (8/8), 633 bytes | 0 bytes/s, done.
    Total 8 (delta 5), reused 0 (delta 0)
    To git@github.com:charliecalvert/Simple02.git
       16e7d40..c91d5fc  master -> master

If you type **git reset** then you can undo an add. When you issue a **git add** command you move one or more modified files to the staging area. If you type **git reset** you move them back out of the staging area. You undo the add.

## Create a New Repository

Suppose you want to create a new repository. Typically you would start by creating the repository on a remote service such as Bitbucket or Github.  After signing into your Bitbucket or GitHub account, you will see a button for creating the repository. Push the button and create an empty repository. Don't put anything in the repository, not even a README.md file. Just leave it empty.

Next, make sure [you have an SSH private key and public key pair][ssh] on your client machine, and store the public key portion in Bitbucket or GitHub, depending on the service you are using. To do this, first open the public key (id_rsa.pub) in an editor such as **geany**, **nano** or **notepad++**. Block copy it, then paste it into the appropriate field on the GitHub or Bitbucket web site. In particular, on Bitbucket, choose **Bitbucket settings** from the icon in the upper right portion of the Bitbucket site, and then select **SSH keys** from the menu on the left. On GitHub, choose the **Profile picture** icon at the top right of the site, and then select **Settings** and then **SSH and GPG keys** from the menu on the left.

Don't forget to call ssh-add on your private (id_rsa) key, as described at the link shown above. Typing ssh-add at your command line will prepare your client machine to connect to GitHub or Bitbucket and will take care of authentication for you.

Setting up SSH may seem a little complicated the first time you do it, but it will save you a lot of aggravation over time. The great advantage of using Git is that you can do your work in a variety of places, on a variety of machines. You will save your work to one repository on GitHub or Bitbucket, but you can clone that repository to as many machines as you want. As long as you remember to push your work to the repository on GitHub or Bitbucket, and then pull it back down onto the machine you are using, you will be all set to do your work. Both pushing from your client machine to the main repository on GitHub or Bitbucket and pulling updated work from the main repository down to your local client machine can be very easy with SSH. All the authentication happens in the background and pushing and pulling from the repository is nearly effortless. Without SSH, you will find that typing your password over and over is not much fun.

[ssh]: http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#sshKeys

Now that you have SSH set up, go to the directory you want to use as the basis for your repository. If you don't have such a repository, then start from scratch:

	mkdir MyRepo
	cd MyRepo

Now initialize Git by typing typing **git init**.  This converts an ordinary directory into a Git repository. In particular, it creates a hidden directory called **.git**. That directory stores all the files necessary to configure and maintain your repository.

Then get the command from Bitbucket or GitHub that is used to designate where your remote repository resides. The command might look like this, though the exact url at the end will likely differ in your case:

	git remote add origin ssh://git@bitbucket.org/lucia/myrepo.git

Then add some content to your repository and add and commit your content:

	echo MyReadMe > README.md
	git add README.md
	git commit -m "Adding a readme to my new repo"

If you have multiple changes that you want to add and commit at one time, then use a period in your call to **git add**:

	git add .
	git commit -m "Initial commit"

In the first example, we added just a README.md file to the repository. In the second example, we added any new or updated files to your repository.

Finally, add the following command to push your repo to Bitbucket:

	git push -u origin --all

After this first time, you will be able to push like this:

	git push

It's only the first time you need to add **-u origin --all**.

To sum up, if you have an existing repository, and you want to push it from the shell do something like this, where the exact URL for your repository will of course be different from the one shown here:

```
git remote add origin git@github.com:charliecalvert/DeleteMeNow.git
// Add some content
git push -u origin master
```

Sometimes you will have a session that looks like this:

	G:\Src\Git\foo>git push -u origin --all
	No refs in common and none specified; doing nothing.
	Perhaps you should specify a branch such as 'master'.
	fatal: The remote end hung up unexpectedly
	Everything up-to-date

If you get an error like that, it means you forgot to run git add and git
commit.

Here is a summary of the steps:

* If you are using Windows, load your SSH private key in Pageant and ensure your public key is stored on Bitbucket. If you are on a Linux machine, type ssh-add at the command line and be sure your public key is stored on Bitbucket.
* Go to the directory you want to export and type: **git init**
* Use the **git add** and **git commit** commands to commit your files into your new repository.
* Then type: git remote add origin ssh://git@bitbucket.org/lucia/myrepo.git
* Then type: git push -u origin --all

Here are the instructions from GitHub, which are just a variation on what I write above:

```
echo "Some Text" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:charliecalvert/DeleteMeNow.git
git push -u origin master
```

Here are the instructions from Bitbucket, which are also just another variation on what I say above:

```
mkdir /path/to/your/project
cd /path/to/your/project
git init
git remote add origin git@bitbucket.org:ccalvert/deletemenow3.git

echo "Charlie Calvert" >> contributors.txt
git add contributors.txt
git commit -m 'Initial commit with contributors'
git push -u origin master
```

## Running Git on Windows

If you use PuTTY, it will probably be simplest for you if you use Git with
Plink, which is part of PuTTY. During the Git SCM install, you have the
chance to set this up, as shown in the screenshot below:

<!-- img class="materialboxed sizer" src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/GitScm01.png" alt="Use plink" -->

![Use plink](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/GitScm01.png)

If you have already installed Git, don't despair! All the option above does is
set an environment variable named GIT_SSH. If you chose the option shown in the
screenshot, then when you type SET at the command line, you should find something
like the following value for GIT_SSH:

	GIT_SSH=C:\Program Files (x86)\PuTTY\plink.exe

Since you have a deep knowledge of environment variables, you know how to modify
this variable using the Environment Variables dialog.

<!-- img class="small" src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/GitScm02.png" alt="Set GIT_SSH env variable" -->

![Set GIT_SSH env variable](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/GitScm02.png)

Here is an example of how to configure the variable:

<!-- img class="small" src="https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/Git07.png" alt="Set the GIT_SSH environment variable" -->

![Set the GIT_SSH environment variable](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/Git07.png)

If you have been living a sheltered life, you can learn about about
environment variables here:

* [EnvVars](http://www.elvenware.com/charlie/os/windows/faq.html#environment)

A related issue is the "Host Key is not Cached" error, which is discussed
elsewhere in this document.

## Don't Nest Repositories

You should always have a mental image of the directory tree in which you do
your work. This can be important when you are creating a new repository. One
mistake that newcomers often make is to nest one Git repository
inside another. For instance, suppose you have a repository here:

	d:\src\git\Repo01

In most cases, you don't want to add another repository inside this existing repository:

	d:\src\git\Repo01\Repo02

It is not illegal to do this, but it is not likely that you did it on
purpose, and once you have made the mistake it is hard to undo.

You can fix this error, but you don't want to face this problem.
Either keep a clear mental image of your file directory structure, or use
the Windows Explorer to review your file structure before you create a new
repository. In general, a good plan is to create a folder called Git or
GitHub, and then create all your repositories as children of this folder:

	c:\git\Repo1
	c:\git\Repo2

Alternatively:

	c:\users\me\documents\git\Repo01
	c:\users\me\documents\git\Repo01

It is, of course, okay to use complex directory structures inside any one
repository. The mistake is not nesting directories, but nesting repositories.
For instance, the following is fine:

	C:\git\Repo1
	c:\git\Repo1\Dir01
	c:\git\Repo2
	c:\git\Repo2\Dir01
	c:\git\Repo2\Dir02

## Terminal is Not Fully Functional

You can get rid of this warning by defining an environment variable called **TERM** and setting it to **msys**.

On Windows, you can type:

	set TERM=msys

Or edit the Environment Variables for your Account and create a new variable
called **TERM** set to the **msys**.

On Linux, you export TERM = msys

	export TERM=msys

## Clone a Local Repository

With Bitbucket and GitHub so readily available, one might suppose that the origin for our repository should always be in the cloud. This need not necessarily be the case. Instead, we can have a local repository that is shared between multiple users on a single machine, or between users on a local area network. Here are some examples of how to clone a local repository:

```
	git clone file:////home/charlie/git/myrepo

  git clone file:////\$HOME/git/myrepo
```

Copyright &copy; 2017 by Charles Calvert
