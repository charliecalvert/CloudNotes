## Description

Create and provision an EC2 instance suitable for node development or at least running node applications.

## Updated and Partially Automated

This assignment is still under construction, but there should be enough here to get you going.

**NOTE**: _Running the code described here creates EC2 instances. After you create them, terminate them or you will be charged beaucoup bucks. The steps described here also work with regular EC2 accounts (non-AWS-EDUCATE) but in that case I put credentials in a **~/.aws/config.json** file. See commented out line of code and line that sets region._

**NOTE**: _This should all work on Cloud 9, but I have not tested it there. If possible, work on Pristine Lubuntu._

## GitHub Part I

The code here does not yet automate setting up GitHub access. All you really need is your the private key associated with the public key you put in your GitHub account Settings GUI. Before beginning this assignment, make sure you have that key.

## Get Started

Create a folder called **week04-aws-setup**. In it run **npm init**.

Install aws:

```
npm install aws-sdk
```

We are using the AWS SDK to create instances. You will need to create some files described below. But them in a directory of Pristine Lubuntu called **~/.aws**:

```bash
mkdir ~/.aws && cd ~/.aws
```

As mentioned above, this should also work on Cloud9, I just haven't tried it there yet. I suppose it would also work on EC2 itself, but I have not tried that either.

## AWS SDK and AWS Educate {#aws-sdk-educate}

If you are using AWS Educate create a file called **credentials** in **~/.aws**:

```
[default]
aws_access_key_id=<YOUR KEY>
aws_secret_access_key=<YOUR SECRET>
aws_session_token=<WE ALSO NEED THIS ONE>
```

Aws Educate students get their keys by selecting "Account Details" on the AWS Educate site. This button is found on the same page where you see **remaining credits** and **session time**. It's right after you select the classroom. Unfortunately, these keys expire over time, so you will have to recreate the file when your time runs out in Aws Educate. This is not true if you have a regular account.

Your AWS Educate region will be **us-east-1**.

## The AWS SDK for AWS Regular Accounts {#aws-sdk-regular}

If you are trying to use a regular account, not an AWS Educate account, create **~/.aws/config.json**. You can leave **~/.aws/credentials**, I think:

```
{
	"region":"us-west-2",
	"accessKeyId":"YOUR KEY",
	"secretAccessKey": "YOUR SECRET"
}
```

You can also put the variables in the environment:

```
export AWS_DEFAULT_REGION=us-west-2
export AWS_ACCESS_KEY_ID=<YOUR KEY>
export AWS_SECRET_ACCESS_KEY=<SECRET>
```

These will override anything you put in **~/.aws/config.json**.

## Create Your Instance

Back in the **week04-aws-setup** directory, create this file and call it **run.js**:

```JavaScript
var AWS = require('aws-sdk');

AWS.config.credentials.get(function () {
    var accessKeyId = AWS.config.credentials.accessKeyId;
    var secretAccessKey = AWS.config.credentials.secretAccessKey;
    console.log("Access Key:", AWS.config.credentials.accessKeyId);
    console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
});

//AWS.config.loadFromPath(process.env.HOME + '/.aws/config-aws.json');
AWS.config.update({region:'us-east-1'});

console.log(AWS.config);

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// AMI is amzn-ami-2011.09.1.x86_64-ebs
var instanceParams = {
    BlockDeviceMappings: [
        {
            DeviceName: "/dev/sda1",
            Ebs: {
                VolumeSize: 16,
                VolumeType: 'gp2'
            }
        }
    ],
    ImageId: 'ami-0ac019f4fcb7cb7e6',
    InstanceType: 't2.micro',
    KeyName: 'ec2-320-inclass',
    SecurityGroupIds: ['sg-0343e3be157db8175'],
    MinCount: 1,
    MaxCount: 1
};

// Create a promise on an EC2 service object
var instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();

// Handle promise's fulfilled/rejected states
instancePromise.then(
    function (data) {
        console.log(data);
        var instanceId = data.Instances[0].InstanceId;
        console.log("Created instance", instanceId);
        // Add tags to the instance
        var date = new Date().toISOString();
        tagParams = {
            Resources: [instanceId], Tags: [
                {
                    Key: 'Name',
                    Value: 'isit320-' + date
                }
            ]
        };
        // Create a promise on an EC2 service object
        var tagPromise = new AWS.EC2({apiVersion: '2016-11-15'}).createTags(tagParams).promise();
        // Handle promise's fulfilled/rejected states
        tagPromise.then(
            function (data) {
                console.log("Instance tagged");
            }).catch(
            function (err) {
                console.error(err, err.stack);
            });
    }).catch(
    function (err) {
        console.error(err, err.stack);
    });
```

You will have to tweak:

