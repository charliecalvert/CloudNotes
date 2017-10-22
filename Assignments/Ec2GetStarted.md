## Overview

This assignment is designed to help you get started using the AWS application called EC2.

- AWS: [Amazon Web Services][aws-doc]
- EC2: [Elastic Compute Cloud][ec2-doc]

## A diagram.

You might find this diagram helpful when reading this assignment.

![Connect to EC2 activity diagram](https://s3.amazonaws.com/bucket01.elvenware.com/images/ssh-key-for-ec2.png)

**NOTE**: _Remember, you only get one chance to download a private key for an EC2 instance. If you miss it the first time, then the only reasonable choice is to start again from scratch._

## Step 01 {#step-one}

Your first step will be to create a [free account](https://aws.amazon.com/free/) on AWS.

- Slides that describe setting up AWS: [http://bit.ly/ec2-aws](http://bit.ly/ec2-aws)
- [Page with Related Slides](https://sites.google.com/view/elfland/web-services)

## Step 02 {#step-two}

Once you have an account set up, the next step is to create an EC2 Instance.

- Launch Instance
- **Step 1, Pick OS**: Ubuntu Server 16.04 LTS (HVM), SSD Volume Type - ami-6e1a0117
- **Step 2 Choose Instance**: Free t2-micro
- **Step 3, Configure Instance**: take the defaults.
- **Step 4, Add Storage**: Take defaults or select up to 30 GB of disk space
- **Step 5, Add Tag**: Add a single pair: name: prog270-01
- **Step 6, Configure Security Group**: If you have one set up, use it. Otherwise create a new one:
	- HTTP
	- HTTPS
	- SSH
	- Custom TCP Rule: 30025

You will be asked to choose an SSH public private key pair. Use an existing one if you have created one before and can locate it. Otherwise create a new one. If you create a new one:

- Download it and put it in your **.ssh** folder
- Zip it up
- Save it to Google Drive or someplace similar.
- Don't lose it!


Your instance will be assigned a non-permanent public IP address for your EC2 instance. You can see this in your AWS console, under EC2 instances.

## Step 02-a: Elastic IP Address {#elastic-ip-address}

We will need a permanent IP address. On AWS, these permanent IP addresses are called Elastic IPs. Here are instructions on creating elastic IP address.

- [Elastic IP](http://www.elvenware.com/charlie/development/cloud/WebServices.html#elastic)

## Step 03: Access EC2 Overview {#step-three}

Once you have created your instance, and downloaded your keys, you need to learn how to use the keys to access your instance. Here is a sample of how to proceed:

```
ssh-add ~/.ssh/Prog270-Ec2-Calvert-2016.pem
ssh ubuntu@192.168.1.25
```

Let's examine these two commands one at a time.

## Step 03a: Load your SSH Key {#step-three-a}

The first step is to load your EC2 PEM (private key) file on your local machine. On Pristine Lubuntu:

```
ssh-add ~/.ssh/<YOUR EC2 PRIVATE KEY>;
```

More specifically, it might look like this:

```
ssh-add ~/.ssh/Prog270-Ec2-Calvert-2016.pem
```

The second step is detailed in the next section.

## Step 04: Access Your Instance {#step-four}

Once you have your key loaded, you can connect to your EC2 instance with SSH. This gives you access to the command line of your instance. The command looks like this:

	ssh ubuntu@<YOUR IP PUBLIC IP or ELASTIC IP ADDRESS>

For instance:

	ssh ubuntu@192.168.1.25


## Step 04.a: Configure Your Instance {#configure}

You can configure your instance by running a script found in JsObjects called **UbuntuSetup**. Follow the links below to learn how to proceed.

- [Install JsObjects on your Instance][jsobjects]
- [Run the Configuration Script][configure]

You should also install a Web Server:

- [Install LAMP][lamp]

See also:

- [AwsExpect][aws-expert]
- [.bashrc and ssh-agent][ec2-provision]
- [SSH and Configuring Linux][ssh-configure-linux]

[lamp]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#install-lamp
[jsobjects]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#jsobjects
[configure]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#core-setup
[aws-expert]:http://www.ccalvert.net/books/CloudNotes/Assignments/AwsEc2Expert.html#step-two-ssh-into-your-instance
[ec2-provision]:http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Provision.html#-bashrc
[ssh-configure-linux]:http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#install-ssh

## Step Five

AWS gave us a key pair that we can use to access an instance of our EC2 server. However, we already have an SSH key pair that we use to access our data on GitHub. If we use the GitHub key for accessing our AWS server, then we would only have to load one key. Otherwise we have to load two keys:

- One for GitHub
- One for AWS

To sign on to both machines with a single key we have to put the public part of our Prog 270 (GitHub) key on our Ubuntu instance in the **~/.ssh/authorized_keys** file. We then load it and clone our GitHub repository.

Start in Pristine Lubuntu and copy our public key to EC2:

```
ssh-add prog270-2017      <== Load Key on Pristine
ssh-copy-id -i prog270-2017 ubuntu@155.132.2.21
```

The second step shown above copies our private key into the EC2 **~/.ssh/authorized_keys** file.

Now access our EC2 instance and clone our repository:

```
ssh ubuntu@35.163.123.100 <== Access EC2 Instance
cd ~/.ssh                 <== Enter SSH directory on EC2
ssh-add prog270-2017      <== Load key on EC2
cd ~/Git                  <== Go to Git and clone
git clone git@github.com/user-name/repo-name.git
```

Let's walk through this step by step.

## Copy Public Key

First load the key you use to access GitHub.

```
ssh-add prog270-2017    <== Load Key on Pristine
```

Now copy that key to the **~/.ssh/authorized_keys** file on your EC2 instance. We do this by running **ssh-copy-id** command from Pristine Lubuntu.

```
ssh-copy-id -i identity_file ubuntu@35.163.123.100
```

For instance, if you have private key called **prog270-2016** then you would issue this command:

```
ssh-copy-id -i prog270-2016 ubuntu@35.163.123.100
```

The **ssh-copy-id** command copies the default public key over to the remote machine. The default public key is usually **id_rsa.pub**. I find it safer to specify which key I want to copy over. To do that, use the **-i** flag. Generally, that command looks like this, where **identity-file** is your private key:

### Copy Private Key to Ubuntu {#scp-private-key}

From Prisitine Lubuntu, copy your private SSH key that you use to connect to GitHub to your new Ubuntu server:

```
	scp <YOUR KEY> ubuntu@35.163.123.100:/home/ubuntu/.ssh/.
```

For instance:

```
	scp prog270-2017 ubuntu@35.163.123.100:/home/ubuntu/.ssh/.
```


Of course, use your public or elastic IP address.

### Zip and Copy to Google Drive {#zip-key-google-drive}

Don't forget to put your new private key on Google Drive. Go to the ~/.ssh folder and issue a command similar to this one:

```
zip Prog270-Ec2-Calvert-2016 Prog270-Ec2-Calvert-2016.pem
```

Now upload the zip file to Google Drive. It doesn't have to be in our shared folder. Just so you can get it at home.

Choose **New | File Upload** on Google Drive.

## Alternate Copy Method

Alternatively, if you don't want to use **ssh-copy-id**, you can use **scp** instead. From your instance of Pristine Lubuntu use SSH to *secure copy* (scp) your public key from pristine Lubuntu to your EC2 instance:

```
scp <YOUR-PUBLIC-KEY> ubuntu@<YOUR-ELASTIC-IP>:/home/ubuntu/.ssh/.
```

Then on EC2 append your public key to your **authorized keys file**:

```
cat ~/.ssh/<YOUR-PUBLIC-KEY> >> ~/.ssh/authorized_keys
```

Whether you use **ssh-copy-id** or **scp** to put your public key in the EC2 **authorized_keys** file is mostly a matter of taste. However, the **ssh-copy-id** program is a bit safer. For instance, it checks to make sure you are not putting duplicate keys in the **authorized_keys** file.

## Thoughts

Take a moment to be sure you understand what is happening here. We want to use a single key pair to access both AWS and GitHub. On Pristine Lubuntu we already have the Prog270 key set up to access GitHub. To also use it with our AWS instance we have to copy the Prog 270 public key into the **authorized_keys** file on our AWS server.

Needless to say, we place public keys in our **authorized_keys** file when we want to grant the owner of a particular private public key pair the ability to access a resource such as our AWS server. If you own a private key, and its matching public key is in the **authorized_keys** file for a service we want to access, then we are all set: we can access the service.

- I have a private key
- I have loaded the private key with ssh-add or similar tool.
- My Public key is in the **authorized_keys** file on a resource such as an Ec2 instance or github

If the above are true, then you should be able to access your resource. For instance, you can access EC2 or GitHub.

## Setup Box

Once we have access to our EC2 instance and access to our repository, there are a number of further steps required to get the instance set up correctly. I outline them in the first few sections of this document:

- [Configure Linux][configure-linux]

See in particular the first three sections.

## Turn it in

Take a screen shot of the command prompt and submit that with your assignment.

A good screen shot would show you first on Pristine Lubuntu, then connecting to EC2, and running this command:

<pre>
ls ~/Git
</pre>

It should show that you have a JsObjects directory.

## Billing After Quarter Ends {#billing-after}

After I have given you a final grade, consider what you want to do with AWS and your instance.

- One approach is to set a calendar reminder to delete your instance after one year (in Sept)
- Another approach is to buy a relatively inexpensive reserved instance once your year is up.
- Go to Ec2 Instances and select reserved instance and then select the big purchase instance button
- A third option is to push all your code from the EC2 instance, save anything else of importance to Google Drive, and then delete your instance. If you have no running instance, no EBS volumes (hard drives), no elastic IPs then you should have no bill even after the year is up. Check billing to be sure you have deleted everything.
- You could also stop the running instance, but leave the EBS (hard drive). That is much less expensive that running your instance month to month. You would still get a bill after your year is up, but it would not be particularly large.

Never have more elastic IP addresses than you have running instances. You should not get billed for an elastic IP address so long as it is attached to a running instance. If you stop (shut down) or terminate (delete) an instance, be sure to delete the associated IP address or you will get billed.

To put it another way: Billing for Elastic IP addresses runs precisely counter to our intuition:

- If you use your Elastic IP it is free
- If you don't use it, you get billed

Amazon has a limited number of IP addresses. They don't mind sharing them, but they don't want to waste them. So long as you use them, all is good, but if you just reserve it and don't use it, don't attach it to a running instance, then they are not happy. If they are not happy, they bill you.

## Keep System Up to Date

The update commands:

```bash
sudo apt-get update
sudo apt-get upgrade
```

You should run **sudo apt-get update** and then **sudo apt-get upgrade** every few days. Afterwards, you may need to reboot your EC2 instance.

Sometimes you see messages like "7 packages need to updated, 3 security updates" even after you have run the above commands. So long as it does not cause you to actually upgrade to a new version, you can try to fix those message with this command:

<pre>
sudo apt-get dist-upgrade
</pre>

It's sometimes a good idea to run **sudo apt-get autoremove** after this kind of dist-upgrade.

Your EC2 system can be rebooted with this command:

```bash
sudo shutdown -r now.
```

This will cause your connection to EC2 to close or freeze. You will need to wait about 2 to 5 minutes, and then try to reconnect to your EC2 instance.

These references are useful:

- <http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Provision.html>
- [http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html][configure-linux]

[configure-linux]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html
[ec2-doc]: https://aws.amazon.com/documentation/ec2/
[aws-doc]: https://aws.amazon.com/documentation/
[putty]: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

## SSH on Windows

Until very recently, Windows did not have SSH built into the OS. I hear this is changing. But for now, windows users can still use [PuTTY][putty]:

Convert the PEM file to a PPK file.

- <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#pem>

On Windows, you can connect to your EC2 instance with Putty:

- <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#connecting-to-an-ssh-server-with-putty>

## Details

```
1  exit
2  sudo apt-get update
3  sudo apt-get upgrade
4  exit
5  cd .ssh/
6  ls -la
7  cd
8  mkdir Git
9  cd Git/
10  ls
11  sudo apt-get install git
12  git clone http://github.com/charliecalvert/JsObjects.git
13  cd JsObjects/Utilities/NodeInstall/
14  ls
15  ./NodeInstall.sh
16  ls
17  cd ..
18  ls
19  find . -iname Bash*
20  cat SetupLinuxBox/BashrcExtras
21  nano ~/.bashrc
22  source ~/.bashrc
23  sudo apt-get install ssh
24  exit
25  cd .ssh/
26  ls
27  ln -s bc-2016-01 main-key
28  ls
29  cp ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases ~/.
30  source ~/.bash_aliases
31  sshadd
34  sudo apt-get install tasksel
35  sudo tasksel install lamp-server
```
