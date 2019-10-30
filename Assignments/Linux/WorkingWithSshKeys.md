## Overview

One thing that we need to be able to easily do is create and use SSH keys. The process is simple, and our life working with Linux, Git, EC2 and other cloud services is greatly simplified if we know how to easily create and use SSH keys.

## Install SSH

We can't do much with an SSH key if we don't have SSH installed. You can test if SSH is installed with this command:

    ssh -V

It should return the version number:

    ssh -V
    OpenSSH_8.0p1 Ubuntu-6build1, OpenSSL 1.1.1c  28 May 2019

If you get an error instead of a version number, then install SSH:

    sudo apt install ssh

## Create a Key

To create an SSH key use **ssh-keygen** and use the f switch to pass in the name of the file you want to create:

    ssh-keygen -f ~/.ssh/mykey

I am not sure exactly where it is documented, but when we do this it is as if we issued the following commands:

    mkdir ~/.ssh
    chmod 700 ~/.ssh
    ## Then we generate the key in ~/.ssh

In other words, special permissions are assignment to the ~/.ssh directory:

    drwx------  2 bcuser bcuser  4096 Oct 29 10:39 .ssh/

These are more restrictive than the permissions for most directories:

    drwxr-xr-x  2 bcuser bcuser  4096 Oct 24 08:48 Documents/
    drwxr-xr-x  2 bcuser bcuser  4096 Oct 24 08:48 Downloads/

Once we have create the .ssh directory, we can of course just navigate to that directory and skip the directory name when issuing the command to create a key:

    ssh-keygen -f mykey

By default, **ssh-keygen** asks you if you want to add a password or not. If you want to automatically create a key that has no password, do this:

    ssh-keygen -P '' -f no-password-key

## Install Public Key for GitHub

First cat out your public key. The process looks a bit like this:

```
bcuser@pl1910:~/.ssh$
$ cat mykey.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDoPOJHJ08h9EIvrNEHf/
PkvuepRjV9FBg1K4c1cYpuHB+maeXVw0wiMl+h9J8ND7qOJkO2/j2BiqeBL
zj2wDO1u+/h26CnHIBs67C8rcXVoj4XnNcwOaot9m97koKkJPZ+PERAG6rxjUGxb
dsYx0lazliKockqaBkibcG6mBT57L8oz5f5oU4/g8QQVZqd2db0Y7iWW7
o0cj3DAxnGFUNO7yLuUYts54K5a3SlI25pVEyR0xfeVjOwhHDZNB0
jNQ3qMS6XvGkQoz7UKipUfw+BGd6XvfDsLSOeteqf7rCV97m9ZxX8N9HbZPG/8n9C0t+3B
Jr1+RNM6tHK0Ox18iHHbjs13JmjjC2GeU5ONjAU8IgsTw4QThvcpARiDD+F62rxLpA
5D28Q0c4KFFQSAfe8eZhhugiXoH4MKU+pYBrTgSjdjnlwC2szYee8s1c9A4V8nZFuknCoPU8
+14PZygbBJ7yckegaw6/sF1JpPHZDZoWvHVM= bcuser@pl1910
```

Block copy your public key and paste it into this location:

- [https://github.com/settings/keys](https://github.com/settings/keys)

[Watch the 47 second video](https://youtu.be/9EXUWtDNLvk)

## Copy a Key to EC2

The simplest solution is probably to repeat the above steps on your EC2 instance. You end up with two keys, which many consider the safest option, and the process only takes a minute or so.

If, however, you want to copy a private key from your current machine to an EC2 instance, here is how to proceed.

I assume you have a **~/.ssh/config** file with something like this in it:

```
Host ec2-ed
	HostName 31.230.21.23
	Port 22
	User ubuntu
	IdentityFile ~/.ssh/ec2-isit320-2019.pem
```

The **ec2-isit32-2019.pem** file is the file you got from AWS wen you create your EC2 instance.

Here is the command to copy a key from your current machine to your EC2 instance:

    scp mykey ec2-ed:/home/ubuntu/.ssh/.

It looks like this if all goes well:

    $ scp mykey ec2-ed:/home/ubuntu/.ssh/.
    mykey        100% 2602    27.9KB/s   00:00    

## Turn it in

Generate three keys called:

- testkey01    
- testkey02
- testkey03

Install the associated public key on GitHub and submit a screenshot showing them up there.

Print the MD5 fingerprint of all three public keys and take a screenshot:

    ssh-keygen -E MD5 -lf mykey.pub

The output should look like a bit like this for each of the three keys:

    ssh-keygen -E MD5 -lf mykey.pub
    3072 MD5:4f:70:d6:d3:33:32:cc:a0:91:8f:09:39:69:33:c2:8a charlie@elf-path (RSA)

The following sections are not part of the assignment per se, but they contain information you might find useful.    

## Hint

I nearly always upload to the Google Cloud the private keys given to us by AWS when we generate an EC2 instance.

The keys were are generating in this assignment, however, I am no longer uploading very often. It is simpler just to generate new keys from home, school, or for use on EC2, as the case may be.
Then I upload the public key to GitHub.

## Create a Public Key from Private

Use the -y switch:

ssh-keygen -y -f ~/.ssh/mykey

## Copy ID

If you own a private key, and you want to use it to access a remote server, such as an EC2 instance, you need to put the public key associated with that private key in the **~/.ssh/authorized_keys** file of that remote server. Here is a way to do that without first logging on to the remote server:

    ssh-copy-id -i $HOME/.ssh/mykey.pub ubuntu@ec2-ed

You have to know either the user name and password for the remote server, or you must have another private key for the sever. That may seem restrictive, but the technology can allow you, for instance, to use the same key to access GitHub and to SSH into your EC2 instance. In other words, once you have **mykey.pub** in GitHub and in the remote **authorized_keys** file you can use **mykey** to access both GitHub and the remote server. This means you need to load only one key.

If you are using a key, rather than a user name and password, then add the -f parameter to allow the key to be added without first checking to see if you can log in.

    ssh-copy-id -f -i $HOME/.ssh/id_rsa.pub ubuntu@ec2-ed

In other words, the username and password are what we typically use when accessing another local ubuntu server that we created with VirtualBox, but we need the -f when accessing a remote EC2 instance.

This might work to help you delete an entry from an authorized_keys file:

    idssh=`cat ~/.ssh/mykey.pub | awk '{print $2}'`
    ssh ubuntu@ec2-ed "sed -i '\;${idssh};d' .ssh/authorized_keys"

The second line is an odd command because sed usually uses the forward slash as a delimiter, but that character can also end up in public key. So I use a semicolon instead, only in this case I had to first escape it. One would expect the sed command to delete a line to look like this:

    sed -i '/${idssh}/d

But the forward slash is no good in our case, so use this:

    sed -i '\;${idssh};d    
