---
layout: post
date: 2023-05-08 03:38:38 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/Hadoop.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud
fileName: Hadoop.md
relativePath: /cloud/Hadoop.md
title: Hadoop
directoryName: cloud
category : cloud-guide
---

## What is Hadoop {#what}

A typical hard drive is 2 terabytes (2 TB) in size. It takes about five
hours to read all the data on a single disk. If we could split the data
over 200 hard drives, all 2 TB could be read in about 5 minutes. This is
possible because each drive contains only 1/200th of the data, and thus
needs to read much less data to finish its part of the task. It is the
same principle that is involved with asking 1 person with a single
gallon bucket to move a 2000 gallons of water vs. asking 200 people with
200 one gallon buckets to move 2000 gallons of water. If a trip takes
one minute, then one person can do the job in 2000 minutes or 33 hours.
200 people, on the other hand, can do the job in 10 minutes. This is the
power of distributed, parallel computing, and it is the task undertaken
by Hadoop.

One of the goals of Hadoop is to make it possible to do distributed data
over multiple drives bought at a typical computer store. We are not
talking about some huge mainframe, but about off the shelf drives you
might buy at Amazon, Newegg or at Fry's Electronics.

Hadoop is designed to solve problems associated with huge datasets. If
you a site gets 100 million visitors each month, each of which leaves a
trail of data one megabyte in size, then the site must track 100 million
megabytes a month, or over a billion megabytes a year.

Hadoop was partially developed at Google, and they use it to solve many
of their problems.

