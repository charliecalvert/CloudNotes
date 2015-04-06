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
- A JetBrains account for the student version of WebStorm

I have no idea why Twitter has a bad reputation at BC. It is an
essential resource for developers. You should be following all the 
accounts found here:

[twiess]: http://elvenware.com/charlie/development/cloud/TwitterAccountsToFollow.html

An excellent way to start each day would be to follow the links in
the above file to see what the best developers in the industry are 
thinking on a day to day basis.

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

**NOTE**:*Never put a space in a file name or folder name. This may work
with some programs, but there are various command line tools commonly
used by open source programmers that do not understand Windows spaces.
There are occasions when a space in a file or directory name makes sense,
but if you are writing code, the suggested practice is not to use 
spaces at all in file or directory names. If you absolutely have to
use a space in a file or folder name, and encounter problems, try 
putting the path in quotes. But even if you can figure out how to work
around it, other developers will likely be frustrated by the presence
of spaces in a folder name. They will not appreciate their presence. 
Also, nothing is worse than a two hour debug session which ends by the
realization that the problem was caused by a space in a directory name.
Whatever you gained by adding the space is usually not worth the 
potential downside.*


## DOSKEY

Everyone should put together a DOSKEY file with a structure like this:

```
@ECHO OFF

call doskey.exe home=cd %USERPROFILE%
call doskey.exe jo=cd %USERPROFILE%\Git\JsObjects
call doskey.exe jod=cd %USERPROFILE%\Git\JsObjects\Data
call doskey.exe joj=cd %USERPROFILE%\Git\JsObjects\JavaScript
call doskey.exe jou=cd %USERPROFILE%\Git\JsObjects\Utilities
call doskey.exe jot=cd %USERPROFILE%\Git\JsObjects\JavaScript\UnitTests
call doskey.exe gitdir=cd %USERPROFILE%\Git

```

Place something like the above, with your own additions, in your
**Bin** directory:

	%USERPROFILE%\Bin\DosAlias.bat
	
You can then create a shortcut to C:\Windows\System32\Cmd.exe. Windows
will ask if you want to put the shortcut on the Desktop. That will do
for now. Right click on the shortcut and put this in the **Target**
field:

	C:\Windows\System32\cmd.exe /k DosAlias.bat
	
That will start a command prompt and run your DosAlias.bat file.

Put this in the **start in** field:

	%USERPROFILE%

There are numerous variants you can run on this process, but you get
the general idea.

Especially during the first few weeks of class, many students will
probably want to dedicate considerable time to honing their **DosAlias**
file. 

- [DosKey](http://en.wikipedia.org/wiki/DOSKEY)

- [Reference](http://superuser.com/a/106850)



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

Make sure **Git.exe** is on your path. It can usually be found here,
being careful to get the spaces right:

	C:\Program Files (x86)\Git\cmd
	
Make sure you enter the following at the command prompt:

	git config --global push.default simple
	
It is best if you can see Pageant in the **notification area**. Start 
pageant, then set "Show icon and notifications.*

**TIP**: *Consider putting your SSH keys in an encrypted folder.*

You might get this error:

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
	
Check the contents of your .gitconfig file:

```
C:\Users\charles.calvert>type .gitconfig
[gui]
        recentrepo = C:/Users/charles.calvert/Git/JsObjects
        recentrepo = C:/Users/charles.calvert/Git/CloudNotes
[push]
        default = simple
[user]
        email = charlie@elvenware.com
        name = Charlie at A134
```

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

Launch them from the [Chrome Launcher][chromeLauncher].

[chromeLauncher]: https://chrome.google.com/webstore/launcher
[chromeApps]: https://chrome.google.com/webstore/category/apps

## WebStorm

Create [a student account][jbstudent] on the JetBrains site. See the
**apply now** button at the bottom of the [linked page][jbstudent].

Download WebStorm. Install it into your %USERPROFILE%/Bin (Home/Bin) 
directory:

	c:\Users\UserName\Bin\WebStorm
	
During the install, you will have a chance to enter your JetBrains
user name and password. 

We use WebStorm instead of Visual Studio because it is entirely cross
platform. It runs on Linux, Mac and Windows.

[jbstudent]: https://www.jetbrains.com/student/


## NPM Config

To see the contents of the config file:

	npm config list
	
It might look like this by default:

```
C:\Users\charles.calvert\Git\JsObjects\Utilities\NodeInstall>npm config list
; cli configs
user-agent = "npm/2.7.4 node/v0.12.2 win32 x64"

; builtin config undefined
prefix = "C:\\Users\\charles.calvert\\AppData\\Roaming\\npm"

; node bin location = C:\Program Files\nodejs\\node.exe
; cwd = C:\Users\charles.calvert\Git\JsObjects\Utilities\NodeInstall
; HOME = C:\Users\charles.calvert
; 'npm config ls -l' to show all defaults.
```

Let's get the NPM directory somewhere we can more easily find it:

	npm config set prefix %USERPROFILE%\Npm	
	
	

