## Overview

Each of you should have received an invitation to join AWS Educate.

Either of these links should take you to the AWS Educate site:

- [http://awseducate.com/](http://awseducate.com/)
- [https://aws.amazon.com/education/awseducate/](https://aws.amazon.com/education/awseducate/)

Click on:

- [Join AWS Educate][jawse] if you have not yet registered for the site.
  - Select the **Starter Account** option unless you have some other opinion on the matter.
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

- ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
- cd ~/.ssh
- cat .id_rsa.pub
- Go to GitHub. Paste it in under **Settings | SSH**

Modify .bashrc:

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

[jawse]: https://www.awseducate.com/registration
[awsl]: https://www.awseducate.com/signin/SiteLogin
[apc]: https://support.google.com/chrome/answer/95472?co=GENIE.Platform%3DDesktop&hl=en
[apf]: https://support.mozilla.org/en-US/kb/pop-blocker-settings-exceptions-troubleshooting
[awsc]: https://s3.amazonaws.com/bucket01.elvenware.com/images/aws-educate-status.png
[fpu]: https://s3.amazonaws.com/bucket01.elvenware.com/images/firefox-popups.png
