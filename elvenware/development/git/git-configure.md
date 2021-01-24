# Configure

Configuring Git.

## Push an Existing Repository to the Cloud {#push-repository-to-cloud}

If you created a repository on GitHub with a pre-initialized **README.md** file and/or **.gitignore**, then just clone your repository as [described elsewhere](http://www.ccalvert.net/books/CloudNotes/Assignments/GitNewRepo.html#clone-repo). For instance:

```bash
git clone git@github.com:USERNAME/REPO_NAME.git
```

Cloning an existing repository, as shown above, is the simplest way to get started, and is the technique you should probably use. There are times, however, when it is useful to understand how to first create a local repository, and then push it into an empty repository on a cloud site such as GitHub or BitBucket. Though it is simpler to have a pre-initialized **README.md** and then clone a repository, there is much to be learned from following the steps outlined below. Every single fact you learn about Git makes you a bit more employable. Git is central to web development in many shops and a deep knowledge of its working can help make you very employable.

Once again, this scenario shows how to start a repository on your hard drive, then push it to an empty repository on the cloud. This lesson also demonstrates how to push an existing repository to the cloud if the cloud version of your repository is empty.

**NOTE**: _Since this section has caused confusion for a few students, I want to emphasize again that normally you don't need to use any of the commands in this section. Normally, you clone your repository once, then use **git status**, **git add**, **git commit** and **git push** to perform basic functions. That is all you need. There is no need, in normal cases, to use any of the commands shown in this section. They can, however, be useful if you have an existing repository on your hard drive, and want to push it to an empty repository in the cloud. In my classes this is not something you need to do very often, hence, most students can just skip this section._

To get started enter the following, where **lastname** should be your last name, in all lower case letters. Be sure to use dashes instead of underscores, and don't use any upper case letters:

```
cd ~/Git
mkdir isit320-lastname-2017
cd isit320-lastname-2017
git init
```

For instance, here we create a directory and navigate into it:

```
mkdir isit320-calvert-2017
cd isit320-calvert-2017
```

Now issue this command where the details will differ in your case:

```
git remote add origin git@bitbucket.org:username/isit320-lastname-2017.git
```

You can find the exact string, or something very close to it, in GitHub or BitBucket. For instance, when you first create a repository in BitBucket, this string is displayed in the confirmation page for the creation of your repository. For existing repositories, you can find something very like that string by choosing **Actions** (...) and **Clone** from the navigation menu on the left.

Now create a README file in [markdown][markdown] format:

```
echo lastname >> README.md
```

## More on git remote add origin {#add-origin}

Sometimes you need to set your local repository to point to the URL to your repository on GitHub or Bitbucket with a command like this:

    git remote add origin ssh://git@bitbucket.org/lucia/myrepo.git

Suppose you create a new repository:

<pre>mkdir foo
$ cd foo
$ git init
</pre>

Now you have a new repository. Your **.git/config** file looks like this:

<pre>
$ cat .git/config
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
charlie@MountainStreamsLinux
</pre>

Now run our command and then look at **.git/config**

<pre>$ git remote add origin ssh://git@bitbucket.org/lucia/myrepo.git
~/temp/foo
$ cat .git/config
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[remote "origin"]
	url = ssh://git@bitbucket.org/lucia/myrepo.git
	fetch = +refs/heads/*:refs/remotes/origin/*
~/temp/foo
</pre>


## Git CONFIG File

The Git config file holds several important facts. One of the most important is the URL used to access your Git repository.

The config file is called **config** and it is stored in a hidden directory at the root of your repository called .git.

To set your global user.email, you can write something like this:

	git config --global user.email "me@somewhere.com"

This information is usually written to **$HOME/.gitconfig**. Here is a sample file:

```
$ cat ~/.gitconfig
[user]
	email = charlie@example.com
	name = Charlie on RohanElf
[push]
	default = simple
[diff]
	tool = meld
```

On Windows, you might find the file here:

	c:\users\username\.gitconfig

On Linux:

	\home\username\.gitconfig

Or on the Mac:

	\users\username\.gitconfig

If you are a guru, and this gets really mixed up, try looking in:

	C:\Program Files (x86)\Git\etc\profile

In particular, one time I found my environment had a variable in it called HOME that was pointing to some nonsense value like /home/ubuntu, even though I was on a Windows machine.

In the .git directory you will find your config file. You can just edit that file with a text editor. On the other hand, you can use the following to set values in the global config file found in the main .git directory. The main .git directory for a user is usually found in your home directory on both Windows and Linux.

    git config --global user.name "charliecalvert"
    git config --global user.email "noone@nowhere.net"

You can pass in a length of time you want git to cache your password:

    git config --global credential.helper cache --timeout=900

## Configuring GIT

I describe how to use GitGui below. If you are working from the command line, go to your home directory and open **.gitconfig**. You may prefer to just view this file, and use the commands mentioned below to edit it. Or, you could edit it directly. The changes that need to be made are fairly obvious.

My .gitconfig looks something like this:

	[user]
	email = someone@somewhere.com
	name = Charlie CedarIsle Calvert
	[push]
	default = simple
	[gui]
	recentrepo = C:/Src/Git/Simple02
	recentrepo = C:/Src/Git/Writing
	recentrepo = C:/Src/Git/CloudNotes
	recentrepo = C:/Src/Git/JsObjects

As you can see, I've set up the **email**, **name** and **push | default** options.
If you don't set up your user name and email as described above,
you may see this message at some point:

```
Your name and email address were configured automatically based
on your username and hostname. Please check that they are accurate.
You can suppress this message by setting them explicitly:

    git config --global user.name "Your Name"
    git config --global user.email you@example.com

After doing this, you may fix the identity used for this commit with:

    git commit --amend --reset-author
```

To resolve this message, just follow the instructions. For instance, you could type
something like the following:

```
    git config --global user.name "Charlie Calvert on EC2"
    git config --global user.email charlie@example.com
```

When you do this, you are changing the settings in your **~/.gitconfig** file.

If you type the last suggested command, the one about amending your commit, you may end up in an editor such as **nano** or **vim**. If you can handle that, then go ahead and do it, otherwise, you can relatively safely skip that step. All that will be missing is the name of the committer in your repository for this particular commit. Later commits will have your name.

You may also see a message like this:

```
warning: push.default is unset; its implicit value is changing in
Git 2.0 from 'matching' to 'simple'. To squelch this message
and maintain the current behavior after the default changes, use:

  git config --global push.default matching

To squelch this message and adopt the new behavior now, use:

  git config --global push.default simple
```

I respond to this message by typing the following:

    git config --global push.default simple


For those who are interested, let's leave the command line and discuss GitGui. When you first open GitGui, you should set up your user name and email. From the menu, select **Edit | Options**.

What you write in the GitGui options ends up in the email and name fields of **.gitconfig**, and vice-versa. It is important to have both of these fields filled out from the start.

If you change the information for a particular repository in GitGui
so that it differs from your global values, then that information
will appear in the config file from your repository. If it is the
same as the global values, the same as the values in .gitconfig, then
it will not appear in the config file for your repository.

There is a third option beyond what is mentioned above. You can look at the **.git/config** file from a particular repository. Remember that **.git** directory is hidden on both Windows and Linux. I usually only open the config file if I want to change the URL for a repository, but you can do more in there if you want. For now, I'll leave those options up to you to explore.

## Git URLs and SSH

There are two primary types of Git URLs:

- SSH: git@github.com:charliecalvert/JsObjects.git
- HTTPS: https://github.com/charliecalvert/JsObjects.git

I prefer using SSH since it does not involve using a password. In my opinion passwords are both more difficult to use and more likely to cause a security risk than an SSH key. Also, it is useful to understand how SSH keys work. It is, in my opinion, useful to know how to:

- Recognize at a glance whether you are using an SSH or an HTTPS URL.
- How to manually convert an HTTPS URL to an SSH URL and vice versa. By this I mean that it is useful to know how to edit these URLs in a text editor in order to convert them from one format to the other.

Here is how to think about the parts of a Git URL:

```
git@github.com:<MY_USERNAME>/<MY_REPOSITORY>.git
https://github.com/<MY_USERNAME>/<MY_REPOSITORY>.git
```

There are three ways to interact with a Git repository on a site like GitHub
or Bitbucket:

- You can have read only access to the repository. This will let you check files out, but you cannot make changes and check them back in. This is what you want if you are using some third party library.
- You can have HTTPs access to the library, which will enable you to check in and check out. Access to the library is then usually controlled with a user name and password. If you are uncomfortable with SSH, this will probably be the simplest option for you.
- You can have SSH access to the repository. If you are at all familiar with SSH, you will probably find this option easiest when working with Git. If you have a key loaded with a tool like *Pageant* or *ssh-add*, then you can check in and check out without having to worry about typing in your user name and password.

*NOTE*: Many tools, such as GitHub for Windows, can handle your password for you automatically. That means they work well with HTTPS connections. To get that benefit, you need to be in the GitHub GUI, or in the shells associated with those GUI's. These tools work well, and I encourage you to use them. However, there are times when it is nice to be able to check in and out of Git without having to use a specific tool. In those cases, many people will find it easiest to use SSH.

To connect to a site using SSH, you need to do two things:

- Load or reference your SSH private key on your local machine.
- Cache your SSH public key on the remote machine. Both Bitbucket and GitHub have locations on their web site where you can cache your public keys. Start by clicking on the icon on the upper right corner of the web page. On Bitbucket, choose *Bitbucket Settings - SSH keys*. On GitHub, choose *Edit profile - SSH and GPG keys*.

As mentioned above, there are several types of URLs you can use with Git. Only one of them sets up your repository to use SSH. When you use a URL that looks like the one shown below, then you are saying you want to work with a read/write copy of the repository in SSH mode:

	git@github.com:someone/JsObjects.git

None of this is specific to GitHub. The same syntax applies when working with files stored in any remote repository. Here, for instance, is an SSH URL for Bitbucket:

	git@bitbucket.org:someone/deleteme.git

Here is a URL for an HTTPS readwrite connection to a repository:

	https://github.com/charliecalvert/bc-basic.git

These URLs are easy to identify since they begin with the letters HTTPS.

*NOTE: Further down in this document you will learn about creating URLs for local
repositories.*

## Finding and Changing Git URLs {#find-change-url}

Recall that the URL for your repository is usually kept in the **.git** directory at the root of your repository. (This folder is usually hidden, even on Windows. You can look for hidden files or folders, or just go ahead and type *cd .git*, and assume it will work if you are in the root of your repository.) If you want to change the URL your repository uses by default, you can open the *config* file in your .git directory and edit this line:

	[remote "origin"]
	url = git@github.com:charliecalvert/JsObjects.git

You can view it by typing: **git remote show origin**. Alternatively, try this:

```
git config --get remote.origin.url
```

Here is the line in the config file that specifies your URL:

	[remote "origin"]
		url = git@github.com:charliecalvert/JsObjects.git
		fetch = +refs/heads/*:refs/remotes/origin/*

The conventional way to see this information is with the following command:

```
git remote show origin
```

At runtime, it might look like this:

```
$ git remote show origin
* remote origin
  Fetch URL: git@github.com:charliecalvert/JsObjects.git
  Push  URL: git@github.com:charliecalvert/JsObjects.git
  HEAD branch: master
  Remote branches:
    MakeHtmlConvert tracked
    master          tracked
```

Alternatively, try one of these:

```
git config --get remote.origin.url
git remote -v
```

To set the URL, do this:

```
git remote set-url origin git@github.com:my-user-name/my-repo.git
```

If you are uncertain about the URL for your repository, you should able to easily find it on either GitHub or Bitbucket.

### The SSH Key

If you are going to be using SSH to connect to your repository, then you want to be sure that you have your key loaded into memory. On Windows, I use Pageant (PuTTY). When you clone, it helps a lot if you use Pagaent. On Linux, you can use *ssh-agent* and *ssh-add*.

*NOTE*: When working on Windows, be sure to check your /users/username/.ssh folder for keys that tools like GitHub might be using. This will only come into play if you are not using Plink to handle your keys.

## Caching SSH Keys on Linux

On Linux, this is how I load an SSH key into memory so that I don't have to reference it each time I make a connection. (On Windows we use Pageant to perform this task.)

First I need to be sure ssh-agent is loaded. Then I add the key to the store.
Notice that in the first command we use backticks:

	eval `ssh-agent`
	ssh-add MyKey.pem

Try putting this in .bashrc to load ssh-agent when you log in to your bash shell:

	if [ -z "$SSH_AUTH_SOCK" ] ; then
	  eval `ssh-agent`
	fi

If you put this in .bashrc then **ssh-agent** will get loaded each time you open the shell, so you can end up with multiple copies of **ssh-agent** running. But you need to have it running in the current shell, so I don't see a good way around this.

You can also create a **~/.ssh/config** file that associates a domain with key. Here is the complete contents of an example file for connecting to GitHub.com with a key called Github.pem:

Host github.com
        IdentityFile ~/.ssh/Github.pem


If you get a warning about an unprotected key file, that usually means that you have not set up the permissions correctly for the key file itself. You should ensure that only the current user can read it:

	chmod 600 github_rsa

Or perhaps:

	chmod 600 MyKey.pem

Now try again, and it should go smoothly.

	ssh-add github_rsa

*NOTE*: I suppose you could even make the SSH keys readonly:

	chmod 400 github_rsa

After doing this, you should be able to access sites where you have shared your ssh public key.

## Git SSH Checklist {#checklist}

If you are having problems, check the following:

- Are you issuing the command from inside your repository?
- Have you loaded your SSH private key with Pageant, **ssh-add** or some other tool?
- Does the server you are trying to reach (ec2, Bitbucket, GitHub, etc.) have a copy of your public key?
- Does your **config** file use an SSH style URL (git@bitbucket.org vs https://bitbucket.org)?
- Have you loaded the correct public and private keys? In other words, does the private key you loaded match the public key on your server?
- Do you need to do a push or pull before proceeding?
- Have you carefully read any error messages that Git gives you? Have you tried searching on that error message?

Useful video:

- [Convert PEM File](https://youtu.be/EV9QSSX2w9I)


## Host Key is not Cached

The following error is a classic:

"The servers host key is not cached in the registry...connection abandoned."

To fix this, open PuTTY, and create a connection to Bitbucket (Bitbucket.org). Try to connect. You don't need to actually connect, you just need the dialog to pop up that asks if you want to store the key for the site locally. Answer yes. Then, if you actually connected, which is unlikely and unnecessary, disconnect. Now go back and try to connect again
using SSH. It should now work.

Another option is to type the following at the command line:

	plink MyUserName@bitbucket.org

This will also give you an option to store the key for the Bitbucket server in your known_hosts file. The *known_hosts* file is usually stored in your **.ssh** directory:


## Amend a Commit

You can amend the previous commit (i.e. after removing a bad file or even simply to change the commit message... add -m "message" after --amend)

	git commit --amend -m "My new message."
	git push -f

If you omit the push command you will get an error message like this:

	"...the tip of your current branch is behind..."

To test this out, type **git log** at your command prompt in Linux. It will show you the commits you have done in Git. Type **q** to exit the log page. If you type **git commit --amend**, a nano editor will pop up, and you can change the message or type in a new message, then use **ctrl-o** to save the message, press the enter key to confirm the save and then **ctrl-x** to exit the editor. Now type **git log** again, and you will see your new commit message in the log. Don't forget the second command, **git push -f**.

If the editor seems complicated, just use the -m flag to change the commit message. For instance, if your commit message for your last commit was "foo" and you wanted to change it to "bar", you would type

```
git commit --amend -m "bar"
git push -f
```

If you check your git log, you will see that the commit message is "foo" at first, and then after your amend it will be "bar".

References:

[Rewriting Git History]
  https://www.atlassian.com/git/tutorials/rewriting-history

[Edit an Incorrect Message in Git]
	http://stackoverflow.com/questions/179123/how-do-i-edit-an-incorrect-commit-message-in-git

This command can be useful if you accidentally sent some confidential files along with your original commit. That confidential info would still be tracked in history even though you removed it in subsequent updates.

Suppose you were in your local repository and typed **git add .** and then **git commit**. At this point, you realized that you did not want to send one of the files in your local repository to the main repository. You would want to copy that file to some safe place (because **git rm** will actually delete the file). Then you could type **git rm myfile.txt** and then **git commit --amend --no-edit**. The no-edit flag instructs Git to leave the commit message alone. If you wanted to, you could add a new message here or change your message. Once you have run the amend command, you will see that the new commit does not contain "myfile.txt".

```
git add .
git commit -m "This is the commit I am making without thinking"
git rm myfile.txt
git commit --amend --no-edit
git push -f
```

For those who are new to Git, or new to Version Control, just a couple reminders:

* The purpose of Git is to give you a complete record of your work on a
project. It saves all your work, and each version of your work. If you use
Git, it is almost impossible to lose work in such a way that it can't ever
be retrieved. Even if your entire hard drive explodes, destroying your
computer and all your work, the files that are stored on a remote Git
repository (Bitbucket or GitHub) are safe. They will not be lost.

* The commands that rewrite Git history, such as amend and rebase, can cause
you to completely lose code that you once checked in. Even worse, if you
issue one of the commands incorrectly, you could accidentally, and
permanently, delete files that you may still need. In other words, you may
do your homework, check it into Git, then amend Git, lose your homework, and
find that you can't retrieve it.

* Git is infinitely configurable. That is why it is sometimes hard to use.
There is seemingly nothing that can't be done with Git. It even allows you
to undermine the whole purpose of Git by allowing you to rewrite, or amend,
the history that it is carefully designed to save. This is my way of saying
that amend is a useful, but somewhat esoteric command.

Here is a notice from the Git documentation about this command:

"Don't Amend Public Commits

"On the git reset page, we talked about how you should never reset commits
that have been shared with other developers. The same goes for amending:
never amend commits that have been pushed to a public repository.

"Amended commits are actually entirely new commits, and the previous commit
is removed from the project history. This has the same consequences as
resetting a public snapshot. If you amend a commit that other developers
have based their work on, it will look like the basis of their work vanished
from the project history. This is a confusing situation for developers to be
in and it's complicated to recover from."

If your previous commit is just completely bad,  you can do a **git reset
--hard HEAD~1** (or ~2, 3 etc. however far back you want to reset) to
completely remove the last commit(s) and then a git push -f or --force  but
this removes everything that was changed in the last commit(s).

The git commit -amend affects only the files that were changed /removed
since the last commit.

There is also git reset --soft that is similar to git commit --amend so one
or the other may be preferred in a particular situation. But amending a
commit seems to be a way to fix simple errors in a previous commit.

## GIT Remote

Suppose you have an existing repository on your local machine, and an empty
repository on GitHub. Navigate to the folder that holds your local copy of
the repository. If issued from that folder, the following line ought to add
your local repository to the empty GitHub repository:

	git remote add origin ssh://git@bitbucket.org/ccalvert/deleteme.git

You can then type the following to see where your repository is set up:

	git remote -v

By default, you will have a remote called **origin**. If you want to be able to push and pull from multiple remote repositories, you can add new remotes with **git remote add**. This can be useful when working with Heroku. You might, for instance, want to maintain both a GitHub and a Heroku version of your repository. To delete a remote called **working**:

	git remote remove working

To delete a local branch named working:

	git branch -d working

## Repo on Local machine

On the remote machine where you want to host the repository do this:

```
mkdir isit-site-tools-calvertbc.git
cd isit-site-tools-calvertbc.git/
git init --bare
```

On the local machine from when you want to push to the remote:

```
git remote set-url pi charlie@192.168.2.33:/home/charlie/Git/WebCrafts/isit-site-tools-calvertbc.git
```

## Maintain Repository

Every little bit, run:

  	git gc

Verify it:

  	C:\Git\repo>git verify-pack -verbose .git\objects\pack\pack-4beeb...idx

## Script It

I can be impatient at times, but I've learned the hard way that rushing certain steps, or skipping certain steps, can end up causing me to spend a lot of time later trying to fix something that I broke through rushing or carelessness.

Sometimes I also take a moment to write a script that can help me automate certain steps. Running the script takes just a moment, yet the script can help me make thorough checks and avoid careless errors.

For instance, I maintain a lot, probably too many, repositories. So I've written the following script that checks each of the repos and lets me know if I have not pushed my most recent code. Then, I have a corresponding program that checks to make sure I've pulled all my most recent code so that I don't start working on code that is out of date. Things like **cn** and **i3c** are aliases that I use as shortcuts to navigate to a repository. For instance, here is i3c:

```bash
export GIT_HOME=$HOME/Git
alias i3c='cd $GIT_HOME/isit322-calvert-2017'
```

And here is the script:

```bash
#! /bin/bash


shopt -s expand_aliases
source ~/.bash_aliases

alias

function title() {
 echo -e "\n==============="
 echo $1
 echo "==============="
}

function winter() {
 title 'i3c Working Site'
 i3c && git status
}

function spring() {
 title 'isit322-calvert'
 i3c && git status

 title 'Prog272Calvert'
 p2c && git status
}

function fall() {
 title 'isit320-calvert'
 i3c && git status

 title 'Prog270Calvert'
 p2c && git status
}


title 'Git IO (charlie calvert)'
gitio && git status

title 'Cloud Notes'
cn && git status

title 'JsObjects'
jo && git status

title 'Writing'
wt && git status

title 'Elf Site'
elfsite && git status

title 'Elven Tools'
elventools && git status

title 'Elven Assignments'
elfa && git status

spring
```

Copyright &copy; 2017 by Charles Calvert
