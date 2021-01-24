# Configure Linux

I provide my students with a preconfigured version of Lubuntu. Nevertheless, there are various reasons why you might need to configure part or all of Linux box to use in one of my courses. This document is aimed to help both you and me configure Linux boxes.

**NOTE**: _This document assumes that you are working with a VM I set up, or you are working in VM that has a relatively clean install of Ubuntu Server or Desktop, or you have created a new user on an Ubuntu Server or Desktop._

Your instance of Linux might be:

*   Running on hardware as the primary operating system.
*   Running in VirtualBox or VmWare
*   Running in EC2
*   Running somewhere else.

You might be trying to configure any one of the several varieties of Ubuntu, including:

*   Ubuntu Desktop
*   Ubuntu Server
*   Ubuntu Minimal
*   Lubuntu
*   And to a large degree, even the Ubuntu flavored Mint releases.

As mentioned above, it is probably best if you are working in a VM or have a new user. Some of the steps in this process might impact the set up on an existing copy of Linux. I don't think any of the global installs (node, build essential) will cause harm in any normal setup, and most of the detailed work will affect only the current user.

# Update the Machine

Our first job on a new install, and one that you should perform regularly after the install, is updating the OS. It is possible to have this done automatically, and in the Desktop versions there are tools to do it through the GUI called the Software updater. Nevertheless, I frequently do it by hand from the bash shell.

To update from the shell (command prompt), all you need do is issue the following two commands.

```bash
sudo apt-get update
sudo apt-get upgrade
```

The process listed above is simple to perform, and usually completes in only a few minutes or less.

Sometimes you see messages like "7 packages need to updated, 3 security updates" even after you have run the above commands. So long as it does not cause you to actually upgrade to a new version, you can try to fix those message with this command:

```bash
sudo apt-get dist-upgrade
```

On completion, there are sometimes old files, particularly linux-header and linux-image files, that are no longer needed. To remove them run the following command:

```bash
sudo apt autoremove
```

This can sometimes free up significant (0.5 to 2 GB) disk space).

## Upgrade the Machine

There are two ways to update:

From the command line:

- Check if there is a new release:
  - do-release-upgrade -c
- Optionally, for more information:
  - sudo nano /etc/update-manager/release-upgrades
- Perform the upgrade:
  - sudo do-release-upgrade

From the Desktop

- Go to the software updater (on your lubuntu desktop) and choose settings.
- Make sure you are checking for the latest and then update your machine
- Update the machine as you would normally. When you are done, so you should be prompted to upgrade if an upgrade is available.

