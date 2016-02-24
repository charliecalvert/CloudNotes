#AWS EC2 Expert

Primary goals:

 1. Learn to set up an Elastic IP
 2. Gain confidence creating EC2 instances

## Step One Elastic IP

The goal of this step is to be sure you have an [elastic IP][elasticip], and that it is attached to your instance.

- Sign into AWS and follow the [steps outlined on Elvenware][elasticip] for setting up an Elastic IP.

[elasticip]: http://www.elvenware.com/charlie/development/cloud/WebServices.html#elastic

When you are done, take a screen shot of your elastic IP page on AWS.

Hint on managing elastic IPs:

A single Elastic IP can be associated with only one instance at a time. When you switch from one instance to another, you might want to follow these steps.

- Exit from the 1st instance.
- Disassociate the Elastic IP with the 1st instance.
- Associate the Elastic IP with the 2nd instance.
- Sign on the 2nd instance.

## Step Two: SSH into your Instance

From the Linux command line, navigate to your .ssh directory:

    cd ~/.ssh

Load your EC2 instance's private key, which probably has a name like **Prog282-2014.pem**, but which might have some other name:

    ssh-add Prog282-2014.pem

Now SSH into your AWS instance:

    ssh ubuntu@[YOUR_ELASTIC_IP]

Remember, there are two steps necessary to load a key into memory:

 1. Make sure ssh-agent is running (eval `ssh-agent`). This step is already done automatically for you in pristince ubuntu because it is included in the **.bashrc** file I gave you at the start of the quarter.
 2. Load a specific key into the **ssh-agent** by running **ssh-add**.

