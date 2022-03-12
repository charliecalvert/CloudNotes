---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxFiles.md
relativePath: elvenware/os/linux/LinuxFiles.md
title: LinuxFiles
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

# Working with Files in Linux (and OS X)

In this page we explore performing basic file operations in Linux from
the command line (shell). The information you find here is geared
towards the Ubuntu family of releases, such as Ubuntu desktop, Ubuntu
server, Lubuntu, and the various Mint Linux flavors.

I should point out that the Mac also has a Unix style command prompt. As
a result, most of what I say here applies to a greater or lesser degree
to OS X. There are differences, however, between the Ubuntu Linux
command prompt and the Mac command prompt. I would suggest reading
through this text and mastering the Linux command prompt. Once you feel
comfortable with these commands, then start trying them on the Mac. Most
of them will work exactly as shown here. The variations, as a rule, are
easy to discover once you understand what it is you are trying to do.
For instance, on the Mac, the home directory is in the **/user/**folder,
while on Linux it is in the**/home** folder. Yes there is a difference,
but it is not an important difference. Or at least I personally don't
find it significant.

What is significant, however, is that Linux is the most popular
operating system in the cloud, and OS X is the popular system of under
30 types in the US. As a result, it can be very useful to begin to
understand how the Linux or Mac command line (shell) works.

## Overview

This page is designed to help new comers to Linux use the basic commands
needed to create, move and edit files are on the command line. The
following commands are covered:

1.  ls: List the contents of a directory
2.  cd: Change directory
3.  pwd:  Print my current working directory
4.  cp: Copy a file
5.  mv: Move a file
6.  rm: Delete (remove) a file
7.  mkdir: Create a directory
8.  rmdir or rm -r: Delete a directory
9.  sudo: When do I need to use sudo when working with files?
10. chmod: Change the file mode so you can read, write or execute a file
11. chown: Change the user and/or group that owns a file
12. df: How much free space is available on my drive?

In addition, I will briefly discuss the following text editors: nano,
vim, gedit and leafpad: This is not the place to learn how to use these
editors, but it is a good place to explain which of these editors you
might want to use and why.

