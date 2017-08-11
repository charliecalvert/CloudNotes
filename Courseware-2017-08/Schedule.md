# Schedule

Here is the proposed schedule for our course.

## Downloads

Click the link below and click through until the download begins. After it ends, double click on the OVA file to load it in VirtualBox.

You will be given a chance to reset the MAC address. Be sure you select this option. It may work one time if you do not do this, but you are likely to hit problems in the future. Please **reset the MAC address**.

- [Current Pristine Lubuntu](http://bit.ly/pristine-2017-08-a)
- [Older Pristine Lubuntu](http://bitly.com/pristine-2017-08)

If you forgot to reset the MAC address, let me know, and I will show you how to go to **Settings | Network | Advanced** to reset the MAC after the install. The VM must be stopped while you perform this operation.

Current Pristine adds the following to the older version:

- Atom
- Turned on **Shared Clipboard** and **Drag 'n Drop'** between the host and the guest VM.

If you have the older version, you can add Atom with this command:

```
sudo snap install --classic atom
```

To turn on **Shared Clipboard** and **Drag 'n Drop'** select **Settings | General | Advanced** and set both options to **Bitdirectional**. You can access **Settings** from the VirtualBox manager in the Windows (Host) UI.

## Monday

There will be several topics covered on Monday, but the two most important will be on **VirtualBox and Linux**, and the section on **Git**.

| Time        | Description           |
|-------------|:---------------------:|
| 9:00 - 9:30 |  Introduction         |
| 9:30 -10:30 |  VirtualBox and Linux |
| 10:30-10:40 |  Break                |
| 10:40-11:40 |  Git                  |
| 11:40-12:00 |  Summary & Questions  |

### Monday Details
VirtualBox Slide Deck:

- [http://bit.ly/vbox-01](http://bit.ly/vbox-01)

The following is a very old document and needs to be edited, but still it has some useful information in it:

- [Elven VirtualBox](http://www.elvenware.com/charlie/os/linux/VirtualBox.html)

Linux Reference:

- [Linux Files][linux-files]
- [Linux File Video][linux-file-video]

Git lessons:

1. [GitNewRepo](http://www.ccalvert.net/books/CloudNotes/Assignments/GitNewRepo.html)
1. [GitDualRepos](http://www.ccalvert.net/books/CloudNotes/Assignments/GitDualRepos.html)


## Tuesday

| Time        | Description           |
|-------------|:---------------------:|
| 9:00 -10:15 | JavaScript Basics |
| 10:15-10:30 | Break |
| 10:30-11:00 | Linux Tricks and Facts |
| 11:00-11:45 | Git Branching |
| 11:45-12:00 | Summary & Questions |

## Tuesday Details

JavaScript Basics.

- [Writing Simple Code][simple-code]
- [JavaScript Basics][javascript-basics]

Git Branching

- [Git Branching][git-branching]


## Wednesday

| Time        | Description           |
|-------------|:---------------------:|
| 9:00 -10:15 | JavaScript Callbacks |
| 10:15-10:30 | Break |
| 10:30-11:45 | JavaScript ES6 |
| 11:45-12:00 | Summary & Questions |

### Wednesday Details

Callbacks:

- [Elvenware Callbacks][elven-callbacks]
- [Callback Exercise][callback-exercise]

ES6:

- [ReactBasics][react-basics]

## Thursday

| Time        | Description           |
|-------------|:---------------------:|
| 9:00 -10:15 | The Cloud and SSH     |
| 10:15-10:30 | Break                 |
| 10:30-11:45 | JavaScript ES6        |
| 11:45-12:00 | Summary & Questions   |

### Thursday Details

The Cloud and SSH:

- [Heroku][heroku-exercise]

JavaScript and ES6:

- 

## Summary

This is the summary.

[linux-file-video]: http://youtu.be/pHIRpHDn7WQ

[linux-files]: http://www.elvenware.com/charlie/os/linux/LinuxFiles.html

[git-branching]: http://www.ccalvert.net/development/git/git-branches.html

[simple-code]: http://www.elvenware.com/charlie/development/web/JavaScript/WritingSimpleCode.html

[javascript-basics]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptBasics.html

[elven-callbacks]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptFunctions.html#callbacks

[callback-exercise]: http://www.ccalvert.net/books/CloudNotes/Assignments/Callbacks.html

[react-basics]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactBasics.html

[heroku-exercise]: http://www.ccalvert.net/books/CloudNotes/Assignments/HerokuStarter.html
