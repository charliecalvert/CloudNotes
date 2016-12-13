## Description

EC2 Get Started

## Step One

Create an account on EC2.

- Slides that describe process: [http://bit.ly/ec2-aws](http://bit.ly/ec2-aws)

## Step Two

Create an EC2 Instance.

It will be assigned:

- A public private key pair that you can download. Put it in your **.ssh** folder.
- A non-permanent public IP address for your EC2 instance. You can see this in your AWS console, under EC2 instances.

We will need a permanent IP address, here are instructions on creating elastic IP address. The elastic IP will not change.

- [Elastic IP](http://www.elvenware.com/charlie/development/cloud/WebServices.html#elastic)

## Step Three

From Linux:

- Load you EC2 PEM file on your local machine. On the Pristine Lubuntu:

```
ssh-add ~/.ssh/<YOUR EC2 PRIVATE KEY>
```

It might look like this:

```
ssh-add ~/.ssh/Prog270-Ec2-Calvert-2016.pem
```

For windows users:

Convert the PEM file to a PPK file.

- <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#pem>

## Step Four

Connect to your EC2 instance with SSH.

	ssh ubuntu@<YOUR IP PUBLIC IP or ELASTIC IP ADDRESS>

For instance:

	ssh ubuntu@192.168.1.25


![Connect to EC2 activity diagram](https://s3.amazonaws.com/bucket01.elvenware.com/images/ssh-key-for-ec2.png)

Connect to your EC2 instance with Putty:

- <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#connecting-to-an-ssh-server-with-putty>

See also:

- [AwsExpect][aws-expert]
- [.bashrc and ssh-agent][ec2-provision]
- [SSH and Configuring Linux][ssh-configure-linux]

[aws-expert]:http://www.ccalvert.net/books/CloudNotes/Assignments/AwsEc2Expert.html#step-two-ssh-into-your-instance
[ec2-provision]:http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Provision.html#-bashrc
[ssh-configure-linux]:http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#install-ssh

## Step Five

Add a the public part of your PROG270 Key to your Ubuntu instance in the **~/.ssh/authorized_keys** file.

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

Don't forget to put your new private key on Google Drive. Go to the ~/.ssh folder and issue a command similar to this one:

```
zip Prog270-Ec2-Calvert-2016 Prog270-Ec2-Calvert-2016.pem
```

Now upload the zip file to Google Drive. It doesn't have to be in our shared folder. Just so you can get it at home.

Choose **New | File Upload** on Google Drive.

Copy your private SSH key that you use to connect to GitHub to your new Ubuntu server:

	scp <YOUR KEY> ubuntu@35.163.123.100:/home/ubuntu/.ssh/.

Of course, use your public or elastic IP address.

## Setup Box

There are a number of steps required to get the instance set up correctly. I outline them in the first few sections of this document:

- [Configure Linux][configure-linux]

See in particular the first three sections.

## Turn it in

Take a screen shot of the command prompt and submit that with your assignment.

A good screen shot would show you first on Pristine Lubuntu, then connecting to EC2, and running this command:

<pre>
ls ~/Git
</pre>

It should show that you have a JsObjects directory. Don't forget:

- sudo apt-get install python

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