The dozen core commands listed above give you the power you need to
master Linux file system. You may be asking yourself: "Do I have to know
all these commands." In many cases, the answers is no. You might also
ask: "Is this an exhaustive list?" Again, the answer is no. I am trying
to employ a variation of the 80-20 rule here. These are the core
commands that most users need to most of the time. Ninety eight percent
of the time these twelve rules provide all the power you need. (The one
possible exception involves search for [text with
grep](http://www.elvenware.com/charlie/os/linux/LinuxDays/LinuxFAQ.html#grep)
or [files with
find](http://www.elvenware.com/charlie/os/linux/LinuxDays/LinuxFAQ.html#finddir).
Those subjects are covered elsewhere.

I have tried to arrange the commands listed above in some kind of
reasonable order, from basic to esoteric. Some users may only need to
know the first command, and many users could get by with a knowledge of
only the first 6 or seven commands. After all, if you know how to copy
and move files, and you know how to create and delete directories, you
have a pretty good command of your system.

If however, you want to act as a system administrator who performs basic
configuration steps on your system, then you may need to know all these
commands. Getting a grasp of all of them requires more than a few
minutes work, but it is not a particularly difficult job. For instance,
if you know how to edit HTML files by hand, or write a beginning level
computer program, then you will find the task of mastering the basics of
the commands listed above to be relatively trivial.

A helpful tutorial:

- [Unix Tutorial for Beginners](http://www.ee.surrey.ac.uk/Teaching/Unix/)

## File Permission Overview {#fileOverview}


In Linux, as in Windows, by default there are folders where you have
permission to manipulate files and other folders where you do not have
permissions. The rule that governs this issue is fairly easy to
understand:

-   You have permission to edit all the files in your home directory.
-   Only the administrator (who is called root) has permission to edit
    the rest of the files on your system.

In Windows, the situation is much the same. You have permission to edit
the files in your My Documents directory, and in your home directory.
But if you go into the Program Files directory, or the Windows
directory, then you usually have to become administrator before you can
edtit a file.

In Windows, a feature called UAC (User Access Control) enforces this
rule. In Linux, a command called **sudo** is used to give you permission
to edit files outside your home directory. That is, it gives you
permission to temporarily become an administrator (super user) and
manage files owned by the system, or by other users. For now, I just
want to be sure you understand that you can edit files outside your home
directory, and that you use the **sudo** command to gain permission to
do so. The details of how that works will be discussed later in this
document.

NOTE: On Linux systems there is a user called **root** who has super
user (administrator) permissions. If you want to edit, rename or delete
a file owned by root then you need to use the **sudo** command to gain
permission to do so. If you are in a directory owned by root, then you
need to use **sudo** to copy files into that directory. The exact
mechanism for doing these things will be explained later in this
document.

## Where is my Home Directory? {#home}

Knowing that you have permission to edit files in your home directory is
all well and good, but where, exactly is your home directory? Your home
directory is located here:

    /home/$USER

For instance, if my user names is charlie, then my home directory would
be located here:

    /home/charlie

This seems fairly straightforward, but there is a little twist that
Linux throws at you herer. When first arrive at the command prompt
(shell) for your Linux box, you usually see something like this:

    charlie@MyServer:~$

This prompt tells me that I am logged on to the machine called
**MyServer** as the user **charlie** and that I am currently located in
my home directory. If you study the prompt shown above, you probably
find it fairly easy to see the bit about being logged into a particular
server as a particular user. But how do you know you are in your home
directory? You can glean that information for the \~\$ symbol. In
particular, the tilde (\~) is an alias for your home directory, and the
\$ is simply the symbol that tells you are at the root of the prompt.

You are probably familiar with the syntax of the Windows command prompt.
Consider the following prompt, which shows my home directory:

    C:\Users\Charlie>

The greater than symbol (\>) at the Windows prompt plays the same role
as the dollar sign symbol (\$) at the Linux prompt. It just tells you
that this is the beginning of the location where you can start typing in
commands. It is the beginning, or root, of the command prompt:

    charlie@MyServer:~$
    C:\Users\Charlie>

Despite all this explanation, there is probably still something that
does not quite make sense to you. What does it mean to say that the \~
symbol is an alias for the home directory. On Windows, we know from the
prompt that the home directory is **C:\\Users\\Charlie**. In Linux,
however, all we know is that the \~ symbol resolves to the home
directory. Above, I explained that the home directory for the user
**charlie** is located here:

/home/charlie

So, why doesn't the prompt just tell us that? Why can't Linux be more
direct? The answer is simply that Linux doesn't want to waste your time
pointing out the obvious. Unless the prompt specifically says otherwise,
you can just assume that you are in your home directory. After all, that
is where you spend more of your time. If you move to the bin directory,
or etc directory, then the prompt tells you that. Otherwise, it just
gives you the tilda (\~) as a little reminder that you are still where
you have been all day long: you home directory.

Here, for instance, is what it looks like if you have navigated to the
etc directory:

charlie@MyServer:**/etc\$**

Notice that that there is no tilde in the prompt. That means you are no
longer in your home directory.

## Listing Files with ls

You can use the list command to list the files in a directory. Suppose
you are in your home directory. Suppose further that it contains two
subdirectories called Documents and Pictures, and a text file called
**readme.txt**:

    /home/charlie
    -- Documents
    -- Pictures
    -- readme.txt

You can see the files in your directory by type the **ls** command.

    charlie@ShantiLinuxServer:~$ ls
    Documents  Pictures  readme.txt

The dir command also performs the same task, though in the Linux world,
**ls** is more commonly used:

    charlie@ShantiLinuxServer:~$ dir
    Documents  Pictures  readme.txt

## Long Listing and Permissions {#long-list}

You can get a long listing of the files with **ls -l** or **dir -l**.
That would be the letters L and S followed by a space, then the a dash,
then the letter L, all in lower case:

    charlie@ShantiLinuxServer:~$ ls -l
    total 12
    drwxrwxr-x 2 charlie charlie 4096 Jan 31 19:46 Documents
    drwxrwxr-x 2 charlie charlie 4096 Jan 31 19:46 Pictures
    -rw-rw-r-- 1 charlie charlie   21 Jan 31 19:47 readme.txt

The ls command reports that there are total of 12 files in this current
directory. Three of them are visible, and 9 are hidden. We will see how
to view the hidden files in just a moment. But for now, let's focus on
the 3 files we can see.

Starting on the left, we can see 6 groups of information:

1.  **drwxrwxr-x**: The file or directory permissions
2.  **2**: The number of directories. More on this in a moment.
3.  **charlie charlie**: The owner of the directory or file, and the
    group to which it belongs
4.  **4096**: The size of the file or directory block in bytes
5.  **Jan 31 19:46**: The date. Because no year is listed, we can assume
    it was created in the current year
6.  **Documents**: The name of the directory or file

The file permissions are always confusing to people who are new to
Linux. The topic is actually quite a bit simpler than it seems at first
glance. The following table may help you get oriented:

| Description            | Abbreviation   | Code
| ----------------------- ---------------- ------
| Execute                | x              | 1
| Write                  | w              | 2
| Read                   | r              | 4
| Read and Execute       | rx             | 5
| Read and Write         | rw             | 6
| Read, Write & Execute  | rwx            | 7

For now, you should just focus on the Description and Abbreviation
fields of the above table. The Code plays a useful role, but we need not
wrestle with that quite yet.

Here are the positions of the flags for the various people who may
attempt to use the file. The first position is set to d if it is a
directory, or - if it is a file. The next three positions apply to the
owner of the file, the next three to the group, and the last three to
everyone else. If you are a member of the group that has read, write and
execute permissions on a file, then you can read, write and execute the
file. Here is the table:

| Name          | Location
| -----------   | ------------
| directory     | d---------
| owner         | -rwx------
| group         | ----rwx---
| other         | -------rwx

Sometimes people prefer to present the same information in this format:

| Position  | Meaning
| ----------| -----------------------------------------------------
| 1         | Usually either d for directory or - for normal.
| 2,3,4     | The owner's read, write and execute permissions
| 5,6,7     | The group's read, write and execute permissions
| 8,9,10    | Everyone else's read, write and execute permissions

Here are the values of the flags themselves:

| Flag     | Meaning
| -------- | --------------------------------------------
| -        | There is no value for this space. It is blank.
| r        | Read rights on the file
| w        | Write permission to edit or delete.
| x        | Rights to execute or list the files in a directory
| s        | Special set-UID or set-groupID flag. Rare. Ignore for now.

## File Permission Mnemonics

Another technique involves using a set of mnemonics:

```
chmod u=r,g-rwx,o-rwx myFile
```

This sets permissions as follows:

```
-r--------  1 charlie charlie     0 Sep 27 20:28 myFile
```

Notice that **user** is set to **read**, while **read**, **write** and **execute** are "subtracted" from **group** and **other**. If the original file did not have execute permissions for **group** and **other**, no error occurs. The extraneous requests to remove **execute** permissions from a file that did not have them are ignored.

Where:

- a=All
- u=Owner
- g=Group
- o=Other

So both of these give only the owner only read permissions:

- chmod 400 foo.txt
- chmod a-rwx,u+r foo.txt

This adds read and write permissions to the group:

- chmod g+rw foo.txt

## File and Directing Listings {#listings}

Let's look at the permissions for directories and documents:

``` {.code}
drwxrwxr-x
```

The d at the beginning means that this is a directory. Compare those
permissions with the permissions for **readme.txt**:

``` {.code}
-rw-rw-r--
```

In this second example, the first space is empty. As a result, we can
assume that **readme.txt** is not a directory, but a regular file.
Conversely, we know that Documents is a directory because there is a d
in the first position of its permissions flags.

After the d in the permissions block for the Documents directory there
are three sets of letters:

``` {.code}
d rwx rwx r-x
```

The first set of three letters mean that the owner of the file
(**charlie**) has read, write and execute permissions on the directory.
The second block of 3 letters mean that any member of the group
**charlie** has read write and execute permissions on the directory. The
final three letters mean that any one else has read and execute
permissions, but no write permissions. In effect, this means that
everyone beside the owner and the members of the group **charlie** can
read the name of the directory, and they can navigate into it, but the
can't delete or rename it.

Now let's look at the permissions for **readme.txt**:

``` {.code}
-rw-rw-r--
```

We see from the blank first letter that this is a normal file, and not a
directory. The next three letters apply to the **owner**, who in this
case is **charlie**:

``` {.code}
rw-
```

We can see that **charlie** has read and write permissions on this file,
but no execute permissions. The lack of execute permissions is not
really a statement about the range of control that **charlie** has over
the file so much as a statement about the capabilities of the file. This
is a text file that is meant to be read, and so it would not make sense
to try to execute it. Sometimes, we explicitly do not give the owner,
group or others the permission to execute a file that is meant to be
executed. But in this case, it is not really permissions that are at
stake. This is simply an implied, and rather oblique, comment about the
file itself.

**NOTE**: It is perfectly legal to set execute permissions for a file
that contains simple text, and no code. For instance, you can set the
execute flag for readme.txt, even though any effort to execute it would
fail since it does not contain executable code. In other words, it
contains simple text, and has no code, in either binary or text format,
associated with it. It is therefore correct to say that it would not be
sensible to set the execute flag for **readme.txt**, but it would not be
illegal. Typically Linux files that can be executed either have a
**.sh** extension, or else they have no extension at all. For instance,
a file called **RunMe.sh** or **RunMe** might be possible to execute, so
long as the execute permissions are set on the file itself:

``` {.code}
-rwxrw-r-x 1 charlie charlie 4 Feb 1 01:05 RunMe.sh
```

Let's continue our discussion of **readme.txt**. We can see that members
of the group **charlie** also have read and write permissions, but no
execute permissions:

``` {.code}
rw-
```

 Finally, we can see that everyone else can read the file, but not edit
it or delete it, nor can than they execute it:

``` {.code}
r--
```

That's all I'm going to say for now about the permissions section of the
long listing for directory or file.

Scan back up to the original listing, and you will see that second item
in second item in the row for the Documents and Pictures directory
contains the number 2, which I say refers to the number of directories.
What does that mean? In this case, both the Documents and Pictures
directory are empty. As a result, the are recorded as containing both
themselves and their parent directory. These would typically be shown as
a directory called . (a period) and a directory called .. (two periods).
Here is an example:

``` {.code}
charlie@ShantiLinuxServer:~/Documents$ ls -la
total 8
drwxrwxr-x 2 charlie charlie 4096 Jan 31 19:46 .
drwxr-xr-x 6 charlie charlie 4096 Jan 31 19:50 ..
```

Both of these directories are normally hidden because they begin with a
period. To see the hidden directories in our home folder, we use the ls
-la command:

``` {.code}
charlie@ShantiLinuxServer:~$ ls -la
total 48
drwxr-xr-x 6 charlie charlie 4096 Jan 31 19:50 .
drwxr-xr-x 3 root    root    4096 Jan 30 17:15 ..
-rw------- 1 charlie charlie  477 Jan 31 19:54 .bash_history
-rw-r--r-- 1 charlie charlie  220 Jan 30 17:15 .bash_logout
-rw-r--r-- 1 charlie charlie 3637 Jan 30 17:15 .bashrc
drwx------ 2 charlie charlie 4096 Jan 30 17:50 .cache
drwxrwxr-x 2 charlie charlie 4096 Jan 31 19:46 Documents
drwxrwxr-x 2 charlie charlie 4096 Jan 31 19:46 Pictures
-rw-r--r-- 1 charlie charlie  675 Jan 30 17:15 .profile
-rw-rw-r-- 1 charlie charlie   21 Jan 31 19:47 readme.txt
drwx------ 2 charlie charlie 4096 Jan 31 19:54 .ssh
-rw------- 1 charlie charlie  608 Jan 31 19:47 .viminfo
```

In this listing, our familiar **Documents**, **Pictures** and
**readme.txt** items are still visible. We now also see a series of
hidden files or folders, each of which begin with a period. The period
character is used to create a hidden file or folder. In general, we hide
the files not to protect them, but simply to keep them out of the way
when the user is pursuing his normal course of work. Most of the time,
the user does not need to see all these files or folders, so they are
hidden away where they will not clutter the landscape. 

## Change File Permissions

Make it:

- read and write only for owner: **chmod 600 fishes.js**
- read and write for owner and group: **chmod 660 fishes.js**
- read and write for owner and group and read only for everyone else: **chmod 664 fishes.js**
- Owner and group have all permission, everyone else read only: **chmod 774 fishes.js**

Recursive changes:

- In this directory, and all subdirectories, set all JavaScript files to 662: **chmod -R 662 \*.js**

A common setting for many files is 755: Owner has all rights, everyone else has read and execute:

```bash
chmod 755 foo.txt
ll foo.txt
-rwxr-xr-x 1 charlie charlie 0 Dec  4 07:42 foo.txt*
```

Other popular choices include **744** and **766**. Try them and see what they do.

Add write permissions for all: **chmod a+w foo.txt**

Add write permissions for the group: **chmod g+w foo.txt**

Remove read permissions for all: **chmod a-r foo.txt**

And so on.

## Change or Check Your Current Location: cd and pwd {#pwd}


Despite all that is said above, you might still want some confirmation
as to the name of your current directory. Use the PWD command (Print
Working Directory) to always be sure you know your current location. In
the following code, I use cd to navigate to the **/var/log** directory from the
home directory:

``` {.code}
charlie@MyServer:~$ pwd
/home/ubuntu
charlie@MyServer:~$ cd /var/log/
charlie@MyServer:~$:/var/log$ pwd
/var/log
```

In the code above, the prompt is in plain text. The commands and output
from the commands are shown in bold.

The first command issued at the shell prompt is **pwd**. To issue the
command, just type **pwd** and hit enter. This prints the working
directory. The output is **/home/ubuntu**, which is my home folder on
this machine.

I then navigate to the **/var/log** folder with the **cd**, or change
directory command. I then call **pwd** to print out the current
directory. The output produced is **/var/log**. If you want, you can now
optionally type **cat boot.log** to see the output of your boot log. (On
Windows, the command to view the contents of a file is **type
filename**. In Linux, it is **cat filename**, where catalogue is a
mnemonic for print out.

Since many users first need to understand the file system when working
with a web site, I will give another example that uses the /var/www
folder. This directory will not exist unless you have installed apache.
If you don't have apache installed on your system, you can just ignore
this section of the text, and move on to the discussion of copying
files.

If you are still here, then you will find the following code, I use pwd
to check my location, I navigate to to the **/var/www/** directory, I
create a directory called temp, I copy files into it.

``` {.code}
ubuntu@domU-12-31-39-14-16-01:~$ pwd
/home/ubuntu
ubuntu@domU-12-33-37-17-14-01:~$ cd /var/www/
ubuntu@domU-12-33-37-17-14-01:/var/www$ pwd
/var/www
ubuntu@domU-12-33-37-17-14-01:/var/www$ sudo mkdir temp
ubuntu@domU-12-33-37-17-14-01:/var/www$ cd temp
ubuntu@domU-12-33-37-17-14-01:/var/www/temp$ pwd
/var/www/temp
ubuntu@domU-12-33-37-17-14-01:/var/www/temp$ sudo cp /home/ubuntu/* .
ubuntu@domU-12-33-37-17-14-01:/var/www/temp$ ls -la
total 296
drwxr-xr-x 2 root root 4096 Oct 24 02:24 .
drwxr-xr-x 3 root root 4096 Oct 24 02:24 ..
-rw-r--r-- 1 root root 3103 Oct 24 02:24 Buttons.css
-rw-r--r-- 1 root root 2418 Oct 24 02:24 Twitter.js
-rw-r--r-- 1 root root 756 Oct 24 02:24 TwitterQuery.html
ubuntu@domU-12-33-37-17-14-01:/var/www/temp$
```

One of the lessons to be learned from the above is that the pattern \~\$
references your home directory. 

## Copying or Moving Files {#copy}

Here is how to copy a file into a a particular directory:

``` {.code}
cp MyFile.txt MyDirectory/.
```

This command copies the file called **MyFile.txt** into the folder
called **MyDirectory**. The slash and dot at the end of the command say
that you are supposed to put the file that is being copied in the
position of the dot:

``` {.code}
MyDirectory/MyFile.txt
```

Here is how to move the file called **MyFile.txt** from its current
position to **MyDirectory**:

    mv MyFile.txt MyDirectory/.

Here is how to move two files called **bar.html** and **foo.html** to **my-folder**:

```bash
mv bar.html foo.html  my-folder/.
```

Here is how to copy a file called **MyPicture.png** from the
**Documents** directory to the **Pictures** directory:

``` {.code}
cp Documents/MyPicture.png Pictures/.
```

Note that when you give commands like this, they will only give you
feedback if they fail. If the command succeeds, it succeeds silently:

``` {.code}
charlie@ShantiLinuxServer:~$ cp /home/charlie/Documents/MyPicture.png Pictures/.
charlie@ShantiLinuxServer:~$
```

Notice that there is no text at all at the prompt that appears after the
command executes. That means that you command succeeded.

Here is what you see if you try to copy a file that does not exist. Note
that in this case we see an error:

``` {.code}
charlie@ShantiLinuxServer:~$ cp Documents/FooBar.png Pictures/.
cp: cannot stat `Documents/FooBar.png': No such file or directory
```

The cryptic words "cannot stat" means that the system cannot find your
file and report its status.

The following command will rename the file **RunMy.sh** to **RunMe.sh**:

``` {.code}
mv RunMy.sh RunMe.sh
```

Note that we have used the move (mv) command to rename the file. This is
common practice in Linux.

## Copying Directories

I frequently use [rsync][rs] to copy directories. Use this command to reqursively copy the **micros/qux** directory to a directory called qux that does not exist:

    rsync -av /home/charlie/Git/micros/qux/ qux

This preserves dates and times. If you run the command again, only updated or missing files will be copied.

The trailing **/** on the **micros/qux/** directory copies the contents of this directory. It does not copy the directory by name.

This is a more complex way to do it, but it does not preserve the time stamp (-t) and thus the files will be copied over and over again if you rerun it.    

    rsync -rvzh $HOME/Git/isit322-lastname-2019/micros/qux/ qux

    - a: Use archive mode
    - r: Copy recursively
    - z: compress the files while copying then decompress
    - h: human readable numbers
    - u: update only if source is newer or dates the same but size differs
    - v: verbose

See the [explainshell.com][exs] web site. Note that you can pass in specific command the options you want to see, like this:

- [https://explainshell.com/explain?cmd=rsync%20-rlptgoD][exs]


## Copying and Nested Folders

When copying directories you can sometimes end up with nested folders. Consider a command like this:

```bash
cp -r ~/Git/JsObjects/JavaScript/NodeCode/MakeHtml/ ~/Source/MakeHtml
```

This looks to me at first as if it ought to copy MakeHtml to **~/Source/MakeHtml**. But that is not what happens if **~/SourceMakeHtml** already exists. In that case it copies **MakeHtml** to **~/Source/MakeHtml/MakeHtml**.

Consider the following script, which illustrates the point. Save it to your **~/temp** directory as **cptest**, make it executable with **chmod +x cptest**, and run it. Open it in geany and make changes, then run it. After a bit, you should see the difference between copying with a period as the destination and copying with a directory name as the destination.

```bash
#! /bin/bash

mkdir -v /tmp/barfoo
echo 'test' > /tmp/barfoo/test
ls -lahd /tmp/b*

echo -e '\n--- Copy with period to create barfoo ---------------------\n'
cp -rv /tmp/barfoo/ ~/temp/.

echo -e '\n--- Copy with period does not nest even if barfoo exists --\n'
cp -rv /tmp/barfoo/ ~/temp/.

echo -e '\n---- Copy with dir name creates nested barfoo -------------\n'
cp -rv /tmp/barfoo/ ~/temp/barfoo
echo -e '\n-----------------------------------------------------------'

ls -gGahd ~/temp/b*
rm -rv /tmp/barfoo
rm -rv ~/temp/barfoo
```

It creates the following output:

```  {.code}
$ ./cptest
mkdir: created directory ‘/tmp/barfoo’
drwxrwxr-x 2 charlie charlie 4.0K Mar  8 09:13 /tmp/barfoo

--- Copy with period to create barfoo ---------------------

‘/tmp/barfoo/’ -> ‘/home/charlie/temp/./barfoo’
‘/tmp/barfoo/test’ -> ‘/home/charlie/temp/./barfoo/test’

--- Copy with period does not nest even if barfoo exists --

‘/tmp/barfoo/test’ -> ‘/home/charlie/temp/./barfoo/test’

---- Copy with dir name creates nested barfoo -------------

‘/tmp/barfoo/’ -> ‘/home/charlie/temp/barfoo/barfoo’
‘/tmp/barfoo/test’ -> ‘/home/charlie/temp/barfoo/barfoo/test’

-----------------------------------------------------------
drwxrwxr-x 3 4.0K Mar  8 09:13 /home/charlie/temp/barfoo
removed ‘/tmp/barfoo/test’
removed directory: ‘/tmp/barfoo’
removed ‘/home/charlie/temp/barfoo/test’
removed ‘/home/charlie/temp/barfoo/barfoo/test’
removed directory: ‘/home/charlie/temp/barfoo/barfoo’
removed directory: ‘/home/charlie/temp/barfoo’

```

Notice that the last copy command creates nested barfoo folders:

```  {.code}
‘/tmp/barfoo/’ -> ‘/home/charlie/temp/barfoo/barfoo’
‘/tmp/barfoo/test’ -> ‘/home/charlie/temp/barfoo/barfoo/test’
```

Some more hints. You can complete the assignment without it.

Go to your temp directory:

```
cd ~/temp
```

Create the file:

```
geany cptest
```

Paste the text from the assignment into it and save your file. Exit geany or switch back to the command line. Run the following command:

```
chmod +x cptest
```

Then run the program:

```
./cptest
```

## Directories

To delete an empty directory you can use **rmdir**. To delete a folder recursively, removing all its contents including nested sub-directories, use **rm -r**:

    rm -r <my-folder>

For instance:

    rm -r my-directory

## More Examples

This example below shows how to copy files from your home directory to
the **/r/www** directory. In particular, we are going to copy three
files called **index.html**, **index.css** and **index.js** to that
directory. In our example, **index.html** links in both **index.css**
and **index.js**.

**NOTE**: _I'm working on a local Linux box called **MountainPass**.
It is an instance of Ubuntu desktop 12.04. My user name
is **charlie**. So every time you see me write **charlie**, you would write or see your user name. For instance, if you are on a default
EC2 instance, you would write or see **ubuntu** instead
of **charlie.**_

Let's suppose you have used
[Filezilla](/charlie/development/cloud/SshFtpsPutty.html#filezilla) to
copy files to a directory called **Prog270** located on a Linux machine.
Suppose further that the directory is a sub-directory of your home
directory. We can check our current location using PWD:

``` {.code}
charlie@MountainPass:~/Prog270$ pwd
/home/charlie/Prog270
```

Let's get a listing of the files in the directory:

``` {.code}
charlie@MountainPass:~/Prog270$ ls
index.css index.html index.js
```

As you can see, the Prog270 directory contains three files called
**index.css**, **index.html** and **index.js**. Let's see what files are
currently in the **/var/www/** directory:

``` {.code}
charlie@MountainPass:~/Prog270$ ls /var/www
index.html
```

At this time there is only one file in **/var/www.** It is called
**index.html**. That file was put there as a default home page during
the install of the Apache web server. Our goal is to copy our three
files to the **/var/www** directory. When we are done, the original
default instance of **index.html** will be replaced with our new copy of
the file. We should also see **index.css** and **index.js** in the
**/var/www** directory.

Let's use the Linux **sudo** and **cp** commands to copy our files to
the **/var/www** directory:

``` {.code}
charlie@MountainPass:~/Prog270$ sudo cp * /var/www/.
charlie@MountainPass:~/Prog270$
```

We need to use the **sudo** command because the **/var/www** directory
is owned by **root**, and the user **charlie** does not have permissions
to write to that directly. The sudo command allows us to "do" something
as the **su**, or superuser. In other words, it lets us become root for
a short time. The **cp**, command, of course, is the Linux command for
copying files. The end result of using the two commands together is to
copy the files from the **Prog270** directory to the **/var/www**
directory.

Let's take a look at the state of the **/var/www** directory after the
copy:

``` {.code}
charlie@MountainPass:~/Prog270$ ls /var/www
index.css index.html index.js
```

As you can see, we have successfully copied the files **index.css**,
**index.html** and **index.js** to the **/var/www** directory. In this
process we intentionally overwrote the original copy of
**/var/www/index.html** with the new version of the file that we copied
from **/home/charlie/Prog270**. This was our goal, and so our task is
done. If Apache is set up right, and Port 80 is open, we can now go to a
web browser, point it at our Linux box, and see our new copy of
**index.html**. If we examine that file, we should find that it links
**index.css** and **index.js**.

## The Nano Editor

Nano is a text editor. Because it does not pop up a window, it can be used on both Desktop and Servers. Most importantly, it can be used when we SSH into a server instance such as the Ubuntu Server or EC2 instances.

There is a strong correlation between the commands you can use in Nano and the commands you can use in the bash shell. If you get good at using nano, you will find that your ability to work at the bash shell improves. For instance, **Ctrl-F**, **Ctrl-B** and **Ctrl-A** allow you to move through text both at the command line, and in Nano. In particular, they move the cursor one character forward, one character backwards, and all the way back to the beginning of the line.

Some helpful links:

- [Beginners Guide How to Geek](http://www.howtogeek.com/howto/42980/the-beginners-guide-to-nano-the-linux-command-line-text-editor/)
- [Homepage](http://www.nano-editor.org/overview.php)
- [Manual](http://www.nano-editor.org/dist/v2.2/nano.html)

A video:

- [https://youtu.be/k3XdhVwzIlk](https://youtu.be/k3XdhVwzIlk)

## Default Editor

If you want to make geany your default editor:

<pre>
sudo update-alternatives --install /usr/bin/editor editor /usr/bin/geany 10
sudo update-alternatives --config editor
</pre>

- [Default Editor](http://www.howtogeek.com/howto/ubuntu/change-the-default-editor-from-nano-on-ubuntu-linux/)

<!--       -->
<!-- links -->
<!--       -->

[exs]: https://explainshell.com/explain?cmd=rsync%20-rlptgoD
[rs]: https://www.tecmint.com/rsync-local-remote-file-synchronization-commands/
