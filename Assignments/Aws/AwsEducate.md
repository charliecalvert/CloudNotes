## Overview

Each of you should have received an invitation to join AWS Educate.

Either of these links should take you to the AWS Educate site:

- [http://awseducate.com/](http://awseducate.com/)
- [https://aws.amazon.com/education/awseducate/](https://aws.amazon.com/education/awseducate/)

Click on:

- [Join AWS Educate][jawse] if you have not yet registered for the site.
  - In many cases the **Starter Account** option will be your best choice.
  - For more details on Starter Accounts and Personal Accounts, see the [Notes on AWS Educate][#aws-notes]
- [Log in][awsl] if you have already joined

At this point you may be able to proceed immediately, or it may turn out that you have to wait a few days for AWS to process your request.

## My Classroom

Once you are logged in, press the **My Classrooms** button.

Select the Prog 109, Introduction to Web Development, **Go to classroom** button. You will probably have to click through a popup. If you don't see the popup, then you will have to allow popups for both these sites:

- https://www.awseducate.com/
- https://labs.vocareum.com

Here are the details on how to proceed:

- [Allow popups on Chrome][apc].
- [Allow popups on Firefox][apf]

![Firefox popups][fpu]

## AWS Console

Click the AWS Console button.

![AWS Console][awsc]

## Cloud 9 on AWS

You may be able to click the Cloud 9 service link directly. If not, click:

- **All Services**
- **Developer Tools | Cloud 9**
- Create Environment
- Name: Prog109
- Description: For work in Prog109 or whatever.
- Click Next
- Select **Create a new instance for EC2**
- t2-micro
- After 4 hours
- Next and then review and create the environment

## Clone Your Repository

The first step will be to create a private and public key pair. Use the **cat** command to display it. Then copy your public key into the Settings for GitHub.

- ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
- cd ~/.ssh
- cat .id_rsa.pub
- You will see your public key. Block copy it.
- Go to the icon at the top right of GitHub. Open it, and choose **Settings**. Paste the public key in under **Settings | SSH**

**REMINDER**: _The steps shown above are for use in Linux environments such as we have in AWS Cloud9. This won't work on Windows unless you do some setup first._

Here is how to modify **.bashrc** on Cloud9:

- Select **Gear | Show home in Favorites** on the far left.
- Select **Gear | Show hidden files** on the far left.
- Open **.bashrc** in the editor

Paste this into the bottom of the file.

```bash
if [ -z "$SSH_AUTH_SOCK" ] ; then
    eval `ssh-agent`
fi
```

Create a file in your ~/.ssh directory called **config**. Put this in it:

```
Host github.com
	HostName github.com
	Port 22
	User git
	IdentityFile ~/.ssh/id_rsa
```  

## Turn it in

Attach a screenshot showing that you are logged into Cloud 9 on AWS.

## Notes on AWS Educate {#aws-notes}

Students in Prog109, Fall 2018 will probably want to ignore this section. It is really meant for students in other courses that I teach.

Follow this link to get an explanation of the [two different types of AWS Educate accounts][aws-accounts].

When students sign up for AWS Educate they have two choices. If you don't know which choice to pick, choose the [Starter Account][aws-eb].

- **Existing AWS Account plus Credit Card:** If you already have an AWS account, or if you do not mind using your credit card to start one, then you should follow the instructions on the page linked above that appear under the heading Using your own AWS account with AWS Educate. This will allow you to apply a credit to your existing AWS account so that you can use the AWS services in this course without being charged. Note that there is a limit to how much credit you will receive, but it should be plenty for this course if you are careful.
- **No Existing AWS and no desire to use a Credit Card**: If you do not have an AWS account and are not willing to give AWS your credit card, then you should create an AWS Starter Account. See the section labeled **Using AWS Educate Starter Accounts** in the document linked above. A Starter account has some limitations, such as a need to sign in once an hour, and the fact that your work on AWS will be deleted at the end of the quarter. In particular, your EC2 instance will be deleted.  We keep our code on GitHub, not on AWS, so losing our EC2 instance is may not be a problem for many of us.

[aws-accounts]: https://aws.amazon.com/premiumsupport/knowledge-center/educate-starter-account/
[jawse]: https://www.awseducate.com/registration
[awsl]: https://www.awseducate.com/signin/SiteLogin
[apc]: https://support.google.com/chrome/answer/95472?co=GENIE.Platform%3DDesktop&hl=en
[apf]: https://support.mozilla.org/en-US/kb/pop-blocker-settings-exceptions-troubleshooting
[awsc]: https://s3.amazonaws.com/bucket01.elvenware.com/images/aws-educate-status.png
[fpu]: https://s3.amazonaws.com/bucket01.elvenware.com/images/firefox-popups.png
[aws-eb]: https://aws.amazon.com/blogs/publicsector/connecting-students-everywhere-to-a-cloud-education/
