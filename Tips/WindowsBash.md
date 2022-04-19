---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Tips/WindowsBash.md
relativePath: Tips/WindowsBash.md
title: WindowsBash
queryPath: Tips/
subject: Tips
fileNameMarkdown: WindowsBash.md
fileNameHTML: WindowsBash.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

This article is about Bash for Windows in the Windows Subsystem for Linux (WSL). I have spent time with it for the first time today and found I could run my Bash scripts and run my Node applications. I was very impressed with how well this works.

- [Install WSL](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide)
- [Learn about WSL](https://msdn.microsoft.com/en-us/commandline/wsl/about)

## The Linux File System

When you install Ubuntu server on Windows you get a bash shell to access it. There is no GUI. Inside the shell, it looks like there is a Linux root with the typical Linux directories such as **/bin**, **/var**, **/dev** **/etc** and so on. One of the standard directories is called **/mnt**. It is in the **mnt** directory that my C and D drives are mounted.

When I talk about the Linux File System in this article, I'm talking about the standard Linux directories mentioned above, and also about **/home/charlie/**, or whatever your home directory is called on your system: **/home/<USERNAME>**.

Anything in these directories belongs to Linux and should only be touched and edited with Linux tools such as **nano** and **vim**. You can install additional Linux command line tools with **sudo apt-get install XXX**, where XXX is what you want to install. For instance, I ran **sudo apt-get install build-essential**.

The code and files in **/mnt/c/** and **/mnt/d/** belongs to Windows. I can create symbolic links to that content so it is easy to access from my Linux home directory. However, I have to be careful about what I do with it, as explained below.

## File Related Issues

There are various warnings about not trying to edit Linux files with Windows tools. The solution I'm using right now is to keep all my files where they were before I installed WSL. If I left them where they were on my Windows hard drive, in whatever directory I kept them in, then everything seemed to work.

I've been able to edit my code using Windows tools and compile it using WSL. The key steps:

- Keep the code you want to edit with Windows tools outside your Linux File system
- Do not actively use a file in Linux while you are editing it with a Windows tool.

This has some consequences, for instance, don't use **nodemon** if you are editing with a Windows tool, since it keeps your files open in Linux, or at least keeps some kind of link to them. Instead, use something like **node bin/www** to launch your projects.

## Tasks

Let me try to be more specific. Here are tasks I do in WSL (Linux)

- Run my node programs
- Run my node Scripts
- Edit files with **nano** or **vim**
  - You can edit files in Linux, just don't be careful when using Windows tools that no Linux tool is touching it
- Push and pull with Git
  - I keep my repository outside of WSL, and create symbolic links to them, so they appear to me be in my Linux **$HOME/Git** directory.

Here are tasks I do in Windows:

- Edit files with Webstorm or Geany
  - I'm careful not actively touch them with a Linux tool while doing this!
  - I'm especially careful that I'm not touching them when I save a file from Windows
- Run my browser and test the Node programs that I launched from inside WSL (Linux)

The key step for me was to create symbolic links that recreated my Linux setup. As long as I had /home/USERNAME/Git directory that contained symbolic links to JsObjects and my other repositories, then everything just seemed to work. This includes scripts like **UbuntuAndCloudNineSetup** and **CreateExpressProject**.

Remember to put all your code in some regular Windows directory. For instance, on my Windows machine, I keep my code in my **D:/Git** directory. If it is already in some place like that, then leave it there. Create symbolic links to the directories where you store your code:

```
ln -s /mnt/d/Git/JsObjects/ ~/Git/JsObjects
```

After issuing that command all should be good. As far as Linux is concerned, **JsObjects** is in **~/Git/JsObjects**. Windows, meanwhile, thinks it is in **D:/Git/JsObjects**.

## Summary

I did find that certain commands, such as **git status**, took much longer than they do on my Linux machine. I'm not really sure why this is, but it could be that there is some indirection in WSL. I don't know.

I would still prefer to work in Linux, because that is where I am most comfortable. But if you really prefer Windows, or if you simply don't have a powerful enough machine to load Pristin Lubuntu at home, then this might work for you.
