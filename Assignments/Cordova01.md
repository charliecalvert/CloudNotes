---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Cordova01.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: Cordova01.md
relativePath: /Cordova01.md
title: Cordova01
directoryName: Assignments
category : assignments-guide
---

Week03 Exercises
================

Cordova First Exercise
----------------------

- Set up your machine to use Cordova **create** command to create
a Cordova project.
- Create a project called Cordova01_LastName. (Use an underbar, not a dash, when creating Cordova projects.)
- Create the project and deploy it to the emulator, AndroidX86 or your
device.
- Take a screenshot of your program running
- Put both your project and your screenshot in Git

###Alternative way to create Cordova project:

	npm install -g cordova

Now go to your temp directory:

	cordova create Cordova01
	cordova platform add android

Then just open Eclipse and Import **C:\\Temp\\Cordova01**, using the same
steps we have described elsewhere.

On the MAC, you might want to try this:

	npm install -g cordova
	cordova create Cordova01
	cordova platform add ios

I can't test on the MAC, however.

Second Assignment
-----------------

- Create a second project called Cordova02-LastName
- Allow the user to enter a value in Fahrenheit and convert to
Celsius
- Allow the user to enter a value in miles and convert to
kilometers
- Allow the user to enter a number and calculate the Square Root
- Make the background of the form have some color
- Set a custom font for headers and paragraph elements.
- So you need: HTML, CSS, and JavaScript to make it work.

The design is pretty much up to you. For instance:

- One input area and three buttons.
- Three input areas and one button
- Three input areas and three buttons
- Something else

It's your choice. Here is some information on how to get buttons and
input controls talking to one another with jQuery:

- [jQuery, Buttons, InputControls](http://elvenware.com/charlie/books/CloudNotes/Prog272/Resources.html#working-with-buttons-input-controls-and-jquery)

All three conversion methods should be in a single JavaScipt object.
Whether the object is a function or conventional JavaScript object
is up to you.

```
var myObject = {
	func: function() {},
	func2: function() {}
}

var MyObject = function() {
	function func() {};
	function func2() {};
}
```

Remember:

- HTML in HTML files, JavaScript in JavaScript files, CSS in CSS files
- Make sure your code is properly formated
- Provide unit tests for conversion methods.
- Pay attention to naming conventions! Don't call things myObject or
func. Create meaningful names.


## Useful

Take a snapshot of your virtual machine. Or do whatever to back it up.

Make sure Java is installed:

```
which java
```

If there is none, then:

```
sudo apt-get install openjdk-8-jre
sudo apt-get install openjdk-8-jdk-headless
```

Install [Android Studio](https://developer.android.com/studio/):

Then this:

```bash
mkdir ~/Android
mkdir ~/Android/Sdk
mv tools/ ~/BigDrive/Android/Sdk/.
cd Android/Sdk/tools/bin/
./sdkmanager
java -version
./sdkmanager --list
./sdkmanager --list | grep build
./sdkmanager "build-tools;27.0.3"
```

At some point, do this:

	touch ~/.android/repositories.cfg

Gradle is here: <https://gradle.org/install/>

Then do this, using the version number that you downloaded:

```bash
sudo mkdir /opt/gradle
# Uncomment the version of Gradle you downloaded:
# sudo unzip -d /opt/gradle gradle-4.7-bin.zip
sudo unzip -d /opt/gradle gradle-4.7-all.zip
ls /opt/gradle/gradle-4.7
```

From .bashrc:

```bash
# Java Path Support
#export JAVA_HOME=/usr/lib/jvm/java-8-oracle
#export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export JAVA_HOME=/usr/lib/jvm/default-java

# Android Path Support
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_PLATFORM_TOOLS="$HOME/Android/Sdk/platform-tools"
set-system-path "$ANDROID_HOME/tools:$ANDROID_PLATFORM_TOOLS"
set-system-path "/opt/gradle/gradle-4.7/bin"
```

And AVD (which is no good):

./avdmanager list | grep pixel


## Install on device

```
sudo apt-get install android-tools-adb
```

See this:

- <https://unix.stackexchange.com/questions/129305/how-can-i-enable-access-to-usb-devices-within-virtualbox-guests>
- <https://stackoverflow.com/a/12664045/253576>


Put this in ~/tmp/android-rules:

```
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0e79", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0502", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0b05", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="413c", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0489", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="091e", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="18d1", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="12d1", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="24e3", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2116", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0482", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="17ef", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1004", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="22b8", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0409", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2080", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0955", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2257", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="10a9", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1d4d", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0471", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04da", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="05c6", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1f53", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04e8", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04dd", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fce", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0930", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="19d2", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1bbb", MODE="0666"
```

This script

```bash
sudo cp ~/tmp/android.rules /etc/udev/rules.d/51-android.rules
sudo chmod 644   /etc/udev/rules.d/51-android.rules
sudo chown root. /etc/udev/rules.d/51-android.rules
sudo service udev restart
sudo killall adb
```

Reboot the VM.
