## Overview

This assignment is designed to help you create a new git repository. The text is oriented towards BitBucket and Linux, but it should be possible to use it with GitHub as well. I focus on BitBucket because they provide free private repositories. Since my students turn in assignments with git, it is important that the repositories be private.

See also:

* [Git Slide Deck](http://bit.ly/git-basics)
* [Git on Elvenware][elven-git]
* [Git and Cloud 9](http://bit.ly/elf-cloud9)
* [Git Video][git-video]

## Git Account

Use [BitBucket](https://bitbucket.org) to host a private [git](http://git-scm.com/book/en/v2) repository. You have two choices:

- Create a new BitBucket account if you don't have one already
- Use an existing BitBucket account.
- If you prefer GitHub or some other cloud repository, that should also work.
	- For GitHub, see the [student pack][github-edu]
	- The student pack might take a few days to set up
	- If the delay means you can't use the student pack for this assignment, apply anyway.

## Create Repo Home {#create-home}

In BitBucket, from the home page, create a new repository:

* Choose the Create menu at top
* Select **Create Repository**

Name your git repository like this, where **isit320** should be name of your class:

	isit320_lastname-year

For instance, your repository might have a name like this, depending
on the class you are in:

```
prog219_calvert-2015
prog270_calvert-2015
prog272_calvert-2015
isit320_calvert-2015
isit322_calvert-2015
```

Then make the following selections:

* Set the Type: Git
* Set the Project options: Wiki, IssueTracking
* Set the Language: JavaScript

Make sure you give me read/write access to it. Use the send invitation link and use **ccalvert** as my id. You can select it from a dropdown.

## Setup SSH {#ssh}

Make sure SSH is installed. Pristine Lubuntu should have it installed,
but just in case, or if for some reason you need to install it, here
is the command:

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

An alternative might be to open the key in **Geany** or some other text editor, and then select it in the editor with **Ctrl-A** and copy it with **Ctrl-C**. In any case, be sure you have the key saved to your clipboard.

Then in BitBucket:

* At upper right of page select your image
* Choose : Manage Account | SSH Keys | Add Key
* Paste in your public key and press save

[foo]:http://www.elvenware.com
[define-clipboard]: http://www.google.com/search?q=clipboard+computer

## Build Repository

On your hard drive, enter the following, where **lastname** should be your last name, in all lower case letters:

```
cd Git
mkdir isit320-lastname-2015
cd isit320-lastname-2015
git init
```

For instance:

```
mkdir isit320-calvert-2015
```

Now issue this command where the details will differ in your case:

```
git remote add origin git@bitbucket.org:username/isit320-lastname-2015.git
```

You can find the exact string, or something very close to it, in BitBucket. For instance, when you first create a repository in BitBucket, this is string is displayed in the confirmation page for the creation of your repository. For existing repositories, you can find something very like that string by choosing **Actions** (...) and **Clone** from the navigation menu on the left.

Now create README file in [markdown][markdown] format:

```
echo lastname >> README.md
```

Create a **.gitignore** file with the following items in it:

	node_modules
	.metadata
	.idea
	bower_components
	components
	Thumbs.db
	*.zip

You can create the file with the [nano][nano] editor, or do it like this:

```
echo node_modules >> .gitignore
echo .metadata >> .gitignore
echo .idea >> .gitignore
echo bower_components >> .gitignore
echo components >> .gitignore
echo Thumbs.db >> .gitignore
echo *.zip >> .gitignore
```

**NOTE**: *You can learn more about nano by searching for [cheat sheets][nano-cheat].*

[markdown]:https://www.google.com/search?q=markdown+syntax
[nano]:http://www.tuxradar.com/content/text-editing-nano-made-easy
[nano-cheat]:https://www.google.com/search?q=nano+editor+cheat+sheet

## Configure Git {#configure}

Issue these commands, editing as appropriate:

```
git config --global user.name "charlie at school"
git config --global user.email "noone@nowhere.net"
git config --global push.default simple
```

These commands are stored in your git config file, usually found here:

```
~/.gitconfig
```

You can see the contents of the file by issuing this command:

```
cat ~/.gitconfig
```

**NOTE**: *I'm oversimplifying a bit here. Learn more about the the config files [here][gitconfig].*

[gitconfig]: https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup


## Commit your Work {#commit}

Now add, commit and push your content:

```
git add .
git status
git commit -m "Initial commit"
git push -u origin master
```

When we type git add followed by a period we are asking git to add all the changes we have made to the repository. If you want to add just one file, issue a command like this:

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

You can learn more about git on [Elvenware][elven-git].

[git-reset]: http://stackoverflow.com/a/348234
[elven-git]: http://www.elvenware.com/charlie/development/cloud/Git.html
[branch]: http://www.elvenware.com/charlie/development/cloud/Git.html#working-with-branches

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

Paste in the the URLs for your repository when you submit your assignment. There are two URLs that can be interesting:

* The URL for your BitBucket or GitHub repository
* The URL used to clone your repository

Examples:

* https://bitbucket.org/ccalvert/prog219-calvert
* git@bitbucket.org:lastname/prog272_lastname.git

Or

* https://github.com/charliecalvert/JsObjects
* git@github.com:charliecalvert/JsObjects.git

Most of the time, when I ask for your Git your URL, I want the one I can I use to clone it. It should be clear, however, that either URL will allow me to access your repository.

Whenever you need to send me information when submitting an assignment, you can either enter a comment or use the Text page. When possible, use the Text page, because you can insert live hyperlinks and relatively well formatted text using that option. However, either technique will work.

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
exists, then you are in the root of a git repository.

In this listing, you can tell that the file called **README.md** is in a git repository
because a long (l) listing (ls) of the directory with the hidden flag (a) reveals the existence of
the .git folder:

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
push and pull from BitBucket or GitHub, git checks to see that the machine
you are connecting to is the correct machine. In particular, it looks in
this file for the fingerprint of your remote machine:

```
~/.ssh/known-hosts
```

If the machine you are going to connect to is not listed in known-hosts, then
the connection will be aborted.

When you first push to bitbucket or any new SSH server, you should be prompted
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

If you ever need to remove a line from a known_hosts file, see this:

* [Remove from known_hosts][known-hosts-remove]


<!-- ********************************* -->
<!-- ** URLS ************************* -->
<!-- ********************************* -->

[git-video]: http://youtu.be/HCoC3FbdcQk
[github-edu]: https://education.github.com/pack
[more-ssh]: http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#moreSsh
[ssh-config]: http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#ssh-config
[known-hosts-remove]: http://superuser.com/questions/30087/remove-key-from-known-hosts
