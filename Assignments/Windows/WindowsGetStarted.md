## Overview

Run Charlie's course on Windows.

## Video

- [Video with overview of this assignment][vcc]

[vcc]: https://youtu.be/7V97yIf8mnY

## Install WSL

The /home/charlie filesystem is not accessible to the Windows file system. It is only the /mnt/c/ and /mnt/d/ etc drives that Windows sees. It sees them as C:\ and D:\.

## Clone A Repository:

We want to clone our repository into a location on our C or D drive. To do this, we will likely want to clone with HTTPS from PowerShell or the Windows CLI:

```
git clone https://github.com/charliecalvert/prog272-calvert-2018.git
```

Clone using SSH. We probably don't want to do this now since we might not have SSH set up on the Windows. We should, however, have it set up in WSL, using exactly the techniques outlined in our NewGitRepo Assignment from Week01:

```bash
git clone git@github.com:charliecalvert/prog272-calvert-2018.git
```

## Set a GIT URL

Set the URL for a repository to SSH, where details will differ for the URL for your repo:

```bash
git remote set-url origin git@github.com:charliecalvert/prog272-calvert-2018.git
```

Set the URL for a repository to HTTPS:

```bash
git remote set-url origin https://github.com/charliecalvert/prog272-calvert-2018.git
```

Create a symbolic link to your repository:

```
cd ~/Git
ln -s /mnt/c/Git/prog272-calvert-2018/ pc2
```

## Details

When installing Android Studio, just go with the defaults, except you can tell Android Studio to install the emulator.

- [NOSPC fsnotify error][nospc]
- [Install GitHub on Windows][igw]

Wnen expo starts, enable "Display over drawing".






[igw]: https://git-scm.com/
[nospce]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#enospc
