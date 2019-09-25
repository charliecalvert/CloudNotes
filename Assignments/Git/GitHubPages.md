## Overview

GitHub is a website that wraps a free open source version control system called Git. You can install Git on Windows, Linux or the Mac. You can store code in a Git repository and keep track of different versions of your code. Thus you can roll back your code to previous versions and perform similar tasks.

You can **push** your Git repository to GitHub. This stores your code in the cloud and makes it at least theoretically accessible from any machine attached to the Internet.

## Reference

The Git Book is [here](https://git-scm.com/book/en/v2). This is an excellent resource. I will not hold your hand, but read as much of it as you can handle.

The other major reference is our Code Academy assignments on it.

These just barely scratch the surface. There are many excellent references on the web. If you discover one, feel free to share your knowledge in the discussion. (To get a high score in a discussion, you need to post more than a link, but posting a link can't hurt and helps some.)

Another useful page is [here][gitu].

## Goals

Create a Git repository on GitHub. **Pull** your repository on to your computer. Now you have two copies of your repository: one on GitHub and on your local machine. Learn to add documents to your GitHub repository. Learn to push your updates to Git.

As we perform the steps outlined above, we will simultaneously be using [GitHub Pages][gp] to create a website on GitHub based on your Git repository.

[gp]: https://pages.github.com/

## Steps

Begin by signing in to your GitHub account.

You can create a new repository by clicking on the **New repository** button or by fiddling with the small **+** icon at the top right of most GitHub web-pages.

In the new repository dialog you want to create a repository based on your GitHub username on GitHub.

- SiteName: username.github.io
- Description: GitHub Pages Website for Prog109
- If you can, choose private otherwise start with a public site. We can make it private later.
- Initialize the site with a **README.md** file
- Set your GitIgnore to **Node**
- Choose the MIT License

![GitHub Pages](https://s3.amazonaws.com/bucket01.elvenware.com/images/github-pages-2018.png)

## Add Charlie as Collaborator

After you create the site, you will be taken to a web page that lists the files in your repository.

![GitHub repository overview][gro]

Near the top of the page, perhaps under or near the word **Watch** or **Unwatch** you will see a gear icon with the word **Settings** next to it.

- Sellect the **Settings** (gear) icon.
- Select **Collaborators**.
- Set the Collaborator field to **charliecalvert**.

Before you select the Collaborator:

![Collaborator before][cbefore]

After you select the Collaborator:

![Collaborator after][cafter]

## Start Command Prompt

I want to give you knowledge that you can keep. Something that will work in all situations, and not just at Bellevue College or not just on Windows. To get started, open the command prompt by going to the Windows **start** menu and type **cmd**. Open up the command window by pressing enter.

Create a directory called Git in your Home directory and then navigate into that directory.

```bash
mkdir Git
cd Git
```

## First Time Git Setup

Learn about it [here][gitset]. We can talk through some of this in class, including the editor.

Set up the editor:

Depending on the location of NotePad++, run one of these commands from the command prompt:

```bash
git config --global core.editor "'c:/Program Files/Notepad++/notepad++.exe'"
git config --global core.editor "'c:/Program Files (x86)/Notepad++/notepad++.exe'"
```

To find the location of NotePad++ you should be able to type **where notepad++.exe** at the command prompt.

Then issue these commands:

```bash
git config --global user.name "Your Name Here"
git config --global user.email "Your email here"
```

I believe that if you sign in with the Git GUI then you are also good at the command line to push and pull without a username and password. If not, check the credentials page [here][gitc]. If not, questions to the discussion area.

In your Git directory clone your repository. The exact command will depend on your git URL, but the basics are like this:

```bash
git clone https://github.com/coderzendo/coderzendo.github.io.git
```

## Modify the README and .gitignore files

Make some changes, any changes you want, to the **README.md** file and push them.

Learn how to add, commit and push [here][gitacp]

Add the following to your **.gitignore** and push your changes:

```
# IDES
.idea
.c9
.vscode
```

More on **.gitignore** is [here][gig].

## Create Default Page

This belongs in the root of your repository and is called **index.html**. It should contain valid HTML as we have defined it in this class. For now, the content might be something like "Welcome to my site.".

## Turn it in

Submit the URL of your GitHub site. It should look something like this:

- [https://github.com/coderzendo/coderzendo.github.io.git][czgi]


And also the URL of your GitHub Pages site:

- [https://coderzendo.github.io/](https://coderzendo.github.io/)

[gro]: https://s3.amazonaws.com/bucket01.elvenware.com/images/github-settings.png
[cbefore]: https://s3.amazonaws.com/bucket01.elvenware.com/images/github-collab.png
[cafter]: https://s3.amazonaws.com/bucket01.elvenware.com/images/github-pages-collaborators.png
[czgi]: https://github.com/coderzendo/coderzendo.github.io.git
[gig]: https://www.elvenware.com/git-guide/git-ignore.html
[gitacp]: https://www.elvenware.com/git-guide/git-basics.html#git-files
[gitset]: https://git-scm.com/book/en/v1/Getting-Started-First-Time-Git-Setup
[gitc]: https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage
[gitu]: https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html
