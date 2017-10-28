## Overview

Watch either the [Complete Playlist][cpl] or the videos in the order they are listed. Follow the steps shown in the video, but name your instance vb-lastname so I can recognize it in your screenshots.

- [The complete PlayList][cpl]
- [Ubuntu Server Download](https://youtu.be/ZuoDFTBEQlE)
- [Ubuntu Server Install](https://youtu.be/fym3FG1AfiU)
- [Updates and JsObjects Setup](https://youtu.be/fol5LV4JjtE)
- [Git Repository Setup](https://youtu.be/q27oi_9CXFc)                              

As you complete the steps outlined here and in the videos, take screenshots of the work you do. Attach the raw PNG or JPG files that you create to the assignment when you turn it in.

## Screenshots

Create, at minimum, a screenshot of:

- The server in the process of being downloaded in the torrent.
- Creation of RAM when you first begin VirtualBox configuration.
- The moment when you name your server during Ubuntu installation. The name should be **vb-lastname**, where lastname is your last name.
- You signing in to the running server for the first time.
- Show SSH to remote server without password prompt
- Show a listing of your cloned repository
  - Either Prog270 or isit320
  - The Prog270 folks should install MakeHtml
  - The Isit320 folks should run Week01-ReactBasics on the Ubuntu server and display it in a browser.

Please also read the [Turn it in][#turn-it-in] section below.

## Step 01

Install a torrent application for Windows. If you have a Linux host, then a BitTorrent app is likely to be installed already.

## Step Two

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
```

Shutdown the server for a moment so we can make some changes to the VM. In the VirtualBox Manager choose **Settings | General | Advanced** for your VM. In **Settings | System | Processor** set up the shared clipboard and give the VM access to more than one processor if it is available.

Reboot the server and install the **build-essential**:

```
sudo apt-get install build-essential
```

Install JsObjects:

```
mkdir ~/Git
cd ~/Git
git clone https://github.com/charliecalvert/JsObjects
```

Put your private key in the **authorized_keys** file for the server.

```
slb
./SetupSsh
cd ~/.ssh
// ssh-copy-id -i id_rsa bcuser@192.168.2.34
```

The scripts listed above are now consolidated into one script called [GetStarted][gs]. Once you have first booted your server, ssh into it with a password. Before you try to update the server or do anything else, paste in the following commands:

```
curl https://raw.githubusercontent.com/charliecalvert/JsObjects/master/Utilities/SetupLinuxBox/GetStarted > GetStarted
chmod +x GetStarted
./GetStarted
```

Don't try to paste these into the shell that VirtualBox creates. That doesn't tend to work very well for me. Instead, paste them into your SSH shell. The **GetStarted** script will run all the commands listed above, prompting you only once for input about setting a password on your private key. You probably don't want to create that password, but it is a personal decision.

## Step III

Run UbuntuSetup.

- [UbuntuSetup][ubs]

## Step IV

We want to access our Git hub repository on the server using SSH. To make this as easy as possible, we are going to copy over the private key to our new server.

**NOTE**: _I can't know what name you have given your private key, so in this text I will just call it **private_key**._

Copy over the private key:

```
scp private_key bcuser@192.168.2.34:/home/bcuser/.ssh/.
```

Now go to your server and lock down the private key to increase security:

```
ssh bcuser@192.168.2.34
cd .ssh
chmod 400 private_key
```

Now clone your repository. In the example below, you will need to supply your Github account name and the proper name for your repository:

```
git clone git@github.com:account-name/isit320-lastname-2017.git
```

```
sudo chown -R bcuser:bcuser /var/www/html/
ln -s ~/Git/isit320-calvert-2017/Week01-ReactBasics/ /var/www/html/.
```

Go here: <http://192.168.2.34/Week01-ReactBasics/>

## Turn it in

Attach your screenshots directly to your submission. Remember:

- Don't embed screenshots in a Word document.
- Use either PNG or JPG formats
- Don't zip up your screenshots. Attach each one individually.

## Do I Really Need to Turn in Screenshots

A number of you have asked if you really need to turn in the screenshots. After all, we stepped through this process once in class and most of you did not take screenshots as we were working. I know that.

The point of this exercise is to teach you how to start with an ISO file and end up with an installation suitable for Node Web Development. Just doing this once in class with my guidance doesn't really show me that you can do it on your own. I want you to step through the process a second time at home so you can prove to yourself (and to me) that you can create a working VM.

Developing and deploying applications on VMs or in containers is the way the entire technical community is headed. In fact, this is the way that many applications are deployed at this time. I believe what we see now is only the start of a trend that will grow rapidly over the coming years.

[cpl]: https://www.youtube.com/watch?v=ZuoDFTBEQlE&list=PLe8CjTxuUQ38pOVF37SyD16fEwYCYyehL
[gs]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/GetStarted
[ubs]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#ubuntu-setup