- **KeyName**: the name of your SSH key pair in quotes. It is perhaps a bit like: **'ec2-isit320-2019'**.
- **SecurityGroupIds**: get it from the aws console. It's an array and begins with sg: **['sg-012345'],**
- Maybe other?

When ready, run the file: **node run.js**. If you get errors, explore the output and see if you can find the problem. The code should work if you have the details filled in correctly.

If it works, the last two lines of output will be a bit like this:

```
Created instance i-0r328a80b71617a2c
Instance tagged
```

We will use it for a bit in this assignment, so you may not want to delete it yet, but when you are done with it, terminate it:

		**Actions | Instance State | Terminate**

You can eat up all your credits if you are not careful!		

## Create ~/.ssh/config

It should contain something like this:

```
Host ec2-bc
    HostName <YOUR ELASTIC IP or PUBLIC IP from Aws Educate EC2 instance>
    Port 22
    User ubuntu
    IdentityFile ~/.ssh/<YOUR EC2 KEY>
```    

## JsObjects Provision

Do this:

```bash
slb
git pull
./CreateSymbolicLinks
```

Now the new Provision script should be on your path. Run it:

```bash
Provision
```

It will copy scripts to your instance

Pick A, B and C in turn from the menu.

- Pick A and read it.
- Pick B and wait until it completes. It ends up rebooting your instance. Give the instance time to restart. About 2 minutes, but you can check the AWS console Instances page.
- Pick C. It runs UbuntuSetup from an instance of JsObjects that was automatically installed on your EC2 instance by the Provision script.

Your instance should now be completely configured and ready to use.

**NOTE**: _Don't do any more of this assignment. Stop here._

**NOTE**: _Don't forget to terminate instances you aren't using. You should have only one at a time unless I specifically ask you to do more._

## GitHub Part II

This is not automated yet. For now you need to manually copy your key to your EC2 instance:

```
scp <MyKey> ec2-bc:/home/ubuntu/.ssh/.
```

Create an SSH config file in your EC2 instances ~/.ssh directory. Put this in it:

```
Host github.com
    HostName github.com
    Port 22
    User git
    IdentityFile ~/.ssh/<YOUR GITHUB KEY>
```

Now you should, I think, be able to clone, pull and push your repo.

For extra credit, you automate all this in a script called **load-my-repo-on-ec2**. Copy it to EC2 and run it. Look at **Provision** to see how it is done.

## A Few Tips

If you can get **run.js** to execute properly, then it should create a new EC2 instance of Ubuntu Server on AWS or AWS Educate.

Provision should install **JsObjects**, **NodeJs** and our global NPM packages in our EC2 instance. The NPM packages should be in **~/npm/bin** and other subdirectories of **~/npm**.

Because you have the **config** file in the **~/.ssh** directory, you should be able to reach your EC2 instance with this command:

```
ssh ec2-bc
```

Be careful not to create a bunch of instances on EC2. After you create them and play with them for a bit, go to the AWS EC2 console and terminate them! Probably best not to create more than two at a time. Don't leave more than one running on EC2 for more than an hour. You can leave one running for as long as you want, but don't leave two running for more than a few minutes.

- [EC2 Billing Rules][ec2br]

[ec2br]: https://aws.amazon.com/premiumsupport/knowledge-center/ec2-instance-hour-billing/

## Turn it in

There is another, outdated, Turn it in section below. Use this one.

Delete all your EC2 instances related to this class. On AWS Educate, that means all instances. Create and provision three instances within 20 minutes. Take a screen shot of the EC2 console showing all three instances running. Attach it to the assignment.

I'm looking for:

