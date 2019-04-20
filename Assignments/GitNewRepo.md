## Overview

This assignment is designed to help you create a new Git repository. The text covers both [GitHub](https://github.com/) and [Bitbucket](https://bitbucket.org/). If possible, you should prefer GitHub since it is _the_ central repository for code related to web development.

Since my students turn in assignments with Git, in some, but not all, cases it is important that their repositories be private. Free private repositories are available on both GitHub and BitBucket. GitHub has additional benefits if you sign up for the [Student Pack][github-edu]. The student pack provides $75 - $100 in free AWS Educate credits!

**NOTE**: *Since this document covers both GitHub and Bitbucket, you should proceed with caution. Take care to distinguish between the instructions for the two sites. Note that Git itself is an open source project entirely separate from either GitHub or BitBucket. Git is Git no matter where it is. Nevertheless, the websites for Bitbucket and GitHub have differences, so proceed with caution.*

I assume the user is running on Linux, but it should be possible to follow along if you are using Windows. Especially helpful for Windows users is the Linux subsystem for Windows. Again, you should prefer Linux as it, and the **macOS**, are the primary platforms for Web development. Windows is a good platform for Web development, but the leaders in Web development tend to use macOS and Linux as their development platforms.

See also:

* [Git Hub Guides](https://guides.github.com/)
* [Is Git Reliable?](http://www.ccalvert.net/development/git/git-introduction.html#reliable)
* [Git Slide Deck](http://bit.ly/git-basics)
* [Git on Elvenware][elven-git]
* [Git and Cloud 9](http://bit.ly/elf-cloud9)
* [Git Video][git-video]

## Preview

In short form, the steps to set up your GitHub account are:

*   Create an SSH Key Pair
*   Load the private key
*   Put the public key on GitHub
*   Create a repository on GitHub
*   Get the URI for your repository
*   Clone your repository

All of these steps are detailed in this document.

## Configure Git {#configure}

Git is probably already installed on your system. To confirm that it is installed, type **git**. If you get an error, then the likely solution is to install Git. Do it like this on Lubuntu:

	sudo apt-get install git

Whether Git was pre-installed on your system or not, there are a few steps you need to take to set it up. It is perhaps simplest to get these chores out of the way at the very start. Your goals will be to tell Git your:

- username
- email address
- preferred style to use when pushing data to the cloud.

Issue the following commands, editing as appropriate:

```
git config --global user.name "charlie at school"
git config --global user.email "noone@nowhere.net"
git config --global push.default simple
```

These commands are stored in your Git config file, usually found here **~/.gitconfig**. You can see the contents of the file by issuing this command:

```
cat ~/.gitconfig
```

**NOTE**: _Remember that the tilda (~) is a shorthand for your HOME directory. I should add that I'm oversimplifying a bit here. Learn more about the config files [here][gitconfig]._

For instance:

```
[alias]
	co = checkout
	br = branch
	ci = commit
	st = status
	last = log -1 HEAD
	it = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
	gds = for-each-ref --sort=taggerdate --format '%(tag) %(subject)'
	glog = log --date=short --pretty=format:"%h%x09%x09%ad%x09%s"
	glogn = log --pretty=format:"%h%x09%an%x09%ad%x09%s"
	glogc = log --pretty=format:"%h %Cblue%ad%Creset %ae %Cgreen%s%Creset"

[user]
	email = <PUT YOUR EMAIL HERE>
	name = Charlie on Mint Home
[push]
	default = simple
[diff]
	tool = meld
```

[gitconfig]: https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup

**NOTE** _Since I am usually not sharing my repository with a large number of users, I tend to use the name to identify the location from which I am working. For instance **charlie at home**, **charlie at school**, **charlie on his laptop** etc. This is more than a bit quirky, and might not be at all appropriate in a corporate setting, but I nevertheless find it occasionally useful to know where I was when I did some work._

## Git Account GitHub

Use [Github](https://github.com) to host your [Git](http://git-scm.com/book/en/v2) repository. You have two choices:

- Create a new GitHub account if you don't have one already
- Use an existing GitHub account.

In either case, you should sign up for the Github [student pack][github-edu]:

- The student pack used to take days to set up. Now the delay is usually only a few brief minutes.
- With the student pack you can create private repositories for free.

## Git Account BitBucket

Use [BitBucket](https://bitbucket.org) to host a private [Git](http://git-scm.com/book/en/v2) repository. You have two choices:

- Create a new BitBucket account if you don't have one already
- Use an existing BitBucket account.

## Create Repo Home {#create-home}

In GitHub or BitBucket, from the home page, create a new repository:

* Choose the **Create** or **New Repository** menu item near the top
* Select **Create Repository**

Name your Git repository like this, where **isit320** should be name of your class:

	isit320-lastname-year

For instance, your repository might have a name like one of the following, depending
on the class you are in and the current year:

```
prog219-calvert-2017
prog270-calvert-2017
prog272-calvert-2017
isit320-calvert-2017
isit322-calvert-2017
```

**NOTE**: *Throughout this and similar documents, the year field should be set to the current year. I may have written or last updated this document one or more years ago, but you should use your common sense when using the year field. If it is 2017, then set the year to 2017, even if my example uses some other year.*

Then make the following selections:

* Set the Type: Git
* Initialize with a **README** and **.gitignore** for **Node**. (GitHub only)
	* If you choose this option, then you can simply clone your repository after creating it.
* Set the Project options: Wiki, IssueTracking (Bitbucket only)
* Set the Language: JavaScript (BitBucket only)

Add these near the top of your **.gitignore** file:

```code
# Other
.idea
.vscode
.c9
bundle.js
*.js.map
```

**NOTE**: _On GitHub, it is possible to create a repository without any content such as a pre-initialized **README.md** or **.gitignore** file. If you do that, then the act of setting up your repository on your local machine is relatively complex. If you select the options to put a **README** or other content in your repository, then you need do nothing more than clone the repository you created on GitHub site. In other words, much of what follows is unnecessary, particularly the bits about **git remote add origin...**._

Be sure that **node_modules** is included in your **.gitignore** directory. Please understand that **node_modules** directories can be VERY large. Frequently they are several orders of magnitude larger than your base project. This is okay at first, but after about Week Three, repositories that don't use **.gitignore** to filter out **node_modules** become huge, taking a long time to download and taking up vast amounts of space on my hard drive. There are further complications due to subtle differences in the way these directories might look on my system and yours.

The bottom line is that I get quite frustrated by the extra work, time, and resources I expend when people forget to include **node_modules** in their **gitignore** file. Don't let this happen!

## Share Repository {#share}

Make sure you give me at least _read/write_ access to your repository. If you use:

- **GitHub**: Choose the Settings gear icon in the tabs over your repository listing. Select the **collaborators** page. My GitHub user name is **charliecalvert**.
- **Bitbucket**: Use the **send invitation** link and use **ccalvert** as my id. You can select it from a dropdown.

Look for settings below and to the left of the word Unwatch:

![Settings](https://s3.amazonaws.com/bucket01.elvenware.com/images/github-settings.png)

<p>Select Collaborate and type in my name, which is charliecalvert:</p>

![Collaborate](https://s3.amazonaws.com/bucket01.elvenware.com/images/github-collab.png)

## Set up the Git Folder

Let's now turn our attention from the browser to the Linux command line. Typically, this means that you will open or navigate to a terminal window in your Pristine Lubuntu instance. However, you can also perform similar work in Windows, the Linux subsystem for Windows or the Mac.

I like to keep all my repositories in a directory called **Git**. I first navigate to my **home** directory by issuing the **cd** command with no parameters:

 	cd

I can then type **ls** to check if my Git repository already exists. If it does not, I create it:

	mkdir ~/Git

If the command returns immediately with no errors then that means the directory was created successfully. If the directory already exists, then you will get an error similar to the following:

	$ mkdir ~/Git
	mkdir: cannot create directory ‘/home/charlie/Git’: File exists

In either case, you are good to go. The key point was to be sure you have a **Git** folder. If one exists, then all is well.

Once you have confirmed the presence of your **~/Git** folder, navigate into it like this:

 	cd ~/Git

## Clone an Existing Repository {#clone-repo}

Assuming you already have a repository on **GitHub** or **BitBucket** that contains some content, you can get a local copy of it by cloning it:

<pre>
git clone git@github.com:USERNAME/REPO_NAME.git
git clone git@bitbucket.org:USERNAME/REPO_NAME.git
</pre>

As explained in the previous section, I usually call **git clone** from my **~/Git** folder. The act of cloning a repository typically looks a bit like this:

<pre>
cd ~/Git
git clone git@bitbucket.org:ccalvert/deleteme06.git
Cloning into 'deleteme06'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (3/3), done.
Checking connectivity... done.
</pre>

After cloning your repository, make sure the following are in your **.gitignore** file:

```
# IDE Files
.idea
.c9
.vscode

# Package files
node_modules
bower_components
```

You can and should have more than just these items, but be sure at least this much is present.

## Git URLs

You can read about Git URLs on Elvenware:

- [Git URLs and SSH][urls-and-ssh]
- [Finding and Changing URLs][find-change]

[urls-and-ssh]: http://www.elvenware.com/charlie/development/cloud/Git.html#git-urls-and-ssh
[find-change]: http://www.elvenware.com/charlie/development/cloud/Git.html#find-change-url

## Setup SSH {#ssh}

Make sure the Secure Shell ([SSH](https://en.wikipedia.org/wiki/Secure_Shell)) is installed. For instance, try issuing the **ssh** command and passing it **-V** as a parameter:

	$ ssh -V
	OpenSSH_7.4p1 Ubuntu-10, OpenSSL 1.0.2g  1 Mar 2016

As shown above, you should get information on the current version of ssh.

Pristine Lubuntu should have it installed, but just in case, or if you need to install it yourself on a new system, here is the command:

```
sudo apt-get install ssh
```

It won't hurt to run the command if SSH is already installed.

At the Linux command prompt Issue these commands, where the first command takes you to your home directory:

```
cd
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

Now copy your public key into the BitBucket SSH page. The first step will be to copy the key to your clipboard. Begin by navigating into the hidden **.ssh** directory created in the previous step.

```
cd ~/.ssh
```

We now need to block copy the key to the [clipboard][define-clipboard]. It might be enough to simply echo the key to your bash shell, and then copy it with the mouse or keyboard:

```
cat id_rsa.pub
```

An alternative might be to open the key in **geany** or some other text editor, and then select it in the editor with **Ctrl-A** and copy it with **Ctrl-C**. In any case, be sure you have the key saved to your clipboard.

Then in BitBucket:

* At upper right of page select your image
* Choose : Manage Account | SSH Keys | Add Key
* Paste in your public key and press save

[foo]:http://www.elvenware.com
[define-clipboard]: http://www.google.com/search?q=clipboard+computer

## Load SSH Key

Right now your private key is called **id_rsa** and your public key is called **id_rsa.pub**. You might consider renaming them to something more meaningful:

```bash
mv ~/.ssh/id_rsa ~/.ssh/Prog270-Fall-2016
mv ~/.ssh/id_rsa.pub ~/.ssh/Prog270-Fall-2016.pub
```

At this point, you should be able to load your SSH private key into memory:

```bash
ssh-add ~/.ssh/Isit320-Fall-2015
```

If this works as expected, you should see the words **Identity added** in the response:

```
ssh-add ~/.ssh/Prog270-Fall-2016
Identity added: /home/charliecalvert/.ssh/Prog270-Fall-2016 (rsa w/o comment)
```

At this point, you are all set to begin pushing and pulling data from your repository, as described below.

**NOTE**: *I should have already added this code for you, but if you have trouble with ssh-add, make sure this code that loads ssh-agent is found near the bottom of your /home/username/.bashrc file:*

```
if [ -z "$SSH_AUTH_SOCK" ] ; then
    eval `ssh-agent`
fi
```

You will need to load your SSH key with **ssh-add** each time your start a new bash (command line) session. Or at least you will need to do so each time you reboot lubuntu.

```
ssh-add ~/.ssh/Prog270-Fall-2016
```

When you want to connect to a remote machine using SSH, you have to specify which private key to use, or at least the location of your private keys. If you get a **permission denied** message, this is likely because:

- You don't have the private key on your machine that matches the public key on the server you want to access
- You have not given you public key to the site you want to access
- Or, if you do have the key, and its public key is installed in the authorized_keys file on the server you want to access, then you have not made the private key accessible on your local machine.

In most cases, it is the third of these problems that causes students trouble. A simple way to make a private key accessible is to use **ssh-add** to register it with a program called **ssh-agent**. Then, when you try to access a remote site, all the keys registered with the **ssh-agent** are tried, and if one of them matches, you are golden.

## Automating the load process

If you don't want to perform this task manually, you could add the following code at the bottom of your **~/.bashrc** file:

```
ssh-add ~/.ssh/Prog270-Fall-2016
```

To add the line, open your **~/.bashrc** file in either nano or geany. For instance:

```
geany ~/.bashrc
```

Adding this line is guarrenteed to load your private key for you because your **.bashrc** is processed each time you open the bash shell (command line). If you ever want to manually load your **.bashrc** file, you can execute this code:

```
source ~/.bashrc
```

To learn more, search for the Linux **source** command with Google.

Alternatively, I have created an alias in our **.bash_aliases** file called **sshadd**. (Not **ssh-add** but **sshadd**.) It depends on a symbolic link that you must create in your **~/.ssh** directory. Create the link like this:

```bash
cd ~/.ssh
ln -s Prog270-Fall-2016 main-key
```

Where Isit320-Fall-2016 is the name of the private key you want to load when you type **sshadd**. This second approach means you can easily load the key at any time. This is perhaps better than loading it automatically each time you start a new bash shell instance. In particular, if you load it in your bashrc, then you might end up with multiple instances of it running. If you load it by hand **sshadd**, you will likely end up with only one instance.

_**Zip up both the private and public key and upload it to Google Drive**_. That way you can download it at home, and use the private key at both home and school. You don't have to do it that way, but it allows you to skip the step of creating a new key at home, and uploading that public key to BitBucket. Either system works, and there are arguments in favor of each system, but I want to at least suggest that you do things this way.

Suppose you created **main-key** with a command like this:

```
ln -s MyKey main-key
```

When you type **ls -la** you see **main-key** in red, which means it is not value. After some thought, you realize that you made a mistake creating the key. Perhaps the name of your key was **Prog270Key** and not **MyKey**. Before trying again to create a new version of main-key, first delete it:

```
rm main-key
```

Now try again:

```
ln -s Prog270Key main-key
```

## Load in .bashrc

If you've got everything set up right, and don't have a password on your private key, you could also consider uncommenting these lines at the bottom **.bashrc**.

```bash
# Edit and uncomment to load a key automatically.
ssh-add -l | grep -q "main-key"
if [ $? -eq 0 ]; then
    echo main-key already loaded
else
    echo Loading main key.
    ssh-add ~/.ssh/main-key
fi
```

This will automatically ensure that **main-key** is loaded everytime you open a bash shell. More specifically, it will first check if the key is loaded, and if it is not, it will load it.

## Alternative Method

If you are struggling to load your key, try [this][susk], it's easier. But please remember how you did it.

## Create gitignore File {#gitignore}

Before pushing your repository to the cloud, you should be sure you have a **.gitignore** file. This file should have been created when you built your Repository on GitHub, but if you missed that step, then read on.

Your **.gitignore** files tells Git which files to ignore, which files should not be pushed to the cloud. This may seem like an unimportant step, but for a developer to try to use Git without setting up **.gitignore** file would be a bit like trying to drive a car that had no break. The inevitable result: a 95% chance of rain accompanied by high winds and thunderstorms.

If it does not alread exist, in the root of your repository, create a **.gitignore** file with the following items in it:

```
node_modules
bower_components
coverage
.metadata
.idea
.c9
.vscode
.expo
platforms
Thumbs.db
*.zip
npm-debug.log
bundle.js
*.js.map
```

You can create the file with the [nano][nano] editor, or do it like this from the Bash shell:

```
echo node_modules >> .gitignore
echo bower_components >> .gitignore
echo coverage >> .gitignore
echo .metadata >> .gitignore
echo .idea >> .gitignore
echo .c9 >> .gitignore
echo .vscode >> .gitignore
echo .expo >> .gitignore
echo platforms >> .gitignore
echo Thumbs.db >> .gitignore
echo *.zip >> .gitignore
echo npm-debug.log >> .gitignore
echo bundle.js >> .gitignore
echo *.js.map >> .gitignore
```

Files that begin with a period are hidden. To see them, type **ls -la** or **ls -a** or **ll**

**NOTE**: *You can learn more about nano by searching for [cheat sheets][nano-cheat].*

[markdown]:https://www.google.com/search?q=markdown+syntax
[nano]:http://www.tuxradar.com/content/text-editing-nano-made-easy
[nano-cheat]:https://www.google.com/search?q=nano+editor+cheat+sheet

## Commit your Work {#commit}

Now add, commit and push your content:

```
git add .
git status
git commit -m "Initial commit"
git push -u origin master
```

When we type Git add followed by a period we are asking Git to add all the changes we have made to the repository. If you want to add just one file, issue a command like this:

```
git add README.md
```

In all cases, after doing an add, you should check your work to make sure all is going well. If, for instance, you see that you have accidentally added in a **node_modules** directory, then you should [cancel the add][git-reset], adjust your **.gitignore** file, and try again.

You only need to use **git push -u origin master** the first time you commit to your repository. After that, you can simply type **git push**.

When upi type **git push -u origin master** then:

* origin is BitBucket (or GitHub)
* master is the main [branch][branch] of you repository
* The u bit sets the upstream repository, the place where you pull and push from
	* In our case the upstream server is BitBucket or GitHub.

You can learn more about Git on [Elvenware][elven-git].

[git-reset]: http://stackoverflow.com/a/348234
[elven-git]: http://www.elvenware.com/charlie/development/cloud/Git.html
[branch]: http://www.elvenware.com/charlie/development/cloud/Git.html#working-with-branches

If you have problems, check these items:

- Is your shh key loaded properly?
- Does the URL in your **.git/config** match the URL you see in GitHub. It should begin with Git, not https. In general, it follows this format:
		- git@github.com:username/prog270-lastname-2017.git

Also, you can learn something about the keys that are currently loaded with this command: **ssh-add -l**. That's a small l for **list**. More details are [here][keyload01] and [here][keyload02]. Also, try [capital L][keyload03] to see public keys.

[keyload01]: http://manpages.ubuntu.com/manpages/precise/en/man1/ssh-add.1.html
[keyload02]: http://unix.stackexchange.com/questions/58969/how-to-list-keys-added-to-ssh-agent-with-ssh-add
[keyload03]: http://unix.stackexchange.com/questions/82489/how-to-check-which-ssh-keys-are-currently-active

## The Video

This video shows how to proceed:

- [video][git-video]

Other related videos are here:

- Git PlayList YouTube: [http://bit.ly/GitYouTube](http://bit.ly/GitYouTube)

Here is a deck with some information that you might find useful:

- Git Basics Deck: [http://bit.ly/git-basics](http://bit.ly/git-basics)
- Git on Elvenware: [http://bit.ly/elven-git](http://bit.ly/elven-git)
- Cloud Nine Deck: [http://bit.ly/elf-cloud9](http://bit.ly/elf-cloud9)

Please submit the URL of your repository in the Text Entry section of Canvas when you post this assignment. The URL you submit should, in a general way, follow this format:

	git clone git@bitbucket.org:lastname/prog272_lastname.git

You can get the exact phrase to submit by selecting the **Actions | Clone** menu item at the top left of the BitBucket site.

## Summary

- Create Bitbucket account if necessary
- Push create button
- Name: prog272_lastname
- Options: private, git, wiki, javascript
- Push create repository button
- Follow the instructions in "I'm starting from scratch" using the video as a guide to a few slight variations such as creating the .gitignore file with at least node_modules in it.
- When you are done, on the overview page choose send invitation, type in ccalvert and give me read write privileges.

## Turn it in

Check to make sure you:

- Used all small letters. No caps.
- Used hyphens instead of underscores
- Put the hyphens in the right place.

If you need to rename your repository, follow the instructions outlined later in this document.

Paste in the the URLs for your repository when you submit your assignment. There are two URLs that can be interesting:

* The URL for your BitBucket or GitHub repository
* The URL used to clone your repository

Examples, with the SSH style URL listed first:

* git@github.com:charliecalvert/JsObjects.git
* https://github.com/charliecalvert/JsObjects

Or:

* git@bitbucket.org:lastname/prog272_lastname.git
* https://bitbucket.org/ccalvert/prog219-calvert


Most of the time, when I ask for your Git URL, I want the SSH URL. It should be clear, however, that either URL will allow me to access your repository.

Whenever you need to send me information when submitting an assignment, you can either enter a comment or use the Text page. When possible, use the Text page, because you can insert live hyperlinks and relatively well-formatted text using that option. However, either technique will work.

## Hints

Various Hints

### Avoid Merge Conflicts {#merge}

Most of us have a copy of our repository:

* At home
* At school
* In the cloud (BitBucket, GitHub)

Nearly every day we:

* We push our repository to the cloud
* We pull our repository from the cloud:

We do that with these commands:

To push we typically:

```
git add .
git commit -m "Some message"
git push
```

Pull:

```
git pull
```

If you pull without pushing first, eventually you will hit merge conflicts. You will have one version of your code at home, another version in the cloud, and yet another version at school. This is bad. To avoid Merge conflicts:

* Don't forget to push before you go home
* And to pull as soon as you start work at home
* If you do get a merge conflict, then read this

### Identify a repository {#id-git}

You can identify a repository by looking for the hidden directory named **.git**. If that file
exists, then you are in the root of a Git repository.

In this listing, you can tell that the file called **README.md** is in a Git repository
because a long (l) listing (ls) of the directory with the hidden flag (a) reveals the existence of
the **.git** folder:

```bash
$ ls -la
total 16
drwxrwxr-x  3 charlie charlie 4096 Sep 24 10:55 .
drwxrwxr-x 14 charlie charlie 4096 Sep 24 10:55 ..
drwxrwxr-x  7 charlie charlie 4096 Sep 24 10:55 .git
-rw-rw-r--  1 charlie charlie    4 Sep 24 10:55 README.md
```

### Don't Nest Repositories {#git-nest}

Don't create one repository inside another unless you are sure you know what
you are doing. It is possible to nest repos, but it is special case and requires
specific knowledge on how to proceed.

In particular:

* Don't **pull** the Elvenware JsObjects repository into your repository.
* Don't create your repository inside the JsObjects repository
* Don't create your repository inside any other repository.

### SSH Config {#ssh-config}

Simplify your life with SSH Config files.

* [SSH Config][ssh-config]

### BitBucket Sample Code {#bitbucket-code}

Sample code from the BitBucket when you first create a repository. I'm
including this just because it.

Set up local directory:

```
mkdir /path/to/your/project
cd /path/to/your/project
git init
git remote add origin git@bitbucket.org:ccalvert/isit320-deleteme-2015.git
```

Create your first file, commit, and push

```
echo "Charlie Calvert" >> contributors.txt
git add contributors.txt
git commit -m 'Initial commit with contributors'
git push -u origin master
```

### GitHub Sample Code {#github-code}

Here is the sample code suggested by GitHub.

Create a new repository in an existing directory from the command line:

```
echo "# deleteme06" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:charliecalvert/deleteme06.git
git push -u origin master
```

Push an existing repository for the first time to a new repository:

```
git remote add origin git@github.com:charliecalvert/deleteme06.git
git push -u origin master
```

### RSA Fingerprints {#fingerprints}

It is possible to spoof a URL or even an IP address. As a result, when you
push and pull from BitBucket or GitHub, Git checks to see that the machine
you are connecting to is the correct machine. In particular, it looks in
this file for the fingerprint of your remote machine:

```
~/.ssh/known-hosts
```

If the machine you are going to connect to is not listed in known-hosts, then
the connection will be aborted.

When you first push to BitBucket or any new SSH server, you should be prompted
to confirm the authenticity of the site:

```
git push -u origin --all
The authenticity of host 'bitbucket.org (131.103.20.168)' can't be established.
RSA key fingerprint is 97:8c:1b:f2:6f:14:6b:5c:3b:ec:aa:46:46:74:7c:40.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'bitbucket.org' (RSA) to the list of known hosts.
```

When you type in **yes** at the prompt, the fingerprint for this server is
stored in your **known_hosts** file. You can read more about this process on
Elvenware.

See also:

* [More on SSH][more-ssh]
* [Best Practices Blog Entry](https://blog.0xbadc0de.be/archives/300)

If you ever need to remove a line from a known_hosts file, see this:

* [Remove from known_hosts][known-hosts-remove]

## Error Checks

If you get the error "Not a git repository", then it is likely that one of two things has happened:

1. You are not in your repository, and need to use **cd** to navigate into it.
- You are in your repository, but have not yet run **git init**. But remember, once you have created your repository for this course, this is no need to run **git init** a second time. Instead, just clone the repository.

If you try to clone your repository, and you get a public key error then it is likely that one of the two things has happened:

1. You have forgotten to load your private key with **ssh-add** or **sshadd**.
- Or you have loaded a private key, but failed to place its matching public key in BitBuctket/GitHub.

Remember that when you create a repository for the first time, you need to share it with me. To share your repository, you need to know my user name. On

- BitBucket it is ccalvert
- GitHub it is charliecalvert

Though it may confuse matters somewhat, I should perhaps add that it is not wrong to pull down an existing repository onto your machine for the first time by first typing **git init**. It is just that I think it is simpler to pull it down by cloning it. Also, we have to be sure never to type **git init** outside our repository, and particular, by typing it in our home directory or in the **~/Git** directory.

## Git Clone and Git Init

You can use **git clone** only on existing repositories. You can't use **git clone** if the repository does not already exist somewhere. Even if the repository is completely empty, you can still use **git clone**. There is, of course, a difference between an non-existent repository and an empty repository.

You can use **git init** to help you fetch an existing repository, or to create an entirely new repository that does not exist yet.

Once again, you can clone an empty repository, you just can't clone a non-existent repository.

- **git clone** sets up your local repository to use the remote cloud server for your repository. It also tells your local repository which branch to use.
- **git init** creates a repository, but does not automatically set up the remote server nor specify the branch.

To put the matter somewhat differently: **git clone** makes a copy of an existing repository, but gives you little control of the process. In most cases, you don't need that control, so use **git clone**. However, if you want more control, or more in depth understanding of how Git works, then use **git init**.

The following are two ways of doing the same thing. We could use either one when pulling down an existing repository with some content in it.

Use **git init** plus **git remote** plus **git pull**:

<pre>mkdir DeleteMe05
cd DeleteMe05
git init
git remote add origin git@bitbucket.org:ccalvert/DeleteMe05.git
git pull origin master</pre>

Or use clone:

<pre>git clone git@bitbucket.org:ccalvert/DeleteMe05.git</pre>

If we have an existing repository in the cloud, one that contains content, even if the only content is a README, then we usually don't want to use **git init**. Instead, we just use **git clone** and pull down the whole repository. We do this, in our case, from the **~/Git** directory. In other words, we almost never do it from inside an existing repository, or from inside a folder that we want to make the root of a new repository. You can use either technique to pull down an existing repository, but **git clone** is less likely to lead to errors because it has fewer steps and less typing.

Here are the instructions that BitBucket gives us for creating a new repository:

<pre>mkdir /path/to/your/project
cd /path/to/your/project
git init
git remote add origin git@bitbucket.org:ccalvert/deleteme06.git

echo "Charlie Calvert" >> contributors.txt
git add contributors.txt
git commit -m 'Initial commit with contributors'
git push -u origin master</pre>

Note that these instructions say **git push** while the first example I give above says **git pull**. Take a moment to look and see the difference. It's not obvious.

The **git push** shown in the BitBucket instructions only makes sense because we created an empty repository in BitBucket and we want to push new content that we created locally into it. If we have an existing repository with content, then use **git pull**.

One thing in favor of the code shown in my first example and in the BitBucket example is that it shows exactly what is happening, while Git clone does a lot of work behind the scenes. Still, **git clone** is a lot simpler to use... Perhaps BitBucket and GitHub use the somewhat more complex code simply to raise the bar a bit, and keep out complete neophytes?

## Set Git URL

The following information is for advanced users only. You do not need this if you are just getting started.

In your hidden **.git** folder, in a file called **config**, Git stores the URL for your repository. If you want to find that URL without opening up the **config** file, issue this command from inside your repository:

```
git remote -v
```

This should work for any repository on your system. For instance, try the above command in **JsObjects**.

If you want to change or set the URL you are using on your local machine, try something like this:

```
git remote set-url origin git@github.com:my-user-name/my-repo.git
```

If you are uncertain about the URL for your repository, you should able to easily find it on either GitHub or BitBucket.

## Keep it Simple

Don't over complicate this subject. In the past, I have talked students through some fairly complex things that can be done when creating a new repository. But over time I decided it doesn't have to be complicated. Instead:

- When creating the repository on GitHub put a **.gitignore** and Let me know if this helps. file in it.
- Clone the repository
- Add some files and changes. Then push.

Don't use any commands other than clone (once) and then:

- git status
- git add
- git commit
- git push

You shouldn't need any other commands. At least not at first. Don't try to set the origin or anything like that. Just clone your new repository one time. Then add, commit and push your code as needed.

After you start feeling very comfortable with the basics, then you can learn some more complex commands.

## Push Existing Repository to the Cloud

Details are [here][push-to-cloud]

## Rename Your Repository

Some students will not correctly name the repository the first time around. That is, they did not:

- Use all small letters
- Use hyphens in the correct places
- Used underscores instead of hyphens
- etc

If you have not correctly named your repository, go to GitHub and locate your repository. Click on the **Settings** icon near the top right of the page.

You will be taken to the **Settings** page. At the top of the **Settings** page will be an option to rename your repository. Select this option and rename your repository. This will change the URL for your repository.

Save your work. Copy the new URL for your repository. Resubmit your assignment, being sure to include the new name, that is, the new URL for your repository.

## Ruminations

Both at home, and at school, you want to have a ~/.ssh directory. In that directory, you should have a private key and a public key. The private key is only on your machines. Never give it to anyone else. The public key you insert into the proper dialog on GitHub (or BitBucket) or some other site as needed.

You have two choices:

- Use the same private key on home and school machine. Put the private key in a zip file, upload it to Google Drive, and download it from there on you second machine. That way you have the same private key on both your home and school machines. That means you need to put only one public key on GitHub.

Thanks to Emily Yu for inspiring this handy step by step guide to installing the key on your home machine:

1. Download the zip file and unzip it.
2. Use the terminal to locate the files and move both **prog272-key** & **prog272-key.pub** to the **~/.ssh** folder.
3. Create a symbolic link in the .ssh folder: **ln -s prog272-key main-key**.
4. Type **sshadd** to load your key
5. Navigate to the **~/Git** directory and clone your git repository

- Alternatively: Create two private/public key pairs, one at home and one at school. Then put both public keys on GitHub and or BitBucket.

The code for creating a private/public key pair can be seen here, and elsewhere in my notes:

http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#sshKeys

Be sure to look at this deck:

http://bit.ly/git-basics

And this document/assignment: http://www.ccalvert.net/books/CloudNotes/Assignments/GitNewRepo.html

It would definitely be a mistake to put a private key in a public Git repository. A private repository is probably okay to use, but still not recommended as eventually you may want to share your repository with others. Putting your public keys on Git is probably okay, but also probably not very useful. The best plan is to either create two or more pairs, or to create one pair and upload to Google Drive so you can download it as needed at home or at school.

If you want, it is possible to put a password on your private key.

- [http://stackoverflow.com/a/3818909](http://stackoverflow.com/a/3818909)
- [https://help.github.com/articles/working-with-ssh-key-passphrases/](https://help.github.com/articles/working-with-ssh-key-passphrases/)

<!--       -->
<!-- links -->
<!--       -->

[git-video]: http://youtu.be/HCoC3FbdcQk
[github-edu]: https://education.github.com/pack
[more-ssh]: http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#moreSsh
[ssh-config]: http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#ssh-config
[known-hosts-remove]: http://superuser.com/questions/30087/remove-key-from-known-hosts
[push-to-cloud]: http://www.elvenware.com/charlie/development/git/git-configure.html#push-repository-to-cloud
[susk]: http://www.ccalvert.net/books/CloudNotes/Assignments/LinuxWebUser.html#set-up-your-ssh-key
