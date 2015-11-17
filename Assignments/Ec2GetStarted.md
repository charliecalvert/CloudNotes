## Description

EC2 Get Started

## Step One

Create an account on EC2.

- Slides that describe process: [http://bit.ly/ec2-aws](http://bit.ly/ec2-aws)

## Step Two

Create an EC2 Instance.

It will be assigned:

- A public private key pair that you can download
- A non-permanent public IP address. 

We will need a permanent IP address, so later will create an elastic IP address. They are permenant.


## Step Three

From Linux:

Load you PEM file on your local machine. On the client.

Add a PEM file to your Ubuntu instance, to the server, in the **~/.ssh/authorized_keys** file.

For windows users:

Convert the PEM file to a PPK file.

- <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#pem>

## Step Four

Connect to your EC2 instance with SSH.

	ssh ubuntu@<YOUR IP PUBLIC IP or ELASTIC IP ADDRESS>

For instance:

	ssh ubuntu@192.168.1.25


Connect to your EC2 instance with Putty:

- <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#connecting-to-an-ssh-server-with-putty>

## Step Five

Take a screen shot of the command prompt and submit that with your assignment.