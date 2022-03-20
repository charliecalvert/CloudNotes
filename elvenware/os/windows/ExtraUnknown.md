---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/windows/ExtraUnknown.md
relativePath: elvenware/os/windows/ExtraUnknown.md
title: ExtraUnknown
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: ExtraUnknown.md
fileNameHTML: ExtraUnknown.html
---

<!-- toc -->
<!-- tocstop -->

Use SetX to Set the Environment
-------------------------------


Here is a little batch file that you can create to automate the 
process of setting your environment variables:

	SetX JAVA_HOME "C:\Program Files\Java\jdk1.7.0_45"
	SetX ANT_HOME C:\Src\Ant\apache-ant-1.9.3
	SetX PHONEGAP_HOME C:\Src\cordova-android
	SetX ANDROID_SDK_HOME C:\Src\Eclipse\sdk
	
The SetX is built into windows. You can learn about it by searching
the internet or typing:

	setx /h

In the code shown above, we are setting environment variables:

	setx [ENVIRONMENT VARIABLE] [VALUE]

By default, the variable is set for the current user. If you want
to change the entire environment for all users, look in the /M 
parameter. Here is how the help describes that variable:

*/M Specifies that the variable should be set in the system wide 
(HKEY_LOCAL_MACHINE) environment. The default is to set the variable 
under the HKEY_CURRENT_USER environment.*
