---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Tips/VirtualResources.md
relativePath: Tips/VirtualResources.md
title: VirtualResources
queryPath: Tips/
subject: Tips
fileNameMarkdown: VirtualResources.md
fileNameHTML: VirtualResources.html
---


<!-- toc -->
<!-- tocstop -->

## Maintaining Virtual Resources

We use a lot of virtual resources in my classes. As with all software, things can go wrong with one of these resources. In such cases, frequently the best thing to do is reinstall. If you are skillful, it takes less than an hour to get everything re-installed. I have seen students spend 3 hours, eight hours, even days trying to troubleshoot a problem that could be fixed by a relatively painless reinstall. However long it might take to reinstall all the resources used in this class, it is unlikely to take a days or weeks.

The skill you need to develop is a sixth sense that tells you: "I'm never going to troubleshoot this problem. The system is hosed. Time to reinstall."
Every once in awhile in class I go into a digression that goes like this: "Everything we are doing is virtual. If something goes wrong, just delete your virtual resource, and start again." I say it over and over again because it is one of the core lessons of this class. I know that only a percentage of the class will take what I say to heart, but those that do will be much more effective computer users.

With VirtualBox, I give you an instance of Ubuntu with many resources pre-configured on it. You could, if you got good at these tools, build instances of your own that had exactly the set up you wanted on it. Then if something went wrong on your current instance, you could delete it and restart within a couple of minutes. The same is actually true on EC2: we can install custom instances, but I have never done that. Also, we have done just a little work with Bash scripts and scripting languages like Python. When using those tools, you can automate the process of configuring a Linux instance, saving hours of work.

We are seeing the same thing in Firefox and Chrome: learn how to save data and bookmarks in the cloud, and you can come to a brand new instance of Chrome or Firefox and have it configured exactly the way you want within a few short minutes or less. It can save, literally, hours of work. One of the biggest benefits is that the same set up is available to you on your phone.
In this class is that you be introduced to tools such as EC2, VirtualBox, Git, FireFox, Chrome, Google Drive, Cloud9, etc. These tools allow you to store complex data in the cloud. Become expert in using these tools, and you can sign into a fresh install of Windows, Linux or the Mac and have all your tools running and configured in minutes. It would save you not just hours, but days of work.

Sometimes students encounter problem with an instance of Ubuntu on EC2. I have been using AWS for years, and have never seen a serious error with an ubuntu instance that was due to a failure in the system. Yet it is possible damage the file system unintentionally. When learning a new tool, such things can happen.
NOTE: All software is buggy, but one of the most solid pieces of software I know is the core file system in a Linux server. Unix in general, and Linux in particular has been hammered on over and over for some [40 plus years][unh]. It is solid.

The real lesson here, however, is that you can re-configure an instance in a matter of minutes -- if you know how. You will never learn how unless you start actually re-configuring machines. Each time you go through the process, you will learn a little bit more, and get a little better at it.

[unh]: http://bit.ly/unix-history "unix history"
