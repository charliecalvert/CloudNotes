---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/windows/WindowsSetup.md
relativePath: elvenware/os/windows/WindowsSetup.md
title: WindowsSetup
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

# Windows Setup

I am working on a script that might prove useful. This is a just a preliminary versions of the script. 

## Script

I will publish a completed version when it is ready. It will be [maintained][sanity] on JsObjects so that you can always get the most recent copy. Save the following as **SanityCheck01.bat**. To run it, just type **SanityCheck01.bat**.

```
set RESULTS=Results.txt

where git.exe > %RESULTS%
where node.exe >> %RESULTS% 
where npm.cmd >> %RESULTS% 
where geany.exe >> %RESULTS% 
where notepad++.exe >> %RESULTS% 
where putty.exe >> %RESULTS%
where pageant.exe >> %RESULTS%

@ECHO OFF

echo -----------------------------------------
echo We are now going to examine %RESULTS%
echo Here is the contents of %RESULTS%
echo -----------------------------------------
type %RESULTS% 
echo -----------------------------------------
echo End %RESULTS%
echo There should be eight lines in %RESULTS%.
echo Here is how many we found:
findstr /R /N "^" %RESULTS% | find /C ":"
echo -----------------------------------------
echo ==================================
echo Testing for GIT_SSH
echo ==================================

IF NOT DEFINED GIT_SSH GOTO MISSING_HOME

GOTO END

:MISSING_HOME
ECHO You are missing something
ECHO GIT_SSH - %GIT_SSH%
EXIT /B 1

:END
ECHO Looks Good: You have these settings:
ECHO -----------------------------------------
ECHO GIT_SSH - %GIT_SSH%
ECHO -----------------------------------------
```

## Good Run

Here is the output I get when running the script on one of the school machines that is -- I believe -- set up correctly: 

```
-----------------------------------------
We are now going to examine Results.txt
Here is the contents of Results.txt
-----------------------------------------
C:\Program Files (x86)\Git\cmd\git.exe
C:\Program Files\nodejs\node.exe
C:\Program Files\nodejs\npm.cmd
C:\Users\charles.calvert\AppData\Roaming\npm\npm.cmd
C:\Program Files (x86)\Geany\bin\Geany.exe
C:\Program Files (x86)\Notepad++\notepad++.exe
C:\Users\charles.calvert\Bin\PUTTY.EXE
C:\Users\charles.calvert\Bin\PAGEANT.EXE
-----------------------------------------
End Results.txt
There should be eight lines in Results.txt.
Here is how many we found:
8
-----------------------------------------
==================================
Testing for GIT_SSH
==================================
Looks Good: You have these settings:
-----------------------------------------
GIT_SSH - C:\Users\charles.calvert\Bin\PLINK.EXE
-----------------------------------------
```

## Analysis

If you have 7 instead of 8 lines in Results.txt, that is probably okay. I have two copies of npm on my system, because I run this command **npm install -g npm**. It is not a necessity to run that command, I don't think. The reason I ran it was to be sure that I had the most recent version of NPM on my system.

When looking at the output, the most important items are these:

```
C:\Program Files (x86)\Git\cmd\git.exe
C:\Program Files\nodejs\node.exe
C:\Program Files\nodejs\npm.cmd
GIT_SSH - C:\Users\charles.calvert\Bin\PLINK.EXE
```

Things just won't work without that much set up.

The next most important item is Putty:

```
C:\Users\charles.calvert\Bin\PUTTY.EXE
C:\Users\charles.calvert\Bin\PAGEANT.EXE
```

Next in importance are you editors:

```
C:\Program Files (x86)\Geany\bin\Geany.exe
C:\Program Files (x86)\Notepad++\notepad++.exe
```

And finally, the straggler:

```
C:\Users\charles.calvert\AppData\Roaming\npm\npm.cmd
```

## PATH

Here are the items I added to the path when setting up the machine:

```
C:\Program Files (x86)\Git\cmd;
C:\Program Files (x86)\Geany\bin;
C:\Program Files (x86)\Notepad++;
C:\Users\charles.calvert\AppData\Roaming\npm
C:\Users\charles.calvert\Bin
```