If you want to work in a browser, watch [this video](http://youtu.be/fZE_fLw7Qrg):

<iframe width="640" height="360" src="//www.youtube.com/embed/fZE_fLw7Qrg" frameborder="0" allowfullscreen></iframe>

![Connect to EC2](https://s3.amazonaws.com/bucket01.elvenware.com/images/ssh-key-for-ec2.png)


## Step Three: Create Three Instances

On AWS, create three Ubuntu 14.04 64 bit VMs. Use the same key pair and same security credentials for all three instances. You already know what to do, but you might want a reminder. This older video isn't exactly what you want, but it is close enough:

<iframe width="420" height="315" src="//www.youtube.com/embed/TjVWpNZfTPE" frameborder="0" allowfullscreen></iframe>

You can also look here:

- [AWS Ec2 on Elvenware](http://elvenware.com/charlie/development/cloud/WebServices.html#ec2)

Take a screen shot of the Volumes page and show the **Created** date. I want to see that all three images you created were made on May 29, 2014 or later. In the screen shot shown below you can see two images that I created and the dates when they were created. Note that neither was created on May 29, 2014, or later, so they are not new enough to meet the requirements for this assignment. Your screen shot must show the date created and as many other fields as you can manage to show. I've cut this image off, so that it was not too big to view on your browser. But the image you create need have no such limitation and it must show that your images were created after May 28, 2014. ***It should also show your attachment information.*** My attachment information inludes the instance id **i-94bc2dc7**. Make sure that ID is visible in your screen shot.

![EC2][ec2Vol01]

[ec2Vol01]: http://www.elvenware.com/charlie/books/CloudNotes/Images/Ec2Vol01.png

**NOTE**: *You might get an error when you try to sign on to a new instance using the same elastic IP address you used for another virtual machine. The problem is this: in your **./ssh/known_hosts** file an IP address is identified with a key that uniquely identifies a particular machine or VM. When you switch from one VM to another, but keep the same elastic IP, then you can get an **ECDSA error** about the key being changed. To fix it, remove the key from the **./ssh/known_hosts** file. That is the file where the keys are kept. The error you got specifies the line number in the known_hosts file where the problem record is stored. This command will remove a particular line, in this case the 6th line, from **known_hosts** file*:

    sed -i '6d' ~/.ssh/known_hosts

*After doing this, you should be able to ssh into your new VM*:

    ssh ubuntu@<Your ELASTIC IP>

*See [here for more info][kh]*

[kh]: http://superuser.com/questions/30087/remove-key-from-known-hosts

## Step Four: Provision

Run these commands in each instance. First update the instance to the latest software:

	sudo apt-get update
	sudo apt-get upgrade

Install [GIT][giter]:

	sudo apt-get install git

Install [node][noder]:

	sudo apt-get install python-software-properties python g++ make
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs

Install [Lamp][lamper]:

	sudo apt-get install tasksel
	sudo tasksel install lamp-server

Increasingly, I'm finding that taskself comes with Ubuntu distros, so you may be able to skip that step.

[noder]: http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html
[giter]: http://www.elvenware.com/charlie/development/cloud/Git.html#install-git-on-ubuntu-server
[lamper]: (http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux)

## Step Five: Set up SSH

Right now you have to work with two SSH keys. The one from your Pristince Ubuntu instance, and the one on your AWS instance. There is no need for that. You can use the same key on both machines. This section describes how to do that.

When you started work on your Pristine Ubuntu instance early in the quarter, one of the first things you did was create an SSH key pair called, by default, **id_rsa** and **id_rsa.pub**. If you put your **id_rsa.pub** key in the **./ssh/authorized_keys** file for your AWS instance, then you will be able to SSH into your AWS instance and access your BitBucket repository with the same key.

On your AWS instance, type this command to open your **authorized_keys** file in the **nano** editor that ships with Ubuntu:

    nano ~/.ssh/authorized_keys

This old screen shots shows something of what you might see when you open your authorized keys file in the **nano** editor:

![authorized_keys][akeys01]

Note that your authorized_keys file already contains the public key for the key pair your created when you created your AWS instance. You need to add the **id_rsa.pub** file from your pristine_ubuntu instance to this authorized_keys file. Open the **~/.ssh/id_rsa.pub** file from pristine ubuntu in Geany. Select and copy the key. Now switch to your AWS instance and paste your key into Nano.

You know how to cut and paste. Just remember you have no mouse in Nano, and be careful not to damage your authorized_keys file. If you do, that will be the end of your instance. You will have to delete it and create a new one. You might, for instance, use the **end** key to navigate to the end of your existing key in your authorized_keys file. Press **enter** to create a new line. Now paste in your **id_rsa.pub** key. The result should look something like what you see below. Press Ctrl-O to save your work. Then press Ctrl-X to exit.

![authorized_keys02][akeys02]

**NOTE**: *It's easy to accidentally press Ctrl-Z and exit the nano editor without really closing it. If you are in the editor, and suddenly find yourself back at the command prompt without quite knowing how you got there, try typing **jobs** to see if you have any running jobs. If you do, type **fg** to return to the editor.*

Okay. Once you have added your key to the authorized key file, type exit to close your AWS SSH shell and return to Pristine Ubuntu. From now on you should be able to access your AWS instance with just **id_rsa** private key loaded. You should also be able to copy your id_rsa_private key to your EC2 instance. From the pristine ubuntu **.ssh** directory type this command:

    scp id_rsa ubuntu@[YOUR_ELASTIC_IP]:/home/ubuntu/.ssh/.

SSH back to your EC2 instance. Edit your ~/.bashrc file in nano and the following:

    if [ -z "$SSH_AUTH_SOCK" ] ; then
        eval `ssh-agent`  
    fi

ssh-add ~/.ssh/id_rsa

Be sure there is at least one blank line after the last command in the file. Now you should be able to push and pull from your repository without having worry about loading ssh-agent or your private key.

[akeys01]: http://www.elvenware.com/charlie/development/cloud/images/Putty06.png
[akeys02]: http://www.elvenware.com/charlie/books/CloudNotes/Images/Ec2Vol02.png


##Step 6: Clone your repository.

Create a **Git** folder in your home directory. Navigate into that folder and then clone your repository on each of your three new instances. On each instance, start one of your programs (npm start). Pick a program that talks back and forth between the server and the client. I'm looking for a program that calls into a route such as '**/read**' that you created on the server. Do something to make it talk back and forth some. Press Ctrl-C to close your node instance. Immediately run this command:

    wget -q -O - http://169.254.169.254/latest/meta-data/instance-id

The result is somewhat messy, but it is informative. Create a screen shot that might look something like this:

![wget Shot][akeys03]

Note the GET lines with the green 200 in them. Those show that your client is talking to your server. I'm looking for that kind of thing. I'm particularly interested in requests like the one for **/getFullName**. That shows you are requesting more than just HTML, CSS and JS files. In other words, requests for style.css, or Utilities.js are nice, but they just prove that your app is loading, They don't show that you are calling specific routes.

If you don't see GET statements like those shown here, check how you are starting your app. My **package.json** started the app like this:

    "scripts": {
        "start": "node ./bin/www"
    },

Now let's talk about the output you get from the call to wget. See right at the bottom on the left where it says **i-94bc2dc7**? That is the Volume ID for my EC2 virtual hard drive. The ID was retrieved by using wget to pull down the results from accessing the specific URL shown above. Your results will be different than mine. I'm looking for your instance ID and matching it to the ID's in your second screen shot, the one that showed your three volumes. In total, your screen shots should show three ids, one in each screen shot. Each screen shot contains one instance id, and each one is different. That's three IDs, one for each instance. For instance, the sample screen shot I show here represents one screen shot and one instance id.

In total, you will need to create three of these screen shots, one for each of your instances. I'm matching the ID returned by the call to **wget** to the id from the list of volumes in your previous screen shot.

**NOTE**: *You don't have to all three new instances running at once. You can*:

- Create the three instances. Stop each on as soon as it starts.
- Create the first screen shot of the three volumes.
- Start the first instance. Provision it, create the second screen shot.
- Terminate the first instance
- Start the second instance. Provision it, create the second screen shot. etc.

**TIP**: *You may find it useful to create scripts that perform certain tasks. You might also want to secure copy (scp) your scripts back and forth between pristine ubuntu and your AWS instances. For instance put the lines that install node into a script called [installNode.sh][installNode]*

Then:

    chmod +x InstallNode.sh

And thereafter:

    ./InstallNode.sh


[installNode]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/InstallScripts/InstallNode.sh
[akeys03]: http://www.elvenware.com/charlie/books/CloudNotes/Images/Ec2Vol03.png

##Step 7: Turn it in

Create a folder in your repo called **Week08Ec2Instances**. Place your five (or more) screen shots in your folder. Push.

- Elastic IP screen shot.
- Volumes for VM screen shot that inclues date and instance id (like i-94bc2dc7)
- Three running instances including the instance-id (like i-94bc2dc7)