- Branch
- Folder
- A second screen shot of the AWS Console showing that you have only one instance running and it was created after Oct 4. (That's Oct 5 or later.)

## Begin Old Provision EC2 Assignment

**NOTE**: _Don't do this part of the assignment, or any parts after this. This is here as a reference, but it is outdated due to the new Provision script._

This assignment is perhaps not entirely complete, but here is enough to get you started. Perform the following tasks:

- Update your server (sudo apt-get update etc...)
- Install Git (sudo apt-get install git)
- Download JsObjects from GitHub into your Git folder. (git clone etc...)
- Install Node (In ~/Git/JsObjects/Utilities/NodeInstall)
- Create and Configure an Elastic IP (See Lamp Section)
- Install Lamp (sudo apt-get install tasksel, sudo tasksel install lamp-server)

Optional, at least for now:

 - Install MongoDb

Additional, highly useful, notes are found here:

- <http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html>

**NOTE**: *There is no need to install SSH and Java on EC2. Those just happen to be found on the reference page I'm using for this assignment.*

We can go over this in class, but you will also need to understand how to open up ports, such as 30025, on AWS. For this assignment, you must at least get as far as opening up Port 80:

- <http://www.elvenware.com/charlie/development/cloud/WebServices.html#ec2SecurityGroups>

## Videos

- [Amazon Web Services EC2 Setup](https://youtu.be/TjVWpNZfTPE)
- [LinuxWebUser Part II](https://youtu.be/mSKxHKTQAc4)
- [LinuxWebUser Part III](https://youtu.be/RTICenN5n8Q)
- [Import Files into Git with SSH](https://youtu.be/p1obmWF6Nks)
- [Billing on AWS](https://youtu.be/4w0hKs35cdg)
- [PlayList](https://www.youtube.com/playlist?list=PLe8CjTxuUQ3_RmFD4ROFth7nX_UoUP6pV)

## Update Server

Type the following:

```
sudo apt-get update
sudo apt-get upgrade
```

This ensures that the programs comprising the Ubuntu OS are up to date. You should issue these commands at least once a week, but I tend to it the first time I log on to an EC2 instance on a particular day. In other words, when I am using the server regularl, I do it more than once a week.

## .bashrc

In Windows you have the Windows (or DOS) Command Prompt (CMD). You also have Power Shell. On Linux you have the bash shell. On Lubuntu, you typically open it by selecting LxTerminal. On plain Ubuntu, just select Terminal. The bash shell is the Linux command line where we do most of our work. Though intimidating to new-comers, the Linux bash shell is very powerful and very useful.  

The hidden **~/.bashrc** file contains code that is run each time you open a bash shell. The code in this file ensures that your bash environment is set up correctly.

Type **cd** to go to the home directory. Then type either: **geany .bashrc** or **nano .bashrc**.

Scroll to the bottom of the file, and paste in the following:

```
if [ -z "$SSH_AUTH_SOCK" ] ; then
    eval `ssh-agent`
fi

export PATH="$PATH:$HOME/npm/bin"

export NODE_PATH=:$HOME/npm/lib/node_modules
```

**NOTE**: *In the above **eval** statement those are backticks, not single quotes. The backtick is under the tilda at the top left of most keyboards.*

If you are using **nano**, type **Ctrl-O + enter** to save, and **Ctrl-X** to exit.

**NOTE**: *Students in my programming course should also see the following file, which has a more complete listing of what I have added at the end of my own **~/.bashrc**: file for use on Ubuntu and Lubuntu desktop. This more complete listing is not usually helpful on EC2: **~/Git/JsObjects/Utilities/SetupLinuxBox/BashrcExtras**.*

When you have finished editing it, process your updated **.bashrc** file from the command line: **source ~/.bashrc**.

One final task we should complete at this time: *make sure you have ~/bin folder.* If the folder does not exist already, type the following code to create it:

```bash
mkdir ~/bin
```

## SSH

We are going to create a second SSH key and put the public portion of it on GitHub. We could reuse our previous key, but I want you to get practice creating and storing keys. (It's easy once you get used to it.)

On your EC2 instance, type **cd** and press enter to get to your home directory. Type **pwd** to be sure you are in the right place:

```
ubuntu@ip-172-31-33-240:~$ pwd
/home/ubuntu
```

In your home directory, paste in the following by right clicking on the bash shell:

```
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

Navigate to the .ssh directory and cat your public file:

```
cd .ssh
cat id_rsa.pub
```

Select the entire public key with the mouse and press **Ctrl-C** to copy it. Then go to gitgub or bitbucket, as appropriate. Choose **manage account**, and add you new public ssh key, calling it something like Prog219AwsKey, modifying the name as appropriate to the class you are in.

Make the key readable only by you, the owner:

    chmod 400 ~/.ssh/id_rsa

Then type the following to load the private key. (Like loading a key into Pageant):

    ssh-add ~/.ssh/id_rsa

It might look like this:

```
ubuntu@ip-172-31-33-240:~/.ssh$ ssh-add id_rsa
Identity added: id_rsa (id_rsa)
```

Also, add a **main-key**, as explained in the automating section of the [GitNewRepo][alp] assignment.

Go to your Git Folder and clone your repo, using your github or bitbucket git url as appropriate. The command might look something like this:

```
cd Git
git clone git@bitbucket.com:lastname/reponame.git
```

See also this section on using SSH config files:

- <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#ssh-config>

[alp]: http://www.ccalvert.net/books/CloudNotes/Assignments/GitNewRepo.html#automating-the-load-process

## JsObjects

Be sure to install JsObjects:

```
cd ~/Git
git clone https://github.com/charliecalvert/JsObjects.git
```

## bash_aliases

You can copy a bash_alias file from JsObjects to your home directory. Type **cd** to get to your home directory:

	cd

then copy the file:

	cp ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases .

Then you can edit it with nano:

	nano .bash_aliases

Change this line to reflect what is on your system:

	alias sshadd="ssh-add ~/.ssh/rsa-key-git.pem"

It should probably read like this:

	alias sshadd="ssh-add ~/.ssh/id_rsa"

Save your work with Ctrl-O and the Ctrl-X to exit. Then process your .bash_alias file with
the **source** command:

	source ~/.bash_aliases

## Install Node

See [this section][node-elf] on Elvenware.

[node-elf]:

## Notes on Node Install

If we try to install npm or any other global npm packages, by default they go into places owned globally by the entire system. This means you need to use sudo to install or change them. I don't like that. So instead, I tell the system to put npm and all global packages in my home directory where I can have the rights to do what I want with them. In particular, I put them in $HOME/npm. This is why we modify our path in the **.bashrc** file:

export PATH="$PATH:$HOME/npm/bin"

This is the line from InstallNodePackages.sh that tells the system to put npm and npm packages in our $HOME/npm directory:

	npm config set prefix ~/npm

We can check that setting with this command:

	npm get prefix

## Git

Please read this section of the Elvenware Git docs:

- [Configuring Git][config-git]

[config-git]:http://www.elvenware.com/charlie/development/cloud/Git.html#configuring-git

## Lamp

LAMP stands for Linux Apache MySql and Python/Perl/Php.

We are interested in Apache, which is a web server running on Port 80. Details on setting up LAMP are [here][lamp].

The **Public IP** addresses assigned to you by default on EC2 are not permanent. Since I want a link to your Apache2 running on EC2, I need a permanent link that will not go away. To do this, you need to create an **Elastic IP** and assogiciate it with your running instance. Details are [here][elasticip].

**NOTE**: *Once you create an Elastic IP address, your Elastic IP and Public IP address are usually the same. At that point, your Public IP address should be permanent, but only because you have created an Elastic IP address and associated it with your instance.*

[lamp]:http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux
[elasticip]:http://www.elvenware.com/charlie/development/cloud/WebServices.html#elastic

## Old Turn it In

Ignore this.

To turn in the assignment, you should provide a screen shot showing:

- A listing of your Git folder (ls -la ~/Git). A sample screen shot is shown below, but it has more directories in it than your's will have. I want to see both JsObjects and your repository.
- A listing of the JsObjects directory (ls -la ~/Git/JsObjects)
- A listing of your repository (ls -la ~/Git/isit322-lastname-2016)
- A listing of your .ssh folder: (ls -la ~/.ssh
- A link to your site and/or a screen shot of it running. It should show the Apache welcome screen, and your IP address, as shown below. This part of the assignment will not work unless you have first opened up Port 80.

Here is a sample listing screen shot:

![Git Listing](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Ec2Listing01.png)

Here is a sample of what the Apache welcome screen should look like:

![Lamp](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/LampApache2.png)

## More Information

The following document used in another of my classes also contains information that you might find useful:

 - [AwsEc2Expert](http://www.elvenware.com/charlie/books/CloudNotes/Assignments/AwsEc2Expert.html)

## History

What I did in class some time in the past. Might be useful:

```
 1  exit
    2  sudo apt-get update
    3  sudo apt-get upgrade
    4  exit
    5  ls
    6  sudo apt-get install git
    7  git --version
    8  git
    9  mkdir Git
   10  cd Git/
   11  git clone http://git@github.com/charliecalvert/JsObjects.git git clone http://git@github.com/charliecalvert/JsObjects.git
   12  git clone http://git@github.com/charliecalvert/JsObjects.git
   13  cd ,,
   14  cd
   15  cd .ssh/
   16  ls
   17  cd
   18  ckear'
   19  clear
   20  pwd
   21  cd Git/
   22  cd
   23  ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
   24  cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   25  pwd
   26  ubuntu@ip-172-31-33-240:~$ pwd
   27  /home/ubuntu
   28  cd .ssh/
   29  ls
   30  clear
   31  ls
   32  ls -l
   33  nano id_rsa.pub
   34  cat id_rsa.pub
   35  cat id_rsa.pub
   36  cd
   37  nano .bashrc
   38  cd .ssh
   39  ls
   40  chmod 400 id_rsa
   41  ssh-add id_rsa
   42  source ~/.bashrc
   43  ssh-add id_rsa
   44  ubuntu@ip-172-31-33-240:~/.ssh$ ssh-add id_rsa
   45  Identity added: id_rsa (id_rsa)
   46  cd ..
   47  cd Git/
   48  dir
   49  git clone git@bitbucket.org:ccalvert/prog219-calvert.git
   50  cd prog219-calvert/
   51  ls
   52  cd Week05-AngularMongoCrud/
   53  npm install
```
