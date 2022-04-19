---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws/AwsCloudNine.md
relativePath: Assignments/Aws/AwsCloudNine.md
title: AwsCloudNine
queryPath: Assignments/Aws/
subject: Aws
fileNameMarkdown: AwsCloudNine.md
fileNameHTML: AwsCloudNine.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The key feature for us that we can code with only a browser and an AWS account. We don't need to set up a VM. This is not as powerful as Pristine Lubuntu, but it is enough to allow you to write code and access all the features of the Ubuntu command line.


Using CloudNine is "free". That is, you can use the service for free, but your AWS instance still costs money. They put it this way: "The service is provided at no additional charge, and you [are] only charged for the underlying compute and storage resources."

## Setup

Before working with IAM and Installing CloudNine, be sure that you have setup an Ubuntu Server EC2 instance.

![Most Commonly Used Services][mcus]

**Figure**: _Our most commonly used AWS services are EC2, S3, IAM and Cloud9._

## IAM

We are going to create an AWS user with limited permissions. To do this, we will use a service called IAM. This will allow you to allow yourself or others limited access to your AWS account. The goal here is security. Even if someone broke into your limited AWS account, there would be only so much they could do.

- Select the IAM Service.
- Create a Group called **Ec2Limited**
- Add the following rules to the Group. (Use search to find them.)
  - **EC2FullAccess**
  - **AWSCloud9EnvironmentMember**
  - **AWSCloud9User**
- Create a new user with
  - **AWS Management Console** access
  - Create custom Password and save it. (Preferably with LastPass!)
  - Deselect "**User must create new password at next signin.**"
- Attach the user to **EC2Limited** group.


**NOTE**: _It seems to take awhile for a new user to propogate through the system. Or sometimes it seems like I have to re-enter the password for the user before it really sticks. I'm not sure which. But try waiting, or recreating the password for a user if you have trouble signing as the new IAM user._

## Images

Here are some screenshots to help you navigate through AWS menus.

![IAM Dashboard][aid]

**Figure**: _The Dashboard is the home screen for IAM._

Your dashboard will probably look a bit different than mine, but the general appearance should be similar.

![IAM Users][aiu]

**Figure**: _The IAM Users screen. You may have only one user._

Above you can see three users:

- barfoo
- charlie
- charliefoo

Next to each user name is the group to which they belong.


![Attach Policy][aap]

**Figure**: _Attaching a policy to a group._

![Permissions][awsp]

**Figure**: _Viewing the Group permisions after they are setup. You want your screen to look like this. It means your group has the right policies, the right permissions._

## Install CloudNine

- Go to the CloudNine service and select it
- Choose **Create Environment**
- NameIt: **prog272-calvert**, but use your last name.
- Choose: Connect and run in remote server (SSH)
  - User: Ubuntu
  - Host: You Elastic IP
  - Port: 22
- SSH
  - Copy the SSH public key provided by AWS to the clipboard
  - SSH into your AWS environment.
  - Edit the **authorized_keys** with this command: **nano ~/.ssh/authorized_keys**
  - Create a new line at the bottom of the file and paste in the public key
  - Save your work with **Ctrl-O** plus **ENTER** and exit with **Ctrl-X**
- Choose **Next Step** and **Create Environment**
- Install Collab and Lambda. You probably don't need Docker at this point.

![Aws SSH Setup][asset]

**Figure**: _Pasting in your Elastic IP._

![Authorized Keys][aak]

**Figure**: _Paste in the public key from AWS underneath the existing key in your authorized keys file. Use **Ctrl-O** to save and **Ctrl-X** to exit. The ^ symbol used at the bottom of the editor means use the control key. So that ^G means use Ctrl-G to Get Help._

The **nano** editor is a good tool even if it is strange to those of us who are used to Windows style editors. Learning to use it is worthy goal. Many of the key strokes that work in the editor also work at the Bash shell. For instance **Ctrl-A** (Beginning of line) and **Ctrl-E** (end of line). **Ctrl-F** is move forward one character, and **Ctrl-B** is move back one character. Once you get the hang of it, you will realize there are alternative techniques to using arrow keys.

## Turn it in

I'm looking for pretty much any screen shot that includes a view of your AWS Cloud9 development environment. For instance, attach to your assignment a screen shot similar to, but not identical to, this:

![Charlie Cloud9 on AWS][c9acc]

## Understanding Cloud Services

All three of the cloud services we use can be used to edit code and run programs. However, think of things this way:

- Pristine Lubuntu runs on our local machine. When we type npm start and start a program, it can be reached on Pristine Lubuntu and other machines on the local network.
- Cloud 9 (c9.io) runs in the cloud. When we start a program on it that program can be reached from anywhere in the world, but it can only be run for a short time.
- Our EC2 instance on AWS runs in the cloud, and we can create programs on it that run for extended periods of time. They will run until we take them down or take down our instance. We haven't learned how to do this yet. Cloud 9 on AWS fits in this category. Above I talk about c9.io.

Another way to say the same thing:

- Pristine Lubuntu and Cloud 9 are good places to develop code.
- AWS is a good place to deploy code.

[c9acc]: https://s3.amazonaws.com/bucket01.elvenware.com/images/cloud9-aws-charlie-code.png

[asset]: https://s3.amazonaws.com/bucket01.elvenware.com/images/AwsSshSetup.png
[aap]: https://s3.amazonaws.com/bucket01.elvenware.com/images/AwsAttachPolicy.png
[aak]: https://s3.amazonaws.com/bucket01.elvenware.com/images/AwsAuthorizedKeys.png
[aid]: https://s3.amazonaws.com/bucket01.elvenware.com/images/AwsIamDashboard.png
[aiu]: https://s3.amazonaws.com/bucket01.elvenware.com/images/AwsIamUsers.png
[awsp]: https://s3.amazonaws.com/bucket01.elvenware.com/images/AwsPermissions.png


## Links

- [AWS CloudNine Overview][awsc9overview]
- [ACE Editor on GitHub](https://github.com/ajaxorg/ace)
- [Root vs IAM][awsiamroot]

[awsc9overview]: https://aws.amazon.com/blogs/aws/aws-cloud9-cloud-developer-environments/
[awsiamroot]:https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html
[mcus]: https://s3.amazonaws.com/bucket01.elvenware.com/images/AwsServices.png
