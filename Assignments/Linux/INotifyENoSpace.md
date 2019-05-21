## Overview

A number of us run across a variety of errors because of a system wide setting that specifies the number of files that the system can monitor in a directory. My understanding is that some tools like to be notified when a file has been accessed, edited, deleted, etc. For instance, WebStorm needs this information to our update our view of our source, as does Jest when it is checking for updates to our tests. The kind of events these tools to monitor can be tracked by following an event called [inotify][in]. We can set the number of files that **inotify** is able to monitor. By default, the number of such files is around 5,000. Our **node_modules** directories, however, can become huge, and we need to raise the number. Below I describe how that is done.

Problems with **inotify** file watch cap often cause ENOSPC errors when we are testing, and cause a message like the following to appear in WebStorm: "External file changes sync may be slow: The current inotify(7) watch limit is too low".

To fix these problems, do the following:

- **sudo nano /etc/sysctl.conf**
- Scroll to the bottom of the document.
- Add this line: **fs.inotify.max_user_watches = 524288**
- Save with **Ctrl-O**, exit with **Ctrl-X**.
- Then run: **sudo sysctl -p**

To get the current value for the maximum number of file watches do this:

    cat /proc/sys/fs/inotify/max_user_watches

![More watches][enospc]

**Figure**: _Inside nano, editing **/etc/sysctl.conf**._

Running this command should also work as a single step solution:

    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

I have added the above command to my **UbuntuSetup** script which I use building Pristine Lubuntu. As a result, this will hopefully not be a problem for future generations of students.

**NOTE**: _I'm aware that automating this kind of thing in my scripts deprives students of the chance to learn how to maintain their own machines. However, it is crucial that we do not waste too much time during the quarter or relatively unimportant configuration details._

A [reference][listen]

[listen]: https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers
[in]: http://man7.org/linux/man-pages/man7/inotify.7.html
