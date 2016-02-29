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

We will need a permanent IP address, so later we will create an elastic IP address. The elastic IP will not change.

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

Add a the public part of your PROG270 Key to your Ubuntu instance in the **~/.ssh/authorized_keys** file. From your instance of Pristine Lubuntu use SSH to *secure copy* (scp) your file from pristine Lubuntu to your EC2 instance:

```
	scp <YOUR-PUBLIC-KEY> ubuntu@<YOUR-ELASTIC-IP>:/home/ubuntu/.ssh/.
```

Then on EC2 append your public key to your **authorized keys file**:

```
cat ~/.ssh/<YOUR-PUBLIC-KEY> >> ~/.ssh/authorized_keys
```

Don't forget to put your new private key on Google Drive. Go to the ~/.ssh folder and issue this command:

```
zip Prog270-Ec2-Calvert-2016 Prog270-Ec2-Calvert-2016.pem
```

Now upload the zip file to Google Drive. It doesn't have to be in our shared folder. Just so you can get it at home.

Choose **New | File Upload** on Google Drive.

## Turn it in

Take a screen shot of the command prompt and submit that with your assignment.

## Keep System Up to Date

The update commands:

```bash
sudo apt-get update
sudo apt-get upgrade
```

You should run **sudo apt-get update** and then **sudo apt-get upgrade** every few days. Afterwards, you may need to reboot your EC2 instance.

Your EC2 system can be rebooted with this command:

```bash
sudo shutdown -r now.
```

This will cause your connection to EC2 to close or freeze. You will need to wait about 2 to 5 minutes, and then try to reconnect to your EC2 instance.
