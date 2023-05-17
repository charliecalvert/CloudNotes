---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/BitBucketBasics.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: BitBucketBasics.md
relativePath: /BitBucketBasics.md
title: BitBucketBasics
directoryName: Assignments
category : assignments-guide
---

#BitBucket Basics

In this assignment you will learn how to use a Git repository and to clone your repository on CodeAnywhere. You will also learn how to check in code from [CodeAnywhere](https://codeanywhere.com) to [BitBucket](https://bitbucket.org/).


##Create a Repository

First you will need to create an account on [BitBucket](https://bitbucket.org).

Once you have the account, create a new repository by clicking the Create button:

![BitBucket](https://drive.google.com/uc?export&id=0B25UTAlOfPRGaWtHWEY3YkU1QUE)

Name your repository Prog270_LastName where LastName is your last name:

![BitBucket](https://drive.google.com/uc?export&id=0B25UTAlOfPRGbE9JdzI3QXpxRDQ)

Fill in the other values as follows:

 - Check private repository
 - Repository Type: Git
 - Issue Tracking and Wiki: yes
 - Language: HTML & CSS


##CodeAnywhere and DevBoxes

Open up CodeAnywhere and sign in. (You may have to create an account first, if you have not done so already.) We now want to set up a **[DevBox](http://blog.codeanywhere.com/codeanywhere-devboxes/)**. In the free tier you are allowed to have only one [DevBox](https://codeanywhere.zendesk.com/entries/31026625-3-7-DevBoxes), but we can put multiple repositories in side it and we can put multiple folders in each repository.

To set up DevBox follow these steps:

 - Right click on DevBox
 - Choose Add DevBox

##Add CodeAnyWhere SSH Key to BitBucket

SSH keys are a means of identifying you when you make secure connections across the internet. Typically, you have one private key that only you see. You then give the public key to locations across the web that you want to access. To use the key the following conditions must be met:

 - The service you want to access must accept your public key
 - When accessing the service, your private key must match the public key you gave to that service
 - If these conditions are met, then communication can occur between your machine and the service that accepted your public key.

For this to work, the private key must remain private. Never give or show your private key to anyone. The public key can be shown, at least in theory, to anyone. But in general, we only give it to people we trust.

In this case we are using the CodeAnywhere private key. This key is maintained by CodeAnywhere and we never see it. We give the CodeAnywhere public key to BitBucket. Now CodeAnywhere can communicate with BitBucket and vice versa.

To make this work, you must first get the CodeAnywhere public key.

 - Go to your name, top right of CodeAnywhere
- Select the get your SSH key menu item
- Copy the Public key

![Get Public Key](https://drive.google.com/uc?export&id=0B25UTAlOfPRGZmdxcjRxUk5ob0k)

Here is how to select and copy the key:

![Copy Public Key](https://drive.google.com/uc?export&id=0B25UTAlOfPRGcTYxUl9iaFIwTk0)

**NOTE**: *Though there is little danger in sharing a public key, still the key shown here is fake, and does not contain valid values.*

Now we need to put the key in BitBucket

In BitBucket, go to your your picture, then choose **Manage account | SSH Key**

![Find SSH](https://drive.google.com/uc?export&id=0B25UTAlOfPRGY3BwbEpHWGRuLW8)

Now go to the **SSH Key** hyperlink in the manage page:

![SSH Key](https://drive.google.com/uc?export&id=0B25UTAlOfPRGcG41WjVodVBXclk)

Select Add Key, then paste in your SSH key, not the fake one shown below:


![paste](https://drive.google.com/uc?export&id=0B25UTAlOfPRGWmZRckRlUGRxU00)


##CodeAnywhere and BitBucket

First do this on CodeAnywhere in your DevBox in  the **workspace** folder:

```
mkdir Prog270_LastName
cd Prog270_LastName
git init
git remote add origin git@bitbucket.org:<ACCOUTNAME>/<REPONAME.git>
```

You can find your bitbucket URL on BitBucket. It is on the upper right corner of the overview page, as shown near the bottom of this document.

Then do this, Full name is your full name:

```
echo "#Full name" >> README.md
git add README.md
git commit -m 'Initial commit'
git push -u origin master
```
Please note that similar text is available on BitBucket, under the text that reads something lie "Starting for scratch." If you find that text, you will see exactly what to to type in the line begin "git remote add origin...".

Below you can see a screenshot that shows what you need to do to complete the core of this assignment. This is only an example, as you will need to make a few minor changes. The main difference between my example and your code will be name of the repository. Your's should have the name of your account and your repo, not a name like **ccalvert** or **DeleteMeSoon**. For instance, I entered:

	git remote add origin git@bitbucket.org:ccalvert/deletemesoon.git

You code will might look more like this:

	git remote add origin git@bitbucket.org:lastname/prog270_lastname.git

I can't say precisely how it will differ, but the exact line is printed on the BitBucket site, if you can find it!

![DeleteMeSoon](https://drive.google.com/uc?export&id=0B25UTAlOfPRGcUdFMXY5ekswTHM)

In this screen shot the line for adding the remote repository origin is cut off at the end. You can, however, see the whole URL further down.

## Name and Email

When you try to commit your code, you may see text that is a bit hard to understand, but please try to understand it:

```
You can suppress this message by setting them explicitly:

	git config --global user.name "Your Name"
	git config --global user.email you@example.com

If the identity used for this commit is wrong, you can fix it with:

	git commit --amend --author='Your Name <you@example.com>'
```

This means you should type in the first two lines, as suggested:

```
git config --global user.name "Charlie Calvert on CodeAnywhere"
git config --global user.email charlie@someplace.com
```

Git saves this information, and uses it when you commit posts, and at other times. No one will not end up spamming you or giving your email away. It's just saved to a text file and used when git talks to BitBucket. Please fill these values in as suggested in the prompts. There is a similar prompt that you might get when you try to push. I don't remember the details, but just choose the option that is called **simple.** 

If you don't fill in the these values, two things may happen:

- You might keep seeing the prompts to fill in the values over and over until it drives you crazy.
- You might not be able to check in your code to your repository until you fill in the values as suggested.

You don't see these prompts in my screen shot because I have already filled in this information.

When you are done, you should be able to go BitBucket, refresh the page, and view your repository. It contains one file, called README.md, and the contents of the file is your full name.

![done](https://drive.google.com/uc?export&id=0B25UTAlOfPRGT3IwZWZpYmFJRmM)

## Share your Repository

When you are done share it with **ccalvert** by following a few simple steps. Open up BitBucket and, if necessary, use the Repositories menu to switch to your repository.

As shown in the screenshot below, along the left are a series of icons. Select the one that looks like a graph.It is labeled Overview

![Share](https://drive.google.com/uc?export&id=0B25UTAlOfPRGLVpJMnFFTWxlcFE)

On the right you can see a button called Send Invitation. Select it. Type in my first initial and last name: ccalvert.

Choose Share.

##Turn it in

When you turn in your work, all I should need is the URL of your repository and screenshot of your repository in CodeAnywhere. Attach the screenshot, and then put the URL in the comment. The URL should look something like this, only with your data, not mine:

- git@bitbucket.org:ccalvert/deletemesoon.git

To learn more about Git go [here](http://www.elvenware.com/charlie/development/cloud/Git.html). The Elvenware Git page is not an assignment, it is just a reference. It focuses more on GitHub than on BitBucket, but the two services are very similar.
