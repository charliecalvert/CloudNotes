---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxUsers.md
relativePath: elvenware/os/linux/LinuxDays/LinuxUsers.md
title: LinuxUsers
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: LinuxUsers.md
fileNameHTML: LinuxUsers.html
---

<!-- toc -->
<!-- tocstop -->

# Users

#### Index

*   [chmod](#chmod)
*   [chown](#chown)

## Creating and Maintaining User Accounts

There is a lot to be said on the topic of users and Linux, and the various rights they can be granted. I will approach this topic on some depth in the section on Setting Up User Rights. For now, however, I want to cover a few basic concepts.

## The root User and All the other Users

In Windows, and particularly in Windows 98, there is not a big distinction between any one user on the system and any other user. In general, any user is free to explore the entire disk, and any user can modify any file on the system. This is not the case in Linux.

In Linux, there is one user, called the **root** user, who is the administrator, and who can do anything he or she wants. All other users have restricted access to the OS.

### Using su to become root

If you want to perform an administrative task having to do with maintaining the OS, then you should sign on to the system as **root**. If you want write programs, create documents, answer email, browse the web, or play games, then you should sign on as a regular user.

If you sign on as a regular user, you can become root by using the SuperUser comand: su.

su

Password:

If you type in the correct password, then you will become root until you type the word exit. After you type exit, you will go back to the state you were in before you typed su.

### Using su with the -l Option to become root

If you type **su -l**, or **su --login**, and successfully enter the password, then you will not only become root, but you will run the login scripts associated with root. That means that your path, and other variables, will be the same as the would be had you originally logged in as root. If you don't use the login switch, then you will the rights of the super user, but the environment variables of the user you were before you issued the su command.

### Using su to become an Ordinary User

It is common in the Linux community to call the su command the superuser command. However, that is really a bit of a misonomer. A better translation of the letters might be switch user. The issue here is that you can use su to switch to being any other user on the system whose password you know. For instance, if I am signed on as ccalvert, and want to become user charlie, then I can issue the following command:

su -l charlie

If I can provide the password for use charlie, then I will be logged on as charlie. If I type the word exit, then I once again become ccalvert.

### Users: I'm Just an Ordinary Guy

The root user can create new user, or change the rights of existing users.

### The Hard Way to Manager Users

Here is how to create groups and users on Ubuntu, as of Feb 26, 2012:

<pre class="code">sudo addgroup mygroup
sudo adduser --ingroup mygroup myuser</pre>

### Back to Older Notes

There are various scripts and text files that you can use in order to change the rights of users. Most notably, there is:

<table border="1">

<tbody>

<tr>

<td>/etc/passwd</td>

<td>File for setting passwords</td>

</tr>

<tr>

<td>Shadow passwords</td>

<td>A safety mechanism</td>

</tr>

<tr>

<td>/etc/group</td>

<td>File for working with groups</td>

</tr>

</tbody>

</table>

You can also use the commands:

*   useradd: add users
*   userdel
*   usermod
*   groupadd
*   groupdel

### Basics of useradd and userdel

#### Adding a user

*   Become root
*   Issue command: useradd sammy
*   ls /home to see that sammy has a directory
*   ls -la /home/sammy to see his directory
*   Look at /etc/passwd and /etc/group

#### Deleting a user

*   Now delete sammy
*   userdel -r sammy
*   ls -l /home
*   The -r option not only removed user from etc/passwd and etc/group/ but deleted the user's files

## kuser to the rescue

In many cases, I think it is necessary to know how to edit the files in the /etc directory or its subdirectories by hand. However, in this case, I think you can safely ignore both of these files, and instead use an excellent utility that ships with KDE called **kuser**.

There are two ways to access **kuser**. If you are using the KDE desktop, then use the panel to open the Application Starter Menu, and select System | User Manager. If you are not root when you do this, then you will be told that you do not have the rights to use this utility. There isn't any good reason for most people ever to bring up KDE when signed on as root, so this menu item is really something of a red herring. The best way to get at **kuser** is to open a terminal window, su over to root, and type **kuser** at the command prompt.

Inside the **kuser** utility you can do many wondrous things, such as add, delete, and modify users and groups.

Double click on any one user to pop up a dialog that let's you modify that user's properties. This dialog, called the User Property dialog, is a great place to set passwords, and decide the groups to which a user belongs.

In the User Property dialog there are three pages. The second, called **Extended**, lets you decide whether a user can change their own password, how long it will be until their password expires, and what will happen when it does expire.

The third page, called G**roups**, allows you to decide the groups to which a user belongs. I find it useful to make most users a member of the **users** group. This will allow you to designate certain areas on the disk where all members of the users group have rights, and where they can share files, etc.

Notice that each user and group is associated with a number. For instance, the first user is usually given the number 500\. For reasons that will become clear later in this discussion, I suggest that you pay some attention to this number. In particular, if you are setting up a network, and want to allow users to have access to various computers, then I would make an effort to give them each the same number on each computer. This is not a necessity, but it can make your life easier when it comes time to share files and directories.

### <a id="chmod"></a>chmod

`

*   Use this command to change the rights on an individual file.
*   If you are not the owner of the file, then you need to be root to change the rights

### chmod and bash file for changing directories

*   #!/bin/bash
*   echo hello streets of London
*   Now give yourself rights to execute it:
*   chmod a+x gosrc
*   Now run the file

### chmod and the user

*   Create user sammy
*   Make ccalvert part of the group sammy
*   Now become ccalvert and try to read /home/sammy
*   You can't read it because the directory sammy gives no rights to the group sammy: rwx______
*   To change this, chmod g+r /home/sammy
*   Now you can read it, but still get an error
*   To fix it: chmod g+x /home/sammy

<table border="1" cellpadding="4" cellspacing="3" width="123"><colgroup><col width="42"><col width="54"></colgroup> 

<thead>

<tr valign="TOP">

<td width="42">u</td>

<td width="54">User</td>

</tr>

</thead>

<tbody>

<tr valign="TOP">

<td width="42">g</td>

<td width="54">Group</td>

</tr>

<tr valign="TOP">

<td width="42">o</td>

<td width="54">Other</td>

</tr>

<tr valign="TOP">

<td width="42">a</td>

<td width="54">All</td>

</tr>

</tbody>

</table>

<table border="1" cellpadding="4" cellspacing="3" width="100%"><colgroup><col width="18*"><col width="238*"></colgroup> 

<thead>

<tr>

<td sdnum="1033;" sdval="400" valign="BOTTOM" width="7%">400</td>

<td valign="TOP" width="93%">Owner can read the file</td>

</tr>

</thead>

<tbody>

<tr>

<td sdnum="1033;" sdval="200" valign="BOTTOM" width="7%">200</td>

<td valign="TOP" width="93%">Owner can write to the file</td>

</tr>

<tr>

<td sdnum="1033;" sdval="100" valign="BOTTOM" width="7%">100</td>

<td valign="TOP" width="93%">Owner can execute</td>

</tr>

<tr>

<td sdnum="1033;" sdval="40" valign="BOTTOM" width="7%">40</td>

<td valign="TOP" width="93%">Group can read the file</td>

</tr>

<tr>

<td sdnum="1033;" sdval="20" valign="BOTTOM" width="7%">20</td>

<td valign="TOP" width="93%">Group can write to the file</td>

</tr>

<tr>

<td sdnum="1033;" sdval="10" valign="BOTTOM" width="7%">10</td>

<td valign="TOP" width="93%">Group can execute the file</td>

</tr>

<tr>

<td sdnum="1033;" sdval="777" valign="BOTTOM" width="7%">777</td>

<td valign="TOP" width="93%">User group and owner have full permissions</td>

</tr>

<tr>

<td sdnum="1033;" sdval="755" valign="BOTTOM" width="7%">755</td>

<td valign="TOP" width="93%">Owner can read write and execute no one else can write</td>

</tr>

<tr>

<td sdnum="1033;" sdval="640" valign="BOTTOM" width="7%">640</td>

<td valign="TOP" width="93%">Ownere can read and write group can read</td>

</tr>

</tbody>

</table>

function chmod(FileName: PChar; Mode: LongWord): Integer; cdecl;

<table border="1" cellpadding="4" cellspacing="3" width="614"><colgroup><col width="111"><col width="34"><col width="430"></colgroup> 

<thead>

<tr>

<td valign="TOP" width="111">

S_IRWXU

</td>

<td sdnum="1033;" sdval="700" valign="BOTTOM" width="34">

700

</td>

<td valign="TOP" width="430">

mask for file owner permissions

</td>

</tr>

</thead>

<tbody>

<tr>

<td valign="TOP" width="111">

S_IRUSR

</td>

<td sdnum="1033;" sdval="400" valign="BOTTOM" width="34">

400

</td>

<td valign="TOP" width="430">

owner has read permission

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IWUSR

</td>

<td sdnum="1033;" sdval="200" valign="BOTTOM" width="34">

200

</td>

<td valign="TOP" width="430">

owner has write permission

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IXUSR

</td>

<td sdnum="1033;" sdval="100" valign="BOTTOM" width="34">

100

</td>

<td valign="TOP" width="430">

owner has execute permission

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IRWXG

</td>

<td sdnum="1033;" sdval="70" valign="BOTTOM" width="34">

70

</td>

<td valign="TOP" width="430">

mask for group permissions

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IRGRP

</td>

<td sdnum="1033;" sdval="40" valign="BOTTOM" width="34">

40

</td>

<td valign="TOP" width="430">

group has read permission

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IWGRP

</td>

<td sdnum="1033;" sdval="20" valign="BOTTOM" width="34">

20

</td>

<td valign="TOP" width="430">

group has write permission

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IXGRP

</td>

<td sdnum="1033;" sdval="10" valign="BOTTOM" width="34">

10

</td>

<td valign="TOP" width="430">

group has execute permission

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IRWXO

</td>

<td sdnum="1033;" sdval="7" valign="BOTTOM" width="34">

7

</td>

<td valign="TOP" width="430">

mask for permissions for others (no group)

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IROTH

</td>

<td sdnum="1033;" sdval="4" valign="BOTTOM" width="34">

4

</td>

<td valign="TOP" width="430">

others have read permission

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IWOTH

</td>

<td sdnum="1033;" sdval="2" valign="BOTTOM" width="34">

2

</td>

<td valign="TOP" width="430">

others have write permisson

</td>

</tr>

<tr>

<td valign="TOP" width="111">

S_IXOTH

</td>

<td sdnum="1033;" sdval="1" valign="BOTTOM" width="34">

1

</td>

<td valign="TOP" width="430">

others have execute permission

</td>

</tr>

</tbody>

</table>

<pre>procedure TForm1.RunCheck(Mode: Cardinal;
  Box1, Box2, Box3: TCheckBox;
  ValRead, ValWrite, ValExe: Cardinal);
begin
    if (mode and ValRead) = ValRead then
      Box1.Checked := True
    else
      Box1.Checked := False;

    if (mode and ValWrite) = ValWrite then
      Box2.Checked := True
    else
      Box2.Checked := False;

    if (mode and ValExe) = ValExe then
      Box3.Checked := True
    else
      Box3.Checked := False;
end;

// Convert a __time_t structure into a string                                                                  
function GetUTime(Time: __time_t): string;
var
  UTime: PUnixTime;
begin
  // gmtime is Greenwich mean time, or Universal Coordinate Time (UCT)
  // to get that, you call gmtime. We want local time, so call
  // localtime instead of gmtime (Of course, in London, you don't need to
  // think about this in quite the same way you do in California.)
  UTime :=  gmtime(@Time);

  Result := Format('%02d/%02d/%02d %02d:%02d:%02d' ,
    [UTime.tm_mon + 1, UTime.tm_year +2000, Utime.tm_mday,
    UTime.tm_hour, UTime.tm_min, Utime.tm_sec]);
end;

procedure TForm1.Button1Click(Sender: TObject);
var
  FileName: string;
  StatBuffer: TStatBuf;
  Time: __time_t; // This resolves to type Integer;
  S: string;
begin
  if OpenDialog1.Execute then begin
    FileName := OpenDialog1.FileName;
    Edit1.Text := FileName;
    stat(PChar(FileName), StatBuffer);
    ListBox1.Items.Add('Mode = ' + IntToStr(StatBuffer.st_mode));
    ListBox1.Items.Add('UUID = ' + IntToStr(StatBuffer.st_uid));
    ListBox1.Items.Add('GID = ' + IntToStr(StatBuffer.st_gid));
    ListBox1.Items.Add('Size = ' + IntToStr(StatBuffer.st_size));
    ListBox1.Items.Add('Inode = ' + IntToStr(StatBuffer.st_ino));
    ListBox1.Items.Add('Blocksize = ' + IntToStr(StatBuffer.st_blksize));
    ListBox1.Items.Add('Blocks = ' + IntToStr(StatBuffer.st_blocks));
    { Days between TDateTime basis (12/31/1899) and Unix time_t basis (1/1/1970) }
    // UnixDateDelta = 25569;

    S := GetUTime(StatBuffer.st_atime);
    ListBox1.Items.Add('Accessed Time = ' + S);
    S := GetUTime(StatBuffer.st_mtime);
    ListBox1.Items.Add('Modified Time = ' + S);
    S := GetUTime(StatBuffer.st_ctime);
    ListBox1.Items.Add('Change Time = ' + S);

    RunCheck(StatBuffer.st_mode, OwnerReadBox, OwnerWriteCheckBox,
      OwnerExecuteCheckBox, S_IRUSR, S_IWUSR, S_IXUSR);

    RunCheck(StatBuffer.st_mode, GroupReadBox, GroupWriteBox,
      GroupExecuteBox, S_IRGRP, S_IWGRP, S_IXGRP);

    RunCheck(StatBuffer.st_mode, OtherReadBox, OtherWriteBox,
      OtherExecuteBox, S_IROTH, S_IWOTH, S_IXOTH);
  end;
end;</pre>

### <a id="chown">chown</a>

*   chown will allow you to change the owner of a file
*   chown ccalvert.ccalvert myfile.pas
*   The first ccalvert is the owner, the other is the group
*   There is also chgrp, which will change just the group
