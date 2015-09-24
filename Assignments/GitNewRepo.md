# Git Account

Use [BitBucket](https://bitbucket.org) to host a private [git](http://git-scm.com/book/en/v2) repository. You have two choices:

- Create a new BitBucket account if you don't have one already
- Use an existing BitBucket account.
- If you prefer GitHub or some other cloud repository, that should also work.

## Create Repo Home {#create-home}

In the account, create a new repository. Name your git repository like this, where isit320 should be name of your class:

	isit320_lastname-year

For instance:

	prog219_calvert-2015
	prog272_calvert-2015
	prog270_calvert-2015
	isit320_calvert-2015
	isit322_calvert-2015

Type: Git
Project: Wiki, IssueTracking
Language: JavaScript

Make sure you give me read/write access to it. Use the send invitation link and use **ccalvert** as my id.

## Setup SSH {#ssh}

Issue these commands, where the first command takes you to your home directory: 

```
cd
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa 
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

Now copy your public key into the BitBucket SSH page:

```
cd .ssh
cat id_rsa.pub
```

Block copy the key to the clipboard. Then in BitBucket:

* At upper right of page select your image
* Choose : Manage Account | SSH Keys | Add Key
* Paste in your public key and press save

## Build Repository

On your hard drive:

```
cd Git
mkdir isit320-lastname-2015
cd isit320-lastname-2015
git init
```

Now issue this command where the details will differ in your case:

```
git remote add origin git@bitbucket.org:username/isit320-lastname-2015.git
```

Now put some README markdown file in your repository:

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

You can create the file with the **nano** editor, or do it like this:

```
echo node_modules >> .gitignore
echo .metadata >> .gitignore
echo .idea >> .gitignore
echo bower_components >> .gitignore
echo components >> .gitignore
echo Thumbs.db >> .gitignore
echo *.zip >> .gitignore
```

## Configure Git {#configure}

Issue these commands, editing as appropriate:

```
git config --global user.name "charlie at school"
git config --global user.email "noone@nowhere.net"
git config --global push.default simple
```

## Commit your Work {#commit}

Now add, commit and push your content:

```
git add .
git commit -m "Initial commit"
git push -u origin master
```

## The Video

This video shows how to proceed:

- [video](http://youtu.be/HCoC3FbdcQk)

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