MapReduce and HDFS {#mapReduce}
------------------

If we are going to distribute data over 100 hard drives, then we need to
find a way to reassemble it, or to combine it with other bits of data
quickly and easily. The part of Hadoop called MapReduce addresses this
issue. Map/Reduce assembles the bits of data across the various hard
drives, but it does more than that. It allows developers to create
applications that run concurrently across all the nodes of the system,
with one set of tasks performed on one machine, another on a second
machine and so on. That is the Map part of the equation. Then the reduce
part of the equation takes all these distributed pieces of work and
assembles the results.

Suppose ten million visitors

The part of Hadoop called HDFS deals with the problem of hardware
failure. If we are going to spread out data over 100 hard drives, then
the chance of loosing some of it due to hardware failure is higher than
it might be on a single machine. The goal is to duplicate the data, so a
loss of one hard drive will not destroy the entire terabyte of data.

Setup
-----

Most of the rest of this document describes one possible way to set up
Hadoop with a minimal configuration for testing Hadoop on a single
machine. Hadoop normally runs in multi-user mode, but here we are going
to use only a single machine. This kind of setup provides a good way for
you to learn the basics of hadoop before you begin deployment across
multiple machines.

### Mercurial

I have created a set of scripts that can help step you through the
Hadoop install. They are stored with a number of other files and
programs in the Elvenware repository. Instructions on setting up
Mercurial are now on the Mercurial page:

~~~~ {.code}
http://www.elvenware.com/charlie/development/cloud/Mercurial.html
~~~~

### Install Java {#java}

Setting up Java can be a bit of a problem. It is best to get it out of
the way first. I have tested with both Sun JDK6 and Sun JDK7, and both
seem to work. Below I focus mosting on JDK6, but here is a post on
[installing
JDK7](http://askubuntu.com/questions/55848/how-do-i-install-oracle-java-jdk-7).

NOTE: I have recently come to rely on the simple method found here:

    http://www.webupd8.org/2012/01/install-oracle-java-jdk-7-in-ubuntu-via.html

By default, you do not have the right version of Java on Ubuntu Linux.
The following commands should fix the situation:

~~~~ {.code}
wget https://raw.github.com/flexiondotorg/oab-java6/master/oab-java6.sh -O oab-java6.sh
chmod +x oab-java6.sh
sudo ./oab-java6.sh
~~~~

After the endless process outlined above finally terminates, do this:

~~~~ {.code}
sudo apt-get install sun-java6-jdk
sudo update-alternatives --config java
~~~~

More information on the scripts shown above is available here:

[https://github.com/flexiondotorg/oab-java6](https://github.com/flexiondotorg/oab-java6)

This should work to setup Java Sun on Mint Linux:

~~~~ {.code}
sudo add-apt-repository "deb http://archive.canonical.com/ lucid partner"
sudo apt-get update
sudo apt-get install sun-java6-jdk
sudo update-java-alternatives -s java-6-sun
~~~~

On one of my system, a day or more after completing  the above steps,
when I ran **sudo apt-get update** I got the following error:

~~~~ {.code}
W: GPG error: http://ppa.launchpad.net oneiric Release: The following signatures
couldn't be verified because the public key is not available: NO_PUBKEY 2EA8F35793D8809A
~~~~

To elimate the error, I used the menu to go to **System Settings |
Software Sources | Other Software** and unchecked**** the references to
flexiondotorg. Then I could run **sudo apt-get update** without error.

### User Setup {#user}

It is optional as to whether or not to create a user called Hadoop, but
I strongly recommend that you do so. This may have security benefits,
but we like it primarily because it keeps all the Hadoop related
configuration in one place. In the process a custom .**bashrc** file is
set up just for the Hadoop user, which means that we can configure the
environment just for him withou muddying up the configuration your
primary user account, which can be nice.

This code create a new group called hadoop, adds a user to it, adds the
user to the admins group and then switches you over from being yourself
to being hadooper. There will be a number of prompts you need to respond
to on the way.

~~~~ {.code}
sudo addgroup hadoop
sudo adduser --ingroup hadoop hadooper
sudo usermod -a -G admin hadooper
su -l hadooper
~~~~

I have created a script called **CreateUser.sh** that performs these
actions automatically. See the [end of this document](#scripts)for more
details.\

### SSH Setup {#ssh}

For Hadoop to work, you have to be able to use SSH to communicate
between two machines. In some cases, you will even need to be able to
SSH into your current machine. There is generally no real world use for
using SSH to communicate with your own machine, but sometimes it can be
part of a testing process. In particular, if you are setting up HADOOP
to run on a single node for testing or educational purposes, then you
will need to SSH into your current machine. I cover these aspects of SSH
in a separate file:

-   [Documentation on SSH and the **authorized\_keys**
    file.](SshFtpsPutty.html#sshKeys)

Read the appropriate documentation on SSH and then return to this
document after you have learned how to use SSH to start an SSH session
on your localhost.

Install Hadoop {#hadoop}
--------------

Assuming you have completed the above steps, you are now ready to
install Hadoop. This can be accomplished by running the **addNano.sh**
script discussed at [the end of this document](#scripts). What follows
is a description of that script does.

Here is the download page for Hadoop:

~~~~ {.code}
http://www.apache.org/dyn/closer.cgi/hadoop/common/
~~~~

You can also try to download Hadoop by issuing the following command at
the Linux command prompt:

~~~~ {.code}
wget http://apache.cs.utah.edu//hadoop/common/hadoop-1.0.1/hadoop-1.0.1.tar.gz
~~~~

The following script downloads and extracts hadoop:

~~~~ {.code}
wget http://apache.cs.utah.edu//hadoop/common/hadoop-1.0.1/hadoop-1.0.1.tar.gz
tar xzf hadoop-1.0.1
sudo mv hadoop-1.0.1.tar.gz /usr/local/hadoop
sudo chown -R hadooper:hadoop /usr/local/hadoop
~~~~

 The scripts starts by downloading a file that is both zipped (gz) and
tarred (.tar):

~~~~ {.code}
hadoop-1.0.1-bin.tar.gz
~~~~

Take a moment to examine this file name, and particular the part at the
end. The **tar** extensions means that many files have been wrapped
together in one big file called **hadoop-1.0.1-bin.tar**. Then gzip
compressess that file into a file called **hadoop-1.0.1.tar.gz**. The
following command reverses the process by unzipping the tar file and
then extracting (untarring) the contents:

~~~~ {.code}
tar xzf hadoop-1.0.1-bin.tar.gz
~~~~

After the command is run you should see a folder called hadoop-1.0.1.
You can usually tell a folder from a file because it is shown in light
blue, and because its permissions begin with drwxr-etc.

The script then moves (mv) the folder to /usr/local/hadoop. The command
does two things: it moves the folder to a new location, and then renames
it by removing the version number. When you are done, you should be able
to see the contents of the folder:

~~~~ {.code}
charlie@MintBox ~/Downloads $ ls /usr/local/hadoop/
bin hadoop-client-1.0.1.jar ivy.xml sbin
build.xml hadoop-core-1.0.1.jar lib share
c++ hadoop-examples-1.0.1.jar libexec src
CHANGES.txt hadoop-minicluster-1.0.1.jar LICENSE.txt test.sh
conf hadoop-test-1.0.1.jar logs webapps
contrib hadoop-tools-1.0.1.jar NOTICE.txt
hadoop-ant-1.0.1.jar ivy README.txt
charlie@MintBox ~/Downloads $
~~~~

Set up the Environment {#environment}
----------------------

It is now time to set up the environment. There are two useful, but
optional, environment variables that we can set up, plus we must set up
JAVA\_HOME. To set up these ennvironment variables, we could type the
following each time we become Hadooper:

~~~~ {.code}
export JAVA_HOME=/usr/lib/jvm/default-java
~~~~

The above is preferred, but alternatively, you can explicitly name the
version you want to use:

~~~~ {.code}
export JAVA_HOME=/usr/lib/jvm/java-6-sun
~~~~

Rather than trying to configure these items by hand each time we become
Hadooper, it is better to put them in a file called **.bashrc**. To
oversimplify a somewhat complex subject, I'll say only that the
**.bashrc** file allows us to configure the environment automatically
each time we log in to the bash shell. This occurs because **.bashrc**
is run once, just as we are signing in as hadooper. You will recall that
to sign in as hadooper, we usually write something like this: **su -
hadooper**.

NOTE: *Files that begin with a period are "invisible" or "hidden" by
default. If we type* ***ls****to get a listing of a directory, we don't
see them. To make them "visible," we should type* **ls -**a:

~~~~ {.code}
$ ls
andelf bar Downloads examples.desktop
$ ls -a
. bar .bashrc examples.desktop .sudo_as_admin_successful ..
.bash_history .cache .profile andelf .bash_logout Downloads .ssh
~~~~

Here is the code we want to put in the .**bashrc** file:

~~~~ {.code}
# Set JAVA_HOME:
export JAVA_HOME=/usr/lib/jvm/default-java
~~~~

The first line is a comment, the second sets a variable in the
environment of our OS. Our goal, then, is to create a file called
.**bashrc** in our HOME directory, which will be **/home/hadooper**.
Type **cd** followed by enter with no parameters to move to your home
directory, and then to check which directory you are in right now, type
**pwd**:

~~~~ {.code}
hadooper@WesternSeas:~$/bin cd
hadooper@WesternSeas:~$ pwd
/home/hadooper
~~~~

As you can see, we are now in **hadooper's** home directory, which is
**/home/hadooper.**That's just where we want to be.

The home directory is where you want to create your .**bashrc** file. To
create it, type:

~~~~ {.code}
nano .bashrc
~~~~

You may find that .**bashrc** already exists, and already has the right
entries in it, as one of my scripts takes care of that for you. But if
you want to do it all by hand, then you should enter the following code
into .**bashrc**, then type **Ctrl-O** plus **enter** to save and
**Ctrl-X** to exit:

~~~~ {.code}
# Set JAVA_HOME:
export JAVA_HOME=/usr/lib/jvm/default-java
~~~~

At this stage we need to run the .bashrc file so that the environment
will be properly set up. The best way to run the file is to temporarilly
stop being hadooper, and then sign back in again. To do this, type exit
once or twice, until you become the regular user again, that is, until
you exit the **hadooper** shell. Then log back in as hadooper:

~~~~ {.code}
su - hadooper
~~~~

When you log back in your .**bashrc** file will run automatically, as
indeed it will each time you log in from this point forward. That's the
whole point of .**bashrc**, it is a file that is run when you log into
the bash shell; you place in that file any code that you want to run at
the beginning of a user session. The type of code we placed in
.**bashrc** is typical, in that it is designed to set up the
environment. In particular, when your .**bashrc** file runs,
**JAVA\_HOME** variables in the environment. To check this, type echo
\$**JAVA\_HOME**, etc:

~~~~ {.code}
echo $JAVA_HOME
/usr/lib/jvm/java-6-sun
echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/usr/local/hadoop/bin
~~~~

As you can see, all the environment variables that we wanted to
configure are now set up correctly.

Alternatively, the following can be used to test the status of an
environment variable:

~~~~ {.code}
{$JAVA_HOME:?}
~~~~

We are ready to move on to the next step.\

Configure Hadoop {#configure}
----------------

There are several files found in the **conf**directory that you need to
configure:

-   **Common properties**: core-site.xml
-   **Configure HDFS**: hdfs-site.xml
-   **Configure MapReduce**: mapred-site.xml

And here is what goes in each file:

    <?xml version="1.0"?>
    <!-- core-site.xml -->
    <configuration>
      <property>
        <name>fs.default.name</name>
        <value>hdfs://localhost/</value>
      </property>
    </configuration>

    <?xml version="1.0"?>
    <!-- hdfs-site.xml -->
    <configuration>
      <property>
        <name>dfs.replication</name>
        <value>1</value>
      </property>
    </configuration>

    <?xml version="1.0"?>
    <!-- mapred-site.xml -->
    <configuration>
      <property>
        <name>mapred.job.tracker</name>
        <value>localhost:8021</value>
      </property>
    </configuration>

Also be sure you set up the tmp directory and format the namenode:

~~~~ {.code}
sudo mkdir -p /app/hadoop/tmp
sudo chown -R hadooper:hadoop /app/hadoop/tmp
/usr/local/hadoop/bin/hadoop namenode -format
~~~~

Starting Hadoop {#startHadoop}
---------------

***This section under construction....***

To start Hadoop, run the scripts in the bin directory:

~~~~ {.code}
/usr/local/hadoop/bin
~~~~

Assuming you have navigated to the bin directory, the command to start
Hadoop looks liks this:

~~~~ {.code}
./start-all.sh
~~~~

To see if Hadoop started correctly, use the jps command. The output
should look something like this:

~~~~ {.code}
$ jps
3216 DataNode
3524 JobTracker
3917 Jps
3759 TaskTracker
2993 NameNode
3443 SecondaryNameNode
~~~~

There are a set of log files in the hadooper logs directory. To switch
to the directory, type something like:

~~~~ {.code}
cd /usr/local/hadoop/logs/
~~~~

Looking through those log files can help you find the errors that may or
may not occur.

Here is a command to view a log file:

~~~~ {.code}
cat hadoop-hadooper-datanode-WesternSeas-VirtualBox.log
~~~~

There are several different log files in the log directory, you can find
them by using the**ls** commind to****look for the files that have .log
as an extension:

~~~~ {.code}
$ ls *.log
hadoop-hadooper-datanode-WesternSeas-VirtualBox.log
hadoop-hadooper-jobtracker-WesternSeas-VirtualBox.log
hadoop-hadooper-namenode-WesternSeas-VirtualBox.log
hadoop-hadooper-secondarynamenode-WesternSeas-VirtualBox.log
hadoop-hadooper-tasktracker-WesternSeas-VirtualBox.log
~~~~

And here is the command to stop Hadoop:

~~~~ {.code}
./stop-all.sh
~~~~

Restart Hadoop {#restart}
--------------

If you shut down all the machines in the cluster, it is a good idea to
completely restart.

This script, called **MasterCleanAndRestart.sh** is for the master
machine:

~~~~ {.code}
echo "Stopping Hadoop"
bash /usr/local/hadoop/bin/stop-mapred.sh
bash /usr/local/hadoop/bin/stop-dfs.sh
echo "Refreshing and reformatting file system"
bash CleanAndRestart.sh
echo "Run ClearAndRestart on slave machines"
read -p "Press [Enter] key to re-start hadoop..."
bash /usr/local/hadoop/bin/start-dfs.sh
bash /usr/local/hadoop/bin/start-mapred.sh
~~~~

This script called **CleanAndRestart.sh** is for the client, or slave
machines:

~~~~ {.code}
# Any time you shut down Hadoop altogether, and particularly if you
# shut down the machine it is on, you really ought to clean out the  out the
# temp files and reformat the drive for the distributed file system,
# which means you lose all your data.
sudo rm -r /app/hadoop/tmp/
sudo mkdir -p /app/hadoop/tmp
sudo chown -R hadooper:hadoop /app/hadoop/tmp
/usr/local/hadoop/bin/hadoop namenode -format
~~~~

 

Multinode
---------

Begin by starting to Linux VMs on the same machine. In this example,
let's pretend that your first VM is named BoxPrimary, and the second VM
is named Box02. In giving them these names, we are implicitly deciding
that BoxPrimary will be our primary, or master, hadoop server. It will
be the job-tracker and the name-node. All the other machines we add to
our hadoop network will face toward this machine. You might have
assignment your machines different names, but that is an implementation
detail. The point is that you have two Linux VMs running, and that you
have decided one of them will be the primary hadoop server.

Edit the /etc/hosts file in both virtual machines so that the two
machines can ping one another:

-   192.168.56.101    BoxPrimary
-   192.168.56.102    Box02

The actual names and IP addresses you use for the these two boxes will
likely depend on the names you originally gave to your two Linux VMs, as
well as the IP addresses assigned to them by the DHCP server. Remember
that you can type **ipconfig** to find out the current IP address of
your server. Furthermore, you need not use the same name in the hosts
file as you gave to your VM when you created it, though it might be less
confusing if you did indeed give them the same name. To test the
configuration, go to the command line of **Box02** and type **ping
BoxPrimary.**Then go to the command line of BoxPrimary and type **ping
Box02**. When you are done, press **Ctrl-C**to end the ping session:

~~~~ {.code}
$ ping Box02
PING Box02 (192.168.56.102) 56(84) bytes of data.
64 bytes from Box02 (192.168.56.123): icmp_req=1 ttl=64 time=2.55 ms
64 bytes from Box02 (192.168.56.123): icmp_req=2 ttl=64 time=0.667 ms
~~~~

Now become Hadooper and copy the SSH public key from the first machine
to the second

~~~~ {.code}
ssh-copy-id -i $HOME/.ssh/id_rsa.pub hadooper@Box02
~~~~

When I entered the code shown above, the result looked like this:

~~~~ {.code}
ssh-copy-id -i $HOME/.ssh/id_rsa.pub hadooper@Box02
The authenticity of host 'Box02 (192.168.0.124)' can't be established.
ECDSA key fingerprint is f9:6e:01:0e:34:d7:3b:6c:3a:bd:78:92:69:21:90:70.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'Box02,192.168.0.124' (ECDSA) to the list of known hosts.
hadooper@Box02's password:
Now try logging into the machine, with "ssh 'hadooper@westernseas'", and check in:

  ~/.ssh/authorized_keys

to make sure we haven't added extra keys that you weren't expecting.
~~~~

Following the hint displayed above, I tried to SSH into Box02:

~~~~ {.code}
$ ssh hadooper@Box02
Welcome to Ubuntu 11.10 (GNU/Linux 3.0.0-16-generic i686)

 * Documentation:  https://help.ubuntu.com/

0 packages can be updated.
0 updates are security updates.

Last login: Sun Mar  4 13:20:13 2012 from localhost
~~~~

The key thing to notice in the code shown above is that that I was never
prompted for a password. That is the way things should be when an SSH
public/private key pair is set up correctly.

Once you have setup SSH so that you can pop over to Box02 without being
prompted for a password, you want to do the same thing in reverse; that
is, you want to set things up so that you can ssh from Box02 to
BoxPrimary. To begin, log into Box02, and then run the same command you
ran in BoxPrimary:

~~~~ {.code}
ssh-copy-id -i $HOME/.ssh/id_rsa.pub hadooper@BoxPrimary
~~~~

Now check to make sure you can ssh into BoxPrimary without entering a
password:

~~~~ {.code}
ssh hadooper@BoxPrimary
~~~~

### Setup Master and Slave Files

You need to edit core-site.xml and madred-site.xml and change the URL
from localhost to BoxPrimary in both BoxPrimary and Box02:

    <property>  <name>fs.default.name</name>  <value>hdfs://BoxPrimary:54310</value>
    </property>               

Make this change also in mapred-site.xml:

~~~~ {.code}
<property>
<name>mapred.job.tracker</name>
  <value>BoxPrimary:54311</value>
</property>
~~~~

In BoxPrimary, go ahead and start the server

~~~~ {.code}
./start-dfs.sh
~~~~

In BoxPrimary:

~~~~ {.code}
$ jps
10581 Jps
10581 Jps
10510 SecondaryNam10100 NameNode
~~~~

In Box02:

~~~~ {.code}
 jps
6281 J5956 DataNode
~~~~

If you have trouble, check the logs in Box02:

~~~~ {.code}
 cat hadoop-hadooper-datanode-Box02.log
~~~~

Errors can include something like this:  **INFO
org.apache.hadoop.ipc.Client: Retrying connect to server:**Errors of
that type probably means there is something wrong in the /etc/hosts file
either on PrimaryBox or Box02, or perhaps in both places.

If everything is working, then
[http://BoxPrimary:50070/dfshealth.jsp](http://BoxPrimary:50070/dfshealth.jsp)
will show at least one live node

### Running a Test {#runTest}

This script is called **RunApp.sh.**It is designed to run one of the
example applications that ship with hadoop. It is probably a good idea
to completely restart the system between tests, as described above in
the [Restart](#restart) section.

~~~~ {.code}
#!/bin/bash

HADOOP="/usr/local/hadoop/bin/hadoop"
echo $HADOOP
DFS=$HADOOP" dfs"
JAR=$HADOOP" jar"
GUTENBERG="/user/hadooper/gutenberg"
OUTPUT=$GUTENBERG"-output"

echo $DFS
$DFS -rmr $GUTENBERG
$DFS -rmr $OUTPUT
$DFS -copyFromLocal $HOME/gutenberg $GUTENBERG
$DFS -ls /user/hadooper
$DFS -ls $GUTENBERG

$JAR /usr/local/hadoop/hadoop-examples-1.0.1.jar wordcount $GUTENBERG $OUTPUT
read -p "Press [Enter] key to see the results"
/usr/local/hadoop/bin/hadoop dfs -cat /user/hadooper/gutenberg-o/usr/local/hadoop/bin/hadoop dfs -cat /user/hadooper/gutenberg-output/part-r-00000
~~~~

The Scripts {#scripts}
-----------

If you download the [mercurial sources](Mercurial.html) linked to
Elvenware you will find a number of the scripts shown on this page in
the Python/CreateHadoopFiles directory. Here is how to use them.

When you download the files from elvenware repository, it is often
helpful to copy the hadoop files into a folder called bin:

~~~~ {.code}
/home/hadooper/bin
~~~~

If you are already in **bin**, then you can use this command to copy the
files from the downloaded repsoitory into your current directory, so
long as you have the most recent version of the repository in
**/home/hadooper/andelf**:

~~~~ {.code}
cp /home/hadooper/andelf/Python/CreateHadoopFiles/src/* .
~~~~

Then you need to run one or more of the scripts. To prepare them, first
make them executable:

~~~~ {.code}
chmod +x *.sh
~~~~

You can now run the scripts by typing ./SomeScript.sh. For instance, you
might do this to execute the script called GetBooks:

~~~~ {.code}
./GetBooks.sh
~~~~

After running the script, you should find that James Joyce's **Ulysses**
and other books have been downloaded and stored in the following folder:

~~~~ {.code}
/home/hadooper/gutenberg
~~~~

Considered as a whole, the Hadooper scripts from the repository are
designed to to perform certain key steps, such as downloading and
installing Hadoop, or setting up SSH, or running the application.

Here is a good order for running the scripts:

-   Get [Java](#java) set up one way or another. The script
    **./addSun.sh**will do this for you, but **cat** it out first so you
    understand what it does.
-   Create the user by running **./CreateUsers.sh**.

After creating the users will automatically be running as the user
Hadoop. Now:

-   Run the ssh script: **./setupSsh.sh**
-   Run **addNano.sh** which installs hadoop. (Sorry about the naming, I
    need to fix it change the name to **addHadoop.sh**. At this stage,
    you may need to become the regular user for a moment to be sure that
    the newly created **.bashrc** gets run.
-   Run the python script called **CreateScripts.sh: python
    CreateScripts.py**

There is some manual configuration you will need to do with the host
files and copying the .ssh keys back to the primary or master box. After
that, you are essentially ready to run. I would go through this process
after you bring up all the nodes, and before you first run an
application:

-   On the Master machine, run **./MasterCleanAndRestart.sh**
-   The script will pause halfway through. During the pause, run
    ./CleanAndRestart.sh on each of the clients.
-   Come back and press enter to finish running
    **./MasterCleanAndRestart.sh**
-   Now you can run the test: **./RunApp.sh**

As long as you don't shut down the machines, you shouldn't have to
bother with running **./MasterCleanAndRestart.sh**
or**./CleanAndRestart.sh** inbetween test runs The problems I've had
seem to occur when the file systems get out of sync on the various data
nodes. Once that happens, I think it is simplest to start over, but
below in the Linkx section you can see a note about namespaceids.

The other problem:: I have had the whole process of running the
application stop during the Reduce phase at some point such as 22%.
There is a very long pause, maybe five minutes, and then you get an
error about too many something or others being created, and then the
process finishes normally. When I encountered this error, it meant that
I had one or or more of my hosts files incorrectly configured, by which
I mean I simply had a type in the name of one of the hosts, or had left
out a host, or had typed in an IP address incorrectly. Nothing tricky,
but just wrong.

Links {#links}
-----

-   [http://wiki.apache.org/hadoop/GettingStartedWithHadoop](http://wiki.apache.org/hadoop/GettingStartedWithHadoop)
-   [http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/)
-   [java-io-ioexception-incompatible-namespaceids](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-multi-node-cluster/#java-io-ioexception-incompatible-namespaceids)

 

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
