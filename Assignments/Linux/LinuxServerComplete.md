## Overview

Watch these videos on the order they are listed. Follow the steps on the video, but name your instance vb-lastname.

- [The complete PlayList][cpl]
- [Ubuntu Server Download](https://youtu.be/ZuoDFTBEQlE)
- [Ubuntu Server Install](https://youtu.be/fym3FG1AfiU)
- [Updates and JsObjects Setup](https://youtu.be/fol5LV4JjtE)
- [Git Repository Setup](https://youtu.be/q27oi_9CXFc)                              

Take screenshots of the work you do. Attach the raw PNG or JPG files that you create to the assignment when you turn it in.

Turn in, at minimum, a screenshot of:

- The server in the process of being downloaded in the torrent.
- Creation of RAM when you first begin VirtualBox configuration.
- The moment when you name your server during Ubuntu installation. The name should be **vb-lastname**, where lastname is your last name.
- You signing in to the running server for the first time.
- Show SSH to remote server without password prompt
- Show a listing of your cloned repository
  - Either Prog270 or isit320
  - The Prog270 folks should install MakeHtml
  - The Isit320 folks should run Week01-ReactBasics on the Ubuntu server and display it in a browser.

## Step 01

Install a torrent application for Windows. If you have a Linux host, then a BitTorrent app is likely to be installed already.

## Step Two

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
```

Shutdown the server for a moment so we can make some changes to the VM. In the VirtualBox Manager choose **Settings | General | Advanced** for your VM. In **Settings | System | Processor** set up the shared clipboard and give the VM access to more than one processor if it is available.

Reboot the server and install the **build-essentials**:

```
sudo apt-get install build-essentials
```

Install JsObjects:

```
mkdir ~/Git
cd ~/Git
git clone https://github.com/charliecalvert/JsObjects
```

Put your private key in the **authorized_keys** file for the server.

```
cd ~/.ssh
ssh-copy-id -i id_rsa bcuser@192.168.2.34
ssh-add id_rsa
```

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

- Don't embed screenshots in a Word document
- Use either PNG or JPG formats
- Don't zip up your screenshots. Attach each one individually.

[cpl]: https://www.youtube.com/watch?v=ZuoDFTBEQlE&list=PLe8CjTxuUQ38pOVF37SyD16fEwYCYyehL
