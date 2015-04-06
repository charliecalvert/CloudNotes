# Setup

The first step is to get setup. We will use only open source software
in this course. This means you have to get comfortable with the following
cross platform tools:

- Our Editor: Geany
- Version Control: Git
- Compiler: Node
- Package Manager: NPM
- SSH: Putty

## Accounts

You will need, at minimun:

- A student account on GitHub
- A single google account for use with
	- Google Drive
	- Chrome 
	- Google Sites
- An Evernote account
- An account on Cloud9 and/or Koding
- A Twitter account

I have no idea why Twitter has a bad reputation at BC. It is an
essential resource for developers. You should be following all the 
accounts found here:

[twiess]: 



## Class Time

Much effort in this class will go into preserving and optimizing class
time. This means that questions asked during class will be discouraged.
As a general rule, I reserve the right to limit any one student to 
approximately 3 questions per class. 

Certain best practices will be encouraged in order to conserve class
time. For instance, I may refuse to offer in help to someone
who has decided to use software not on our official list of tools. This
applies not only to in class time, but also to students who want me to
spend time with them outside of class solving problems related to their
problems with random hardware or software not recommended for use in
this class.

## Discussion Area

The primary place to ask questions will be the discussion area.

## Platforms

You are free to use Linux, Mac or Windows. All our tools are cross
platform and can be used on all these platforms.

## Laptops

As a general rule, I discourage but do not deny the use of laptaps in 
class. All your code and documents should be stored in the cloud, so it
should be easy to work work on any machine at any time. 

There are three occasions in which I may refuse to help someone who is
using a laptop:

- If the laptop is obviously, and significantly, slower than the 
computers provided by the college
- If the font is so small that I have difficulty reading it. (My eye
sight is not particularly good.)
- If the machine clearly is not being properly maintained.

Students who use laptops are responsible for maintaining them. 

**NOTE**: *By definition, anyone who is still running Windows XP is not 
maintaining their machine.*

**NOTE**: *By definition, anyone using Windows without a virus checker
is not maintaining their machine.*

## Security Suites

I don't know all their names, but there are a set of Security Suites
by companies like Norton, McAfee, etc. As a rule these types of tools
are more trouble than they are worth for most developers. They are 
designed primarily for users who have no common sense at all, and no
one in a class like this should fit in that category. Extremely advanced 
users can also benefit from these tools. 

These Security Suites lock down ports and network services that we will 
be using in our class. It is possible to unlock these services with 
these tools, but as implied above, this generally requires an advanced 
skill set most of us don't have and don't need. I can't spend class 
time or after class time helping students to configure their Norton 
Security Suites or similar tools.

My recommendation is to first uninstall any complex security suites you 
may have on your system, and then install a normal virus checker such
as [Microsoft Security Essentials][mse]. (Think how highly motivated 
Microsoft must be to ensure that this tool is reliable. In many ways,
it is more important to them than the OS itself.)


**NOTE**: *You should avoid the shady areas of the web altogether. If you
can't do that, then be sure to never use your computer's primary OS, your 
primary accounts, or your BC accounts for visiting any but mainstream
sites. To learn more, find out about the [Tails][tails] and [Tor][tor]
projects. The simplest way to be safe is to stick to safe sites. If you 
want to roam more widely, then burn the latest versions of [tails][tails] 
to DVD, and boot from that. I don't think [TOR][tor] alone is safe 
enough but it is better than nothing.*

[tails]:https://tails.boum.org/
[tor]:https://www.torproject.org/
[mse]:http://windows.microsoft.com/en-us/windows/security-essentials-download
 

## Directory Structure

Learning to properly organize your code and documents is one of the most
important skills you can master. All documents and source code related
to this course must be kept in one of these three folders or in 
subdirectories of these folders:

- \Users\UserName\Git
- \Users\UserName\Source
- \Users\UserName\Documents\Prog219

You may also store documents in the cloud.

I reserve the right to refuse to help anyone who:

- Keeps files in folders other than those listed above
- Has egregious duplication of files. We all end up duplicating files
at times, but if I judge that it is likely that we might end up working
on the wrong instance of a project or document, then I will ask the 
student to sort things out on their own before giving them more help.


## DOSKEY

Everyone should put together a DOSKEY file with a structure like this:



## Directory View

On Windows, you must:

- Turn on: **Show hidden files, folders and drives**
- Turn off: **Hide extensions for known file types**

The steps:

- Launch the Windows explorer. 
- Select a folder, any folder
- If necessary, hold down the Alt key to reveal the menus
- Select **Tools | Folder Options | View
- Make the modifications outlined above


## Thumb Drives

In this class, Git and some online document storage sites such as Google
Drive take the place of your thumb drive. You should store all your 
source code on Git. You documents and notes should be on Git or
Evernote. 

In order to conserve class time, I reserve the right not to answer
questions in or out of class from people who attempt to do work on
a thumb drive.

**NOTE**: *The simple rule of "thumb" is this: the command prompt on a Windows
machine should contain the signature "C:\".*

## JsObjects

Here is how to clone JsObjects:

- git clone http://github.com/charliecalvert/JsObjects.git


## Git and Putty

Unfortunately, we don't have putty set up on our machines. This we will
have to setup by ourselves.

### Step One: Download

Putty comes in two forms:

- A zip file
- A Windows installer

If you are admin on your machine, use the installer, otherwise use the
zip file. Since everyone 

Download the zip file from here: 


### Step Two: Bin Directory

We need a place to put executables that we will run frequently. This
will be:

- C:\Users\UserName\Bin
- %USERPROFILE%\Bin

Create this directory and put it on your path. Restart your command
session.

### Step Three: Putty in Bin

Put the contents of the Putty zip file in your bin directory. 

Make sure you have an environment variable called GIT_SSH. It
should be set to:

	c:\Users\charles.calvert\Bin\PLINK.EXE
	
For instance:	

	C:\Users\charles.calvert\Git>echo %GIT_SSH%
	c:\Users\charles.calvert\Bin\PLINK.EXE

Make sure **Git.exe** is on your path. It can usually be found here:

	C:\Program Files (x86)\Git\cmd
	
It is best if you can see Pageant in the **notification area**. Start 
pageant, then set "Show icon and notifications.*

**TIP**: *Consider putting your SSH keys in an encrypted folder.*

Error:

```
Cloning into 'CloudNotes'...
The server's host key is not cached in the registry. You
have no guarantee that the server is the computer you
think it is.
The server's rsa2 key fingerprint is:
ssh-rsa 2048 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48
Connection abandoned.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Fix it like this:

	plink github.com
	
When they ask you to store the key in the cache, answer yes. Then use
CTRL-C to exit the process. (Don't log in.)
	
	



## Chrome

It is simplist to think of Chrome not as a browser, but as a platform.
You can treat FireFox much the same way, but unfortunately we are 
a version of FireFox on our school machines that is primarily of 
interest to historians. It is not up to date and we cannot update it.

When you open up your PC in the morning, the first thing you do is 
sign in. Otherwise you would not have access to your home directory 
and other tools that you need. The same is true of Chrome. The first
thing you should do each day is sign in. Then you will have access 
to your bookmarks and tools.

A partial list of essential [Chrome apps][chromeApps] include:

- Google Drive
- Google Docs
- Evernote
- WunderList

Other apps that I use regularly:

- Google Slides
- Google Sheets
- Gmail
- DropBox
- Cloud Nine
- Koding

[chromeApps][https://chrome.google.com/webstore/launcher]



