---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/cvsDocs.md
relativePath: elvenware/os/linux/cvsDocs.md
title: CvsDocs
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: cvsDocs.md
fileNameHTML: cvsDocs.html
image: ./course/course-javascript.jpg
subject: linux
queryPath: elvenware/os/linux/
---

<!-- toc -->
<!-- tocstop -->

CVS Notes
=========

![](../../../images/cvs.gif)

Some introductory notes on cvs are here:

[http://www.elvenware.com/charlie/linux/LinuxNFSSambaCVS.html\#cvs](http://www.elvenware.com/charlie/linux/LinuxNFSSambaCVS.html#cvs)

The cvs home page is here:

-   [http://cvshome.org/](http://cvshome.org/)
-   Linux:
    [http://cvshome.org/dev/codelinux.html](http://cvshome.org/dev/codelinux.html)
-   Windows:
    [http://cvshome.org/dev/codewindow.html](http://cvshome.org/dev/codewindow.html)

A good book on CVS is [here](http://cvsbook.red-bean.com/).

CVS Tools

-   [http://www.loria.fr/cgi-bin/molli/wilma.cgi/rel](http://www.loria.fr/cgi-bin/molli/wilma.cgi/rel)

Windows front ends:

-   TKCVS:
    [http://cvshome.org/dev/addontkcvs.html](http://cvshome.org/dev/addontkcvs.html)
-   JCVS:
    [http://cvshome.org/dev/addonjcvs.html](http://cvshome.org/dev/addonjcvs.html)
-   WinCVS:
    [http://cvshome.org/dev/addonmaccvs.html](http://cvshome.org/dev/addonmaccvs.html)

Docs

-   [http://www.loria.fr/cgi-bin/molli/wilma.cgi/doc](http://www.loria.fr/cgi-bin/molli/wilma.cgi/doc)
-   Faq-o-matic[http://www.loria.fr/\~molli/fom-serve/cache/1.html](http://www.loria.fr/~molli/fom-serve/cache/1.html)

### Logging into a CVS PServer

It is possible you will have to sign on to cvs on the server once before
you start. If so, here is the command:

    cvs -d :pserver:UserName@Server:/usr/local/cvsrep login 

You will be prompted for your password on xwin. If all goes well, the
command will return with no comment. No "Success," or anything else. You
are just returned to the prompt.

### Creating a CVS Project

    cvs import -m "initial import into cvs" cacheguide ccalvert start

### Checking out a CVS Project

The command to get a project from cvs would be:

    cvs checkout MediaPlayer 

You want to issue the command from the directory beneath where you want
your project to reside. For instance, if your project were called
MediaPlayer and it was in the c:\\src directory, then issuing the
command from that location would put the files in the
c:\\src\\MediaPlayer directory.

You might to spend some time making sure that all the files have regular
capitalization. That is, there are no files called MYFILE.PAS or
myfile.PAS or MYFILE.pas, they should all follow standard camelcaps
MyFile.pas, or else they should all be in small letters. Check in
particular for one you have called ServerMAIN.pas, and a few that have
.PAS as extensions. In general, you should probably merge your current
content into the files in the project, that way the caps that I have
established should be preserved. In other words, don't just copy your
files over mine. It would definitely help if you could set things up so
that these capitalizations are followed when you work with the project.
If you get them set up once, correctly, then it should continue to
follow them from there on out. If you add new files to the project, it
would help to get the caps right before adding them to CVS. Probably
best to keep the project off Windows 98 during development, as Win98 is
bad about caps. But it you get it set up right once, then do the
checkout to Win98, then it should be okay.

### Committing your work

Here is the command to commit your work at the end of the day:

    cvs commit -m "Here is my work for today" 

### Getting Updates

Here is the command to get updates that I might have added, or to update
one machine if you have done a commit from another machine:

    cvs update

P means the file was patched, that is, it was updated with new code from
the repository.

M means the file has been modified on your side and needs to be
committed.

U means the file wasn't on your side but was copied (updated) from the
repository.

C means a conflict was detected.

[update
output](http://www-es.fernuni-hagen.de/cgi-bin/info2html?(cvs)update%20output)

### Adding Files

Here is the command to add a file:

    cvs add MyFile.pas 

### Removing Files

Here is the command to remove a file:

    cvs remove MyFile.pas 

### Getting the Status of a File or Repository

Here is the command to check on the status of a file:

    cvs status MyFile.pas

Simple go to the root of the project and type cvs status \> foo.txt to
get the status on an entire repository. Wne you are done, open up the
text file in and editory and browse it. Particularly browse the top.

### Making a file Binary after its been Checked In

Here is the command to make a file binary if it is not listed as binary
in the repository:

    cvs admin -kb MyFile.gif 

I have made all the files text files except for those with an res, ico,
gif or bmp extension. They are all binary.

You can go to the cvswrappers file in the CVSROOT directory on the
server and specify all the files that you want to be binary by default.

The DFM files are all text. One file in our project, called About.dfm,
was a binary dfm, I converted it to text before putting it in the
repository. To check if the file is text or not, right click on it in
the IDE, and make sure Save as text is checked.

I did not put any of the cfg, kof, dsk, etc, files in the repository. I
did put dpr, pas, dfm, res, and any bitmaps in the repository.

### Automating CVS from the Command Line

Here is the batch file I run before accessing the project:

    @echo off
    d:
    cd "D:\srcpas\middleearth\elves\multimedia\mediaPlayer"
    set HOME=C:\Documents and Settings\administrator
    set HOMEPATH=\Documents and Settings\administrator
    set HOMEDRIVE=d:
    set USER=charlie
    set CVSROOT=:pserver:charlie@MyServer:/usr/local/cvsrep
    c:\utilities\tcl\bin\wish83.exe c:\bin\tkcvs.tcl

The last line depends on TKCVS, a visual front end for CVS. You may or
may not find it helpful. Additional information on TKCVS is provided at
the link found at the [top](#top) of this article.

### Initialising a CVS reposity for PSERVER

If you have installed CVS, you still have to initialize the directory
from which you want to serve files:

    cvs -d /usr/local/cvsrep init

Though its probably there already, make sure /etc/services contains:

    cvspserver 2401/tcp 

Add this to /etc/xinetd.d, in a file called cvs (/etc/xinetd.d/cvs):

    service cvspserver
    {
            disable = no
            socket_type     = stream
            protocol        = tcp
            wait            = no
            user            = root
            server          = /usr/bin/cvs
            server_args     = --allow-root=/home/development/cvsfred -f pserver
    }

    > repository (i.e. commit, tag, etc.) gives the "can't chdir..." error

    The problem is you forgot the -f from this line xinetd:

    server_args     = --allow-root=/home/development/cvsfred -f pserver

ent/cvsfred -f pserver
