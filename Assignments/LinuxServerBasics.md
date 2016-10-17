## Overview

The goal of this assignment is to set up a Virtual Machine containing an Ubuntu Server instance and to communicate to it from your Pristine Ubuntu Desktop. Link to this document:

- [http://bit.ly/linux-server-basics](http://bit.ly/linux-server-basics)

In this assignment you will learn how to use SSH to communicate between two Linux instances. You can use these same technology to communicate between machines that are running on the same network, or between machines on two different networks in very different locations. For instance, you can SSH between a machine in Bellevue and another machine running on an AWS server in Portland.

## Get Started

If you are in Pristine Lubuntu, switch back to Windows for this opening part of the exercise.

Download the 1 GB OVA file for the Ubuntu Linux Server 16.04 with CouchDb to your Windows machine. Don't download it into Prisiting Lubuntu. The OVA file can be found here:

- [http://bit.ly/pristine-ubuntu-server-16-10](http://bit.ly/pristine-ubuntu-server-16-10)

Select VirtualBox and use the **File | Import Appliance** menu item to import the OVA file. Double clicking the OVA file in the Windows Explorer also works, but for some reason I find it simpler to use **File | Import Appliance.** .

When importing the OVA, be sure to reset the Mac address.

The Ubuntu Server VM is configured to use 2 GB of RAM, but you can change this:

- Close your instance of the VM
- Select your instance in VirtualBox
- Go to Settings | System
- Change the amount of RAM to 1024 or 768. These smaller numbers may affect performance, but the VM should still work.

When you first start your instance, you may get a warning about the network interface. A dialog will appear asking you to update your settings. Select the dialog. You shouldn't need to do anything, as the correct network interface should then be selected automatically. Now restart your instance if it does not restart automatically.

## Fine your IP Address {#ip-address}

To connect to this instance using SSH we need to know its IP address. Type **ifconfig** (or **ipconfig** on Windows) find your ip address.

```
$ ifconfig
eno1      Link encap:Ethernet  HWaddr f8:32:e4:9d:22:39  
          inet addr:192.168.2.21  Bcast:192.168.2.255  Mask:255.255.255.0
          inet6 addr: fe80::c0be:4848:dac9:2baa/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:1059709 errors:0 dropped:0 overruns:0 frame:0
          TX packets:1162195 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:797472011 (797.4 MB)  TX bytes:1268382292 (1.2 GB)
          Interrupt:20 Memory:dfd00000-dfd20000

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:23096 errors:0 dropped:0 overruns:0 frame:0
          TX packets:23096 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:4731913 (4.7 MB)  TX bytes:4731913 (4.7 MB)
```

The IP address appears on about the third line. In this case it is 192.168.2.6. This is typical for the type of address you will see at home. At school, it might look more like 168.156.43.123. But the number can vary. Sometimes, if you get an address that starts with 10, that means you have selected **NAT** rather than **Bridged Adapter** in the VirtualBox network settings for your VM. We should use **Bridged Adaptor** for this assignment.

At home, you will probably only need to discover the IP address for your server one time. But at school, this address may change each time you close and restart your ubuntu server. Perhaps on any one day it will stay the same, but if you close your server, then restart it again several days later, you will like be assigned a new IP address by the school DHCP servers. This is normal behavior and to be expected.

**NOTE**: _It is in fact possible to tell a DHCP server to always give a particular machine a particular IP address, but at least for now, I don't think we will ask IT to do this for us. There is no harm, and some advantage, in us getting a chance to work with IP addresses at least once a day._

## SSH First Time {#ssh-first}

Now open up Pristine Lubuntu if you have not done so already. Go to the command line and SSH into your server with this command:

```
$ ssh bcuser@192.168.2.21
```

Here we use the ssh command to access the machine running on the IP address 192.168.2.21. We are signing into the machine with the user name **bcuser**. The process should look something like this:

```
$ ssh bcuser@192.168.2.21
bcuser@192.168.2.21's password:
Welcome to Ubuntu 16.04.1 LTS (GNU/Linux 4.4.0-38-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

5 packages can be updated.
2 updates are security updates.


Last login: Mon Oct  3 08:44:26 2016
Agent pid 1559
```

**NOTE**: _Remeber that in Linux, you usually get no feedback when entering a password in the bash shell. As a result, some users get the impression that they are not able to enter a password. That is not the case. You just need to keep typing even though you are not getting any feedback, even though you are not getting any indication that you are in fact typing your password._

Once you are logged into the remote server, you can do everything that you can at the Pristine Lubuntu bash command prompt. The only difference is that you cannot, at least by default, open a GUI application. In particular, you cannot open **geany**. Instead, you should use an editor called nano that is installed by default on nearly on Ubuntu flavors of Linux. Indeed, the editor is available on most Linux distros.

## Setting up SSH

Once we confirm that we can access our server, the next step is to set up our SSH key so that we don't need to type our password ever time we SSH into a server, or ever time we copy files into or from the server. The basic procedure is simple: _simply copy your public key into the **~/.ssh/authorized_keys** file for your server_. This, or some similar process, is what happens when we paste our public key into a dialog on GitHub or BitBucket.

**NOTE**: _I assume that this is exactly what happens on GitHub or BitBucket, but I haven't seen their internal process so I don't know for sure. But I assume that our public key goes directly into an **authorized_keys** file when we press save in their dialog. If this is not what happens, then it would only be because they have developed some optimized way of performing the same task. In general, however, the proper solution is to use **authorized_keys**, and indeed I know of no other solution._

In order to put the key into the remote machine, there are two standard techniques:

1. In scenario one, we use the ssh-copy-id command to copy the key from our desktop to the server in a single step
1. In scenario two, we perform the same action manually. In particular, we use SSH secure copy (scp) to copy our key to the remote machine. We then copy the key into the **authorized_keys** file.

Here is the code to copy the key to our server  in a single step.

```
ssh-copy-id bcuser@192.168.2.21
```

**note**: _You will very likely need to change the IP address from 192.168.2.21 to the IP address of your server._

The **ssh-copy-id** command copies the default public key over to the remote machine. The default public key is usually **id_rsa.pub**. I find it safer to specify which key I want to copy over. To do that, use the **-i** flag. Generally, that command looks like this, where **identity-file** is your private key:

```
ssh-copy-id -i identity_file bcuser@192.168.2.21
```

For instance, if you have private key called **prog270-2016** then you would issue this command:

```
ssh-copy-id -i prog270-2016 bcuser@192.168.2.21
```

Alternatively, if you don't want to use ssh-copy-id, you can use **scp** instead. From your instance of Pristine Lubuntu use SSH to *secure copy* (scp) your public key from pristine Lubuntu to your EC2 instance:

```
scp <YOUR-PUBLIC-KEY> ubuntu@<YOUR-ELASTIC-IP>:/home/ubuntu/.ssh/.
```

Then on EC2 append your public key to your **authorized keys file**:

```
cat ~/.ssh/<YOUR-PUBLIC-KEY> >> ~/.ssh/authorized_keys
```

Whether you use **ssh-copy-id** or **scp** to put your public key in the EC2 **authorized_keys** file is mostly a matter of taste. However, the **ssh-copy-id** program is a bit safer. For instance, it checks to make sure you are not putting duplicate keys in the **authorized_keys** file.

Here are some alternative commands for copying the file to the remote machine:

```
cat ~/.ssh/id_rsa.pub | ssh user@hostname 'cat >> .ssh/authorized_keys'
cat ~/.ssh/id_rsa.pub | ssh user@123.45.56.78 "mkdir -p ~/.ssh && cat >>  ~/.ssh/authorized_keys"
cat ~/.ssh/id_rsa.pub | ssh <user>@<hostname> 'umask 0077; mkdir -p .ssh; cat >> .ssh/authorized_keys && echo "Key copied"'
```

## No Passwords

We use SSH keys in part to avoid being prompted for passwords. In particular, to avoid being prompted for passwords, two conditions must be met:

- Our private key must be loaded on the desktop PC with **sshadd**﻿ or **ssh-add**.
- The corresponding public key must be stored properly in the **~/.ssh/authorized_keys** file on the Ubuntu server.

## Copy a File with scp {#scp}

To complete the process, let's make sure that you know how to copy a file from one machine to another. First, switch your Pristine Lubuntu desktop. Create a disposable file called **LinuxServerTest.md** with the **echo** command, then copy it to the remote machine:

```
echo '## My Title' >> LinuxServerTest.md
scp LinuxServerTest.md bcuser@192.168.2.21:/home/bcuser/.
```

The whole process might look something like this:

```
charlie@rohan-elf:~/.ssh
$ cd
charlie@rohan-elf:~
$ cd temp/
charlie@rohan-elf:~/temp
$ echo '## My Title' >> LinuxServerTest.md
charlie@rohan-elf:~/temp
$ scp LinuxServerTest.md bcuser@192.168.2.21:/home/bcuser/.
LinuxServerTest.md            100%   12     0.0KB/s   00:00    
charlie@rohan-elf:~/temp
```

Now ssh to the remote machine and check that the file has been copied correctly:

```
$ ssh bcuser@192.168.2.21
Welcome to Ubuntu 16.04.1 LTS (GNU/Linux 4.4.0-38-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

5 packages can be updated.
2 updates are security updates.


Last login: Mon Oct  3 09:24:18 2016 from 192.168.2.6
Agent pid 2017
bcuser@ubs:~$ cat LinuxServerTest.md
## My Title
```

## Turn it in

Perform the actions described in the section called [Copy a File with scp](#scp). Only this time, call the file **LinuxServer-LastName.md** and set the title to your last name:

```
echo '## LastName' >> LinuxServer-LastName.md
```

Copy the file from your desktop to your remote machine. SSH to your remote machine and **cat** the contents of your copied file.

Take a screen shot or two, as necessary, and attach them to the assignment when you turn it in. I'm looking for evidence that you can use the **ssh** and **scp** command without being prompted for a password.
