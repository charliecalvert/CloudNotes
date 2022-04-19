---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Tips/UpgradeLubuntu.md
relativePath: Tips/UpgradeLubuntu.md
title: UpgradeLubuntu
queryPath: Tips/
subject: Tips
fileNameMarkdown: UpgradeLubuntu.md
fileNameHTML: UpgradeLubuntu.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

I believe Artful is Lubuntu 17.10\. That is [out of date](https://lists.ubuntu.com/archives/ubuntu-announce/2018-July/000232.html) now, and may account for some of the problems you have mentioned. Ubuntu based distributions are released every six months in April (XX.04) and October (XX.10). The 04 releases on even years (18.04) are long term editions, and will be supported for 5 to 10 years. The other releases are short term, and are supported for only 9 months, I believe. So the issue is that your version is out of date and is probably no longer receiving updates. You should update it. Depending on your machine, it would take between about 15 minutes and 2 hours to complete the update. You can still work in a browser on Windows while the box is being updated. You can even work in Lubuntu for much of the update, but of course the machine will probably be a bit slow.

There are several ways to update:

[https://lubuntu.me/bionic-released/](https://lubuntu.me/bionic-released/)

[https://linuxconfig.org/how-to-upgrade-to-ubuntu-18-04-lts-bionic-beaver](https://linuxconfig.org/how-to-upgrade-to-ubuntu-18-04-lts-bionic-beaver)

[https://help.ubuntu.com/community/BionicUpgrades](https://help.ubuntu.com/community/BionicUpgrades)

Please read second link above, but I believe the key parts are here:

<span style="color: #339966;">if you want to take this route, you're going to need to install one package first. So, do that.</span>

<pre><span style="color: #339966;">$ sudo apt install update-manager-core</span></pre>

<span style="color: #339966;">When that finishes, run the Ubuntu upgrade utility.</span>

<pre><span style="color: #339966;">$ sudo do-release-upgrade</span></pre>

You can also update through the GUI front end called the Software Updater. Select the Settings button if necessary.
