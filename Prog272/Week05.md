## Prog 272 Week 05, 2019

Main Goals
----------

-   Review Node Routes

## Key Assignments

I have not yet published, and may not publish, some of these assignments. They are certainly not ready to be worked on yet. This is just my thinking outloud.

- [NodeRouteBasics][nrb]
- [UnitTests with Jest][utwg]
    - Learn about Jest and React
- [Unit Tests Address][uta]
    - Start Address Program
- [Address Component][ac]
    - Move Address into its own Component
- [Address Component Refine][acr]
    - Add image, refactor tests
- React Props Basics
    - Learn about passing props
- [React Native Basics][rnb]

[nrb]: /teach/assignments/NodeRouteBasics.html
[utwg]: /teach/assignments/react/JestCreateReactApp.html
[uta]: /teach/assignments/react/UnitTestsAddress.html
[ac]: /teach/assignments/react/AddressComponent.html
[acr]: /teach/assignments/react/AddressComponentRefine.html
[rnb]: /teach/assignments/react/ReactNativeBasics.html

## Install Guest Additions in Linux

This is not an assignment, but I suggest that you do install the
Guest Additions.

If you set up the VirtualBox Guest Additions in Linux, you will find
that you have better control over your virtual machine. In
particular, you will find it easier to resize your desktop or make
it full screen. You should also have better control over the mouse.

- [Details](/os-guide/linux/VirtualBox.html#guest)

Share Clipboard Between Windows and Linux
-----------------------------------------

Again, this is not an assignment, but I suggest that you do set up
the clipboard so that you can copy text back and forth between
Windows and Linux.

- [Details](/os-guide/linux/VirtualBox.html#shareClipboard)

## Virtual Appliances

There are three pages on Elvenware that focus on VirtualBox. To
learn about virtual appliances, read the first page listed here. It
is a good idea, however, to become familiar with all three pages:

- [Virtualization](/cloud-guide/virtualization.html)
-   </os-guide/linux/VirtualBox.html>
-   </android-guide/Androidx86.shtml>


Get ReadOnly JsObjects
----------------------

Having a copy of JsObjects on your various machines can be useful, as it contains many helpful examples. For instance, when you create a new Virtual Machine, you probably want to have JsObjects installed on it. Here is a brief review of how you can, as necessary, install Git:

    sudo apt-get install git

Now navigate to place on your hard drive where you can clone JsObjects. On Linux, that would usually be a folder called Git or GitHub. Here is how to create the folder:

    mkdir ~/Git

Now navigate to that folder:

    cd ~/Git

And then clone my repo:

	git clone https://github.com/charliecalvert/JsObjects.git
