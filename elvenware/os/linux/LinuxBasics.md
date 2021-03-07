Linux Basics
------------

This page covers some basic information about using Linux.

Linux Distros {#distros}
-------------

There are many different versions of Linux. At this time, I am primarily
interested in Ubuntu variants, including Mint and Ubuntu.

1.  Track the most popular distributions:
    [http://distrowatch.com/](http://distrowatch.com/)
2.  [Mint Linux](http://linuxmint.com/)
3.  [Ubuntu Linux](http://www.ubuntu.com/)

Installing Ubuntu on a Machine with Windows 8
---------------------------------------------

Windows locks down systems with UEFI. Here are instructions from
Ubuntu on how to play nice with this system and install Linux to dual
boot on the same machine:

- [UEFI: Dual Boot with Windows 8](https://help.ubuntu.com/community/UEFI)

Creating a Linux User {#linuxUser}
---------------------

In the example shown below, I assume that you are using an EC2 instance
of Ubuntu on the Amazon Web Services cloud. However, the information is
equally valid on any Linux box, whether it is in the cloud, or on your
local machine. The only caveat being that it is slanted toward Ubuntu or
Ubuntu related distros such as Mint.

To create a new user on Linux:

-   Use Putty to sign in to your EC2 box as **ubuntu.** The user
    **ubuntu** will have the rights to create your new user. (If you are
    not on an EC2 machine, just sign in to your account on the machine.
    The only caveat is that it must have privileges to run the **sudo**
    command.)
-   Create a new group for your user called FirstInitialLastName where
    FirstInitialLastName is the first letter of your first name and your
    full last name, all in lower case, like this: **jsmith**. Here is
    the command to create the user: **sudo addgroup jsmith.**In this and
    all subsequent commands, you should, of course substitute your user
    name where ever you see the words **jsmith.**
-   Issue this command: **sudo adduser --ingroup FirstInitialLastName
    FirstIntialLastName.**For example: **sudo adduser --ingroup jsmith
    jsmith**. During this process you will be prompted for a password.
    Make sure you don't forget it!
-   Now that you have created the new account, you might want to test it
    out. Here is the command to become jsmith: **su -l jsmith.** Here
    you would substitute your new user name for the **jsmith**. If you
    want to go back to being **ubuntu**, just type **exit.**

To review, here are the three commands:

```
    sudo addgroup jsmith
    sudo adduser --ingroup jsmith jsmith
    su -l jsmith
```

Here is what the session for creating a new group might look like:

```
    ubuntu@domU-12-25-27-0B-60-D0:~$ sudo addgroup jsmith
    Adding group `jsmith' (GID XXXX) ...
    Done.
    ubuntu@domU-12-25-27-0B-60-D0:~$
```

Here is what the session for creating a new user might look like:

```
    ubuntu@domU-12-25-27-0B-60-D0:~$ sudo adduser --ingroup jsmith jsmith
    Adding user `jsmith' ...
    Adding new user `jsmith' (1002) with group `jsmith' ...
    Creating home directory `/home/jsmith' ...
    Copying files from `/etc/skel' ...
    Enter new UNIX password:
    Retype new UNIX password:
    passwd: password updated successfully
    Changing the user information for jsmith
    Enter the new value, or press ENTER for the default
     Full Name []: Julie Smith
     Room Number []:
     Work Phone []:
     Home Phone []:
     Other []:
    Is the information correct? [Y/n] Y
```

Note that you entered a password and a full name. You can just hit enter
for the **Room Number** all other prompts, until you get to the question
about whether the information is correct. For that you must answer **Y**
for **yes**. This command creates a new user, and adds him to the a new
group called **jsmith**. Your group name, of course, will your first
initial and last name, not mine.

Here is what the session to become a new user might look like:

```
    ubuntu@domU-12-25-27-0B-60-D0:~$ su -l jsmith
    Password:
    jsmith@domU-12-25-27-0B-60-D0:~$
```

Note that after you issue the command, your shell prompt has changed to
include your new user name:

    jsmith@domU-12-25-27-0B-60-D0:~$

You use this hint to help you confirm that you are signed in as a new
user. Another technique is to issue the command: **whoami**.

Please note that when you become the new user you will not have as many
rights on the system as you did when you were **ubuntu.** We could, of
course, have given **jsmith** those rights, but we did not. The
**jsmith** account will become our new outward facing interface to the
site. As a result, we want it to be as secure as possible. The way
things are set up now, even if the user were entirely compromised, the
hacker could only do damage to the users account. They would find it
relatively difficult, however, to use the account to gain control of the
system.

Here is how to delete a user account if you want to start over:

    sudo userdel jsmith

Set Up SSH {#ssh}
----------

Now that you have created your new user account, you will probably want
to set up SSH so that you can use Putty and Filezilla to sign in and
copy files to this account's **public\_html **directory or some other
location on the server. Here is an overview of what we are going to do:

1.  Generate a new SSH key
2.  Copy the private key (pem file) back to our home machine
3.  Convert the PEM file to PPK file
4.  Set up Putty and Filezilla to work with your new user

**NOTE**: *Another, and perhaps more secure, approach would be to create
the new private/public key pair on your home system, and copy only the
public key to the new users account. Though that technique is a best
practice, I'm not doing that now because it is a bit more difficult for
new comers. One step at a time!*

Here is how to set up a key ***from the new users home directory***:

    ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

**NOTE**:  *Commands like those shown above are difficult to get right.
You can, however, block copy both lines and paste the commands directly
into the shell window. Here is how to proceed: On your home machine,
copy the commands with **Ctrl-C**. Now switch to the Putty shell. Right
click on the command line, and both lines should be fed into the command
line window and executed, one right after the other. It is probably
helpful to type in relatively simple commands by hand, as it will help
you memorize them. But these commands are confusing for new comers, and
you need not attempt to memorize them.*

Because of their arcane complexity, it is probably best for new comers
to think of the commands shown above as some kind of Harry Potter like
incantation (ie ***Expecto Patronum***) that creates the new key pair,
and then copies the public key into a file called **authorized\_keys**.
The newly created public key is called **id\_rsa**. At this stage, you
need not know more -- except for one minor detail! Note the permissions
for **id\_rsa:**

    -rw------- 1 jsmith jsmith 1675 Nov  9 21:21 id_rsa

As you can see, only the owner has permissions to read and write to the
file. In theory, no one else can even see the file or do much useful
with it. If you don't have read permissions, you can't even see that the
file exists. (You will find, however, that root can manipulate the
file.)

You now have to copy the key that you created from your Linux box back
to your home machine.

-   First, issue the **exit** command so that you one again become
    ubuntu.
-   Then copy the key (**id\_rsa) **into the **ubuntu** home directory.
-   Use Filezilla to copy it to your home machine.
-   For security purposes, you should now delete the key from your
    **ubuntu** home directory and from **jsmith's** .ssh directory.
-   On your home machine, use PuttyGen to convert the key to a PPK file,
    just as you did when first setting up EC2.
-   Set up Putty and and Filezilla

Once you are ubuntu, here is how the process of copying the file from
the **jsmith**directory to the **ubuntu **home directory looks:

    sudo cp /home/jsmith/.ssh/id_rsa .

Now make the file visible to filezilla:

    sudo chown ubuntu:ubuntu id_rsa

This command sets the owner and group for **id\_rsa** to **ubuntu.**
This means that **ubuntu** now owns the file, and hence has rights to
it. This is a crucial step since Filezilla is attached to your Linux box
as the user **ubuntu. **If the file were were still owned by **jsmith**
or by **root,** then **ubuntu**, and hence Filezilla, would not have the
rights to copy it to your home machine.

Now copy it over with filezilla. Once you have it safely on your
machine, the wisest thing to do might be to delete the file from your
ubuntu and jsmith folders:

    rm id_rsa

Windows feeds on file file extensions, and we have only a limited
internal memory capacity. As a result, on your home machine I would
rename **id\_rsa** to something more friendly: **ec2\_jsmith.pem**

Now use PuttyGen to convert the PEM file to a PPK file, as described
earlier. Add the file to Pageant. Set up Putty and see if you can
connect. Everything is as before, but of course this time in the Data
page of Putty, you should set the user name to your first initial and
last name:

![Putty01.png](images/Putty01.png "Click to embed Putty01.png")

**Figure 01: Fill in your user name in the Auto-login field.**

You have now completed the process of creating a new user on Linux with
minimum privileges. If you would like to learn how to give the user
privileges to serve up HTML files from a **public\_html** directory,
then go here:

- [/charlie/development/web/Server/Apache.html](/charlie/development/web/Server/Apache.html)

## Reverse Search

A command I use a lot is reverse-i-search. At the command prompt, type Ctrl-r. Start typing. For instance type git. You will see the last command you issued that began with those letters. Much like what Ben points out above. Now press Ctrl-r again, you will see the previous command you issued that began with those three letters. And so, on pressing Ctrl-r over and over till you find the command you wanted.

When you find the chosen command, press enter.

- [LifeHacker on Revese Search](https://lifehacker.com/278888/ctrl%252Br-to-search-and-other-terminal-history-tricks)

This whole thread is perhaps worth reading:

- [StackExchange Reverse Search](https://unix.stackexchange.com/questions/73498/how-to-cycle-through-reverse-i-search-in-bash?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)


## Using sed

The best thing to do, I think is to break the command in two:

    find . -iname "*.js" -not -path "**/node_modules/**"

    sed -i 's/isit-code-calvert/isit-code-lastname/g' *.js

Learning to use find is not too tricky. But **sed** is hard, at least for me.

Create a simple text file called learn-sed.txt with three words in it:

<pre>one two three</pre>

Maybe like this:

<pre>echo 'one two three' > learn-sed.txt</pre>

Now start running some tests:

<pre>$ cat learn-sed.txt   
one two three  
charlie@rohan-elf:~/temp  
$ sed 's/one/sed-did-this/g' learn-sed.txt   
sed-did-this two three  
charlie@rohan-elf:~/temp  
$ sed 's/two/sed-did-this/g' learn-sed.txt   
one sed-did-this three  
charlie@rohan-elf:~/temp  
$ sed 's/three/sed-did-this/g' learn-sed.txt   
one two sed-did-this</pre>

Do you see that **sed** replaced one of the words in the file? In this case, think of sed as a search and replace tool. In the first example, we replace the word **one** with **sed-did-this**. Then we replace the word two with the same string. And finally, we replace the word **three.**

When we give the command s, we are saying, replace the first expression with the second:

*   s: this is the command "**s**/---/---/

The word we want to replace is here:

*   -/ReplaceMe/---/

The word or phrase to replace it with:

*   -/---/TheNewWord/

And finally, we can ask **sed **to do this globally throughout the document:

*   -/---/---/**g**

If we add **-i** at the beginning, we are saying "do it in-place". That is, don't just echo the result to the screen, instead write the result to disk by replacing the original file:

<pre>$ cat learn-sed.txt   
one two three  
charlie@rohan-elf:~/temp  
$ sed -i 's/three/sed-did-this/g' learn-sed.txt   
charlie@rohan-elf:~/temp  
$ cat learn-sed.txt   
one two sed-did-this</pre>

You can see that this time the actual contents of **learn-sed.txt** was changed.

I should add that this is a gross over-simplification, in large part because I'm not bringing in regular expressions. Nevertheless, this is enough information to help you understand the code that I want you to use.

## Tips on Setting up Users {#userTips}

Notice that we have not given the new user you create permission to run sudo. If you try to run a **sudo** command as the new user, the sudo nazi's will come get you:

```
	ccalvert@domU-12-25-27-0B-60-D0:~$ sudo ls /var/www/
	[sudo] password for jsmith:
	jsmith is not in the sudoers file. **This incident will be reported.**
	jsmith@domU-12-25-27-0B-60-D0:~$
```

Of course, you can always become **ubuntu** again if you want to run a
**sudo** command. In the meantime, it is best run as a normal user that
does not to even have the rights to be **root**. That makes your system
much more secure.

**NOTE**: _Windows users have the ability to use Putty to sign in to your server either as ubuntu or as your newly created user. Consider opening up two Putty shell windows, one as Ubuntu, the other as your new user.
That way you can do 99 percent of your work as the normal user, and resort to the power of being ubuntu only on rare occasions._

Some links with additional information that you may or may not find
useful:

-   [http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html\#sshKeys](http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#sshKeys)
-   [http://blog.sofasurfer.org/2011/07/16/ubuntu-ec2-add-new-admin-user/](http://blog.sofasurfer.org/2011/07/16/ubuntu-ec2-add-new-admin-user/)

## Installing Ubuntu Server Under Hyper-V {#hyperv}


-   Here is a [helpful
    page](http://narendrapatel.com/2011/05/installing-ubuntu-serve-11-04-64bit-on-hyper-v/)
    on Installing Ubuntu Server on Hyper-V
-   Here are the hyper-v [keyboard
    shortcuts](http://jimblizzard.wordpress.com/2009/05/22/hyper-v-keyboard-shortcuts-in-the-vm/).

## The Key Points

The install works more or less the way it would under VirtualBox, with a few minor variations. But getting the hyper-v extensions (which actually ship with Ubuntu!) and the networking going can be more complex.

Start by using the nano (or pico) editor, or some editor of your choice, to modify the modules file:

```
sudo nano /etc/initramfs-tools/modules
```

In the file, add these four lines which initializae the hyper-v extensions:

```
hv_vmbus
hv_storvsc
hv_blkvsc
hv_netvsc
```

Exit the editor and then type:

```
sudo update-initramfs –u
sudo reboot
```

Now do this:

    sudo nano /etc/network/interfaces

Yes the pico editor to add these lines to your file:

```
Auto eth0
iface eth0 inet dhcp
```

Now you need to restart networking and reboot:

```
sudo /etc/init.d/networking restart
sudo reboot
```
