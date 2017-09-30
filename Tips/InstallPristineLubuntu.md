## Overview

In most of my classes we use a copy of [Lubuntu][lu] running in Virtual Box. The first step is to download the custom Lubuntu OVA VirtualBox VM File from Google Drive. This is a copy of the Linux Lubuntu desktop specially prepared for this course.

## Install

The links below require a bit of patience. Select one, and determinedly click through until the download begins. Once the OVA file is downloaded, consider moving it to some save location such as your **Documents/Data** directory.

Double click on the downloaded OVA file to load it in VirtualBox. As the OVA file loads, you will be given a chance to **reset the MAC address**. Be sure you select this option. Your VM may work one time if you do not do this, but you are likely to hit problems in the future. For instance, either you, or other students in the class, may be blocked from the Internet while in the VM. To avoid this, please **reset the MAC address**.

Here is a link to the approximately 3.0 GB download:

- [Current Pristine Lubuntu](http://bit.ly/pristine-2017-08-a)

If you forgot to reset the MAC address, let me know, and I will show you how to go to **Settings | Network | Advanced** to reset the MAC after the install. The VM must be stopped while you perform this operation.

**NOTE** _MAC addresses are meant to be unique. The DNS servers set up by the college allocate IP addresses based on the presence of a MAC address. If two VMs have the same MAC address, then the machine that logs on first will get on the Internet, but the second machine will usually get errors when it tries to access the Internet._

If you get a warning about USB drivers, this usually means that the Virtual Box virtual extensions are not installed. This could be due to a mistake by the Bellevue College IS department. If you have the rights, install them from [here](https://www.virtualbox.org/wiki/Downloads), using the Virtual Box **Preferences** menu. (Or just double click on the download). Otherwise, you can go to **Settings | USB** for your VM and turn USB off for now.

Here is a somewhat dated link to a more detailed description of what to do with the OVA file once you download it:

- [Import a virtual Appliance][import-virtual]

If you need to install VirtualBox on your laptop, here is a description of how to proceed:

- [Install VirtualBox][instvbox]

[import-virtual]: http://www.elvenware.com/charlie/development/cloud/virtualization.html#importing-an-appliance
[instvbox]: http://www.elvenware.com/charlie/os/linux/VirtualBox.html#virtualbox
[lu]: http://lubuntu.net/
