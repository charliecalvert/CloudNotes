---
layout: page
date: 2023-05-11 08:25:53 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/PhoneGap-Setup.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android
fileName: PhoneGap-Setup.md
relativePath: /android/PhoneGap-Setup.md
title: PhoneGap-Setup
directoryName: android
category : css-guide
---

Phone Gap Setup {#setupPhoneGap}
---------------

More recent information is here:

 - <http://bit.ly/elven-android-studio>
 - <http://bit.ly/cordova-plugin>

To create PhoneGap applications automatically, you need to know how to
set up environment variables, as explained
[here](http://www.elvenware.com/charlie/os/windows/faq.html#environment).
Before we get into the details, let me give you an overview in the form
of a cheat sheet that will help you understand where we are headed.

If you have not done so already, you will first need to download and
install the following:

- [Apache Ant](http://ant.apache.org/bindownload.cgi)
- [Cordova (install with npm: npm install -g cordova)](http://cordova.apache.org/#download)
- [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
- [Android Studio (or WebStorm or Eclipse)](http://developer.android.com/sdk/installing/bundle.html)
- [The Android SDK](http://developer.android.com/sdk/index.html)

Many developers get the Android SDK as part of Android Studio. The bundle is just a zip file. In the **other platforms** section of the downloads page you can find a zip file for the Android SDK. Support for Mac and Linux are also under **other platforms**.

Details on what to download are discussed below and also in the [page on setting up Eclipse](/android-guide/EclipseSetup.html).

But first let's talk about setting up your environment.

**NOTE**: *Eclipse used to be the preferred IDE for Android development. However, that has changed, and now Google prefers Android Studio. Whether you do Cordova development in Android Studio, Eclipse, WebStorm or some other tool is mostly a matter of taste. I find it easy to build the application from the command line, so I think the choice of IDE is simply a matter of taste and not of necessity. Just to be clear, the Android SDK is a necessity, you must install it. But Android Studio is optional. This means you can install the stand alone Android SDK rather than getting it as part of the Android Studio bundle.*

The PhoneGap/Cordova Setup Cheat Sheet
--------------------------------------

With the advent of **npm install Cordova** there is no longer a need for the information found in this section of the text.

To use the PhoneGap/Cordova **create** program to quickly and easily
create a Cordova project you need to make sure you have the path on your
system set up correctly so that several programs will run. In
particular, you want the following programs to run from the command
line:

-   javac
-   ant
-   adb
-   android
-   create

In other words, you should be able to type any of those words, exactly
as shown, and they should not produce an error that reads "XXX is not
recognized as an internal or external command." Some of the programs may
not do anything useful, but as long as they run, regardless of the ouput
they produce, then you are good. For instance, here is the output you
want to see from the **ant** program:

``` {.code}
C:\Users\Charlie>ant
Buildfile: build.xml does not exist!
Build failed
```

Right now, we don't need to supply a **build.xml** file, we just need to
see that **ant** is on the path. The output shown above confirms that
**ant** is indeed on the path. If it were not, we would get an error
about **ant** being an unrecognized command.

To ensure that all these programs run, you should set up the following
environment variables, as shown on the left of the table presented
below. On the right you see sample illustrations of what the paths could
be:

-   ANDROID\_SDK\_HOME -- C:\\Users\\Charlie\\EclipseAndroid\\sdk
-   ANT\_HOME -- C:\\Dev\\ApacheAnt-184
-   JAVA\_HOME -- C:\\Dev\\jdk
-   PHONEGAP\_HOME -- C:\\Dev\\PhoneGap-2.3.0

The paths on the right are merely suggestions;  you may wish to put
these folders somewhere else.

Next, you need to set up the path on your system. Look at this group of
paths, and see if they help:

  --------------------------------------- ---------
  %ANDROID\_SDK\_HOME%\\platform-tools;   adb
  %ANDROID\_SDK\_HOME%\\tools;            android
  %ANT\_HOME%\\bin;                       ant
  %JAVA\_HOME%\\bin;                      javac
  %PHONEGAP\_HOME%\\lib\\android\\bin     create
  --------------------------------------- ---------

The following **SanityCheck batch** file can help you confirm that you
have at least set each of the environment variables on your system:

```
@ECHO OFF
IF NOT DEFINED JAVA_HOME GOTO MISSING_HOME
IF NOT DEFINED ANT_HOME GOTO MISSING_HOME
IF NOT DEFINED PHONEGAP_HOME GOTO MISSING_HOME
IF NOT DEFINED ANDROID_SDK_HOME GOTO MISSING_HOME

ECHO Looks good.

GOTO END

:MISSING_HOME
ECHO Missing one of the following:
ECHO JAVA_HOME - %JAVA_HOME%
ECHO ANT_HOME - %ANT_HOME%
ECHO PHONEGAP_HOME - %PHONEGAP_HOME%
ECHO ANDROID_SDK_HOME - %ANDROID_SDK_HOME%
ECHO -------------------
ECHO Try one of the following locations:
ECHO Apache ant: http://ant.apache.org
ECHO Android SDK: http://developer.android.com
ECHO Cordova: http://cordova.apache.org/
ECHO JDK: http://java.oracle.com
EXIT /B 1

:END
ECHO Your system currently has these settings:
ECHO -----------------------------------------
ECHO JAVA_HOME - %JAVA_HOME%
ECHO ANT_HOME - %ANT_HOME%
ECHO PHONEGAP_HOME - %PHONEGAP_HOME%
ECHO ANDROID_SDK_HOME - %ANDROID_SDK_HOME%
ECHO -----------------------------------------
```

- [Sanity Check on GitHub](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/CordovaTemplates/SanityCheck.bat)
- [Similar for Linux/Mac](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/CordovaTemplates/test.sh)

Your setup is likely different from mine, but it might still be helpful
to show the current setup on one of my systems as of January, 2014:

	JAVA_HOME - C:\Program Files\Java\jdk1.7.0_51
	ANT_HOME - C:\Development\apache-ant-1.9.3
	PHONEGAP_HOME - C:\Development\cordova
	ANDROID_SDK_HOME - C:\Users\Charlie\EclipseAdt\sdk

So long as you have the correct environment variables setup, then you
can add those paths to your system exactly as shown. For instance, I
appended the following to my path.

``` {.code}
%ANDROID_SDK_HOME%\platform-tools;%ANDROID_SDK_HOME%\tools;%ANT_HOME%\bin;%JAVA_HOME%\bin;%PHONEGAP_HOME%\bin
```

At the command prompt, this portion of my path produces the following
output when I type the word**path**:

``` {.code}
C:\Users\Charlie\EclipseAndroid\sdk\platform-tools;C:\Users\Charlie\EclipseAndroid\sdk\tools;C:\Development\ApacheAnt-184\bin;C:\Development\jdk\bin;C:\Development\PhoneGap-2.3.0\lib\android\bin
```

Details on Setting up the Environment for PhoneGap {#details}
--------------------------------------------------

With the advent of **npm install Cordova** there is no longer a need for the information found in this section of the text.

Now that you have an overview of where you are headed, I will add a bit
more detail for those who are not clear on exactly how to proceed. The
first thing to understand is that it is possible to build a fully
functional "hello world" Cordova project using the tools that come with
the PhoneGap SDK. First make sure you have downloaded the SDK, unzipped
it, and placed it in a well known location, such as
**C:\\Dev\\Phonegap-2.3.0**
or**C:\\Users\\YourUserName\\Dev\\Phonegap-2.3.0**. Here is the download
site:

    http://phonegap.com/download/

Also download Ant, unzip it, and place it in the same Dev directory as
PhoneGap, ie C:\\Dev\\ApacheAnt-184:

    http://ant.apache.org/bindownload.cgi

Here is an example script showing what you can do with the setx command on
Windows:

	SetX JAVA_HOME "C:\Program Files\Java\jdk1.7.0_45"
	SetX ANT_HOME C:\Src\Ant\apache-ant-1.9.3
	SetX PHONEGAP_HOME C:\Src\cordova-android
	SetX ANDROID_SDK_HOME C:\Src\Eclipse\sdk    

### JAVA\_HOME

You need to set up the JAVA\_HOME [environment
variable](http://www.elvenware.com/charlie/os/windows/faq.html#environment).

For instance, set JAVA\_HOME to this value:

    C:\Program Files\Java\jdk1.6.0_27

### ANT\_HOME

Create an environment variable called ANT\_HOME and point it at the home
directory for ANT, the zip file you downloaded and probably put in
c:\\users\\yourname\\dev\\ant....

``` {.code}
C:\Users\charles.calvert\Dev\apache-ant-1.8.4
```

Set up the following path variables, altering the paths so they make
sense on your system. For instance, change the user name:

``` {.code}
%ANT_HOME%\bin;
C:\Users\charles.calvert\AndroidEclipse\sdk\platform-tools;
C:\Users\charles.calvert\AndroidEclipse\sdk\tools
%JAVA_HOME%\bin
```

The point is that you need to set up your path so that the Android SDK
**platform-tools** and **tools** directories are on your
[path](http://www.elvenware.com/charlie/os/windows/faq.html#environment):

``` {.code}
;C:\Users\Charlie\EclipseAndroid\sdk\platform-tools;C:\Users\Charlie\EclipseAndroid\sdk\tools
```

Make sure Java works from the command line. If not, set up
[Java-home](http://www.elvenware.com/charlie/os/windows/faq.html#environment).
Make sure javac will run from the command line. If not, examine the part
of your path that we set with **%JAVA\_HOME%\\bin**.