![Upgrade Lubuntu Settings](https://s3.amazonaws.com/bucket01.elvenware.com/images/lubuntu-upgrade-configure.png)

Also here:

- [Ask Ubuntu](https://askubuntu.com/a/203302/130778)

## Install gcc and make {#gcc-make}

Though not always necessary, it is a good idea to install to gcc and make. In particular, there are times when the VirtualBox Guest Additions appear to rely on having them installed. These utilities are not always needed, but I the need is just frequent enough to make it worthwhile installing them.

The steps are simple. You have probably already done the first two, but just in case, I will remind you to be sure your system is up to date before installing **gcc**.

```nohighlighting
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install build-essential
```

Sometimes you see messages like "7 packages need to updated, 3 security updates" even after you have run the above commands. So long as it does not cause you to actually upgrade to a new version, you can try to fix those message with this command:

<pre>
sudo apt-get dist-upgrade
</pre>

## JsObjects

Readers of this document should use Git to clone a read only copy of **JsObjects**:

    git clone http://github.com/charliecalvert/JsObjects.git

More details are [here](https://github.com/charliecalvert/JsObjects/blob/master/README.md).

## Configure Get Started {#core-setup}

The simplest way to configure your system for Charlie's classes is with these two scripts from JsObjects:

- [GetStarted script on GitHub][gs]
- [UbuntuSetup script on GitHub][jso-config]

First update the system, install JsObjects, and set up SSH:

Download the GetStarted script to the root of your home folder and run it:

```nohighlighting
curl https://raw.githubusercontent.com/charliecalvert/JsObjects/master/Utilities/SetupLinuxBox/GetStarted > GetStarted
chmod +x GetStarted
./GetStarted
```

Now Reboot the system

```nohighlighting
sudo shutdown -r now
```

One of things this script does is clone my massive and disorganized JsObjects repository. If you want a more simplified view of this repository, see the **SimpleView** branch.

```nohighlighting
cd ~/Git/JsObjects
git checkout SimpleView
```

To return to the normal view:

```nohighlighting
git checkout master
```

## Configure Ubuntu Setup {#ubuntu-setup}

After you reboot, run **UbuntuSetup**. You now have JsObjects installed so there is an easy way to run the script:

```bash
cd ~/Git/JsObjects/Utilities/SetupLinuxBox
./UbuntuSetup
```

**NOTE** _Typing **slb** should also take you to the SetupLinuxBox directory._

The **UbuntuSetup** script displays a simple menu. From the options available, select:

- **a) Run All (Basic and Node Related)**

After running the script, do this: **source ~/.bashrc**.

Though this is probably more than a bit out of date, you can check the status of your system is with this script. Select at least the the **e** for **essentials** menu item:

```bash
$ELF_UTILS/SetupLinuxBox/SystemCheck
```

At this stage you are done, and most readers can leave this page. Go back to whatever assignment sent you here. Your system is (hopefully) now properly configured.

**NOTE**: _This is really the end of the Core Setup section. If you ran UbuntuSetup, then you are done. You don't need to read any more of this document unless you are trying to troubleshoot some problem._

## Ubuntu Versions

**NOTE**: _This is not part of the core setup. See the note at the end of the previous section._

An upgrade from one release (version) to another, takes longer. For instance, moving from Ubuntu 13.10 to 14.04 takes a long time. That is natural, since it is a more complex process. It would be like upgrading from Windows Vista to Windows 8. Only without the financial cost, and usually without the hassle. Please note that on slow machines an upgrade from one release to another release can take several hours. Nevertheless, if you want to update from one version of the distro to the next version, then use this command:

```bash
do-release-upgrade
```

Ubuntu and Lubuntu ship twice a year, once in April and once in October. They use dates to track [releases](https://wiki.ubuntu.com/Releases):

* **Ubuntu 13.04**: Shipped April, 2013
* **Ubuntu 13.10**: Shipped October, 2013
* **Lubuntu 15.04**: Shipped April, 2015
* **Ubuntu 15.10**: Shipped October, 2015.
* And so on...

Every two years, on even years, in April, an [LTS (Long Term Support)](https://wiki.ubuntu.com/LTS) release is shipped. For instance, one was released in April of 2014: Ubuntu 14.04. The next LTS release should therefore come in April of 2016: Ubuntu 16.04. A corollary of this rule is that releases shipped in odd numbered years and in October are not LTS releases, and will therefore be maintained for only 9 months.

* LTS: 5 Years of maintenance. Shipped in April of even numbered years.
* Other: 9 Months of maintenance. Shipped in October of each year.

In general, it is always safe to stick with a relatively recent LTS version. If you are using one of the other versions, then you can expect to need to upgrade to a new version every six to nine months. I tend do track the latest relase, whether it is an LTS or not. There is nothing wrong with that approach in the context of our classroom. You just need to understand that it means you need to do relatively frequent upgrades.

## Set up Environment

This section provides a step by step guide through a process that can be automated with the **UbuntuSetup** script found in the [Core Setup](#core-setup) section of this document.

At the bottom of your **.bashrc** place this:

```bash
if [ -z "$SSH_AUTH_SOCK" ] ; then
    eval `ssh-agent`
fi

# Basic Paths

export PATH=$PATH:$HOME/npm/bin
export JSOBJECTS=$HOME/Git/JsObjects
export NODE_PATH=:$HOME/npm/lib/node_modules    
export PYTHONPATH=${PYTHONPATH}:$JSOBJECTS/Python/:$JSOBJECTS/Python/Utils/:

# Java Path Support
export JAVA_HOME=/usr/lib/jvm/java-8-oracle

# Android Path Support
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_PLATFORM_TOOLS="$HOME/Android/Sdk/platform-tools"
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_PLATFORM_TOOLS:

# Other
export CHROME_BIN=/usr/bin/chromium-browser
```

After making this change, you need to process your updated **.bashrc** file:

```
source ~/.bashrc
```

I also maintain the code to code in .bashrc [here][jsbash].

[jsbash]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/BashrcExtras

## Setup Git Prompt

Near the top of **.bashrc**:

```bash
COLOR_RED="\033[0;31m"
COLOR_YELLOW="\033[0;33m"
COLOR_GREEN="\033[0;32m"
COLOR_OCHRE="\033[38;5;95m"
COLOR_BLUE="\033[0;34m"
COLOR_WHITE="\033[0;37m"
COLOR_RESET="\033[0m"

function git_color {
  local git_status="$(git status 2> /dev/null)"

  if [[ ! $git_status =~ "working tree clean" ]]; then
    echo -e $COLOR_RED
  elif [[ $git_status =~ "Your branch is ahead of" ]]; then
    echo -e $COLOR_YELLOW
  elif [[ $git_status =~ "nothing to commit" ]]; then
    echo -e $COLOR_GREEN
  else
    echo -e $COLOR_OCHRE
  fi
}

function git_branch {
  local git_status="$(git status 2> /dev/null)"
  local on_branch="On branch ([^${IFS}]*)"
  local on_commit="HEAD detached at ([^${IFS}]*)"

  if [[ $git_status =~ $on_branch ]]; then
    local branch=${BASH_REMATCH[1]}
    echo "($branch)"
  elif [[ $git_status =~ $on_commit ]]; then
    local commit=${BASH_REMATCH[1]}
    echo "($commit)"
  fi
}
```

In Git 2.9, the word **directory** was changed to **tree** when reporting that your repo is up to date. As a result, I changed this line in **git_color**:

```bash
if [[ ! $git_status =~ "working tree clean" ]]; then\
fi
```
The line used to read:

```bash
if [[ ! $git_status =~ "working directory clean" ]]; then
fi
```

You can check your version of Git by typing:

    git --version
    git version 2.7.4

If you get answer like the one above, then use **directory** instead of **tree**. If your version is higher than 2.9.1, for instance, if it is 2.14.1, then use the word **tree** instead, as shown in the code above:     

```bash
if [[ ! $git_status =~ "working tree clean" ]]; then
fi
```

With that problem taken care of, lets move on to the last change that needs to be made.

Scroll down to after the place where the PS1 prompt is set up and enter the following:

```bash
PS1+="\[\$(git_color)\]"
PS1+="\$(git_branch)"                       # prints current branch
PS1+="\[$COLOR_BLUE\]\n\$\[$COLOR_RESET\] "   # '#' for root, else '$'
```

The next line should be:

    unset color_prompt force_color_prompt

Then **source ~/.bashrc** to register all of this.

## Install Node

This section provides a step by step guide through a process that can be automated with the **UbuntuSetUp** script found in the [Core Setup](#core-setup) section of this document.

The explanation is found here:

*   [Node on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#node)

## Update NPM

Upgrade to latest npm:

```nohighlighting
npm -g install npm
```

Make sure NPM is the one in your **~/npm** directory:

```nohighlighting
$ which npm
/home/charlie/npm/bin/npm
```

If you are using the one in /usr/bin/npm delete it and optionally create a symbolic link to the one in your **npm** directory. It might be something like this:

```nohighlighting
sudo rm /usr/bin/npm
```

Then, optionally, you can do this:

```nohighlighting
sudo ln -s ~/npm/bin/npm /usr/bin/npm
```

This symbolic link doesn't really help that much, but it doesn't hurt either. I think it is simpler to not create the link for **/usr/bin/npm** because then **which npm** points at your local version of NPM.

## Install Geany

To get started configuring machine, you will probably want a reliable text editor. A good choice is  [Geany](http://www.geany.org/), which is the general purpose code and text editor we use in our course. We will also use WebStorm, Eclipse or some other IDE for heavy duty coding, but everyone needs a powerful text editor, and Geany is one of the best.

1. Open up the [Lubuntu Software Center][softCenter].
* Search for Geany.
* Put it in the Apps Basket.
* Switch to the Apps Basket.
* Install Geany.

To install the markdown plugin for Geany:

```
sudo apt-get install geany-plugin-markdown
```

While you are in the Software Center, you will also likely want to to install:

* Chromium
* Meld

Eventually, you will want to install LibreOffice, but it is probably better to set up Java first.

Shortcut way to install Geany, Meld and Chromium:

```
sudo apt-get install geany
sudo apt-get install meld
sudo apt-get install chromium-browser
```

[softCenter]: https://help.ubuntu.com/community/Lubuntu/Setup#Packages

Here is a more detailed overview of installing Geany through the software center:

From the Lubuntu menu choose **System Tools | Lubuntu Software Center**.

![**Finding the Lubuntu Software Center**](https://s3.amazonaws.com/bucket01.elvenware.com/images/Lubuntu01.png)

In the Software Center, choose to install Geany. You can search for it by typing its name in the editor control on the right.  Alternatively, look under the category in the **Software Center** called **Developer Tools**.

![**The Lubuntu Software Center**](https://s3.amazonaws.com/bucket01.elvenware.com/images/Lubuntu02.png)

Put Geany in the **Apps Basket**. Switch to the **Apps Basket** view
and choose **Install Packages**. (Remember that the default password
for your copy of Lubuntu is the same as the user name.)

## Install Git

The command to install **git** is simple:

    sudo apt-get install git

Then create a directory called Git:

    cd
    mkdir Git
    cd Git

## Install Lamp

The explanation is found here:

*   [Lamp Install on Elvenware](http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux)

## Install SSH

On EC2, SSH is already installed. But on a fresh Ubuntu install, the steps are simple:

    sudo apt-get install ssh

And then create a key pair for yourself by following the instructions found here:

*   [Key pair creation on Elvenware](http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#sshKeys)

Here is how to SSH to a remote machine:

```
ssh <userName>@<theServerYouWantToConnectTo>
```

For instance:

```
ssh ubuntu@192.168.1.23
```    

## SSH Copy Id {#ssh-copy-id}

This is an advanced trick, and not one that you necessarily want to use. You can use **ssh-copy-id** to install your public key in the **authorized_keys** file on a remote machine to which you already have access:

```
ssh-copy-id <userName>@<theServerYouWantToConnectTo>
```

This will, by default, put **id_rsa.pub** in the **authorized_keys** file of the remote machine.

To copy a specific public key:

```
ssh-copy-id -i ~/.ssh/<public-key> <username>@<hostname>
```

For instance:

```
$ ssh-copy-id -i Prog272-Calvert bcuser@192.168.2.16
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "Prog272-Calvert.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
bcuser@192.168.2.16's password:

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'bcuser@192.168.2.16'"
and check to make sure that only the key(s) you wanted were added.
```

Optionally, on the server edit **/etc/ssh/sshd_config** and set Password Authentication to no.

## More on SSH Keys

I use **scp** to copy an SSH key or any other file from one machine to another. Suppose I'm on machine 1 and machine 2 has an IP address of 192.168.86.34:

    scp ~/.ssh/mykey bcuser@192.168.86.34:/home/bcuser/.ssh/.

Here is an example session where I am signing in for the first time to a m2:

<pre>$ <b>scp ~/.ssh/mykey bcuser@192.168.86.34:/home/bcuser/.ssh/.</b>
The authenticity of host '192.168.86.34 (192.168.86.34)' can't be established.
ECDSA key fingerprint is SHA256:DVfze+v0XPGVUoOL6NgtphUbD3kQpm8QhtXiPF1Q6Ms.
<b>Are you sure you want to continue connecting</b> (yes/no/[fingerprint])? <b>yes</b>
Warning: Permanently added '192.168.86.34' (ECDSA) to the list of known hosts.
<b>bcuser@192.168.86.34's password</b>:
mykey                                         <b>100%</b> 2602     5.4MB/s   00:00 </pre>

As you can see, I had to type **yes** and enter a password. The 100% in the last line is a clue that the copy was successful.

To make this simpler, I can add my public key for my default SSH key (the one I always load, and the one whose public key is on GitHub) to the **authorized** **keys** file for m2:

<pre>$ <b>ssh-copy-id -i ~/.ssh/Home-2019-10-27.pub bcuser@192.168.86.34</b>
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/charlie/.ssh/Home-2019-10-27.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
<b>bcuser@192.168.86.34's password</b>:

Number of key(s) added: 1

<b>Now try logging into the machine, with:   "ssh 'bcuser@192.168.86.34'"</b>
and check to make sure that only the key(s) you wanted were added.</pre>

The command is in the first line. Note that I was again prompted for a password, but from this point onward, I need not use a password and can use ssh instead, as shown in the next to last line.

## SSH Config

Finally, if the IP address for the remote machine is going to stay constant (AWS, for instance, but not VMs and laptops at school), you can add this to ~/.ssh/config:

<pre>Host vbox-2019
    HostName 192.168.86.34
    user bcuser
    IdentityFile ~/.ssh/mykey</pre>

Now you can sign in like this: **ssh vbox-2019** For instance:

<pre>$ ssh vbox-2019
Welcome to Ubuntu 19.10 (GNU/Linux 5.3.0-19-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

 * Kata Containers are now fully integrated in Charmed Kubernetes 1.16!
   Yes, charms take the Krazy out of K8s Kata Kluster Konstruction.

     https://ubuntu.com/kubernetes/docs/release-notes
Agent pid 2157
</pre>

Recall that we can get the IP address of a machine like this: **ip addr | grep inet**

A quick reminder: to run a remote command do something like this:

    ssh vbox-2019 ls

That gives you a listing of the home directory. For more flexibility specify paths like this:

    ssh vbox-2019 ls /home/bcuser/Git

See also [SSH and Putty on Elvenware](https://www.elvenware.com/cloud-guide/SshFtpsPutty.html#ssh-config)    

## Install OpenJdk

The following appears to work fine with Eclipse:

    sudo apt-get isntall openjdk-8-jdk

## Install Oracle/Sun Java

Setting up Java is optional on EC2 or other Ubuntu server instances, but it is usually required on Ubuntu or Lubuntu desktop because you need it for WebStorm.

Navigate to: **~/Git/JsObjects/Utilities/SetupLinuxBox**

```
cd ~/Git/JsObjects/Utilities/SetupLinuxBox
```

Then run the the Java install script: **./InstallOracleJdk.sh**

You will be prompted enumerable times and receive warnings of various kinds, (don't try to use the mouse, just enter or tab key) but if you just keep following the path of least resistance, it will eventually install. You can check your work by typing java --version

```
java -version
java version "1.8.0_72"
Java(TM) SE Runtime Environment (build 1.8.0_72-b15)
Java HotSpot(TM) 64-Bit Server VM (build 25.72-b15, mixed mode)
```

Java usually gets installed in the **/usr/lib/jvm** directory.

The code found in my script probably looks like this:

    sudo add-apt-repository ppa:webupd8team/java
    sudo apt-get update
    sudo apt-get install oracle-java8-installer

And you can test it like this:

    java -version

The reference for the above is [here](http://www.webupd8.org/2012/09/install-oracle-java-8-in-ubuntu-via-ppa.html).


## Install WebStorm

You can download WebStorm from the JetBrains site:

* [https://www.jetbrains.com/](https://www.jetbrains.com/)

Please note that there is a student version of WebStorm and PyCharm. If you fill out the simple form on the JetBrains site, then you will quickly get permission to run these applications for free while you are a student:
</b>
* [https://www.jetbrains.com/student/](https://www.jetbrains.com/student/)

When you launch WebStorm or PyCharm, you may be prompted to register. Choose **Register** and select **JetBrains Account**. If you are not prompted to register, then select **Help | Register** from the WebStorm menu.

**NOTE**: *It is a bad strategy to use the trial period. Eventually it is expire, and then you will be unable to use the product until you properly register it. I have noticed that trial period tends to expire at inopportune times, such as during midterms or the night before an assignment is due. Get this taken care of now while you have time!*

After downloading webstorm, you will need to decompress the package in which it came with a command like this:

    tar xvfz ~/Downloads/WebStorm-X.X.X.tar.gz

For instance:

    tar xvfz ~/Downloads/WebStorm-9.0.2.tar.gz

Then move the extracted files into the bin folder:

    mv ~/Downloads/WebStorm-9.0.2.tar.gz ~/bin/webstorm

On Lubuntu, you should then place this file in the Desktop folder:

    [Desktop Entry]
    Encoding=UTF-8
    Version=1.0
    Name[en_US]=WebStorm
    GenericName=WebStorm with JavaScript support
    Exec=/home/bcuser/bin/webstorm/bin/webstorm.sh
    Terminal=false
    Icon=/home/bcuser/bin/webstorm/bin/webide.png
    Type=Application
    Categories=Application;Development;
    Comment[en_US]=Jetbrains JavaScript HTML

The process for install PyCharm is nearly identical, with only the obvious changes in name and path. I install PyCharm in:

    ~/bin/pycharm

## Install Android SDK

- <http://developer.android.com/sdk/index.html#Other>

Download the Android SDK for Linux.

Decompress the archive with a command similar to this:

```
tar xvfz android-sdk_r24.4.1-linux.tgz
```

Now create a home directory for Android:

```
mkdir ~/Android
```

Move the SDK into it:

```
mv android-sdk-linux/ ~/Android/Sdk
```

Assuming you have your path set up correctly in .bashrc, as explained above, then you simply type:

```
android
```

Because of space limitations, install as little as possible. In particular, you probably don't need the TV related modules, or probably the Atom modules.


## Install MongoDb

We probably will not be installing MongoDb on our machines, but if you are curious, there is an explanation is found here:

*   [MongoDb on Elvenware](http://www.elvenware.com/charlie/development/database/NoSql/MongoDb.html#install)


## Chrome Bin Setup

Don't do this on EC2, as you would not normally install Chrome on EC2 since there is no front end (GUI) for Ubuntu Server. But on Ubuntu and Lubuntu Desktop, it is needed in some circumstances related to development.

Under SystemCheck Common, this will fix **CHROME_BIN** errors.

Normally you would put this line near the bottom of **~/.bashrc**.

```
export CHROME_BIN=/usr/bin/chromium-browser
```

After making the change run **source ~/.bashrc**.

**NOTE**: *If you are trying to get **SystemCheck** to pass, then do your work in the same bash shell where you are running SystemCheck. In particular, exit the program, run the command, then run **SystemCheck** again.*

Though the path rarely varies, to confirm the path to Chromium on your system, type **which chromium-browser**. Whether you specify the path to Chromium or Chrome is more or less optional. There is no wrong choice, it just depends on your preferences.

## Default Editor

It may be helpful to setup a default editor:

```
sudo update-alternatives --config editor
```

Or try **select-editor**

```
$ select-editor

Select an editor.  To change later, run 'select-editor'.
  1. /bin/ed
  2. /bin/nano        <---- easiest
  3. /usr/bin/code
  4. /usr/bin/geany
  5. /usr/bin/vim.basic
  6. /usr/bin/vim.tiny

Choose 1-6 [2]:
```

Though it doesn't seem to be used much anymore, you could once pick an editor by creating an environment variable. So by running any of the following at a _nix command prompt_:

    export EDITOR=nano
    export EDITOR=vim
    export VISUAL=nano

## Mint VNC

I need to turn off encryption before I could access Linux Mint desktop through tightvnc:

    gsettings set org.gnome.Vino require-encryption fals


[jso-config]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/UbuntuSetup
[gs]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/GetStarted
