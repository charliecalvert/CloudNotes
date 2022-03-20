---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/git/git-install.md
relativePath: elvenware/development/git/git-install.md
title: Git-install
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: git-install.md
fileNameHTML: git-install.html
---

<!-- toc -->
<!-- tocstop -->

# Installing Git

There are various ways to install Git. In this chapter I will describe installing Git on Linux and on Windows.

## Install Git on Ubuntu

Git may already be installed on your version of Ubuntu. To test if it is available, run the following command:

    git --version
    git version 2.7.4

If you get an error when issuing that command, here is how to install Git:

    sudo apt-get install git

That's all there is to it.

## Managing Git

There is no one best way to manage your Git repositories. I have, however, developed a convention that I have used for many years. I will describe it so that you will understand how my machine is setup. Having that understanding will help you following the discussion in the following chapters.

Create a directory named **Git** and navigate to it:

    mkdir ~/Git
    cd ~/Git

Now pull down our **JsObjects** repository that I will reference many times in this book.

    git clone https://github.com/charliecalvert/JsObjects.git

The repository is not custom made for this text, but it is the place where I store many files that I will reference in this text.

You will not have permission to write to this repository, hence your access will be in read only
mode.

Now you can navigate into the JsObjects repository and begin to explore it:

  cd JsObjects

The ReadMe file for the repository is here:

- [JsObjects ReadMe](https://github.com/charliecalvert/JsObjects/blob/master/README.md)


## Install Git on Windows

There are two applications you might want to install. The primary Git application is found here:

- [http://git-scm.com/](<http://git-scm.com/>)
- [http://git-scm.com/downloads](<http://git-scm.com/downloads>)

When you run the install shown above, be sure to choose the option that gets Git on your path. Also, you will probably want to set Git up to work with PLink (Putty), and you will want to choose an option that ensures that you have LF style line endings on files that you plan to use on a Linux box.

Because GitHub is so ubiquitous, you will probably want to install its GUI front end also:

- GitHub: [https://github.com](<https://github.com/>)

You can use Git-Scm with GitHub, but there is no denying that the GitHub GUI makes dealing with repositories on GitHub very easy.

## Clone on Desktop

On GitHub, you might notice a button that says **Clone on Desktop**. If set up correctly, this button will allow you to clone a repository using a GUI application. On Windows, this application is called **GitHub for Windows**. For a variety of reasons, I think it is ultimately best to manage your Git repositories from the command line, but there is no denying that this GUI interface can be useful, particularly if you only plan to use Git from Windows.

In theory, you should be able to just push the **Clone on Desktop** button and the process of installing **GitHub for Windows** should occur automatically. In practice, this does not always happen. Unfortunately, there are variety of reasons why this call might
fail, depending on the browser and system you are using. My suggestion is to simply install **GitHub for Windows** manually, and then the button should begin working as you expect.

To install **GitHub for Windows** go to the first link below:

- [GitHub Windows download](http://github-windows.s3.amazonaws.com/GitHubSetup.exe)
- [GitHub Help pages](https://help.github.com/)
- [Git Set-Up](https://help.github.com/articles/set-up-git)

A file called **GitHubSetup.exe** should soon be downloaded to your
downloads folder. You can run it from there. The install is a forehead
install, and should be navigable by everyone in your family from your
cat on up. I believe that it does not require admin privileges to run
this install.

While you are at it, and if you have not already done so, you should also install Git:
- [Install Git Itself](http://git-scm.com/downloads)
