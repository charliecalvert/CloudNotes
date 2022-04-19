---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Esig/EsigTest.md
relativePath: Esig/EsigTest.md
title: EsigTest
queryPath: Esig/
subject: Esig
fileNameMarkdown: EsigTest.md
fileNameHTML: EsigTest.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

I have created an OVA file for use in VirtualBox, VMware, etc. The OVA is about 2 GB in size, so be prepared for a significant download.

- <http://bit.ly/esig-test>

I have only tested it in VirtualBox. Be sure you install the VirtualBox Extension Pack for your instance of VirtualBox. It is available from the VirtualBox download page.

Once you have downloaded the file, in VirtualBox, choose: File | Import Appliance

More specifically: select VirtualBox and use the **File | Import Appliance** menu item to import the OVA file. Double clicking the OVA file in the Windows Explorer also works. Or, use the vboxmanage import command if you prefer to work at the command line.

When importing the OVA, it is usually a good precaution to reset the Mac address.

The Ubuntu Server VM is configured to use 1 GB of RAM, but you can change this:

- Close your instance of the VM
- Select your instance in VirtualBox
- Go to Settings | System
- Change the amount of RAM to 2048 or 768 or what have you. These numbers may affect performance, but the VM should still work.

When you first start your instance, you may get a warning about the network interface. A dialog will appear asking you to update your settings. Select the dialog. You shouldn't need to do anything, as the correct network interface should then be selected automatically. Now restart your instance if it does not restart automatically.

To log in to the VM:

- user: esig
- password: esig

The password is the same for mysql, but the user is root.

WordPress needs to know the IP address or domain name of its host. Type ifconfig to find your IP address. Run the attached script, also found in ~/temp. It will ask for the mysql password.

- mysql -u root -p -e 'source SetSiteOption.sql;'

The script should update the database so Wordpress knows the address of the machine on which it is running. But you will probably need to edit it first to include your IP address. Unless, of course, the IP address for your instance happens to be 192.168.2.28, in which case you are done. WordPress won't run correctly unless these fields are set up properly. Alternatively, install PHPMyAdmin and edit the first two rows of the table with the word option in it. I think it is wp_xgee_options.

If you want the events menu to work correctly, log into wp-admin with your usual username or password, as mentioned in an earlier mail in this chain.  Go to Appearance, Menu and set the IP for the Events menu. It should contain the same IP as you used in the script.

The point of this exercise is that you can:

Experiment to your hearts content in the VM and not affect other users
Save or roll back your work
Delete everything and start again
Create multiple instances with different experiments in each of them.
Etc.

Let me know if you have questions.
