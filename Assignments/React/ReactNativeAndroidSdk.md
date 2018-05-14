## Overview

Android X86, React Native and the Android SDK.

## Videos

Here are some videos related to this assignment.

- [Part One](https://youtu.be/qSLl70uTxPk)
- [Part Two](https://youtu.be/FLUB81lPqMk)
- [Part Three](https://youtu.be/B0pAUDvYaEc)

## Native with Android SDK

Here is how to work directly with the Native SDK.

Here is expo running in Android 7.1 hosted in VirtualBox:

![Expo Android X86 in Virtual Box][a86x]

Here is our app running in Android 7.1 hosted on VirtualBox:

![Android X86 hosting Git Explorer][a86g]

Here are the commands to connect to our instance of Android X86 once you have installed and configured with (Android Studio) the SDK.

```
adb connect 192.168.2.34
```

Of coure, you have to use your Andriod X86 IP address. To confirm you are connected:

```
adb devices
```

Of course, you should use Bridged Adapter for your version version of Android X86. To the get the IP, use the Phone's menu. Its something like **About tablet** and then **Status** .

![Android X86 Status screen for a table][a86s]

[a86s]:https://s3.amazonaws.com/bucket01.elvenware.com/images/android-x86-status.png
Android Studio runs fine in VirtualBox, it is the emulator it includes that will not, to my knowledge, work in VirtualBox.

## Mouse

Choose **Input | Mouse Integration** from the VirtualBox menu.



## Phone Connection

Plug in your phone and lsusb:

```
$ lsusb
Bus 002 Device 002: ID 8087:8001 Intel Corp.
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 006 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 8087:8009 Intel Corp.
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 002: ID 0bc2:ab34 Seagate RSS LLC
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 032: ID 046d:c041 Logitech, Inc. G5 Laser Mouse
Bus 003 Device 004: ID 045e:00db Microsoft Corp. Natural Ergonomic Keyboard 4000 V1.0
Bus 003 Device 003: ID 0557:7000 ATEN International Co., Ltd Hub
Bus 003 Device 021: ID 04e8:6860 Samsung Electronics Co., Ltd Galaxy (MTP)
Bus 003 Device 019: ID 05e3:0610 Genesys Logic, Inc. 4-port hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

## Install

Download my Android X86 6.0.3 OVA:

- [http://bit.ly/x86ova](http://bit.ly/x86ova)

I see no way around installing Android Studio. All we really need is the Android SDK, but Google has so removed the GUI SDK interface from everything but Android Studio. As a reult, you probably need [Android Studio][astudio] unless you have an old version of the SDK already installed.

[astudio]: https://developer.android.com/

```
sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386
```

## Quick Run

Start the Android virtual machine. Get its IP address by running **ifconfig** from the terminal app found in Android X86.

Connect to Android X86 from Pristine Lubuntu or where ever you are doing your development. You do this with **adb connect <IP>** and check your work with **adb devices**:

```
$ adb connect 192.168.2.21
connected to 192.168.2.21:5555
charlie@rohan-elf:~/temp/footoo
$ adb devices
List of devices attached
192.168.2.21:5555	device
```

Note the underscore, not hyphen, for the application name:

```
npm install -g react-native-cli
react-native init native_lastname
react-native run-android
```

I thought I had this working, but

## Turn on Debugging

On your phone, go to **About Device**. Find the build number. Tap it seven times.

## Exit the Android X86 Instance

In the File menu of VirtualBox, choose **Close | Send the shutdown signal**. A prompt will appear in the VM. Choose to shutdown the tablet.

## Test

Now run **adb devices**:

```
$ adb devices
List of devices attached
e8e5bc06	device
```

If you need to connect to a Virtual Instance, get its IP and:

```
adb connect 192.168.2.20
```

Like this:

```
$ adb connect 192.168.2.20
connected to 192.168.2.20:5555
$ adb devices
List of devices attached
192.168.2.20:5555	device
```

Run app:

```
npm start

or

yarn start
```

## Turn it in

Take a screen shot of your app running in the Android X86 VM.




[a86x]:https://s3.amazonaws.com/bucket01.elvenware.com/images/android-x86-expo.png
[a86g]: https://s3.amazonaws.com/bucket01.elvenware.com/images/android-x86-vb.png
