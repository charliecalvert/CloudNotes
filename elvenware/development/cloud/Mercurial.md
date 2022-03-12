---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/Mercurial.md
relativePath: elvenware/development/cloud/Mercurial.md
title: Mercurial
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

Elvenware Mercurial Repository
==============================

[Mercurial](http://mercurial.selenic.com/) is one of many different
tools used for version control. Like [GIT](http://git-scm.com/), it
supports a distributed architecture that allows you to have multiple
versions of your repository. I use Mercurial rather than GIT because I
think it is somewhat easier to use, however, if you are looking for a
version control system, you should consider both Mercurial and the very
popular GIT.

Mercurial is also referred to as HG, where HG is the symbol for Mercury.
Mercurial is a command line utility and
[TortoiseHg](http://tortoisehg.bitbucket.org/) is the most popular GUI
client for this tool. The forehead install for TortoiseHg also
automatically install Mercurial.

### Index

-   [TortoiseHg Install and use on Windows](#tortoise)
-   [Mercurial in Eclipse](#mercurialEclipse)
-   [Mercurial Linux Install](#hgLinuxInstall)
-   [Run Mercurial from the Command Line](#commandLine)
-   [On Linux, Set up a Mercurial Repository and Pull from it](#setupHg)
-   [SVN](#svn)
-   [Links](#links)

Here is the address to pass to Mercurial if you want to pull down some
of the source found on this site. Please see the sections below for more
details:

~~~~ {.code}
hg clone http://elvenware.hg.sourceforge.net:8000/hgroot/elvenware/andelf
~~~~

The working part of the command is shown here:

~~~~ {.code}
http://elvenware.hg.sourceforge.net:8000/hgroot/elvenware/andelf
~~~~

Note that if you browse directly to this URL on the web, you can get an
overview of the repository and see some of the most recent events that
have occurred, such as updates. You can also use this URL to pull
content from the repository, either by using the command line driven
program called hg, or by using a Mercurial GUI based front end such as
[Tortoisehg](http://tortoisehg.bitbucket.org/). The rest of this
document is primarily an explanation of how to use both of these tools.

TortoiseHg {#tortoise}
----------

Mercurial is a command line utility. You access it by typing **hg.**
Most developers, however, use some kind of mouse driven, GUI based,
front end that sits on top of Mercurial. The most commonly used front
end is called TortoiseHg, which is available on Linux and Windows. This
section of the text describes how to install TortoiseHg and configure it
to pull down the Elvenware repository.

-   First [download and install](http://tortoisehg.bitbucket.org/)
    TortoiseHg.
-   Bring up the TortoiseHg
    [workbench](http://tortoisehg.bitbucket.org/manual/2.1/workbench.html).
-   Choose **File | Clone Repository** from the workbench menu.
-   In the **Source** field place the andelf URL shown in the previous
    section of this document.
-   In the **Destination** field, place the path to the location on the
    hard drive where you want to store your readonly copy of the
    repository.
-   Select the **Clone** button.

[![Cloning a Repository in Mercurial
TortoiseHg](images/Mercurial01Small.png)](images/Mercurial01.png)

**Figure 01: Cloning a Repository in Mercurial TortoiseHg. Click to
englarge**

Sometimes, after you have pulled down code from the repository, you may
get message saying that you don't have the head. In those cases, you
will often see two paths in the main window. You should then right click
on the diverged node, and choose update. Finally, choose **Commit** from
the toolbar. (Commit is the check mark seen in the toolbar in Figure 2,
the fourth icon from the right,

[![Not a head, and the small fork in the
path](images/Mercurial02Small.png)](images/Mercurial02.png)

**Figure 02: Not a head revision, and the small fork in the graph
column. Click to zoom.**

![After the update and commit, there is no fork in the graph column, and
the red "not a head revision" is gone.](images/Mercurial03Small.png)

**Figure 03: After the update and commit, there is no fork in the graph
column, and the red "not a head revision" is gone.**

**Note**: *If you pull down code from a Mercurial repository, and you
want to use that code as the basis for one of your own projects, you
would normally want to copy that code to another folder before using it.
Otherwise, your work might be overwritten the next time you pull from
the repository.*

Mercurial in Eclipse {#mercurialEclipse}
--------------------

-   Open up Eclpse/Aptana. 
-   Choose Help | Install New Software
-   Click the Add Button and enter the following:
-   **Name**: MercurialEclipse
-   **Location**: [http://mercurialeclipse.eclipselabs.org.codespot.com/hg.wiki/update\_site/stable](http://mercurialeclipse.eclipselabs.org.codespot.com/hg.wiki/update_site/stable)
-   Click Okay and choose MercuialEclipse stable releases. 
-   Click next twice, accept the license, click finish
-   Click through the unsigned content warning
-   Restart Eclipse/Aptana

To configure Mercurial, choose **Window | Preferences | Team |
Mercurial**

Links
-----

-   [http://www.elvenware.com/charlie/development/cloud/Mercurial.html\#setupHg](http://www.elvenware.com/charlie/development/cloud/Mercurial.html#setupHg)
-   [https://bitbucket.org/mercurialeclipse/main/wiki/Installation\_and\_Configuration.wiki\#!installation-and-configuration](https://bitbucket.org/mercurialeclipse/main/wiki/Installation_and_Configuration.wiki#!installation-and-configuration)
-   

 

 

Install Mercurial on Linux {#hgLinuxInstall}
--------------------------

~~~~ {.code}
sudo apt-get install mercurial tortoisehg
~~~~

Apparently meld is some kind of Linux GUI based front end for mercurial.
I haven't tried it yet. And perhaps I never will, as I see that
tortoisehg is available.

Running Mercurial from the Command Line {#commandLine}
---------------------------------------

TortoiseHg is a GUI front end to Mercurial. The actual Mercurial program
is called **hg,**and it is driven from the command line. Mercuial works
exactly the same in Windows, Linux and the Mac. Many users of Mercurial
prefer the command line tools because they can put them in scripts that
can be automated. For instance, in Windows, you could use the [Task
Scheduler](http://msdn.microsoft.com/en-us/library/windows/desktop/aa383614(v=vs.85).aspx)
to [pull](http://mercurial.selenic.com/wiki/Pull) the latest updates
from the repository each morning.

If you want to use **hg**rather than TortoiseHg, be prepared to do all
your work from the command line. It is not hard, but you need to accept
the task before you.

Here is how to get the Elvenware Repository for the first time with the
[clone](http://mercurial.selenic.com/wiki/Clone) command:

~~~~ {.code}
hg clone http://elvenware.hg.sourceforge.net:8000/hgroot/elvenware/andelf
~~~~

Once you have cloned the repository, you can update it with the latest
content at any time. All you need to do is switch to the directory where
your repository is stored, and then type the following commands:

~~~~ {.code}
hg pull
hg update
~~~~

If you are writing a script, you probably won't want to run the script
from inside the repository. As a result, you need to write something
like this, where **g:\\shanti\\andelf**is the path to your repository:

~~~~ {.code}
hg --repository g:\shanti\andelf\ pull --verbose http://elvenware.hg.sourceforge.net:8000/hgroot/elvenware/andelf
~~~~

If you have trouble figuring out what to do with Mercurial at the
command line in Linux, you can learn what to do by using workbench in
Windows; just make sure that the output log (Ctrl-L) is open at the
bottom of the workbench. As you issue commands using the WorkBench
interface, you can see the underlying **hg** command line equivalents in
the output log at the bottom of the workbench. Now just copy those
commands over to your Linux terminal.

Here is a review of how to run Mercurial on a Unix based operating
system like Linux or the Mac. Call hg clone first. Many people will want
to clone the repository in their \
home or documents folder. In the examples that follow, I created the
clone in my tmp directory just so I could easily delete it later, since
I already have a copy in my home \
folder, but want to show you the whole process from beginning to end.

The whole run should look like this, assuming that you start in a
directory called /tmp:

~~~~ {.code}
charlie@MintBox /tmp $ hg clone http://elvenware.hg.sourceforge.net:8000/hgroot/elvenware/andelf
destination directory: andelf
requesting all changes
adding changesets
adding manifests
adding file changes
added 117 changesets with 504 changes to 440 files
updating to branch default
412 files updated, 0 files merged, 0 files removed, 0 files unresolved
charlie@MintBox /tmp $
~~~~

Now the repository is in**/tmp/andelf**\
 Here is what to do if you want to update your version of the
repostiroy:

~~~~ {.code}
charlie@MintBox /tmp $ cd /tmp/andelf/
charlie@MintBox /tmp/andelf $ hg pull
~~~~

If there were an updates, you will be prompted to run hg update. You
should, of course, then run hg update:

~~~~ {.code}
charlie@MintBox /tmp/andelf $ hg pull
pulling from http://elvenware.hg.sourceforge.net:8000/hgroot/elvenware/andelf
searching for changes
adding changesets
adding manifests
adding file changes
added 1 changesets with 1 changes to 1 files
(run 'hg update' to get a working copy)
charlie@MintBox /tmp/andelf $ hg update
1 files updated, 0 files merged, 0 files removed, 0 files unresolved
charlie@MintBox /tmp/andelf $
~~~~

Setting up a Mercurial Repository in Linux and Pulling it from Linux {#setupHg}
--------------------------------------------------------------------

To create the repository:

~~~~ {.code}
hg init MyRepo
~~~~

Now navigate to your MyRepo directory:

~~~~ {.code}
cd /home/charlie/MyRepo
~~~~

Use an editor or the echo command to put a file in it:

~~~~ {.code}
echo Test Content > MyFile.txt
~~~~

The echo command, when used this way, creates a small text file with the
words "Test Content" in it. Now add the file to the repository:

~~~~ {.code}
hg -add MyFile.txt
~~~~

Now commit the file:

~~~~ {.code}
hg -commit
~~~~

At this stage, if you are adding a file for the first time, you might
get an error about user names. To get user name installed

Create hgrc in .hg and put this in it, where the user name is some email
address that you want to use:

    [ui]
    username = MyName@MyServer      

To pull it from the server you should copy the public key from your
client machine to the authorized key file on the server that hosts the
repository. Now you need to make sure your private key is loaded into
memory. (This is the same thing as loading the key into Pageant.):

~~~~ {.code}
ssh-add YourPrivateKey
~~~~

For instance, you might write: **ssh-add .ssh/id\_rsa**. Or possibly
**ssh-add .ssh/id\_charlie\_rsa.pem**. Your milage will vary depending
on the name and location of the private key that you want to use.

Now you should be able to pull the repo from the client by issuing this
command:

~~~~ {.code}
hg clone --verbose charlie@MyServer//home/charlie/MyRepo /home/charlie/MyRepo
~~~~

We give this command on the client, and it sends messages to the server
asking to retrieve the repository.

Let's break the command down. First we say that we want to clone a
repostory: **hg clone**. Then we say we want verbose output, so we get
as much feedback as possible: **hg clone --verbose**.

We are saying that we will clone the repository that is stored on
**MyServer**. The user on **MyServer** is **charlie**. Hence we write
<charlie@MyServer>.

 The repository is stored in **/home/charlie/MyRepo**. Note that in the
command there are the two slashes before the word **home**!!

Then we state where we want to put the repository on the client machine:
**/home/charlie/MyRepo**. We are copying from the
**/home/charlie/MyRepo** directory on the server to the
**/home/charlie/MyRepo** directory on the client.  

Now you can edit one of the files on the client. While still in the
directory where you did your work, you can update the server. To update
the server, you perform a **commit** and **push**. First the **commit**:

~~~~ {.code}
hg commit
~~~~

When giving the commit command for the first time, you may be prompted
to specify an editor. On Linux, choose **nano**, unless you know you
prefer vim or some other tool such as gedit. On Windows, choose
NotePad++ or Notepad.

Now the push. Again, when you give this command, you should be in the
directory where you are doing your work. For instance, you should be in
**/home/charlie/MyRepo**. Here is the command:

~~~~ {.code}
hg push
~~~~

Then on the server, you can see the results by typing the following:

~~~~ {.code}
hg update
~~~~

Of course, that command merely updates your file. To see the contents of
the file, type something like this:

~~~~ {.code}
cat MyFile.txt
~~~~

SVN
---

You can install and download SVN without cost./span\>

SVN Downloads:
[http://tortoisesvn.tigris.org/](http://tortoisesvn.tigris.org/)

Create a directory on your hard drive, then right click and choose SVN
Checkout.

![SVN Checkout](images/Svn02.png)

![SVN Import New Code](images/Svn01Small.png)

**Figure 0X: SVN Checkout**

Links {#links}
-----

-   [http://hgbook.red-bean.com/](http://hgbook.red-bean.com)
-   [http://stackoverflow.com/questions/2329023/mercurial-error-abort-no-username-supplied](http://stackoverflow.com/questions/2329023/mercurial-error-abort-no-username-supplied)
-   [http://www.selenic.com/mercurial/hg.1.html](http://www.selenic.com/mercurial/hg.1.html)
-   [Tortoisehg](http://tortoisehg.bitbucket.org/)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