## GIT_SSH

Getting this set up right depends on two factors:

- Having **plink** on your path
- Having the environment variable GIT_SSH point at the location of **plink.exe**

All right, I exagerate a bit. It is not absolutely necessary to have **plink** on your path to make this work. But it will be easer to set the environment variable up if it is on your path, and also having it on your path will prove useful at various points in the course.

The first question to ask, then, is if **plink.exe** is on your path. To answer that question issue this command: **where plink.exe**.

Here are the results on my home system:

```
>where plink.exe
C:\Program Files (x86)\PuTTY\plink.exe
```

Here are the results on my system at school:

```
>where plink.exe
C:\Users\charles.calvert\Bin\PLINK.EXE
```

If you have admin privileges on your machine then you can do a regular install of Putty, in which case you will get results like those in the first example. Otherwise, you downloaded the zip file and hopefully unzipped its contents into your **%USERPROFILE%\bin** directory, and therefore got the second result.

Here are two simple ways to set the GIT_SSH variable:

```
setx GIT_SSH "C:\Program Files (x86)\PuTTY\plink.exe"
setx GIT_SSH C:\Users\charles.calvert\Bin\PLINK.EXE
```

We have to put the path in the first option in quotes because it contains spaces.  

**REMINDER**: *When doing anything related to code, don't ever create directories or file names that contain spaces.*

To learn more, go here:

- http://www.elvenware.com/charlie/os/windows/WindowsFaq.html#environment  




## Bad Results

Here is how things look on a system that is not set up correctly, or at least does not have GIT_SSH defined, and does not have Git, Putty, Geany and NotePad++ on the path.

```
-----------------------------------------
We are now going to examine Results.txt
Here is the contents of Results.txt
-----------------------------------------
C:\Program Files\nodejs\node.exe
C:\Program Files\nodejs\npm.cmd
-----------------------------------------
End Results.txt
There should be eight lines in Results.txt.
Here is how many we found:
2
-----------------------------------------
==================================
Testing for GIT_SSH
==================================
You are missing something
GIT_SSH -
```

## Home Machine {#home}

Here is the output I get when I run the script on my home machine, where Putty is installed in **Program Files (x86)**:

```
-----------------------------------------
We are now going to examine Results.txt
Here is the contents of Results.txt
-----------------------------------------
C:\Program Files (x86)\Git\cmd\git.exe
C:\Program Files\nodejs\node.exe
C:\Program Files\nodejs\npm.cmd
C:\Users\charlie\AppData\Roaming\npm\npm.cmd
C:\Program Files (x86)\Geany\bin\Geany.exe
C:\Program Files (x86)\Notepad++\notepad++.exe
C:\Program Files (x86)\PuTTY\putty.exe
C:\Program Files (x86)\PuTTY\pageant.exe
-----------------------------------------
End Results.txt
There should be eight lines in Results.txt.
Here is how many we found:
8
-----------------------------------------
==================================
Testing for GIT_SSH
==================================
Looks Good: You have these settings:
-----------------------------------------
GIT_SSH - C:\Program Files (x86)\PuTTY\plink.exe
-----------------------------------------
```
## NPM Packages

You can list the npm packages you have installed globally with **npm list -g --depth=0**. It should, at this stage, look something like this:

```
npm list -g --depth=0

├── bower@1.4.1
├── express-generator@4.12.1
├── jshint@2.6.3
|── nodemon@1.3.7
```
 

If any of the above are missing, it is easy to install them. To do so, just issue one or more of these commands:

```
npm install -g bower
npm install -g express-generator
npm install -g jshint
npm install -g nodemon
```

[sanity]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupWindows/SanityCheck01.bat

## Git

Try typing **git config --list** from inside your repository. There will be quite a bit of output, but here are key lines:

```
>git config --list
user.email=charlie@elvenware.com
user.name=Charlie CedarIsle Calvert
push.default=simple
remote.origin.url=git@github.com:charliecalvert/JsObjects.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.master.remote=origin
branch.master.merge=refs/heads/master
```

The details will differ on your system, of course, but it is best if all of these fields are present and have valid values.